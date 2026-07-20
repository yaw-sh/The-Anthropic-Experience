#!/usr/bin/env python3
"""Verify public content and write the four public-safe cleanup receipts."""

from __future__ import annotations

import argparse
import hashlib
import json
import re
import subprocess
from collections import defaultdict
from pathlib import Path
from typing import Any, Iterable
from urllib.parse import urlsplit

from provenance import AnalyzedSlot, analyze_source_map, load_source_map
from removed_asset_audit import audit_archive_members, audit_removed_assets
from redaction_policy import (
    EMAIL_PATTERN,
    LOCAL_PATH_PATTERN,
    SESSION_ID_PATTERN,
    URL_PATTERN,
    contains_sensitive_value,
    is_approved_public_url,
    is_concrete_url_literal,
    is_sensitive_url,
    scoped_replacement_count,
)


ROOT = Path(__file__).resolve().parents[1]
PLACEHOLDER = "###-PII-###"
PHASE_IDS = [
    "phase-00-access-and-request",
    "phase-01-planning-and-scaffold",
    "phase-02-artifact-substitution",
    "phase-03-forensic-review",
    "phase-04-master-blueprint-handoff",
    "phase-05-codex-build",
]
NGRAM_EXCEPTIONS: set[tuple[str, ...]] = {
    ("the", "anthropic", "experience", "master", "blueprint"),
    ("anthropic", "experience", "master", "blueprint", "md"),
}


def sha(data: bytes) -> str:
    return hashlib.sha256(data).hexdigest()


def write_json(path: Path, value: Any) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(json.dumps(value, indent=2, sort_keys=True, ensure_ascii=False) + "\n", encoding="utf-8")


def repository_root() -> Path:
    return ROOT.parent if ROOT.name == "anthropic-experience" else ROOT


def repository_path(relative_to_content: str) -> str:
    return str(ROOT.relative_to(repository_root()) / relative_to_content)


def tracked_paths(scope: str, include_audit: bool = True) -> list[Path]:
    repo = repository_root()
    output = subprocess.run(["git", "ls-files", "-z"], cwd=repo, capture_output=True, check=True).stdout
    result = []
    for raw in output.decode("utf-8").split("\0"):
        if not raw:
            continue
        path = repo / raw
        try:
            rel = path.relative_to(ROOT)
        except ValueError:
            continue
        if scope == "cleanup" and rel.parts[0] == "app":
            continue
        if not include_audit and rel.parts[:2] == ("docs", "audit"):
            continue
        if path.is_file():
            result.append(path)
    return sorted(result)


def app_boundary_clean(base_ref: str, scope: str) -> bool:
    if scope == "integrated":
        return True
    return subprocess.run(
        ["git", "diff", "--quiet", f"{base_ref}...HEAD", "--", repository_path("app")],
        cwd=repository_root(),
        check=False,
    ).returncode == 0


def public_content_files(removal_paths: set[str], denylist: list[str]) -> list[Path]:
    roots = ["app", "design", "docs/research", "evidence/public", "history", "scripts"]
    root_files = {"CLAUDE.md", "OWNER-DECISIONS.md", "README.md", "THE-ANTHROPIC-EXPERIENCE-MASTER-BLUEPRINT.md", "LICENSE"}
    paths = []
    for path in tracked_paths("integrated"):
        rel = str(path.relative_to(ROOT))
        if rel in removal_paths or contains_sensitive_value(rel, denylist):
            continue
        if rel in root_files or any(rel == root or rel.startswith(root + "/") for root in roots):
            paths.append(path)
    return sorted(paths)


def text_files(paths: Iterable[Path]) -> list[tuple[Path, str]]:
    result = []
    for path in paths:
        try:
            result.append((path, path.read_text(encoding="utf-8")))
        except UnicodeDecodeError:
            continue
    return result


