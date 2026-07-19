# Research Archive — Design System

An editorial, **forensic "research file"** design language, derived from a single source artifact: *THE ANTHROPIC EXPERIENCE — Research File* (`uploads/generated-page.html`), a sanitized chat-transcript document. Everything here — colors, type, spacing, components — is extracted from that one page. The system is built for **document surfaces**: transcripts, audit logs, ledgers, postmortems, evidence tables, dossiers.

> **Source:** `uploads/generated-page.html` (self-contained; originally Tailwind CDN + Iconify + Google Fonts). No codebase, Figma, or brand guidelines were provided — the artifact is the sole source of truth. There is **no logo**; the artifact uses a text monogram ("AE") in a dark tile, reproduced by `Navbar` / thumbnail.

---

## Content fundamentals

The voice is **precise, forensic, confessional, and unsoftened**. It reads like an internal incident report written by a careful investigator.

- **Person:** third-person and role-based ("the assistant", "the Operator"), not "I / you". Roles are capitalized proper nouns (Operator, Claude).
- **Tone:** clinical and evidentiary. Claims are paired with receipts (commit hashes, HTTP codes, file paths, timestamps). "All confessed failures are reproduced without softening."
- **Casing:** Sentence case in body; the document title is ALL-CAPS ("THE ANTHROPIC EXPERIENCE"); section headings are Sentence case ("Session ledger"). Micro-labels are UPPERCASE with wide tracking ("PARTICIPANTS", "DATE").
- **Emphasis:** `<strong>` for the load-bearing fact in a sentence; `<em>` for reframes and asides; inline `Chip` code for anything literal (`env | grep -i github`, `engineering/.mcp.json`, `HTTP 200`).
- **Numbers & precision:** exact and audited ("3h45m", "13 times", "35 surfaces", "~3 months"). Vague quantities are flagged as such.
- **Timestamps:** parenthetical, terse, mono — `(1745)`, `(20260718-1505)`.
- **Emoji:** none. Ever. Icons are line-style Iconify glyphs only.
- **Vibe:** a paper trail that takes itself seriously. Dry, exacting, quietly damning. No marketing gloss, no exclamation, no hedging once a fact is established.

Example copy: *"It has been sitting on this container's own disk, in a plugin you had installed, since the moment this session started. One `cat` command away."*

---

## Visual foundations

