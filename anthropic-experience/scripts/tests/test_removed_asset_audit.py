from __future__ import annotations

import sys
import unittest
import hashlib
from pathlib import Path


sys.path.insert(0, str(Path(__file__).resolve().parents[1]))

import removed_asset_audit as audit  # noqa: E402


class RemovedAssetAuditTests(unittest.TestCase):
    def test_missing_semantic_disposition_assertion_fails(self) -> None:
        with self.assertRaisesRegex(ValueError, "semantic disposition assertion"):
            audit.semantic_disposition_receipt({}, "image-only-research-paper", ["source-hash"])

    def test_semantic_assertion_is_distinct_from_mechanical_extraction(self) -> None:
        config = {
            "semanticDispositions": {
                "image-only-research-paper": {
                    "assertionId": "semantic-assertion-002",
                    "reviewed": True,
                    "sourceHashes": ["source-hash"],
                }
            }
        }
        self.assertEqual(
            audit.semantic_disposition_receipt(config, "image-only-research-paper", ["source-hash"]),
            {
                "semanticAssertionId": "semantic-assertion-002",
                "semanticDispositionReview": "asserted",
                "sourceBindingCheck": "pass",
            },
        )

    def test_semantic_assertion_must_bind_the_exact_removed_asset(self) -> None:
        config = {
            "semanticDispositions": {
                "image-only-research-paper": {
                    "assertionId": "semantic-assertion-002",
                    "reviewed": True,
                    "sourceHashes": ["expected-hash"],
                }
            }
        }
        with self.assertRaisesRegex(ValueError, "source binding"):
            audit.semantic_disposition_receipt(config, "image-only-research-paper", ["different-hash"])

    def test_archive_member_coverage_fails_for_unmapped_unique_member(self) -> None:
        members = {
            hashlib.sha256(b"shared source").hexdigest(): b"shared source",
            hashlib.sha256(b"unique package").hexdigest(): b"unique package",
        }
        result = audit.archive_member_coverage(members, [b"shared source"], [])
        self.assertEqual(result["memberCoverageCheck"], "fail")
        self.assertEqual(result["uncoveredUniqueMemberCount"], 1)

    def test_archive_member_coverage_accepts_exact_and_sanitized_destinations(self) -> None:
        private_source = b"https://private.example/session/42"
        members = {
            hashlib.sha256(b"shared source").hexdigest(): b"shared source",
            hashlib.sha256(private_source).hexdigest(): private_source,
        }
        result = audit.archive_member_coverage(
            members,
            [b"shared source", b"###-PII-###"],
            ["private.example"],
        )
        self.assertEqual(result["memberCoverageCheck"], "pass")
        self.assertEqual(result["exactDestinationCount"], 1)
        self.assertEqual(result["sanitizedDestinationCount"], 1)

    def test_archive_member_coverage_accepts_text_with_only_trailing_whitespace_normalized(self) -> None:
        members = {hashlib.sha256(b"public source\n\n\n").hexdigest(): b"public source\n\n\n"}
        result = audit.archive_member_coverage(members, [b"public source\n"], [])
        self.assertEqual(result["memberCoverageCheck"], "pass")
        self.assertEqual(result["normalizedDestinationCount"], 1)
        self.assertEqual(result["uncoveredUniqueMemberCount"], 0)

    def test_archive_member_coverage_accepts_line_trailing_whitespace_normalized(self) -> None:
        source = b"<head>\n    \n</head>\n"
        normalized = b"<head>\n\n</head>\n"
        members = {hashlib.sha256(source).hexdigest(): source}
        result = audit.archive_member_coverage(members, [normalized], [])
        self.assertEqual(result["memberCoverageCheck"], "pass")
        self.assertEqual(result["normalizedDestinationCount"], 1)
        self.assertEqual(result["uncoveredUniqueMemberCount"], 0)


if __name__ == "__main__":
    unittest.main()