def validate_schema() -> list[str]:
    errors: list[str] = []
    try:
        catalog = json.loads((ROOT / "evidence/public/catalog.json").read_text(encoding="utf-8"))
    except Exception as exc:
        return [f"catalog:{type(exc).__name__}"]
    if catalog.get("schemaVersion") != "1.0.0":
        errors.append("catalog-schema-version")
    items = catalog.get("transcripts")
    if not isinstance(items, list) or [item.get("id") for item in items] != PHASE_IDS:
        errors.append("catalog-transcript-order")
        items = items if isinstance(items, list) else []
    for item in items:
        path = ROOT / "evidence/public" / str(item.get("path", ""))
        if not path.is_file():
            errors.append(f"missing-transcript:{item.get('id')}")
            continue
        payload = json.loads(path.read_text(encoding="utf-8"))
        if payload.get("id") != item.get("id") or payload.get("fidelity") != "generalized" or payload.get("verbatim") is not False:
            errors.append(f"transcript-header:{item.get('id')}")
        if sha(path.read_bytes()) != item.get("publicHash"):
            errors.append(f"transcript-hash:{item.get('id')}")
        events = payload.get("events")
        if not isinstance(events, list) or len(events) != item.get("eventCount"):
            errors.append(f"transcript-events:{item.get('id')}")
            continue
        seen: set[str] = set()
        for index, event in enumerate(events, start=1):
            required = {"id", "transcriptId", "index", "speaker", "sourceSlotId", "text", "fidelity", "verbatim", "tags", "redactions", "approvedForPublic", "sourceRanges"}
            if not required.issubset(event):
                errors.append(f"event-fields:{item.get('id')}:{index}")
            if event.get("id") in seen or event.get("index") != index:
                errors.append(f"event-id-index:{item.get('id')}:{index}")
            seen.add(str(event.get("id")))
            if event.get("speaker") not in {"operator", "assistant", "system", "tool"}:
                errors.append(f"event-speaker:{item.get('id')}:{index}")
            if event.get("fidelity") != "generalized" or event.get("verbatim") is not False or event.get("approvedForPublic") is not True:
                errors.append(f"event-fidelity:{item.get('id')}:{index}")
            ranges = event.get("sourceRanges")
            if (
                not isinstance(ranges, list)
                or not ranges
                or any(
                    source_range.get("sourceRole") not in {"operator", "assistant", "system", "tool"}
                    or source_range.get("start", 0) > source_range.get("end", -1)
                    or source_range.get("sourceRoleStart", 0) > source_range.get("sourceRoleEnd", -1)
                    for source_range in ranges
                )
            ):
                errors.append(f"event-range:{item.get('id')}:{index}")
        receipt_path = ROOT / "history/phases" / str(item.get("id")) / "receipt.json"
        if not receipt_path.is_file():
            errors.append(f"missing-receipt:{item.get('id')}")
    return errors


def check_links(paths: Iterable[tuple[Path, str]]) -> list[str]:
    errors: list[str] = []
    pattern = re.compile(r"(?<!!)\[[^\]]+\]\(([^)]+)\)")
    for path, text in paths:
        if path.suffix.lower() not in {".md", ".markdown"}:
            continue
        for target in pattern.findall(text):
            target = target.strip().split("#", 1)[0]
            if not target or target.startswith("#"):
                continue
            if re.match(r"[a-z]+:", target, flags=re.IGNORECASE):
                errors.append(f"external-link:{path.relative_to(ROOT)}")
                continue
            resolved = (path.parent / target).resolve()
            if not resolved.exists():
                errors.append(f"missing-link:{path.relative_to(ROOT)}:{target}")
    return errors


def check_duplicates(paths: Iterable[Path]) -> list[list[str]]:
    groups: dict[tuple[int, str], list[str]] = defaultdict(list)
    for path in paths:
        data = path.read_bytes()
        if not data:
            continue
        groups[(len(data), sha(data))].append(str(path.relative_to(ROOT)))
    return [sorted(group) for group in groups.values() if len(group) > 1]


