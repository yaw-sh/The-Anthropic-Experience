#!/usr/bin/env python3
"""Prepare private git-filter-repo inputs outside the repository.

Generated rules contain sensitive values and must remain ephemeral. The script
prints counts and paths only, never the values themselves.
"""

from __future__ import annotations

import argparse
import json
import re
import subprocess
from pathlib import Path

from redaction_policy import EMAIL_PATTERN, SESSION_ID_PATTERN, contains_sensitive_value, regex_rule, sensitive_literals


ROOT = Path(__file__).resolve().parents[1]
PLACEHOLDER = "###-PII-###"


def repository_root() -> Path:
    return ROOT.parent if ROOT.name == "anthropic-experience" else ROOT


def denylist(path: Path) -> list[str]:
    return [line.strip() for line in path.read_text(encoding="utf-8").splitlines() if line.strip() and not line.lstrip().startswith("#")]


def historical_texts() -> list[str]:
    objects = subprocess.run(["git", "rev-list", "--objects", "--all"], cwd=repository_root(), capture_output=True, text=True, check=True)
    object_ids = [line.split(" ", 1)[0] for line in objects.stdout.splitlines()]
    texts: list[str] = []
    for object_id in object_ids:
        kind = subprocess.run(["git", "cat-file", "-t", object_id], cwd=repository_root(), capture_output=True, text=True, check=True).stdout.strip()
        if kind != "blob":
            continue
        blob = subprocess.run(["git", "cat-file", "blob", object_id], cwd=repository_root(), capture_output=True, check=True).stdout
        try:
            texts.append(blob.decode("utf-8"))
        except UnicodeDecodeError:
            continue
    commits = subprocess.run(["git", "log", "--all", "--format=%B%x00"], cwd=repository_root(), capture_output=True, text=True, check=True).stdout
    texts.append(commits)
    tag_refs = subprocess.run(["git", "for-each-ref", "--format=%(refname)", "refs/tags/"], cwd=repository_root(), capture_output=True, text=True, check=True).stdout.splitlines()
    for ref in tag_refs:
        kind = subprocess.run(["git", "cat-file", "-t", ref], cwd=repository_root(), capture_output=True, text=True, check=True).stdout.strip()
        if kind == "tag":
            texts.append(subprocess.run(["git", "cat-file", "tag", ref], cwd=repository_root(), capture_output=True, text=True, check=True).stdout)
    return texts


def rewrite_inventory() -> dict[str, object]:
    commits = subprocess.run(
        ["git", "log", "--all", "--reverse", "--topo-order", "--format=%H%x00%P%x00%aI%x00%cI"],
        cwd=repository_root(),
        capture_output=True,
        text=True,
        check=True,
    ).stdout.splitlines()
    refs = subprocess.run(
        [
            "git",
            "for-each-ref",
            "--format=%(refname)%00%(objecttype)%00%(objectname)%00%(*objectname)",
            "refs/heads/",
            "refs/tags/",
        ],
        cwd=repository_root(),
        capture_output=True,
        text=True,
        check=True,
    ).stdout.splitlines()
    tag_timestamps = subprocess.run(
        ["git", "for-each-ref", "--format=%(objecttype)%00%(taggerdate:iso-strict)", "refs/tags/"],
        cwd=repository_root(),
        capture_output=True,
        text=True,
        check=True,
    ).stdout.splitlines()
    return {"commits": commits, "refs": refs, "tagTimestamps": tag_timestamps}


def removed_paths(base_ref: str, extra_path: Path) -> list[str]:
    deleted = subprocess.run(
        ["git", "diff", "--no-renames", "--name-only", "--diff-filter=D", f"{base_ref}...HEAD"],
        cwd=repository_root(),
        capture_output=True,
        text=True,
        check=True,
    ).stdout.splitlines()
    extras = [line.strip() for line in extra_path.read_text(encoding="utf-8").splitlines() if line.strip() and not line.startswith("#")]
    result = sorted(set(deleted + extras))
    if any(path.startswith("/") or ".." in Path(path).parts for path in result):
        raise SystemExit("unsafe removal path")
    return result


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--denylist", required=True, type=Path)
    parser.add_argument("--base-ref", required=True)
    parser.add_argument("--extra-removal-paths", required=True, type=Path)
    parser.add_argument("--output-dir", required=True, type=Path)
    args = parser.parse_args()
    output = args.output_dir.resolve()
    if repository_root() in output.parents or output == repository_root():
        raise SystemExit("output directory must be outside the repository")
    output.mkdir(parents=True, exist_ok=False)

    values = denylist(args.denylist)
    literals: set[str] = set()
    for text in historical_texts():
        literals.update(sensitive_literals(text, values))

    rules: list[str] = []
    for value in sorted(values, key=str.casefold):
        rules.append(f"regex:{regex_rule(value)}==>{PLACEHOLDER}")
    for value in sorted(literals):
        escaped = value.replace("\\", "\\\\").replace("==>", "\\==>")
        rules.append(f"literal:{escaped}==>{PLACEHOLDER}")

    replacement_values = sorted(set(values) | literals, key=str.casefold)
    paths_to_remove = removed_paths(args.base_ref, args.extra_removal_paths)
    ref_names = subprocess.run(["git", "for-each-ref", "--format=%(refname)"], cwd=repository_root(), capture_output=True, text=True, check=True).stdout.splitlines()
    sensitive_refs = [
        name
        for name in ref_names
        if contains_sensitive_value(name, values) or EMAIL_PATTERN.search(name) or SESSION_ID_PATTERN.search(name)
    ]
    ref_renames = {
        name: f"{'refs/tags' if name.startswith('refs/tags/') else 'refs/heads'}/redacted-{index:03d}"
        for index, name in enumerate(sorted(sensitive_refs), start=1)
    }

    (output / "replace-text.txt").write_text("\n".join(rules) + "\n", encoding="utf-8")
    (output / "replacement-values.json").write_text(json.dumps(replacement_values, ensure_ascii=False) + "\n", encoding="utf-8")
    (output / "paths-to-remove.txt").write_text("\n".join(paths_to_remove) + "\n", encoding="utf-8")
    (output / "ref-renames.json").write_text(json.dumps(ref_renames, ensure_ascii=False) + "\n", encoding="utf-8")
    (output / "rewrite-inventory.json").write_text(json.dumps(rewrite_inventory(), ensure_ascii=False) + "\n", encoding="utf-8")
    (output / "README.txt").write_text(
        "Private ephemeral rewrite inputs. Do not commit, publish, or preserve after the verified rewrite is integrated.\n",
        encoding="utf-8",
    )
    print(f"rewrite_input_dir={output}")
    print(f"replacement_rule_count={len(rules)}")
    print(f"removed_path_rule_count={len(paths_to_remove)}")
    print(f"ref_rename_count={len(ref_renames)}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
