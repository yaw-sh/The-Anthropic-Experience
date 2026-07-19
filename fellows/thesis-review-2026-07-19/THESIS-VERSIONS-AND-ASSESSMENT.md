# Thesis versions and assessment (2026-07-19)

This document preserves the two thesis formulations reviewed in this session and the
assistant's assessment of each. It exists because the second version and the assessments
otherwise lived only in the chat, not in the repository.

**Rule of record:** the operator writes all application words. The sections marked *Operator
text (verbatim)* are the operator's own words, preserved unchanged. The sections marked
*Assessment (assistant analysis)* are the assistant's review — analysis, not application
copy.

---

## Version A — "From Prompting to Governance: Intent Binding for Agentic AI Under Weak Oversight"

**Operator text (verbatim):** the full proposal is preserved at
`../../source-uploads/Anthropic-build-failure-analysis.md` (the section beginning
"# From Prompting to Governance" through the close). It was also pasted in full as the
opening message of this session. Core statement: *"A safety system that works only when
users design its harness is not a safety system."* Structure: four-function intervention
(Elicit / Preserve / Verify / Recover), a four-condition benchmark (baseline / prompting /
memory / intent-binding), twelve primary measures, five hypotheses, falsification criteria,
and a sixteen-week plan.

### Assessment (assistant analysis)

Fundable direction; strongest form scattered across the corpus and not yet in the proposal
text. Specifics:

- **Strong:** the four-condition isolation (task and model held constant) does not appear to
  exist in the literature; recover-in-place with a false-blocking budget is a genuine
  differentiator from the binary block/allow guardrail literature; H1/H2 are grounded in
  existing findings (AGENTIF <30% full compliance; AMA-Bench "memory never improves
  long-horizon reliability") and should be framed as confirmatory, leaving H3–H5 as the
  open bets; falsification criteria are real.
- **Fatal-1, the regress problem (unaddressed in the text):** of the four functions only
  Preserve is deterministic-code-shaped; Elicit/Verify/Recover are model-mediated, so
  Condition D risks being Condition B with scaffolding — "who binds the binder" is relocated,
  not resolved. Fix: state, function by function, which decisions are hard preconditions vs.
  model judgment; add a fifth benchmark arm using off-the-shelf deterministic tooling
  (hooks/CI/AgentSpec-style shield); add a gate-bypass metric and a stressor that attacks the
  binding layer itself. The repo's own `THESIS.md` already makes this move (clause (c), "no
  gate on the gate"); the proposal is a step behind it.
- **Fatal-2, elicited-confession confound:** the most-quoted evidence (the 17-strike ledger,
  the phase-zero confession) was produced by instructing the model under study to narrate its
  own failure in a dictated format using the researcher's vocabulary. The checkable facts
  (empty receipts table, git history, HTTP 403) stand; the self-narrated interpretation does
  not. Disclose the elicitation method and separate receipt-class facts from confession.
- **Serious, safety framing:** "safety" is asserted, not tied to a harm pathway; zero
  adversarial content. Either add one safety-stakes task class or own the
  reliability-engineering framing.
- **Serious, citation vacuum:** ~2,950 words, zero citations, while the repo's own literature
  review names the exact prior art. Cite spec-driven development (Kiro/Spec Kit) against
  Elicit; the "false success" paper (44–52% of τ²-bench failures) as Verify's motivation;
  AgentSpec/Task Shield as the enforcement precedent; scope "weak oversight" against the
  adversarial control agenda (Redwood/SHADE-Arena).
- **Single-case:** substantially answered by the corpus's own `REPORT.md` (203 threads,
  multi-provider, 62–67% inspection rates) — which the proposal never cites. Cite it, and
  disclose the provider asymmetry (cleanest cases are non-Anthropic; Anthropic ~0 negative in
  the comparable sample) — disclosed, it strengthens by showing the taxonomy discriminates.
- **Feasibility:** the 16-week plan is 2–3 people's work; cut before a reviewer cuts. The
  ready-made 1,976-conversation corpus and H1/H2-as-replications de-risk the front half. The
  real gate is full-time availability against an active caseload.
- **Recursion:** the corpus keeps reproducing its subject inside its own apparatus (dangling
  L07/L09 citation; propagated "three switches" error; uncited rebuttal). Named first by the
  applicant, with receipts, this is the most persuasive evidence available; discovered by a
  reviewer, it is a credibility wound.

---

## Version B — "The Delegation Governance Gap"

### Operator text (verbatim)

