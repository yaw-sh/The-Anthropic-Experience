# fellows/

An independent, evidence-driven audit of this repository (`yaw-sh/os`, the "pinky" memory tree) that tests a single research thesis about AI agents — **the evidence availability–use gap** — and turns the findings into an Anthropic Fellows research proposal.

Everything in this folder was produced by a read-only investigation of the repository's own conversation corpus, prophecies, and governance systems. Nothing in the corpus was modified. This README is the index; everything else lives in one folder beside it.

---

## ⇢ If you are a future agent picking up the Fellows application — read this first

**What this folder is:** a **read-only research/evidence audit** and a thesis reframe. It is **not** the application, and it is **not** the canonical research spine.

**Where the real application material lives** (do not duplicate it — build on it):
- `memory/prophecies/income/fellows/needs_sorted/FELLOWS-BRIEF-v2-20260716.md` — the canonical research brief (*"Active Memory Is the Definition of Safety"*).
- `memory/prophecies/income/fellows/needs_sorted/FELLOWS-APPLICATION-DOSSIER-20260716.md` — the evidence dossier + gating items + workstream ranking.
- `memory/prophecies/income/fellows/needs_sorted/deliverables/CORPUS-EVIDENCE-APPENDIX-20260716.md` — verified claims → paths.
- `memory/prophecies/income/fellows/needs_sorted/memory/` — the **standing rules** (below), as memory files.
- **This folder's** `evidence-availability-use-gap/THESIS.md` (the real thesis, reframed) and `deliverables/RECONCILIATION-with-existing-fellows-dossier.md` (how this audit relates to the brief).

**Binding standing rules — do not violate (from Josh, in the memory files):**
1. **Josh writes all application words.** You verify, structure, refine — never write application copy, taglines, or microcopy.
2. **No motive-interpretation of Josh.** Countable pattern observations are welcome; stories about his mind are never your place.
3. **FLAG 1 is unresolved and his alone:** the "consenting-adult / no real students" corpus framing is contradicted (real IEP data at the corpus edges). Consenting-adult framing is **suspended**; real-student material never enters any research or application output.
4. **Deadline: July 26 2026, 11:59pm PT** (Nov 2 cohort, full-time 4 months). Corpus is **1,976 conversations / 24,356 messages** exact — never "~30GB." Mordu: **93/93**, doctrine live via cos MCP, **gate worker built-not-deployed**.
5. **Kill-list:** no "built teaching system," no "independently rebuilt four times" (say "one doctrine, persisted and applied"), no internal nicknames externally (drop "BIG-MEMMA"), no commit-velocity stats without the gates, break-testing content never in written material.
6. **git works from Bash** (gh is keychain-authed); never propose PAT/connector workarounds. Python lessons are **paused** until Josh asks.

**What is done vs open:** *Done* — this operational evidence audit (`REPORT.md` + 9 lane reports + transcripts). *Open, and Josh's alone* — the FLAG 1 decision, references (checked early/binary), the Python-readiness call, the yaw-sh pseudonym disclosure, Katie's consent, and workstream ranking (dossier says AI Security first; brief says AI Safety first). Start at `THESIS.md`, then `NEXT-MOVES.md` (ordered next steps + how to run the empirical study + the FLAG 1 gate + the apply-decision logic), then the brief.

---

## The thesis under test

> In many consequential agent failures the model does not lack information or capability. The relevant tool, file, credential state, prior decision, or official implementation is **already available**, but the agent produces a plausible answer **without inspecting it**. The burden then shifts to the user — to remember context, detect the unsupported claim, name the missing tool call, and phrase a question that makes verification unavoidable.
>
> The proposed fix is a surface-independent **evidence-and-obligation layer**: carry unresolved commitments across sessions (**Recall**), consult the decisive source before asserting an externally checkable claim (**Verify**), and require receipts before declaring work done (**Bind**). Sub-hypothesis: *memory alone is insufficient* — information can be present yet unused, and a lesson can be recognized without constraining later behavior.

The investigation was instructed **not to assume the thesis is correct** and to actively try to falsify it. Each incident is analyzed along a three-stage chain that is scored separately:

```
Availability  →  Inspection  →  Binding
(accessible    (actually      (did it constrain
 in-session?)   examined?)     later behavior?)
```

