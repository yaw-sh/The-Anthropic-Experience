# THE ANTHROPIC EXPERIENCE — Codex Build Directive

> **Normative instruction for the next implementation session.** Build a new, public-safe documentary from approved structured facts. Do not continue the inherited repository as though it were a coherent implementation.

## 0. Goal

Build and verify a production-ready static site titled **THE ANTHROPIC EXPERIENCE** that documents:

1. the original GitHub/connector session; and
2. the later build in which Claude produced a published parallel artifact while the governed React implementation remained at Phase 0.

The product must distinguish requested objective, observed state, reconstructed statements, substitute output, corrections, unknowns, and verified completion.

The canonical site is the product. A self-contained Claude Artifact is an optional mirror generated only after the canonical release is approved.

---

## 1. Instruction precedence

When materials disagree, follow this order:

1. Explicit owner decisions made in the implementation session and recorded in `docs/DECISIONS.md`.
2. This `CODEX-BUILD-DIRECTIVE.md`.
3. `public-claims-register.seed.json` after owner/Codex adjudication and schema validation.
4. New tests, schemas, and release gates created under this directive.
5. `THE-ANTHROPIC-EXPERIENCE-PRO-REVIEW.md` for rationale and forensic detail.
6. The inherited forensic handoff for background only.
7. The inherited design spec and implementation plan as optional reference only.
8. Existing `app/`, `artifact/`, prototype zips, screenshots, and generated pages as visual/content references only.
9. Raw transcripts, Fellows material, EVE material, and research exports as private evidence only.

Do not silently choose a lower-precedence instruction.

---

## 2. Required operating method

- Work in a **new directory and new Git repository**.
- Keep the supplied archive outside the repository.
- Do not copy the archive wholesale.
- Do not preserve inherited Git history.
- Do not import raw transcripts into the public repository.
- Build from approved, typed public records.
- Use test-first implementation for content invariants, calculations, routing, and privacy gates.
- Make focused commits with receipts.
- Do not declare completion from visual appearance alone.
- Continue through phases when checks pass; stop only for a real owner decision, failed release gate, or unresolvable evidence conflict.

At the end of every phase, record:

```markdown
## Phase N receipt

- Commit:
- Files changed:
- Tests: `<command>` -> `<result>`
- Build: `<command>` -> `<result>`
- Content validation: `<command>` -> `<result>`
- Privacy scan: `<command>` -> `<result>`
- Manual checks:
- Open blockers:
```

---

## 3. Public scope

### Include in v1

- Documentary landing page.
- Original GitHub/connector case.
- Recursive failed-build case.
- Evidence/source index.
- Method/fidelity page.
- Corrections/version page.
- About/non-affiliation/licensing page.
- Optional dated surface-census appendix.

### Exclude from v1

- Full or near-full transcripts.
- EVE case.
- Fellows application and safety research.
- IEP, student, distress, suicidality, vulnerable-person, health, family, or other sensitive personal material.
- The five-page research paper.
- The unverified literature review.
- Provider-comparison claims.
- 34 placeholder dossiers/passports.
- Public comments, user accounts, analytics, backend, database, CMS, or model calls.

### Default decisions

Use these unless the owner explicitly changes them:

- The 35-label census is an appendix, not the homepage.
- No public full transcript.
- No EVE or Fellows content.
- Exact account/repository handle is omitted.
- Exact model names appear only where material and are marked reconstructed.
- The Artifact mirror is post-release work.

Record any deviation in `docs/DECISIONS.md` before implementing it.

---

## 4. Editorial rules

### Required framing

Use this distinction throughout:

> Substantial output was produced, but the requested operation and governed implementation did not complete.

### Prohibited or restricted claims

Do not publish these as current facts:

- “nothing happened”;
- “eight hours” as the session duration;
- “every failure was Anthropic-side”;
- “75% failure rate”;
- “35 products” or “35 equivalent surfaces”;
- “full verbatim transcript” unless a raw platform export is supplied and approved;
- “independent corroboration” for analyses derived from shared/pasted source material;
- “history is clean” or “reachable history is clean” based on this archive;
- “built by Claude” as sole authorship;
- motive claims such as hiding, lying intentionally, retaliation, or self-protection.

