# Task 2 Report: Complete blueprint surfaces

## Product-completeness checkpoint (2026-07-19)

This Track A checkpoint implements the remaining product-side blockers identified after independent review. It does **not** declare the repository rewrite, Track B integration, publication, or release complete.

Completed in this wave:

- Added typed, data-driven interaction mechanics for the required scenes, including the eight-word printer, surface selector, capability layers, gate states, intervention lights, supplied-input/output reveal, audit counters, export simulation, branch collapse, transcript blackout, handoff comparison, correction reveal, and dual-provider replay.
- Added scene-specific Roast, Receipts, and Transcript content plus claim-backed evidence controls on factual scene copy.
- Expanded evidence receipts with public location, hash, fidelity, limitation, public-safe excerpt, generalized summary, correction history, and scene backlink data.
- Made the five-operation task rail persistent across routes, receipt-linked, and usable through a mobile disclosure.
- Moved release status to generated pending-only facts and removed client-side promotion paths.
- Added the supplied-image comparator with keyboard control and a focus-managed full-screen view.
- Added URL-addressable Surface Atlas selection, visible Surface Passports, transcript metadata/tag search, stable event anchors, and working transcript comparisons.
- Added a schema-versioned public-content adapter for the locked `1.0.0` integration contract without consuming or modifying Track B output.
- Split canonical browser routing and artifact hash routing, then added canonical/artifact parity receipts and artifact browser coverage.
- Added enforced performance budgets, CSP metadata, 44px interaction targets, keyboard/focus coverage, and expanded 320px/390px browser and axe checks.

Fresh verification for this wave:

- `npm test`: exit 0; 7 files and 109 tests passed.
- `npm run typecheck`: exit 0.
- `npm run lint`: exit 0.
- `npm run privacy`: exit 0; 60 application text files scanned.
- `npm run build`: exit 0; 63 modules transformed; JS 90.08 kB gzip; CSS 5.29 kB gzip; hero 285,582 bytes; built-output privacy and performance budgets passed.
- `npm run build:artifact`: exit 0; JS 90.22 kB gzip; CSS 5.29 kB gzip; hero 285,582 bytes; built-output privacy and performance budgets passed.
- `npm run verify:parity`: exit 0; canonical and artifact content-model hash `bcc6d3b002aa7dec8b38fcca9ba2fa713b1026cafb8d059639f05da493033381`.
- `npm run test:e2e`: exit 0; 42 tests passed across desktop, 390px, and 320px, including axe checks.
- `npm run test:artifact`: exit 0; 2 artifact-route tests passed.
- `git diff -- design/source-images`: empty. No original supplied image was modified, recompressed, renamed, or removed in this wave.

Remaining integration-only work:

- Replace the public-safe application fixtures through the validated adapter with Track B's generated catalog and transcript records.
- Re-run the combined product/content/privacy/history gates after the branches are integrated.
- Keep release facts pending until the integration/rewrite verification produces passing generated evidence.
- Repository history rewriting, GitHub-side stale-ref removal, force-pushing rewritten refs, and publication remain outside Track A.

## Independent-review correction checkpoint (2026-07-19)

This checkpoint corrects the first Task 2 implementation but does **not** declare Task 2 or the release complete. A separate product-completeness wave remains required before integration.

Corrected in this wave:

- Replaced the generic scene identities with the canonical Prologue, Scenes 1–16, and Finale sequence from the 2,133-line master blueprint.
- Rewrote operator, assistant, and tool-history descriptions as public-safe generalized editorial copy; no raw private transcript wording was added.
- Added typed, claim-backed interaction descriptions and metric rows.
- Added the full Attempt Four beat immediately inside Scene 12 after the zero-blueprint sequence, including the disabled commit control, explanation reveal, canonical headline/subhead/receipt/callback, and all eight frontstage metrics.
- Replaced the prompt-summary harness with seven editable local contract answers and deterministic OBJECTIVE through STOP AND ASK WHEN output.
- Forced every Task 2 release fact to remain `pending` until Task 3 generated receipts exist.
- Implemented real transcript `?event=` focus, scroll, and `aria-current` behavior.
- Removed the exact duplicate tracked hero file and regenerated the retained 1440px hero at 285,582 bytes, below the 350 kB budget.
- Added direct-load and refresh browser coverage for every required route and real event focus.