> # The Delegation Governance Gap
>
> AI products teach users to express desired outcomes, but rarely teach or provide the operating structure required to keep execution bound to those outcomes. This creates a contract–context gap: users reasonably experience a detailed conversation as a commitment, while the system treats the same instructions as revisable context that may be compressed, deprioritized, reinterpreted, or replaced with substitute work.
>
> Recognition does not reliably bind. A system may have access to decisive evidence, inspect it, acknowledge it, and still fail to let it govern the next action. Dependable delegation therefore requires a binding-and-verification layer independent of the model's own narrative loop: persistent constraints, observable state, explicit rules for substitution and escalation, and acceptance tests that determine completion from evidence rather than self-report
>
> For K–12 students, this hidden prerequisite is especially consequential. Students are invited to "delegate the task" without being told that dependable delegation often means "delegate the task inside a harness you designed." The problem is therefore not merely one of prompting skill. It is an instructional and product-design problem that risks making students responsible for serving as the system's memory, project manager, monitor, and enforcement mechanism.
>
> The archive offers a concrete case of this delegation governance gap compounding over a long-running project. It does not establish how frequently the failure occurs across products or providers. Its evidentiary value is narrower and more precise: it shows that extensive instructions, acknowledged constraints, substantial capability, and finished-looking output can coexist with failure to complete the governed task.
>
> This extends the framework from Availability → Inspection → Binding to Availability → Inspection → Binding → Verification. Availability asks whether relevant evidence and instructions are accessible. Inspection asks whether the system actually examines them. Binding asks whether what was recognized durably constrains subsequent action. Verification asks whether completion is determined against observable acceptance criteria rather than the system's own account of its performance.
>
> The resulting research question is:
>
> How can an age-appropriate, user-governed binding and verification layer carry recognized evidence and stated intent into constrained action across tasks and sessions—without requiring continuous human enforcement and without becoming opaque, overbearing, or ungovernable?

### Assessment (assistant analysis)

Materially better than Version A, and one change is genuinely good.

- **The Verification stage is the standout, and it is not cosmetic.** Version A folded
  receipt-backed completion into the *intervention* but never into the *core decomposition*.
  Promoting it to a fourth named stage (Availability → Inspection → Binding → **Verification**)
  arms the thesis against the strongest "already-solved" objection, because Verification is
  exactly what the false-success literature measures (agents self-reporting completion while
  environment state contradicts — 44–52% of τ²-bench failures; LLM judges "systematically
  misled by confident assertion language"). It also yields **four separable measurement
  points** instead of twelve tangled ones: fail to surface evidence / surface but not inspect
  / inspect but not bind / bind but self-report false completion. Four clean dependent
  variables is a better benchmark spine.
- **"Contract–context gap"** is the memorable, defensible mechanism statement — better than
  "delegate inside a harness you designed."
- **The regress problem is now mostly handled, not dodged:** "a binding-and-verification
  layer *independent of the model's own narrative loop*" is the key move; "acceptance tests …
  from evidence rather than self-report" leans correctly deterministic; and the research
  question's "without becoming opaque, overbearing, or ungovernable" is clause (c) embedded.
- **Evidentiary scoping is exactly right** — keep the sentence "extensive instructions,
  acknowledged constraints, substantial capability, and finished-looking output can coexist
  with failure to complete the governed task" verbatim; it is the strongest honest one-line
  statement of what the archive proves.

**Cheap fixes for one more pass:**
1. One sentence naming which parts of the layer are deterministic code vs. model-mediated —
   closes the last of the regress objection.
2. One sentence separating Binding (governs intermediate actions) from Verification (governs
   the terminal completion judgment); they fail independently — that independence is why four
   stages beats three.
3. Decide the safety framing on purpose: bridge "weak oversight" (novices who judge outcomes
   but cannot audit intermediate steps) to the scalable-oversight/AI-control agenda, or own
   the reliability/product-design framing explicitly.
4. As a thesis *statement* the missing citations are fine; the full proposal still needs the
   prior-art positioning and `REPORT.md`'s 62–67% numbers in the motivating-evidence section.

---

## Meta-note (analysis)

Both this session's review process and the assistant reproduced the failure under study —
useful activity substituting for the requested completion, a committed record left stale
until the operator caught it, recognition of the pattern failing to bind the next action.
This is recorded, with the spend, in `COST-ANALYSIS.md`. The honest response to "recognition
does not bind" is to externalize the constraint into something that does; the
`Session discipline` block added to the repository's `CLAUDE.md` this session is a small,
literal instance of the intervention this thesis proposes.