### Tone

- Adult, dry, exact, and prosecutorial.
- Humor comes from juxtaposed receipts.
- Profanity appears only when necessary as documented publication evidence and explicitly approved.
- No cute carnival taunts or faux-naive assistant voice.
- No speculative capability verdicts.

### Central visual

The first screen after the hero must show a requested-versus-produced ledger, not a wheel.

Suggested rows:

- Use/connect GitHub in-session → not completed in the documented session.
- Build the governed React documentary → status ledger remained at Phase 0.
- Follow the 22-task/112-step plan → no task receipts/tests in supplied repo.
- Integrate ten scenes → zero in canonical app; images embedded in parallel artifact.
- Publish vetted public material → repository contains contradictory public/private transcript states.
- Keep facts synchronized → six/sixteen/seventeen snapshot drift.

Every row must link to approved claims and limitations.

---

## 5. Recommended technology

Use a minimal, current, officially supported stack selected after checking current documentation:

- Vite
- React
- TypeScript
- React Router only if separate routes are retained
- plain CSS or CSS Modules
- Vitest
- React Testing Library
- Playwright
- axe integration
- Zod or JSON Schema for content validation

Do not add a UI framework, state library, animation framework, backend, database, or CMS.

Pin the Node version in `.nvmrc` or `.tool-versions` and declare `engines` in `package.json`.

Use local/system fonts. No remote font or icon requests.

The app must build without access to the private archive, network APIs, or a model.

---

## 6. Repository layout

Create a focused structure similar to:

```text
anthropic-experience/
├── CODEX-BUILD-DIRECTIVE.md
├── README.md
├── LICENSE-CODE
├── LICENSE-CONTENT
├── package.json
├── package-lock.json
├── .nvmrc
├── vite.config.ts
├── playwright.config.ts
├── public/
│   ├── assets/
│   ├── robots.txt
│   └── _headers or host-equivalent
├── src/
│   ├── app/
│   │   ├── App.tsx
│   │   ├── router.tsx
│   │   └── routes.ts
│   ├── content/
│   │   ├── sources.public.json
│   │   ├── claims.public.json
│   │   ├── events.public.json
│   │   ├── metrics.public.json
│   │   ├── release-facts.json
│   │   └── schemas.ts
│   ├── cases/
│   │   ├── github-session/
│   │   └── failed-build/
│   ├── evidence/
│   │   ├── ClaimCard.tsx
│   │   ├── SourceCard.tsx
│   │   ├── EvidenceState.tsx
│   │   ├── CorrectionNotice.tsx
│   │   └── RequestedProducedLedger.tsx
│   ├── layout/
│   ├── pages/
│   ├── styles/
│   └── test/
├── scripts/
│   ├── validate-content.ts
│   ├── check-public-tree.ts
│   ├── check-release-facts.ts
│   ├── inspect-assets.ts
│   ├── build-release-manifest.ts
│   └── build-artifact-mirror.ts
├── tests/
│   ├── content/
│   ├── privacy/
│   └── e2e/
└── docs/
    ├── DECISIONS.md
    ├── PHASE-RECEIPTS.md
    ├── SOURCE-METHOD.md
    ├── ASSET-PROVENANCE.md
    ├── ACCESSIBILITY.md
    ├── PERFORMANCE.md
    ├── DEPLOYMENT.md
    ├── RELEASE-CHECKLIST.md
    └── CORRECTIONS.md
```

The private vault is **not** a subdirectory of this repository.

---

## 7. Content contracts

Implement typed schemas for `Source`, `Claim`, `Event`, `Metric`, and `ReleaseFact`.

### Source requirements

Every source includes:

- stable ID;
- kind/fidelity;
- title/date/origin;
- `independenceGroup`;
- public/private sensitivity;
- content hash when available;
- locator scheme;
- review and approval state.

