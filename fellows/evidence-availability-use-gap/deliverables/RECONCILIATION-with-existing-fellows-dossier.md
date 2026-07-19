# Reconciliation with the existing Fellows prior art

**Why this file exists (stated plainly).** This audit was produced largely without first reading the repository's **existing** Fellows work at `memory/prophecies/income/fellows/` — the `FELLOWS-APPLICATION-DOSSIER-20260716`, `FELLOWS-BRIEF-v2-20260716`, and `CORPUS-EVIDENCE-APPENDIX-20260716`. Those were inventoried during recon and `fellows.md` was read in part, but the dossier and brief were read in full only when the user asked whether the fellows folder had been reviewed. That is a search-before-building miss (E9) on the audit's own part — the exact failure the thesis studies — and it is corrected here rather than hidden. This file reconciles the two.

## The two are siblings, not duplicates

- **The existing brief** (`FELLOWS-BRIEF-v2`) is *"Active Memory Is the Definition of Safety."* Its spine is a **safety/wellbeing** question: cross-session, **sub-threshold user distress** accumulation (a special-education student hinting at suicidality across sessions, each hint below threshold), and whether recognition **binds** into consequence. Detection gap + consequence gap; proposed fix = a deliberative memory-reviewing agent (MoA) that can escalate/constrain, not just summarize.
- **This audit** answers the *operational* reframe the research assignment explicitly requested: the **evidence availability–use gap** — the agent not inspecting an available tool/file/credential/decision before asserting. The prompt states outright "this is **not** primarily a sentiment analysis… user anger is not itself evidence of failure," a deliberate pivot away from the distress framing toward operational evidence-use.

They share **one mechanism** — *recognition without binding* — applied to two domains (user distress vs. operational evidence). This audit is the operational sibling of the brief. Neither supersedes the other; the brief remains the canonical application spine.

## The standing rule this audit must respect

From both the dossier and the brief: **"Josh writes all application words."** Therefore the report's §10 ("application-ready thesis") and §9 (research proposal) are **research-framing artifacts and evidence structure only** — inputs the applicant may draw on, **not** a drop-in application and not a replacement for the brief's own thesis. Where my §9 invents benchmark task classes and a 16-week plan, treat it as *an operational-evaluation design that could complement the brief's distress-focused 16-week shape*, not as the applicant's plan of record.

## Verified facts — my report aligns with the dossier/brief (and where it must be corrected)

| Fact | Dossier/brief (authoritative) | This audit |
|---|---|---|
| Application deadline | **July 26, 2026, 11:59pm PT**; cohort starts **Nov 2**; full-time 4 months | (my report did not state a deadline — adopt the dossier's) |
| Corpus size | **1,976 conversations / 24,356 messages**, 93MB md, 2025-05-13→2026-07-12, 4 vendors; "~30GB" is raw/dup bytes (~21–25GB dedup, ~5.65GiB transcript) | matches (§5, prior-run facts) |
| Mordu | **93/93 tests**, doctrine **live via cos MCP** (cos's *parallel* copy, not the mordu repo's code), gate Worker **built-not-deployed** (confirmed via Cloudflare API — worker absent), prod-bindings footgun on an unmerged branch | matches + my L07 lane adds the charter-false-"live"/493,824-deletion detail |
| Cross-session recognition | **9 incidents / ~2,000 conversations, all tool/artifact-mediated, 0 autonomous** | independently corroborated (executive §1, prior-run) |
| Binding | **prose recognition lapses in days; code-converted recognition holds** | independently corroborated (executive; L02 rule-cited-then-violated) |
| Throughline | the **"standing student test"** — `MORDU-CHARTER-v0.md:95–102`; "Absorb, never amplify" `:54` | my §10 handled special-ed relevance abstractly; the dossier's concrete, cited version is stronger — defer to it |

**Correction to my scorecard framing:** the brief already treats the corpus numbers as exact; my report should never imply "~30GB." (It doesn't, but flag for consistency.)

## What this audit ADDS beyond the existing dossier/brief

The dossier/brief are application-structure and distress-spine. This audit contributes, on the operational side:
1. A **separated A-I-B taxonomy** (E1–E15) with the three stages scored independently.
2. An **enumerated-sample scorecard** with denominators (67% inspection rate; 15% proofless-completion; 32% noncompletion; false-absence 3%) — a defensible operational counterpart to the brief's "9/0" distress finding.
3. The **flagship GitHub-connector case** (`CASE-STUDY-01…`) fully reconstructed with the "3-month all-repo grant" inversion — the operational archetype.
4. **≥9 control cases** and a **cross-surface reclassification** guard (separating unavailability from inspection failure) that the distress-spine brief does not need but the operational claim does.
5. A **false-blocking / governance-overload** analysis (the Mordu "no gate on the gate" reproduction) that directly informs the brief's own "over-intervention harm" counter-argument.

## Unresolved items that remain the applicant's alone (from dossier §12 / brief FLAGs)

These are **not** for this audit to decide; recorded so they are not lost:
- **FLAG 1 (privacy):** the "consenting-adult / no real students" framing is contradicted — real IEP casework (19 titled conversations, a 123MB IEPs.zip) exists at the corpus edges. Consenting-adult framing is **suspended pending the applicant's re-scoping**. (This audit already operated under no-minor-names throughout.)
- References locked and non-conflicted; full-time Nov-2 logistics against an active IEP caseload; Python screen-readiness (mandatory listed qualification — the dossier's honest framing, not a false "teaching mechanism" claim); pseudonym (yaw-sh) disclosure decision; Katie's consent; workstream ranking (dossier: AI Security first / brief: AI Safety first — the applicant reconciles).
- The **"75%"** figure: the applicant's informal red-team estimate (from THE ANTHROPIC EXPERIENCE session); unsupported as a global rate by either this audit's samples or the ChatGPT deep-research pass; directionally right for the consequential-execution subclass.

## Bottom line

The existing fellows folder is the **canonical application prior art**; this audit is a complementary **operational** evidence base that independently corroborates the brief's core findings and adds an operational taxonomy, scorecard, flagship case, and false-block analysis. Read together: the brief argues *active memory is the definition of safety* for user distress; this audit shows the *same recognition-without-binding failure* in the agent's own operational conduct — including, honestly, in the conduct of this very audit.
