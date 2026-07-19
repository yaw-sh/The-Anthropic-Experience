# THE ANTHROPIC EXPERIENCE — Archive Disposition

This document classifies the supplied archive for the clean-room build.

## Disposition labels

- **PUBLIC-SEED** — may inform public structured content after claim-level review; do not copy blindly.
- **VISUAL-REFERENCE** — may guide design; code/copy is not canonical.
- **PRIVATE-EVIDENCE** — retain outside the public repository; cite only through approved public records.
- **QUARANTINE** — contains high-risk personal, operational, raw-transcript, or research material; no build-time access.
- **DISCARD-AS-BASE** — do not continue or port as architecture.
- **REGENERATE** — produce a new public-safe version from approved inputs.

---

## Top-level files

| Path | Disposition | Reason / action |
|---|---|---|
| `Claude-Failure-Analysis.md` | PRIVATE-EVIDENCE / QUARANTINE | Meta-conversation with raw owner language, public conversation URL, time-sensitive GitHub claims, and planning discussion. It is not an independent primary source. Retain privately; do not ship. |
| `THE-ANTHROPIC-EXPERIENCE-FORENSIC-HANDOFF.md` | PRIVATE-EVIDENCE / VISUAL-REFERENCE | Strong forensic synthesis, but 1,317 lines of mixed fact, recommendation, prompt, architecture, and unverified time-sensitive state. Use as background only; replace with the shorter directive. |
| `anthropicexperiencefulltranscript.md` | QUARANTINE | Build-session transcript; duplicated twice elsewhere. Contains raw language, operational details, tool/session material, and extensive unrelated injected instructions. Never enter public repo. |
| `.DS_Store`, `__MACOSX/*` | DISCARD | OS metadata only. |

---

## `repo_current_state/`

### Repository root

| Path | Disposition | Reason / action |
|---|---|---|
| `.gitignore` | DISCARD-AS-BASE | Generic generated template containing irrelevant framework entries. Create a focused new ignore file. |
| `CLAUDE.md` | PRIVATE-EVIDENCE / VISUAL-REFERENCE | Useful operating principles, but conflicts with actual package versions and the new clean-room scope. Do not make it normative. |
| `LICENSE` | REGENERATE | MIT may be appropriate for code, but not automatically for transcripts, evidence, generated art, screenshots, or third-party references. Split code/content/assets terms. |
| `README.md` | REGENERATE | Presents project as complete, links to a historical Artifact, claims public-edition-only while full transcript exists, and repeats stale/overbroad assertions. |

### `app/`

| Path group | Disposition | Reason / action |
|---|---|---|
| `app/src/App.jsx`, `app/src/index.css` | VISUAL-REFERENCE / DISCARD-AS-BASE | Attractive 10-surface wheel only. No case, routing, evidence, tests, or image integration. Cute voice conflicts with required tone. Reimplement selectively. |
| `app/src/main.jsx`, config files | DISCARD-AS-BASE | Minimal starter configuration; new repo should use pinned current tooling and TypeScript. |
| `app/package.json`, lockfile | DISCARD-AS-BASE | Wrong package name, version drift from docs, unused packages, no tests/lint/typecheck, no engine pin. |
| `app/README.md` | REGENERATE | Gives commands from the wrong directory and cites a disposable 12-test replay not present in supplied repo. |
| `app/public/images/*/README.md` | DISCARD | Placeholder files only. |
| generated `node_modules/`, `dist/` from review | DISCARD | Local review artifacts, not part of the original archive. |

### `artifact/`

