# Task 2 repair report

## Decisions

- The six authoritative catalog metadata records declare 78 generalized events. Tests now derive the expected event total from that metadata instead of asserting the stale value of 45.
- Transcript search retains metadata, tag, and generalized-event prose matching. The regression queries `observable completion`, a phrase absent from transcript metadata and tags, and verifies the matching `Access and request` transcript; `TranscriptTheater` was not changed.
- `sync:content` is the explicit tracked generator. `check:content` byte-compares authoritative integrated evidence with `src/generated/public-evidence.json`; `prepare:content` checks first and refreshes only ignored `public/evidence`.
- Canonical/artifact parity and source/canonical-bundle/artifact-bundle privacy receipts are deterministic tracked files under `app/verification/`. Build and privacy checks compare them rather than refreshing tracked files.
- Passing release checks now cite committed evidence paths only; the release verifier validates each path is tracked and does not timestamp or rewrite the receipt.

## Files

- Updated content modes, parity/privacy/release scripts, package scripts, generated release facts, and release verification metadata.
- Added five tracked deterministic verification receipts and a content-mode regression test.
- Updated stale event-count, transcript-search, privacy-command, and final-audit evidence tests.
- Preserved the controller edits to this task brief and the governing plan.

## Verification

- Red: focused regression run failed for the absent content modes and ignored `dist` release evidence, as expected.
- Green: focused tests passed (49/49).
- Full: `npm test` passed (132/132); `npm run typecheck`; `npm run lint`; `npm run build`; `npm run build:artifact`; `npm run verify:parity`; `npm run privacy`; and elevated `npm run release:verify` all passed.
- Release browser coverage: 43 passed, 2 intentionally skipped responsive-only cases; artifact 2/2 and dev-CSP 1/1 passed.

## Remaining concern

Vite continues to emit its existing JavaScript chunk-size advisory; the enforced performance budgets pass for both build modes.

## Review follow-up

- Removed the immutable historical ref/fallback from the final audit. It now compares the committed generated catalog to current authoritative metadata, derives the event count, locks the current total at 78, and validates the committed bundle directly.
- Excluded the target privacy receipt from both `fileCount` and the receipt digest. An isolated absent-receipt write followed immediately by check now reports the same 73 files, and the unit regression proves the bytes remain identical after the receipt exists.
- Added a functional isolated `--check` regression that snapshots every path, byte, and file mode before and after execution.
- Follow-up focused tests passed (60/60). `npm test` passed (134/134), and typecheck, lint, canonical build, artifact build, parity, and source privacy all passed; isolated absent-receipt generation/check reported the same 73-file receipt on both runs, and the current-bundle audit passed outside a Git repository.
