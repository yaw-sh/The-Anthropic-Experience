# Task 4 Repair Report: Accessible Circus Scene Frameworks

## Result

Implemented the ten supplied circus stage layouts as catalog-validated, responsive scene frameworks with 42 source-bound controls. The supplied illustrations are presentation backdrops only; every control remains a single, accessible DOM element across desktop and mobile layouts.

## Product behavior

- Added an exact ten-layout stage registry with normalized slot geometry, positive dimensions, unique IDs, scene/image/control references, and complete one-to-one coverage of all ten supplied images.
- Added 42 catalog controls across the directory, family, capability, authorization, thesis, responsibility, paperwork, evidence, and finale frameworks. Every control carries a source claim and receipt binding.
- Kept stage facts conservative: authorization is presented as method, not historical pass/fail; thesis stages describe the documented chain; capability and evidence companions expose readable source and receipt context.
- Made the family filter update the current URL while preserving existing parameters, retain a still-visible selection, fall back to the first match, and retain the prior URL when no results remain.
- Made the paperwork reveal operate on one persistent output pile and reveal the unchanged Phase 0 state.
- Moved the full release scoreboard into the finale and left only a compact footer link elsewhere.
- Removed duplicate supplied-art rendering and the comparator's supplied-art selector. Comparator truth continues to use real screenshots and metadata.
- Replaced invented provider pass/fail wording with neutral replay-step language.

## Accessibility and responsiveness

- Stage imagery uses intrinsic source dimensions with `width: 100%` and automatic height; no stage illustration is cropped with `object-fit: cover`.
- Each control has one DOM wrapper and one interactive element. Desktop positioning and the mobile grid/flow reuse those same nodes.
- All interactive stage controls meet the 44px minimum target and have visible focus treatment.
- Each stage group and image is connected through `aria-describedby` to a readable source/receipt companion.
- Mobile behavior switches at 899px without duplicating controls.

## Red/green evidence

Initial focused run:

```text
npx vitest run tests/stage-layouts.test.tsx tests/scene-frameworks.test.tsx
2 suites failed during import resolution because src/content/stageLayouts.ts did not exist; 0 tests collected.
```

Final focused run is recorded in the verification section below.

## Verification

The final verification pass covered:

- `npx vitest run tests/stage-layouts.test.tsx tests/scene-frameworks.test.tsx --reporter=dot` — 2 files, 17 tests passed.
- `npm test -- --reporter=dot` — 14 files, 172 tests passed.
- `npm run typecheck` — passed.
- `npm run lint` — passed.
- `npm run build` — passed; JS gzip 130,934 bytes, CSS gzip 7,107 bytes, hero 199,396 bytes.
- `npm run build:artifact` — passed; JS gzip 131,056 bytes, CSS gzip 7,107 bytes, hero 199,396 bytes.
- `npm run verify:parity` — passed with parity hash `d2b92c029e96d91ad580bb986efc205b792a568bd9c32fb64022766a388bf17e`.
- `npm run privacy` — passed; 85 source text files scanned.
- `npm run check:root` — passed.
- `git diff --check` — passed.

Receipt files were refreshed explicitly only after each normal verification command correctly rejected stale generated evidence, and the normal command was then rerun against the refreshed receipt.

## Files and generated evidence

Primary implementation:

- `app/src/content/stageLayouts.ts`
- `app/src/content/schemas.ts`
- `app/src/content/catalog.ts`
- `app/src/features/scene-stage/ResponsiveSceneStage.tsx`
- `app/src/features/scene-player/ScenePlayer.tsx`
- `app/src/features/surface-directory/*`
- `app/src/features/hero/Hero.tsx`
- `app/src/app/AppShell.tsx`
- `app/src/styles/system.css`

Tests:

- `app/tests/stage-layouts.test.tsx`
- `app/tests/scene-frameworks.test.tsx`
- updated existing assertions whose prior expectations described the replaced locked/duplicated presentation.

Generated evidence:

- `app/src/generated/image-manifest.json`
- canonical and artifact parity/privacy receipts under `app/verification/`
- source privacy receipt under `app/verification/`

## Remaining boundary

Task 4 establishes the semantic, responsive, and unit-tested scene frameworks. Full browser screenshot, interaction, and automated accessibility acceptance remains Task 5. The existing Vite large-chunk warning remains visible during builds, while the repository's enforced gzip budgets pass. No stage presentation changes release readiness or owner authorization facts.
