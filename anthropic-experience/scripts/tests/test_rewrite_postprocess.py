from __future__ import annotations

import os
import subprocess
import sys
import tempfile
import unittest
from pathlib import Path
from unittest.mock import patch


sys.path.insert(0, str(Path(__file__).resolve().parents[1]))

import prepare_rewrite_inputs as prepare  # noqa: E402
from rewrite_postprocess import (  # noqa: E402
    current_inventory,
    current_ref_inventory,
    ref_topology_signature,
    rename_refs,
    rewrite_annotated_tags,
    tag_timestamps,
    topology_signature,
)


class RewritePostprocessTests(unittest.TestCase):
    def test_topology_inventories_exclude_local_remote_tracking_refs(self) -> None:
        with tempfile.TemporaryDirectory() as raw:
            repo = Path(raw)
            subprocess.run(["git", "init", "-q"], cwd=repo, check=True)
            subprocess.run(["git", "config", "user.name", "Test"], cwd=repo, check=True)
            subprocess.run(["git", "config", "user.email", "test@" + "example.invalid"], cwd=repo, check=True)
            (repo / "record.txt").write_text("one\n")
            subprocess.run(["git", "add", "record.txt"], cwd=repo, check=True)
            subprocess.run(["git", "commit", "-qm", "one"], cwd=repo, check=True)
            subprocess.run(["git", "branch", "published-branch"], cwd=repo, check=True)
            subprocess.run(["git", "tag", "published-tag"], cwd=repo, check=True)
            subprocess.run(["git", "update-ref", "refs/remotes/origin/main", "HEAD"], cwd=repo, check=True)

            with patch.object(prepare, "ROOT", repo):
                before_rows = prepare.rewrite_inventory()["refs"]
            after_rows = current_ref_inventory(repo)

            for rows in (before_rows, after_rows):
                names = {row.split("\0", 1)[0] for row in rows}
                self.assertIn("refs/heads/published-branch", names)
                self.assertIn("refs/tags/published-tag", names)
                self.assertFalse(any(name.startswith("refs/remotes/") for name in names))

    def test_ref_topology_detects_deleted_branch_and_retargeted_lightweight_tag(self) -> None:
        with tempfile.TemporaryDirectory() as raw:
            repo = Path(raw)
            subprocess.run(["git", "init", "-q"], cwd=repo, check=True)
            subprocess.run(["git", "config", "user.name", "Test"], cwd=repo, check=True)
            subprocess.run(["git", "config", "user.email", "test@" + "example.invalid"], cwd=repo, check=True)
            (repo / "record.txt").write_text("one\n")
            subprocess.run(["git", "add", "record.txt"], cwd=repo, check=True)
            subprocess.run(["git", "commit", "-qm", "one"], cwd=repo, check=True)
            subprocess.run(["git", "branch", "preserved-branch"], cwd=repo, check=True)
            subprocess.run(["git", "tag", "preserved-tag"], cwd=repo, check=True)
            (repo / "record.txt").write_text("two\n")
            subprocess.run(["git", "commit", "-qam", "two"], cwd=repo, check=True)

            before = ref_topology_signature(current_ref_inventory(repo), current_inventory(repo), {})
            subprocess.run(["git", "branch", "-D", "preserved-branch"], cwd=repo, check=True, capture_output=True)
            subprocess.run(["git", "tag", "-f", "preserved-tag", "HEAD"], cwd=repo, check=True, capture_output=True)
            after = ref_topology_signature(current_ref_inventory(repo), current_inventory(repo), {})

            self.assertNotEqual(before, after)
            self.assertEqual(before["refs/heads/preserved-branch"][0], "commit")

    def test_ref_tag_and_topology_hardening_preserves_graph_and_timestamps(self) -> None:
        with tempfile.TemporaryDirectory() as raw:
            repo = Path(raw)
            subprocess.run(["git", "init", "-q"], cwd=repo, check=True)
            subprocess.run(["git", "config", "user.name", "Private Person"], cwd=repo, check=True)
            subprocess.run(["git", "config", "user.email", "private@" + "example.test"], cwd=repo, check=True)
            (repo / "record.txt").write_text("public\n")
            subprocess.run(["git", "add", "record.txt"], cwd=repo, check=True)
            subprocess.run(["git", "commit", "-qm", "first"], cwd=repo, check=True)
            subprocess.run(["git", "commit", "--allow-empty", "-qm", "empty preserved"], cwd=repo, check=True)
            subprocess.run(["git", "branch", "private-project"], cwd=repo, check=True)
            env = dict(os.environ, GIT_COMMITTER_DATE="2026-01-02T03:04:05+00:00")
            private_url = "https://private.example/session/42"
            subprocess.run(["git", "tag", "-a", "public-tag", "-m", f"See {private_url}"], cwd=repo, env=env, check=True)

            before_topology = topology_signature(current_inventory(repo))
            before_tag_dates = tag_timestamps(repo)
            rename_refs(repo, {"refs/heads/private-project": "refs/heads/redacted-001"})
            rewritten = rewrite_annotated_tags(repo, [private_url, "private.example"])
            after_topology = topology_signature(current_inventory(repo))
            after_tag_dates = tag_timestamps(repo)

            self.assertEqual(rewritten, 1)
            self.assertEqual(before_topology, after_topology)
            self.assertEqual(before_tag_dates, after_tag_dates)
            refs = subprocess.run(["git", "for-each-ref", "--format=%(refname)"], cwd=repo, capture_output=True, text=True, check=True).stdout
            self.assertNotIn("private-project", refs)
            tag = subprocess.run(["git", "cat-file", "tag", "public-tag"], cwd=repo, capture_output=True, text=True, check=True).stdout
            self.assertNotIn("private.example", tag)
            self.assertIn("tagger Public Contributor <public-contributor>", tag)


if __name__ == "__main__":
    unittest.main()
