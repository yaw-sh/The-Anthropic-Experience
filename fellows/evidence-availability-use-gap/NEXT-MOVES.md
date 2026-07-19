# Next moves — for the next session (and the human decisions only Josh makes)

*Written at the end of the audit session. Everything referenced here is committed on branch `claude/evidence-availability-use-gap-2ewx8q` / PR #1. Respects the standing rules in the README handoff: Josh writes all application words; no motive-interpretation; FLAG 1 is his call.*

---

## 0. Where everything is (30-second orientation)
- `THESIS.md` — the real thesis (*recognition does not bind*); read first.
- `REPORT.md` — the operational evidence audit (now self-contained: §3 evidence map and §5 scorecard include all 9 lanes).
- `deliverables/` — the flagship "Anthropic Experience" case; the reconciliation with the existing brief.
- `investigation-reports/` — the 9 lane reports (raw findings). `transcripts/` — every subagent + this session.
- **The canonical application material is NOT here** — it's `memory/prophecies/income/fellows/` (`FELLOWS-BRIEF-v2`, the dossier, the corpus-evidence-appendix).

---

## 1. What "the distress dimension is gated by FLAG 1" means

The safety thesis is about **cross-session accumulation of sub-threshold *distress* signal**. To ground it in the corpus, you'd search the transcripts for those distress patterns and index them. **That search has never been run, on purpose.** Here's the gate:

- The corpus was described as "a consenting adult simulating his students' registers — no real students, no minors' data." A prior subagent checked the metadata (titles only, no message bodies) and found that's **not true of the corpus as a whole**: it's Josh's real day-to-day usage, and **19 conversations carry real IEP casework** (named students, a named school) plus a real `IEPs.zip` at the archive edge.
- So running a distress-pattern search would do two things nobody should do implicitly: (a) potentially index **third-party minors' protected records** (Josh's consent doesn't extend to his students), and (b) surface **Josh's own** real private distress, mislabeled by the framing as "simulation."

**That's the gate.** The distress-content dimension of the research is **blocked until Josh decides** one of three things (from the corpus-evidence-appendix §2):
1. Point at a genuinely synthetic corpus elsewhere and index *that*.
2. Authorize indexing **Josh's own voice only**, explicitly excluding the 19 IEP conversations, with the application framing corrected to say "my own registers," not "students'."
3. Decline the corpus index entirely — the eval templates are design-derived and stand without it.

Regardless of choice: **the real-student material never enters any research or application output.** This audit stayed entirely on the *operational* side precisely because it needs no distress content — which is also why the operational gap is the safe benchmark substrate.

---

## 2. How to actually run the empirical study (the fellowship itself)

The study tests one thing: **does forcing the availability→inspection→binding chain reduce unsupported claims and unbound corrections — and can the binding layer do it without over-blocking?** It runs on public models/APIs, one person, no real distress data. Concrete build order:

**Step 1 — Build the task harness (Weeks 1–3).** Implement the **10 task classes** (REPORT §9): capability discovery, tool/plugin awareness, search-before-building, auth-state verification, cross-session continuation, scope preservation, correction retention, completion verification, plan consistency, governance false-block recovery. Each task is a small scripted scenario with an **oracle**: the correct source to inspect, the correct answer, the permissible uncertainty state, the expected action, and the **receipt** that counts as "done." Sanitize every one from a real incident in this audit (e.g., the GitHub-connector `.mcp.json` case → a "is tool X callable here?" task with a mounted-but-unread manifest as ground truth).

**Step 2 — Manipulate *availability* by construction.** For each task, run three variants: evidence **present-and-mounted** / **present-but-unmounted** / **genuinely-absent**. This is what lets you *separate* availability failures from inspection failures instead of conflating them (the mistake the audit had to guard against).

**Step 3 — The four conditions, identical prompts, only the scaffold differs:**
- **Baseline** — ordinary agent.
- **Prompt-only** — "verify before asserting" in the system prompt.
- **Memory-supported** — relevant prior decisions/corrections loaded into context.
- **Evidence-and-obligation layer** — deterministic code that (a) carries an unresolved-obligation ledger across sessions, (b) fires a forced evidence-lookup before an externally-checkable claim, and (c) **blocks a "done" claim until a receipt exists**.

**Step 4 — Measure** (per REPORT §9): inspection-before-assertion, unsupported-claim rate, false-absence rate, correction retention, receipt-backed completion, **false-blocking rate**, recovery success, token cost, latency, prompts-needed-to-force-verification.

