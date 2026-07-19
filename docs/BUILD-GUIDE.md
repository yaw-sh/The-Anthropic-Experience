# Complete Build Guide — THE ANTHROPIC EXPERIENCE

## 1. Objective

Turn the working circus-wheel prototype into a finished static experience in value order.

The first phase must produce something useful and deployable immediately: the complete 35-surface directory, readable wheel, filtering, selection, and surface routes. Later phases add the Cowork Web case, images, evidence depth, and production refinement.

The build must never wait for all generated images and must never manufacture factual symmetry across surfaces.

## 2. Base repository decision

Use the smaller wheel prototype as the implementation base.

Reasons:

- `src/App.jsx` is a conventional React component.
- Wheel state is explicit and testable.
- `src/index.css` contains the visual language in maintainable CSS.
- The current production build passes.
- Refactoring can be incremental.

Do not extend the alternate version that injects scripts and generated HTML at runtime. Use it only as a visual/copy reference.

## 3. Technology choices

Keep:

- React 18
- Vite 4
- React Router DOM 6
- Plain CSS
- Static ES modules for content

Add only when the relevant phase begins:

- Phase 1: Vitest and React Testing Library
- Phase 3: Sharp for image optimization
- Phase 5: Playwright only if browser automation is wanted for release checks

Do not add a backend, database, state library, component framework, animation framework, or CMS.

## 4. Target repository structure

```text
.
├── CLAUDE.md
├── app/README.md
├── index.html
├── package.json
├── public/
│   └── images/
│       ├── families/
│       └── scenes/
├── design/
│   └── source-images/
├── docs/
│   ├── BUILD-GUIDE.md
│   ├── BUILD-STATUS.md
│   ├── IMAGE-ASSET-HANDOFF.md
│   ├── evidence/
│   │   └── README.md
│   └── superpowers/
│       ├── specs/
│       └── plans/
└── src/
    ├── App.jsx
    ├── main.jsx
    ├── app/
    │   └── AppRouter.jsx
    ├── data/
    │   ├── assets.js
    │   ├── claims.js
    │   ├── evidenceTypes.js
    │   ├── sources.js
    │   ├── surfaceFamilies.js
    │   ├── surfaces.js
    │   └── experiences/
    │       └── coworkWeb.js
    ├── features/
    │   ├── directory/
    │   │   ├── BigTopDirectory.jsx
    │   │   ├── SurfaceDirectory.jsx
    │   │   ├── SurfaceTicket.jsx
    │   │   └── SurfaceWheel.jsx
    │   ├── experience/
    │   │   ├── ActScene.jsx
    │   │   ├── ExperiencePage.jsx
    │   │   ├── ExperienceProgress.jsx
    │   │   └── acts/
    │   └── surface/
    │       ├── SurfacePage.jsx
    │       └── SurfacePassport.jsx
    ├── shared/
    │   ├── components/
    │   │   ├── BackstageDrawer.jsx
    │   │   ├── EvidenceBadge.jsx
    │   │   ├── SceneImage.jsx
    │   │   └── SiteShell.jsx
    │   └── utils/
    │       ├── filterSurfaces.js
    │       ├── validateContent.js
    │       └── wheel.js
    ├── styles/
    │   ├── components.css
    │   ├── global.css
    │   ├── scenes.css
    │   └── tokens.css
    └── test/
        └── setup.js
```

The implementation plan creates this structure incrementally. Do not create all empty files at once.

## 5. Data contracts

### Surface

```js
{
  id: "cowork-web",
  number: 20,
  name: "Claude Cowork",
  detail: "Web",
  familyId: "cowork",
  censusDate: "2026-07-18",
  evidenceLevel: "full-case",
  experienceId: "cowork-web-github-2026-07-18",
}
```

Allowed evidence levels:

```text
full-case
dossier
directory-only
```

### Source

```js
{
  id: "transcript-2026-07-18",
  title: "THE ANTHROPIC EXPERIENCE — Full Chat Transcript (Sanitized)",
  type: "reconstructed-transcript",
  fidelityNote: "Reconstructed and sanitized by the assistant; not a byte-perfect platform log.",
  publicPath: "/evidence/chattranscript-2026-07-18-sanitized.md",
}
```

### Claim

```js
{
  id: "cowork-repository-set-empty",
  surfaceId: "cowork-web",
  statement: "The Cowork Web session authenticated the account but exposed no repositories.",
  evidenceType: "receipt",
  sourceId: "transcript-2026-07-18",
  sourceLocator: "Turn 47-49 and Appendix A",
  limitation: "Based on the sanitized reconstructed transcript and recorded operational outputs.",
}
```

### Experience act

```js
{
  id: "connection-stack",
  title: "The High-Wire Authorization Act",
  sceneAssetId: "act-high-wire",
  headline: "Connected in Settings. Missing in Session.",
  summary: "Account authorization and session repository access were different states.",
  claimIds: ["cowork-account-authenticated", "cowork-repository-set-empty"],
  component: "connection-stack",
}
```

