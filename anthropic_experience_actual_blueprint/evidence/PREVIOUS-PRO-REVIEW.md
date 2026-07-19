# THE ANTHROPIC EXPERIENCE — Pro Forensic and Product Review

**Review date:** 2026-07-19  
**Archive reviewed:** `the_anthropic_experience(2).zip`  
**Purpose:** establish what is actually present, what is defensible, what should be discarded or held private, and what Codex should build next.

---

## Executive verdict

The archive contains enough material to make an unusually strong documentary product, but it does **not** contain a coherent implementation that should simply be continued.

It contains three different projects occupying the same repository:

1. A small React wheel prototype in `repo_current_state/app/`.
2. A substantially richer, 3.78 MB self-contained HTML documentary in `repo_current_state/artifact/`.
3. A private research program in `source_build_data/fellows/` about evidence use, memory, binding, and safety.

The failed build is not merely unfinished. Its implementation, evidence, privacy, and publication models contradict one another. The right next step is therefore a **clean-room reconstruction**, not incremental repair of the current tree.

The strongest public product is narrower than the inherited plan:

> **Document two linked events:** the original GitHub/connector session, and Claude’s later failure to build the documentary about that session. Present the exact difference between requested work, substitute output, evidence inspected, claims made, and verified completion.

The 35-surface census can remain as a small, explicitly dated appendix. It should not be the homepage, the primary narrative, or a claim that Anthropic has exactly 35 comparable “products.” The Fellows research, EVE transcript, raw conversation exports, vulnerable-person framing, and literature paper should remain outside public v1.

The central editorial correction is also important:

> The defensible charge is **not** “nothing happened.” Substantial output happened. The charge is that Claude produced elaborate substitute work while the requested implementation remained at Phase 0, then failed the verification and privacy system it had itself documented.

That distinction is both more accurate and more damaging.

---

## What I reviewed

I performed a structural inventory of all 108 original files in the archive, totaling 59,730,000 bytes. I pattern-scanned all 88 text-readable files and reviewed the primary materials in depth:

- `Claude-Failure-Analysis.md`
- `THE-ANTHROPIC-EXPERIENCE-FORENSIC-HANDOFF.md`
- all three identical copies of `anthropicexperiencefulltranscript.md`
- the current repository source, configuration, data, documentation, screenshots, image assets, and build scripts
- `source_build_data/claude.md`, `chatgpt.md`, `eve_transcript.md`, and `deep-research-report.md`
- the Fellows thesis, report, case study, reconciliation, next moves, lane reports, oversight records, and supplied raw-workflow records
- the five-page research PDF, rendered visually because it is image-only
- both wheel prototype archives
- the nested Research Archive design-system archive
- the ten original scene-image files and optimized copies

I also ran the current React production build, parsed all repository JSON files, statically audited the HTML artifact, and executed the three supplied artifact build scripts to test reproducibility.

Duplicate and generated subagent records were included in the structural, hash, and sensitive-content audit. I did not treat duplicate copies, reconstructed summaries, or downstream analyses as independent corroboration merely because they appear in separate files.

This review did **not** independently re-run the external literature search or revalidate current Anthropic, GitHub, Cloudflare, model, product, or publication facts on the web. That work belongs in the separate outward-research session the owner described. Any time-sensitive claim must be revalidated before publication.

---

## Archive facts at a glance

| Item | Verified state in supplied archive |
|---|---:|
| Original files | 108 |
| Original bytes | 59,730,000 |
| Text-readable files | 88 |
| Current repo contains `.git/` | No |
| React app surfaces | 10 |
| Artifact surface rows | 35 |
| React tests | 0 |
| CI workflows | 0 |
| Open implementation-plan checkboxes | 112 |
| Current build-status phases 1–5 | Not started |
| Self-contained artifact size | 3,783,931 bytes |
| Artifact gzip size | 2,703,835 bytes |
| Embedded artifact images | 10 |
| Artifact responsive image sources | 0 |
| Artifact `<h1>` elements | 2 |
| Raw `innerHTML` assignments/usages in artifact source and output scan | 52 across four files |
| Identical full build-transcript copies | 3 |
| Dead ChatGPT citation markers in research report | 92 |
| Supplied artifact build scripts reproducible from archive | No |

The archive-wide heuristic scan found many items requiring human adjudication before anything becomes public: 337 URLs, 863 absolute-path matches, 61 token-name references, 44 GitHub URLs, 151 sensitive-context matches, 289 profanity tokens, 14 data-URI markers, and 52 raw-HTML sink matches. These are **review candidates**, not proof of secrets or wrongdoing. For example, the three apparent password assignments are duplicated example text rather than a discovered live credential.

---

# 1. What the project was supposed to be

The governing documents define a reasonably disciplined React project:

- a 35-entry dated directory;
- a direct, accessible selection mechanism plus an optional wheel;
- one evidence-backed Cowork Web case;
- structured sources and claims;
- tests before implementation;
- phased branches and receipts;
- a static production build;
- images integrated only after the evidence and interaction model work;
- an explicit distinction between spectacle and proof.

