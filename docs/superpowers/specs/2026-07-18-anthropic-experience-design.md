# THE ANTHROPIC EXPERIENCE — Product Design Specification

## Product statement

**THE ANTHROPIC EXPERIENCE** is an evidence-backed satirical microsite whose primary interface is a complete directory of 35 observed Claude surfaces presented as a grand, unreliable circus.

The directory remains the face. The wheel embodies the arbitrariness of choosing among overlapping surfaces. Full names remain readable in a ticket directory. Selecting a surface opens only the documented experience or dossier supported for that surface.

The first complete experience is the Claude Cowork Web GitHub case, presented as a deterministic sequence titled:

> **Connected in Settings, Missing in Session**

## Design thesis

The circus metaphor is structural, not decorative:

- The directory is the midway.
- The wheel is product selection.
- Each surface is an attraction.
- Claude is the ringmaster.
- The user becomes backstage crew and control plane.
- The evidence lives behind the curtain.
- The original task is the promised act that may never appear.

## Evidence thesis

The experience distinguishes:

```text
Evidence availability
-> evidence discovery
-> evidence inspection
-> accurate interpretation
-> behavioral binding
-> verified completion
```

The interface may analyze this sequence, but it must never present analysis as raw telemetry.

## Primary user journey

1. Visitor enters the Big Top directory.
2. Visitor sees all 35 surfaces, searchable and filterable.
3. Visitor selects directly or spins the wheel.
4. The selected surface passport appears.
5. If a complete case exists, the visitor enters the guided performance.
6. Each act presents a short frontstage scene.
7. The visitor may open Backstage to inspect the claim type, source, receipt, and limitation.
8. The Cowork case accumulates user interventions and unresolved operational state.
9. The finale presents the sourced scoreboard.
10. The visitor returns to the directory; no cross-surface transfer is implied.

## Information architecture

### Route map

```text
/#/                                  Big Top directory
/#/surface/:surfaceId                Surface passport or dossier
/#/surface/cowork-web/experience     Cowork Web guided case
/#/surface/cowork-web/experience/:actId
/#/methodology                       Evidence methodology
/#/sources                           Public source index
```

Use `HashRouter` for static-host portability.

### Evidence levels

- `full-case`: deterministic guided case with claims and receipts
- `dossier`: verified surface facts without a reconstructed incident
- `directory-only`: the surface is present in the census, but no verified dossier has been assembled

Only Cowork Web starts as `full-case`.

## Surface census

The first-release working census contains 35 entries reconstructed from the July 18, 2026 transcript census. It is not presented as an eternal product count. Each entry records the census date and evidence level.

Families:

- Code: 14
- Chat: 3
- Projects: 2
- Cowork: 4
- Extensions: 5
- Developer: 4
- Cloud: 3

Total: 35.

## Homepage composition

### Marquee

- Title: THE ANTHROPIC EXPERIENCE
- Supporting line: Thirty-five acts. One account. No shared state.
- Circus display type only at large sizes

### Wheel

- 35 equal SVG segments
- Segment shows a two-digit number, not the full name
- Family color identifies grouping
- Pointer sits at twelve o’clock
- Direct click and keyboard activation supported
- Random spin supported
- Reduced-motion mode selects without long animation

### Ticket directory

- Full surface name
- Family
- Platform/detail
- Evidence level
- Search
- Family filters
- Readable, upright typography

### Selection result

- Selected surface
- Surface number
- Evidence level
- Enter button
- No capability verdict inferred from absence of a case

## Surface passport

Every surface route includes:

- Surface name
- Family
- Platform/detail
- Census date
- Evidence level
- Source-status statement
- Action appropriate to the evidence level

Directory-only empty state:

> This Claude exists in the working census. A sufficiently evidenced experience has not yet been assembled.

## Cowork Web acts

### Act 1 — Now Performing

Surface passport and case scope.

### Act 2 — The Connection Stack

Separates marketplace listing, installed plugin, declared connector, mounted connector, credential plumbing, account authentication, repository authorization, missing remedy, and concurrent success on another surface.

### Act 3 — The Recorded Sequence

Shows the deterministic progression from initial question through forced inspection and final repository-empty state.

### Act 4 — The Six-Strike Ledger

Presents the six documented incidents without claiming they are mechanically identical.

### Act 5 — The Three Rings

Availability, inspection, and binding. Includes four analytical gaps with explicit analysis labels.

### Act 6 — Audience Participation

Counts the operator interventions that supplied tool discovery, search, product navigation, verification, environment inspection, continuity, and integrity checking.

### Act 7 — The Multiplying Paperwork Act

Contrasts artifacts and analysis produced with the unresolved original operational objective.

### Act 8 — Prize Booth Finale

Displays the sourced final scoreboard and returns to the directory.

## Frontstage and Backstage

Each act is one component with two views.

### Frontstage

- Scene image or placeholder
- Satirical headline
- One concise explanatory paragraph
- Required interaction

### Backstage

- Claim classification
- Surface and model scope
- Timestamp or sequence location
- What was asserted
- What had been inspected
- What the receipt established
- Outcome
- Limitation
- Source reference

## Visual system

### Palette

- Canvas: deep aubergine
- Velvet: oxblood and wine
- Paper: aged cream
- Metal: tarnished brass and dusty mustard
- Accent: restrained faded teal
- Ink: dark brown-black

### Typography

- Display: Rye or a comparable wood-type face for large marquee and act titles only
- Interface: Space Grotesk or a condensed grotesk for readable labels and tickets
- Evidence: DM Mono or comparable monospace

Do not use decorative display type for evidence, small labels, body copy, or wheel segment names.

### Motion

Mechanical, not digital:

- Wheel acceleration/deceleration
- Ticket punch
- Counter click
- Curtain reveal
- Wooden sign flip

Respect reduced motion. No constant pulsing or flashing.

## Architecture

Static Vite/React app with data-driven content.

- No backend
- No model calls
- No database
- No CMS in the first release
- No generated HTML execution
- No unstructured case copy embedded in large page components

Content modules define surfaces, sources, claims, assets, experiences, and scoreboards. Pure utilities validate IDs and wheel math. React components render the data.

## Accessibility

- Full keyboard operation
- Direct directory alternative to wheel
- Visible focus states
- Semantic headings and controls
- Color-independent evidence labels
- Reduced-motion behavior
- Responsive layout
- Alt text and decorative-image handling
- Backstage panels accessible without hover

## Performance

- First viewport may preload only the homepage hero
- Remaining images lazy-load
- WebP first; AVIF optional after release
- Stable image aspect ratios prevent layout shift
- CSS/SVG handles ornaments and the wheel
- Production build remains a static `dist/`

## Non-goals

The first release does not:

- Create 35 guided case studies
- Automatically infer surface capabilities
- Call an LLM
- Build a connector
- Reconstruct private platform logs
- Publish private evidence
- Add user accounts, comments, analytics, or a CMS
- Replace the circus direction with a generic dashboard

## Release definition

The first release is complete when:

- All 35 surfaces are present, unique, searchable, and filterable.
- The wheel and direct directory both select surfaces.
- Every surface route states an honest evidence level.
- Cowork Web contains the complete eight-act deterministic case.
- Every substantive Cowork claim is classified and source-linked.
- Missing images fall back cleanly.
- The site is keyboard operable and respects reduced motion.
- Tests and production build pass.
- The static site can be deployed without a server rewrite.