## 6. Phase roadmap by value

# Phase 1 — Working Big Top Directory

## Value unlocked

A shareable, functional product immediately replaces the ten-label wheel demo. Visitors can see all 35 surfaces, search and filter them, select directly, spin randomly, and open an honest surface passport.

## Required work

- Establish test harness and lockfile.
- Move the 35-surface census into structured data.
- Replace rotated full names with numbered SVG segments.
- Add a full upright ticket directory.
- Add search and family filters.
- Add static routes and surface passports.
- Preserve the circus visual language with CSS placeholders.
- Mark Cowork Web `full-case`; mark all others `directory-only` until evidence exists.

## Explicitly deferred

- Full Cowork case
- Generated scene images
- Backstage receipts
- Additional surface dossiers
- Advanced animations

## Phase 1 gate

```text
35 unique surface entries
35 wheel segments
Direct selection works
Random spin works
Search works
Family filters work
Every route loads on refresh under HashRouter
Keyboard-only selection works
Reduced-motion selection works
Tests pass
Production build passes
```

# Phase 2 — Complete Cowork Web Experience

## Value unlocked

The site becomes more than a directory. It presents the central evidence-backed case and the complete user-control-plane argument.

## Required work

- Add evidence types, source registry, claims, and case data.
- Build eight deterministic acts.
- Add progress navigation and deep links.
- Implement connection stack, six-strike ledger, three-ring analysis, intervention counter, output ledger, and final scoreboard.
- Add minimal Backstage panels with source and limitation.
- Use CSS/SVG scene placeholders if images are not ready.

## Phase 2 gate

```text
All eight acts render from data
No act depends on model generation
Every substantive claim has evidence type and source ID
No claim leaks to another surface
Next/previous and direct act links work
Final scoreboard uses sourced values only
Tests pass
Production build passes
```

# Phase 3 — Circus Image Integration

## Value unlocked

The experience gains the mature editorial circus identity and uses images to communicate the metaphors without sacrificing readable HTML evidence.

## Required work

- Add asset registry and responsive `SceneImage`.
- Add image optimization script.
- Integrate approved wide/mobile scene images.
- Integrate family medallions.
- Add restrained curtain, ticket, and counter motion.
- Preserve placeholders for unapproved assets.

## Phase 3 gate

```text
Homepage hero integrated or gracefully absent
Every approved scene has wide/mobile sources
No generated lettering carries interface meaning
Alt text reviewed
Images lazy-load below the fold
No layout shift from image loading
Reduced-motion mode remains valid
Tests pass
Production build passes
```

# Phase 4 — Backstage Evidence and No-Inference Hardening

## Value unlocked

The satire becomes auditable. Visitors can distinguish receipts, transcript statements, official sources, user observations, analysis, unknowns, and satire.

## Required work

- Build full Backstage drawer.
- Build methodology and source-index routes.
- Validate claim/source/surface relationships at test time.
- Add source locators and limitations.
- Add visible transcript fidelity warning.
- Run a content contradiction and privacy review.

## Phase 4 gate

```text
Every claim validates
Every source exists
Every analysis is labeled analysis
Unknown states do not render as capability denials
Transcript reconstruction caveat is visible
Private identifiers are absent
Tests pass
Production build passes
```

# Phase 5 — Production Finish

## Value unlocked

A stable, accessible, fast release ready for public deployment.

## Required work

- Cross-browser responsive QA.
- Keyboard and screen-reader review.
- Reduced-motion review.
- Performance and image-size review.
- Metadata, social preview, favicon, and deployment documentation.
- Optional browser automation.
- Final copy and evidence audit.

## Phase 5 gate

```text
No critical accessibility defects
No broken routes or images
No console errors
No unsupported claims
Mobile and desktop layouts approved
Production build deployed successfully
Release checklist signed off
```

# Phase 6 — Additional Surface Dossiers, Optional

## Value unlocked

The directory becomes progressively more useful beyond the Cowork case.

Add one surface at a time only when evidence is sufficient. A dossier may include official capabilities and documented boundaries without inventing a failure narrative.

Priority order:

1. Claude Code Web, because it is the direct comparison surface in the Cowork case.
2. Cowork Desktop, because state and filesystem differences are central.
3. Chat Web and Projects Web.
4. Other surfaces according to available evidence and user interest.

Each dossier is its own reviewable task and must not change unrelated entries.

## 7. Surface census for Phase 1

Use these IDs and numbering. Names are a working census reconstructed from the July 18 record and must retain `censusDate: "2026-07-18"`.

