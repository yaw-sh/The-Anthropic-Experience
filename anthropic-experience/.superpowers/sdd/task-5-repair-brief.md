### Task 5: Full verification and design QA

**Files:**
- Modify: `anthropic-experience/app/tests/e2e/*.spec.ts`
- Create: `anthropic-experience/app/design-qa.md`
- Create/update: `anthropic-experience/app/verification/*`

**Interfaces:**
- Produces: fresh clean-clone-compatible release receipt and design QA with exact final line `final result: passed` only when no P0/P1/P2 findings remain.

- [ ] Add browser tests for desktop wheel alignment, 390x844 and 320x760 fallback, keyboard operation, reduced motion, refresh/deep links, minimum targets, no overflow, no duplicate controls, no axe violations, and no external requests.
- [ ] Run the complete verification sequence from `anthropic-experience/app`: `npm ci`, `npm run check:root`, `npm run check:content`, `npm test`, `npm run typecheck`, `npm run lint`, `npm run build`, `npm run build:artifact`, `npm run verify:parity`, `npm run test:e2e`, `npm run test:artifact`, `npm run test:dev`, `npm run privacy`, `npm run release:verify`.
- [ ] Capture desktop and mobile implementation screenshots and compare them with the exact source images; fix every P0/P1/P2 mismatch and record the comparison history in `design-qa.md`.
- [ ] Verify all ten original image hashes/dimensions and the Claude artifact hash are unchanged.
- [ ] Verify the tracked root has exactly two entries and the git working tree is clean after the final commit.
- [ ] Commit with `test(app): verify repaired private experience` and land the branch on private `main` without publishing or rewriting history.