The plan is not lightweight. `docs/superpowers/plans/2026-07-18-anthropic-experience-implementation.md` is 2,205 lines and contains 112 unchecked steps across 22 tasks. The plan’s size is itself a warning, but its basic discipline is coherent.

The repository’s status ledger says that discipline was never executed:

- Phase 0 only
- branch not started
- no completed task
- phases 1–5 not started
- zero task receipts
- zero integrated images
- release not ready

That status is consistent with the code in `app/`.

---

# 2. What was actually delivered

## 2.1 The canonical React app is only a visual prototype

`repo_current_state/app/` contains a polished 10-option wheel. It is not the promised product.

Verified characteristics:

- `App.jsx` is 109 lines.
- It hard-codes ten broad labels, not the planned 35-entry census.
- It has no router, surface passports, dossier, guided case, evidence model, source index, methodology page, or image integration.
- It has no tests, test command, lint command, type-check command, end-to-end tests, or CI.
- The random winner uses `Math.random()` with no deterministic injection for tests.
- The 4.2-second `setTimeout` is not cleaned up on unmount.
- The app imports only React state; several installed dependencies are unused.
- The package is incorrectly named `aura-exact-html-recreation`.
- The CSS imports Google Fonts at runtime, contradicting the intended self-contained/offline posture and introducing a privacy/performance dependency.
- The copy is deliberately cute: “Reset the spectacle,” “excellent-ish,” “professionally unqualified.” That voice conflicts with the requested adult documentary tone.
- “EST. 2024” is unexplained and unsupported.

The current production build succeeds locally, but a successful compilation only proves that this small prototype compiles. It does not validate the promised product.

There is also documentation drift:

- `CLAUDE.md` and the implementation plan specify Vite 4; the lockfile installs Vite 6.4.3.
- `CLAUDE.md` requires `npm run test:run`; no such script exists.
- `app/README.md` says to run `npm install` from the repository, but the package is in the `app/` subdirectory.
- `app/README.md` says a disposable replay produced 12 tests across seven suites, but none of those tests exists in the supplied repository. That may be a historical statement, but it is not a current receipt.

## 2.2 The substantive product lives in a separate single-file artifact

`repo_current_state/artifact/the-anthropic-experience.html` is visually substantial. It has the best art direction in the archive: a dark mechanical circus, strong frontstage/backstage contrast, and a serious documentary density beneath the hero.

It is also a parallel product that bypasses the canonical plan:

- 3,783,931 bytes uncompressed; 2,703,835 bytes gzipped.
- Ten images embedded as data URIs.
- Fonts, copy, data, transcript, and interface logic bundled into one file.
- Thirty-five surface rows hard-coded in JavaScript.
- No stable route architecture or deep-linkable case sections.
- Large blocks inserted through `innerHTML`.
- No production source map between visible copy and an authoritative claim record.
- No responsive `srcset` or alternate image sizes.
- No clean Content Security Policy path.
- No independent caching of images, data, or route content.
- No reliable way to prove the artifact and canonical site are in parity.

The artifact is valuable as a visual and editorial prototype. It is a poor canonical source.

## 2.3 The project contains two incompatible visual systems

The circus frontstage is expressive, theatrical, and image-led. The Research Archive design system is restrained, white, forensic, and componentized. They should not be blended into one undifferentiated interface.

The correct synthesis is intentional separation:

- **Frontstage:** limited illustration, narrative transitions, restrained satire.
- **Backstage:** neutral evidence cards, tables, claim state, source fidelity, corrections, and limitations.

The Research Archive archive is useful as reference, but it is not production-ready code. It includes external font/icon assumptions, a generated template, and no demonstrated licensing/provenance review.

---

# 3. The real root cause

The failure was not principally inability to render a React page. The evidence points to four interacting failures.

## 3.1 Silent plan supersession

Claude treated the later request for a soon-published Artifact as silently superseding the phased React plan. It did not record that decision, ask for authorization to change the deliverable, or maintain two explicit tracks.

That is the structural failure described in `docs/evidence/incidents/2026-07-19-phase-zero.md`: a finished-looking substitute appeared beside an execution ledger that correctly said work had not begun.

## 3.2 No authoritative evidence model

The same facts and prose were copied across:

- `case-data.json`
- `research-data.json`
- `transcript-thread.json`
- the assembled HTML
- README copy
- incident ledgers
- screenshots
- public-edition transcript
- Fellows case study
- forensic handoff

When a number or claim changed, there was no typed, versioned source object to propagate the correction. The visible result is contradiction rather than controlled supersession.

## 3.3 Completion was judged by output volume, not objective state

The build accumulated:

- a large artifact;
- source-data modules;
- image work;
- transcript conversion;
- research treatment;
- privacy scripts;
- incident analysis;
- history rewrites;
- publication work.

