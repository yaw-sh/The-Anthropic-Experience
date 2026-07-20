#!/usr/bin/env python3
"""Private-input provenance analysis for generalized public history receipts."""

from __future__ import annotations

import hashlib
import json
import re
import subprocess
from collections import Counter
from dataclasses import dataclass
from pathlib import Path
from typing import Any


ROLE_ALIASES = {
    "operator": "operator",
    "user": "operator",
    "human": "operator",
    "you": "operator",
    "assistant": "assistant",
    "claude": "assistant",
    "chatgpt": "assistant",
    "system": "system",
    "tool": "tool",
}
ROLE_PATTERN = re.compile(r"^#{1,6}\s.*?\b(" + "|".join(ROLE_ALIASES) + r")\b", re.IGNORECASE)


@dataclass(frozen=True)
class AnalyzedSlot:
    id: str
    former_path_slots: tuple[str, ...]
    parser: str
    role_counts: dict[str, int]
    unique_blob_count: int
    texts: tuple[str, ...]
    unit_roles: tuple[str, ...] = ()
    unit_turns: tuple[int, ...] = ()
    leak_texts: tuple[str, ...] = ()

    @property
    def source_unit_count(self) -> int:
        return len(self.unit_roles) if self.unit_roles else sum(self.role_counts.values())


def load_source_map(path: Path) -> dict[str, Any]:
    value = json.loads(path.read_text(encoding="utf-8"))
    if value.get("schemaVersion") != "1.0.0" or not isinstance(value.get("slots"), dict):
        raise ValueError("invalid private source map")
    return value


def _git_sources(root: Path, source_ref: str, raw_path: str) -> list[tuple[str, bytes]]:
    listing = subprocess.run(
        ["git", "ls-tree", "-r", "--name-only", source_ref, "--", raw_path],
        cwd=root,
        capture_output=True,
        text=True,
        check=True,
    ).stdout.splitlines()
    if not listing:
        raise ValueError("configured historical source does not exist")
    result = []
    for path in listing:
        blob = subprocess.run(["git", "show", f"{source_ref}:{path}"], cwd=root, capture_output=True, check=True).stdout
        result.append((path, blob))
    return result


def _current_sources(root: Path, raw_path: str) -> list[tuple[str, bytes]]:
    base = root / raw_path
    candidates = [base] if base.is_file() else sorted(path for path in base.rglob("*") if path.is_file()) if base.is_dir() else []
    if not candidates:
        raise ValueError("configured current source does not exist")
    return [(str(path.relative_to(root)), path.read_bytes()) for path in candidates]


def _external_sources(raw_path: str) -> list[tuple[str, bytes]]:
    path = Path(raw_path).resolve()
    if not path.is_absolute() or not path.is_file():
        raise ValueError("configured external source does not exist")
    return [("private-external-source", path.read_bytes())]


def _codex_jsonl_units(blobs: list[bytes]) -> tuple[tuple[str, ...], tuple[str, ...], tuple[int, ...], tuple[str, ...]]:
    roles: list[str] = []
    texts: list[str] = []
    turns: list[int] = []
    leak_texts: list[str] = []
    turn = 0
    tool_types = {"function_call", "function_call_output", "custom_tool_call", "custom_tool_call_output"}
    role_map = {"user": "operator", "assistant": "assistant", "developer": "system", "system": "system"}
    for blob in blobs:
        for raw_line in blob.decode("utf-8").splitlines():
            try:
                record = json.loads(raw_line)
            except json.JSONDecodeError as error:
                raise ValueError("invalid Codex JSONL source") from error
            if record.get("type") == "turn_context":
                turn += 1
                continue
            if record.get("type") != "response_item" or not isinstance(record.get("payload"), dict):
                continue
            payload = record["payload"]
            payload_type = payload.get("type")
            if payload_type == "message" and payload.get("role") in role_map:
                parts = []
                for item in payload.get("content", []):
                    if not isinstance(item, dict):
                        continue
                    for key in ("text", "input_text", "output_text"):
                        if isinstance(item.get(key), str):
                            parts.append(item[key])
                            break
                roles.append(role_map[payload["role"]])
                text = "\n".join(parts)
                texts.append(text)
                leak_texts.append(text)
                turns.append(max(turn, 1))
            elif payload_type in tool_types:
                parts = []
                for key in ("name", "arguments", "input", "output"):
                    value = payload.get(key)
                    if isinstance(value, str):
                        parts.append(value)
                    elif value is not None:
                        parts.append(json.dumps(value, ensure_ascii=False, sort_keys=True))
                roles.append("tool")
                texts.append("\n".join(parts))
                if payload_type in {"function_call", "custom_tool_call"}:
                    leak_texts.append(f"tool action {payload.get('name', '')}".strip())
                else:
                    leak_texts.append("tool result")
                turns.append(max(turn, 1))
    if not roles:
        raise ValueError("Codex JSONL parser produced no transcript units")
    return tuple(roles), tuple(texts), tuple(turns), tuple(leak_texts)