Fresh verification for this checkpoint:

- `npm test`: 6 files passed; 86 tests passed.
- `npm run typecheck`: exit 0.
- `npm run lint`: exit 0.
- `npm run privacy`: exit 0; 42 text files scanned.
- `npm run build`: exit 0; 59 modules transformed; JS 86.08 kB gzip; CSS 4.37 kB gzip; built-output privacy passed with 5 files scanned.
- `npm run test:e2e`: exit 0; 30 tests passed across desktop, 390px, and 320px, including axe checks.
- `git diff --check`: exit 0.

Known next wave (not claimed complete here): scene-specific interactive mechanisms, scene-specific mode and receipt content, the canonical five-row task rail, generated-only scoreboard inputs, visual comparator fidelity, atlas selection/deep links, richer transcript metadata/search, mobile disclosure/touch behavior, canonical/artifact router parity, and the shared public-evidence adapter.

## Status

Complete and committed on `codex/product-build`.

- Base: `bf24f7cca8c555069cefb15bd6f2486a6dc9a2c4`
- Commit: `a2ee8156f6f2aadde0f383272e6a49f1d417537d`
- Commit subject: `feat(app): complete blueprint product surfaces`
- Repository state after commit: clean (`git status --short --branch` returned only `## codex/product-build`)
- Scope: all committed paths are under `app/`; no root history, evidence, Track B, or `evidence/public` content was changed or consumed.
- Dependencies: no package dependency or lockfile changes.

## Product delivered

- Added data-driven prologue, scenes 1–16, and finale in a validated contiguous order.
- Preserved the Claude → ChatGPT Pro → Codex recursion and included the access-recognized/action-not-performed event as an explicitly labeled paraphrase.
- Added requested-versus-produced ledgers, output callbacks, local scene imagery, limitations, receipt triggers, and a keyboard-operable before/after comparator.
- Added required routes: `/`, `/surfaces`, all four `/cases/*` routes, `/harness`, `/transcripts`, `/transcripts/:transcriptId`, `/evidence`, `/method`, `/corrections`, and `/about`.
- Added Surface Atlas search, ten filter dimensions, computed counts, visible `unknown` values, always-available directory, and optional wheel.
- Added generalized-summary Transcript Theater with fidelity warning, tags, search, stable event URLs, receipt links, and both required comparisons.
- Added deterministic client-only Harness Builder with all five presets, K–12 plain-language toggle, copy, download, and reset.
- Added Evidence Room with source/claim states, public hashes, limitations, correction version/history copy, and scene backlinks.
- Added a typed pending Release Scoreboard that cannot be promoted by query parameters or controls.
- Added and validated responsive 960px and 1440px derivatives for all ten supplied images; all scene images outside the hero use lazy loading.

## Files changed

### Application and typed content

- `app/src/app/AppShell.tsx`
- `app/src/content/catalog.ts`
- `app/src/content/harness.ts`
- `app/src/content/imageManifest.ts`
- `app/src/content/schemas.ts`
- `app/src/features/evidence-room/EvidenceRoom.tsx`
- `app/src/features/guided-experience/GuidedExperience.tsx`
- `app/src/features/harness-builder/HarnessBuilder.tsx`
- `app/src/features/hero/Hero.tsx`
- `app/src/features/output-pile/OutputPile.tsx`
- `app/src/features/release-scoreboard/ReleaseScoreboard.tsx`
- `app/src/features/scene-player/ScenePlayer.tsx`
- `app/src/features/surface-atlas/SurfaceAtlas.tsx`
- `app/src/features/transcript-theater/TranscriptTheater.tsx`
- `app/src/styles/system.css`

### Tests

- `app/tests/e2e/review-slice.spec.ts`
- `app/tests/e2e/task2-surfaces.spec.ts`
- `app/tests/schema.test.ts`
- `app/tests/task2-content.test.ts`
- `app/tests/task2-product.test.tsx`

### Optimized local derivatives

