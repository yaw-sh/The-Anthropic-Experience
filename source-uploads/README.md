# source-uploads/ — raw provided material, as delivered

This directory holds the **raw source files the operator handed the assistant**, preserved
byte-for-byte as delivered. It exists so the repository contains *every* document provided,
not only the curated subset that was promoted into `fellows/` and
`anthropic_experience_review_pack/`.

## Provenance

These came from two uploads during the 2026-07-18/19 sessions:

1. Two files uploaded directly (`Anthropic-build-failure-analysis.md` and a deep-research
   report) — byte-identical to files also present in the zip below, so they are not
   duplicated separately.
2. `the_anthropic_experience.zip`. Its `fellows/` and `anthropic_experience_review_pack/`
   trees were promoted to the repository root (see the root `README.md` map). **Everything
   else from that zip is preserved here**, in its delivered structure.

## Contents

| Path | What it is |
|---|---|
| `Anthropic-build-failure-analysis.md` | ChatGPT conversation containing the "From Prompting to Governance" thesis draft and its development. |
| `Claude-Failure-Analysis.md` | The meta-conversation that developed the forensic handoff. |
| `chatgpt.md` | Full ChatGPT-side conversation export. |
| `claude.md` | Assistant-reconstructed/redacted session record. |
| `anthropicexperiencefulltranscript.md` | The build-session transcript (raw). |
| `deep-research-report.md` · `deep-research-report2.md` | The two ChatGPT deep-research reports on the failure. |
| `generated-page.html` | Generated Research Archive reference page. |
| `Research findings abstract conversion.pdf` | Image-only proposal draft (no references/method apparatus). |
| `react_wheels/` | Prototype wheel source zips (duplicates of `../design/reference/*.zip`). |
| `research-archive-design-system/` | The research-archive design system (tokens, components, templates). |
| `ReviewandResearchReport.md` | ChatGPT conversation export (full version — replaces the earlier partial `_1` export, which remains in git history): the Pro session that produced both packs, the roast correction, the master blueprint, its four-part GitHub failure (`3e1f625`/`3119913` on `main`), and its closing hierarchy ruling — root blueprint canonical, pack supporting, old Claude plan "superseded" (ChatGPT's recommendation; not yet an owner decision). |
| `archive-2026-07-19/` | The provided `Archive.zip`: six ChatGPT conversation exports (AI-agent-reliability dossier, a fuller Claude failure analysis, a fail-stamp request, the satirical-circus visual style, plus two byte-duplicates of files above). See its `README.md`. |

## Status and cautions

- **Private retention only.** `../anthropic_experience_review_pack/ARCHIVE-DISPOSITION.md`
  classifies most of these as **QUARANTINE** for any public release — they contain raw
  conversational language, planning discussion, and personal context. This repository is
  **private**; keeping the raw source here is consistent with that. If the repository is
  ever made public, this entire directory must be re-reviewed or removed first.
- **Not curated evidence.** These are raw inputs. The adjudicated, classified versions live
  in `../docs/evidence/`, `../fellows/`, and `../anthropic_experience_review_pack/`. Do not
  cite these raw files as evidence without classification.
- A hard-secret scan (tokens, API keys) at commit time found none.
