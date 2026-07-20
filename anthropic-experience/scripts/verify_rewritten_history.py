#!/usr/bin/env python3
"""Verify an ephemeral rewritten bare mirror without publishing sensitive hits."""

from __future__ import annotations

import argparse
import io
import json
import re
import subprocess
import tempfile
from collections import Counter, defaultdict
from pathlib import Path

from PIL import Image, UnidentifiedImageError

from redaction_policy import (
    EMAIL_PATTERN,
    LOCAL_PATH_PATTERN,
    SESSION_ID_PATTERN,
    contains_sensitive_value,
    sensitive_literals,
)


ARCHIVE_EXTENSIONS = (".zip", ".tar", ".gz", ".tgz", ".7z", ".rar")
PUBLIC_IMAGE_EXTENSIONS = frozenset({".avif", ".gif", ".ico", ".jpeg", ".jpg", ".png", ".webp"})
PUBLIC_IDENTITY = "Public Contributor\x00public-contributor\x00Public Contributor\x00public-contributor"
CONTENT_ROOT = Path(__file__).resolve().parents[1]


def required_head_paths() -> set[str]:
    prefix = f"{CONTENT_ROOT.name}/" if CONTENT_ROOT.name == "anthropic-experience" else ""
    return {
        f"{prefix}OWNER-DECISIONS.md",
        f"{prefix}THE-ANTHROPIC-EXPERIENCE-MASTER-BLUEPRINT.md",
        f"{prefix}evidence/public/catalog.json",
        f"{prefix}history/README.md",
        f"{prefix}docs/audit/public-content-manifest.json",
    }


def requires_binary_scan(blob: bytes, paths: list[str]) -> bool:
    suffixes = {Path(path).suffix.lower() for path in paths}
    if suffixes & (PUBLIC_IMAGE_EXTENSIONS | set(ARCHIVE_EXTENSIONS) | {".pdf"}):
        return True
    signatures = (b"%PDF-", b"PK\x03\x04", b"\x89PNG\r\n\x1a\n", b"\xff\xd8\xff", b"GIF87a", b"GIF89a", b"RIFF")
    if blob.startswith(signatures):
        return True
    try:
        blob.decode("utf-8")
    except UnicodeDecodeError:
        return True
    return False


def embedded_metadata_bytes(blob: bytes) -> bytes:
    """Return structured metadata and trailing payloads, excluding encoded pixels."""

    regions: list[bytes] = []
    if blob.startswith(b"\x89PNG\r\n\x1a\n"):
        cursor = 8
        while cursor + 12 <= len(blob):
            length = int.from_bytes(blob[cursor:cursor + 4], "big")
            chunk_type = blob[cursor + 4:cursor + 8]
            end = cursor + 12 + length
            if end > len(blob):
                break
            payload = blob[cursor + 8:cursor + 8 + length]
            if chunk_type != b"IDAT":
                regions.append(payload)
            cursor = end
            if chunk_type == b"IEND":
                regions.append(blob[cursor:])
                break
    elif blob.startswith(b"\xff\xd8"):
        cursor = 2
        while cursor + 1 < len(blob):
            if blob[cursor] != 0xFF:
                cursor += 1
                continue
            while cursor < len(blob) and blob[cursor] == 0xFF:
                cursor += 1
            if cursor >= len(blob):
                break
            marker = blob[cursor]
            cursor += 1
            if marker == 0xD9:
                regions.append(blob[cursor:])
                break
            if marker in {0x01, *range(0xD0, 0xD8)}:
                continue
            if cursor + 2 > len(blob):
                break
            length = int.from_bytes(blob[cursor:cursor + 2], "big")
            if length < 2 or cursor + length > len(blob):
                break
            payload = blob[cursor + 2:cursor + length]
            cursor += length
            if marker == 0xDA:
                eoi = blob.rfind(b"\xff\xd9")
                if eoi >= cursor:
                    regions.append(blob[eoi + 2:])
                break
            if marker in {0xE1, 0xE2, 0xED, 0xFE}:
                regions.append(payload)
    elif len(blob) >= 12 and blob[4:8] == b"ftyp" and b"avif" in blob[8:32]:
        cursor = 0
        while cursor + 8 <= len(blob):
            size = int.from_bytes(blob[cursor:cursor + 4], "big")
            box_type = blob[cursor + 4:cursor + 8]
            header_size = 8
            if size == 1:
                if cursor + 16 > len(blob):
                    break
                size = int.from_bytes(blob[cursor + 8:cursor + 16], "big")
                header_size = 16
            elif size == 0:
                size = len(blob) - cursor
            end = cursor + size
            if size < header_size or end > len(blob):
                break
            if box_type != b"mdat":
                regions.append(blob[cursor + header_size:end])
            cursor = end
    elif blob.startswith(b"RIFF") and blob[8:12] == b"WEBP":
        cursor = 12
        while cursor + 8 <= len(blob):
            chunk_type = blob[cursor:cursor + 4]
            length = int.from_bytes(blob[cursor + 4:cursor + 8], "little")
            end = cursor + 8 + length
            if end > len(blob):
                break
            if chunk_type not in {b"VP8 ", b"VP8L", b"ANMF"}:
                regions.append(blob[cursor + 8:end])
            cursor = end + (length % 2)
        regions.append(blob[cursor:])
    return b"\n".join(regions)


