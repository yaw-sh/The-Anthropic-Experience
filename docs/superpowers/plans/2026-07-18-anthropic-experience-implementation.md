# THE ANTHROPIC EXPERIENCE Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a deployable 35-surface circus directory, then add one complete evidence-backed Cowork Web case, responsive imagery, backstage receipts, and production hardening in value order.

**Architecture:** Refactor the existing small Vite/React wheel prototype into a static, data-driven HashRouter application. Structured modules define surfaces, evidence, claims, assets, and acts; focused React components render the directory and case; pure utilities handle wheel geometry, filtering, and content validation. No backend or model generation is used.

**Tech Stack:** React 18, Vite 4, React Router DOM 6, plain CSS, Vitest 0.34.6, React Testing Library 14.3.1, optional Sharp in Phase 3.

## Global Constraints

- Use the existing small wheel prototype as the sole code base.
- Do not migrate frameworks or add a backend, database, state library, component framework, animation framework, or CMS.
- Use `HashRouter` for static-host compatibility.
- Keep the 35-surface directory as the homepage and primary navigation.
- The wheel shows two-digit numbers, not full rotated surface names.
- Direct directory selection is always available.
- Cowork Web is the only `full-case` entry in the first release.
- Every substantive claim has an evidence classification and source.
- Unknown is rendered as unknown, never as a capability denial.
- Generated images never carry required wording or evidence.
- The app must work before any generated images arrive.
- Respect keyboard operation and `prefers-reduced-motion`.
- Complete and verify one phase, then stop. Do not begin the next phase without user instruction.

---

# Phase 1 — Working Big Top Directory

**Branch:** `phase/01-working-directory`

**Phase outcome:** A tested, deployable 35-surface wheel and directory with search, family filters, direct selection, random selection, and surface passport routes.

### Task 1: Establish the tested baseline

**Files:**
- Modify: `package.json`
- Modify: `vite.config.js`
- Create: `src/test/setup.js`
- Create: `src/App.test.jsx`
- Modify: `docs/BUILD-STATUS.md`

**Interfaces:**
- Produces: `npm run test:run`, jsdom test environment, jest-dom matchers.

- [ ] **Step 1: Create the phase branch and verify the existing app**

```bash
git checkout -b phase/01-working-directory
npm install
npm run build
```

Expected: Vite produces `dist/index.html` and exits with status 0.

- [ ] **Step 2: Install the compatible test stack**

```bash
npm install --save-dev vitest@0.34.6 @testing-library/react@14.3.1 @testing-library/jest-dom@6.4.2 @testing-library/user-event@14.5.2 jsdom@24.0.0
```

Expected: `package-lock.json` is created or updated.

- [ ] **Step 3: Add test scripts to `package.json`**

Add these scripts while preserving the existing scripts:

```json
{
  "scripts": {
    "dev": "vite --host 0.0.0.0",
    "build": "vite build",
    "preview": "vite preview --host 0.0.0.0",
    "test": "vitest",
    "test:run": "vitest run"
  }
}
```

- [ ] **Step 4: Configure Vitest in `vite.config.js`**

Replace the file with:

```js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  // @vitejs/plugin-react 4.0.0 injects the browser refresh preamble during
  // Vitest transforms. Tests do not load index.html, so disable the plugin
  // under Vitest and let Vite's esbuild transform JSX automatically.
  plugins: process.env.VITEST ? [] : [react()],
  esbuild: {
    jsx: "automatic",
  },
  test: {
    environment: "jsdom",
    setupFiles: "./src/test/setup.js",
    css: true,
  },
});
```

- [ ] **Step 5: Create `src/test/setup.js`**

```js
import "@testing-library/jest-dom/vitest";
```

- [ ] **Step 6: Write the baseline test in `src/App.test.jsx`**

```jsx
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import App from "./App.jsx";


describe("prototype baseline", () => {
  it("renders the circus selector and spin control", () => {
    render(<App />);

    expect(
      screen.getByRole("heading", { name: /the claude surface selector/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /spin the wheel/i }),
    ).toBeInTheDocument();
  });
});
```

- [ ] **Step 7: Run the test**

```bash
npm run test:run
```

Expected: one test passes.

- [ ] **Step 8: Update `docs/BUILD-STATUS.md` and commit**

Record the branch, test result, and build result, then run:

```bash
git add package.json package-lock.json vite.config.js src/test/setup.js src/App.test.jsx docs/BUILD-STATUS.md
git commit -m "test: establish verified React baseline"
```

### Task 2: Create the 35-surface registry

**Files:**
- Create: `src/data/surfaceFamilies.js`
- Create: `src/data/surfaces.js`
- Create: `src/data/surfaces.test.js`
- Modify: `docs/BUILD-STATUS.md`

**Interfaces:**
- Produces: `SURFACE_FAMILIES`, `SURFACES`, `getSurfaceById(id)`, `getSurfacesByFamily(familyId)`.

- [ ] **Step 1: Write `src/data/surfaces.test.js`**

```js
import { describe, expect, it } from "vitest";
import { SURFACES, getSurfaceById, getSurfacesByFamily } from "./surfaces.js";


describe("surface registry", () => {
  it("contains exactly 35 uniquely numbered and uniquely identified surfaces", () => {
    expect(SURFACES).toHaveLength(35);
    expect(new Set(SURFACES.map((surface) => surface.id)).size).toBe(35);
    expect(new Set(SURFACES.map((surface) => surface.number)).size).toBe(35);
    expect(SURFACES.map((surface) => surface.number)).toEqual(
      Array.from({ length: 35 }, (_, index) => index + 1),
    );
  });

  it("marks only Cowork Web as the initial full case", () => {
    const fullCases = SURFACES.filter(
      (surface) => surface.evidenceLevel === "full-case",
    );
    expect(fullCases.map((surface) => surface.id)).toEqual(["cowork-web"]);
    expect(getSurfaceById("cowork-web")?.experienceId).toBe(
      "cowork-web-github-2026-07-18",
    );
  });

  it("contains the documented family totals", () => {
    expect(getSurfacesByFamily("code")).toHaveLength(14);
    expect(getSurfacesByFamily("chat")).toHaveLength(3);
    expect(getSurfacesByFamily("projects")).toHaveLength(2);
    expect(getSurfacesByFamily("cowork")).toHaveLength(4);
    expect(getSurfacesByFamily("extensions")).toHaveLength(5);
    expect(getSurfacesByFamily("developer")).toHaveLength(4);
    expect(getSurfacesByFamily("cloud")).toHaveLength(3);
  });
});
```

- [ ] **Step 2: Run the focused test and confirm failure**

```bash
npx vitest run src/data/surfaces.test.js
```

Expected: fail because the modules do not exist.

- [ ] **Step 3: Create `src/data/surfaceFamilies.js`**

```js
export const SURFACE_FAMILIES = Object.freeze([
  { id: "code", name: "Code", shortLabel: "CODE", color: "var(--family-code)" },
  { id: "chat", name: "Chat", shortLabel: "CHAT", color: "var(--family-chat)" },
  { id: "projects", name: "Projects", shortLabel: "PROJECTS", color: "var(--family-projects)" },
  { id: "cowork", name: "Cowork", shortLabel: "COWORK", color: "var(--family-cowork)" },
  { id: "extensions", name: "Extensions", shortLabel: "EXT", color: "var(--family-extensions)" },
  { id: "developer", name: "Developer", shortLabel: "DEV", color: "var(--family-developer)" },
  { id: "cloud", name: "Cloud", shortLabel: "CLOUD", color: "var(--family-cloud)" },
]);

export function getSurfaceFamily(familyId) {
  return SURFACE_FAMILIES.find((family) => family.id === familyId) ?? null;
}
```

- [ ] **Step 4: Create `src/data/surfaces.js`**