| Path group | Disposition | Reason / action |
|---|---|---|
| `artifact/the-anthropic-experience.html` | PRIVATE-EVIDENCE / VISUAL-REFERENCE | Best visual/narrative prototype, but monolithic, embeds all assets/data, uses raw HTML insertion, exposes operational strings, contains contradictory/stale claims, and is not reproducible. Never use as canonical source. |
| `artifact/data/case-data.json` | PRIVATE-EVIDENCE / PUBLIC-SEED | Contains useful candidate facts and copy, but mixes reconstructed claims, user observations, analysis, stale statements, private detail, and unsupported causal language. Adjudicate claim by claim. |
| `artifact/data/research-data.json` | QUARANTINE | Includes Fellows/safety material and literature synthesis unsuitable for v1. |
| `artifact/data/transcript-thread.json` | QUARANTINE | Derived transcript HTML and appendices; duplicates sensitive source material and retains operational details. |
| `artifact/src/part1-css.html` | VISUAL-REFERENCE | May inform tokens/ornament; do not port wholesale. |
| `artifact/src/part2-body.html` | PRIVATE-EVIDENCE / VISUAL-REFERENCE | Copy and structure reference only; contains stale and sensitive assertions. |
| `artifact/src/part3-js.html` | DISCARD-AS-BASE | Monolithic DOM/string renderer with `innerHTML`; replace with typed components. |
| `artifact/src/assemble.py` | DISCARD-AS-BASE | Hard-coded Claude sandbox and user paths; missing expected inputs; non-reproducible. |
| `artifact/src/build_public_edition.py` | DISCARD-AS-BASE | Narrow five-gram privacy test capable of false-clean result; hard-coded upload/scratch paths. |
| `artifact/src/parse-transcript.js` | DISCARD-AS-BASE | Hard-coded dependency path, fixed turn count, lossy model mapping, Markdown-to-HTML injection path. |

### `design/`

| Path group | Disposition | Reason / action |
|---|---|---|
| `design/reference/TheClaudeSurfaceSelectorCircusEdition_1.zip` | VISUAL-REFERENCE | Source of current maintainable 10-surface wheel. Reference only. |
| `design/reference/TheClaudeSurfaceSelectorCircusEdition.zip` | VISUAL-REFERENCE / DISCARD-AS-BASE | Larger generated prototype with monolithic/injected architecture and unsupported per-surface copy. |
| `design/source-images/*.jpg` | PRIVATE-EVIDENCE / PUBLIC-SEED | Strong candidate assets. Move only after provenance, rights, metadata, alt/decorative, crop, and hash approval. |
| image/reference README files | PRIVATE-EVIDENCE | Useful provenance narrative but not sufficient as a public asset manifest. |

### `docs/`

| Path group | Disposition | Reason / action |
|---|---|---|
| `docs/BUILD-GUIDE.md` | PRIVATE-EVIDENCE / VISUAL-REFERENCE | Useful phased thinking and data-contract ideas, but tied to old scope and current tree. |
| `docs/BUILD-STATUS.md` | PUBLIC-SEED | Core receipt showing Phase 0/not started. Reproduce only approved facts in structured claims; retain original privately. |
| `docs/IMAGE-ASSET-HANDOFF.md` | PRIVATE-EVIDENCE / PUBLIC-SEED | Useful naming/alt/provenance starting point; incomplete rights record. |
| `docs/superpowers/specs/*` | PRIVATE-EVIDENCE / VISUAL-REFERENCE | Coherent but overweights 35-surface wheel and old architecture. |
| `docs/superpowers/plans/*` | PRIVATE-EVIDENCE / VISUAL-REFERENCE | 22-task/112-step plan is a central historical receipt, but not the next implementation plan. |
| `docs/evidence/chattranscript-*-public-edition.md` | QUARANTINE | Generalized operator turns do not make the remaining assistant/tool/config material public-safe. |
| `docs/evidence/full-session-transcript-verbatim.md` | QUARANTINE | Direct contradiction with held-out/public-edition rule. Never copy into new repo. |
| `docs/evidence/incidents/2026-07-18-build-session.md` | PRIVATE-EVIDENCE / PUBLIC-SEED | Valuable first-person ledger; categories and totals require adjudication. |
| `docs/evidence/incidents/2026-07-19-phase-zero.md` | PRIVATE-EVIDENCE / PUBLIC-SEED | Strongest structural account. Public site should extract narrow approved facts rather than copy the whole essay. |
| `docs/evidence/research/*` | QUARANTINE | Literature review contains orphaned citations and future/current research claims requiring external verification. |
| `docs/evidence/sources/README.md` | PRIVATE-EVIDENCE | Its “held out” statement is contradicted by the tree. Useful as evidence of drift. |
| `docs/media/artifact-hero.png` | VISUAL-REFERENCE / STALE | Hero screenshot says six failures while current artifact says at least sixteen and ledger says 17. Never use as current proof. |
| `docs/media/connected-in-settings.png` | PRIVATE-EVIDENCE / PUBLIC-SEED | Potentially central screenshot. It establishes UI state only; inspect provenance/metadata and owner-approve publication. |