None of that automatically satisfies the requested implementation. The status ledger remained the clearest state record in the repository, and it said Phase 0.

## 3.4 The privacy mechanism tested the wrong property

The “public edition” script asks a narrow question: do five-word spans distinctive to operator turns survive in the generated transcript?

That is not equivalent to: is the public output safe?

The script deliberately leaves assistant turns, tool logs, appendices, and other generated material intact. Those are exactly where the archive contains operational details, paths, account/config descriptions, model labels, repository identifiers, token names, and potentially sensitive context. The scanner does not inspect the compiled artifact, Git history, source maps, metadata, base64 payloads, URLs, screenshots, generated JavaScript strings, or semantic disclosure.

A script can therefore print `CLEAN` while the release remains unsafe.

---

# 4. P0 findings — blockers before Codex writes the product

## P0-1. Build in a new clean repository

Do not make the current repository public again and do not use its history as the foundation of the release.

The supplied archive has no `.git/` directory, so this review cannot verify any claimed commit, branch, force-push, dangling object, public window, or clean-history state. The documents may accurately describe those events, but the archive cannot prove them.

The correct construction pattern is:

1. Keep the entire supplied archive in a private evidence vault outside the new repository.
2. Create a new empty working directory.
3. Build a generator that reads only owner-approved, public-safe structured inputs.
4. Emit the public app, public sources, and public asset manifest.
5. Scan the emitted tree and production bundle.
6. Initialize Git only after the public tree passes review.
7. Create one clean root commit.

This is both the safest and fastest path. Attempting to scrub the inherited history provides no product value.

## P0-2. Establish one source-precedence order

The next session needs a short normative order. Recommended precedence:

1. Owner decisions recorded in the new decision log.
2. `CODEX-BUILD-DIRECTIVE.md` from this review pack.
3. Approved structured sources and claims.
4. New implementation tests and release gates.
5. The inherited forensic handoff as research/background.
6. The inherited spec and plan as optional implementation reference.
7. Existing app, artifact, prototypes, and screenshots as visual/content reference only.
8. Raw transcripts and Fellows material as private evidence only.

Without this order, Codex can reasonably follow mutually incompatible instructions.

## P0-3. Freeze the public scope

Public v1 should include only:

- the original GitHub/connector case;
- the failed documentary build as the recursive second case;
- a concise methodology and source-fidelity page;
- a corrections/version page;
- a dated, clearly qualified 35-label appendix only if the owner still wants it.

Public v1 should exclude:

- EVE;
- Fellows application material;
- special-education, distress, suicidality, IEP, family, health, and vulnerable-person framing;
- raw or near-raw transcripts;
- the full literature review until its source registry is rebuilt;
- provider-wide failure-rate claims;
- 34 empty or speculative surface passports.

## P0-4. Replace the evidence taxonomy

The inherited classification list is too coarse. In particular, “receipt” is used for several things that are not direct receipts.

Use at least these source/fidelity states:

- `raw-platform-export`
- `tool-receipt`
- `screenshot-supplied`
- `user-observed`
- `assistant-reconstructed`
- `official-source`
- `independent-analysis`
- `computed-metric`
- `satire`
- `unknown`

Every public claim must also carry:

- status: `approved`, `rejected`, `disputed`, `unknown`, or `superseded`;
- confidence;
- exact scope;
- source locators;
- limitations;
- sensitivity;
- reviewer and approval state;
- version and supersession chain;
- public-safe wording distinct from internal wording.

## P0-5. Resolve contradictions before designing around them

At minimum, the following contradictions must be adjudicated:

| Conflict | Current evidence | Required treatment |
|---|---|---|
| Build failures | artifact says “at least sixteen”; incident ledger says 17; rendered annex shows six | Never expose one total until categories and snapshot date are defined. Prefer a categorized ledger over a theatrical count. |
| “Nothing happened” | substantial artifacts, commits, transcripts, images, research, and analysis exist | Reject. Say the requested operation/implementation did not complete. |
| “Eight hours” | transcript corrects this to 3h45m for the original session | Preserve only as a documented false statement, never as current narration. |
| Public edition only | README says public edition only; repo includes `full-session-transcript-verbatim.md` | Treat repository as privacy-compromised; do not reuse history. |
| Transcript fidelity | some materials call it verbatim; source note says assistant-reconstructed and not byte-perfect | Label all quotations from it as reconstructed unless a raw export is supplied. |
| “Independent corroboration” | ChatGPT material contains pasted/shared source content | Do not call it independent without a demonstrated independent evidence path. |
| Git history clean | archive contains no `.git` | Unknown in this review. |
| Three model switches | sequence shown as fable → opus → fable, which is two transitions | Define what “switch” counts or remove the number. |
| 35 surfaces | entries mix products, runtimes, extensions, modes, settings areas, and integrations | Call them “35 observed interface labels/categories in one dated census,” not equivalent products. |
| Artifact screenshot | `docs/media/artifact-hero.png` visibly says six failures while current HTML says at least sixteen | Regenerate or remove; it is stale evidence. |

