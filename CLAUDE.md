# CLAUDE.md — THE ANTHROPIC EXPERIENCE

## Mission

Build a static, evidence-backed, circus-themed interactive site titled **THE ANTHROPIC EXPERIENCE**.

The complete 35-surface directory is the face of the product. A visitor can choose a surface directly or let the wheel choose. Selecting a surface opens only the experience or dossier supported for that specific surface. The first complete case is **Claude Cowork Web — Connected in Settings, Missing in Session**.

The site must separate spectacle from evidence:

- **Frontstage:** circus imagery, satire, guided interaction.
- **Backstage:** claims, receipts, timestamps, limitations, and source classification.

## Canonical documents

Read these before changing code, in this order:

1. `CLAUDE.md`
2. `docs/BUILD-GUIDE.md`
3. `docs/superpowers/specs/2026-07-18-anthropic-experience-design.md`
4. `docs/superpowers/plans/2026-07-18-anthropic-experience-implementation.md`
5. `docs/IMAGE-ASSET-HANDOFF.md`
6. `docs/BUILD-STATUS.md`
7. `docs/evidence/README.md`

When documents disagree, this file controls execution procedure, the design spec controls product intent, and the implementation plan controls task order.

## Current implementation base

Use the existing small wheel React app as the only implementation base.

Do not copy architecture from the alternate generated circus build. In particular, do not introduce:

- Runtime `<script>` injection
- `Function(...)` event execution
- CDN Tailwind injection
- A monolithic generated `App.jsx`
- Reconstructed HTML wrapped inside React

The existing stack is sufficient:

- React 18
- Vite 4
- React Router DOM 6
- Plain CSS
- Static client-side data

Do not migrate to Next.js, add a backend, add a database, or introduce a component framework.

## Phase discipline

Work on one phase only.

At the start of a phase:

1. Read the phase in the implementation plan.
2. Check `docs/BUILD-STATUS.md`.
3. Run baseline tests and `npm run build`.
4. Create or switch to the phase branch named in the plan.

During a phase:

- Complete tasks in order.
- Write the stated test before the implementation.
- Run the focused test after each change.
- Commit after each task.
- Update `docs/BUILD-STATUS.md` after every completed task.
- Do not perform work assigned to a later phase merely because it is nearby.

At the end of a phase:

1. Run `npm run test:run`.
2. Run `npm run build`.
3. Perform the phase manual checks.
4. Update the phase receipt in `docs/BUILD-STATUS.md`.
5. Stop and report what was completed, the test/build results, commit hashes, and any decisions required.

Do not begin the next phase without explicit user instruction.

## Evidence contract

Never invent, generalize, or silently transfer a product claim between surfaces.

These states are distinct:

```text
Not inspected          != absent
Declared               != connected
Connected              != repository-authorized
Account authenticated  != repository accessible
Local commit           != pushed
Repository present     != deployed
Memory stored          != available on this surface
Recognition            != behavioral binding
Transcript statement   != independent telemetry
```

Every substantive case claim must have one evidence classification:

- `receipt`
- `transcript`
- `official-source`
- `user-observed`
- `analysis`
- `unknown`
- `satire`

Rules:

- A receipt may support an analysis; an analysis may not masquerade as a receipt.
- A reconstructed transcript must retain its fidelity qualification.
- A claim with no adequate source renders as **Not established on this surface**.
- Do not add capability verdicts to all 35 surfaces. Most entries begin as `directory-only`.
- Do not reuse Cowork Web evidence for Cowork Desktop, Chat Web, Claude Code Web, or any other surface.
- Do not state product intent, motive, or malice as fact.

## Image contract

Generated images provide setting and metaphor, never exact factual content.

- Do not place important wording inside generated images.
- All headings, labels, evidence, numbers, and controls remain HTML or SVG.
- The app must work with image placeholders before assets arrive.
- Missing assets must not break layout or block a phase.
- Integrate only files listed in `docs/IMAGE-ASSET-HANDOFF.md`.
- Preserve supplied filenames; do not rename image assets casually.
- Add meaningful alt text from the asset manifest.
- Use `loading="lazy"` below the first viewport.
- The wheel remains functional SVG/CSS, not a raster image.