---

## How this was produced

- **Oversight model:** an orchestrating session that scouted the repository, designed the workflow, reviewed outputs, and assembled the deliverables.
- **Investigators:** Sonnet subagents at high/max reasoning, run read-only and privacy-bound, each covering a slice of the corpus (thread sweeps by date, plus dedicated case-study and rigor lanes).
- **Synthesizers:** Sonnet subagents that read the investigator reports off disk and drafted the required deliverables, holding every rate to an explicit denominator.
- **Privacy:** no verbatim distress content and no minor/student identifiers appear in any artifact — patterns are described with neutral labels; paths, dates, counts, and model names are used freely.

The corpus reviewed centers on `memory/threads/2026/07/` (203 provider-neutral Markdown threads, Jul 1–12 2026), the `memory/prophecies/` plans and reports, `memory/repos/mordu/` (the governance gate), and the prior Fellows research run under `memory/prophecies/income/fellows/`.

---

## Folder layout

Two things at this root: **this README** and the folder **`evidence-availability-use-gap/`**, which contains everything else.

```
fellows/
├── README.md                        ← you are here (index)
└── evidence-availability-use-gap/
    ├── REPORT.md                    ← MASTER REPORT — all 12 required deliverables
    │                                  in one document (start here): executive
    │                                  conclusion + 7 research questions, refined
    │                                  terminology (the A-I-B gap), evidence map,
    │                                  top-12 case studies, quantitative scorecard
    │                                  (explicit denominators), control cases, Mordu
    │                                  analysis, user-control-plane analysis, Fellows
    │                                  research proposal, three thesis versions,
    │                                  limitations, evidence appendix, contradiction audit
    ├── deliverables/                ← CASE-STUDY-01-the-anthropic-experience.md (the
    │                                  flagship GitHub-connector incident, in full) and
    │                                  RECONCILIATION-with-existing-fellows-dossier.md
    │                                  (how this audit relates to the prior Fellows work)
    ├── source-transcripts/          ← primary-source evidence: the sanitized
    │                                  "THE ANTHROPIC EXPERIENCE" session transcript
    ├── investigation-reports/       ← per-lane investigator reports (the raw findings
    │                                  each conclusion rests on): lane-01/02 = the two
    │                                  fully-reconstructed July thread-sweeps; case
    │                                  lanes = GitHub connector, Mordu, memory/governance,
    │                                  falsification/forensics/quant
    ├── transcripts/
    │   ├── subagents/               ← every subagent transcript as Markdown
    │   │                              (thinking + written findings; tool calls collapsed
    │   │                              to one-line breadcrumbs — no tool-result dumps).
    │   │                              Includes the recovered transcripts of a first
    │   │                              workflow run that was stopped for speed.
    │   └── session/                 ← the oversight session transcript as Markdown
    └── data/
        └── raw-transcripts/         ← raw workflow journals + agent meta (provenance)
```

### Where to start
1. **`evidence-availability-use-gap/REPORT.md`** — the executive conclusion and the entire argument (all 12 deliverables) in one place.
2. **`evidence-availability-use-gap/investigation-reports/`** — the source findings each conclusion rests on, with line-level citations.
3. **`evidence-availability-use-gap/transcripts/`** — the full reasoning trace of every subagent and of this oversight session, for auditability.

### A note on method honesty (in the spirit of the thesis)
This audit ran its investigators as background subagents. The first orchestration run was **stopped mid-flight** once it was clear the sandbox could only run two agents at a time and it would overrun the working window; its completed and partial transcripts were **recovered** (nothing discarded) and are included under `transcripts/subagents/` (prefixed `stopped-run--` / `v2-stalled--`). The report documents this process failure rather than presenting a clean narrative — the same evidence-honesty rule the thesis asks of the systems it studies.

---

**Provenance:** `evidence-availability-use-gap/source_chat.md` is the full transcript of the session that produced this folder (both sides; tool-result bodies omitted). The reframed thesis is `THESIS.md`; ordered next steps are `NEXT-MOVES.md`.

*This folder is a research artifact. It reconstructs what was requested, what evidence and tools were available, what each agent inspected, what it claimed, what it did, and the final outcome — and it flags where its own evidence is weaker or stronger than claimed.*
