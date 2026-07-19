# Codex Handoff — Start Here

This is the implementation subset of the private Pro review pack.

## Read order

1. `CODEX-BUILD-DIRECTIVE.md` — normative scope, architecture, phases, and completion definition.
2. `OWNER-DECISIONS.md` — recommended defaults; record owner changes before implementation.
3. `public-claims-register.seed.json` — private adjudication seed; nothing in it is automatically public-approved.
4. `RELEASE-GATES.md` — blocking quality/privacy/evidence gates.
5. `ARCHIVE-DISPOSITION.md` — what may be salvaged and what must remain private.
6. `THE-ANTHROPIC-EXPERIENCE-PRO-REVIEW.md` — detailed rationale and findings.
7. `OUTWARD-RESEARCH-MERGE-GUIDE.md` — merge the separate forum/literature report through structured sources and claims.
8. `AUDIT-RECEIPTS.md` — verified snapshot/build facts and limitations.

## Non-negotiable starting state

- Create a new empty repository.
- Keep the supplied archive outside it.
- Do not copy the inherited repo or Git history.
- Do not import raw transcripts, EVE, Fellows, or the research paper.
- Build public output only from adjudicated structured records.
- Ship the canonical site before any Claude Artifact mirror.

## Expected first implementation action

Create `docs/DECISIONS.md`, copy the checked defaults from `OWNER-DECISIONS.md`, record any owner changes, and then execute Phase 0 from the directive. Do not start by copying React or HTML source from the inherited archive.