def avif_decode_failure(blob: bytes) -> str | None:
    """Validate AVIF pixels with ffmpeg, which supports tiled image grids."""

    with tempfile.NamedTemporaryFile(prefix="public-avif-", suffix=".avif") as source:
        source.write(blob)
        source.flush()
        try:
            result = subprocess.run(
                ["ffmpeg", "-v", "error", "-i", source.name, "-f", "null", "-"],
                stdout=subprocess.DEVNULL,
                stderr=subprocess.PIPE,
                check=False,
            )
        except FileNotFoundError:
            return "avif-validator-unavailable"
    return None if result.returncode == 0 else "invalid-public-image"


def binary_blob_failure(blob: bytes, paths: list[str], denylist: list[str]) -> str | None:
    """Reject non-image binaries and scan allowed image bytes plus decoded metadata."""

    suffixes = {Path(path).suffix.lower() for path in paths}
    if not suffixes or not suffixes.issubset(PUBLIC_IMAGE_EXTENSIONS):
        return "non-allowlisted-binary"
    avif = suffixes == {".avif"}
    try:
        with Image.open(io.BytesIO(blob)) as image:
            if avif:
                if image.format != "AVIF":
                    return "invalid-public-image"
            else:
                image.load()
            metadata: list[str] = []
            for key, value in image.info.items():
                metadata.append(str(key))
                metadata.append(value.decode("utf-8", errors="replace") if isinstance(value, bytes) else str(value))
            metadata.extend(str(value) for value in image.getexif().values())
    except (OSError, RuntimeError, UnidentifiedImageError, ValueError):
        return "invalid-public-image"
    if avif:
        failure = avif_decode_failure(blob)
        if failure:
            return failure
    if has_sensitive_text("\n".join(metadata), denylist):
        return "sensitive-image-metadata"
    candidate_bytes = embedded_metadata_bytes(blob)
    printable = b"\n".join(re.findall(rb"[\x20-\x7e]{4,}", candidate_bytes)).decode("ascii", errors="ignore")
    if has_sensitive_text(printable, denylist):
        return "sensitive-binary-bytes"
    return None


def run(repo: Path, *args: str, text: bool = True) -> str | bytes:
    result = subprocess.run(["git", "-C", str(repo), *args], capture_output=True, check=True, text=text)
    return result.stdout


def lines(path: Path) -> list[str]:
    return [line.strip() for line in path.read_text(encoding="utf-8").splitlines() if line.strip() and not line.lstrip().startswith("#")]