- `app/public/images/hero/hero-big-top--wide--960.jpg`
- `app/public/images/hero/hero-big-top--wide--1440.jpg`
- Eighteen files under `app/public/images/scenes/`: 960px and 1440px derivatives for the other nine supplied scene images.

## TDD red-green evidence

1. Typed content boundary:
   - RED: `npm test -- --run tests/task2-content.test.ts` → 7 expected failures (2 scenes instead of 18; missing atlas, transcripts, harness presets, and image registry).
   - GREEN: same command → 8/8 passed; later expanded to 9 tests with claim-backed harness-line validation.
2. Routes and interactions:
   - RED: `npm test -- --run tests/task2-product.test.tsx` → 21/21 expected failures before route/component implementation.
   - GREEN: same command → 21/21 passed; later expanded with responsive lazy-image coverage.
3. Scene image loading:
   - RED: focused lazy-image test failed because the first scene image was eager.
   - GREEN: all ten scene images verified lazy with responsive `960w`/`1440w` sources.
4. Harness claim boundary:
   - RED: focused test rejected the free-form `Completion state` line.
   - GREEN: the line now resolves through accepted sourced claim `claim-release-pending`.
5. Task 2 duplicate IDs:
   - RED: focused schema test showed duplicate harness and transcript-event IDs were accepted.
   - GREEN: the global duplicate check now covers transcript events, harness presets, and page records.
6. Browser and accessibility behavior:
   - RED: first Task 2 Playwright run against the pre-Task-2 build failed 6/7 desktop scenarios as the routes/surfaces were absent.
   - GREEN: fresh Task 2 desktop build passed 7/7.
   - Regression RED: full matrix passed 23/24 and isolated 320px overflow. Diagnostic output showed every `.scene` grid item extending to `324.15625px` in a `320px` viewport.
   - Regression GREEN: `min-width: 0` on guided scene grid items; focused 320px test passed, then the full matrix passed 24/24.

## Exact final verification

- `npm test`
  - Exit 0.
  - `Test Files 6 passed (6)`
  - `Tests 78 passed (78)`
- `npm run typecheck`
  - Exit 0.
  - `tsc --noEmit`
- `npm run lint`
  - Exit 0.
  - `eslint .`
- `npm run build`
  - Exit 0.
  - Vite: `59 modules transformed`, built in `343ms`.
  - Output: HTML `0.67 kB` (`0.40 kB` gzip), CSS `15.18 kB` (`3.94 kB` gzip), JS `268.70 kB` (`80.88 kB` gzip).
  - Dist privacy: `5 text files scanned` and passed.
- `npm run test:e2e`
  - Exit 0.
  - `24 passed (3.9s)` across desktop, mobile-390, and mobile-320.
  - Includes axe checks for the guided journey and mobile transcript/evidence path.
- `npm run privacy`
  - Exit 0.
  - `Privacy validation passed: 42 text files scanned.`
- `git diff --check`
  - Exit 0; no whitespace errors.

## Self-review

- Confirmed every committed path is under `app/`.
- Confirmed no package or lockfile change.
- Confirmed no runtime source renders unsupported `56+` or `COMPLETE`.
- Confirmed no runtime network dependency or remote font was added.
- Confirmed fixtures are generalized, non-verbatim, public-safe, and use only `branch-cleanup` plus `###-PII-###` in retained redaction presentation.
- Confirmed all factual guided fields, harness preview lines, status facts, and rendered claims resolve through accepted claim/source records.
- Confirmed ten source images map to twenty responsive derivatives with hashes, dimensions, alt text, and local URLs.

## Concerns / Task 3 handoff

- Expected: the app still uses clearly generalized Task 2 fixture records and intentionally does not consume `evidence/public`; Task 3 must perform the validated catalog/transcript sync.
- Expected: the scoreboard remains pending until Task 3 generates passing verification receipts.
- Performance budgets are not yet enforced in Task 2. The current 1440px hero derivative is 529,954 bytes, so Task 3 must further optimize it to satisfy the planned 350 kB hero budget.
- Playwright emits non-failing `NO_COLOR` environment warnings from its local web server process; all tests still pass.