```js
const CENSUS_DATE = "2026-07-18";

const entries = [
  ["code-cli", "Claude Code", "CLI", "code"],
  ["code-desktop", "Claude Code", "Desktop", "code"],
  ["code-vscode", "Claude Code", "VS Code", "code"],
  ["code-jetbrains", "Claude Code", "JetBrains", "code"],
  ["code-web", "Claude Code", "Web", "code"],
  ["code-mobile", "Claude Code", "Mobile", "code"],
  ["code-remote-control", "Claude Code", "Remote Control", "code"],
  ["code-dispatch", "Claude Code", "Dispatch", "code"],
  ["code-channels", "Claude Code", "Channels", "code"],
  ["code-routines", "Claude Code", "Scheduled Tasks / Routines", "code"],
  ["code-github-actions", "Claude Code", "GitHub Actions", "code"],
  ["code-gitlab-cicd", "Claude Code", "GitLab CI/CD", "code"],
  ["code-review", "Claude Code", "Code Review", "code"],
  ["code-slack", "Claude Code", "Slack", "code"],
  ["chat-web", "Claude Chat", "Web", "chat"],
  ["chat-desktop", "Claude Chat", "Desktop", "chat"],
  ["chat-mobile", "Claude Chat", "Mobile", "chat"],
  ["projects-web", "Projects", "Web", "projects"],
  ["projects-desktop", "Projects", "Desktop / Local", "projects"],
  ["cowork-web", "Claude Cowork", "Web", "cowork"],
  ["cowork-desktop", "Claude Cowork", "Desktop", "cowork"],
  ["cowork-mobile", "Claude Cowork", "Mobile", "cowork"],
  ["cowork-third-party", "Claude Cowork", "Third-party environments", "cowork"],
  ["chrome", "Claude in Chrome", "Browser extension", "extensions"],
  ["excel", "Claude in Excel", "Add-in", "extensions"],
  ["word", "Claude in Word", "Add-in", "extensions"],
  ["powerpoint", "Claude in PowerPoint", "Add-in", "extensions"],
  ["design", "Claude Design", "Design surface", "extensions"],
  ["api", "Claude API", "Developer API", "developer"],
  ["workbench", "Workbench", "Developer console", "developer"],
  ["agent-sdk", "Agent SDK", "Developer framework", "developer"],
  ["managed-agents", "Managed Agents", "Managed infrastructure", "developer"],
  ["bedrock", "Claude on Amazon Bedrock", "Cloud platform", "cloud"],
  ["vertex-ai", "Claude on Vertex AI", "Cloud platform", "cloud"],
  ["foundry", "Claude on Microsoft Foundry", "Cloud platform", "cloud"],
];

export const SURFACES = Object.freeze(
  entries.map(([id, name, detail, familyId], index) => ({
    id,
    number: index + 1,
    name,
    detail,
    familyId,
    censusDate: CENSUS_DATE,
    evidenceLevel: id === "cowork-web" ? "full-case" : "directory-only",
    experienceId:
      id === "cowork-web" ? "cowork-web-github-2026-07-18" : null,
  })),
);

export function getSurfaceById(id) {
  return SURFACES.find((surface) => surface.id === id) ?? null;
}

export function getSurfacesByFamily(familyId) {
  return SURFACES.filter((surface) => surface.familyId === familyId);
}
```

- [ ] **Step 5: Run the focused test**

```bash
npx vitest run src/data/surfaces.test.js
```

Expected: three tests pass.

- [ ] **Step 6: Commit**

```bash
git add src/data/surfaceFamilies.js src/data/surfaces.js src/data/surfaces.test.js docs/BUILD-STATUS.md
git commit -m "feat: add 35-surface census registry"
```

### Task 3: Extract and test wheel geometry

**Files:**
- Create: `src/shared/utils/wheel.js`
- Create: `src/shared/utils/wheel.test.js`
- Modify: `docs/BUILD-STATUS.md`

**Interfaces:**
- Produces: `getSegmentAngle(count)`, `getSpinTargetRotation(currentRotation, winnerIndex, count, turns)`, `getWedgePath(index, count)`, `getLabelPoint(index, count)`.

- [ ] **Step 1: Write `src/shared/utils/wheel.test.js`**

```js
import { describe, expect, it } from "vitest";
import {
  getLabelPoint,
  getSegmentAngle,
  getSpinTargetRotation,
  getWedgePath,
} from "./wheel.js";


describe("wheel geometry", () => {
  it("divides 35 surfaces evenly", () => {
    expect(getSegmentAngle(35)).toBeCloseTo(360 / 35, 8);
  });

  it("adds full turns and aligns the selected segment center to the pointer", () => {
    const rotation = getSpinTargetRotation(0, 20, 35, 5);
    expect(rotation).toBeGreaterThanOrEqual(5 * 360);
    const segment = getSegmentAngle(35);
    const finalAngle = (rotation + 20 * segment + segment / 2) % 360;
    expect(finalAngle).toBeCloseTo(0, 8);
  });

  it("returns valid SVG geometry", () => {
    expect(getWedgePath(0, 35)).toMatch(/^M 50 50 L /);
    const label = getLabelPoint(0, 35);
    expect(label.x).toBeTypeOf("number");
    expect(label.y).toBeTypeOf("number");
  });
});
```

- [ ] **Step 2: Confirm the test fails**

```bash
npx vitest run src/shared/utils/wheel.test.js
```

Expected: module-not-found failure.

- [ ] **Step 3: Create `src/shared/utils/wheel.js`**

```js
export function getSegmentAngle(count) {
  if (!Number.isInteger(count) || count < 1) {
    throw new RangeError("count must be a positive integer");
  }
  return 360 / count;
}

function polarPoint(radius, angleDegrees) {
  const angle = ((angleDegrees - 90) * Math.PI) / 180;
  return {
    x: 50 + radius * Math.cos(angle),
    y: 50 + radius * Math.sin(angle),
  };
}

export function getWedgePath(index, count, radius = 49) {
  const segment = getSegmentAngle(count);
  const start = polarPoint(radius, index * segment);
  const end = polarPoint(radius, (index + 1) * segment);
  const largeArc = segment > 180 ? 1 : 0;

  return [
    "M 50 50",
    `L ${start.x.toFixed(4)} ${start.y.toFixed(4)}`,
    `A ${radius} ${radius} 0 ${largeArc} 1 ${end.x.toFixed(4)} ${end.y.toFixed(4)}`,
    "Z",
  ].join(" ");
}

export function getLabelPoint(index, count, radius = 37) {
  const segment = getSegmentAngle(count);
  return polarPoint(radius, index * segment + segment / 2);
}

export function getSpinTargetRotation(
  currentRotation,
  winnerIndex,
  count,
  turns = 5,
) {
  const segment = getSegmentAngle(count);
  const currentNormalized = ((currentRotation % 360) + 360) % 360;
  const landingAngle = (360 - (winnerIndex * segment + segment / 2)) % 360;
  const delta = (landingAngle - currentNormalized + 360) % 360;
  return currentRotation + turns * 360 + delta;
}
```

- [ ] **Step 4: Run tests and commit**

```bash
npx vitest run src/shared/utils/wheel.test.js
git add src/shared/utils/wheel.js src/shared/utils/wheel.test.js docs/BUILD-STATUS.md
git commit -m "feat: add tested 35-segment wheel geometry"
```

### Task 4: Build the accessible numbered wheel

**Files:**
- Create: `src/features/directory/SurfaceWheel.jsx`
- Create: `src/features/directory/SurfaceWheel.test.jsx`
- Create: `src/styles/tokens.css`
- Create: `src/styles/components.css`
- Modify: `src/main.jsx`
- Modify: `docs/BUILD-STATUS.md`

**Interfaces:**
- Consumes: `SURFACES`, `getSurfaceFamily`, wheel utilities.
- Produces: `<SurfaceWheel surfaces selectedId onSelect onSpinStateChange />`.

- [ ] **Step 1: Write the component test**

```jsx
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { SURFACES } from "../../data/surfaces.js";
import { SurfaceWheel } from "./SurfaceWheel.jsx";


describe("SurfaceWheel", () => {
  it("renders 35 named segment controls and supports direct selection", async () => {
    const user = userEvent.setup();
    const onSelect = vi.fn();

    render(
      <SurfaceWheel
        surfaces={SURFACES}
        selectedId={null}
        onSelect={onSelect}
        onSpinStateChange={() => {}}
      />,
    );

    expect(screen.getAllByRole("button", { name: /surface \d+/i })).toHaveLength(35);
    await user.click(
      screen.getByRole("button", { name: /surface 20: claude cowork, web/i }),
    );
    expect(onSelect).toHaveBeenCalledWith("cowork-web", { source: "direct" });
  });
});
```

- [ ] **Step 2: Confirm failure**

```bash
npx vitest run src/features/directory/SurfaceWheel.test.jsx
```

- [ ] **Step 3: Create `src/styles/tokens.css`**

```css
:root {
  --canvas: #27172e;
  --canvas-deep: #160b1d;
  --velvet: #9e243e;
  --velvet-dark: #561428;
  --paper: #f7e8bd;
  --paper-light: #fff1c9;
  --brass: #e3a941;
  --brass-light: #f8c64f;
  --ink: #3e2031;
  --teal: #2f6c67;
  --family-code: #9e243e;
  --family-chat: #2f6c67;
  --family-projects: #d88b43;
  --family-cowork: #70436f;
  --family-extensions: #b24e3c;
  --family-developer: #566a36;
  --family-cloud: #3b5870;
  --focus-ring: #fff3a9;
  --shadow-hard: 0 7px 0 var(--canvas-deep);
  --font-display: Rye, Georgia, serif;
  --font-interface: "Space Grotesk", system-ui, sans-serif;
  --font-evidence: "DM Mono", ui-monospace, monospace;
}
```

- [ ] **Step 4: Create `src/features/directory/SurfaceWheel.jsx`**

