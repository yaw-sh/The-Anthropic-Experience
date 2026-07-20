#!/usr/bin/env python3
"""Mechanically inspect removed image/PDF assets without publishing their bytes."""

from __future__ import annotations

import hashlib
import io
import subprocess
import tempfile
import zipfile
from pathlib import Path
from typing import Any

from PIL import Image

from redaction_policy import sanitize_public_text


def normalized_text_bytes(blob: bytes) -> bytes:
    text = blob.decode("utf-8")
    lines = [line.rstrip(" \t") for line in text.splitlines()]
    return ("\n".join(lines).rstrip() + "\n").encode("utf-8")


def archive_member_coverage(
    members: dict[str, bytes], current_blobs: list[bytes], denylist: list[str]
) -> dict[str, int | str]:
    current_hashes = {hashlib.sha256(blob).hexdigest() for blob in current_blobs}
    normalized_current_hashes: set[str] = set()
    for blob in current_blobs:
        try:
            normalized = normalized_text_bytes(blob)
        except UnicodeDecodeError:
            continue
        normalized_current_hashes.add(hashlib.sha256(normalized).hexdigest())
    exact = 0
    sanitized = 0
    normalized = 0
    uncovered = 0
    for digest, blob in members.items():
        if digest in current_hashes:
            exact += 1
            continue
        try:
            cleaned = sanitize_public_text(blob.decode("utf-8"), denylist)[0].encode("utf-8")
        except UnicodeDecodeError:
            uncovered += 1
            continue
        if hashlib.sha256(cleaned).hexdigest() in current_hashes:
            sanitized += 1
        elif hashlib.sha256(normalized_text_bytes(cleaned)).hexdigest() in normalized_current_hashes:
            normalized += 1
        else:
            uncovered += 1
    return {
        "memberCoverageCheck": "pass" if uncovered == 0 else "fail",
        "uniqueMemberCount": len(members),
        "exactDestinationCount": exact,
        "sanitizedDestinationCount": sanitized,
        "normalizedDestinationCount": normalized,
        "uncoveredUniqueMemberCount": uncovered,
    }


def semantic_disposition_receipt(config: dict[str, Any], group_id: str, source_hashes: list[str]) -> dict[str, str]:
    assertion = config.get("semanticDispositions", {}).get(group_id, {})
    assertion_id = assertion.get("assertionId")
    if assertion.get("reviewed") is not True or not isinstance(assertion_id, str) or not assertion_id:
        raise ValueError(f"missing semantic disposition assertion for {group_id}")
    if sorted(assertion.get("sourceHashes", [])) != sorted(source_hashes):
        raise ValueError(f"semantic disposition source binding failed for {group_id}")
    return {
        "semanticAssertionId": assertion_id,
        "semanticDispositionReview": "asserted",
        "sourceBindingCheck": "pass",
    }


def git_blob(root: Path, source_ref: str, path: str) -> bytes:
    result = subprocess.run(["git", "show", f"{source_ref}:{path}"], cwd=root, capture_output=True, check=True)
    return result.stdout


def audit_archive_members(
    root: Path,
    source_ref: str,
    source_map: dict[str, Any],
    denylist: list[str],
) -> dict[str, int | str]:
    archive_blobs: dict[str, bytes] = {}
    for item in source_map.get("archiveAudit", {}).get("archives", []):
        blob = git_blob(root, source_ref, item["path"])
        archive_blobs.setdefault(hashlib.sha256(blob).hexdigest(), blob)
    members: dict[str, bytes] = {}
    total_members = 0
    for archive_blob in archive_blobs.values():
        with zipfile.ZipFile(io.BytesIO(archive_blob)) as archive:
            for info in archive.infolist():
                if info.is_dir():
                    continue
                member = archive.read(info)
                members.setdefault(hashlib.sha256(member).hexdigest(), member)
                total_members += 1
    tracked = subprocess.run(["git", "ls-files", "-z"], cwd=root, capture_output=True, check=True).stdout
    current_blobs = [
        (root / path).read_bytes()
        for path in tracked.decode("utf-8").split("\0")
        if path and (root / path).is_file()
    ]
    result = archive_member_coverage(members, current_blobs, denylist)
    result.update({"uniqueArchiveCount": len(archive_blobs), "archiveMemberCount": total_members})
    return result


def audit_removed_assets(root: Path, source_ref: str, source_map: dict[str, Any]) -> dict[str, Any]:
    config = source_map.get("assetAudit", {})
    image_blobs = [git_blob(root, source_ref, item["path"]) for item in config.get("images", [])]
    pdf_blob = git_blob(root, source_ref, config["pdf"]["path"])
    image_semantic = semantic_disposition_receipt(
        config,
        "historical-media-images",
        [hashlib.sha256(blob).hexdigest() for blob in image_blobs],
    )
    pdf_semantic = semantic_disposition_receipt(
        config,
        "image-only-research-paper",
        [hashlib.sha256(pdf_blob).hexdigest()],
    )
    with tempfile.TemporaryDirectory(prefix="public-asset-audit-") as raw:
        staging = Path(raw)
        image_dimensions = []
        for index, blob in enumerate(image_blobs, start=1):
            path = staging / f"image-{index}.png"
            path.write_bytes(blob)
            with Image.open(path) as image:
                image.verify()
            with Image.open(path) as image:
                image_dimensions.append([image.width, image.height])

        pdf_path = staging / "source.pdf"
        pdf_path.write_bytes(pdf_blob)
        info = subprocess.run(["pdfinfo", str(pdf_path)], capture_output=True, text=True, check=True).stdout
        pages = int(next(line.split(":", 1)[1].strip() for line in info.splitlines() if line.startswith("Pages:")))
        text_path = staging / "text.txt"
        subprocess.run(["pdftotext", str(pdf_path), str(text_path)], capture_output=True, check=True)
        text_layer_bytes = len(text_path.read_bytes())
        prefix = staging / "page"
        subprocess.run(["pdftoppm", "-png", "-r", "120", str(pdf_path), str(prefix)], capture_output=True, check=True)
        rendered = sorted(staging.glob("page-*.png"))
        ocr_words = 0
        for index, image_path in enumerate(rendered, start=1):
            output = staging / f"ocr-{index}"
            subprocess.run(["tesseract", str(image_path), str(output)], capture_output=True, check=True)
            ocr_words += len(output.with_suffix(".txt").read_text(encoding="utf-8", errors="replace").split())

    return {
        "images": {
            "imageCount": len(image_blobs),
            "uniqueImageCount": len({hashlib.sha256(blob).hexdigest() for blob in image_blobs}),
            "dimensions": image_dimensions,
            "renderCheck": "pass",
            **image_semantic,
        },
        "pdf": {
            "pageCount": pages,
            "renderedPageCount": len(rendered),
            "textLayerBytes": text_layer_bytes,
            "ocrWordCount": ocr_words,
            "renderCheck": "pass",
            "ocrExtractionCheck": "pass",
            **pdf_semantic,
        },
    }
