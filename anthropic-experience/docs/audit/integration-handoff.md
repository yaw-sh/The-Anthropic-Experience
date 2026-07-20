# Integration handoff

The product and cleanup tracks started from the same verified `main` state and remain separately visible.

## Cleanup outputs

- Binding decisions: `OWNER-DECISIONS.md`
- Canonical phase history: `history/`
- Shared application interface: `evidence/public/catalog.json` and `evidence/public/transcripts/*.json`
- Public-safe receipts: `docs/audit/public-content-manifest.json`, `deduplication.json`, `transcript-manifest.json`, and `redaction-report.md`
- Rewrite preparation: `scripts/prepare_rewrite_inputs.py`, `rewrite_history.sh`, and `verify_rewritten_history.py`

## Integration sequence

1. Merge or apply the product track without replacing the cleanup track’s `evidence/public/` interface.
2. Rerun `scripts/build_public_history.py` from the integrated tree with the external private denylist, private source map, and verified historical source ref.
3. Run `scripts/verify_public_history.py --scope integrated` with explicit base, source-map, denylist, and private removal-path inputs; every check must pass. This command scans only tracked Git paths and mechanically rechecks source existence, blob deduplication, role attribution, range bounds, overlap, coverage, collapsed counts, replacement counts, rendered image/PDF dispositions, and five-word leakage across all generalized artifacts.
4. Create the external ephemeral rewrite inputs from the explicit base and private extra-removal list. Do not commit or publish the values, old-object inventory, path list, or ref mapping.
5. Run `scripts/rewrite_history.sh` only against a new mirror under an ephemeral temporary path.
6. Run `scripts/verify_rewritten_history.py` against that mirror and preserve only its public-safe pass/fail counts. The verifier covers every historical filename, ref name, blob, commit message, annotated-tag message, commit identity, tagger identity, archive signature, topology edge count, and author/committer/tagger timestamp inventory.
7. Review the rewritten integrated `main` tree and product behavior before any authorized force-push.
8. After authorization, replace remote history once, re-fetch into a clean clone, rerun integrated verification, and confirm visibility on `main`.

The Track B ephemeral mirror dry run passed all rewrite checks before handoff: removed and sensitive paths, archives, binary privacy, text privacy, ref names, identities, topology, timestamps, and canonical-head presence. The integration track must regenerate the private inputs and rerun the same checks after combining the product and cleanup trees.

No destructive remote rewrite, force-push, or merge is authorized merely by this handoff. The ephemeral local rewrite dry run is part of Track B verification. Completion requires the integrated product, verified rewritten history, and default-branch visibility.