```jsx
import { useEffect, useMemo, useRef, useState } from "react";
import { getSurfaceFamily } from "../../data/surfaceFamilies.js";
import {
  getLabelPoint,
  getSpinTargetRotation,
  getWedgePath,
} from "../../shared/utils/wheel.js";

export function SurfaceWheel({
  surfaces,
  selectedId,
  onSelect,
  onSpinStateChange,
}) {
  const [rotation, setRotation] = useState(0);
  const [spinning, setSpinning] = useState(false);
  const timeoutRef = useRef(null);
  const selectedIndex = surfaces.findIndex((surface) => surface.id === selectedId);
  const reducedMotion = useMemo(() => {
    if (typeof window.matchMedia !== "function") return false;
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }, []);

  useEffect(() => () => window.clearTimeout(timeoutRef.current), []);

  function choose(surfaceId, source = "direct") {
    if (!spinning) onSelect(surfaceId, { source });
  }

  function spin() {
    if (spinning) return;
    const winnerIndex = Math.floor(Math.random() * surfaces.length);
    const winner = surfaces[winnerIndex];

    if (reducedMotion) {
      choose(winner.id, "spin");
      return;
    }

    setSpinning(true);
    onSpinStateChange(true);
    setRotation((current) =>
      getSpinTargetRotation(current, winnerIndex, surfaces.length, 5),
    );
    window.clearTimeout(timeoutRef.current);
    timeoutRef.current = window.setTimeout(() => {
      setSpinning(false);
      onSpinStateChange(false);
      onSelect(winner.id, { source: "spin" });
    }, 4200);
  }

  return (
    <section className="wheel-stage" aria-labelledby="wheel-title">
      <h2 id="wheel-title" className="sr-only">Surface selection wheel</h2>
      <div className="pointer" aria-hidden="true"><span /></div>
      <div className="wheel-frame">
        <svg
          className="surface-wheel"
          viewBox="0 0 100 100"
          aria-label="Thirty-five Claude surface choices"
        >
          <g
            className={spinning ? "wheel-rotor is-spinning" : "wheel-rotor"}
            style={{ transform: `rotate(${rotation}deg)` }}
          >
            {surfaces.map((surface, index) => {
              const point = getLabelPoint(index, surfaces.length);
              const family = getSurfaceFamily(surface.familyId);
              const selected = index === selectedIndex;
              return (
                <g key={surface.id}>
                  <path
                    d={getWedgePath(index, surfaces.length)}
                    fill={family?.color ?? "var(--velvet)"}
                    className={selected ? "wheel-segment is-selected" : "wheel-segment"}
                  />
                  <foreignObject x={point.x - 4} y={point.y - 4} width="8" height="8">
                    <button
                      type="button"
                      className="wheel-number"
                      aria-label={`Surface ${surface.number}: ${surface.name}, ${surface.detail}`}
                      onClick={() => choose(surface.id)}
                    >
                      {String(surface.number).padStart(2, "0")}
                    </button>
                  </foreignObject>
                </g>
              );
            })}
          </g>
          <circle className="wheel-hub" cx="50" cy="50" r="13" />
          <text className="wheel-hub-label" x="50" y="51">SPIN</text>
        </svg>
      </div>
      <button type="button" className="spin-button" onClick={spin} disabled={spinning}>
        {spinning ? "Hold tight..." : "Let product architecture decide"}
      </button>
    </section>
  );
}
```

- [ ] **Step 5: Add exact wheel styles to `src/styles/components.css`**

```css
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

.wheel-stage {
  position: relative;
  display: grid;
  justify-items: center;
  gap: 1rem;
}

.wheel-frame {
  width: min(78vw, 540px);
  aspect-ratio: 1;
  padding: 14px;
  border: 4px solid var(--canvas-deep);
  border-radius: 50%;
  background: var(--brass);
  box-shadow: 0 0 0 5px var(--velvet), 0 0 0 9px var(--canvas-deep), 0 18px 0 var(--canvas-deep);
}

.surface-wheel {
  width: 100%;
  height: 100%;
  overflow: visible;
  border-radius: 50%;
  background: var(--paper);
}

.wheel-rotor {
  transform-origin: 50% 50%;
  transition: transform 4.2s cubic-bezier(.12, .76, .08, 1);
}

.wheel-segment {
  stroke: var(--paper-light);
  stroke-width: .32;
  opacity: .96;
}

.wheel-segment.is-selected {
  stroke: var(--focus-ring);
  stroke-width: 1.15;
  filter: brightness(1.18);
}

.wheel-number {
  display: grid;
  width: 100%;
  height: 100%;
  place-items: center;
  border: 0;
  border-radius: 50%;
  color: var(--paper-light);
  background: rgb(22 11 29 / 72%);
  font: 700 2.25px/1 var(--font-evidence);
  cursor: pointer;
}

.wheel-number:focus-visible {
  outline: .7px solid var(--focus-ring);
  outline-offset: .5px;
}

.wheel-hub {
  fill: var(--brass-light);
  stroke: var(--paper-light);
  stroke-width: 1.4;
}

.wheel-hub-label {
  fill: var(--velvet);
  font: 400 4px var(--font-display);
  text-anchor: middle;
  dominant-baseline: middle;
  pointer-events: none;
}

@media (prefers-reduced-motion: reduce) {
  .wheel-rotor {
    transition-duration: 0.01ms;
  }
}
```

- [ ] **Step 6: Import the new styles from `src/main.jsx`**

Replace CSS imports with:

```jsx
import "./styles/tokens.css";
import "./index.css";
import "./styles/components.css";
```

- [ ] **Step 7: Run the focused test and commit**

```bash
npx vitest run src/features/directory/SurfaceWheel.test.jsx
git add src/features/directory/SurfaceWheel.jsx src/features/directory/SurfaceWheel.test.jsx src/styles/tokens.css src/styles/components.css src/main.jsx docs/BUILD-STATUS.md
git commit -m "feat: replace wheel labels with accessible numbered segments"
```

### Task 5: Build search, family filters, and ticket directory

**Files:**
- Create: `src/shared/utils/filterSurfaces.js`
- Create: `src/shared/utils/filterSurfaces.test.js`
- Create: `src/features/directory/SurfaceTicket.jsx`
- Create: `src/features/directory/SurfaceDirectory.jsx`
- Create: `src/features/directory/SurfaceDirectory.test.jsx`
- Modify: `src/styles/components.css`
- Modify: `docs/BUILD-STATUS.md`

**Interfaces:**
- Produces: `filterSurfaces(surfaces, { query, familyId })`, `<SurfaceDirectory surfaces selectedId onSelect />`.

- [ ] **Step 1: Write the filter utility test**

```js
import { describe, expect, it } from "vitest";
import { SURFACES } from "../../data/surfaces.js";
import { filterSurfaces } from "./filterSurfaces.js";


describe("filterSurfaces", () => {
  it("filters by family and case-insensitive text", () => {
    expect(filterSurfaces(SURFACES, { familyId: "cowork", query: "web" }))
      .toEqual([expect.objectContaining({ id: "cowork-web" })]);
    expect(filterSurfaces(SURFACES, { familyId: "all", query: "github" }))
      .toEqual([expect.objectContaining({ id: "code-github-actions" })]);
  });
});
```

- [ ] **Step 2: Create `src/shared/utils/filterSurfaces.js`**

```js
export function filterSurfaces(surfaces, { query = "", familyId = "all" }) {
  const normalizedQuery = query.trim().toLocaleLowerCase();
  return surfaces.filter((surface) => {
    const matchesFamily = familyId === "all" || surface.familyId === familyId;
    const haystack = `${surface.name} ${surface.detail} ${surface.familyId}`.toLocaleLowerCase();
    return matchesFamily && (!normalizedQuery || haystack.includes(normalizedQuery));
  });
}
```

- [ ] **Step 3: Write `SurfaceDirectory.test.jsx`**

```jsx
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { SURFACES } from "../../data/surfaces.js";
import { SurfaceDirectory } from "./SurfaceDirectory.jsx";


describe("SurfaceDirectory", () => {
  it("shows all entries, filters them, and supports direct selection", async () => {
    const user = userEvent.setup();
    const onSelect = vi.fn();
    render(<SurfaceDirectory surfaces={SURFACES} selectedId={null} onSelect={onSelect} />);

    expect(screen.getAllByRole("button", { name: /open surface/i })).toHaveLength(35);
    await user.click(screen.getByRole("button", { name: "Cowork" }));
    expect(screen.getAllByRole("button", { name: /open surface/i })).toHaveLength(4);
    await user.type(screen.getByRole("searchbox"), "web");
    expect(screen.getAllByRole("button", { name: /open surface/i })).toHaveLength(1);
    await user.click(screen.getByRole("button", { name: /open surface 20/i }));
    expect(onSelect).toHaveBeenCalledWith("cowork-web");
  });
});
```

- [ ] **Step 4: Create `SurfaceTicket.jsx`**

```jsx
import { getSurfaceFamily } from "../../data/surfaceFamilies.js";

export function SurfaceTicket({ surface, selected, onSelect }) {
  const family = getSurfaceFamily(surface.familyId);
  return (
    <article className={selected ? "surface-ticket is-selected" : "surface-ticket"}>
      <span className="surface-ticket__number">
        No. {String(surface.number).padStart(2, "0")}
      </span>
      <h3>{surface.name}</h3>
      <p>{surface.detail}</p>
      <dl>
        <div><dt>Family</dt><dd>{family?.name}</dd></div>
        <div><dt>Evidence</dt><dd>{surface.evidenceLevel}</dd></div>
      </dl>
      <button
        type="button"
        onClick={() => onSelect(surface.id)}
        aria-label={`Open surface ${surface.number}: ${surface.name}, ${surface.detail}`}
      >
        Choose this Claude
      </button>
    </article>
  );
}
```

- [ ] **Step 5: Create `SurfaceDirectory.jsx`**

