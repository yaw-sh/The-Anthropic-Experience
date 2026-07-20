### Task 2: Deterministic integrated content and release evidence

**Files:**
- Modify: `anthropic-experience/app/scripts/sync-public-content.mjs`
- Modify: `anthropic-experience/app/package.json`
- Modify: `anthropic-experience/app/src/generated/public-evidence.json`
- Modify: `anthropic-experience/app/scripts/write-parity-receipt.mjs`
- Modify: `anthropic-experience/app/scripts/validate-privacy.mjs`
- Modify: `anthropic-experience/app/scripts/verify-release.mjs`
- Modify: `anthropic-experience/app/verification/release-verification.json`
- Test: `anthropic-experience/app/tests/review-blockers.test.tsx`
- Test: `anthropic-experience/app/tests/task2-product.test.tsx`
- Test: `anthropic-experience/app/tests/final-audit-blockers.test.tsx`

**Interfaces:**
- Produces: `npm run check:content`, a non-mutating byte comparison between authoritative evidence and committed generated content.
- Produces: `npm run prepare:content`, which first performs the non-mutating check and then refreshes only the ignored runtime copy under `app/public/evidence/`.
- Produces: tracked verification evidence paths that remain resolvable in a clean clone.

- [ ] Add tests proving the event count is metadata-derived, integrated full-text transcript search includes matching generalized event prose, content checks do not mutate tracked files, and every passing verification check points to committed evidence.
- [ ] Run focused tests and record the expected failures.
- [ ] Add `--check` and `--prepare` support to the sync script; make test/build use `prepare:content` and retain `sync:content` only as the explicit tracked generator.
- [ ] Regenerate and commit the 78-event bundle.
- [ ] Update the stale transcript assertion to preserve the existing metadata/tag/generalized-event full-text search contract.
- [ ] Store deterministic canonical/artifact build and source/bundle privacy receipts under `verification/` and reference those tracked receipts from release verification.
- [ ] Run focused tests, full unit tests, typecheck, lint, build, artifact build, and parity.
- [ ] Commit with `fix(app): make integrated content and receipts deterministic`.
