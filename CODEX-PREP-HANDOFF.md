# Codex prep handoff — operator-voice generalization & ingestion-spec inventory

**Status: research only. Nothing below has been executed.** This document hands over inventory
and mechanics a Claude Code session produced while researching how to prepare this repo as
your evidence vault. Per `anthropic_experience_review_pack/OWNER-DECISIONS.md` (row 1), the
operator's scope decision covers all of it — the visible product **and** this generalization/
ingestion work: "Prep only — Codex builds," then "codex will do all of it." Nothing here was
built by the session that researched it. Treat every item below as an open task, not a
completed one.

## Why this exists

The master blueprint (§25) and `anthropic_experience_actual_blueprint/TRANSCRIPT-INGESTION-SPEC.md`
both require transcript material to enter the product with the operator's voice generalized
and the assistant's/Pro's admissions kept exact. The operator separately directed — in this
session's own conversation — that **every operator turn in every transcript in this repo** be
generalized, using Sonnet subagents at high reasoning in a dynamic Workflow under ultracode,
with a deterministic verification gate (see "Why the deterministic gate is non-negotiable"
below). This document is the inventory that work needs, gathered by direct `grep`/`cmp`
verification of every file in the repo — not estimated, not delegated to an agent that might
hallucinate a count.

## The inventory

### Category A — files with verbatim operator turns to generalize

| Marker | File | Operator turns |
|---|---|---|
| `# you asked` | `source-uploads/chatgpt.md` | 12 |
| | `source-uploads/Anthropic-build-failure-analysis.md` | 4 |
| | `source-uploads/Claude-Failure-Analysis.md` | 7 |
| | `source-uploads/ReviewandResearchReport.md` | 14 |
| | `source-uploads/ReviewandResearchReport_1.md` (earlier partial export, restored — see its README row) | 12 |
| | `source-uploads/archive-2026-07-19/AI-agent-reliability-dossier.md` | 3 |
| | `source-uploads/archive-2026-07-19/Anthropic-build-failure-analysis.md` | 4 (byte-duplicate of the row above) |
| | `source-uploads/archive-2026-07-19/Claude-Failure-Analysis.md` | 11 (distinct, fuller file — not a duplicate) |
| | `source-uploads/archive-2026-07-19/Fail-Stamp-Request.md` | 1 |
| | `source-uploads/archive-2026-07-19/GitHub-connector-review.md` | 12 (byte-duplicate of `chatgpt.md`) |
| | `source-uploads/archive-2026-07-19/Satirical-Circus-Visual-Style.md` | 11 |
| `## Operator` | `docs/evidence/full-session-transcript-verbatim.md` | 41 |
| | `source-uploads/anthropicexperiencefulltranscript.md` | 41 (raw twin of the row above) |
| `### Turn N — Operator` | `source-uploads/claude.md` | 29 |
| | `fellows/evidence-availability-use-gap/source-transcripts/THE-ANTHROPIC-EXPERIENCE-claude-2026-07-18.md` | 29 (byte-identical to the row above — verified with `cmp`) |
| `## USER` | `fellows/thesis-review-2026-07-19/transcripts/session/oversight-session.md` | 25 as of this handoff's last refresh — **re-verify the count before generalizing; this file is refreshed by `scratchpad/convert_transcripts.py` and will keep growing as long as the source session is active** |

Byte-duplicate pairs should be generalized once and the same output copied beside each
duplicate — do not generalize a duplicate independently; that risks the two editions drifting
from each other by model nondeterminism alone.

### Category B — finished analysis that quotes operator turns (do not rewrite)

Fellows lane reports, `fellows/evidence-availability-use-gap/REPORT.md` and `THESIS.md` and
its deliverables, both deep-research reports, `fellows/thesis-review-2026-07-19/`'s own
analysis files (`COST-ANALYSIS.md`, `THESIS-VERSIONS-AND-ASSESSMENT.md`), the incident records
under `docs/evidence/incidents/`, and the blueprint pack's `evidence/` copies. These are
finished research that *cites* the operator's words as evidence — rewriting the citations
would corrupt the research, not generalize a transcript. If any of these need generalized
citation text for a public-facing rendering, that is a separate editorial decision the owner
should make explicitly; this handoff does not resolve it.

### Category C — already generalized (precedent, skip)

`docs/evidence/chattranscript-2026-07-18-public-edition.md`. This is the existing example of
the target output shape: operator's words generalized, assistant/tool text and structure
preserved verbatim, a fidelity note in the header. Match its convention.

### Anomalies — flagged, not resolved

- **`eve_transcript.md`** — named as a source in blueprint §25. **Not present anywhere in this
  repository.** Either the operator has not yet exported/provided it, or it lives elsewhere.
  Do not fabricate or reconstruct it; ask the owner.