```jsx
import { useMemo, useState } from "react";
import { SURFACE_FAMILIES } from "../../data/surfaceFamilies.js";
import { filterSurfaces } from "../../shared/utils/filterSurfaces.js";
import { SurfaceTicket } from "./SurfaceTicket.jsx";

export function SurfaceDirectory({ surfaces, selectedId, onSelect }) {
  const [query, setQuery] = useState("");
  const [familyId, setFamilyId] = useState("all");
  const visibleSurfaces = useMemo(
    () => filterSurfaces(surfaces, { query, familyId }),
    [surfaces, query, familyId],
  );

  return (
    <section className="surface-directory" aria-labelledby="directory-title">
      <header>
        <p className="ticket-label">THE COMPLETE WORKING CENSUS</p>
        <h2 id="directory-title">Thirty-five acts</h2>
        <label>
          <span>Search surfaces</span>
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search by name, platform, or family"
          />
        </label>
      </header>
      <div className="family-filters" aria-label="Filter by product family">
        <button type="button" aria-pressed={familyId === "all"} onClick={() => setFamilyId("all")}>All</button>
        {SURFACE_FAMILIES.map((family) => (
          <button
            type="button"
            key={family.id}
            aria-pressed={familyId === family.id}
            onClick={() => setFamilyId(family.id)}
          >
            {family.name}
          </button>
        ))}
      </div>
      <p aria-live="polite">Showing {visibleSurfaces.length} of {surfaces.length} surfaces.</p>
      <div className="surface-ticket-grid">
        {visibleSurfaces.map((surface) => (
          <SurfaceTicket
            key={surface.id}
            surface={surface}
            selected={surface.id === selectedId}
            onSelect={onSelect}
          />
        ))}
      </div>
    </section>
  );
}
```

- [ ] **Step 6: Add directory styles**

Append to `src/styles/components.css`:

```css
.surface-directory {
  padding: clamp(1rem, 3vw, 2rem);
  color: var(--ink);
  background: rgb(247 232 189 / 96%);
  border: 4px solid var(--canvas-deep);
  outline: 3px solid var(--brass);
  box-shadow: var(--shadow-hard);
}

.surface-directory header {
  display: grid;
  gap: .75rem;
}

.surface-directory input {
  width: 100%;
  margin-top: .35rem;
  padding: .8rem 1rem;
  border: 2px solid var(--velvet);
  background: var(--paper-light);
  color: var(--ink);
  font: 600 1rem var(--font-interface);
}

.family-filters {
  display: flex;
  flex-wrap: wrap;
  gap: .5rem;
  margin: 1rem 0;
}

.family-filters button,
.surface-ticket button {
  border: 2px solid var(--velvet);
  background: var(--paper-light);
  color: var(--velvet-dark);
  font-weight: 700;
  cursor: pointer;
}

.family-filters button[aria-pressed="true"] {
  background: var(--velvet);
  color: var(--paper-light);
}

.surface-ticket-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(210px, 1fr));
  gap: 1rem;
}

.surface-ticket {
  padding: 1rem;
  border: 2px solid var(--velvet-dark);
  background: var(--paper-light);
  box-shadow: 4px 4px 0 var(--brass);
}

.surface-ticket.is-selected {
  outline: 4px solid var(--focus-ring);
}

.surface-ticket__number,
.ticket-label {
  font: 700 .75rem var(--font-evidence);
  letter-spacing: .1em;
  color: var(--velvet);
}

.surface-ticket h3 {
  margin: .55rem 0 .2rem;
  font: 400 1.25rem var(--font-display);
  color: var(--velvet-dark);
}

.surface-ticket dl div {
  display: flex;
  justify-content: space-between;
  gap: .75rem;
  font-size: .8rem;
}

.surface-ticket button {
  width: 100%;
  margin-top: .75rem;
  padding: .65rem;
}
```

- [ ] **Step 7: Run tests and commit**

```bash
npx vitest run src/shared/utils/filterSurfaces.test.js src/features/directory/SurfaceDirectory.test.jsx
git add src/shared/utils/filterSurfaces.js src/shared/utils/filterSurfaces.test.js src/features/directory/SurfaceTicket.jsx src/features/directory/SurfaceDirectory.jsx src/features/directory/SurfaceDirectory.test.jsx src/styles/components.css docs/BUILD-STATUS.md
git commit -m "feat: add searchable surface ticket directory"
```

### Task 6: Add static routes and surface passports

**Files:**
- Create: `src/app/AppRouter.jsx`
- Create: `src/features/directory/BigTopDirectory.jsx`
- Create: `src/features/surface/SurfacePassport.jsx`
- Create: `src/features/surface/SurfacePage.jsx`
- Create: `src/features/surface/SurfacePage.test.jsx`
- Replace: `src/App.jsx`
- Modify: `src/App.test.jsx`
- Modify: `src/styles/components.css`
- Modify: `docs/BUILD-STATUS.md`

**Interfaces:**
- Produces routes `/#/` and `/#/surface/:surfaceId`.

- [ ] **Step 1: Write the route test**

```jsx
import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { describe, expect, it } from "vitest";
import { SurfacePage } from "./SurfacePage.jsx";


describe("SurfacePage", () => {
  it("shows the full-case Cowork passport", () => {
    render(
      <MemoryRouter initialEntries={["/surface/cowork-web"]}>
        <Routes>
          <Route path="/surface/:surfaceId" element={<SurfacePage />} />
        </Routes>
      </MemoryRouter>,
    );
    expect(screen.getByRole("heading", { name: /claude cowork/i })).toBeInTheDocument();
    expect(screen.getByText(/full documented experience/i)).toBeInTheDocument();
  });

  it("uses an honest directory-only state", () => {
    render(
      <MemoryRouter initialEntries={["/surface/chat-web"]}>
        <Routes>
          <Route path="/surface/:surfaceId" element={<SurfacePage />} />
        </Routes>
      </MemoryRouter>,
    );
    expect(screen.getByText(/not yet been assembled/i)).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Create `SurfacePassport.jsx`**

```jsx
import { getSurfaceFamily } from "../../data/surfaceFamilies.js";

export function SurfacePassport({ surface }) {
  const family = getSurfaceFamily(surface.familyId);
  return (
    <article className="surface-passport">
      <p className="ticket-label">NOW PERFORMING · SURFACE {String(surface.number).padStart(2, "0")}</p>
      <h1>{surface.name}</h1>
      <p className="surface-passport__detail">{surface.detail}</p>
      <dl>
        <div><dt>Family</dt><dd>{family?.name}</dd></div>
        <div><dt>Working census date</dt><dd>{surface.censusDate}</dd></div>
        <div><dt>Evidence level</dt><dd>{surface.evidenceLevel}</dd></div>
      </dl>
      {surface.evidenceLevel === "full-case" ? (
        <p>This surface has a full documented experience ready to enter.</p>
      ) : (
        <p>This Claude exists in the working census. A sufficiently evidenced experience has not yet been assembled.</p>
      )}
    </article>
  );
}
```

- [ ] **Step 3: Create `SurfacePage.jsx`**

```jsx
import { Link, useParams } from "react-router-dom";
import { getSurfaceById } from "../../data/surfaces.js";
import { SurfacePassport } from "./SurfacePassport.jsx";

export function SurfacePage() {
  const { surfaceId } = useParams();
  const surface = getSurfaceById(surfaceId);

  if (!surface) {
    return (
      <main className="page-shell">
        <h1>Attraction not found</h1>
        <Link to="/">Return to the Big Top directory</Link>
      </main>
    );
  }

  return (
    <main className="page-shell">
      <Link to="/" className="back-link">Change Claude</Link>
      <SurfacePassport surface={surface} />
      {surface.evidenceLevel === "full-case" ? (
        <Link className="primary-ticket" to={`/surface/${surface.id}/experience`}>
          Begin the documented experience
        </Link>
      ) : null}
    </main>
  );
}
```

- [ ] **Step 4: Create `BigTopDirectory.jsx`**

```jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { SURFACES } from "../../data/surfaces.js";
import { SurfaceDirectory } from "./SurfaceDirectory.jsx";
import { SurfaceWheel } from "./SurfaceWheel.jsx";

export function BigTopDirectory() {
  const navigate = useNavigate();
  const [selectedId, setSelectedId] = useState(null);
  const [spinning, setSpinning] = useState(false);

  function selectSurface(surfaceId, { source = "direct" } = {}) {
    setSelectedId(surfaceId);
    if (source === "direct") navigate(`/surface/${surfaceId}`);
  }

  return (
    <main className="circus-page">
      <div className="tent-stripes" aria-hidden="true" />
      <header className="marquee">
        <div className="bulbs" aria-hidden="true" />
        <div className="marquee-inner">
          <p className="eyebrow">Anthropic's most bewildering attraction</p>
          <h1>THE ANTHROPIC EXPERIENCE</h1>
          <p className="tagline">Thirty-five acts. One account. No shared state.</p>
        </div>
        <div className="bulbs" aria-hidden="true" />
      </header>
      <section className="directory-layout">
        <SurfaceWheel
          surfaces={SURFACES}
          selectedId={selectedId}
          onSelect={selectSurface}
          onSpinStateChange={setSpinning}
        />
        <SurfaceDirectory
          surfaces={SURFACES}
          selectedId={selectedId}
          onSelect={(surfaceId) => selectSurface(surfaceId)}
        />
      </section>
      {selectedId && !spinning ? (
        <button className="primary-ticket" onClick={() => navigate(`/surface/${selectedId}`)}>
          Enter selected surface
        </button>
      ) : null}
    </main>
  );
}
```

- [ ] **Step 5: Create `AppRouter.jsx` and replace `App.jsx`**

`src/app/AppRouter.jsx`:

```jsx
import { HashRouter, Route, Routes } from "react-router-dom";
import { BigTopDirectory } from "../features/directory/BigTopDirectory.jsx";
import { SurfacePage } from "../features/surface/SurfacePage.jsx";

