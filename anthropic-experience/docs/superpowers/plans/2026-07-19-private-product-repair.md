# Private Product Repair Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Leave the existing private repository as a working, verified product with a tracked root containing only `README.md` and `anthropic-experience/`, including the exact Claude artifact as a documented historical reference.

**Architecture:** Move the existing canonical application, evidence, history, design sources, and tooling together under one self-contained `anthropic-experience/` directory so their relative contracts remain intact. Repair integrated-content drift, then replace the placeholder surface selector and static scene artwork with catalog-driven React controls inside a validated stage registry. Keep all facts and controls sourced from the existing typed catalog; never make raster text or imagery the sole accessible representation.

**Tech Stack:** React 18, TypeScript 5.5, React Router 6, Zod 3, Vite 6, Vitest, Testing Library, Playwright, axe.

## Global Constraints

- Do not publish the repository, change repository visibility, rewrite history, force-push, create a replacement repository, or delete old history.
- The tracked repository root must contain exactly `README.md` and `anthropic-experience/`; `.git` worktree metadata is ignored for this assertion.
- Preserve all ten files in `design/source-images/` byte-for-byte and use each exactly once in the canonical semantic image assignment.
- Preserve `design/reference/wheel-v1/` and `design/reference/wheel-v2/`; port wheel behavior into the app without adding a runtime dependency or remote font.
- Copy `/Users/hermes/Desktop/the-anthropic-experience.jsx` byte-for-byte to `anthropic-experience/design/reference/claude-artifact/the-anthropic-experience.jsx`; verify equality during the task without recording the raw SHA-256 in tracked documentation or tests.
- Keep the historical Claude artifact out of runtime imports and build output; document its provenance and public-safety status.
- `evidence/public/catalog.json` and its six transcripts are authoritative; the current integrated event count is derived from their metadata and is not hard-coded.
- Selection is URL-addressable via `?surface=<id>` and family filtering via `?family=<family>`; a valid selected surface is shared by wheel, tickets, passport, family controls, homepage, and `/surfaces`.
- No duplicate tabbable desktop/mobile controls. At widths below 900px, replace overlays with the same control DOM in normal flow.
- Every interactive target is at least 44 by 44 CSS pixels, keyboard-operable, visible on focus, and reduced-motion safe.
- No new dependencies, remote fonts, remote runtime requests, raw transcripts, base64 blobs, secrets, private local paths, or unsupported factual status.

---

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

### Task 3: Shared surface directory and real wheel

**Files:**
- Create: `anthropic-experience/app/src/features/surface-directory/useSurfaceDirectoryState.ts`
- Create: `anthropic-experience/app/src/features/surface-directory/SurfaceDirectoryExperience.tsx`
- Create: `anthropic-experience/app/src/features/surface-directory/SurfaceWheel.tsx`
- Create: `anthropic-experience/app/src/features/surface-directory/SurfaceTicketDirectory.tsx`
- Create: `anthropic-experience/app/src/features/surface-directory/SurfacePassport.tsx`
- Create: `anthropic-experience/app/src/features/surface-directory/wheelMath.ts`
- Modify: `anthropic-experience/app/src/features/hero/Hero.tsx`
- Modify: `anthropic-experience/app/src/features/guided-experience/GuidedExperience.tsx`
- Modify: `anthropic-experience/app/src/features/surface-atlas/SurfaceAtlas.tsx`
- Modify: `anthropic-experience/app/src/styles/system.css`
- Test: `anthropic-experience/app/tests/surface-directory.test.tsx`
- Test: `anthropic-experience/app/tests/wheel-math.test.ts`

**Interfaces:**
- `landingRotation(currentRotation: number, winnerIndex: number, count: number, turns?: number): number`.
- `useSurfaceDirectoryState({ fullFilters: boolean })` returns selected surface, visible surfaces, query, family/dimension filters, setters, and `selectSurface(id)`.

- [ ] Write failing tests for one/eight/filtered wheel math, URL/ticket/passport synchronization, hidden-selection fallback, zero results, canonical ordinals, spin locking, reduced motion, live announcements, and roving keyboard behavior.
- [ ] Run focused tests and record expected failures.
- [ ] Port wheel-v2 rotation mathematics as pure TypeScript and render eight catalog-driven segments.
- [ ] Make `heroBigTopAlt` the first homepage image and place the wheel in its circular frame, four ticket buttons on each side, and the readable passport outside the raster.
- [ ] Make homepage and `/surfaces` reuse the same directory state/components; `/surfaces` adds all ten dimension filters.
- [ ] Move `heroBigTop` to a static prologue framework below the directory.
- [ ] Add under-900px horizontal selector fallback using the same controls and no duplicate tab stops.
- [ ] Run focused tests, unit tests, typecheck, lint, and build.
- [ ] Commit with `feat(app): build synchronized surface wheel and directory`.

### Task 4: Validated responsive scene frameworks

**Files:**
- Create: `anthropic-experience/app/src/content/stageLayouts.ts`
- Modify: `anthropic-experience/app/src/content/schemas.ts`
- Modify: `anthropic-experience/app/src/content/catalog.ts`
- Create: `anthropic-experience/app/src/features/scene-stage/ResponsiveSceneStage.tsx`
- Modify: `anthropic-experience/app/src/features/scene-player/ScenePlayer.tsx`
- Modify: `anthropic-experience/app/src/features/scene-mechanic/SceneMechanic.tsx`
- Modify: `anthropic-experience/app/src/features/release-scoreboard/ReleaseScoreboard.tsx`
- Modify: `anthropic-experience/app/src/app/AppShell.tsx`
- Modify: `anthropic-experience/app/src/styles/system.css`
- Test: `anthropic-experience/app/tests/stage-layouts.test.tsx`
- Test: `anthropic-experience/app/tests/scene-frameworks.test.tsx`

**Interfaces:**
- `StageLayout = { id; sceneId; imageId; kind; slots; mobilePresentation }`.
- `StageSlot = { id; controlId; x; y; width; height }`, with every numeric coordinate validated from 0 through 100.

- [ ] Write failing tests for layout validation, missing references, unique control IDs, one canonical use of each source image, and a single DOM instance of every control.
- [ ] Run focused tests and record expected failures.
- [ ] Add intrinsic-aspect-ratio stages with percentage-positioned controls on desktop and the same controls in normal flow below 900px.
- [ ] Apply this exact one-use image map: directory=`heroBigTopAlt`; prologue=`heroBigTop`; families=`actFunhouse`; capability inventory=`actHiddenCapabilities`; authorization chain=`actHighWire`; Evidence/Recognition/Consequence=`actThreeRings`; operator responsibilities=`actControlPlane`; output pile=`actPaperwork`; Evidence Room frontstage/backstage=`actBackstage`; finale scoreboard=`actPrizeBooth`.
- [ ] Keep branch cleanup and provider replay as normal DOM panels without scene imagery.
- [ ] Bind six family controls, six capability layers, six authorization stages, three thesis steps, eight responsibilities, paperwork reveal, frontstage/backstage evidence toggle, and finale return link to catalog records/claims.
- [ ] Move the full release scoreboard into the prize-booth finale and leave only a compact generated-status link in the global footer.
- [ ] Run focused tests, unit tests, typecheck, lint, and builds.
- [ ] Commit with `feat(app): activate accessible circus scene frameworks`.

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