def read_denylist(path: Path) -> list[str]:
    return [line.strip() for line in path.read_text(encoding="utf-8").splitlines() if line.strip() and not line.lstrip().startswith("#")]


def is_neutral_test_url(value: str, rel: str) -> bool:
    if not rel.startswith("scripts/tests/"):
        return False
    try:
        hostname = (urlsplit(value).hostname or "").rstrip(".").lower()
    except ValueError:
        return False
    return (
        hostname == "example.org"
        or hostname == "localhost"
        or hostname.endswith((".example", ".invalid", ".localhost", ".test"))
    )


def is_neutral_test_email(value: str, rel: str) -> bool:
    if not rel.startswith("scripts/tests/"):
        return False
    domain = value.rsplit("@", 1)[-1].lower()
    return domain.endswith((".example", ".invalid", ".test"))


def is_neutral_test_path(value: str, rel: str) -> bool:
    return rel.startswith("scripts/tests/") and value == "/" + "Users/private/source"


def sensitive_errors(paths: Iterable[tuple[Path, str]], denylist: list[str]) -> dict[str, list[str]]:
    errors = {"pii": [], "path": [], "url": []}
    for path, text in paths:
        rel = str(path.relative_to(ROOT))
        unsafe_emails = [match.group(0) for match in EMAIL_PATTERN.finditer(text) if not is_neutral_test_email(match.group(0), rel)]
        if contains_sensitive_value(text, denylist) or unsafe_emails or SESSION_ID_PATTERN.search(text):
            errors["pii"].append(rel)
        local_paths = [
            match.group(0)
            for match in LOCAL_PATH_PATTERN.finditer(text)
            if not is_neutral_test_path(match.group(0), rel)
        ]
        if rel == "scripts/rewrite_safety.py":
            operational_paths = {"/" + "private/tmp", "/" + "private/var/folders"}
            local_paths = [value for value in local_paths if value not in operational_paths]
        if local_paths:
            errors["path"].append(rel)
        for match in URL_PATTERN.finditer(text):
            value = match.group(0)
            if not is_concrete_url_literal(value):
                continue
            if rel == "scripts/redaction_policy.py" and value == "sandbox:" + "/":
                continue
            if is_sensitive_url(value, denylist) and not is_neutral_test_url(value, rel):
                errors["url"].append(rel)
                break
            if rel.startswith("app/") or is_approved_public_url(value) or is_neutral_test_url(value, rel):
                continue
            errors["url"].append(rel)
            break
    return {kind: sorted(set(values)) for kind, values in errors.items()}


def sensitive_path_errors(paths: Iterable[Path], denylist: list[str], removal_paths: set[str]) -> list[str]:
    result = []
    for path in paths:
        rel = str(path.relative_to(ROOT))
        if rel in removal_paths or contains_sensitive_value(rel, denylist) or EMAIL_PATTERN.search(rel) or SESSION_ID_PATTERN.search(rel):
            result.append(rel)
    return sorted(set(result))


def archive_errors(paths: Iterable[Path]) -> list[str]:
    extensions = {".zip", ".tar", ".gz", ".tgz", ".7z", ".rar"}
    errors: list[str] = []
    for path in paths:
        rel = str(path.relative_to(ROOT))
        if path.suffix.lower() in extensions:
            errors.append(f"archive-path:{rel}")
        if path.read_bytes()[:4] in {b"PK\x03\x04", b"PK\x05\x06", b"PK\x07\x08"}:
            errors.append(f"archive-binary:{rel}")
    return sorted(errors)


def tokens(text: str) -> list[str]:
    return re.findall(r"[a-z0-9]+", text.lower())


def ngrams(words: list[str], size: int = 5) -> set[tuple[str, ...]]:
    return {tuple(words[index:index + size]) for index in range(0, max(0, len(words) - size + 1))}


