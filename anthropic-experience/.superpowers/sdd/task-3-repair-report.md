# Task 3 repair report: shared surface directory and wheel

## Result

The homepage and `/surfaces` now render one catalog-driven surface-directory composition. The eight current `publicCatalog.surfaces` records drive the visible count, wheel face, selectable wheel segments, ticket banks, detailed directory, and passport. Selection and filtering are URL-backed, unrelated query parameters survive updates, and the Scene 2 mechanic links to the shared directory instead of maintaining a divergent selector.

The homepage opens with the responsive `heroBigTopAlt` artwork at intrinsic 16:9, with high fetch priority, a wheel centered at `50% / 49%`, and four tickets over each intended side bank. The original `heroBigTop` is the lazy static prologue immediately after the directory composition. All readable labels, dimensions, claims, source references, and receipt links remain HTML outside the raster.

## Decisions

- Kept `publicCatalog.surfaces` as the only record collection and derived canonical ordinals from its index. Filtering never renumbers a surface.
- Made `surface`, `q`, `family`, and all atlas dimensions URL-addressable while preserving unrelated parameters. Homepage applies only its visible query and family controls; full-atlas-only dimensions remain dormant there but survive the link to `/surfaces`.
- When a nonempty result set excludes the URL selection, a replace navigation selects the first visible record. An empty set leaves the prior `surface` value intact, renders `No matching surfaces.`, omits the passport, and disables Spin.
- Ported only the wheel-v2 landing equation. The implementation uses strict TypeScript, dynamic catalog counts, an alternating cream/burgundy conic face with thin dividers, and no copied records, fonts, dependencies, or 4.2-second timing.
- Made the actual wheel segments a roving radio group with one tab stop, arrow wrapping, Home/End, and Enter/Space activation. The same segment DOM becomes the horizontal selector below 900px. Ticket buttons are one synchronized DOM collection across breakpoints.
- Normal spin samples the visible collection once, ignores repeat activation, retains focus, reports through a polite live region, and resolves at 1.2 seconds. The rotating rotor now contains both the face and the actual catalog segment controls; each segment's contents counter-rotate to stay upright, while the same DOM becomes an untransformed horizontal selector below 900px. Reduced motion resolves immediately.
- Any URL-backed directory mutation during the 1.2-second interval cancels the pending spin before its captured callback can run. Query/filter changes (including a zero-result transition) and direct ticket/segment selection therefore retain their newer URL state and never announce or select a hidden stale winner.
- Made the passport receipt link an explicit `inline-flex` control with a 44px minimum hit-target height.
- Replaced Scene 2's independent progressive selector with a link to the shared directory.

## Files

Created:

- `app/src/features/surface-directory/useSurfaceDirectoryState.ts`
- `app/src/features/surface-directory/SurfaceDirectoryExperience.tsx`
- `app/src/features/surface-directory/SurfaceWheel.tsx`
- `app/src/features/surface-directory/SurfaceTicketDirectory.tsx`
- `app/src/features/surface-directory/SurfacePassport.tsx`
- `app/src/features/surface-directory/wheelMath.ts`
- `app/tests/surface-directory.test.tsx`
- `app/tests/wheel-math.test.ts`

Updated:

- `.superpowers/sdd/task-3-repair-brief.md`
- `app/src/features/hero/Hero.tsx`
- `app/src/features/guided-experience/GuidedExperience.tsx`
- `app/src/features/surface-atlas/SurfaceAtlas.tsx`
- `app/src/features/scene-mechanic/SceneMechanic.tsx`
- `app/src/styles/system.css`
- `app/tests/completeness-wave.test.tsx`
- `app/tests/review-blockers.test.tsx`
- `app/verification/canonical-bundle-privacy.json`
- `app/verification/artifact-bundle-privacy.json`
- `app/verification/source-privacy.json`

The canonical and artifact parity receipts were explicitly regenerated and proved byte-identical, so they do not appear in the final diff.

## Red-green evidence

Baseline before Task 3:

- `npm test` — 10 files, 134 tests passed.

Initial RED:

- `npx vitest run tests/wheel-math.test.ts tests/surface-directory.test.tsx` — both suites failed because the required Task 3 modules did not exist.
- The alternating-sector regression then failed with `wheelGradient is not a function` before the dynamic v2 palette generator was added.
- The homepage image contract failed because `fetchpriority="high"` was absent before it was restored.

GREEN:

- `npx vitest run tests/wheel-math.test.ts tests/surface-directory.test.tsx` — 2 files, 15 tests passed.
- Tests cover one/eight/filtered rotation, invalid inputs, alternating dynamic sector styling, URL/wheel/ticket/passport/count synchronization, direct segment activation, hidden-selection fallback, zero results, canonical ordinals, spin lock/timing/focus/live announcement, reduced motion, distinct segment positions, roving keyboard behavior, homepage filter scope, atlas-link URL preservation, ten full-route filters, image order/priority/intrinsics, lazy prologue, and removal of the divergent Scene 2 selector.

Review repair RED:

- `npx vitest run tests/surface-directory.test.tsx tests/wheel-math.test.ts` — 1 failed file, 1 passed file; 4 failed and 15 passed tests. The four failures proved that the live segment controls had no rotor/angle/counter-rotation mapping, zero-result filtering allowed the stale winner to replace the preserved surface, a provider change was erased while its sampled winner remained visible, and the receipt link lacked its explicit target class/style.

Review repair GREEN:

- Added a fifth regression for direct ticket selection during a pending spin before the GREEN run.
- `npx vitest run tests/surface-directory.test.tsx tests/wheel-math.test.ts` — 2 files, 20 tests passed.
- The added tests compute winner-to-pointer alignment from the live catalog segment and rotor variables, assert its nested content counter-rotation, advance fake timers across zero-result/filter/direct-selection races, verify newer URL parameters and selections survive, reject stale winner announcements, and inspect the explicit 44px receipt-link rule.

Only legitimately stale assertions changed: the old optional-placeholder checkbox/monogram expectations now address the always-present real wheel, and an ambiguous surface button query now targets the synchronized ticket explicitly.

## Verification

- `npm test` — 12 files, 154 tests passed.
- `npm run typecheck` — passed with strict TypeScript.
- `npm run lint` — passed with zero warnings or errors.
- `npm run build` — passed; canonical parity/privacy receipts matched and performance budgets passed.
- `npm run build:artifact` — passed; artifact parity/privacy receipts matched and performance budgets passed.
- `npm run verify:parity` — passed with matching canonical/artifact content hash.
- `npm run privacy` — passed after the source receipt was refreshed last.
- `git diff --check` — passed.

The deterministic refresh used the tracked scripts with `--write` only after generating each canonical/artifact distribution. The source privacy receipt was refreshed after all source and report changes; subsequent ordinary verification remained non-mutating.

## Remaining concerns

- Vite emits its existing warning that a minified JavaScript chunk exceeds 500 kB, while the enforced gzip budget still passes at approximately 127 kB. This task added no dependency and did not broaden runtime requests.
- Full browser screenshot, axe, cross-browser, and 320/390-pixel visual QA remain Task 5 responsibilities. Task 3 supplies the responsive DOM/CSS behavior and unit-level keyboard/reduced-motion contracts they will exercise.
- Task 4 still owns the complete one-use scene-image registry migration. The new directory artwork deliberately remains outside the legacy `.scene__image` collection.
