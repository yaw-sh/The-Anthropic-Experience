# Task 1 Report: One-folder repository and preserved Claude artifact

## Commit

- `refactor(repo): consolidate private product under one folder`
- This report is committed with the Task 1 boundary; the task handoff supplies the resulting commit SHA.

## Files and layout

- Moved every pre-existing tracked root path other than the outer `README.md` into `anthropic-experience/`, preserving the `app/`, `design/`, `docs/`, `evidence/`, `history/`, and `scripts/` relationships.
- Replaced the root README with a private-repository pointer and app run instructions.
- Preserved the prior repository map at `anthropic-experience/README.md` and added the Claude-artifact reference map.
- Copied the supplied `the-anthropic-experience.jsx` to `design/reference/claude-artifact/` outside the application runtime.
- Added `npm run check:root` in `app/`, backed by `scripts/verify-root-layout.mjs`.
- Updated the history rewrite/preparation/verification scripts and their focused tests to distinguish repository and content roots after nesting.
- Preserved the pre-existing uncommitted generated public-evidence change while relocating it; its contents were not edited in this task.

## Tests and verification

- RED: `npm run check:root` from the pre-move app failed with the expected extra root entries and a missing `anthropic-experience` entry.
- GREEN: `npm run check:root` from `anthropic-experience/app/` passed after the move and artifact copy.
- `python3 -m unittest discover -s scripts/tests`: 52 tests passed.
- `npm run typecheck`: passed.
- Byte equality between the preserved Claude artifact and the supplied source was verified during import; the raw digest is intentionally not retained in this tracked report.
- `git diff --check`: recorded after final staging below.

## Self-review

- Confirmed the tracked root layout is restricted to `README.md` and `anthropic-experience/`.
- Confirmed the artifact is not inside `app/` and is absent from runtime imports.
- Confirmed no raw Claude-artifact SHA-256 appears in tracked documentation or tests.
- Confirmed no remote or publishing operation was performed.

## Reviewer follow-up

- Replaced the machine-specific external-source hash comparison with repository-contained Git checks: the artifact must exist at its design-reference path, be tracked, exist in `HEAD`, and be unchanged from `HEAD` (including the index and worktree).
- Updated both Task 1 interface records to describe the portable Git-backed artifact check.
- Removed the exact artifact SHA-256 from this tracked report.
- `CLAUDE_ARTIFACT_SOURCE=/private/tmp/task1-artifact-source-missing npm run check:root`: passed, proving no external-source dependency remains.
- `npm run check:root`: passed.
- `npm run typecheck`: passed.
- `python3 -m unittest discover -s scripts/tests`: 52 tests passed.
- A source scan found no `/Users/hermes/Desktop` path or `CLAUDE_ARTIFACT_SOURCE` override in `scripts/verify-root-layout.mjs`.
- `git diff --quiet HEAD -- design/reference/claude-artifact/the-anthropic-experience.jsx`: passed.
- `git diff --check`: passed after final staging.

## Concerns

- None. The root-layout verifier now runs in a clean clone without an external source file or environment override.
