# design/ — scene assets and prototype references

Visual source material for THE ANTHROPIC EXPERIENCE. The asset manifest (naming, alt text,
provenance, integration status) is `../docs/IMAGE-ASSET-HANDOFF.md`.

## `source-images/` — delivered scene assets

Ten archival crops (2048px wide JPEGs). Nine fill the manifest act/hero slots; one is an
alternate hero backdrop pending a hero-vs-alternate decision. Optimization to WebP and app
integration are Phase 3 work — the app must use CSS/SVG placeholders until then.

| File | Manifest slot |
|---|---|
| `hero-big-top--wide.jpg` | `hero-big-top` (homepage hero) |
| `hero-big-top--alt--wide.jpg` | alternate hero backdrop (not a manifest slot) |
| `act-funhouse--wide.jpg` | `act-funhouse` |
| `act-hidden-capabilities--wide.jpg` | `act-hidden-capabilities` |
| `act-three-rings--wide.jpg` | `act-three-rings` |
| `act-high-wire--wide.jpg` | `act-high-wire` |
| `act-control-plane--wide.jpg` | `act-control-plane` |
| `act-paperwork--wide.jpg` | `act-paperwork` |
| `act-backstage--wide.jpg` | `act-backstage` |
| `act-prize-booth--wide.jpg` | `act-prize-booth` |

## `reference/` — prototype reference archives

| File | What it is |
|---|---|
| `TheClaudeSurfaceSelectorCircusEdition_1.zip` | Source of the maintainable 10-surface wheel prototype (the implementation base in `../app/`). Reference only. |
| `TheClaudeSurfaceSelectorCircusEdition.zip` | Larger generated prototype with monolithic/injected architecture. Reference only; do **not** port as architecture. |

> Filenames follow the asset manifest and are referenced by `../docs/IMAGE-ASSET-HANDOFF.md`
> and the review pack's disposition doc — preserved as-is, not renamed.
