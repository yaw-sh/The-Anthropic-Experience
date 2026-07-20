#!/usr/bin/env python3
"""Finalize private refs/tags and verify topology after an ephemeral rewrite."""

from __future__ import annotations

import argparse
import hashlib
import json
import re
import subprocess
from pathlib import Path

from redaction_policy import replace_sensitive_values


PUBLIC_NAME = "Public Contributor"
PUBLIC_EMAIL = "public-contributor"


def git(repo: Path, *args: str, input_text: str | None = None) -> str:
    return subprocess.run(
        ["git", "-C", str(repo), *args],
        input=input_text,
        capture_output=True,
        text=True,
        check=True,
    ).stdout


def rename_refs(repo: Path, mapping: dict[str, str]) -> None:
    existing = set(git(repo, "for-each-ref", "--format=%(refname)").splitlines())
    for old, new in mapping.items():
        if old not in existing:
            continue
        if new in existing:
            raise ValueError("sanitized ref collision")
        target = git(repo, "rev-parse", old).strip()
        git(repo, "update-ref", new, target)
        git(repo, "update-ref", "-d", old)
        existing.remove(old)
        existing.add(new)


def rewrite_annotated_tags(repo: Path, values: list[str]) -> int:
    count = 0
    for ref in git(repo, "for-each-ref", "--format=%(refname)", "refs/tags/").splitlines():
        if git(repo, "cat-file", "-t", ref).strip() != "tag":
            continue
        raw = git(repo, "cat-file", "tag", ref)
        headers, _, message = raw.partition("\n\n")
        rows = headers.splitlines()
        timestamp = "0 +0000"
        for row in rows:
            if row.startswith("tagger "):
                match = re.search(r" (\d+ [+-]\d{4})$", row)
                if match:
                    timestamp = match.group(1)
        safe_message = replace_sensitive_values(message, values)[0]
        safe_headers = []
        for row in rows:
            if row.startswith("tag "):
                safe_headers.append(f"tag {ref.removeprefix('refs/tags/')}")
            elif row.startswith("tagger "):
                safe_headers.append(f"tagger {PUBLIC_NAME} <{PUBLIC_EMAIL}> {timestamp}")
            else:
                safe_headers.append(row)
        new_object = "\n".join(safe_headers) + "\n\n" + safe_message
        object_id = git(repo, "mktag", input_text=new_object).strip()
        git(repo, "update-ref", ref, object_id)
        count += 1
    return count


def topology_signature(rows: list[str]) -> list[str]:
    records: dict[str, tuple[list[str], str, str]] = {}
    for row in rows:
        commit, parents, authored, committed = row.split("\0")
        records[commit] = (parents.split(), authored, committed)
    cache: dict[str, str] = {}

    def fingerprint(commit: str) -> str:
        if commit in cache:
            return cache[commit]
        parents, authored, committed = records[commit]
        payload = "\0".join([authored, committed, *(fingerprint(parent) for parent in parents)])
        cache[commit] = hashlib.sha256(payload.encode("utf-8")).hexdigest()
        return cache[commit]

    return sorted(fingerprint(commit) for commit in records)


def commit_fingerprints(rows: list[str]) -> dict[str, str]:
    records: dict[str, tuple[list[str], str, str]] = {}
    for row in rows:
        commit, parents, authored, committed = row.split("\0")
        records[commit] = (parents.split(), authored, committed)
    cache: dict[str, str] = {}

    def fingerprint(commit: str) -> str:
        if commit in cache:
            return cache[commit]
        parents, authored, committed = records[commit]
        payload = "\0".join([authored, committed, *(fingerprint(parent) for parent in parents)])
        cache[commit] = hashlib.sha256(payload.encode("utf-8")).hexdigest()
        return cache[commit]

    for commit in records:
        fingerprint(commit)
    return cache


def current_inventory(repo: Path) -> list[str]:
    return git(repo, "log", "--all", "--reverse", "--topo-order", "--format=%H%x00%P%x00%aI%x00%cI").splitlines()


def current_ref_inventory(repo: Path) -> list[str]:
    return git(
        repo,
        "for-each-ref",
        "--format=%(refname)%00%(objecttype)%00%(objectname)%00%(*objectname)",
        "refs/heads/",
        "refs/tags/",
    ).splitlines()


def ref_topology_signature(
    rows: list[str], commit_rows: list[str], renames: dict[str, str]
) -> dict[str, tuple[str, str]]:
    fingerprints = commit_fingerprints(commit_rows)
    signature: dict[str, tuple[str, str]] = {}
    for row in rows:
        name, object_type, object_id, peeled_id = row.split("\0")
        normalized_name = renames.get(name, name)
        target = peeled_id if object_type == "tag" else object_id
        if target not in fingerprints:
            raise ValueError("ref does not resolve to an inventoried commit")
        if normalized_name in signature:
            raise ValueError("normalized ref collision")
        signature[normalized_name] = (object_type, fingerprints[target])
    return signature


def tag_timestamps(repo: Path) -> list[str]:
    return git(repo, "for-each-ref", "--format=%(objecttype)%00%(taggerdate:iso-strict)", "refs/tags/").splitlines()


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--mirror", required=True, type=Path)
    parser.add_argument("--inputs", required=True, type=Path)
    args = parser.parse_args()
    values = json.loads((args.inputs / "replacement-values.json").read_text(encoding="utf-8"))
    renames = json.loads((args.inputs / "ref-renames.json").read_text(encoding="utf-8"))
    before = json.loads((args.inputs / "rewrite-inventory.json").read_text(encoding="utf-8"))
    rename_refs(args.mirror, renames)
    annotated_tags = rewrite_annotated_tags(args.mirror, values)
    after_rows = current_inventory(args.mirror)
    before_signature = topology_signature(before["commits"])
    after_signature = topology_signature(after_rows)
    before_ref_signature = ref_topology_signature(before["refs"], before["commits"], renames)
    after_ref_signature = ref_topology_signature(current_ref_inventory(args.mirror), after_rows, {})
    before_tag_timestamps = sorted(row for row in before.get("tagTimestamps", []) if row.startswith("tag\x00"))
    after_tag_timestamps = sorted(row for row in tag_timestamps(args.mirror) if row.startswith("tag\x00"))
    result = {
        "commitCountBefore": len(before_signature),
        "commitCountAfter": len(after_signature),
        "topologyAndTimestampsPreserved": before_signature == after_signature,
        "taggerTimestampsPreserved": before_tag_timestamps == after_tag_timestamps,
        "refTopologyPreserved": before_ref_signature == after_ref_signature,
        "annotatedTagCount": annotated_tags,
    }
    (args.inputs / "post-rewrite-check.json").write_text(json.dumps(result, indent=2, sort_keys=True) + "\n", encoding="utf-8")
    if (
        not result["topologyAndTimestampsPreserved"]
        or not result["taggerTimestampsPreserved"]
        or not result["refTopologyPreserved"]
    ):
        raise SystemExit("rewrite changed topology, refs, or commit/tag timestamps")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
