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

**Locked registry and placement:**
- `directory-wheel` / `surface-wheel` / `heroBigTopAlt` / directory: center wheel `{37.25,21.5,25.5,45.3}` plus eight ticket controls in four left/right rows. Task 3 owns this rendering; the registry describes it but `ScenePlayer` must not render a second copy.
- `prologue-anchor` / `prologue` / `heroBigTop` / static anchor: zero controls.
- `surface-families` / `surface-wheel` / `actFunhouse`: six current family controls, left-to-right assistant, coding-agent, repository, editor, browser, control, over the six door plaques.
- `capability-inventory` / `original-question` / `actHiddenCapabilities`: six controls for capability listing, installed tool, connector, credentials, authorization, and repository access.
- `authorization-chain` / `original-question` / `actHighWire`: six controls for requested action, capability available, credentials present, permission granted, target in scope, and action verified. These are method steps, never invented historical pass/fail states.
- `thesis-rings` / `seven-minute-lesson` / `actThreeRings`: Evidence, Recognition, Consequence; the provider replay remains normal DOM without a second image.
- `operator-responsibilities` / `user-control-plane` / `actControlPlane`: eight controls for tool discovery, product navigation, repository state, continuity, contradiction detection, privacy review, progress enforcement, and definition of done.
- `paperwork-output` / `build-this-website` / `actPaperwork`: one `paperwork-reveal` control; reuse the existing OutputPile companion and do not duplicate its DOM.
- `evidence-room` / `evidence-room` / `actBackstage`: `evidence-view-frontstage` and `evidence-view-backstage`; readable claim/source/limitation content remains outside the raster.
- `finale-scoreboard` / `finale` / `actPrizeBooth`: one real return-to-directory control; the full ReleaseScoreboard is the readable companion.
- Enforce exactly ten layout records, all ten manifest image IDs exactly once, 42 total slots, unique layout/slot/control IDs, valid scene/image/control references, and `x + width <= 100`, `y + height <= 100` in addition to normalized coordinate bounds.

**Responsive and evidence constraints:**
- `ResponsiveSceneStage` renders the intrinsic `<picture>` and exactly one control DOM tree. At 900px and wider the same wrappers use normalized absolute slots; below 900px they become normal-flow horizontal or stacked selectors. Never render separate desktop/mobile control copies.
- Set explicit source width/height and aspect ratio; use `width:100%; height:auto`; never use `object-fit:cover`. Targets are at least 44x44 CSS pixels with visible focus. Complete text, state, limitation, source, and receipt actions live in the companion panel.
- Item labels/details must resolve through catalog-backed claim/control records. Family details may derive from surface records; all other controls need source/method bindings. Do not render OPEN, PASSED, verified, or factual status unless a source-bound claim establishes it.
- Remove the comparator's selectable supplied-art reuse (or make it a nonsemantic reference capture) so it cannot violate the exact one-use assignment. Update stale generated image alt/purpose metadata through the existing derivative generator without changing source image bytes.
- Move the full scoreboard out of the global shell. The footer keeps only a compact link to the generated status; the finale owns the only full scoreboard.

- [ ] Write failing tests for layout validation, missing references, unique control IDs, one canonical use of each source image, and a single DOM instance of every control.
- [ ] Run focused tests and record expected failures.
- [ ] Add intrinsic-aspect-ratio stages with percentage-positioned controls on desktop and the same controls in normal flow below 900px.
- [ ] Apply this exact one-use image map: directory=`heroBigTopAlt`; prologue=`heroBigTop`; families=`actFunhouse`; capability inventory=`actHiddenCapabilities`; authorization chain=`actHighWire`; Evidence/Recognition/Consequence=`actThreeRings`; operator responsibilities=`actControlPlane`; output pile=`actPaperwork`; Evidence Room frontstage/backstage=`actBackstage`; finale scoreboard=`actPrizeBooth`.
- [ ] Keep branch cleanup and provider replay as normal DOM panels without scene imagery.
- [ ] Bind six family controls, six capability layers, six authorization stages, three thesis steps, eight responsibilities, paperwork reveal, frontstage/backstage evidence toggle, and finale return link to catalog records/claims.
- [ ] Keep branch cleanup, audit, eight-words, export, handoff/correction, provider replay, and harness interactions as normal DOM mechanics without additional supplied scene imagery.
- [ ] Move the full release scoreboard into the prize-booth finale and leave only a compact generated-status link in the global footer.
- [ ] Run focused tests, unit tests, typecheck, lint, and builds.
- [ ] Commit with `feat(app): activate accessible circus scene frameworks`.