---

## `source_build_data/`

| Path | Disposition | Reason / action |
|---|---|---|
| `claude.md` | QUARANTINE | Assistant-reconstructed/redacted session record, not a byte-perfect export. Candidate excerpts require fidelity labels. |
| `chatgpt.md` | QUARANTINE | Contains pasted/shared source material, raw language, analysis, and personal context; not independent corroboration by default. |
| `eve_transcript.md` | QUARANTINE | Separate, sensitive, scope-expanding case. Exclude from v1. |
| `deep-research-report.md` | PRIVATE-EVIDENCE / QUARANTINE | Useful research memo but 92 dead internal citations and no publication-ready source registry. Rebuild externally from primary sources. |
| `generated-page.html` | VISUAL-REFERENCE | Strong Research Archive reference. Do not ship or treat generated code as canonical. |
| `Research Archive Design System-handoff.zip` | VISUAL-REFERENCE | Useful components/tokens; inspect provenance, external fonts/icons, and licensing before adaptation. |
| `Research findings abstract conversion.pdf` | QUARANTINE | Image-only proposal draft without references/method apparatus. Separate future research output. |
| `rescaled.zip` | PRIVATE-EVIDENCE / PUBLIC-SEED | Original high-resolution scene assets; contains macOS metadata entries. Extract privately, provenance-review, optimize, and copy approved derivatives only. |
| `ChatGPT Image Jul 18, 2026, 05_01_46 PM.png` | PRIVATE-EVIDENCE / PUBLIC-SEED | Byte-equivalent visual to the settings screenshot after content comparison; retain one approved derivative and provenance record. |
| duplicate `anthropicexperiencefulltranscript.md` | QUARANTINE / DEDUPLICATE | Exact duplicate of top-level file. |
| `claude_build_attempt/` | PRIVATE-EVIDENCE | Historical attempt/reference only; do not import as implementation. |
| `react_wheels/` | VISUAL-REFERENCE | Duplicate/extracted prototype sources; retain privately, not public tree. |

---

## `source_build_data/fellows/`

Treat the entire Fellows subtree as **QUARANTINE** for public v1.

Reasons:

- it is an application/research corpus, not necessary to tell the product case;
- it contains sensitive professional, health-adjacent, education, student/IEP, and personal-context concerns;
- its own README suspends a prior “consenting-adult/no real students” framing;
- its findings are based on sampled, hand-coded windows, not a corpus-wide controlled study;
- it contains raw workflow journals and subagent records;
- its provider split complicates a provider-specific public narrative;
- it requires separate ethics, literature, sampling, and publication review.

Specific salvage, privately:

- `REPORT.md` — methodology honesty, controls, rates with denominators, and provider-asymmetry caution.
- `CASE-STUDY-01-*` — candidate claim map, but correct independence and causation language.
- `RECONCILIATION-*` — warning that prior art exists and privacy flags remain unresolved.
- `THESIS.md` — future research framing only; remove “only known” novelty language unless externally established.
- `NEXT-MOVES.md` — owner planning only; never public.
- `data/raw-transcripts/`, `transcripts/`, `source_chat.md` — strict quarantine.

---

## Clean-room import rules

The new repository may receive only:

1. hand-written or generated public schemas;
2. adjudicated records whose `sensitivity` is `public` and `status` is `approved`;
3. owner-approved public copy fields;
4. approved asset derivatives listed in the new asset manifest;
5. fresh implementation code, tests, and documentation;
6. a release manifest generated from verified command output.

The new repository must never mount or read the private archive during ordinary CI or production build. A local one-way approval/export utility may read the private vault, but it must emit only validated public records into a temporary directory for review.

---

## Destruction and retention guidance

- Preserve the original zip and its SHA-256 in private archival storage.
- Preserve this review pack separately.
- Do not delete the evidence archive merely because a public release exists.
- Do not upload the archive to public CI, issue trackers, design tools, or deployment storage.
- Delete temporary extraction directories, `node_modules`, build outputs, screenshots, and scan reports from shared environments after the handoff is accepted.
- Before any public repository is initialized, verify that the working directory contains only the approved clean-room tree.
