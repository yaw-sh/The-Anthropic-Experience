# Current ChatGPT Pro transcript ingestion specification

The owner will supply the full transcript of the Pro review and correction sequence.

## Required exact turn groups

1. Original request to review `the_anthropic_experience.zip` and create the next-session handoff.
2. Pro delivery of the review packs and the recommendation to narrow the product.
3. Owner question confirming pack contents and discussing the Fellows thesis.
4. Pro response extending the thesis while still not producing the requested creative blueprint.
5. Owner statement that Pro missed the point and attachment of the prior chat.
6. Pro admission: “I did not merely miss the tone. I misclassified the product.”
7. Owner question: “So you missed the point just as much as Claude, did you not?”
8. Pro admission that it produced “a forensic appendix pretending to be that blueprint.”
9. Owner request for this complete creative and technical blueprint.
10. Final blueprint delivery.

## Ingestion rules

- Preserve exact wording, speaker, and timestamp when exported.
- Assign stable IDs `pro-0001`, `pro-0002`, etc.
- Tag turns with `instruction`, `substitute`, `scope-reduction`, `correction`, `admission`, `binding-failure`, and `completion` as applicable.
- Redact only owner-approved personal identifiers; mark every redaction.
- Hash the source file and publish the public-safe hash.
- Link the Pro scene punchlines to exact turn ranges.
- Do not replace exact admissions with summaries when the exact text is public-approved.