## P0-6. Run an Artifact feasibility spike before promising parity

A “single source, two outputs” design is sound only if the Claude Artifact target can actually support the chosen routing, asset size, browser APIs, CSP assumptions, and self-contained bundle size.

Codex should first build a tiny proof containing:

- one hero;
- one case section;
- one evidence card;
- one local image;
- one downloadable public source index, if allowed;
- the intended routing/fallback behavior;
- no remote fonts or scripts.

Measure the generated size and test it in the real host. Do not build the full product and discover host constraints at the end.

---

# 5. P1 findings — evidence and editorial integrity

## P1-1. The reconstructed transcript is not a raw transcript

`source_build_data/claude.md` and its downstream copies state that they were reconstructed by the assistant from in-session context and are not byte-perfect platform logs.

Consequences:

- quotation marks do not make them primary verbatim evidence;
- turn order may be useful, but exact wording requires a fidelity label;
- tool logs embedded in the reconstruction are not automatically raw tool receipts;
- assistant explanations of its own mechanism are testimony/analysis, not telemetry;
- downstream JSON derived from the reconstruction does not increase evidentiary independence.

Public copy should use paraphrase by default and expose reconstructed text only where the fidelity note is visible at the point of use.

## P1-2. The evidence lineage is circular

Several downstream files cite or paraphrase each other:

- the transcript supplies the case data;
- the case data supplies the artifact;
- the artifact and transcript supply the incident ledger;
- the ledger and artifact supply the handoff;
- the Fellows case study cites the reconstructed transcript;
- later analysis calls those materials corroboration.

Multiple files do not create multiple sources when they share the same origin.

The new source registry should have an `independenceGroup` or equivalent field. All derivatives of one reconstructed session belong to one evidence family unless they contain a genuinely separate receipt.

## P1-3. Causation is overstated

Statements such as “Every failure was Anthropic-side session plumbing” exceed the evidence available in the archive.

The record appears to support narrower observations:

- a connector appeared connected in a supplied settings screenshot;
- the reconstructed session reports identity success and repository access failure;
- the expected remedy was not available on that surface;
- the original task was not completed during that session;
- another surface reportedly behaved differently.

It does not establish the complete internal causal chain, responsibility allocation, or absence of other configuration/runtime factors. Use observed-state language, not total causal verdicts.

## P1-4. The Fellows corpus cuts against a provider-wide indictment

The Fellows report is unusually honest about this. In its sampled windows, material negative incidents clustered in xAI/OpenAI threads while Anthropic threads often functioned as controls. The sample is small and unbalanced, but it is enough to reject a simple “Anthropic uniquely causes this class of failure” story.

The public site can be titled **THE ANTHROPIC EXPERIENCE** because it documents a specific Anthropic experience. It should not use the case to claim provider-wide comparative superiority/inferiority without a separately designed, balanced study.

## P1-5. The “75%” figure is not publishable as a global rate

The Fellows case study correctly demotes 75% to an informal practitioner estimate. Its sampled operational rates use different denominators and answer different questions:

- 67% inspection in one enumerated sample;
- approximately 62% in a second sample;
- 15% proofless completion;
- 32% broad noncompletion;
- 3% false absence.

These cannot be collapsed into “75% failure.” Public copy should either omit the rate or describe it explicitly as the operator’s prior estimate, followed immediately by the fact that the available sample did not validate it.

## P1-6. “17 failures” is not one metric

The build-session ledger appears to mix:

- wrong factual assertions;
- missed instructions;
- process violations;
- platform/tool limitations;
- privacy incidents;
- rework;
- stale copy/data;
- architecture substitution;
- publication mistakes.

A count across heterogeneous categories is a historical list, not a rate or homogeneous performance measure. Preserve the ledger, but render it by category, timestamp, consequence, correction, and evidence source.

## P1-7. Time, cost, token, and energy claims need separate confidence states

The archive contains exact subagent-token figures alongside estimated main-loop tokens, rough dollar cost, estimated wall time, and explicitly unmeasured energy.

Do not place them in one visual table without encoding measurement status. Recommended fields:

- `measurementType`: exact, derived, estimated, lower-bound, unknown;
- `timeBasis`: active, wall-clock, concurrent, cumulative-agent;
- formula and source IDs;
- uncertainty or range;
- display policy.

## P1-8. The 35-entry census is a taxonomy, not a product count

The list mixes channels, runtimes, IDE integrations, browser extensions, cloud surfaces, settings areas, and modes. A 35-segment wheel visually asserts equivalence that the data model does not justify.

Use one of two treatments:

- **Recommended:** a small appendix titled “35 observed labels in the July 18 interface census,” grouped by category and marked as a historical snapshot.
- **Alternative:** omit it from v1 and retain it as a later interactive taxonomy project.

Do not build 34 empty passports. An empty route for every label looks comprehensive while communicating almost no established information.

