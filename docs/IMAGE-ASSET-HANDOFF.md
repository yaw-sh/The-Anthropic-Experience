# Image Asset Handoff — THE ANTHROPIC EXPERIENCE

## Purpose

This contract lets image generation continue independently while Claude Code builds the working site. No implementation phase should wait for a finished image.

Generated images carry atmosphere, metaphor, and scene comprehension. HTML and SVG carry all exact wording, labels, numbers, controls, and evidence.

## Source and output directories

Place approved source generations here:

```text
design/source-images/
```

Use two source crops per scene when possible:

```text
<asset-id>--wide.png       16:9 or wider
<asset-id>--mobile.png     3:4 or 4:5
```

Phase 3 creates optimized deployment files here:

```text
public/images/scenes/<asset-id>--wide.webp
public/images/scenes/<asset-id>--mobile.webp
public/images/families/<family-id>.webp
```

Do not commit raw generations larger than necessary to deploy. Retain full-resolution originals outside the production bundle or use Git LFS if the repository owner explicitly chooses it.

## Required scene assets

| Asset ID | Scene | Wide target | Mobile target | Minimum safe overlay area |
|---|---|---:|---:|---|
| `hero-big-top` | Homepage directory and wheel stage | 1600×900 | 900×1200 | Center circle and lower foreground |
| `act-funhouse` | Identical doors and fragmented state | 1600×900 | 900×1200 | Door-side label zones |
| `act-hidden-capabilities` | Installed capability left uninspected | 1600×900 | 900×1200 | Cabinet and evidence-card zone |
| `act-three-rings` | Availability, inspection, binding | 1800×700 | 900×1200 | Above or below each ring |
| `act-high-wire` | Authorization-state sequence | 1600×900 | 900×1200 | Alongside each platform |
| `act-control-plane` | User forced to operate backstage | 1600×900 | 900×1200 | Backstage task-callout zones |
| `act-paperwork` | Analysis and governance multiplying | 1600×900 | 900×1200 | Original task and output counter zones |
| `act-backstage` | Frontstage versus evidence view | 1600×900 | 900×1200 | Backstage evidence panel |
| `act-prize-booth` | Final scoreboard and unresolved task | 1600×900 | 900×1200 | Scoreboard and return control |

## Family medallions

| Family ID | Symbol direction |
|---|---|
| `code` | Mechanical automaton at a terminal-like keyboard |
| `chat` | Two theatrical speaking trumpets |
| `projects` | Locked traveling filing cabinet |
| `cowork` | Stagehand tool belt and clipboard |
| `extensions` | Many-pocketed magician suitcase |
| `developer` | Brass control console with levers and sockets |
| `cloud` | Circus airship tethered to multiple tents |

Medallions should be isolated, front-facing, and delivered with transparent backgrounds when the generator supports transparency.

## Universal generation requirement

Every generation must follow this rule:

```text
No readable words, letters, numbers, logos, trademarks, captions,
watermarks, or typographic marks. Signs, tickets, labels, posters,
documents, screens, and plaques must remain blank for HTML overlay.
```

## Visual consistency

All assets must use the approved style anchor:

- Mature satirical editorial circus, not a children’s circus
- Hand-painted gouache and vintage lithographic texture
- Deep oxblood, aubergine, tobacco brown, aged cream, tarnished brass, dusty mustard, restrained faded teal
- Heavy ink contours and clear silhouettes
- Beautiful, witty, elaborate, slightly ominous
- Avoid clowns, balloons, candy colors, glossy 3D, modern corporate illustration, neon AI aesthetics, and generated lettering

## Asset manifest entry

When delivering an image, add an entry to `src/data/assets.js` during Phase 3 with this shape:

```js
{
  id: "act-three-rings",
  wideSrc: "/images/scenes/act-three-rings--wide.webp",
  mobileSrc: "/images/scenes/act-three-rings--mobile.webp",
  alt: "Three circus rings show available evidence, inspection, and a broken chain to action.",
  decorative: false,
  focalPoint: "50% 50%",
  status: "approved",
}
```

## Handoff checklist

For each image:

- [ ] Correct asset ID in the filename
- [ ] No generated lettering or logos
- [ ] Principal subject remains legible at website size
- [ ] Wide and mobile compositions supplied or crop approved
- [ ] Safe area exists for HTML overlay
- [ ] Palette matches the style anchor
- [ ] Alt text drafted
- [ ] `docs/BUILD-STATUS.md` asset row updated

## Placeholder behavior

Until an asset is approved, the application renders a CSS/SVG scene placeholder with:

- Scene title
- Asset ID
- Stable aspect ratio
- Circus-frame treatment
- No broken image icon

A missing image is not a build blocker.