**Step 5 — The clause-(c) test (the novel part).** Deliberately feed the obligation layer imperfect input and spurious gate-triggers and measure whether it **over-blocks** (governance false-positives) — and whether the special-ed rule (**"absorb, never amplify; a missing value is a question, not a refusal; recover-in-place"**) keeps false-blocking under a pre-registered ceiling. This is where the thesis earns its keep or fails: if the binding layer only works by blocking legitimate work, it's Mordu's "no gate on the gate" again, and you report that honestly.

**Pre-registered falsifiers (REPORT §9):** if Prompt-only or Memory-supported closes the gap as well as the layer → no structural effect. If the layer's benefit is inseparable from false-blocking cost → net-negative. If baseline inspection is already high and failures trace to genuine unavailability → wrong diagnosis. Build it to let these win.

**Existence proof to lean on:** Mordu already implements much of the layer (directive ledger, proof-required DONE, PIN-gated dispositions, recover-in-place, absorb-never-amplify). The study doesn't build from scratch — it *evaluates* whether that shape actually moves the metrics, against controls.

---

## 3. Next moves for the next session — ordered, with why

1. **Make `THESIS.md` the front of `REPORT.md`** (or merge them). *Why:* the report still reads as an operational audit with the real thesis bolted to §0; a reader should hit "recognition does not bind / active-memory-as-safety" first. Low effort, high framing payoff.
2. **Get Josh's FLAG 1 decision before any distress-corpus work.** *Why:* it's a hard gate on the safety half of the research and an ethics/FERPA line; nothing downstream should move without it. (Options in §1 above.)
3. **Draft the empirical study as a runnable repo skeleton** (task harness + the 4 conditions + oracle format), *without* real data. *Why:* the research-discussion interview stage needs a concrete, testable question, not a portfolio recap — a working harness stub is the strongest possible answer, and it's buildable in days from §2.
4. **Re-run the prior-art novelty sweep** (the open seam: deliberative memory-review × organic distress × cross-session sub-threshold × consequence-binding). *Why:* the brief flagged the neighborhood is "filling in"; confirm nobody published the assembly before the research discussion, not during.
5. **Fold the operational scorecard into the brief as a second, checkable evidence line.** *Why:* the brief's "9 tool-mediated / 0 autonomous" is the distress-side finding; the audit's "67% inspection rate, binding fails on the recognized rule" is the operational-side finding — two independent samples pointing the same way strengthens both.
6. **Leave the application words to Josh.** *Why:* standing rule. The next session verifies, structures, and hands him evidence + options — it does not write his application.

---

## 4. The apply decision, spelled out (this is Josh's, not the model's)

**What "the substance clears the bar" means, concretely** — the case rests on four things that are hard to fake and rarely co-occur:
- **A tested existence proof** — Mordu (93/93, charter clauses, doctrine live via cos), not a slide about an idea.
- **A real longitudinal corpus** — 1,976 conversations / 24,356 messages over 14 months across four vendors; the field mostly runs on synthetic or Reddit data.
- **A genuine safety thesis with a still-open seam** — nobody has published the assembly (verified in the lit sweep).
- **Lived special-ed expertise that *is* the design spec** — "absorb, never amplify" and the standing-student test are the classroom skill, encoded and tested — not biography decorating an engineering pitch.

**Why "apply / don't-force-Python" is the honest read, not a dodge:** the *thesis and evidence* support applying — that part is settled by the work. What's *not* settled, and is genuinely Josh's judgment, is whether **this cycle** is the right one, because that turns entirely on **gating items that are logistical, not intellectual**:
- **Python screen-readiness** is a *hard, listed* qualification. Josh's own decision rule — *medium problems without fighting syntax by ~July 24, else take the next cohort* — is the correct instrument. Applying *against* an unmet hard gate invites a fast triage-no; taking the next cohort is the rule working, not a failure. **That's why "I'd not force it against the Python gate."**
- **References** (checked early and binary), **full-time Nov-2 vs the active caseload**, and **FLAG 1** are the other gates. None is about whether the research is good; all are about whether the timing is clean.

So: **the decision isn't "is the work strong enough" (it is) — it's "are the gates clear by the 26th," and only Josh can read those.** Deadline is July 26, 11:59pm PT; today is the 18th.