- **The 34 `fellows/thesis-review-2026-07-19/transcripts/subagents/*.md` files** — their
  `## USER` sections are this session's *orchestrator prompts to its own subagents*, not the
  operator's words. Do not generalize these as if they were operator turns.
- **`fellows/evidence-availability-use-gap/source_chat.md`** (42 turn markers per the earlier
  repo inventory) — this is the transcript of a **different** prior session, about a different
  repository (`~/os`, visible in its own tool-call breadcrumbs), that produced the Fellows
  research corpus this repo quotes. It has not been spot-checked for genuine operator
  commit/push/merge-discipline instructions the way the two build-adjacent transcripts in this
  handoff's companion count were. Classify it before generalizing it — do not assume its
  `## USER`/`→ action` blocks are cleanly attributable without reading them; this handoff
  found at least one long block that reads as Claude's own self-narration quoted back, not an
  operator statement.
- **`fellows/thesis-review-2026-07-19/transcripts/session/oversight-session.md` has a known
  regeneration bug**: `scratchpad/convert_transcripts.py`'s workflow-2 label table matches the
  substring "transcript layer" before "synthesis judge," so the synthesis-judge subagent
  (`aab0e2f7`) gets mislabeled as `wf2-corpus-review--review--transcripts-privacy--aab0e2f7.md`
  on every rerun, alongside the correctly-named `wf2-corpus-review--judge--synthesis--aab0e2f7.md`.
  After any regeneration, delete the mislabeled stray — do not commit both.

## Why the deterministic gate is non-negotiable

An earlier subagent draft in this repo's own history (documented in
`docs/evidence/incidents/2026-07-18-build-session.md`, "strike 13") passed a Sonnet adversarial
verifier while still containing **48 verbatim five-word-or-longer spans** of the operator's
unredacted words. The adversarial model verifier did not catch it. A deterministic n-gram
overlap script did. Any generalization pipeline built from this handoff must include a
**non-model, script-based scan** — 5-word (or shorter) n-gram overlap between the generalized
output and the original's operator-turn text — as a hard gate before anything is committed.
Model-based verification is necessary but was already proven, in this exact repository, to be
insufficient alone.

## Output convention

Generalized editions live **beside their originals**, named `<basename>--public-edition.md`,
matching the existing precedent (`docs/evidence/chattranscript-2026-07-18-public-edition.md`).
Each carries a header fidelity note: source path, sha256 of the original at generalization
time, the generalization rule applied, and the date. **Originals are never modified or
deleted** — verify with `git diff` showing zero changes to every original transcript path
before committing a generalization pass.

## Ingestion-spec conformance

Full requirements: `anthropic_experience_actual_blueprint/TRANSCRIPT-INGESTION-SPEC.md` (read
it in full; this section only summarizes). Applies chiefly to the current ChatGPT Pro
transcript (`source-uploads/ReviewandResearchReport.md`) and this session's own transcript:

- Stable turn IDs (`pro-0001`, `pro-0002`, …) per source file.
- Tag vocabulary exactly as specified: `instruction`, `substitute`, `scope-reduction`,
  `correction`, `admission`, `binding-failure`, `completion`.
- The spec's ten required turn groups for the Pro transcript, mapped to exact turn-ID ranges —
  including both of Pro's admissions ("I did not merely miss the tone. I misclassified the
  product." / "a forensic appendix pretending to be that blueprint") kept **exact, never
  paraphrased or summarized** — the spec is explicit on this point.
- sha256 of each source file, recorded and public-safe.
- Every generalized operator span marked as a transformation, citing this handoff and
  `OWNER-DECISIONS.md` row 1 as the owner approval for the redaction.

**Spec tension, resolved:** the spec says "preserve exact wording"; the owner separately
directs operator-voice generalization. Resolution, matching the Category C precedent: the
*original* file is the preserved-exact, hash-anchored record. The ingestion output and any
public-facing rendering use the generalized operator voice, marked as such. Both live in the
repo; neither replaces the other.

## Tooling

`scratchpad/convert_transcripts.py` regenerates this repo's session/subagent transcript
exports from the raw session JSONL. It was previously only in a session-local scratch
directory (never committed) — that is itself a small instance of the pattern this repo
documents: a working tool, used repeatedly, never persisted where the next session could find
it. It is committed now so this doesn't recur.

## What this handoff does not do

It does not generalize a single transcript. It does not run a Workflow. It does not spawn a
subagent. It is the inventory and the mechanics, verified once so Codex does not have to
re-derive them — the execution is Codex's, per the decision this document cites.
