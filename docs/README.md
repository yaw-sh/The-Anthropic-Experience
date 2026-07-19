# docs/ — build governance and evidence

Two things live here: the **documents that govern the build**, and the **evidence corpus**
that backs every claim the product makes.

## Build governance

| File | What it is |
|---|---|
| `BUILD-GUIDE.md` | The phased build guide — how the work is meant to proceed. |
| `BUILD-STATUS.md` | The cross-session execution ledger. Records the true state: Phase 0, plan not executed. Update it after every completed task. |
| `IMAGE-ASSET-HANDOFF.md` | The image asset manifest — naming, alt text, provenance, and which slots are filled. |
| `superpowers/specs/2026-07-18-anthropic-experience-design.md` | The design spec (product intent). |
| `superpowers/plans/2026-07-18-anthropic-experience-implementation.md` | The phased implementation plan (task order). |

## Evidence corpus (`evidence/`)

Every substantive claim carries an evidence classification (`receipt` · `transcript` ·
`official-source` · `user-observed` · `analysis` · `unknown` · `satire`).

| Path | What it is | Class |
|---|---|---|
| `evidence/README.md` | Index and the evidence contract for this corpus. | — |
| `evidence/incidents/2026-07-18-build-session.md` | The 17-strike build-session ledger — the assistant's failures, first person, in order, with cost metrics. | receipt / analysis |
| `evidence/incidents/2026-07-19-phase-zero.md` | The phase-zero account: the governed phased plan was never executed; a published artifact was built outside it. | receipt / analysis |
| `evidence/full-session-transcript-verbatim.md` | The full build-session transcript, verbatim (operator words and assistant replies as written). | transcript |
| `evidence/chattranscript-2026-07-18-public-edition.md` | The public edition of the build-session transcript (operator words generalized). | transcript |
| `evidence/research/adversarial-literature-review-recognition-does-not-bind.md` | Adversarial literature review situating "recognition does not bind" against prior art (AgentSpec, Task Shield, shielding, memory benchmarks, etc.). | analysis |
| `evidence/sources/README.md` | Source classification and hold-out rules. | — |

## Media (`media/`)

| File | What it is |
|---|---|
| `media/artifact-hero.png` | The big-top directory hero screenshot used on the front page. |
| `media/connected-in-settings.png` | The "Connected in Settings, Missing in Session" settings screenshot — the founding case's central UI receipt. |

> **Note on the verbatim transcript.** `evidence/full-session-transcript-verbatim.md` is a
> raw, non-generalized transcript. It is appropriate while this repository is **private**;
> it must be re-reviewed before any public release (the root `README.md` states the private
> status, and `../anthropic_experience_review_pack/ARCHIVE-DISPOSITION.md` marks this file
> QUARANTINE for public v1).
