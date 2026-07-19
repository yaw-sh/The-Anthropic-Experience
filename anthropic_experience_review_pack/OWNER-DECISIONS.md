# Owner Decisions — Defaults for the Clean Build

Record changes with date, decision, rationale, and approver. The checked defaults below reflect the Pro review recommendation; Codex should use them unless explicitly changed.

## Scope

- [x] Public v1 covers the original GitHub/connector case and the failed-build recursion.
- [x] EVE is excluded from v1.
- [x] Fellows/safety research is excluded from v1.
- [x] Full transcripts are excluded from v1.
- [x] The five-page research PDF is excluded from v1.
- [x] The external literature review is method/background only until citations are rebuilt.

## Product

- [x] Requested-versus-produced ledger is the primary interface.
- [x] The 35-label census is optional appendix content, not homepage navigation.
- [x] The wheel is optional enhancement, not required navigation.
- [x] Canonical site ships before any Claude Artifact mirror.
- [x] No backend, database, CMS, analytics, account system, or model calls.

## Identity and evidence

- [x] Public repository/account handle is omitted by default.
- [x] Exact model names are omitted unless materially necessary and fidelity-labeled.
- [x] Reconstructed transcript text is paraphrased by default.
- [x] No provider-wide failure rate or comparative provider claim.
- [x] No complete internal causal attribution.
- [x] Git-history cleanliness remains unknown from the supplied archive.

## Assets and launch

- [x] Scene images require provenance and owner approval.
- [x] CSS/diagram fallback must allow launch without generated art.
- [x] Preview is access-controlled/noindex.
- [x] Production release requires exact bundle and claim review.
- [x] Code, content, evidence, and assets receive separate licensing treatment.

## Decision log

| Date | Decision | Change from default | Rationale | Approved by |
|---|---|---|---|---|
| 2026-07-19 | The root master blueprint (`THE-ANTHROPIC-EXPERIENCE-MASTER-BLUEPRINT.md`) is the plan of record for the product build. The build — the visible product, the operator-voice generalization pass over every transcript, and `TRANSCRIPT-INGESTION-SPEC.md` conformance — is assigned to **Codex**, executed in a fresh clean-room repository per blueprint §20/§24. This repository is the private evidence vault and source of record only; it does not build the product itself. | Names an explicit build owner (Codex) where the pack previously left "clean-room rebuild" scope-owner-agnostic; the original phased plan (`docs/superpowers/`) and this pack's `CODEX-BUILD-DIRECTIVE.md` are retained as historical/engineering reference, superseded as build authority. | Direct operator instruction, given twice in conversation: "Prep only — Codex builds" (scope answer) and "codex will do all of it" (confirming scope covers the prep/generalization work too, not only the product). See `CODEX-PREP-HANDOFF.md` for the resulting work order. | The operator (repository owner), 2026-07-19. |
