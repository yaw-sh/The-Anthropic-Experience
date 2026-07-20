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

**Locked implementation details:**
- Reuse `publicCatalog.surfaces` in canonical order; never hard-code a surface count or renumber filtered results.
- The URL `surface` value is the selection source of truth. Preserve unrelated query parameters; make `family` URL-addressable and retain the other filters through the shared state hook.
- When a nonempty filter result hides the selection, replace the URL with the first visible surface. With zero results, retain the prior URL value, render a null/empty passport, and disable Spin.
- Port only the rotation equation from `design/reference/wheel-v2/`; do not copy its hard-coded records, remote font, dependencies, or 4.2-second timing. Normal spin must finish in about 1.2 seconds and never exceed 1.5 seconds.
- Use one ticket-control DOM collection at every viewport. At desktop, position four controls on each side of the artwork and center the wheel at approximately `50% 49%` with a `25.5%` diameter. Below 900px, hide only the circular face and restyle the same controls as a horizontally scrolling selector.
- Use roving radio semantics for tickets: exactly one tab stop, arrow-key wrapping, Home/End, Enter/Space selection, canonical accessible labels, and focused-item scroll-into-view.
- `heroBigTopAlt` is the homepage's first image and directory stage; `heroBigTop` becomes the lazy static prologue immediately below it. Keep directory artwork outside the legacy `.scene__image` count until Task 4 replaces the canonical scene-image mapping.
- Eliminate the independent Scene 2 selector state: either bind it to the shared URL state or make it a link back to the shared directory.

- [ ] Write failing tests for one/eight/filtered wheel math, URL/ticket/passport synchronization, hidden-selection fallback, zero results, canonical ordinals, spin locking, reduced motion, live announcements, and roving keyboard behavior.
- [ ] Run focused tests and record expected failures.
- [ ] Port wheel-v2 rotation mathematics as pure TypeScript and render eight catalog-driven segments.
- [ ] Make `heroBigTopAlt` the first homepage image and place the wheel in its circular frame, four ticket buttons on each side, and the readable passport outside the raster.
- [ ] Make homepage and `/surfaces` reuse the same directory state/components; `/surfaces` adds all ten dimension filters.
- [ ] Move `heroBigTop` to a static prologue framework below the directory.
- [ ] Add under-900px horizontal selector fallback using the same controls and no duplicate tab stops.
- [ ] Add focus treatment for input/select/radio controls and keep the readable passport, claims, dimensions, source, and receipt outside the raster.
- [ ] Run focused tests, unit tests, typecheck, lint, and build.
- [ ] Commit with `feat(app): build synchronized surface wheel and directory`.
