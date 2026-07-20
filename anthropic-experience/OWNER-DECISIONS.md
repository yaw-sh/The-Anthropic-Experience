# Binding owner decisions

These decisions govern the repository and supersede prior recommendations that treated it as a private evidence vault or required a separate clean-room repository.

| Date | Binding decision | Operational consequence |
|---|---|---|
| 2026-07-19 | This existing repository becomes both the product and its sanitized public process record. | No replacement repository, private sibling edition, or external evidence vault is created. |
| 2026-07-19 | `app/` is the canonical product build. | Alternate implementations are historical sources only and are removed after their unique process outcomes are represented. |
| 2026-07-19 | The root 2,133-line `THE-ANTHROPIC-EXPERIENCE-MASTER-BLUEPRINT.md` is authoritative. | Shorter blueprint snapshots and competing plans do not govern and are removed after deduplication. |
| 2026-07-19 | Private project reference slots use the literal `###-PII-###`. | Every known variant is replaced before generalization; the slot is preserved rather than silently deleted. |
| 2026-07-19 | Operator, assistant, system, and tool content are all generalized for publication. | Public transcripts contain concise labeled summaries, stable source ranges, and no language presented as verbatim. |
| 2026-07-19 | Duplicate tracked copies and ZIP files are removed. | Unique content receives one canonical public-safe destination; source uploads are consumed and removed. |
| 2026-07-19 | Product build and repository cleanup remain separately visible until integration. | `codex/product-build` owns `app/`; `codex/repo-history` owns history, public evidence, cleanup receipts, and rewrite preparation. |

Completion is not established by a branch push. It requires product integration, a verified safe rewrite, and visibility on `main`.