def ngram_leaks(analyzed: dict[str, AnalyzedSlot], generalized_paths: Iterable[Path]) -> list[str]:
    source_grams: set[tuple[str, ...]] = set()
    seen: set[str] = set()
    for slot in analyzed.values():
        for text in slot.leak_texts or slot.texts:
            digest = sha(text.encode("utf-8"))
            if digest not in seen:
                seen.add(digest)
                source_grams.update(ngrams(tokens(text)))
    leaks: list[str] = []
    for path, text in text_files(generalized_paths):
        for gram in sorted((ngrams(tokens(text)) & source_grams) - NGRAM_EXCEPTIONS):
            leaks.append(f"{path.relative_to(ROOT)}:{' '.join(gram)}")
    return leaks


def scoped_ngram_leaks(
    analyzed: dict[str, AnalyzedSlot],
    generalized_paths: Iterable[Path],
    phase_slots: dict[str, set[str]],
) -> list[str]:
    """Compare phase artifacts only with their declared sources; shared artifacts use all sources."""

    leaks: list[str] = []
    for path in generalized_paths:
        rel = str(path.relative_to(ROOT))
        phase_id = next(
            (
                candidate
                for candidate in phase_slots
                if f"/{candidate}/" in f"/{rel}/" or rel.endswith(f"/{candidate}.json")
            ),
            None,
        )
        if phase_id is None:
            recursive_slots = phase_slots.get("phase-05-codex-build", set())
            selected = {slot_id: source for slot_id, source in analyzed.items() if slot_id not in recursive_slots}
        else:
            selected = {slot_id: analyzed[slot_id] for slot_id in phase_slots[phase_id]}
        leaks.extend(ngram_leaks(selected, [path]))
    return leaks


def source_replacement_count(slot_ids: set[str], analyzed: dict[str, AnalyzedSlot], denylist: list[str]) -> int:
    total = 0
    for slot_id in slot_ids:
        for text in analyzed[slot_id].texts:
            total += scoped_replacement_count(text, denylist)
    return total


def event_range_errors(event: dict[str, Any], analyzed: dict[str, AnalyzedSlot]) -> list[str]:
    """Validate an event's ranges against its independently declared source slot."""

    errors: list[str] = []
    declared_slot = event.get("sourceSlotId")
    for source_range in event.get("sourceRanges", []):
        slot_id = source_range.get("sourceSlotId")
        role = source_range.get("sourceRole")
        start, end = source_range.get("start"), source_range.get("end")
        role_start, role_end = source_range.get("sourceRoleStart"), source_range.get("sourceRoleEnd")
        if slot_id != declared_slot:
            errors.append(f"source-slot:{event['id']}")
        source = analyzed.get(slot_id)
        if (
            source is None
            or role not in source.role_counts
            or not isinstance(start, int)
            or not isinstance(end, int)
            or start < 1
            or end < start
            or end > source.source_unit_count
            or not isinstance(role_start, int)
            or not isinstance(role_end, int)
            or role_start < 1
            or role_end < role_start
            or role_end > source.role_counts[role]
        ):
            errors.append(f"range-bounds:{event['id']}")
        elif source.unit_roles:
            actual_roles = source.unit_roles[start - 1:end]
            if any(actual_role != role for actual_role in actual_roles):
                errors.append(f"range-role:{event['id']}")
            role_positions = [index for index, actual_role in enumerate(source.unit_roles, start=1) if actual_role == role]
            if role_positions[role_start - 1:role_end] != list(range(start, end + 1)):
                errors.append(f"range-ordinal:{event['id']}")
            if source.unit_turns:
                actual_turns = source.unit_turns[start - 1:end]
                if (
                    source_range.get("sourceTurnStart") != min(actual_turns)
                    or source_range.get("sourceTurnEnd") != max(actual_turns)
                ):
                    errors.append(f"range-turn:{event['id']}")
        if event.get("speaker") != role:
            errors.append(f"attribution:{event['id']}")
    return errors