### Claim requirements

Every substantive public statement includes:

- stable ID;
- internal statement;
- approved public wording;
- exact scope;
- classification;
- status;
- confidence;
- source locators;
- limitations;
- sensitivity;
- version;
- reviewer/approval;
- optional `supersedes` and `calculationId`.

### Event requirements

Every timeline event includes timestamp confidence. Do not fabricate precision.

### Metric requirements

Every displayed number includes:

- measurement type;
- formula;
- numerator/denominator event IDs where applicable;
- unit;
- uncertainty;
- public display policy.

### Release facts

Generate repeated copy from `release-facts.json`, including:

- title;
- canonical description;
- plan/task counts;
- artifact/app facts approved for public use;
- release version/date;
- canonical URL;
- mirror version/URL if one exists.

README, HTML metadata, hero ledger, launch notes, and Artifact metadata must not hand-copy these facts.

---

## 8. Seed-claim adjudication

Start from `public-claims-register.seed.json` in this pack.

For each seed claim:

1. inspect the cited archive source privately;
2. decide `approved`, `rejected`, `disputed`, `unknown`, or `superseded`;
3. write narrow `publicText`;
4. record limitations;
5. remove private locators from the public version;
6. require owner approval for medium/low-confidence public claims.

No component may accept freeform substantive prose that bypasses the claim register.

Static narrative glue is allowed only when it contains no externally checkable assertion. Add a test or lint convention for claim references in evidence-heavy components.

---

## 9. Product composition

### Landing page

1. Hero: title and one-sentence scope.
2. Requested-versus-produced ledger.
3. Two-case navigation.
4. “Established / disputed / unknown” summary.
5. Method and corrections links.
6. Optional link to surface-census appendix.

### Original session case

Use concise sections:

1. Operational objective.
2. Settings state and limitation.
3. Session-reported capability/access state.
4. Selected claim-before-inspection incidents.
5. What was produced instead.
6. Final in-session outcome.
7. Unknowns and alternative explanations.

### Failed-build case

1. Governing plan and status ledger.
2. What the canonical app contained.
3. What the parallel artifact contained.
4. Silent plan supersession.
5. Privacy/publication failures.
6. Reproducibility failure.
7. Count and copy drift.
8. What the clean build changes structurally.

### Evidence page

Allow filtering by:

- claim status;
- source kind;
- case;
- confidence;
- correction/supersession state.

### Method page

Explain:

- source fidelity;
- independence groups;
- claim status;
- reconstruction limits;
- metric calculation;
- privacy boundary;
- what was not independently verified.

### Corrections page

Show a public, append-only record:

- previous public wording;
- corrected wording;
- reason;
- date/version;
- affected routes.

### Surface appendix

Only include if approved. Title it as a dated observed-label census. Group categories and state that labels are not equivalent products or verified capability dossiers.

---

## 10. Visual direction

- Preserve the dark mechanical-circus hero as inspiration, not literal code.
- Use no more than a small number of approved scene images.
- Move quickly from frontstage spectacle to neutral backstage evidence.
- Use the Research Archive system as component inspiration for tables, metadata, badges, source cards, and transcript/reconstruction notices.
- One `<h1>` per page.
- Display type only at large sizes.
- Body/evidence typography must remain highly readable.
- No information embedded only in generated images.
- No constant animation, flashing bulbs, or forced 4.2-second waits.
- Respect `prefers-reduced-motion` at component and CSS levels.

The wheel is optional and secondary. If implemented, it must be an enhancement to the surface appendix and never the only navigation.

---

## 11. Asset rules

Do not copy images into the public repo until an asset manifest exists.

Each approved asset record must include:

- source filename and SHA-256;
- creator/generator and rights basis;
- creation date if known;
- approved use;
- source dimensions;
- derivative filenames/dimensions/hashes;
- metadata inspection result;
- alt text or decorative designation;
- focal point;
- owner approval.

Canonical build:

- AVIF/WebP plus fallback where useful;
- responsive widths;
- fixed aspect ratio;
- lazy loading below the first viewport;
- no base64/data-URI images;
- no remote image/CDN requirement for core content.

Provide CSS/diagram placeholders so unresolved art never blocks the release.

---

## 12. Privacy and security gates

Create a deterministic `npm run check:public` command that fails on any blocking condition.

At minimum, inspect source and `dist/` for:

- raw transcript filenames or headings;
- private source directory names;
- owner name/handle unless approved;
- emails and account identifiers;
- GitHub repo URLs unless approved;
- `/home/`, `/Users/`, `/tmp/claude`, `/root/.claude`, Windows user paths;
- `GH_TOKEN`, `GITHUB_TOKEN`, PAT/secret assignment patterns;
- MCP endpoint/config strings unless approved;
- `api.githubcopilot.com/mcp`;
- IEP/student/distress/suicidality/vulnerable-person terms;
- `data:image` and unexpected base64 payloads;
- source maps in production unless deliberately approved;
- `innerHTML`, `dangerouslySetInnerHTML`, `eval`, `Function(`;
- remote font/script/icon imports;
- dead ChatGPT citation markers;
- `.DS_Store`, nested zips, raw PDFs, raw exports;
- unexpected downloadable URIs.

Use a reviewed allowlist for unavoidable matches. Every allowlist entry needs a reason and owner approval.

Also run:

- secret scanner;
- dependency audit;
- image/PDF metadata inspection;
- link checker;
- generated bundle inventory.

Do not equate a clean scanner result with owner approval.

---

## 13. Test requirements

### Content tests

- all IDs unique;
- all references resolve;
- no public claim lacks an approved source and limitation;
- rejected/private/superseded records cannot render;
- reconstructed quotations always show a fidelity label;
- metrics reproduce expected values from explicit events;
- release facts are synchronized;
- optional surface census contains exactly the approved snapshot and labels it correctly.

### Component tests

- requested-versus-produced rows expose claim details;
- evidence-state badges have text labels;
- corrections link to superseded claims;
- keyboard operation works;
- reduced-motion state skips long transitions;
- images have correct alt/decorative behavior;
- no route presents unknown as “No” or “Unsupported.”

### End-to-end tests

- all routes load directly and through navigation;
- no console errors;
- keyboard-only primary journey;
- mobile 320px journey;
- 200% zoom smoke test;
- reduced-motion journey;
- evidence filters;
- correction links;
- deployed preview route and asset checks.

### Accessibility

Run automated axe checks and manually verify:

- logical headings;
- focus order and focus restoration;
- semantic tables/captions;
- visible focus;
- status not conveyed by color alone;
- live-region restraint;
- current Chrome/Safari/Firefox/Edge;
- iOS Safari and Android Chrome smoke tests.

---

## 14. Performance budgets

Canonical release targets:

- initial JavaScript ≤ 200 kB gzip;
- homepage initial transfer ≤ 1 MB;
- common desktop hero derivative approximately ≤ 500 kB;
- no remote fonts;
- no base64 images in JS/CSS/HTML;
- CLS < 0.1;
- target LCP < 2.5 s on a reasonable mobile Lighthouse profile;
- all non-hero images lazy-loaded;
- no route downloads private/evidence data it does not render.

Create `docs/PERFORMANCE.md` with exact measured results and environment.

Artifact size is not fixed until Phase 1 feasibility testing. Record host-tested limits before committing to parity.

---

## 15. Implementation phases

## Phase 0 — Evidence freeze and feasibility

Deliverables:

- new repository;
- copied directive/review seed only;
- `docs/DECISIONS.md` with defaults;
- validated public schema;
- seed claims adjudicated enough for one sample section;
- one-page Artifact feasibility spike;
- Node/tooling pinned;
- baseline tests/CI.

Gate:

- no private archive files in repo;
- canonical and Artifact sample builds succeed;
- Artifact host behavior/size documented;
- owner decisions required for scope are recorded.

## Phase 1 — Documentary skeleton

Deliverables:

