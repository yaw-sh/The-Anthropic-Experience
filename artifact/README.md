# artifact/ — the published Claude Artifact

A self-contained, single-file HTML build of THE ANTHROPIC EXPERIENCE, published as a
Claude Artifact. It is the best **visual and narrative** prototype in the repository — and,
per `../anthropic_experience_review_pack/ARCHIVE-DISPOSITION.md`, it is **VISUAL-REFERENCE,
not the canonical engineering base**. It was built outside the repository's phased plan;
the account is in `../docs/evidence/incidents/2026-07-19-phase-zero.md`.

## Files

| Path | What it is |
|---|---|
| `the-anthropic-experience.html` | The published single-file artifact (~3.78 MB, ~1,836 lines): assembled CSS, body, and JavaScript with data and assets embedded. Reproducible only via the build sources below. |
| `src/part1-css.html` | Assembled CSS part (build input). |
| `src/part2-body.html` | Assembled body/markup part (build input). |
| `src/part3-js.html` | Assembled JavaScript part (build input). |
| `src/assemble.py` | Concatenates the three parts (plus data) into the single-file artifact. |
| `src/build_public_edition.py` | Produces the public-edition transcript with a privacy scan before embedding. |
| `src/parse-transcript.js` | Parses the raw session transcript into the structured thread used by the artifact. |
| `data/case-data.json` | The Cowork Web case: claims, evidence classifications, the strike ledger, the connection stack. Adjudicate claim by claim before reuse. |
| `data/research-data.json` | The research wing: the thesis, the Availability→Inspection→Binding framework, the scorecard, the literature review. |
| `data/transcript-thread.json` | The derived transcript thread rendered inside the artifact. |

## Cautions

- The single-file artifact embeds all assets and data; do not treat its assembled code as
  the canonical source. Mine it for content, information architecture, and validated
  interaction concepts.
- `data/` files mix reconstructed claims, user observations, and analysis. Some carry stale
  statements the review pack flags (e.g. an uncaveated "every failure was Anthropic-side"
  claim that the machine-read claims register rejects). Verify against
  `../anthropic_experience_review_pack/public-claims-register.seed.json` before republishing
  any claim.
