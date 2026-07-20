from __future__ import annotations

import re
import sys
import unittest
from pathlib import Path


sys.path.insert(0, str(Path(__file__).resolve().parents[1]))

from redaction_policy import (  # noqa: E402
    PLACEHOLDER,
    is_sensitive_url,
    regex_rule,
    replace_sensitive_values,
    sensitive_literals,
)
from sanitize_text import sanitize  # noqa: E402


class RedactionPolicyTests(unittest.TestCase):
    def test_short_lowercase_identifier_uses_case_or_path_context(self) -> None:
        source = "an orb nearby ORB orb_repo orb-repo /orb/transcript.md absorb orbital"
        cleaned, count = replace_sensitive_values(source, ["orb"])
        self.assertEqual(count, 4)
        self.assertEqual(
            cleaned,
            f"an orb nearby {PLACEHOLDER} {PLACEHOLDER}_repo {PLACEHOLDER}-repo /{PLACEHOLDER}/transcript.md absorb orbital",
        )

    def test_filter_regex_matches_same_contextual_variants(self) -> None:
        pattern = re.compile(regex_rule("orb"))
        self.assertIsNone(pattern.search("an orb nearby"))
        for value in ("ORB", "orb_repo", "orb-repo", "/orb/transcript.md"):
            self.assertIsNotNone(pattern.search(value), value)

    def test_uppercase_denylist_keeps_ordinary_lowercase_word(self) -> None:
        source = "An orb stayed nearby while ORB_repo and /orb/transcript appeared."
        cleaned, count = replace_sensitive_values(source, ["ORB"])
        self.assertEqual(count, 2)
        self.assertEqual(
            cleaned,
            f"An orb stayed nearby while {PLACEHOLDER}_repo and /{PLACEHOLDER}/transcript appeared.",
        )

    def test_general_sanitizer_preserves_npm_url_but_removes_private_url(self) -> None:
        npm = "https://registry.npmjs.org/react/-/react-18.3.1.tgz"
        private = "https://private.example/session/42"
        cleaned, count = sanitize(f"An orb stayed nearby {npm} ORB_repo {private}", ["ORB", "private.example"])
        self.assertIn("An orb stayed nearby", cleaned)
        self.assertIn(npm, cleaned)
        self.assertNotIn("ORB_repo", cleaned)
        self.assertNotIn(private, cleaned)
        self.assertEqual(count, 2)

    def test_public_ecosystem_urls_are_not_rewrite_candidates(self) -> None:
        text = (
            "https://registry.npmjs.org/react/-/react-18.3.1.tgz "
            "https://github.com/vendor/project "
            "https://docs.python.org/3/"
        )
        self.assertEqual(sensitive_literals(text, ["private.example"]), set())

    def test_private_urls_are_rewrite_candidates(self) -> None:
        private_host = "https://private.example/session/42"
        private_path = "https://public.example/cases/private-project/42"
        local = "http:" + "//localhost:4173/private"
        found = sensitive_literals(" ".join((private_host, private_path, local)), ["private.example", "private-project"])
        self.assertEqual(found, {private_host, private_path, local})
        self.assertTrue(is_sensitive_url(private_host, ["private.example"]))

    def test_scheme_only_code_fragment_is_not_a_rewrite_candidate(self) -> None:
        private = "https://private.example/session/42"
        text = f'const scheme = "https://"; const privateUrl = "{private}";'
        found = sensitive_literals(text, ["private.example"])
        self.assertNotIn("https://", found)
        self.assertIn(private, found)

    def test_url_regex_source_is_not_a_rewrite_candidate(self) -> None:
        regex_source = r'URL_PATTERN = r"sandbox:/[^\s\"\x27<>)]*"'
        private = "sandbox:" + "/artifact/session.txt"
        found = sensitive_literals(f"{regex_source}\n{private}", [])
        self.assertFalse(any(value.startswith("sandbox:/[") for value in found))
        self.assertIn(private, found)


if __name__ == "__main__":
    unittest.main()
