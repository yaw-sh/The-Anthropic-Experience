from __future__ import annotations

import tempfile
import sys
import unittest
from pathlib import Path
from unittest.mock import patch


sys.path.insert(0, str(Path(__file__).resolve().parents[1]))

from rewrite_safety import safe_ephemeral_target


class RewriteSafetyTests(unittest.TestCase):
    def test_accepts_new_target_below_real_temporary_root(self) -> None:
        with tempfile.TemporaryDirectory() as raw:
            parent = Path(raw).resolve()
            target = parent / "new-mirror"
            with patch("rewrite_safety.approved_temporary_roots", return_value=(parent,)):
                self.assertEqual(safe_ephemeral_target(target), target)

    def test_rejects_existing_target_and_parent_traversal(self) -> None:
        with tempfile.TemporaryDirectory() as raw:
            parent = Path(raw).resolve()
            existing = parent / "existing"
            existing.mkdir()
            with patch("rewrite_safety.approved_temporary_roots", return_value=(parent,)):
                with self.assertRaises(ValueError):
                    safe_ephemeral_target(existing)
                with self.assertRaises(ValueError):
                    safe_ephemeral_target(parent / ".." / "outside")

    def test_rejects_symlink_parent(self) -> None:
        with tempfile.TemporaryDirectory() as raw:
            parent = Path(raw).resolve()
            real = parent / "real"
            real.mkdir()
            link = parent / "link"
            link.symlink_to(real, target_is_directory=True)
            with patch("rewrite_safety.approved_temporary_roots", return_value=(parent,)):
                with self.assertRaises(ValueError):
                    safe_ephemeral_target(link / "mirror")


if __name__ == "__main__":
    unittest.main()
