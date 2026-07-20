# Repository operating contract

Read these sources in order before changing this repository:

1. `OWNER-DECISIONS.md`
2. `THE-ANTHROPIC-EXPERIENCE-MASTER-BLUEPRINT.md`
3. `history/README.md`
4. `evidence/public/README.md`

## Authority and track boundaries

- The root 2,133-line master blueprint controls product intent.
- `app/` is the canonical implementation and is owned by the product-build track.
- `history/`, `evidence/public/`, `docs/audit/`, and cleanup tooling are owned by the repository-history track.
- The tracks start from the same verified base and remain visibly separate until integration.
- Do not create another repository, private evidence vault, raw sibling edition, alternate product implementation, or replacement blueprint.

## Public-content contract

- Public transcripts are generalized, never verbatim.
- Operator, assistant, system, and tool activity all receive the same public-safety treatment.
- Preserve unique source slots and ranges even when adjacent exchanges are collapsed.
- Use the literal `###-PII-###` for redacted private reference slots.
- Do not publish denylist values, original sensitive strings, raw source hashes, session identifiers, or old commit mappings.
- `evidence/public/catalog.json` and `evidence/public/transcripts/*.json` are the shared application interface.

## Delivery contract

- Verify before asserting.
- Commit every deliverable produced in a turn.
- A pushed branch is not completion. Completion requires integrated product content, a verified safe history rewrite, and visibility on `main`.
- Never force-push while either track is active or without an explicit integration-ready instruction.
