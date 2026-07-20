#!/usr/bin/env python3
"""Replace sensitive text in explicitly selected public files.

The denylist is supplied outside the repository. Output reports counts only and
never echoes matched values.
"""

from __future__ import annotations

import argparse
from pathlib import Path

from redaction_policy import sanitize_public_text


PLACEHOLDER = "###-PII-###"


def denylist(path: Path) -> list[str]:
    return [line.strip() for line in path.read_text(encoding="utf-8").splitlines() if line.strip() and not line.lstrip().startswith("#")]


def sanitize(text: str, values: list[str]) -> tuple[str, int]:
    return sanitize_public_text(text, values, PLACEHOLDER)


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--denylist", required=True, type=Path)
    parser.add_argument("paths", nargs="+", type=Path)
    args = parser.parse_args()
    values = denylist(args.denylist)
    total = 0
    files = 0
    for raw_path in args.paths:
        candidates = [raw_path] if raw_path.is_file() else sorted(p for p in raw_path.rglob("*") if p.is_file())
        for path in candidates:
            try:
                original = path.read_text(encoding="utf-8")
            except UnicodeDecodeError:
                continue
            cleaned, count = sanitize(original, values)
            if count:
                path.write_text(cleaned, encoding="utf-8")
                total += count
                files += 1
    print(f"sanitized_files={files} replacements={total}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