def _role_heading_roles(texts: list[str]) -> tuple[str, ...]:
    roles: list[str] = []
    for text in texts:
        for line in text.splitlines():
            match = ROLE_PATTERN.search(line)
            if match:
                roles.append(ROLE_ALIASES[match.group(1).lower()])
    if not roles:
        roles.extend("tool" for _ in texts)
    return tuple(roles)


def analyze_slot(root: Path, source_ref: str, slot_id: str, config: dict[str, Any]) -> AnalyzedSlot:
    sources: list[tuple[str, bytes]] = []
    former_slots: list[str] = []
    for item in config.get("sources", []):
        former_slots.append(str(item["pathSlot"]))
        raw_path = str(item["path"])
        if raw_path.startswith("current:"):
            sources.extend(_current_sources(root, raw_path.removeprefix("current:")))
        elif raw_path.startswith("external:"):
            sources.extend(_external_sources(raw_path.removeprefix("external:")))
        else:
            sources.extend(_git_sources(root, source_ref, raw_path))
    deduped: dict[str, bytes] = {}
    for _, data in sources:
        deduped.setdefault(hashlib.sha256(data).hexdigest(), data)
    parser = str(config.get("parser"))
    unit_turns: tuple[int, ...] = ()
    leak_texts: tuple[str, ...] = ()
    if parser == "codex-jsonl":
        unit_roles, parsed_texts, unit_turns, leak_texts = _codex_jsonl_units(list(deduped.values()))
        texts = list(parsed_texts)
        role_counts = dict(sorted(Counter(unit_roles).items()))
    else:
        texts = []
        for data in deduped.values():
            try:
                texts.append(data.decode("utf-8"))
            except UnicodeDecodeError:
                continue
    if parser == "role-headings":
        unit_roles = _role_heading_roles(texts)
        role_counts = dict(sorted(Counter(unit_roles).items()))
    elif parser == "documents":
        unit_roles = tuple("tool" for _ in deduped)
        role_counts = dict(sorted(Counter(unit_roles).items()))
    elif parser == "longest-lines":
        if not texts:
            raise ValueError("line parser requires text")
        longest = max(texts, key=lambda value: len(value.splitlines()))
        texts = [longest]
        unit_roles = tuple("assistant" for _ in longest.splitlines())
        role_counts = dict(sorted(Counter(unit_roles).items()))
    elif parser == "decision-table":
        count = sum(1 for text in texts for line in text.splitlines() if re.match(r"^\|\s*\d{4}-\d{2}-\d{2}\s*\|", line))
        unit_roles = tuple("operator" for _ in range(count))
        role_counts = dict(sorted(Counter(unit_roles).items()))
    elif parser == "git-state":
        unit_roles = tuple("tool" for _ in range(int(config.get("unitCount", 0))))
        role_counts = dict(sorted(Counter(unit_roles).items()))
    elif parser == "codex-jsonl":
        pass
    else:
        raise ValueError("unsupported source parser")
    if not role_counts or any(count <= 0 for count in role_counts.values()):
        raise ValueError(f"source parser produced no units for slot {slot_id}")
    if not leak_texts:
        leak_texts = tuple(texts)
    return AnalyzedSlot(
        id=slot_id,
        former_path_slots=tuple(former_slots),
        parser=parser,
        role_counts=role_counts,
        unique_blob_count=len(deduped),
        texts=tuple(texts),
        unit_roles=unit_roles,
        unit_turns=unit_turns,
        leak_texts=leak_texts,
    )


def analyze_source_map(root: Path, source_ref: str, source_map: dict[str, Any], slot_ids: set[str]) -> dict[str, AnalyzedSlot]:
    configured = source_map["slots"]
    missing = slot_ids - configured.keys()
    if missing:
        raise ValueError("private source map is missing required slots")
    return {slot_id: analyze_slot(root, source_ref, slot_id, configured[slot_id]) for slot_id in sorted(slot_ids)}


def allocate_ranges(count: int, event_indexes: list[int]) -> list[tuple[int, int, int]]:
    if not event_indexes:
        raise ValueError("no attributable event for source role")
    used = min(count, len(event_indexes))
    quotient, remainder = divmod(count, used)
    result = []
    start = 1
    for offset, event_index in enumerate(event_indexes[:used]):
        length = quotient + (1 if offset < remainder else 0)
        end = start + length - 1
        result.append((event_index, start, end))
        start = end + 1
    return result