| # | ID | Display name | Detail | Family |
|---:|---|---|---|---|
| 1 | `code-cli` | Claude Code | CLI | Code |
| 2 | `code-desktop` | Claude Code | Desktop | Code |
| 3 | `code-vscode` | Claude Code | VS Code | Code |
| 4 | `code-jetbrains` | Claude Code | JetBrains | Code |
| 5 | `code-web` | Claude Code | Web | Code |
| 6 | `code-mobile` | Claude Code | Mobile | Code |
| 7 | `code-remote-control` | Claude Code | Remote Control | Code |
| 8 | `code-dispatch` | Claude Code | Dispatch | Code |
| 9 | `code-channels` | Claude Code | Channels | Code |
| 10 | `code-routines` | Claude Code | Scheduled Tasks / Routines | Code |
| 11 | `code-github-actions` | Claude Code | GitHub Actions | Code |
| 12 | `code-gitlab-cicd` | Claude Code | GitLab CI/CD | Code |
| 13 | `code-review` | Claude Code | Code Review | Code |
| 14 | `code-slack` | Claude Code | Slack | Code |
| 15 | `chat-web` | Claude Chat | Web | Chat |
| 16 | `chat-desktop` | Claude Chat | Desktop | Chat |
| 17 | `chat-mobile` | Claude Chat | Mobile | Chat |
| 18 | `projects-web` | Projects | Web | Projects |
| 19 | `projects-desktop` | Projects | Desktop / Local | Projects |
| 20 | `cowork-web` | Claude Cowork | Web | Cowork |
| 21 | `cowork-desktop` | Claude Cowork | Desktop | Cowork |
| 22 | `cowork-mobile` | Claude Cowork | Mobile | Cowork |
| 23 | `cowork-third-party` | Claude Cowork | Third-party environments | Cowork |
| 24 | `chrome` | Claude in Chrome | Browser extension | Extensions |
| 25 | `excel` | Claude in Excel | Add-in | Extensions |
| 26 | `word` | Claude in Word | Add-in | Extensions |
| 27 | `powerpoint` | Claude in PowerPoint | Add-in | Extensions |
| 28 | `design` | Claude Design | Design surface | Extensions |
| 29 | `api` | Claude API | Developer API | Developer |
| 30 | `workbench` | Workbench | Developer console | Developer |
| 31 | `agent-sdk` | Agent SDK | Developer framework | Developer |
| 32 | `managed-agents` | Managed Agents | Managed infrastructure | Developer |
| 33 | `bedrock` | Claude on Amazon Bedrock | Cloud platform | Cloud |
| 34 | `vertex-ai` | Claude on Vertex AI | Cloud platform | Cloud |
| 35 | `foundry` | Claude on Microsoft Foundry | Cloud platform | Cloud |

Before public launch, independently verify public-facing product names. Do not change the count or merge entries silently; record any census revision with date and source.

## 8. Image-independent implementation

Phase 1 and Phase 2 must use a reusable placeholder:

```text
┌────────────────────────────────────────┐
│ ACT IMAGE PENDING                      │
│ act-three-rings                        │
│ Stable aspect ratio; no broken image   │
└────────────────────────────────────────┘
```

When an image arrives, add it to the asset registry. Components should not need to change.

## 9. Testing strategy

### Unit tests

- 35 unique surface IDs and numbers
- Family totals and total count
- Wheel angle calculations
- Surface filtering
- Content-reference validation

### Component tests

- Wheel renders 35 accessible segments
- Direct ticket selection
- Random spin result
- Search and family filters
- Surface passport states
- Experience act navigation
- Backstage open/close
- Reduced-motion behavior

### Manual checks

- Keyboard-only journey
- Mobile directory
- Mobile act view
- Long surface names
- Missing image fallback
- Hash route refresh
- Screen-reader label order
- No color-only status

### Production checks

```bash
npm run test:run
npm run build
npm run preview
```

## 10. Deployment

The site builds to `dist/` and uses hash routes, so it can deploy to:

- GitHub Pages
- Cloudflare Pages
- Vercel
- Netlify
- Any static object host

Do not add host-specific configuration until the host is selected. Phase 5 documents the selected deployment route.

## 11. Claude Code execution instructions

Start Phase 1 with:

```text
Read the repository instructions and implementation plan. Execute Phase 1 only.
Create branch phase/01-working-directory. Complete tasks in order, write tests
first, commit each task, update docs/BUILD-STATUS.md, run the full test suite and
production build, then stop with the required phase completion receipt.
Do not begin the Cowork case and do not wait for images.
```

At every later phase, change only the phase number and branch name from the implementation plan.

## 12. Definition of finished

The project is finished when:

- The directory visibly contains 35 surface entries.
- The wheel is readable and optional.
- Direct selection and random selection work.
- Surface passports make evidence level explicit.
- Cowork Web provides the complete deterministic case.
- All factual claims are classified and linked to sources.
- Images deepen comprehension without carrying exact claims.
- The backstage view makes analytical interpretation distinguishable from receipts.
- Keyboard, reduced-motion, mobile, and production-build checks pass.
- The public deployment contains no private or embarrassing information.