def has_sensitive_text(text: str, denylist: list[str]) -> bool:
    return (
        contains_sensitive_value(text, denylist)
        or EMAIL_PATTERN.search(text) is not None
        or LOCAL_PATH_PATTERN.search(text) is not None
        or SESSION_ID_PATTERN.search(text) is not None
        or bool(sensitive_literals(text, denylist))
    )


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--mirror", required=True, type=Path)
    parser.add_argument("--denylist", required=True, type=Path)
    parser.add_argument("--removal-paths", required=True, type=Path)
    parser.add_argument("--post-rewrite-check", required=True, type=Path)
    parser.add_argument("--report", required=True, type=Path)
    args = parser.parse_args()
    mirror = args.mirror.resolve()
    if run(mirror, "rev-parse", "--is-bare-repository").strip() != "true":
        raise SystemExit("mirror must be bare")

    denylist = lines(args.denylist)
    removed = set(lines(args.removal_paths))
    paths: set[str] = set()
    commits = run(mirror, "rev-list", "--all").splitlines()
    object_paths: dict[str, set[str]] = defaultdict(set)
    for commit in commits:
        for row in run(mirror, "ls-tree", "-r", commit).splitlines():
            header, path = row.split("\t", 1)
            object_id = header.split()[2]
            paths.add(path)
            object_paths[object_id].add(path)
    path_failures = [
        path
        for path in paths
        if path in removed
        or path.lower().endswith(ARCHIVE_EXTENSIONS)
        or contains_sensitive_value(path, denylist)
        or EMAIL_PATTERN.search(path)
        or SESSION_ID_PATTERN.search(path)
    ]

    object_lines = run(mirror, "rev-list", "--objects", "--all").splitlines()
    blob_count = 0
    binary_archive_count = 0
    binary_privacy_failures: Counter[str] = Counter()
    text_corpus: list[str] = []
    for line in object_lines:
        object_id = line.split(" ", 1)[0]
        kind = run(mirror, "cat-file", "-t", object_id).strip()
        if kind == "blob":
            blob_count += 1
            blob = run(mirror, "cat-file", "blob", object_id, text=False)
            if blob[:4] in {b"PK\x03\x04", b"PK\x05\x06", b"PK\x07\x08"}:
                binary_archive_count += 1
            paths_for_object = sorted(object_paths.get(object_id, set()))
            if requires_binary_scan(blob, paths_for_object):
                failure = binary_blob_failure(blob, sorted(object_paths.get(object_id, set())), denylist)
                if failure:
                    binary_privacy_failures[failure] += 1
            else:
                text_corpus.append(blob.decode("utf-8"))
        elif kind == "tag":
            text_corpus.append(run(mirror, "cat-file", "tag", object_id))
    text_corpus.append(run(mirror, "log", "--all", "--format=%B"))
    sensitive_content_failures = sum(has_sensitive_text(text, denylist) for text in text_corpus)

    refs = run(mirror, "for-each-ref", "--format=%(refname)").splitlines()
    ref_failures = [ref for ref in refs if has_sensitive_text(ref, denylist)]
    identities = run(mirror, "log", "--all", "--format=%an%x00%ae%x00%cn%x00%ce").splitlines()
    identity_failures = [row for row in identities if row != PUBLIC_IDENTITY]
    tagger_rows = []
    for ref in run(mirror, "for-each-ref", "--format=%(refname)", "refs/tags/").splitlines():
        if run(mirror, "cat-file", "-t", ref).strip() != "tag":
            continue
        raw = run(mirror, "cat-file", "tag", ref)
        tagger_rows.extend(row for row in raw.splitlines() if row.startswith("tagger "))
    tagger_failures = [row for row in tagger_rows if not row.startswith("tagger Public Contributor <public-contributor> ")]

    topology = json.loads(args.post_rewrite_check.read_text(encoding="utf-8"))
    topology_ok = (
        topology.get("topologyAndTimestampsPreserved") is True
        and topology.get("taggerTimestampsPreserved") is True
        and topology.get("refTopologyPreserved") is True
        and topology.get("commitCountBefore") == topology.get("commitCountAfter")
    )

    canonical_required_paths = required_head_paths()
    heads = run(mirror, "for-each-ref", "--format=%(refname)", "refs/heads/").splitlines()
    canonical_heads = []
    for ref in heads:
        head_paths = set(run(mirror, "ls-tree", "-r", "--name-only", ref).splitlines())
        if canonical_required_paths.issubset(head_paths):
            canonical_heads.append(ref)

    checks = {
        "removedAndSensitivePaths": "pass" if not path_failures else "fail",
        "archiveBinaries": "pass" if binary_archive_count == 0 else "fail",
        "binaryPrivacy": "pass" if not binary_privacy_failures else "fail",
        "sensitiveBlobCommitTagContent": "pass" if sensitive_content_failures == 0 else "fail",
        "refNames": "pass" if not ref_failures else "fail",
        "commitIdentity": "pass" if not identity_failures else "fail",
        "taggerIdentity": "pass" if not tagger_failures else "fail",
        "topologyAndTimestamps": "pass" if topology_ok else "fail",
        "canonicalHead": "pass" if canonical_heads else "fail",
    }
    report = {
        "schemaVersion": "1.0.0",
        "checks": checks,
        "counts": {
            "commitCount": len(commits),
            "pathCount": len(paths),
            "blobCount": blob_count,
            "removedOrSensitivePathFailures": len(path_failures),
            "archiveBinaryFailures": binary_archive_count,
            "binaryPrivacyFailureCount": sum(binary_privacy_failures.values()),
            "binaryPrivacyFailureReasons": dict(sorted(binary_privacy_failures.items())),
            "sensitiveContentFailures": sensitive_content_failures,
            "refNameFailures": len(ref_failures),
            "commitIdentityFailures": len(identity_failures),
            "taggerIdentityFailures": len(tagger_failures),
            "canonicalHeadCount": len(canonical_heads),
        },
    }
    args.report.write_text(json.dumps(report, indent=2, sort_keys=True) + "\n", encoding="utf-8")
    print(json.dumps(report, indent=2, sort_keys=True))
    return 0 if all(value == "pass" for value in checks.values()) else 1


if __name__ == "__main__":
    raise SystemExit(main())