export function AppRouter() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<BigTopDirectory />} />
        <Route path="/surface/:surfaceId" element={<SurfacePage />} />
        <Route path="/surface/:surfaceId/experience" element={<SurfacePage />} />
        <Route path="*" element={<BigTopDirectory />} />
      </Routes>
    </HashRouter>
  );
}
```

`src/App.jsx`:

```jsx
import { AppRouter } from "./app/AppRouter.jsx";

export default function App() {
  return <AppRouter />;
}
```

- [ ] **Step 6: Update `src/App.test.jsx` for the new application shell**

Replace the baseline test with:

```jsx
import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it } from "vitest";
import App from "./App.jsx";


describe("THE ANTHROPIC EXPERIENCE", () => {
  beforeEach(() => {
    window.location.hash = "#/";
  });

  it("renders the 35-surface directory and random-selection control", () => {
    render(<App />);

    expect(
      screen.getByRole("heading", { name: /the anthropic experience/i }),
    ).toBeInTheDocument();
    expect(
      screen.getAllByRole("button", { name: /open surface/i }),
    ).toHaveLength(35);
    expect(
      screen.getByRole("button", { name: /let product architecture decide/i }),
    ).toBeInTheDocument();
  });
});
```

- [ ] **Step 7: Add passport and layout styles**

Append to `src/styles/components.css`:

```css
.directory-layout {
  width: min(1280px, 100%);
  margin: 3rem auto;
  display: grid;
  grid-template-columns: minmax(360px, 560px) minmax(0, 1fr);
  gap: 2rem;
  align-items: start;
}

.page-shell {
  min-height: 100vh;
  padding: clamp(1rem, 4vw, 4rem);
  color: var(--paper-light);
  background: var(--canvas);
}

.surface-passport {
  max-width: 780px;
  margin: 2rem auto;
  padding: clamp(1.25rem, 4vw, 3rem);
  color: var(--ink);
  background: var(--paper);
  border: 4px solid var(--canvas-deep);
  outline: 3px solid var(--brass);
  box-shadow: var(--shadow-hard);
}

.surface-passport h1 {
  margin: .6rem 0;
  color: var(--velvet);
  font: 400 clamp(2rem, 6vw, 4.5rem)/.95 var(--font-display);
}

.surface-passport dl div {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  padding: .5rem 0;
  border-bottom: 1px dashed var(--brass);
}

.primary-ticket,
.back-link {
  display: block;
  width: fit-content;
  margin: 1rem auto;
  padding: .8rem 1.2rem;
  border: 2px solid var(--paper-light);
  color: var(--paper-light);
  background: var(--velvet);
  box-shadow: 0 5px 0 var(--canvas-deep);
  text-decoration: none;
  font-weight: 800;
  cursor: pointer;
}

@media (max-width: 900px) {
  .directory-layout {
    grid-template-columns: 1fr;
  }
}
```

- [ ] **Step 8: Run tests and commit**

```bash
npm run test:run
npm run build
git add src/app/AppRouter.jsx src/features/directory/BigTopDirectory.jsx src/features/surface/SurfacePassport.jsx src/features/surface/SurfacePage.jsx src/features/surface/SurfacePage.test.jsx src/App.jsx src/App.test.jsx src/styles/components.css docs/BUILD-STATUS.md
git commit -m "feat: add static surface passport routes"
```

### Task 7: Complete the Phase 1 responsive and accessibility gate

**Files:**
- Modify: `src/index.css`
- Modify: `src/styles/components.css`
- Modify: `src/features/directory/SurfaceWheel.jsx`
- Modify: `src/features/directory/BigTopDirectory.jsx`
- Modify: `app/README.md`
- Modify: `docs/BUILD-STATUS.md`

**Interfaces:**
- No new public interfaces.

- [ ] **Step 1: Remove the old wheel-label rules from `src/index.css`**

Delete obsolete `.wheel`, `.wheel-face`, `.wheel-label`, and `.hub` rules. Preserve the existing marquee, tent, pointer, button, and responsive visual rules that still apply. Ensure the new CSS does not define competing `.wheel-frame` rules twice; keep the Phase 1 definition in `components.css`.

- [ ] **Step 2: Add global focus and reduced-motion rules**

Append to `src/index.css`:

```css
:focus-visible {
  outline: 3px solid var(--focus-ring);
  outline-offset: 3px;
}

@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    scroll-behavior: auto !important;
    animation-duration: .01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: .01ms !important;
  }
}
```

- [ ] **Step 3: Add a live selection summary to `BigTopDirectory.jsx`**

Import `getSurfaceById` and render this immediately after `SurfaceWheel`:

```jsx
const selectedSurface = selectedId ? getSurfaceById(selectedId) : null;
```

```jsx
<p className="selection-summary" aria-live="polite">
  {spinning
    ? "The wheel is selecting a surface."
    : selectedSurface
      ? `Selected surface ${selectedSurface.number}: ${selectedSurface.name}, ${selectedSurface.detail}.`
      : "No surface selected."}
</p>
```

- [ ] **Step 4: Verify keyboard behavior manually**

Run:

```bash
npm run dev
```

Confirm:

1. Tab reaches the 35 numbered wheel controls.
2. Enter or Space selects a segment.
3. Tab reaches search, family filters, tickets, and route controls.
4. Focus is visible.
5. Direct selection does not require spinning.
6. With operating-system reduced motion enabled, random selection does not wait 4.2 seconds.

- [ ] **Step 5: Run the complete Phase 1 verification**

```bash
npm run test:run
npm run build
```

Expected: all tests pass and Vite builds `dist/`.

- [ ] **Step 6: Update the phase receipt and commit**

Set Phase 1 to complete in `docs/BUILD-STATUS.md`, include command results and commit hashes, then run:

```bash
git add src/index.css src/styles/components.css src/features/directory/SurfaceWheel.jsx src/features/directory/BigTopDirectory.jsx app/README.md docs/BUILD-STATUS.md
git commit -m "chore: complete working directory phase"
```

- [ ] **Step 7: Stop**

Do not start Phase 2. Return the required Phase 1 completion receipt from `CLAUDE.md`.

---

# Phase 2 — Complete Cowork Web Experience

**Branch:** `phase/02-cowork-web-case`

**Phase outcome:** One complete eight-act deterministic case rendered from evidence-classified data, using placeholders when images are absent.

### Task 8: Add evidence types and source registry

**Files:**
- Create: `src/data/evidenceTypes.js`
- Create: `src/data/sources.js`
- Create: `src/data/claims.js`
- Create: `src/data/claims.test.js`
- Modify: `docs/BUILD-STATUS.md`

**Interfaces:**
- Produces: `EVIDENCE_TYPES`, `SOURCES`, `CLAIMS`, `getClaim(id)`, `getSource(id)`.

- [ ] **Step 1: Create the evidence-type registry**

```js
export const EVIDENCE_TYPES = Object.freeze({
  receipt: { label: "RECEIPT", description: "Direct operational evidence." },
  transcript: { label: "TRANSCRIPT", description: "Statement in the sanitized reconstructed transcript." },
  "official-source": { label: "OFFICIAL SOURCE", description: "Supported by public product documentation." },
  "user-observed": { label: "USER-OBSERVED", description: "Reported or displayed by the operator; not independently re-queried here." },
  analysis: { label: "ANALYSIS", description: "Interpretation of other evidence." },
  unknown: { label: "UNKNOWN", description: "Not established for this surface." },
  satire: { label: "SATIRE", description: "Deliberate comic extrapolation." },
});
```

- [ ] **Step 2: Create `sources.js`**

```js
export const SOURCES = Object.freeze([
  {
    id: "transcript-2026-07-18",
    title: "THE ANTHROPIC EXPERIENCE — Full Chat Transcript (Sanitized)",
    type: "reconstructed-transcript",
    fidelityNote: "Reconstructed and sanitized by the assistant from session context; not a byte-perfect platform log.",
    localPath: "docs/evidence/chattranscript-2026-07-18-sanitized.md",
  },
]);

