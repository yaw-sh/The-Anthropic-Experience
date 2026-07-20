### Task 1: One-folder repository and preserved Claude artifact

**Files:**
- Move: every tracked root path except `README.md` into `anthropic-experience/`
- Create: `README.md`
- Modify: `anthropic-experience/README.md`
- Create: `anthropic-experience/design/reference/claude-artifact/README.md`
- Copy: `anthropic-experience/design/reference/claude-artifact/the-anthropic-experience.jsx`
- Create: `anthropic-experience/scripts/verify-root-layout.mjs`
- Modify: `anthropic-experience/app/package.json`

**Interfaces:**
- Produces: `npm run check:root` from `anthropic-experience/app/`, exiting nonzero unless the tracked root has exactly the two required entries and the preserved Claude artifact is tracked and unchanged from `HEAD`.

- [ ] Add a failing root-layout verifier test/command that reports the current extra root entries.
- [ ] Run it and record the expected failure.
- [ ] Move the complete current tree under `anthropic-experience/`, preserving relative `app/`, `design/`, `evidence/`, `history/`, and `scripts/` relationships.
- [ ] Replace root `README.md` with a concise pointer, run instructions, private-repository statement, and artifact location.
- [ ] Update the inner README map and copy/document the exact Claude artifact.
- [ ] Run `npm run check:root`, `npm run typecheck`, the artifact tracking check, and `git diff --check`.
- [ ] Commit with `refactor(repo): consolidate private product under one folder`.
