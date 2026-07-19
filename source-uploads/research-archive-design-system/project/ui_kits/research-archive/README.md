# Research Archive — UI Kit

A faithful recreation of the **THE ANTHROPIC EXPERIENCE** sanitized-transcript document — the single surface this design system is derived from. It is an editorial/forensic research file: a sticky glass nav, a document header with a metadata grid, a blue fidelity note, a summary ledger table, and a long alternating human/agent transcript with tool-log receipts and model-switch dividers.

## Files
- `index.html` — the assembled, scrollable document (mount point; also a Starting Point).
- `ArchiveHeader.jsx` — title, `MetadataGrid`, `FidelityNote` (`Callout`).
- `ArchiveLedger.jsx` — `SectionHeading`, `DataTable` of strikes, muted summary `Card`. Exports `SectionRule` / `SectionHeading` helpers.
- `ArchiveThread.jsx` — the transcript: `TranscriptTurn` (user + agent), `ToolLog`, `ModelSwitchDivider`, inline `Chip`.

## Composed from
Navbar · Dropdown · Badge · MetadataGrid · Callout · DataTable · Card · Chip · TranscriptTurn · ToolLog · ModelSwitchDivider — every family in the system appears here. No new visuals are invented; this only replays the source document's design.

## Notes
The transcript is abridged to the pivotal turns (1, 2, 5, 8, 10, 25, 49) for a representative preview; the full source runs to Turn 59. Content is illustrative sample copy carried from the source artifact.