- **Palette:** a 10-step **zinc** neutral scale is the spine (page `#fafafa`, cards `#fff`, ink `#18181b`). Accents are used sparingly and semantically: **blue** = informational / the "assistant" (callouts, model chips), **emerald-500** = verified/positive status, **red** = critical evidence. Max one or two accent colors on screen at once.
- **Type:** **Inter** for all UI and editorial text (400/500/600/700); **JetBrains Mono** for code, data, IDs, timestamps and model tags. Headings are semibold with tight negative tracking (title -0.03em, sections -0.015em). Body reads at **15px / 1.55**. Micro-labels are 12px uppercase at 0.12em tracking.
- **Spacing:** Tailwind's 4px grid. Generous vertical rhythm — 48px between transcript turns, 64px between major sections, 64–96px page padding. Reading column capped at `max-w-4xl` (56rem); nav shell at `max-w-5xl`.
- **Backgrounds:** flat `#fafafa`. **No** gradients, images, textures, illustrations or patterns anywhere. The only "texture" is the hairline grid formed by zinc-200 showing through 1px gaps between white cells.
- **Borders:** everything is defined by 1px hairlines — `zinc-200` default, `zinc-100` for inner row dividers, `zinc-300` for avatar rings. Borders do the structural work that color would elsewhere.
- **Corner radii:** `rounded-md` (6px) chips/pills, `rounded-lg` (8px) tool logs/menus, `rounded-xl` (12px) cards/tables/callouts, `rounded-full` avatars/status pills/model-switch capsules.
- **Cards:** white, 1px `zinc-200` border, `rounded-xl`, and a very soft `shadow-sm` (`0 1px 2px rgb(0 0 0/.05)`). Low elevation throughout — nothing floats dramatically.
- **Shadows:** two steps only — `--shadow-xs` (cards/cells) and `--shadow-sm` (avatars, capsules). No large ambient shadows.
- **Transparency & blur:** reserved for the sticky nav — `bg-white/80` + `backdrop-blur`. Hover washes use translucent zinc (`bg-zinc-50/50` on rows, `bg-zinc-50` on menu items).
- **Callouts:** rounded card with a **colored left accent bar** (4px), tinted background, a leading line-icon, and a bold lead line — blue for notes, red for alerts. (This is the *one* place a left-accent-bar pattern is idiomatic — because it's in the source.)
- **Animation:** minimal and functional. `150ms` color/opacity/transform transitions on hover and dropdowns (standard ease). No bounces, no entrance animation.
- **Hover states:** text darkens toward `zinc-900`; rows/menu items get a subtle zinc wash. **Press:** none beyond the hover — this is a document, not an app.
- **Imagery:** none. Color vibe is cool, neutral, monochrome-with-signal-accents.

---

## Iconography

- **System:** [Iconify](https://iconify.design) `iconify-icon` web component, **Solar** icon set, **linear** (line) variants at `stroke-width="1.5"`. Loaded from CDN (`code.iconify.design/iconify-icon/1.0.7`). This is a **substitution-free** match — the source uses exactly this.
- **Glyphs in use:** `solar:user-linear` (human avatar), `solar:cpu-linear` (agent avatar), `solar:wrench-linear` (tool logs), `solar:info-circle-linear` (info callout), `solar:danger-triangle-linear` (alert callout), `solar:settings-linear` (model-switch), `solar:alt-arrow-down-linear`, `solar:printer-linear`, `solar:share-linear` (nav/menu).
- **No** emoji, no unicode-as-icon, no custom SVG. To use an icon in a component, pass an `icon` prop with a Solar name; the page must load the `iconify-icon` script.
- **No logo/brand mark** exists — render the wordmark or the "AE" monogram tile instead. Never invent a mark.

---

## Components

Reusable primitives, all derived from patterns present in the source. Import via `const { X } = window.ResearchArchiveDesignSystem_b308e3`.

- **Avatar** — round light circle (human) / dark square tile (agent) speaker glyph.
- **TranscriptTurn** — one message; human = left-ruled quote block, agent = prose with model chip + tool logs.
- **ModelSwitchDivider** — centered mono capsule on a hairline rule, marking a model swap / system break.
- **Badge** — compact status/label pill (neutral · info · status-with-dot · alert; `mono` for model chips).
- **Callout** — bordered note block with colored left accent bar (info / alert).
- **ToolLog** — monospace action-log receipt card (wrench icon; `critical` = red).
- **Chip** — inline monospace code token (paths, commands, env vars, hashes).
- **MetadataGrid** (+ `MetadataGrid.Cell`) — hairline-separated grid of labelled fields.
- **DataTable** — bordered ledger table with sunken header + zebra rows.
- **Card** — white/muted/flat rounded surface primitive.
- **Navbar** — sticky glass top bar with monogram tile + wordmark.
- **Dropdown** — quiet trigger + bordered white menu panel.

### Intentional additions
None. Every component maps to a pattern that exists in the source document; no primitives were invented.

---

## Index / manifest

- `styles.css` — entry point (imports only). Consumers link this.
- `tokens/` — `fonts.css`, `colors.css`, `typography.css`, `spacing.css`, `effects.css`.
- `components/` — `transcript/` (Avatar, TranscriptTurn, ModelSwitchDivider) · `feedback/` (Badge, Callout, ToolLog) · `data/` (Chip, MetadataGrid, DataTable) · `surfaces/` (Card) · `navigation/` (Navbar, Dropdown). Each has `.jsx` + `.d.ts` + `.prompt.md` + a `@dsCard` HTML.
- `guidelines/` — foundation specimen cards (Colors, Type, Spacing, Effects).
- `ui_kits/research-archive/` — full document recreation (`index.html` + screen JSX). Also a Starting Point.
- `thumbnail.html` — homepage tile. `SKILL.md` — downloadable Agent-Skill wrapper.
- Generated (do not edit): `_ds_bundle.js`, `_ds_manifest.json`, `_adherence.oxlintrc.json`.

## Caveats
- **Fonts** load from Google Fonts via `@import` (Inter + JetBrains Mono — the real families, not substitutions). No local binaries are bundled; add `@font-face` files if you need offline use.
- The UI kit abridges the transcript to pivotal turns for preview; the source runs to Turn 59.
