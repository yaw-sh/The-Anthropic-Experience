# THE ANTHROPIC EXPERIENCE — Next-Phase Review Pack

**Input archive SHA-256:** `92fe161bb2d28cd1a65bffaf3f3ee28ef2405215ef4845cd34469c77df1a2bf2`

This pack is **private implementation material**. It contains no copy of the source archive, but the raw audit JSON records paths and matched snippets that should not be published.

## Read/use order

1. **`THE-ANTHROPIC-EXPERIENCE-PRO-REVIEW.md`** — full forensic, product, evidence, privacy, research, design, and engineering review.
2. **`OWNER-DECISIONS.md`** — recommended scope defaults; record any changes before implementation.
3. Merge the other session’s forum/literature output using **`OUTWARD-RESEARCH-MERGE-GUIDE.md`**.
4. Give Codex the smaller handoff zip and start with **`CODEX-HANDOFF-README.md`**; its normative files are **`CODEX-BUILD-DIRECTIVE.md`**, **`public-claims-register.seed.json`**, and **`RELEASE-GATES.md`**.
5. Use **`ARCHIVE-DISPOSITION.md`** to prevent private or obsolete source material from entering the new repository.
6. Use **`AUDIT-RECEIPTS.md`**, **`ARCHIVE-INVENTORY.csv`**, and **`archive-audit.json`** for review evidence, not public content.

## Files

| File | Purpose |
|---|---|
| `THE-ANTHROPIC-EXPERIENCE-PRO-REVIEW.md` | Deep review and final recommendation. |
| `CODEX-HANDOFF-README.md` | Start page for the implementation subset. |
| `CODEX-BUILD-DIRECTIVE.md` | Shorter normative specification and phased execution directive. |
| `public-claims-register.seed.json` | Machine-readable 22-source/33-claim adjudication seed. No claim is public-approved merely because it appears here. |
| `RELEASE-GATES.md` | Evidence-backed release checklist. |
| `ARCHIVE-DISPOSITION.md` | Public/private/quarantine/salvage classification by path group. |
| `OUTWARD-RESEARCH-MERGE-GUIDE.md` | Rules for integrating forum and literature research without overclaiming. |
| `OWNER-DECISIONS.md` | Recommended owner defaults and decision log. |
| `AUDIT-RECEIPTS.md` | Commands, build results, script failures, metrics, and limitations. |
| `ARCHIVE-INVENTORY.csv` | Original 108-file path/size/hash inventory. |
| `archive-audit.json` | Full heuristic scan results and duplicate groups. Private review evidence. |
| `review-manifest.json` | Hash/size manifest for this pack. |
| `codex-handoff-manifest.json` | Hash/size manifest for the smaller Codex subset. |

## Core recommendation

Build a new clean repository around two linked cases, one approved claims model, one canonical site, and an optional post-release Artifact mirror. Do not continue the inherited app/artifact architecture; do not publish the raw transcripts, EVE, Fellows material, or unverified research wing.
