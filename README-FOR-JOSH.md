# THE ANTHROPIC EXPERIENCE — Starter Repository and Build Guide

This package combines the maintainable wheel prototype with a repository-ready Claude Code operating guide, product design specification, phased roadmap, implementation plan, image handoff contract, evidence rules, and build-status ledger.

## Why this source was selected

The starter uses the smaller wheel implementation from `The-Claude-Surface-Selector-Circus-Edition (1).zip`:

- Native React state controls the wheel.
- Styling is readable, conventional CSS.
- The production build succeeds.
- It can be refactored incrementally without preserving injected scripts or reconstructed HTML.

The larger circus version remains useful as visual and copy reference, but its runtime script injection and monolithic generated component should not be extended.

## Start here

1. Unzip this folder into the desired repository location.
2. Open a terminal in the repository.
3. Run:

   ```bash
   npm install
   npm run dev
   ```

4. Open Claude Code in the repository.
5. Give Claude Code this instruction:

   ```text
   Read CLAUDE.md, docs/BUILD-GUIDE.md, docs/IMAGE-ASSET-HANDOFF.md,
   docs/BUILD-STATUS.md, and
   docs/superpowers/plans/2026-07-18-anthropic-experience-implementation.md.
   Execute Phase 1 only. Do not begin Phase 2. Follow the tests, commits,
   evidence rules, and phase gate exactly.
   ```

## What Phase 1 delivers

A working and deployable circus directory containing:

- The 35-surface census
- A numbered 35-segment wheel
- Search and family filters
- Direct surface selection
- Random wheel selection
- Surface passport routes
- Honest evidence-level states
- A functional Cowork Web entry point
- No dependency on finished generated images

The remaining phases add the complete Cowork Web case, generated imagery, backstage receipts, production hardening, and optional additional surface dossiers in descending order of value.

## Plan validation

The Phase 1 instructions were replayed in a disposable copy of this source. The resulting implementation passed 12 automated tests across seven suites and produced a successful Vite production build.