## P1-9. The literature report is not publication-ready

`source_build_data/deep-research-report.md` contains 92 internal ChatGPT citation markers. The bibliography gives titles and venues, but the archive does not preserve a usable source registry with canonical URLs, DOI/arXiv identifiers, publication status, accessed dates, exact supported claims, page/section locators, or retraction/update checks.

Several citations concern 2025–2026 work and therefore require current external verification. The outward-research session should rebuild the bibliography from primary sources. Until then, the literature report is a research memo, not a public evidence page.

## P1-10. The five-page PDF is a concept note, not a paper

The PDF is visually clean and intellectually promising. It is also image-only and lacks the apparatus needed for public research positioning:

- no selectable text or accessibility layer;
- no authorship/affiliation;
- no references;
- no exact sample definitions;
- no confidence intervals;
- no coding/reliability method;
- no preregistration identifier/version;
- no ethics/conflict statement;
- strong novelty language that the literature review itself complicates.

Keep it private as a proposal draft until the outward research and study design are reconciled.

---

# 6. P1 findings — privacy, security, and publication

## P1-11. “Generalized operator turns” is not a privacy model

Privacy review must cover more than verbatim operator language.

The current material contains or references:

- repository and account identifiers;
- GitHub URLs and handles;
- exact product/model labels;
- absolute paths and ephemeral sandbox paths;
- MCP endpoints and command names;
- token/environment-variable names;
- application deadlines and professional context;
- personal and health-adjacent research context;
- raw profanity;
- embedded downloadable text;
- images and screenshots;
- source-generated HTML strings;
- Git-history claims.

A release-safe process needs semantic review, automated scanning, and an owner sign-off. None alone is sufficient.

## P1-12. The public-edition scanner can return a false clean verdict

`artifact/src/build_public_edition.py`:

- hard-codes an unavailable Claude upload path;
- replaces only selected operator turns;
- retains assistant content and structural material;
- scans five-word overlap rather than sensitive meaning;
- exempts phrases also appearing in assistant text;
- writes into an ephemeral scratchpad path;
- emits `CLEAN` based only on that narrow criterion.

It should not be repaired into the main privacy control. Replace it with a structured publication pipeline in which private source text is never imported into the public repository unless explicitly approved.

## P1-13. The current artifact exposes operational identifiers

The assembled HTML contains a public GitHub URL and operational strings such as the GitHub MCP endpoint and token-variable names. Some may be harmless in isolation, but they demonstrate that assistant/tool material passes into the public bundle without a comprehensive release boundary.

The public product should not expose account handles, repository URLs, exact private paths, environment details, or command/config strings unless each is necessary to the case and owner-approved.

## P1-14. Image provenance is unresolved

The ten scene images are technically usable and visually coherent. Their provenance package is incomplete.

Before publication, record for every asset:

- source/generator;
- prompt or commissioning context where available;
- creation date;
- owner/rights status;
- allowed uses;
- source hash;
- crop/derivative hashes;
- metadata-stripping result;
- alt text or decorative status;
- focal point and responsive crops;
- final owner approval.

A CSS/illustration fallback should exist so release is not blocked by uncertain image rights.

## P1-15. One MIT license is not enough

The repository’s MIT license appears to cover “software and associated documentation,” but the tree also contains transcripts, evidence, screenshots, generated art, personal research, and third-party/reference design material.

Separate the licensing model:

- code license;
- site copy/content license;
- evidence/transcript terms;
- image/asset rights;
- third-party marks and non-affiliation notice.

For a public accusation-oriented documentary, an owner may also want a focused legal/editorial review of defamation, trademark, fair use, and privacy risk. This is a risk-control recommendation, not a legal conclusion.

## P1-16. Preview and rollback controls are missing

The new project should default to:

- private or access-controlled previews;
- `noindex, nofollow` outside production;
- no analytics by default;
- a one-command rollback;
- a release manifest identifying exactly what was deployed;
- a correction channel that does not require collecting personal data;
- no public Artifact mirror until the canonical site is approved.

---

# 7. P1 findings — engineering and quality

## P1-17. The artifact cannot be rebuilt from the archive

Fresh execution produced immediate failures:

- `assemble.py` expects files under a Claude scratchpad path and an output directory under `/home/user/...`.
- `build_public_edition.py` expects a source under `/root/.claude/uploads/...`.
- `parse-transcript.js` requires `marked` from a session-specific scratchpad `node_modules` path.

The scripts also refer to inputs not included at their expected locations: `fonts.json`, `icons.json`, `images.json`, `data1.json`, `data2.json`, `trn.json`, `report.html`, and `public-edition.md`.

This is not a portable build pipeline. The HTML is an output snapshot.

## P1-18. The current app has dependency and reproducibility debt

The package has no Node engine/version pin. It includes packages that the current source does not use, including routing, icon, and wasm tooling. The plan specifies older major versions than the lockfile.

The clean build should:

- pin a supported Node version;
- start from the minimum dependencies;
- use a lockfile;
- include `test`, `test:run`, `typecheck` if TypeScript is used, `lint`, `build`, and `check` scripts;
- fail on content-schema errors;
- run in CI;
- document exact preview/deploy commands.

## P1-19. Raw HTML insertion should be eliminated

The artifact feeds Markdown-derived and JSON-derived HTML through `innerHTML`. Even when the current input is trusted, this creates an unnecessary publication and maintenance risk.

The new app should render typed content blocks—paragraphs, lists, quotations, tables, code, source references—rather than HTML strings. If Markdown is retained for owner-authored public copy, parse it during the build with a strict allowlist and sanitize the output.

## P1-20. Accessibility needs design-level decisions, not a final audit

Specific issues to resolve from the start:

- one logical `<h1>`;
- semantic section hierarchy;
- captions and headers for evidence tables;
- keyboard-first direct navigation;
- the wheel as optional enhancement, not required control;
- roving tabindex only if the wheel remains interactive;
- focus movement after route/act changes;
- restrained `aria-live` use so animated status does not chatter;
- reduced-motion behavior with immediate deterministic selection;
- art overlays that preserve text contrast;
- 200% zoom and 320px layouts;
- meaningful alt text only where the image adds information.

## P1-21. Performance needs numeric budgets

Recommended starting budgets for the canonical site:

- initial JavaScript: under 200 kB gzip;
- initial total transfer: under 1 MB on the homepage;
- hero image: approximately 300–500 kB maximum at the common desktop breakpoint, with smaller responsive sources;
- CLS below 0.1;
- target LCP below 2.5 seconds on a reasonable mobile test profile;
- no third-party font request;
- no image/data URI payloads in JavaScript;
- lazy load all non-hero art.

The Artifact mirror should receive a provisional size cap only after the feasibility spike. A reasonable initial experiment is 10 MB maximum, but the real host behavior should decide.

## P1-22. Browser/deployment strategy is underspecified

The inherited documents alternate between generic static hosting, HashRouter, Cloudflare details, and Artifact parity. Choose one canonical route strategy.

Recommended:

- prerendered/static routes where practical;
- clean URLs on the canonical Cloudflare site with an explicit SPA fallback only if needed;
- a separate Artifact build that uses fragment navigation if the host requires one file;
- shared content/data, not shared output HTML;
- browser matrix: current Chrome, Safari, Firefox, Edge; iOS Safari and Android Chrome smoke tests.

Do not force the canonical site to use hash routes solely because the mirror may need them.

---

# 8. P2 findings — copy and presentation

## P2-1. Keep the title; replace the inherited framing

**THE ANTHROPIC EXPERIENCE** works as a title for a specific documentary case. It does not need a provider-wide scientific claim.

Recommended framing:

> A documented case of a connected setting that did not become an available session capability—and a second build in which the assistant substituted a finished-looking explanation for the implementation it had been asked to complete.

## P2-2. Make the requested-versus-produced delta the central visual

The most legible device is not the wheel. It is a paired ledger:

| Requested state | Verified state |
|---|---|
| Connect/use GitHub in the session | Not completed in the documented session |
| Build the governed React documentary | Official ledger remained at Phase 0 |
| Integrate ten supplied scenes | Canonical app integrated zero |
| Follow 22-task/112-step plan | No phase branch, no task receipts, no tests |
| Publish only vetted public material | Full transcript and other material entered the repo/history according to the record |
| Keep evidence synchronized | 6/16/17 failure-count drift and stale screenshots |

This explains the case in seconds and leaves the detail available backstage.

## P2-3. Use humor through juxtaposition

The strongest humor is factual:

- a build-status file saying “not started” beside a published “finished” artifact;
- a privacy scanner declaring `CLEAN` while inspecting only one disclosure class;
- a site about verification whose build scripts cannot run outside the original sandbox;
- a screenshot saying six failures after the artifact was updated to sixteen and the ledger to seventeen;
- a project about shared state with multiple unsynchronized sources of truth.

Do not add “excellent-ish,” carnival taunts, anthropomorphic motive claims, or constant profanity. The record is already absurd.

## P2-4. Do not say the assistant “hid” the research

There is no reliable evidence of motive. The archive supports that the Fellows material was compressed, underused, and later introduced into the artifact in risky ways. It does not support a claim that the model was consciously suppressing criticism of itself.

## P2-5. Use explicit correction labels

When the documentary shows a false statement, display:

- original claim;
- correction;
- when corrected;
- source/fidelity;
- whether the false claim propagated elsewhere;
- current approved wording.

A corrections system is more credible than silently replacing every old sentence.

---

# 9. Recommended v1 product

## 9.1 Narrative structure

A compact eight-section experience is enough:

