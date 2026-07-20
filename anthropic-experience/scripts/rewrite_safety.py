#!/usr/bin/env python3
"""Safety guards for an ephemeral history-rewrite mirror."""

from __future__ import annotations

import argparse
import tempfile
from pathlib import Path


def approved_temporary_roots() -> tuple[Path, ...]:
    candidates = (
        Path(tempfile.gettempdir()),
        Path("/tmp"),
        Path("/") / "private/tmp",
        Path("/") / "private/var/folders",
    )
    return tuple(dict.fromkeys(path.resolve() for path in candidates if path.exists()))


def safe_ephemeral_target(raw_target: Path) -> Path:
    if raw_target.exists() or raw_target.is_symlink():
        raise ValueError("rewrite target must not already exist")
    parent = raw_target.parent
    probe = parent
    while not probe.exists() and probe != probe.parent:
        probe = probe.parent
    if not probe.exists() or probe.is_symlink():
        raise ValueError("rewrite target parent must resolve through a real directory")
    cursor = parent
    while cursor != probe:
        if cursor.is_symlink():
            raise ValueError("rewrite target parent may not contain symlinks")
        cursor = cursor.parent
    if any(part == ".." for part in raw_target.parts):
        raise ValueError("rewrite target may not contain traversal")
    resolved = raw_target.resolve(strict=False)
    if not any(resolved != root and root in resolved.parents for root in approved_temporary_roots()):
        raise ValueError("rewrite target must be below an approved temporary root")
    return resolved


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--target", required=True, type=Path)
    args = parser.parse_args()
    print(safe_ephemeral_target(args.target))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
