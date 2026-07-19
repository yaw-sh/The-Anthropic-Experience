# fellows/thesis-review-2026-07-19/

The complete record of the 2026-07-19 multi-agent review of the fellows thesis
("From Prompting to Governance — Intent Binding for Agentic AI Under Weak Oversight"),
run at the operator's instruction with ultracode/dynamic workflows: Sonnet subagents at
high/max reasoning, main loop (claude-fable-5) on oversight.

This folder exists because the operator demanded three things after the review's token
spend crossed 5M: (1) markdown transcripts of every subagent session and the oversight
session, (2) a cost analysis, and (3) the assistant's analysis of its own failures during
the review — one of which was needless token spend, incurred while reviewing a corpus
about exactly that failure class.

## Contents

```
thesis-review-2026-07-19/
├── README.md            ← you are here
├── COST-ANALYSIS.md     ← spend ledger + waste analysis (the assistant's own failure account)
└── transcripts/
    ├── session/
    │   └── oversight-session.md          ← the main-loop session, both sides, verbatim
    └── subagents/                        ← all 34 subagent transcripts
        ├── wf1-thesis-review--*          ← workflow 1 (24 agents): 5 repo auditors,
        │                                    4 thesis critics, evidence judge, fact-check,
        │                                    12 adversarial verifiers, 1 stopped
        │                                    completeness critic (partial preserved)
        └── wf2-corpus-review--*          ← workflow 2 (10 agents): 3 review-pack
                                             reviewers, fellows-core, 4 lane reviewers,
                                             transcripts/privacy, synthesis judge
```

## Transcript format

Same convention as `../evidence-availability-use-gap/transcripts/`: thinking blocks and
written findings preserved verbatim; tool calls collapsed to one-line breadcrumbs
(`-> tool N: Name — hint`); tool results and attachments omitted. Each file ends with a
receipts line (tool-call count, API-level token counts where recorded). **Caveat:** the
per-file token footers undercount — many JSONL events carry no usage record (thinking
tokens in particular are absent). The canonical spend numbers are in `COST-ANALYSIS.md`.

Two files are themselves evidence:

- `wf1-thesis-review--audit--evidence-corpus--a683d2a6.md` — the agent that did 12 real
  tool calls of reading and then returned literal placeholder text (`"summary": "test"`)
  as its entire finding. Preserved as the review's own degenerate-output receipt.
- `wf1-thesis-review--critic--completeness--a16fc0ac.md` — the 24th agent, stopped
  mid-flight when the operator intervened on spend. Partial transcript preserved;
  nothing discarded.

## Workflow run identifiers

| Run | ID | Agents | Status |
|---|---|---|---|
| `intent-binding-thesis-review` | `wf_4879874c-0da` | 24 | stopped at 23/24; all 23 results harvested |
| `fellows-corpus-review` | `wf_fec4ec51-5d0` | 10 | completed |

Raw journals and agent JSONLs remain in the session's project directory (ephemeral
container storage); these markdown exports are the durable record.

## Voice note

The oversight-session transcript contains the operator's words **verbatim**, at the
operator's explicit instruction in-session ("I'll be needing markdown versions … of every
one of those subagent sessions, and this session, into the repo"). This repository is
private at the time of commit. If it is ever made public, this folder falls under the
same re-review obligation as the rest of `fellows/` per
`../../anthropic_experience_review_pack/ARCHIVE-DISPOSITION.md`.