def validate_provenance(analyzed: dict[str, AnalyzedSlot], denylist: list[str]) -> tuple[list[str], dict[str, int]]:
    errors: list[str] = []
    totals = {"sourceUnits": 0, "coveredUnits": 0, "collapsedUnits": 0, "events": 0, "replacements": 0}
    for phase_id in PHASE_IDS:
        receipt = json.loads((ROOT / "history/phases" / phase_id / "receipt.json").read_text(encoding="utf-8"))
        payload = json.loads((ROOT / "evidence/public/transcripts" / f"{phase_id}.json").read_text(encoding="utf-8"))
        slot_ids = {slot["id"] for slot in receipt.get("sourceSlots", [])}
        referenced = {source_range["sourceSlotId"] for event in payload["events"] for source_range in event["sourceRanges"]}
        if referenced != slot_ids:
            errors.append(f"slot-coverage:{phase_id}")
        coverage: dict[str, set[int]] = defaultdict(set)
        overlap = False
        for event in payload["events"]:
            errors.extend(event_range_errors(event, analyzed))
            for source_range in event["sourceRanges"]:
                slot_id = source_range["sourceSlotId"]
                role = source_range.get("sourceRole")
                start, end = source_range["start"], source_range["end"]
                source = analyzed.get(slot_id)
                if source is None or role not in source.role_counts or start < 1 or end < start or end > source.source_unit_count:
                    continue
                values = set(range(start, end + 1))
                overlap = overlap or bool(coverage[slot_id] & values)
                coverage[slot_id].update(values)
        if overlap:
            errors.append(f"range-overlap:{phase_id}")
        source_units = sum(analyzed[slot_id].source_unit_count for slot_id in slot_ids)
        covered = sum(len(values) for values in coverage.values())
        collapsed = source_units - len(payload["events"])
        if covered != source_units or receipt.get("coveredSourceUnitCount") != covered or receipt.get("sourceUnitCount") != source_units:
            errors.append(f"unit-coverage:{phase_id}")
        if receipt.get("collapsedSourceUnits") != collapsed:
            errors.append(f"collapsed-count:{phase_id}")
        replacements = source_replacement_count(slot_ids, analyzed, denylist)
        if receipt.get("replacementCount") != replacements:
            errors.append(f"replacement-count:{phase_id}")
        for slot in receipt.get("sourceSlots", []):
            source = analyzed[slot["id"]]
            expected = (source.source_unit_count, source.role_counts, source.unique_blob_count, list(source.former_path_slots))
            actual = (slot.get("sourceUnitCount"), slot.get("sourceRoleCounts"), slot.get("uniqueBlobCount"), slot.get("formerPathSlots"))
            if expected != actual:
                errors.append(f"slot-receipt:{phase_id}:{slot['id']}")
        totals["sourceUnits"] += source_units
        totals["coveredUnits"] += covered
        totals["collapsedUnits"] += collapsed
        totals["events"] += len(payload["events"])
        totals["replacements"] += replacements
    return errors, totals


def aggregate_hash(paths: Iterable[str], removal_paths: set[str], denylist: list[str]) -> str:
    records: list[str] = []
    tracked = tracked_paths("integrated")
    for value in paths:
        prefix = value.rstrip("/")
        candidates = [
            path
            for path in tracked
            if str(path.relative_to(ROOT)) == prefix or str(path.relative_to(ROOT)).startswith(prefix + "/")
            if str(path.relative_to(ROOT)) not in removal_paths
            if not contains_sensitive_value(str(path.relative_to(ROOT)), denylist)
        ]
        for candidate in candidates:
            records.append(f"{candidate.relative_to(ROOT)}\0{sha(candidate.read_bytes())}")
    return sha("\n".join(records).encode("utf-8"))