export function getSource(id) {
  return SOURCES.find((source) => source.id === id) ?? null;
}
```

- [ ] **Step 3: Create the initial claims in `claims.js`**

Use this exact set; wording may be refined only when it remains supported by the approved transcript:

```js
export const CLAIMS = Object.freeze([
  {
    id: "cowork-marketplace-empty",
    surfaceId: "cowork-web",
    statement: "The general connector marketplace search did not list GitHub.",
    evidenceType: "transcript",
    sourceId: "transcript-2026-07-18",
    sourceLocator: "Turns 3-4 and 40-43",
    limitation: "Marketplace state was observed in this session and may change later.",
  },
  {
    id: "cowork-plugin-config-present",
    surfaceId: "cowork-web",
    statement: "The installed Engineering plugin contained a GitHub MCP configuration on disk.",
    evidenceType: "receipt",
    sourceId: "transcript-2026-07-18",
    sourceLocator: "Turns 20-21",
    limitation: "Declared configuration did not establish a mounted or authenticated connector.",
  },
  {
    id: "cowork-connector-not-mounted",
    surfaceId: "cowork-web",
    statement: "The GitHub connector was not mounted as an active tool in the chat.",
    evidenceType: "receipt",
    sourceId: "transcript-2026-07-18",
    sourceLocator: "Turns 21 and Appendix A",
    limitation: "Specific to the observed Cowork Web session.",
  },
  {
    id: "cowork-credential-plumbing-present",
    surfaceId: "cowork-web",
    statement: "GitHub token placeholders and native credential-injection plumbing were present in the environment.",
    evidenceType: "receipt",
    sourceId: "transcript-2026-07-18",
    sourceLocator: "Turns 24-25",
    limitation: "The builtin injection attempt returned an error and did not itself grant repository access.",
  },
  {
    id: "cowork-account-authenticated",
    surfaceId: "cowork-web",
    statement: "The session eventually authenticated the operator's GitHub account identity.",
    evidenceType: "receipt",
    sourceId: "transcript-2026-07-18",
    sourceLocator: "Turns 46-47",
    limitation: "Account identity did not imply repository authorization.",
  },
  {
    id: "cowork-repository-set-empty",
    surfaceId: "cowork-web",
    statement: "The session exposed no repositories; both private and public probes returned the session-level repository denial.",
    evidenceType: "receipt",
    sourceId: "transcript-2026-07-18",
    sourceLocator: "Turns 46-49",
    limitation: "Specific to the observed Cowork Web session.",
  },
  {
    id: "cowork-add-repo-absent",
    surfaceId: "cowork-web",
    statement: "The prescribed add_repo remedy was not available on the surface emitting the error.",
    evidenceType: "receipt",
    sourceId: "transcript-2026-07-18",
    sourceLocator: "Turn 47 and Appendix A",
    limitation: "Tool availability may differ in later product versions.",
  },
  {
    id: "code-web-concurrent-access",
    surfaceId: "code-web",
    relatedSurfaceIds: ["cowork-web"],
    statement: "The operator reported that Claude Code Web used the same standing GitHub App authorization concurrently.",
    evidenceType: "user-observed",
    sourceId: "transcript-2026-07-18",
    sourceLocator: "Turns 48-49",
    limitation: "Reported by the operator rather than independently queried from Cowork.",
  },
  {
    id: "six-recorded-strikes",
    surfaceId: "cowork-web",
    statement: "The transcript ledger records six distinct incidents during the session.",
    evidenceType: "transcript",
    sourceId: "transcript-2026-07-18",
    sourceLocator: "Session ledger",
    limitation: "The transcript was reconstructed and the incidents require case-by-case reading.",
  },
  {
    id: "thirteen-remedies",
    surfaceId: "cowork-web",
    statement: "The transcript counts thirteen GitHub remedies offered before the original problem remained unresolved.",
    evidenceType: "transcript",
    sourceId: "transcript-2026-07-18",
    sourceLocator: "Turns 38-39 and session ledger",
    limitation: "Count originates in the reconstructed transcript.",
  },
  {
    id: "three-local-commits",
    surfaceId: "cowork-web",
    statement: "The selector repository contained three local commits and no configured remote.",
    evidenceType: "receipt",
    sourceId: "transcript-2026-07-18",
    sourceLocator: "Turns 26-27 and Appendix A",
    limitation: "The delivered archive, not this public site, is the independent offline verification path.",
  },
  {
    id: "original-objective-unresolved",
    surfaceId: "cowork-web",
    statement: "The original Cowork repository-access objective remained unresolved at transcript export.",
    evidenceType: "receipt",
    sourceId: "transcript-2026-07-18",
    sourceLocator: "Appendix A and C",
    limitation: "Describes the final state of that session, not current product behavior.",
  },
  {
    id: "control-plane-inversion-analysis",
    surfaceId: "cowork-web",
    statement: "The operator supplied the stable tool-discovery, verification, continuity, and integrity functions required to advance the session.",
    evidenceType: "analysis",
    sourceId: "transcript-2026-07-18",
    sourceLocator: "Across Turns 11-57",
    limitation: "Analytical synthesis, not a direct tool output.",
  },
]);

export function getClaim(id) {
  return CLAIMS.find((claim) => claim.id === id) ?? null;
}
```

- [ ] **Step 4: Write and run relationship tests**

```js
import { describe, expect, it } from "vitest";
import { getSurfaceById } from "./surfaces.js";
import { EVIDENCE_TYPES } from "./evidenceTypes.js";
import { CLAIMS } from "./claims.js";
import { getSource } from "./sources.js";


describe("claim registry", () => {
  it("references valid surfaces, evidence types, and sources", () => {
    for (const claim of CLAIMS) {
      expect(getSurfaceById(claim.surfaceId)).not.toBeNull();
      expect(EVIDENCE_TYPES[claim.evidenceType]).toBeDefined();
      expect(getSource(claim.sourceId)).not.toBeNull();
      expect(claim.limitation.length).toBeGreaterThan(0);
    }
  });
});
```

Run and commit:

```bash
npx vitest run src/data/claims.test.js
git add src/data/evidenceTypes.js src/data/sources.js src/data/claims.js src/data/claims.test.js docs/BUILD-STATUS.md
git commit -m "feat: add evidence-classified Cowork claim registry"
```

### Task 9: Add the eight-act Cowork experience data

**Files:**
- Create: `src/data/experiences/coworkWeb.js`
- Create: `src/data/experiences/coworkWeb.test.js`
- Modify: `docs/BUILD-STATUS.md`

**Interfaces:**
- Produces: `COWORK_WEB_EXPERIENCE`, `getCoworkAct(actId)`.

- [ ] **Step 1: Create the data test**

```js
import { describe, expect, it } from "vitest";
import { getClaim } from "../claims.js";
import { COWORK_WEB_EXPERIENCE } from "./coworkWeb.js";


describe("Cowork Web experience", () => {
  it("contains eight uniquely identified acts with valid claims", () => {
    expect(COWORK_WEB_EXPERIENCE.acts).toHaveLength(8);
    expect(new Set(COWORK_WEB_EXPERIENCE.acts.map((act) => act.id)).size).toBe(8);
    for (const act of COWORK_WEB_EXPERIENCE.acts) {
      for (const claimId of act.claimIds) expect(getClaim(claimId)).not.toBeNull();
    }
  });
});
```

- [ ] **Step 2: Create `coworkWeb.js`**

```js
export const COWORK_WEB_EXPERIENCE = Object.freeze({
  id: "cowork-web-github-2026-07-18",
  surfaceId: "cowork-web",
  title: "Connected in Settings, Missing in Session",
  subtitle: "A documented Cowork Web case from July 18, 2026",
  acts: [
    {
      id: "now-performing",
      number: 1,
      title: "Now Performing",
      headline: "Claude Cowork — Web",
      summary: "One normal repository-access question opens the documented performance.",
      sceneAssetId: "hero-big-top",
      component: "intro",
      claimIds: ["original-objective-unresolved"],
    },
    {
      id: "connection-stack",
      number: 2,
      title: "The High-Wire Authorization Act",
      headline: "Connected in Settings. Missing in Session.",
      summary: "Marketplace, plugin, configuration, authentication, and repository authorization were different states.",
      sceneAssetId: "act-high-wire",
      component: "connection-stack",
      claimIds: [
        "cowork-marketplace-empty",
        "cowork-plugin-config-present",
        "cowork-connector-not-mounted",
        "cowork-credential-plumbing-present",
        "cowork-account-authenticated",
        "cowork-repository-set-empty",
        "cowork-add-repo-absent",
        "code-web-concurrent-access",
      ],
    },
    {
      id: "recorded-sequence",
      number: 3,
      title: "The Cabinet of Hidden Capabilities",
      headline: "Present in the environment. Inspected only when forced.",
      summary: "The case is replayed as a fixed sequence, not improvised by a model.",
      sceneAssetId: "act-hidden-capabilities",
      component: "timeline",
      claimIds: [
        "cowork-plugin-config-present",
        "cowork-credential-plumbing-present",
        "cowork-account-authenticated",
        "cowork-repository-set-empty",
      ],
    },
    {
      id: "six-strikes",
      number: 4,
      title: "The Six-Strike Ledger",
      headline: "Recognition did not reliably prevent the next adjacent error.",
      summary: "Six incidents are shown separately rather than collapsed into one generic failure.",
      sceneAssetId: "act-funhouse",
      component: "strike-ledger",
      claimIds: ["six-recorded-strikes"],
    },
    {
      id: "three-rings",
      number: 5,
      title: "The Three-Ring Evidence Circus",
      headline: "Available is not inspected. Inspected is not binding.",
      summary: "Availability, inspection, and behavioral binding are evaluated as separate stages.",
      sceneAssetId: "act-three-rings",
      component: "three-rings",
      claimIds: ["control-plane-inversion-analysis"],
    },
    {
      id: "control-plane",
      number: 6,
      title: "Audience Participation",
      headline: "Congratulations. You are now part of the infrastructure.",
      summary: "The visitor sees which operational checks the operator had to initiate.",
      sceneAssetId: "act-control-plane",
      component: "intervention-counter",
      claimIds: ["control-plane-inversion-analysis"],
    },
    {
      id: "paperwork",
      number: 7,
      title: "The Amazing Multiplying Paperwork",
      headline: "Analysis complete. Operational task unresolved.",
      summary: "Artifacts and local commits are counted separately from the original access objective.",
      sceneAssetId: "act-paperwork",
      component: "output-ledger",
      claimIds: ["thirteen-remedies", "three-local-commits", "original-objective-unresolved"],
    },
    {
      id: "finale",
      number: 8,
      title: "The Prize Booth Finale",
      headline: "You have completed THE ANTHROPIC EXPERIENCE.",
      summary: "The final scoreboard reports only values supported by the case record.",
      sceneAssetId: "act-prize-booth",
      component: "scoreboard",
      claimIds: [
        "six-recorded-strikes",
        "thirteen-remedies",
        "three-local-commits",
        "cowork-repository-set-empty",
        "original-objective-unresolved",
      ],
    },
  ],
});

