#!/usr/bin/env python3
"""Shared matching policy for public redaction and ephemeral history rewriting.

Sensitive values are supplied externally. This module intentionally contains no
project-specific denylist values.
"""

from __future__ import annotations

import ipaddress
import re
from collections.abc import Iterable, Iterator
from urllib.parse import urlsplit


PLACEHOLDER = "###-PII-###"
URL_PATTERN = re.compile(r"(?:https?://|sandbox:/)[^\s\"'<>)]*", re.IGNORECASE)
EMAIL_PATTERN = re.compile(r"\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b", re.IGNORECASE)
LOCAL_PATH_PATTERN = re.compile(r"(?<![A-Za-z0-9])/(?:Users|home|workspace|mnt|var|private)/[^\s\"'<>)]*", re.IGNORECASE)
SESSION_ID_PATTERN = re.compile(r"\b[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}\b", re.IGNORECASE)
PATH_SEPARATORS = frozenset("_-/\\.")
APPROVED_PUBLIC_URL_HOSTS = frozenset(
    {
        "docs.python.org",
        "feross.org",
        "github.com",
        "npmjs.org",
        "opencollective.com",
        "paulmillr.com",
        "raw.githubusercontent.com",
        "registry.npmjs.org",
        "tidelift.com",
        "www.npmjs.com",
        "www.patreon.com",
    }
)


def is_ambiguous_identifier(value: str) -> bool:
    """Return whether a short word needs contextual matching, independent of input casing."""

    normalized = value.casefold()
    return normalized.isascii() and normalized.isalpha() and len(normalized) <= 4


def value_pattern(value: str) -> re.Pattern[str]:
    escaped = re.escape(value)
    if value and value[0].isalnum() and value[-1].isalnum():
        escaped = rf"(?<![A-Za-z0-9]){escaped}(?![A-Za-z0-9])"
    return re.compile(escaped, re.IGNORECASE)


def regex_rule(value: str) -> str:
    """Return a filter-repo-compatible regex without broad lowercase matches."""

    escaped = re.escape(value)
    if not (value and value[0].isalnum() and value[-1].isalnum()):
        return rf"(?i:{escaped})"
    if not is_ambiguous_identifier(value):
        return rf"(?<![A-Za-z0-9])(?i:{escaped})(?![A-Za-z0-9])"
    separators = r"[_./\\-]"
    ordinary = re.escape(value.casefold())
    return (
        rf"(?:"
        rf"(?<![A-Za-z0-9])(?i:{escaped})(?={separators})|"
        rf"(?<={separators})(?i:{escaped})(?![A-Za-z0-9])|"
        rf"(?<![A-Za-z0-9])(?!{ordinary}(?![A-Za-z0-9]))(?i:{escaped})(?![A-Za-z0-9])"
        rf")"
    )


def sensitive_matches(text: str, value: str) -> Iterator[re.Match[str]]:
    for match in value_pattern(value).finditer(text):
        if not is_ambiguous_identifier(value):
            yield match
            continue
        actual = match.group(0)
        before = text[match.start() - 1] if match.start() else ""
        after = text[match.end()] if match.end() < len(text) else ""
        if actual != actual.lower() or before in PATH_SEPARATORS or after in PATH_SEPARATORS:
            yield match


def contains_sensitive_value(text: str, values: Iterable[str]) -> bool:
    return any(next(sensitive_matches(text, value), None) is not None for value in values)


def replace_sensitive_values(text: str, values: Iterable[str], placeholder: str = PLACEHOLDER) -> tuple[str, int]:
    count = 0
    for value in sorted(set(values), key=len, reverse=True):
        matches = list(sensitive_matches(text, value))
        for match in reversed(matches):
            text = text[:match.start()] + placeholder + text[match.end():]
        count += len(matches)
    return text, count


def is_sensitive_url(value: str, denylist: Iterable[str]) -> bool:
    if value.lower().startswith("sandbox:/"):
        return True
    try:
        parsed = urlsplit(value)
    except ValueError:
        return True
    hostname = (parsed.hostname or "").rstrip(".").lower()
    if not hostname or parsed.username or parsed.password:
        return True
    if hostname == "localhost" or hostname.endswith(".localhost") or hostname.endswith(".local"):
        return True
    try:
        if ipaddress.ip_address(hostname).is_private:
            return True
    except ValueError:
        pass
    return contains_sensitive_value(value, denylist)


def is_concrete_url_literal(value: str) -> bool:
    """Return whether a matched URL fragment names a concrete rewrite target."""

    if value.lower().startswith("sandbox:/"):
        suffix = value[len("sandbox:/"):]
        return bool(suffix and re.match(r"[A-Za-z0-9._~-]", suffix))
    try:
        parsed = urlsplit(value)
    except ValueError:
        return False
    return parsed.scheme.lower() in {"http", "https"} and bool(parsed.hostname)


def is_approved_public_url(value: str) -> bool:
    """Return whether an HTTP(S) URL belongs to an explicit public ecosystem host."""

    try:
        parsed = urlsplit(value)
    except ValueError:
        return False
    if parsed.scheme.lower() not in {"http", "https"} or parsed.username or parsed.password:
        return False
    hostname = (parsed.hostname or "").rstrip(".").lower()
    return any(hostname == allowed or hostname.endswith("." + allowed) for allowed in APPROVED_PUBLIC_URL_HOSTS)


def sanitize_public_text(text: str, denylist: Iterable[str], placeholder: str = PLACEHOLDER) -> tuple[str, int]:
    """Sanitize public prose while retaining explicitly approved public URLs."""

    values = list(denylist)
    count = 0
    url_matches = list(URL_PATTERN.finditer(text))
    for match in reversed(url_matches):
        value = match.group(0)
        if is_approved_public_url(value) and not is_sensitive_url(value, values):
            continue
        text = text[:match.start()] + placeholder + text[match.end():]
        count += 1
    text, replacements = replace_sensitive_values(text, values, placeholder)
    count += replacements
    for pattern in (EMAIL_PATTERN, LOCAL_PATH_PATTERN, SESSION_ID_PATTERN):
        matches = list(pattern.finditer(text))
        for match in reversed(matches):
            text = text[:match.start()] + placeholder + text[match.end():]
        count += len(matches)
    return text, count


def scoped_replacement_count(text: str, denylist: Iterable[str]) -> int:
    """Count non-overlapping values selected by the private rewrite policy."""

    values = list(denylist)
    spans: list[tuple[int, int]] = []

    def add(start: int, end: int) -> None:
        if not any(start < existing_end and existing_start < end for existing_start, existing_end in spans):
            spans.append((start, end))

    for match in URL_PATTERN.finditer(text):
        if is_concrete_url_literal(match.group(0)) and is_sensitive_url(match.group(0), values):
            add(match.start(), match.end())
    for pattern in (EMAIL_PATTERN, LOCAL_PATH_PATTERN, SESSION_ID_PATTERN):
        for match in pattern.finditer(text):
            add(match.start(), match.end())
    for value in sorted(set(values), key=len, reverse=True):
        for match in sensitive_matches(text, value):
            add(match.start(), match.end())
    return len(spans)


def sensitive_literals(text: str, denylist: Iterable[str]) -> set[str]:
    values = list(denylist)
    literals: set[str] = set()
    literals.update(
        match.group(0)
        for match in URL_PATTERN.finditer(text)
        if is_concrete_url_literal(match.group(0)) and is_sensitive_url(match.group(0), values)
    )
    for pattern in (EMAIL_PATTERN, LOCAL_PATH_PATTERN, SESSION_ID_PATTERN):
        literals.update(match.group(0) for match in pattern.finditer(text))
    return literals