- landing page;
- requested-versus-produced ledger;
- route shell;
- evidence state components;
- method/corrections/about pages;
- frontstage/backstage visual tokens;
- no final scene art required.

Gate:

- keyboard primary journey;
- route tests;
- content validation;
- public-tree scan;
- production build.

## Phase 2 — Original GitHub case

Deliverables:

- approved events/claims/sources;
- settings-state treatment and limitation;
- session outcome;
- selected reconstructed excerpts with labels;
- alternative explanations/unknowns.

Gate:

- every substantive sentence traceable;
- no unqualified causal claim;
- no full transcript;
- owner reviews public copy diff.

## Phase 3 — Failed-build case

Deliverables:

- plan/status receipt;
- canonical app versus parallel artifact comparison;
- reproducibility evidence;
- privacy mechanism critique;
- synchronized correction/count treatment.

Gate:

- no “nothing happened” framing;
- no unsupported failure total;
- stale screenshots excluded or regenerated;
- exact build facts covered by tests.

## Phase 4 — Assets and production quality

Deliverables:

- approved responsive scene assets;
- accessibility completion;
- metadata/social image;
- performance optimization;
- browser matrix;
- licensing/provenance docs.

Gate:

- axe/manual checks;
- performance budgets;
- metadata scan;
- no remote dependencies for core rendering.

## Phase 5 — Clean release candidate

Deliverables:

- protected/noindex deployed preview;
- release manifest;
- public-copy diff;
- source/claim index;
- privacy/secret/link/dependency scans;
- rollback instructions;
- README generated from release facts.

Gate:

- owner reviews exact `dist/` inventory;
- all release checklist items checked;
- no open P0/P1 blocker;
- production approval recorded.

## Phase 6 — Canonical release and optional mirror

Deliverables:

- production deploy;
- release tag;
- deployed verification;
- optional Artifact generated from the same approved release facts/content;
- parity report.

Gate:

- canonical release verified first;
- Artifact contains no content absent from the canonical approved manifest;
- both outputs identify the same release version;
- rollback tested/documented.

---

## 16. Required package scripts

Create exact equivalents of:

```json
{
  "scripts": {
    "dev": "vite",
    "test": "vitest",
    "test:run": "vitest run",
    "test:e2e": "playwright test",
    "lint": "...",
    "typecheck": "tsc --noEmit",
    "validate:content": "...",
    "check:public": "...",
    "check:assets": "...",
    "build": "npm run validate:content && npm run typecheck && vite build",
    "build:manifest": "...",
    "build:artifact": "...",
    "check": "npm run lint && npm run typecheck && npm run test:run && npm run build && npm run check:public"
  }
}
```

Use current official package APIs and choose the linter/tool commands during implementation. Do not cargo-cult historical versions from the inherited plan.

---

## 17. Release manifest

Generate a machine-readable manifest containing:

```json
{
  "release": "v1.0.0",
  "builtAt": "ISO-8601",
  "gitCommit": "...",
  "contentVersion": "...",
  "claimIds": [],
  "sourceIds": [],
  "assetHashes": {},
  "routeChecks": {},
  "testSummary": {},
  "privacyScanSummary": {},
  "performanceSummary": {},
  "canonicalUrl": "...",
  "artifactMirror": null
}
```

The manifest is a receipt, not self-attestation. Populate it from command output where possible.

---

## 18. Completion definition

Do not call the project complete until fresh command output and deployed checks establish:

1. `npm ci` succeeds from a clean checkout.
2. `npm run check` exits 0.
3. `npm run test:e2e` exits 0 against the production build/preview.
4. all public routes pass direct-load checks.
5. the production bundle passes privacy and metadata review.
6. every public claim is approved and traceable.
7. no raw/private evidence is present in files or Git history.
8. accessibility and performance receipts are recorded.
9. preview is owner-approved.
10. production deploy and rollback procedure are verified.
11. optional Artifact parity is verified separately after canonical release.

The build is successful when the requested product, evidence model, and release controls all agree—not when a visually impressive substitute exists.