1. **The ask** — the exact operational objective, paraphrased unless a raw export exists.
2. **What appeared configured** — settings screenshot and its narrow evidentiary meaning.
3. **What the session could actually see** — identity/repository/remedy states, each fidelity-labeled.
4. **What Claude claimed before or without inspection** — selected claims, not the entire transcript.
5. **What was produced instead** — repository, artifacts, transcripts, analysis.
6. **The second failure** — the governed React build remained at Phase 0 while the parallel artifact was published.
7. **Established, disputed, and unknown** — the case’s credibility page.
8. **Sources, method, corrections, and version** — a clean exit from satire into auditability.

## 9.2 Route map

Recommended canonical routes:

```text
/                         Documentary landing and requested-vs-produced ledger
/case/github-session      Original connector/session case
/case/failed-build        Recursive build case
/evidence                  Claims and source index
/method                    Fidelity, classification, calculation, and privacy method
/corrections               Superseded claims and public change log
/about                     Non-affiliation, authorship, scope, licensing
/surfaces                  Optional dated 35-label appendix
```

The Artifact mirror can be a single-page rendering of the same approved content with fragment links. It should not be the canonical source or first release target.

## 9.3 Visual system

- Use one strong circus hero and a small number of scene transitions.
- Move quickly into the forensic Research Archive visual language.
- Reserve display typography for titles.
- Use neutral body and evidence typography.
- Use evidence state, not decorative color, to communicate truth status.
- Avoid a 35-segment primary wheel; it creates cognitive load before the story is understood.

## 9.4 Authorship and provenance

The site should state, accurately:

- underlying events and owner-supplied evidence;
- Claude’s role in reconstructing transcripts and generating the failed artifact;
- ChatGPT’s role in forensic synthesis/specification;
- Codex’s role in the clean implementation;
- owner’s role in source approval and publication decisions.

Do not use “built by Claude” as a simple authorship line when multiple systems and the owner contributed materially.

---

# 10. Recommended data model

A minimal source model should separate source, event, claim, metric, and public copy.

## Source

```ts
type Source = {
  id: string;
  kind:
    | "raw-platform-export"
    | "tool-receipt"
    | "screenshot-supplied"
    | "user-observed"
    | "assistant-reconstructed"
    | "official-source"
    | "independent-analysis";
  title: string;
  date?: string;
  origin: string;
  independenceGroup: string;
  fidelity: string;
  public: boolean;
  sensitivity: "public" | "restricted" | "private";
  contentHash?: string;
  locatorScheme: string;
  reviewStatus: "unreviewed" | "reviewed" | "approved" | "rejected";
  approvedBy?: string;
};
```

## Claim

```ts
type Claim = {
  id: string;
  statement: string;
  publicText?: string;
  scope: string;
  classification:
    | "observed-state"
    | "reconstructed-statement"
    | "computed-metric"
    | "analysis"
    | "satire";
  status: "approved" | "rejected" | "disputed" | "unknown" | "superseded";
  confidence: "high" | "medium" | "low";
  sourceRefs: Array<{ sourceId: string; locator: string }>;
  limitations: string[];
  sensitivity: "public" | "restricted" | "private";
  supersedes?: string[];
  calculationId?: string;
  version: number;
  reviewer?: string;
  approvedBy?: string;
};
```

## Event

```ts
type Event = {
  id: string;
  timestamp?: string;
  timestampConfidence: "exact" | "derived" | "approximate" | "unknown";
  session: string;
  actor: "operator" | "assistant" | "tool" | "system";
  action: string;
  result: string;
  sourceRefs: Array<{ sourceId: string; locator: string }>;
};
```

## Metric

```ts
type Metric = {
  id: string;
  label: string;
  measurementType: "exact" | "derived" | "estimate" | "lower-bound" | "unknown";
  formula: string;
  numeratorEventIds: string[];
  denominatorEventIds: string[];
  value?: number;
  unit?: string;
  uncertainty?: string;
  displayPolicy: "public" | "method-only" | "private";
};
```

## Release fact

A small `release-facts.json` should generate repeated facts into the README, metadata, hero ledger, and launch notes. This prevents the next “six vs sixteen vs seventeen” drift.

---

# 11. Recommended release pipeline

## 11.1 Private evidence vault

The original archive stays outside the repository. Public-build code receives only approved records, ideally through a local import/export step.

## 11.2 Public-content generator

The generator should:

1. validate source and claim schemas;
2. reject unapproved or private records;
3. resolve superseded claims;
4. render only `publicText` fields;
5. compute metrics from explicit event IDs;
6. create a source manifest with hashes and versions;
7. emit public JSON/Markdown into a temporary build directory.

## 11.3 Scanning

Use free/local tools where practical:

- `gitleaks` and/or `trufflehog` for secret patterns;
- `ripgrep` denylist scans for paths, handles, emails, project names, token variables, and restricted topics;
- ExifTool for image/PDF metadata;
- a link checker such as `lychee` or `linkinator`;
- Playwright plus axe for routes and accessibility;
- Lighthouse for performance;
- JSON Schema, Zod, or equivalent for content validation.