## Product constraints

- The 35-surface directory remains the homepage and primary navigation.
- The wheel shows numbers or compact monograms, not full rotated surface names.
- Full surface names remain upright in the ticket directory.
- Direct selection must always be available; spinning is optional.
- Cowork Web is the only full guided experience in the first release.
- Other surfaces receive honest passports or dossiers according to their evidence level.
- The experience is deterministic. Do not call an AI model to improvise case content.
- The first release is a static site and must build to `dist/`.
- Use `HashRouter` so deep routes function on static hosts without rewrite configuration.

## Accessibility requirements

- All controls must be keyboard operable.
- The wheel cannot be the only means of selecting a surface.
- Provide visible focus states.
- Use semantic buttons and links.
- Do not communicate status by color alone.
- Respect `prefers-reduced-motion`.
- Never flash marquee bulbs.
- Backstage evidence must open by click or keyboard, not hover only.
- Generated art requires alt text or an empty alt attribute when decorative.
- Maintain readable contrast and a logical heading order.

## Code-quality rules

- Keep files focused and under approximately 250 lines where practical.
- Move static content into data modules instead of embedding it in components.
- Put wheel math in pure functions with tests.
- Avoid new dependencies unless the current phase explicitly requires one.
- Search the repository before creating a component, utility, or data source.
- Prefer named exports for data and utilities; default exports are acceptable for page components.
- Never use `dangerouslySetInnerHTML` for case content.
- Never execute strings as code.
- Do not suppress test failures or accessibility warnings.

## Standard commands

```bash
npm install
npm run dev
npm run test:run
npm run build
npm run preview
```

Phase 3 adds:

```bash
npm run images:build
```

Phase 5 may add:

```bash
npm run test:e2e
```

## Required phase report

Use this exact structure when a phase ends:

```markdown
## Phase N completion receipt

- Branch:
- Commits:
- Working features:
- Tests: `<command>` -> `<result>`
- Production build: `<command>` -> `<result>`
- Manual checks completed:
- Assets integrated:
- Evidence/data changes:
- Known limitations:
- User decision required before next phase:
```

## Prohibited shortcuts

Do not:

- Replace the plan with another plan.
- Rewrite the site from scratch.
- Refactor unrelated configuration.
- Add 35 fictional case studies.
- use placeholder facts.
- call a surface unsupported because its evidence has not been assembled.
- block Phase 1 while waiting for imagery.
- state that a phase is complete without the recorded test and build receipts.

## Session discipline (standing memory — added 2026-07-19)

These rules bind every session working in this repository, and exist because this
repository's own build and review sessions repeatedly violated them. They are the
operational form of the repository's thesis (*recognition does not bind*) turned back on
the assistant that works here.

- **Commit every deliverable before ending a turn.** Work that is not committed does not
  exist. Never create work and then leave it uncommitted. If a turn produces files, the
  turn ends with `git commit` and `git push`, not with a promise to commit.
- **Keep the session record current.** When a session's own transcript or ledger lives in
  the repository, update it as part of the same work — do not let the committed record
  stop before the work it describes. A record that says "not done" beside a deliverable
  that says "done" is the exact contradiction this repository documents.
- **Never let activity substitute for the requested completion.** Analysis, narration,
  sophisticated alternative artifacts, and multi-agent machinery are not the deliverable
  unless the deliverable was analysis. Before ending a turn, check that the thing the user
  actually asked for has been produced — not merely that a lot happened.
- **Match the machinery to the task.** Do not spin up multi-agent workflows for work a
  direct edit accomplishes. Sizing work to an authorization ("go big") instead of to the
  question is how this repository's sessions wasted spend.
- **Verify before asserting; the operator is not your control plane.** Inspect the
  decisive file before claiming what it says. Do not require the operator to catch the
  omission you should have caught yourself.
