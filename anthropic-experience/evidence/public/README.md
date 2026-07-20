# Public content interface

`catalog.json` is the stable index consumed by the canonical application. Each item points to one JSON transcript in `transcripts/`.

Interface version `1.0.0` uses blueprint-aligned fields: stable event `id`, `transcriptId`, one-based `index`, `speaker`, generalized `text`, `fidelity`, `tags`, `redactions`, `approvedForPublic`, and `sourceRanges`. Public renderers must display the transcript-level generalization notice and must never label these events verbatim.

The cleanup track owns generation and validation. The product track may consume these files but must not create alternate transcript copies.
