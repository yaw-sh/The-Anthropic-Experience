from __future__ import annotations

import io
import sys
import unittest
from pathlib import Path

from PIL import Image, PngImagePlugin


sys.path.insert(0, str(Path(__file__).resolve().parents[1]))

import verify_rewritten_history as verifier  # noqa: E402


class BinaryPrivacyTests(unittest.TestCase):
    def test_canonical_head_requires_nested_content_root(self) -> None:
        self.assertEqual(
            verifier.required_head_paths(),
            {
                "anthropic-experience/OWNER-DECISIONS.md",
                "anthropic-experience/THE-ANTHROPIC-EXPERIENCE-MASTER-BLUEPRINT.md",
                "anthropic-experience/evidence/public/catalog.json",
                "anthropic-experience/history/README.md",
                "anthropic-experience/docs/audit/public-content-manifest.json",
            },
        )

    def png(self, metadata: str | None = None) -> bytes:
        output = io.BytesIO()
        info = PngImagePlugin.PngInfo()
        if metadata is not None:
            info.add_text("Description", metadata)
        Image.new("RGB", (2, 2), "white").save(output, format="PNG", pnginfo=info)
        return output.getvalue()

    def test_sensitive_image_metadata_fails(self) -> None:
        failure = verifier.binary_blob_failure(
            self.png("private.example/session/42"),
            ["assets/scene.png"],
            ["private.example"],
        )
        self.assertEqual(failure, "sensitive-image-metadata")

    def test_metadata_free_public_image_passes(self) -> None:
        self.assertIsNone(verifier.binary_blob_failure(self.png(), ["assets/scene.png"], ["private.example"]))

    def test_non_allowlisted_binary_fails_even_without_readable_metadata(self) -> None:
        failure = verifier.binary_blob_failure(b"%PDF-1.4\n%%EOF\n", ["docs/source.pdf"], [])
        self.assertEqual(failure, "non-allowlisted-binary")

    def test_ascii_pdf_is_classified_as_binary(self) -> None:
        self.assertTrue(verifier.requires_binary_scan(b"%PDF-1.4\n%%EOF\n", ["docs/source.pdf"]))

    def test_plain_utf8_source_is_not_classified_as_binary(self) -> None:
        self.assertFalse(verifier.requires_binary_scan(b"public source\n", ["docs/source.md"]))

    def test_sensitive_bytes_appended_to_image_fail(self) -> None:
        failure = verifier.binary_blob_failure(
            self.png() + b"\nprivate.example/session/42\n",
            ["assets/scene.png"],
            ["private.example"],
        )
        self.assertEqual(failure, "sensitive-binary-bytes")

    def test_jpeg_entropy_payload_is_not_treated_as_metadata(self) -> None:
        blob = b"\xff\xd8\xff\xda\x00\x02ORB_repo\xff\xd9"
        self.assertNotIn(b"ORB_repo", verifier.embedded_metadata_bytes(blob))

    def test_jpeg_comment_is_scanned_as_metadata(self) -> None:
        payload = b"ORB_repo"
        length = len(payload) + 2
        blob = b"\xff\xd8\xff\xfe" + length.to_bytes(2, "big") + payload + b"\xff\xd9"
        self.assertIn(payload, verifier.embedded_metadata_bytes(blob))

    def test_tiled_avif_derivative_uses_a_decoder_that_supports_image_grids(self) -> None:
        root = Path(__file__).resolve().parents[2]
        blob = (root / "app/public/images/derivatives/act-backstage--wide--1280.avif").read_bytes()
        self.assertIsNone(
            verifier.binary_blob_failure(
                blob,
                ["app/public/images/derivatives/act-backstage--wide--1280.avif"],
                ["private.example"],
            )
        )

    def test_avif_container_scan_excludes_compressed_mdat_payload(self) -> None:
        def box(kind: bytes, payload: bytes) -> bytes:
            return (len(payload) + 8).to_bytes(4, "big") + kind + payload

        private_payload = b"private@" + b"example.test"
        blob = box(b"ftyp", b"avif\x00\x00\x00\x00avifmif1") + box(b"free", b"public container note") + box(
            b"mdat", private_payload
        )
        metadata = verifier.embedded_metadata_bytes(blob)
        self.assertIn(b"public container note", metadata)
        self.assertNotIn(private_payload, metadata)


if __name__ == "__main__":
    unittest.main()
