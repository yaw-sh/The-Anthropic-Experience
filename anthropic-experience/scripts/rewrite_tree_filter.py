#!/usr/bin/env python3
"""Private helper invoked only by the guarded ephemeral history rewrite."""

from __future__ import annotations

import argparse
import json
import os
import re
import shutil
import sys
from pathlib import Path

from redaction_policy import replace_sensitive_values


PLACEHOLDER = "###-PII-###"


def replacements(path: Path) -> list[str]:
    return json.loads(path.read_text(encoding="utf-8"))


def sanitize(text: str, values: list[str]) -> str:
    return replace_sensitive_values(text, values, PLACEHOLDER)[0]


def remove_paths(root: Path, paths_file: Path) -> None:
    for raw in paths_file.read_text(encoding="utf-8").splitlines():
        relative = raw.strip().rstrip("/")
        if not relative or relative.startswith("/") or ".." in Path(relative).parts:
            raise SystemExit("unsafe removal path")
        target = root / relative
        if target.is_symlink() or target.is_file():
            target.unlink()
        elif target.is_dir():
            shutil.rmtree(target)


def sanitize_tree(root: Path, values: list[str]) -> None:
    for path in sorted(root.rglob("*")):
        if not path.is_file() or path.is_symlink():
            continue
        try:
            original = path.read_text(encoding="utf-8")
        except UnicodeDecodeError:
            continue
        cleaned = sanitize(original, values)
        if cleaned != original:
            path.write_text(cleaned, encoding="utf-8")


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--inputs", required=True, type=Path)
    parser.add_argument("--message", action="store_true")
    args = parser.parse_args()
    values = replacements(args.inputs / "replacement-values.json")
    if args.message:
        sys.stdout.write(sanitize(sys.stdin.read(), values))
        return 0
    if not os.environ.get("GIT_COMMIT"):
        raise SystemExit("refusing tree rewrite outside git filter-branch")
    root = Path.cwd()
    remove_paths(root, args.inputs / "paths-to-remove.txt")
    sanitize_tree(root, values)
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
