# Redaction and public-safety report

Generated on 2026-07-19 for `cleanup` scope.

## Transformation counts

- Unique phase transcripts: 6
- Generalized public events: 78
- Parsed source units represented: 6455
- Parsed source units covered by attributed ranges: 6455
- Source units collapsed, calculated as represented source units minus generalized public events: 6377
- Sensitive-pattern matches identified before generalization: 7235
- Raw denylist values published: 0
- Old commit mappings published: 0

## Verification results

| Check | Result |
|---|---|
| link | PASS |
| schema | PASS |
| provenance | PASS |
| duplicate | PASS |
| pii | PASS |
| path | PASS |
| trackedPath | PASS |
| url | PASS |
| archive | PASS |
| archiveMemberCoverage | PASS |
| ngramLeak | PASS |
| appBoundary | PASS |


The PII gate uses an external denylist plus email, absolute-path, private-URL, and session-identifier patterns. Explicitly allowlisted public ecosystem URLs are preserved wherever they occur; all other URLs are removed from generalized public prose. The denylist and original sensitive strings are intentionally not recorded here. The deterministic leak gate derives its deduplicated source corpus from the private source map and compares five-word normalized n-grams across every tracked generalized history, transcript, receipt, and research artifact. Its only exceptions are the two normalized five-word forms of the authoritative blueprint filename/title, which must remain stable as the canonical public document name.

The cleanup scope excludes `app/` content checks because that directory is owned by the concurrent product-build track; `appBoundary` compares the explicit base ref to `HEAD`, not merely the working tree. Integrated verification scans the tracked application tree while allowing approved public package and vendor URLs. It must rerun before any history rewrite or merge.

History rewrite dry run: PASS in an ephemeral local bare mirror. The rewrite verifier reported zero failures for removed or sensitive paths, archive binaries, binary privacy, sensitive blob/commit/tag content, ref names, commit identities, and tagger identities. Commit topology, ref topology, and author/committer/tagger timestamps were preserved. No remote ref was changed; destructive remote history replacement remains reserved for the integrated release.