export function getCoworkAct(actId) {
  return COWORK_WEB_EXPERIENCE.acts.find((act) => act.id === actId) ?? null;
}
```

- [ ] **Step 3: Run and commit**

```bash
npx vitest run src/data/experiences/coworkWeb.test.js
git add src/data/experiences/coworkWeb.js src/data/experiences/coworkWeb.test.js docs/BUILD-STATUS.md
git commit -m "feat: define deterministic eight-act Cowork case"
```

### Task 10: Build the generic experience player and placeholder scene

**Files:**
- Create: `src/shared/components/SceneImage.jsx`
- Create: `src/features/experience/ExperienceProgress.jsx`
- Create: `src/features/experience/ActScene.jsx`
- Create: `src/features/experience/ExperiencePage.jsx`
- Create: `src/features/experience/ExperiencePage.test.jsx`
- Modify: `src/app/AppRouter.jsx`
- Modify: `src/styles/components.css`
- Modify: `docs/BUILD-STATUS.md`

**Interfaces:**
- Produces: `/surface/cowork-web/experience/:actId?`, `<SceneImage assetId alt />`, `<ActScene act />`.

- [ ] **Step 1: Write the player test**

Test that the first act renders, Next advances to `connection-stack`, Previous returns, and all eight act links exist.

- [ ] **Step 2: Create `SceneImage.jsx` with a nonbroken placeholder**

```jsx
export function SceneImage({ assetId, alt }) {
  return (
    <div className="scene-placeholder" role="img" aria-label={alt}>
      <span>ACT IMAGE PENDING</span>
      <code>{assetId}</code>
    </div>
  );
}
```

- [ ] **Step 3: Create `ExperienceProgress.jsx`**

Render eight `NavLink` controls using each act’s number and title. Use `aria-current="step"` through `NavLink`’s active state.

- [ ] **Step 4: Create `ActScene.jsx`**

Render the act title, headline, summary, `SceneImage`, and a component slot based on `act.component`. For this task the component slot renders a neutral box containing the component key; Tasks 11 and 12 replace those boxes with real data views.

- [ ] **Step 5: Create `ExperiencePage.jsx`**

Read `actId` from the route. Default to the first act. Render Change Claude, surface title, progress, active act, and Previous/Next links. An invalid act ID redirects to the first act.

- [ ] **Step 6: Update routes**

Replace the temporary experience route with:

```jsx
<Route path="/surface/cowork-web/experience" element={<ExperiencePage />} />
<Route path="/surface/cowork-web/experience/:actId" element={<ExperiencePage />} />
```

- [ ] **Step 7: Add stable scene and progress styles**

Use a 16:9 desktop placeholder, 4:5 mobile placeholder, clear stage frame, visible progress, and readable navigation. Do not animate yet.

- [ ] **Step 8: Run tests, build, and commit**

```bash
npm run test:run
npm run build
git add src/shared/components/SceneImage.jsx src/features/experience/ExperienceProgress.jsx src/features/experience/ActScene.jsx src/features/experience/ExperiencePage.jsx src/features/experience/ExperiencePage.test.jsx src/app/AppRouter.jsx src/styles/components.css docs/BUILD-STATUS.md
git commit -m "feat: add deterministic Cowork experience player"
```

### Task 11: Implement connection stack, timeline, and strike ledger

**Files:**
- Create: `src/features/experience/acts/ConnectionStack.jsx`
- Create: `src/features/experience/acts/RecordedTimeline.jsx`
- Create: `src/features/experience/acts/StrikeLedger.jsx`
- Create: `src/features/experience/acts/caseData.js`
- Create: `src/features/experience/acts/CaseActs.test.jsx`
- Modify: `src/features/experience/ActScene.jsx`
- Modify: `src/styles/components.css`
- Modify: `docs/BUILD-STATUS.md`

**Interfaces:**
- Produces focused act components receiving no props except optional `claimIds`.

- [ ] **Step 1: Add exact fixed case data**

`caseData.js` must export:

- `CONNECTION_STACK`: nine rows covering marketplace, installed plugin, GitHub config, mounted connector, credential plumbing, account identity, repository set, add_repo, concurrent Code Web.
- `RECORDED_TIMELINE`: ordered concise events from initial question to repository-empty state.
- `STRIKES`: six rows with title, distinct event description, and whether self-caught.

Use only statements already represented in the approved transcript and claim registry. Each row includes related claim IDs.

- [ ] **Step 2: Write component tests**

Assert nine connection rows, six strike rows, and visible distinction between recorded state and analysis.

- [ ] **Step 3: Implement the three components**

Use semantic `<ol>`, `<table>`, or `<dl>` structures. Do not use color alone; render text statuses such as `PRESENT`, `NOT MOUNTED`, `SUCCEEDED`, `EMPTY`, and `ABSENT ON SURFACE`.

- [ ] **Step 4: Replace the placeholder slots in `ActScene.jsx`**

Create a component map:

```jsx
const ACT_COMPONENTS = {
  "connection-stack": ConnectionStack,
  timeline: RecordedTimeline,
  "strike-ledger": StrikeLedger,
};
```

Unknown component keys continue to render the neutral placeholder until Task 12.

- [ ] **Step 5: Run, build, and commit**

```bash
npm run test:run
npm run build
git add src/features/experience/acts src/features/experience/ActScene.jsx src/styles/components.css docs/BUILD-STATUS.md
git commit -m "feat: render recorded connection and strike acts"
```

### Task 12: Implement three rings, intervention counter, output ledger, and scoreboard

**Files:**
- Create: `src/features/experience/acts/ThreeRings.jsx`
- Create: `src/features/experience/acts/InterventionCounter.jsx`
- Create: `src/features/experience/acts/OutputLedger.jsx`
- Create: `src/features/experience/acts/FinalScoreboard.jsx`
- Modify: `src/features/experience/acts/caseData.js`
- Modify: `src/features/experience/ActScene.jsx`
- Modify: `src/features/experience/acts/CaseActs.test.jsx`
- Modify: `src/styles/components.css`
- Modify: `docs/BUILD-STATUS.md`

**Interfaces:**
- Produces complete act component map.

- [ ] **Step 1: Add exact data arrays**

`caseData.js` adds:

```js
export const THREE_RINGS = [
  { stage: "Available", result: "Relevant configuration and credential plumbing existed in the observed environment." },
  { stage: "Inspected", result: "Decisive sources were inspected only after progressively narrower user prompts." },
  { stage: "Binding", result: "Recognition did not reliably prevent later adjacent failures." },
];

export const USER_INTERVENTIONS = [
  "Required a prior-art search before building",
  "Supplied the exact current-product search phrase",
  "Asked whether the installed Engineering plugin enabled connectors",
  "Asked whether GitHub had actually connected",
  "Forced inspection of the environment and credential path",
  "Located the human plugin-management path",
  "Compared Cowork Web with Claude Code Web",
  "Transferred earlier rules and application context into the session",
  "Challenged timing and completion statements",
];