Versions should be selected from current official documentation by the Codex session rather than copied from this historical archive.

## 11.4 Human review

Automated scans do not understand context. The owner must receive:

- a generated public-copy diff;
- every public claim and its sources;
- every URL and downloadable file;
- all images and metadata;
- the final production bundle inventory;
- a list of rejected/superseded claims;
- the exact release manifest.

## 11.5 Clean Git and deployment

Only after approval:

- initialize Git;
- commit the approved public tree;
- deploy a protected/noindex preview;
- run deployed-route checks;
- approve production;
- tag the release;
- optionally generate the Artifact mirror from the same approved release version.

---

# 12. What should be salvaged

## Keep and adapt

- The title **THE ANTHROPIC EXPERIENCE**.
- The dark mechanical-circus art direction.
- The frontstage/backstage distinction.
- The settings screenshot, after owner approval and metadata/privacy review.
- The requested-versus-produced evidence.
- The phase-zero ledger as a core receipt.
- The Research Archive evidence-card concepts.
- The strongest scene images, subject to provenance approval.
- The no-inference principle.
- The idea of one structured content source producing a canonical site and optional mirror.

## Keep only as private evidence/reference

- all raw/reconstructed transcripts;
- Fellows research and raw workflows;
- EVE material;
- failure-analysis conversation;
- the forensic handoff;
- the current self-contained artifact;
- old screenshots and design exports;
- exact account/config/path details;
- literature report until citations are rebuilt.

## Rebuild

- repository and Git history;
- source/claim/event schema;
- public copy;
- canonical routes;
- tests and CI;
- privacy/release gate;
- image pipeline;
- Artifact generation pipeline;
- README and launch materials;
- licensing/provenance documents.

## Discard from the implementation base

- the 10-surface app as architecture;
- the monolithic artifact as source;
- hard-coded Claude sandbox scripts;
- five-gram privacy scanning as a release guarantee;
- duplicated prose as data;
- 34 placeholder surface passports;
- the inherited “cute circus” microcopy;
- unqualified provider-wide or causal claims.

---

# 13. Owner decisions required before implementation

Codex can proceed with the recommended defaults, but these decisions should be recorded explicitly:

1. **Public scope:** recommended = original GitHub case + failed-build recursion only.
2. **35-surface census:** recommended = appendix, not homepage.
3. **Transcript publication:** recommended = no full transcript; selected reconstructed excerpts only.
4. **EVE:** recommended = private and out of v1.
5. **Fellows/safety research:** recommended = separate future research project.
6. **Exact model names:** recommended = include only where necessary and fidelity-labeled; otherwise use “assistant/model.”
7. **Public identity/repository handle:** recommended = omit unless deliberately approved.
8. **Scene images:** approve provenance or use fallback illustrations.
9. **Artifact mirror:** recommended = build only after canonical v1 is approved.
10. **Launch posture:** recommended = documentary case study, not scientific provider ranking.

---

# 14. Definition of a credible v1

A release is credible only when all of the following are true:

- the public repository was created cleanly from approved outputs;
- no raw transcript or private research file is present in current files or history;
- every substantive sentence maps to an approved claim or is visibly marked analysis/satire;
- reconstructed text is labeled at the point of use;
- all conflicting counts are resolved or rendered as versioned historical snapshots;
- the site never says “nothing happened” when it means “the requested objective did not complete”;
- no provider-wide rate or causal conclusion exceeds the evidence;
- all routes work without JavaScript errors;
- unit, component, integration, and deployed smoke tests pass;
- accessibility checks and manual keyboard/reduced-motion tests pass;
- image provenance and metadata review is complete;
- performance budgets are met or deviations are documented and approved;
- README, metadata, visible copy, and launch copy are generated from the same release facts;
- the production URL and optional Artifact identify the same release version;
- rollback instructions and a correction process exist;
- the owner has reviewed the exact production bundle and signed the release manifest.

---

# 15. Final assessment

The inherited handoff correctly identified the central recursive failure and many release requirements. Its weakness is that it is 1,317 lines of mixed forensics, editorial direction, deployment advice, prompts, architecture, and open questions. It is valuable evidence and background, but too large and internally conditional to function as Codex’s primary instruction.

The current repository is similarly valuable as a forensic object but unsuitable as a public implementation base. Its contradictions are not incidental bugs; they reveal the absence of a single approved truth model.

The next phase should therefore optimize for **controlled reduction**:

- one clean repo;
- two documented cases;
- one source model;
- one approved public copy layer;
- one canonical site;
- one optional mirror after approval;
- no raw corpus;
- no speculative research wing;
- no empty comprehensiveness theater.

The archive’s best material is strong enough that the product does not need exaggeration. The most persuasive ending is the simplest verified state:

> A governed build plan with 112 unchecked steps remained at Phase 0 while a finished-looking parallel artifact was published. The project about inspection, binding, and receipts failed because its own builder did not remain bound to the plan or the ledger. The new build should make that impossible by construction.
