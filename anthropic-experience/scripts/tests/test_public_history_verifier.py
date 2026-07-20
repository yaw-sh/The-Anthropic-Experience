from __future__ import annotations

import subprocess
import sys
import tempfile
import unittest
from pathlib import Path
from unittest.mock import patch


sys.path.insert(0, str(Path(__file__).resolve().parents[1]))

import verify_public_history as verifier  # noqa: E402
import prepare_rewrite_inputs as prepare  # noqa: E402
from build_public_history import Event, Phase, SourceSlot, attributed_ranges, phase_markdown, transcript_payload  # noqa: E402
from provenance import AnalyzedSlot, allocate_ranges, analyze_slot  # noqa: E402
from verify_rewritten_history import has_sensitive_text  # noqa: E402


class PublicHistoryVerifierTests(unittest.TestCase):
    def test_codex_jsonl_external_source_counts_public_transcript_roles_once(self) -> None:
        with tempfile.TemporaryDirectory() as raw:
            source = Path(raw) / "track.jsonl"
            records = [
                {"type": "turn_context", "payload": {}},
                {"type": "event_msg", "payload": {"type": "user_message", "message": "duplicate request"}},
                {"type": "response_item", "payload": {"type": "message", "role": "user", "content": [{"type": "input_text", "text": "request"}]}},
                {"type": "response_item", "payload": {"type": "message", "role": "assistant", "content": [{"type": "output_text", "text": "response"}]}},
                {"type": "response_item", "payload": {"type": "message", "role": "developer", "content": [{"type": "input_text", "text": "constraint"}]}},
                {"type": "turn_context", "payload": {}},
                {"type": "response_item", "payload": {"type": "function_call", "name": "git", "arguments": "{}"}},
                {"type": "response_item", "payload": {"type": "function_call_output", "output": "alpha beta gamma delta epsilon"}},
            ]
            source.write_text("\n".join(__import__("json").dumps(record) for record in records) + "\n", encoding="utf-8")
            analyzed = analyze_slot(
                Path(raw),
                "unused",
                "codex-track",
                {
                    "parser": "codex-jsonl",
                    "sources": [{"pathSlot": "private-session-slot-001", "path": f"external:{source}"}],
                },
            )
            self.assertEqual(analyzed.unit_roles, ("operator", "assistant", "system", "tool", "tool"))
            self.assertEqual(analyzed.unit_turns, (1, 1, 1, 2, 2))
            self.assertEqual(analyzed.source_unit_count, 5)
            self.assertEqual(analyzed.unique_blob_count, 1)
            self.assertEqual(analyzed.former_path_slots, ("private-session-slot-001",))
            self.assertEqual(analyzed.texts, ("request", "response", "constraint", "git\n{}", "alpha beta gamma delta epsilon"))
            self.assertNotIn("alpha beta gamma delta epsilon", analyzed.leak_texts)

    def test_codex_source_ranges_publish_original_turn_bounds(self) -> None:
        analyzed = {
            "track": AnalyzedSlot(
                "track",
                ("private-session-slot-001",),
                "codex-jsonl",
                {"operator": 2},
                1,
                ("first request", "second request"),
                ("operator", "operator"),
                (3, 7),
            )
        }
        phase = Phase(
            "phase-test",
            "Test",
            "summary",
            "requested",
            "produced",
            "next",
            (SourceSlot("track", "note"),),
            (Event("operator", "generalized request", ("instruction",), "track", 1, 2),),
        )
        source_range = attributed_ranges(phase, analyzed)[0][0]
        self.assertEqual((source_range["sourceTurnStart"], source_range["sourceTurnEnd"]), (3, 7))
        markdown = phase_markdown(phase, transcript_payload(phase, {0: [source_range]}))
        self.assertIn("turns 3–7", markdown)
        event = {
            "id": "phase-event-001",
            "speaker": "operator",
            "sourceSlotId": "track",
            "sourceRanges": [{**source_range, "sourceTurnStart": 2}],
        }
        self.assertIn("range-turn:phase-event-001", verifier.event_range_errors(event, analyzed))

    def test_phase_five_includes_both_codex_execution_sessions(self) -> None:
        phase = next(phase for phase in __import__("build_public_history").PHASES if phase.id == "phase-05-codex-build")
        source_ids = {source.id for source in phase.sources}
        self.assertIn("codex-product-track-session", source_ids)
        self.assertIn("codex-cleanup-track-session", source_ids)
        for source_id in ("codex-product-track-session", "codex-cleanup-track-session"):
            roles = {event.role for event in phase.events if event.source_slot == source_id}
            self.assertEqual(roles, {"operator", "assistant", "system", "tool"})

    def test_tracked_paths_ignore_physical_checkout_artifacts(self) -> None:
        with tempfile.TemporaryDirectory() as raw:
            root = Path(raw)
            subprocess.run(["git", "init", "-q"], cwd=root, check=True)
            (root / "history").mkdir()
            (root / "history/record.md").write_text("tracked\n")
            (root / "app/node_modules/pkg").mkdir(parents=True)
            (root / "app/node_modules/pkg/index.js").write_text("untracked\n")
            subprocess.run(["git", "add", "history/record.md"], cwd=root, check=True)
            with patch.object(verifier, "ROOT", root):
                paths = verifier.tracked_paths("integrated")
            self.assertEqual([path.relative_to(root) for path in paths], [Path("history/record.md")])

    def test_tracked_paths_scope_to_nested_content_root(self) -> None:
        with tempfile.TemporaryDirectory() as raw:
            repository = Path(raw)
            content = repository / "anthropic-experience"
            subprocess.run(["git", "init", "-q"], cwd=repository, check=True)
            (repository / "README.md").write_text("pointer\n", encoding="utf-8")
            record = content / "history/record.md"
            record.parent.mkdir(parents=True)
            record.write_text("tracked\n", encoding="utf-8")
            subprocess.run(["git", "add", "README.md", "anthropic-experience/history/record.md"], cwd=repository, check=True)
            with patch.object(verifier, "ROOT", content):
                paths = verifier.tracked_paths("integrated")
            self.assertEqual([path.relative_to(content) for path in paths], [Path("history/record.md")])

    def test_public_scans_and_manifest_include_tracked_tooling(self) -> None:
        with tempfile.TemporaryDirectory() as raw:
            root = Path(raw)
            subprocess.run(["git", "init", "-q"], cwd=root, check=True)
            script = root / "scripts/tool.py"
            script.parent.mkdir(parents=True)
            script.write_text("private ORB_repo\n")
            subprocess.run(["git", "add", "scripts/tool.py"], cwd=root, check=True)
            with patch.object(verifier, "ROOT", root):
                scanned = verifier.text_files(verifier.tracked_paths("integrated"))
                public = verifier.public_content_files(set(), ["ORB"])
            self.assertEqual([path.relative_to(root) for path, _ in scanned], [Path("scripts/tool.py")])
            self.assertEqual([path.relative_to(root) for path in public], [Path("scripts/tool.py")])

    def test_tooling_privacy_scan_allows_only_neutral_test_fixtures(self) -> None:
        with tempfile.TemporaryDirectory() as raw:
            root = Path(raw)
            fixtures = root / "scripts/tests/test_fixture.py"
            fixtures.parent.mkdir(parents=True)
            neutral_email = "test@" + "example.invalid"
            fixtures.write_text(
                'URL = "https://private.example/session/42"\n'
                f'EMAIL = "{neutral_email}"\n',
                encoding="utf-8",
            )
            unsafe = root / "scripts/tool.py"
            unsafe_path = "/" + "Users/private/source"
            unsafe.write_text(
                'URL = "https://unapproved.invalid/private"\n'
                f'PATH = "{unsafe_path}"\n',
                encoding="utf-8",
            )
            with patch.object(verifier, "ROOT", root):
                fixture_errors = verifier.sensitive_errors(verifier.text_files([fixtures]), ["actual-secret"])
                unsafe_errors = verifier.sensitive_errors(verifier.text_files([unsafe]), ["actual-secret"])
            self.assertEqual(fixture_errors, {"pii": [], "path": [], "url": []})
            self.assertEqual(unsafe_errors, {"pii": [], "path": ["scripts/tool.py"], "url": ["scripts/tool.py"]})

    def test_tooling_privacy_scan_ignores_scheme_only_code_fragment(self) -> None:
        with tempfile.TemporaryDirectory() as raw:
            root = Path(raw)
            script = root / "scripts/tool.py"
            script.parent.mkdir(parents=True)
            script.write_text('SCHEME = "https://"\n', encoding="utf-8")
            with patch.object(verifier, "ROOT", root):
                errors = verifier.sensitive_errors(verifier.text_files([script]), ["actual-secret"])
            self.assertEqual(errors, {"pii": [], "path": [], "url": []})

    def test_link_checker_only_interprets_published_markup(self) -> None:
        with tempfile.TemporaryDirectory() as raw:
            root = Path(raw)
            script = root / "scripts/tool.py"
            script.parent.mkdir(parents=True)
            script.write_text('TEMPLATE = "[label](phases/{phase.id}/)"\n', encoding="utf-8")
            markdown = root / "history/README.md"
            markdown.parent.mkdir(parents=True)
            markdown.write_text("[missing](missing.md)\n", encoding="utf-8")
            with patch.object(verifier, "ROOT", root):
                errors = verifier.check_links(verifier.text_files([script, markdown]))
            self.assertEqual(errors, ["missing-link:history/README.md:missing.md"])

    def test_ngram_gate_scans_non_json_generalized_artifacts(self) -> None:
        with tempfile.TemporaryDirectory() as raw:
            root = Path(raw)
            artifact = root / "docs/research/generalized.md"
            artifact.parent.mkdir(parents=True)
            artifact.write_text("alpha beta gamma delta epsilon\n")
            analyzed = {
                "slot": AnalyzedSlot("slot", ("former-path-001",), "documents", {"tool": 1}, 1, ("alpha beta gamma delta epsilon zeta",))
            }
            with patch.object(verifier, "ROOT", root):
                leaks = verifier.ngram_leaks(analyzed, [artifact])
            self.assertEqual(len(leaks), 1)

    def test_ngram_gate_scopes_phase_artifacts_to_their_declared_sources(self) -> None:
        with tempfile.TemporaryDirectory() as raw:
            root = Path(raw)
            artifact = root / "history/phases/phase-05-codex-build/transcript.md"
            artifact.parent.mkdir(parents=True)
            artifact.write_text("alpha beta gamma delta epsilon\n", encoding="utf-8")
            shared = root / "history/README.md"
            shared.write_text("omega psi chi phi upsilon\n", encoding="utf-8")
            analyzed = {
                "earlier": AnalyzedSlot("earlier", ("former-path-001",), "documents", {"tool": 1}, 1, ("alpha beta gamma delta epsilon",)),
                "current": AnalyzedSlot("current", ("private-session-slot-001",), "documents", {"tool": 1}, 1, ("omega psi chi phi upsilon",)),
            }
            with patch.object(verifier, "ROOT", root):
                leaks = verifier.scoped_ngram_leaks(
                    analyzed,
                    [artifact, shared],
                    {"phase-05-codex-build": {"current"}},
                )
            self.assertEqual(leaks, [])

    def test_range_allocator_partitions_every_unit_without_overlap(self) -> None:
        ranges = allocate_ranges(11, [0, 1, 2])
        represented = [unit for _, start, end in ranges for unit in range(start, end + 1)]
        self.assertEqual(represented, list(range(1, 12)))
        self.assertEqual(len(represented), len(set(represented)))

    def test_event_ranges_reject_same_role_from_wrong_declared_source_slot(self) -> None:
        analyzed = {
            "slot-a": AnalyzedSlot("slot-a", ("former-path-001",), "role-headings", {"operator": 2}, 1, ("source a",)),
            "slot-b": AnalyzedSlot("slot-b", ("former-path-002",), "role-headings", {"operator": 2}, 1, ("source b",)),
        }
        event = {
            "id": "phase-event-001",
            "speaker": "operator",
            "sourceSlotId": "slot-a",
            "sourceRanges": [
                {"sourceSlotId": "slot-b", "sourceRole": "operator", "start": 1, "end": 2},
            ],
        }
        errors = verifier.event_range_errors(event, analyzed)
        self.assertIn("source-slot:phase-event-001", errors)

    def test_range_builder_binds_same_role_events_to_declared_source_slot(self) -> None:
        phase = Phase(
            "phase-test",
            "Test",
            "Summary",
            "Request",
            "Produced",
            "Next",
            (SourceSlot("slot-a", "A"), SourceSlot("slot-b", "B")),
            (
                Event("operator", "A event", ("instruction",), "slot-a", 1, 1),
                Event("operator", "B event", ("instruction",), "slot-b", 1, 1),
            ),
        )
        analyzed = {
            "slot-a": AnalyzedSlot("slot-a", ("former-path-001",), "role-headings", {"operator": 2}, 1, ("source a",)),
            "slot-b": AnalyzedSlot("slot-b", ("former-path-002",), "role-headings", {"operator": 2}, 1, ("source b",)),
        }
        ranges = attributed_ranges(phase, analyzed)
        self.assertEqual({item["sourceSlotId"] for item in ranges[0]}, {"slot-a"})
        self.assertEqual({item["sourceSlotId"] for item in ranges[1]}, {"slot-b"})

    def test_interleaved_source_roles_map_to_global_chronological_ranges(self) -> None:
        phase = Phase(
            "phase-test",
            "Test",
            "Summary",
            "Request",
            "Produced",
            "Next",
            (SourceSlot("slot", "Source"),),
            (
                Event("operator", "Operator event", ("instruction",), "slot", 1, 2),
                Event("assistant", "Assistant event", ("response",), "slot", 1, 1),
            ),
        )
        analyzed = {
            "slot": AnalyzedSlot(
                "slot",
                ("former-path-001",),
                "role-headings",
                {"assistant": 1, "operator": 2},
                1,
                ("source",),
                ("operator", "assistant", "operator"),
            )
        }
        ranges = attributed_ranges(phase, analyzed)
        self.assertEqual([(item["start"], item["end"]) for item in ranges[0]], [(1, 1), (3, 3)])
        self.assertEqual([(item["start"], item["end"]) for item in ranges[1]], [(2, 2)])

    def test_verifier_rejects_global_range_whose_source_unit_has_wrong_role(self) -> None:
        analyzed = {
            "slot": AnalyzedSlot(
                "slot",
                ("former-path-001",),
                "role-headings",
                {"assistant": 1, "operator": 2},
                1,
                ("source",),
                ("operator", "assistant", "operator"),
            )
        }
        event = {
            "id": "phase-event-001",
            "speaker": "operator",
            "sourceSlotId": "slot",
            "sourceRanges": [
                {
                    "sourceSlotId": "slot",
                    "sourceRole": "operator",
                    "start": 2,
                    "end": 2,
                    "sourceRoleStart": 1,
                    "sourceRoleEnd": 1,
                }
            ],
        }
        self.assertIn("range-role:phase-event-001", verifier.event_range_errors(event, analyzed))

    def test_rewrite_removals_derive_from_base_diff_and_private_extras(self) -> None:
        with tempfile.TemporaryDirectory() as raw:
            root = Path(raw)
            subprocess.run(["git", "init", "-q"], cwd=root, check=True)
            subprocess.run(["git", "config", "user.name", "Test"], cwd=root, check=True)
            subprocess.run(["git", "config", "user.email", "test@" + "example.invalid"], cwd=root, check=True)
            obsolete = root / "obsolete.txt"
            obsolete.write_text("old\n")
            subprocess.run(["git", "add", "obsolete.txt"], cwd=root, check=True)
            subprocess.run(["git", "commit", "-qm", "base"], cwd=root, check=True)
            base = subprocess.run(["git", "rev-parse", "HEAD"], cwd=root, capture_output=True, text=True, check=True).stdout.strip()
            obsolete.unlink()
            subprocess.run(["git", "add", "-u"], cwd=root, check=True)
            subprocess.run(["git", "commit", "-qm", "remove"], cwd=root, check=True)
            extras = root / "extras.txt"
            extras.write_text("private-current-name.md\n")
            with patch.object(prepare, "ROOT", root):
                paths = prepare.removed_paths(base, extras)
            self.assertEqual(paths, ["obsolete.txt", "private-current-name.md"])

    def test_rewrite_removals_do_not_lose_archive_paths_to_rename_detection(self) -> None:
        with tempfile.TemporaryDirectory() as raw:
            root = Path(raw)
            subprocess.run(["git", "init", "-q"], cwd=root, check=True)
            subprocess.run(["git", "config", "user.name", "Test"], cwd=root, check=True)
            subprocess.run(["git", "config", "user.email", "test"], cwd=root, check=True)
            subprocess.run(["git", "config", "diff.renames", "true"], cwd=root, check=True)
            archive = root / "source.zip"
            archive.write_text("\n".join(f"line {index}" for index in range(100)) + "\n")
            subprocess.run(["git", "add", "source.zip"], cwd=root, check=True)
            subprocess.run(["git", "commit", "-qm", "base"], cwd=root, check=True)
            base = subprocess.run(["git", "rev-parse", "HEAD"], cwd=root, capture_output=True, text=True, check=True).stdout.strip()
            archive.unlink()
            extracted = root / "extracted.jsx"
            extracted.write_text("\n".join(f"line {index}" for index in range(95)) + "\n")
            subprocess.run(["git", "add", "-A"], cwd=root, check=True)
            subprocess.run(["git", "commit", "-qm", "extract"], cwd=root, check=True)
            extras = root / "extras.txt"
            extras.write_text("")
            with patch.object(prepare, "ROOT", root):
                paths = prepare.removed_paths(base, extras)
            self.assertIn("source.zip", paths)

    def test_rewritten_content_policy_preserves_public_vendor_url(self) -> None:
        self.assertFalse(has_sensitive_text("https://registry.npmjs.org/pkg/-/pkg-1.0.0.tgz", ["private.example"]))
        self.assertTrue(has_sensitive_text("https://private.example/session/42", ["private.example"]))

    def test_receipt_replacement_count_uses_scoped_actual_replacements(self) -> None:
        npm = "https://registry.npmjs.org/pkg/-/pkg-1.0.0.tgz"
        benign = "https://example.org/public"
        private = "https://private.example/session/42"
        analyzed = {
            "slot": AnalyzedSlot(
                "slot",
                ("former-path-001",),
                "role-headings",
                {"operator": 1},
                1,
                (f"An orb stayed nearby {npm} {benign} ORB_repo {private}",),
            )
        }
        self.assertEqual(verifier.source_replacement_count({"slot"}, analyzed, ["ORB", "private.example"]), 2)


if __name__ == "__main__":
    unittest.main()