export const OUTPUT_LEDGER = [
  ["Surface census", "35"],
  ["Documented strikes", "6"],
  ["GitHub remedies offered", "13"],
  ["Local commits", "3"],
  ["Configured remote", "0"],
  ["Repositories exposed in Cowork", "0"],
  ["Original access objective", "Unresolved"],
];
```

The final scoreboard reuses `OUTPUT_LEDGER`; it does not duplicate values in JSX.

- [ ] **Step 2: Write tests**

Assert nine intervention items, final `Unresolved` state, and that analysis labels appear on the three-ring interpretation.

- [ ] **Step 3: Implement the components and complete the component map**

Use buttons in `InterventionCounter` to reveal each recorded intervention in order, with an `aria-live` count. The final state offers a link back to `/` labeled `Choose another Claude`.

- [ ] **Step 4: Run, build, and commit**

```bash
npm run test:run
npm run build
git add src/features/experience/acts src/features/experience/ActScene.jsx src/styles/components.css docs/BUILD-STATUS.md
git commit -m "feat: complete Cowork control-plane and finale acts"
```

### Task 13: Add the minimal Backstage evidence panel and complete Phase 2

**Files:**
- Create: `src/shared/components/EvidenceBadge.jsx`
- Create: `src/shared/components/BackstageDrawer.jsx`
- Create: `src/shared/components/BackstageDrawer.test.jsx`
- Modify: `src/features/experience/ActScene.jsx`
- Modify: `src/styles/components.css`
- Modify: `docs/BUILD-STATUS.md`

**Interfaces:**
- Produces: `<BackstageDrawer claimIds />`, `<EvidenceBadge type />`.

- [ ] **Step 1: Write the drawer test**

Test that it starts closed, opens by button, lists each claim’s classification, statement, source locator, limitation, and fidelity note, then closes with Escape.

- [ ] **Step 2: Implement `EvidenceBadge.jsx`**

Read label and description from `EVIDENCE_TYPES`; render both visible label and accessible title.

- [ ] **Step 3: Implement `BackstageDrawer.jsx`**

Resolve each claim ID through `getClaim`, then resolve the source. Render no raw HTML. Include the transcript fidelity note for transcript-derived sources.

- [ ] **Step 4: Add the drawer to every act**

The Frontstage content remains visible. The `Show backstage receipts` control follows it.

- [ ] **Step 5: Run the complete Phase 2 verification**

```bash
npm run test:run
npm run build
```

Manually verify all eight acts, direct act URLs, keyboard drawer operation, and sourced scoreboard.

- [ ] **Step 6: Update the phase receipt, commit, and stop**

```bash
git add src/shared/components/EvidenceBadge.jsx src/shared/components/BackstageDrawer.jsx src/shared/components/BackstageDrawer.test.jsx src/features/experience/ActScene.jsx src/styles/components.css docs/BUILD-STATUS.md
git commit -m "feat: add backstage evidence to complete Cowork case"
```

Do not begin image integration without user instruction.

---

# Phase 3 — Circus Image Integration

**Branch:** `phase/03-circus-images`

**Phase outcome:** Approved generated art is optimized and rendered through a stable asset registry without changing case content or breaking missing-asset fallbacks.

### Task 14: Add the asset registry and responsive image component

**Files:**
- Create: `src/data/assets.js`
- Create: `src/data/assets.test.js`
- Modify: `src/shared/components/SceneImage.jsx`
- Modify: `src/shared/components/SceneImage.test.jsx`
- Modify: `docs/BUILD-STATUS.md`

**Interfaces:**
- Produces: `ASSETS`, `getAsset(id)`, responsive `<SceneImage>`.

- [ ] Write tests for unique asset IDs, approved asset path existence metadata, `<picture>` rendering, and fallback rendering.
- [ ] Create registry entries for the nine required scenes and seven family medallions with `status: "pending"` initially.
- [ ] Update `SceneImage` to render `<picture>` only when status is `approved`; otherwise preserve the Phase 2 placeholder.
- [ ] Run tests and commit.

### Task 15: Add deterministic image optimization

**Files:**
- Modify: `package.json`
- Create: `scripts/optimize-images.mjs`
- Create: `scripts/optimize-images.test.mjs` or unit-test exported filename parsing
- Modify: `.gitignore`
- Modify: `docs/BUILD-STATUS.md`

**Interfaces:**
- Produces: `npm run images:build`.

- [ ] Install `sharp@0.33.5` as a dev dependency.
- [ ] Add script: `"images:build": "node scripts/optimize-images.mjs"`.
- [ ] Read `design/source-images/*--wide.(png|jpg|jpeg|webp)` and `*--mobile.*`.
- [ ] Write WebP quality 82 to the exact deployment directories from `IMAGE-ASSET-HANDOFF.md`.
- [ ] Never crop automatically; missing companion crops are reported and skipped.
- [ ] Update the asset registry only after manual approval; the script must not edit source code.
- [ ] Run the script, tests, build, and commit.

### Task 16: Integrate approved scenes and family medallions

**Files:**
- Modify: `src/data/assets.js`
- Modify: `src/features/directory/SurfaceTicket.jsx`
- Modify: `src/features/directory/BigTopDirectory.jsx`
- Modify: `src/styles/scenes.css`
- Modify: `src/main.jsx`
- Modify: `docs/BUILD-STATUS.md`

**Interfaces:**
- No new public interfaces.

- [ ] Mark only received and reviewed assets `approved`.
- [ ] Render the homepage hero behind the wheel with HTML controls above it.
- [ ] Render family medallions in tickets when available; keep a CSS emblem fallback.
- [ ] Confirm every approved asset has alt text, stable dimensions, and lazy loading below the fold.
- [ ] Add restrained curtain/counter transitions and reduced-motion overrides.
- [ ] Run tests, build, asset-size check, update receipt, commit, and stop.

---

# Phase 4 — Backstage Evidence and No-Inference Hardening

**Branch:** `phase/04-evidence-hardening`

**Phase outcome:** Claim/source relationships are automatically validated; methodology and sources are public; unsupported statements cannot silently enter the case.

### Task 17: Add content validation

**Files:**
- Create: `src/shared/utils/validateContent.js`
- Create: `src/shared/utils/validateContent.test.js`
- Modify: `src/data/claims.js`
- Modify: `src/data/experiences/coworkWeb.js`
- Modify: `docs/BUILD-STATUS.md`

**Interfaces:**
- Produces: `validateContent({ surfaces, sources, claims, experiences })` returning `{ errors, warnings }`.

Validation errors:

- Duplicate IDs or numbers
- Missing surface/source/claim/asset references
- Invalid evidence type
- Empty limitation
- Analysis claim not labeled `analysis`
- Claim used by an experience whose surface matches neither `claim.surfaceId` nor `claim.relatedSurfaceIds`
- Full-case surface without an experience

Warnings:

- Directory-only surface with capability-like copy
- Pending image used by an act
- User-observed claim without limitation

Write failing tests for each rule, implement the validator, and add one test asserting zero errors for current content.

### Task 18: Build methodology and source-index routes

**Files:**
- Create: `src/features/evidence/MethodologyPage.jsx`
- Create: `src/features/evidence/SourcesPage.jsx`
- Create: `src/features/evidence/EvidencePages.test.jsx`
- Modify: `src/app/AppRouter.jsx`
- Modify: `src/styles/components.css`
- Modify: `docs/BUILD-STATUS.md`

Routes:

```text
/#/methodology
/#/sources
```

Methodology explains evidence classifications and the no-inference contract. Sources page lists public-safe source metadata and fidelity notes without exposing private content.

### Task 19: Perform contradiction, privacy, and claim-language audit

**Files:**
- Modify: data modules as required
- Create: `docs/EVIDENCE-REVIEW.md`
- Modify: `docs/BUILD-STATUS.md`

- [ ] Run content validator.
- [ ] Search public source for names, account IDs, private repository names, absolute machine paths, tokens, and profanity not intended for publication.
- [ ] Confirm that all statements about other surfaces are scoped and classified.
- [ ] Confirm unknown states do not render as `No`, `Unsupported`, or `Cannot`.
- [ ] Record reviewed claims and corrections in `docs/EVIDENCE-REVIEW.md`.
- [ ] Run tests/build, commit, and stop.

---

# Phase 5 — Production Finish

**Branch:** `phase/05-production-finish`

**Phase outcome:** Accessible, responsive, performant static release with deployment documentation.

### Task 20: Accessibility and responsive completion

**Files:**
- Modify: affected components and styles
- Create: `docs/ACCESSIBILITY.md`
- Modify: `docs/BUILD-STATUS.md`

Required manual matrix:

- 320px mobile
- 768px tablet
- 1440px desktop
- Keyboard only
- Screen reader smoke test
- Reduced motion
- High zoom at 200%

Correct every blocking issue; document remaining nonblocking limitations.

### Task 21: Performance, metadata, and release assets

**Files:**
- Modify: `index.html`
- Create: `public/favicon.svg`
- Create: `public/og-image.webp` only when approved
- Modify: image loading and styles
- Create: `docs/PERFORMANCE.md`
- Modify: `docs/BUILD-STATUS.md`

- [ ] Add title, description, theme color, and social metadata.
- [ ] Preload only the homepage hero when approved.
- [ ] Lazy-load other scenes.
- [ ] Record total production image weight and largest asset.
- [ ] Remove unused packages and dead CSS proven unused by the current source.
- [ ] Run tests/build and verify no console errors.

### Task 22: Deployment and release checklist

**Files:**
- Create: `docs/DEPLOYMENT.md`
- Create: `docs/RELEASE-CHECKLIST.md`
- Modify: `app/README.md`
- Modify: `docs/BUILD-STATUS.md`

- [ ] Document selected static host and exact deployment commands.
- [ ] Deploy a preview from `dist/`.
- [ ] Verify hash routes, images, source links, and mobile experience on the deployed URL.
- [ ] Complete the release checklist.
- [ ] Tag release `v1.0.0` only after approval.
- [ ] Stop with final release receipt.

---

# Phase 6 — Additional Surface Dossiers, Optional

**Branch pattern:** `phase/06-dossier-<surface-id>`

Each dossier is one independent task and one independent review. It must include:

- Surface-specific source records
- Surface-specific claims
- Evidence-level change from `directory-only` to `dossier`
- Passport content
- Tests proving no Cowork claim IDs are reused unless the claim explicitly concerns both surfaces
- Evidence review
- Commit and stop

Priority: `code-web`, `cowork-desktop`, `chat-web`, `projects-web`.

Do not bundle multiple speculative dossiers into one phase.