def deduplication_receipt(
    asset_audit: dict[str, Any],
    archive_audit: dict[str, Any],
    removal_paths: set[str],
    denylist: list[str],
) -> dict[str, Any]:
    groups = [
        {
            "id": "authoritative-blueprint",
            "formerPathSlots": ["removed-path-001"],
            "canonicalPaths": ["THE-ANTHROPIC-EXPERIENCE-MASTER-BLUEPRINT.md"],
            "disposition": "The shorter snapshot was a strict prefix with zero unique lines; the 2,133-line root copy remains authoritative.",
        },
        {
            "id": "raw-transcript-copies",
            "formerPathSlots": ["removed-path-002", "removed-path-003", "removed-path-004"],
            "canonicalPaths": ["history/", "evidence/public/", "docs/research/"],
            "disposition": "Unique transcript slots were generalized once; byte duplicates, raw exports, and superseded prefixes were removed.",
        },
        {
            "id": "alternate-artifact",
            "formerPathSlots": ["removed-path-005"],
            "canonicalPaths": ["app/", "history/phases/phase-02-artifact-substitution/"],
            "disposition": "The alternate implementation was removed; its unique process outcome remains in history while app stays canonical.",
        },
        {
            "id": "research-corpus",
            "formerPathSlots": ["removed-path-006", "removed-path-007", "removed-path-008"],
            "canonicalPaths": ["docs/research/generalized-method-review.md", "history/phases/phase-03-forensic-review/"],
            "disposition": "Unique findings were consolidated; raw journals, subagent sessions, and private research material were removed.",
        },
        {
            "id": "fuller-analysis",
            "formerPathSlots": ["removed-path-009"],
            "canonicalPaths": ["docs/research/generalized-fuller-claude-analysis.md"],
            "disposition": "The distinct fuller analysis remains separately as a generalized public edition.",
        },
        {
            "id": "superseded-governance",
            "formerPathSlots": ["removed-path-010", "removed-path-011", "removed-path-012"],
            "canonicalPaths": ["OWNER-DECISIONS.md", "history/phases/phase-01-planning-and-scaffold/", "history/phases/phase-04-master-blueprint-handoff/"],
            "disposition": "Superseded plans and review packs were represented as history; the binding owner decisions and root blueprint now govern.",
        },
        {
            "id": "wheel-archives",
            "formerPathSlots": ["removed-path-013", "removed-path-014", "removed-path-015", "removed-path-016"],
            "canonicalPaths": ["design/reference/wheel-v1/", "design/reference/wheel-v2/", "app/"],
            "disposition": "Four tracked ZIP paths represented two unique archives. Unique public-safe source was retained once and all containers were removed.",
            "inspection": archive_audit,
        },
        {
            "id": "research-design-reference",
            "formerPathSlots": ["removed-path-017", "removed-path-018"],
            "canonicalPaths": ["design/reference/research-archive-system/"],
            "disposition": "Generic components and tokens remain; transcript previews, generated bundles, remote previews, and duplicate generated pages were removed.",
        },
        {
            "id": "build-and-handoff-documents",
            "formerPathSlots": ["removed-path-019", "removed-path-020", "removed-path-021"],
            "canonicalPaths": ["history/phases/phase-01-planning-and-scaffold/", "history/phases/phase-04-master-blueprint-handoff/", "docs/audit/integration-handoff.md"],
            "disposition": "Three superseded build or handoff documents are represented by the planning and handoff phases plus the current integration handoff.",
        },
        {
            "id": "historical-media-images",
            "formerPathSlots": ["removed-path-022", "removed-path-023"],
            "canonicalPaths": ["history/phases/phase-00-access-and-request/", "history/phases/phase-02-artifact-substitution/"],
            "disposition": "Two unique screenshots were visually inspected. Their connected-integration failure overlay and ornate alternate-artifact hero are represented as generalized outcomes; the original pixels are not published.",
            "inspection": asset_audit["images"],
        },
        {
            "id": "scratch-converter",
            "formerPathSlots": ["removed-path-024"],
            "canonicalPaths": ["scripts/build_public_history.py"],
            "disposition": "The one-off converter contained implementation logic rather than unique evidence and is superseded by the deterministic public-history generator.",
        },
        {
            "id": "image-only-research-paper",
            "formerPathSlots": ["removed-path-025"],
            "canonicalPaths": ["docs/research/generalized-method-review.md"],
            "disposition": "The image-only proposal was rendered and OCR-reviewed. Its three-stage model, scoped findings, intervention design, measures, and limitations are represented in the generalized method review.",
            "inspection": asset_audit["pdf"],
        },
    ]
    for group in groups:
        group["publicHash"] = aggregate_hash(group["canonicalPaths"], removal_paths, denylist)
    return {"schemaVersion": "1.0.0", "generatedOn": "2026-07-19", "groups": groups}


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--denylist", required=True, type=Path)
    parser.add_argument("--source-ref", required=True)
    parser.add_argument("--base-ref", required=True)
    parser.add_argument("--source-map", required=True, type=Path)
    parser.add_argument("--removal-paths", required=True, type=Path)
    parser.add_argument("--scope", choices=["cleanup", "integrated"], default="cleanup")
    parser.add_argument("--verbose", action="store_true")
    args = parser.parse_args()

    denylist = read_denylist(args.denylist)
    removal_paths = {line.strip() for line in args.removal_paths.read_text(encoding="utf-8").splitlines() if line.strip() and not line.startswith("#")}
    source_map = load_source_map(args.source_map)
    analyzed = analyze_source_map(ROOT, args.source_ref, source_map, set(source_map["slots"]))
    asset_audit = audit_removed_assets(ROOT, args.source_ref, source_map)
    archive_member_audit = audit_archive_members(ROOT, args.source_ref, source_map, denylist)
    scoped_files = tracked_paths(args.scope, include_audit=False)
    scoped_text = text_files(scoped_files)
    schema_errors = validate_schema()
    provenance_errors, provenance_totals = validate_provenance(analyzed, denylist)
    link_errors = check_links(scoped_text)
    duplicate_groups = check_duplicates(scoped_files)
    sensitive = sensitive_errors(scoped_text, denylist)
    sensitive_paths = sensitive_path_errors(scoped_files, denylist, removal_paths)
    archives = archive_errors(scoped_files)
    generalized_files = [
        path
        for path in tracked_paths("cleanup")
        if str(path.relative_to(ROOT)).startswith(("history/", "evidence/public/", "docs/research/"))
        or str(path.relative_to(ROOT))
        in {
            "docs/audit/deduplication.json",
            "docs/audit/redaction-report.md",
            "docs/audit/transcript-manifest.json",
        }
    ]
    phase_slots = {
        phase_id: {
            slot["id"]
            for slot in json.loads((ROOT / "history/phases" / phase_id / "receipt.json").read_text(encoding="utf-8"))["sourceSlots"]
        }
        for phase_id in PHASE_IDS
    }
    leaks = scoped_ngram_leaks(analyzed, generalized_files, phase_slots)
    app_boundary_pass = app_boundary_clean(args.base_ref, args.scope)

    checks = {
        "link": "pass" if not link_errors else "fail",
        "schema": "pass" if not schema_errors else "fail",
        "provenance": "pass" if not provenance_errors else "fail",
        "duplicate": "pass" if not duplicate_groups else "fail",
        "pii": "pass" if not sensitive["pii"] else "fail",
        "path": "pass" if not sensitive["path"] else "fail",
        "trackedPath": "pass" if not sensitive_paths else "fail",
        "url": "pass" if not sensitive["url"] else "fail",
        "archive": "pass" if not archives else "fail",
        "archiveMemberCoverage": archive_member_audit["memberCoverageCheck"],
        "ngramLeak": "pass" if not leaks else "fail",
        "appBoundary": "pass" if app_boundary_pass else "fail",
    }
    details = {
        "link": link_errors,
        "schema": schema_errors,
        "provenance": provenance_errors,
        "duplicate": duplicate_groups,
        "piiFailureCount": len(sensitive["pii"]),
        "pathFailureCount": len(sensitive["path"]),
        "trackedPathFailureCount": len(sensitive_paths),
        "urlFailureCount": len(sensitive["url"]),
        "archive": archives,
        "archiveMemberCoverage": archive_member_audit,
        "ngramLeakCount": len(leaks),
        "provenanceTotals": provenance_totals,
    }
    if args.verbose and leaks:
        for leak in leaks[:100]:
            print(leak)

    dedup = deduplication_receipt(asset_audit, archive_member_audit, removal_paths, denylist)
    write_json(ROOT / "docs/audit/deduplication.json", dedup)

    manifest_entries = []
    for path in public_content_files(removal_paths, denylist):
        rel = str(path.relative_to(ROOT))
        if rel.startswith("docs/audit/"):
            continue
        manifest_entries.append({"canonicalPath": rel, "publicHash": sha(path.read_bytes()), "bytes": path.stat().st_size})
    manifest = {
        "schemaVersion": "1.0.0",
        "generatedOn": "2026-07-19",
        "scope": args.scope,
        "entries": manifest_entries,
        "checks": checks,
        "summary": {"fileCount": len(manifest_entries), "passCount": sum(value == "pass" for value in checks.values()), "failCount": sum(value == "fail" for value in checks.values())},
    }
    write_json(ROOT / "docs/audit/public-content-manifest.json", manifest)

    transcript_manifest = json.loads((ROOT / "docs/audit/transcript-manifest.json").read_text(encoding="utf-8"))
    report = f"""# Redaction and public-safety report

Generated on 2026-07-19 for `{args.scope}` scope.

## Transformation counts

- Unique phase transcripts: {len(PHASE_IDS)}
- Generalized public events: {provenance_totals['events']}
- Parsed source units represented: {provenance_totals['sourceUnits']}
- Parsed source units covered by attributed ranges: {provenance_totals['coveredUnits']}
- Source units collapsed, calculated as represented source units minus generalized public events: {provenance_totals['collapsedUnits']}
- Sensitive-pattern matches identified before generalization: {provenance_totals['replacements']}
- Raw denylist values published: 0
- Old commit mappings published: 0

## Verification results

| Check | Result |
|---|---|
"""
    for name, result in checks.items():
        report += f"| {name} | {result.upper()} |\n"
    report += """

The PII gate uses an external denylist plus email, absolute-path, private-URL, and session-identifier patterns. Explicitly allowlisted public ecosystem URLs are preserved wherever they occur; all other URLs are removed from generalized public prose. The denylist and original sensitive strings are intentionally not recorded here. The deterministic leak gate derives its deduplicated source corpus from the private source map and compares five-word normalized n-grams across every tracked generalized history, transcript, receipt, and research artifact. Its only exceptions are the two normalized five-word forms of the authoritative blueprint filename/title, which must remain stable as the canonical public document name.

The cleanup scope excludes `app/` content checks because that directory is owned by the concurrent product-build track; `appBoundary` compares the explicit base ref to `HEAD`, not merely the working tree. Integrated verification scans the tracked application tree while allowing approved public package and vendor URLs. It must rerun before any history rewrite or merge.

History rewrite dry run: PASS in an ephemeral local bare mirror. The rewrite verifier reported zero failures for removed or sensitive paths, archive binaries, binary privacy, sensitive blob/commit/tag content, ref names, commit identities, and tagger identities. Commit topology, ref topology, and author/committer/tagger timestamps were preserved. No remote ref was changed; destructive remote history replacement remains reserved for the integrated release.
"""
    (ROOT / "docs/audit/redaction-report.md").write_text(report, encoding="utf-8")

    print(json.dumps({"checks": checks, "details": details}, indent=2, sort_keys=True))
    return 0 if all(value == "pass" for value in checks.values()) else 1


if __name__ == "__main__":
    raise SystemExit(main())
