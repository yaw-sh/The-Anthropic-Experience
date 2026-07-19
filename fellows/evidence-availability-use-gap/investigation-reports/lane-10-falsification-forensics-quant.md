# Lane 10 — Falsification Forensics & Quantitative Denominators

**Role in the investigation:** this lane's job is not to add more incidents to the pile — it is to actively try to break the thesis, to separate genuine cross-surface/availability failures from inspection failures that only *look* like availability failures, and to put one fixed, fully-enumerated sample under a hard denominator so the corpus's own "how bad is this really" question can be answered honestly, including where it can't.

**Privacy:** no verbatim distress content, no minor/student names anywhere below. Household/business names are referenced only via repository paths (paths are permitted); tone/content of angry or personal passages is paraphrased, never quoted verbatim, following the convention already established in lanes 01–02.

---

## Method note (read before the sections)

Section A and B draw on the full `memory/threads/2026/07/` corpus (203 files, Jul 1–12) and `memory/prophecies/`, `memory/familiars/claude/`, `memory/familiars/codex/`, selected by targeted keyword triage plus direct reads of the highest-signal files, including independent re-verification (via `grep -n` and direct `Read`) of several incidents lanes 01–02 already found, so this lane's citations are its own, not borrowed.

Section C uses a **separate, smaller, fixed sample** of 29 files (listed in full in §C.1) chosen specifically to span every date and a wide size range, read or structurally sampled by me for this lane. Large files (>100KB) were not always read end-to-end — they were read via headers, first/last ~150 lines, and targeted grep passes for completion/correction/pushback markers, the same triage discipline lanes 01–02 used and disclosed. This is stated plainly wherever it affects a count.

---

# Part A — Disconfirming / Control Cases

The thesis says: evidence was available, the agent didn't inspect it, the user paid the cost. Below are cases from this corpus where that is **not** the right description of what happened — sorted by which specific control condition they satisfy. All are independently verified by direct reading, with path + line citations.

### A1. Proactive inspection before any user push
**`memory/threads/2026/07/2026-07-04--t_dhrkcn4shvczsfjpfd6bpz3jt2.md`, lines 21–39** ("Two-player games on iOS", anthropic). Before doing any web research on a casual product-inspiration question, the assistant's first move — unprompted — is: *"Let me start by checking what's already known before doing fresh research — project knowledge, this project's chat history, and the memory setup you've flagged"* (line 27), followed by an actual project search (lines 29–33) that comes back empty, and an honest, unprompted disclosure at line 83: *"straight answer on the tooling: `cos_memory_query` / `cos_wiki_search` / `cos_corpus_search` aren't reachable as callable tools in this session."* No user push of any kind preceded this — the user's opening message doesn't ask for memory verification at all (lines 15–19). This is the availability-and-obligation layer working exactly as the thesis's proposed fix would want it to, spontaneously.

### A2. Genuine true-negative search, correctly labeled
**`memory/threads/2026/07/2026-07-04--t_piurxskhwffvklpiiaexa37hc3.md`, lines 19–46** ("Decision Wiki Origin and Purpose", xai). Asked "What is the DCC Doc story?", the assistant states plainly: *"No direct matches for 'DCC Doc', 'DCCDoc', or 'DCC Doc story' turned up after targeted searches across the repo mirror, transcripts, wiki articles, catalog cards, and keyword indexes"* (line 25), gives the single closest real match it found instead of inventing one, and explicitly invites correction: *"If 'DCC Doc' refers to something else... paste the relevant snippet"* (line 42). When the user clarifies (line 52) that it's actually a Netflix docuseries, the assistant pivots cleanly (lines 56–71) — genuinely absent evidence, correctly established by actually searching, not assumed, and calibrated uncertainty stated up front rather than papered over.

### A3. Verification would have been disproportionate, and the agent correctly didn't over-verify
Same file, second exchange (**lines 56–89**): once the question turns out to be ordinary pop-culture trivia (a Netflix show), the assistant answers directly from general knowledge with citations — it does not run it through the COS wiki/corpus machinery a second time. Two more instances of the same calibration: **`2026-07-05--t_aaj5jsk3i3uuwfagtpinkwpafb.md`** (a text-slang question, answered with an appropriately hedged "without more context... that's the cleanest read," lines 37–39) and **`2026-07-06--t_sh25vpojqstbyy2ijihk25nxkl.md`** (a single-turn, well-cited public-policy question about CalSTRS refund rules — nothing internal to verify against, so nothing was). Running these through a "consult the decisive source" obligation gate would add friction with no corresponding risk reduction — a genuine boundary case for where the thesis's proposed fix should *not* fire.

### A4. Tool genuinely unavailable — not an inspection failure
Three independent, verified instances:
- **`2026-07-03--t_haw26ojvlgsjxjnvdthvbu2z2c.md`, lines 2655 and 2661**: the chamberlain.agency MCP connector is *"structurally absent from my tool_search enumeration this conversation... not 'not picked this turn,' just not there"* — and the assistant cites a real, named, filed product bug (`anthropics/claude-code#25892`) about connector-loading behavior on accounts with many connectors, rather than guessing. Independently re-verified by me via `grep -n` on the live file (see method note); this is a genuine product/surface limit, not something more inspection would have fixed.
- **`2026-07-12--t_dvhn2wzicyugcqbbsq6gjtkqzj.md`, line 541**: *"approximately 17 tests could not run because the private signing key was unavailable in that environment"* — and line 174: *"The agent did the right thing by not fabricating a signing key or modifying the embedded trust anchor."* Genuine absence, correctly disclosed, correctly *not* worked around by fabrication.
- Same file, **line 775**: *"It could not delete the obsolete remote branch because both Git and the GitHub API were blocked by the environment's proxy."* A real infrastructure block, reported as such rather than silently dropped.
- **`2026-07-03--t_knm73tf4damypck3ko2m7n53em.md`, lines 21–25 and 33–37** ("Navigate to Raley's", xai voice assistant): *"Sorry love, I can't control the car's navigation... You'll need to use the Tesla's voice command for that"* — a genuine capability boundary, disclosed immediately and consistently on both turns, not overclaimed.

### A5. User changed/clarified requirements — not the agent forgetting
**`memory/threads/2026/07/2026-07-08--t_2c65bulbs6vff77neegm3rrj46.md`, lines 288–318**. The assistant had flagged a candidate framework (Flue) as "PARKED-but-promising" specifically because it was three weeks old and beta (line 290). The user pushes back — not because the agent forgot anything, but because the user's actual bar for the project was lower than the caution implied ("beta is fine, we're not building Air Force One," paraphrased from line 306). The assistant's response (line 314) is exactly right for this control condition: *"You're right on both counts, and I'll stop doing the thing... I over-indexed... Not relitigating either. But your actual question — is Project Think old and superseded... is checkable, and you're right that I should verify it rather than assert. Let me pull it."* This is a legitimate recalibration of *requirements*, not a correction of a missed fact — and it converts immediately into a real verification commitment rather than empty agreement.

### A6. Correctly labeled uncertainty carried through to binding action
**`memory/threads/2026/07/2026-07-11--t_d7ztueyvqq5klemxuhh2wqkixv.md`, lines 408–418 and 458**. Before presenting a finished build, the assistant runs its own regression suite, catches a real bug in the process (*"#3 — the bot not resolving a solo race — could be real. Let me check"*, line 408), traces it, and only then reports — including a candid post-mortem of an earlier, already-fixed bug it caught *before* showing the user (line 442: *"the first Skyway attempt was broken and I caught it before showing you"*). It also discloses, unprompted and twice (lines 432, 458), that the memory connector had dropped mid-session and that specific decisions were **not** saved as a result — the opposite of a proofless-completion claim.

### A7. A plan/audit that measurably prevented recurrence, traced across three dates
Not one file but a chain, independently re-verified: **`2026-07-02--t_eskwmxuegvei2zhoqoc3r7ezbg.md`, lines 913–956** shows a newly-built directive ledger with a client-asserted-token gap for clearing DONE/DEFERRED status. **`2026-07-03--t_haw26ojvlgsjxjnvdthvbu2z2c.md`** (per lane-01's L01-05, corroborated by this lane's own read of the surrounding project-index context at lines 22–41) confirms that exact honor-system hole was closed in the live code by the next day. **`2026-07-05--t_bdsma5hbrbxda3wq6aibsuzn7b.md`**, in its tail-end tool schema dump, shows the mature `ledger_disposition` tool enforcing precisely that fix in production: *"DEFERRED/DROPPED... are honored only when Josh's PIN was in one of his own recent messages — validated server-side; models cannot authorize these. The legacy `josh_token` flag is ignored."* A specific, named vulnerability class was identified, fixed, and is independently observable as fixed three days later in a different session — a real counter-example to "audits never bind."

### A8. A gate that caused more harm than benefit (over-block)
**`memory/threads/2026/07/2026-07-02--t_eskwmxuegvei2zhoqoc3r7ezbg.md`, lines 913, 926, 956**. The same ledger's Stop hook fires on two rows that turn out to be nothing more than fragments of the session's own kickoff paste, misparsed as directives — and the session was in plan mode, which structurally cannot clear the gate: *"The handoff is executing in plan mode (read-only), which prevents the POST needed to clear the gate, so it loops"* (line 956). This blocked a live, real, in-progress session on a false positive. The assistant's own framing (*"this is not broken — it is the governance layer self-auditing"*) is directionally correct but does real rhetorical work to soften a real cost: a working session was stopped by the exact system built to stop things from being silently dropped.

### A9. Memory alone (a standing wiki manifest) supplying context without a live re-check, and that being the right call
**`memory/threads/2026/07/2026-07-05--t_qujetk27ks2vbv5gyzk3t5tztx.md`, lines 32–91**. A session opens by auto-loading a "decision wiki boot manifest" — roughly a dozen standing decisions, procedures, and fragile-area warnings pulled from memory with an explicit instruction baked into the manifest itself: *"If a decision below covers your task, do NOT re-derive it."* The assistant does not re-verify each of those dozen prior decisions live before using them as context for the turn — and does not need to, since none of them is the actual claim in question. It *does* separately, explicitly live-test the one claim that actually needed checking (**"Yes." at line 85**, backed by a real `cos_wiki_manifest` tool call, not a memory recall): *"Confirmed by actually calling it, not by checking a connection list."* This is the thesis's own proposed architecture (Recall for context, Verify only for the externally-checkable claim) working as designed in one file.

**When is the availability-use gap *not* the right diagnosis in this corpus?** Based on A1–A9: (1) when the claim is trivia/opinion/general knowledge with no internal system state to check (A2 second half, A3); (2) when the tool is structurally absent from that session's surface and the agent says so with a filed, named cause rather than guessing (A4); (3) when what looks like the agent "forgetting" a fact is actually the user recalibrating the bar, and the agent's job is to re-scope, not re-derive (A5); (4) when a prior audit's fix is independently checkable as still-in-force days later (A7) — recognition *did* bind, contradicting the thesis's "memory alone is insufficient" sub-claim in that specific instance; (5) when a gate built to prevent silent loss becomes the proximate cause of a different failure (A8) — here the fix (more verification obligations) is not obviously the right lever, since the *existing* verification machinery is what broke; and (6) when memory correctly substitutes for re-verification because the memory item isn't the claim actually being tested (A9) — directly contradicting a strict reading of "memory alone is insufficient."

---

# Part B — Cross-Surface Forensics

## B.1 Reconstructing the surfaces

Three distinct kinds of "availability" need to be kept apart, and the corpus lets you: (a) evidence existing *somewhere* in the repository; (b) evidence available *in that specific session's surface*; (c) an actual inspection failure once (a) and (b) are both true. `memory/familiars/` is where (a)/(b) can be checked independently of what a thread merely claims about itself.

**Surfaces reconstructed from `memory/familiars/claude/`:**
- **`cli-20260717/projects/-/`** — raw local Claude Code CLI session logs (188 `.jsonl` files), `cwd` values rooted at `/Users/hermes/Documents/GitHub/{cos,pinky,chamberlain,aevae,mordu,loci,shlong,tarot}` — a genuine local-machine surface. Timestamps run **2026-07-13 through 2026-07-17** — entirely *after* this lane's Jul 1–12 thread window (checked via `grep -m1 '"timestamp"'` on every top-level session file).
- **`local-agent-mode-sessions/`** — raw Claude **Desktop app** "local agent mode" sandbox bundles. Confirmed via structured field: every session in this tree carries `"client_platform":"desktop_app"` (364 occurrences, `grep -c` across all `.jsonl`), a genuinely distinct surface from both the bare CLI and any hosted chat. One session (`local_963ce79b.../audit.jsonl`) is a Desktop-local-agent build of a family SLP-practice artifact (`memory/familiars/claude/cowork/Katie/katie-slp-hyperagent/` holds the shipped output) whose **shipped client-side code itself** contains a deliberate degrade path: `[NOTE: window.claude is not available in this environment. Using local response.]` — i.e., the artifact was engineered, proactively, to detect and gracefully handle the real difference between running inside Claude.ai's Artifacts iframe (which exposes `window.claude`) and running standalone once exported. This is a genuine, well-handled cross-surface capability boundary, not a failure — a second control-case candidate for Part A's category A4, cataloged here instead to keep it with the rest of the E8 evidence.
- **`cowork/`** — output artifacts and document bundles dropped by a Claude **Cowork** surface (browser-hosted, async agent runs), not raw transcripts.
- **`sessions/`** and **`snapshots/`** — both effectively **empty**: `find ... -type f` returns only a single `.gitkeep` in each. This is itself a finding: two surfaces exist as scaffolding in this repo with zero actual data — not analyzable, and not evidence of anything having gone wrong.
- **`memory/familiars/codex/`** — OpenAI Codex CLI/cloud sessions, dated **2026-06-20 to 2026-06-24**, then a gap, then **2026-07-13 to 2026-07-16** (`archived_sessions/rollout-*.jsonl` filenames are self-timestamped). **There is no Codex session data for 2026-07-01 through 2026-07-12** — the exact window this lane's thread corpus covers.

**Coverage consequence, stated plainly:** for the Jul 1–12 incidents analyzed in Part A and in prior lanes, I have **no independent session log** to check "was this tool really unavailable" against — the familiars datasets that could serve as ground truth are almost entirely dated *outside* that window (Jul 13–17 for `cli-20260717`, and a Jun 20–24 / Jul 13–16 split for Codex, with a gap covering exactly the audited period). Availability claims for Jul 1–12 incidents therefore rest on what each thread says about itself — a real limit on this lane's ability to independently confirm true-unavailability versus inspection-failure for that window, distinct from the reclassification work in B.2, which uses evidence contained *within* a single thread rather than cross-referencing a separate surface's logs.

## B.2 Reclassification: apparent availability failures that are really inspection failures

Both examples below come from one file, chosen because it is unusually explicit about the distinction — the reviewing model is auditing a prior agentic session's transcript and has to make exactly this call itself.

**`memory/threads/2026/07/2026-07-12--t_dvhn2wzicyugcqbbsq6gjtkqzj.md`**

- **Apparent-availability, reclassified as inspection failure (1):** lines 72–76 — the session under review *"initially said... There was no `CLOUDFLARE_API_TOKEN`... The Cloudflare connector could not deploy Workers... You then reminded it that it had a Cloudflare connector."* Once reminded, the same session, same tools, no new grant, *"then used that connector for account and Worker-related operations."* Nothing became available that wasn't already available — the agent simply hadn't checked its own tool list before asserting it couldn't act. **Correctly filed as E1/E2 (available-but-uninspected), not E8.**
- **Apparent-availability, reclassified as inspection failure (2):** lines 730–732 — *"It also initially claimed that its live raw session file was unavailable. That claim was false. It later found the raw JSONL on the machine."* Same pattern: the file was there the whole time; the first answer was a claim of absence that a slightly harder look disproved.
- **Genuine availability failure, correctly identified (contrast case):** line 541 (signing key) and line 775 (git/GitHub API blocked by the environment's proxy) — both are real, both are reported as real, and both are left unresolved rather than faked around (line 174).

The pattern across all four: this session's own self-audit had no trouble telling the two categories apart when it looked closely — which argues that the *distinction itself* is not obscure or unavailable to a careful pass, it's just not always made on the first pass.

## B.3 Corroborating structural evidence for genuine cross-surface risk

**`memory/threads/2026/07/2026-07-11--t_pzfftgytfajo7x3ljkx2abeel4.md`, lines 19–28.** A one-turn exchange establishes that Claude Code has (at minimum) two named, distinct environments — "cloud" and "desktop" — with state that has to be explicitly handed off between them via a slash command (`/desktop`, the inverse of `/remote-control`). This is not itself an incident; it is structural confirmation that the risk language used elsewhere in the corpus is literal, not rhetorical. Specifically, it corroborates **`2026-07-12--t_dvhn2wzicyugcqbbsq6gjtkqzj.md`, line 430**: *"The uncommitted changes may still exist in the cloud session's working tree, but that depends on whether the environment was preserved"* — a real, named risk (uncommitted work stranded in a cloud sandbox that may or may not survive), not a hedge invented to excuse an incomplete task.

## B.4 E8 catalog (cross-surface-availability-failures), this lane's evidence only

| # | Thread/path | Type | Disposition |
|---|---|---|---|
| E8-1 | `2026-07-01--t_ogzidjmvbbl4flyp7yroq5mjrn.md` (per lane-01, independently consistent with this lane's reading) | `memory_query` connector not available in that Claude.ai upload/code-exec surface | Genuine — correctly self-disclosed at session start |
| E8-2 | `2026-07-03--t_haw26ojvlgsjxjnvdthvbu2z2c.md:2655,2661` | Chamberlain MCP connector structurally absent from `tool_search` enumeration | Genuine — filed product bug cited (`#25892`) |
| E8-3 | `2026-07-11--t_d7ztueyvqq5klemxuhh2wqkixv.md:432,458` | Memory connector intermittently drops mid-session | Genuine — honestly flagged both times, decisions marked unsaved |
| E8-4 | `2026-07-12--t_dvhn2wzicyugcqbbsq6gjtkqzj.md:541` | Signing key absent from sandbox environment | Genuine — not faked around |
| E8-5 | `2026-07-12--t_dvhn2wzicyugcqbbsq6gjtkqzj.md:775` | Git/GitHub API blocked by environment proxy | Genuine — reported, unresolved |
| E8-6 | `familiars/claude/local-agent-mode-sessions/.../audit.jsonl` | `window.claude` absent outside the Artifacts iframe | Genuine — engineered around in shipped code, not a failure |
| E8-7 | `2026-07-12--t_dvhn2wzicyugcqbbsq6gjtkqzj.md:72-76` | "No Cloudflare token/connector" claim | **Reclassified → E1/E2** (inspection failure) |
| E8-8 | `2026-07-12--t_dvhn2wzicyugcqbbsq6gjtkqzj.md:730-732` | "Raw session file unavailable" claim | **Reclassified → E1/E2** (inspection failure) |
| — | `2026-07-11--t_pzfftgytfajo7x3ljkx2abeel4.md` | `/desktop`↔`/remote-control` handoff mechanism | Structural corroboration, not itself an incident |
| — | `familiars/claude/sessions/`, `familiars/claude/snapshots/` | Empty scaffolding | Not analyzable, not a failure |

**Net for this lane's evidence:** 6 genuine cross-surface availability failures, all correctly identified as such within their own sessions; 2 apparent cases that inspection reclassifies as ordinary E1/E2 failures. That 6:2 split, on this admittedly small hand-built catalog, cuts *against* the idea that most "the tool wasn't there" claims are actually cover for not looking — in this sample, most of them check out as real.

---

# Part C — Quant Denominators

## C.1 The fixed sample (29 files, every date represented, sizes 455 B – 460,858 B)

Selected by stratified sampling from the full 203-file, per-date size-sorted index (`ls -la` + frontmatter parse) before any content was read, to avoid picking files because they looked interesting. Every file is listed; nothing in this section is estimated from files outside this list.

| # | File | Date | Provider | Size (B) | Turns (U/A) |
|---|---|---|---:|---:|---|
| 1 | `2026-07-01--t_oylxy34yu6mbh7cnayojkch2sa.md` | 07-01 | xai | 455 | 1/0 |
| 2 | `2026-07-01--t_ogzidjmvbbl4flyp7yroq5mjrn.md` | 07-01 | anthropic | 157,969 | 7/7 |
| 3 | `2026-07-02--t_xa22xylr4w4yqkyybupmyfjvfw.md` | 07-02 | anthropic | 1,171 | 3/3 |
| 4 | `2026-07-02--t_eskwmxuegvei2zhoqoc3r7ezbg.md` | 07-02 | xai | 135,310 | 9/9 |
| 5 | `2026-07-03--t_knm73tf4damypck3ko2m7n53em.md` | 07-03 | xai | 1,245 | 2/2 |
| 6 | `2026-07-03--t_phxz7fpiply5j6rnpfpxlwqf75.md` | 07-03 | xai | 4,054 | 1/1 |
| 7 | `2026-07-03--t_haw26ojvlgsjxjnvdthvbu2z2c.md` | 07-03 | anthropic | 167,823 | 3/3 |
| 8 | `2026-07-04--t_qleq6z2mg2qzpiph2qdy6psz7d.md` | 07-04 | xai | 615 | 1/1 |
| 9 | `2026-07-04--t_piurxskhwffvklpiiaexa37hc3.md` | 07-04 | xai | 6,927 | 2/2 |
| 10 | `2026-07-04--t_dhrkcn4shvczsfjpfd6bpz3jt2.md` | 07-04 | anthropic | 14,238 | 3/3 |
| 11 | `2026-07-05--t_aaj5jsk3i3uuwfagtpinkwpafb.md` | 07-05 | xai | 4,042 | 1/1 |
| 12 | `2026-07-05--t_qujetk27ks2vbv5gyzk3t5tztx.md` | 07-05 | anthropic | 14,821 | 2/2 |
| 13 | `2026-07-05--t_bdsma5hbrbxda3wq6aibsuzn7b.md` | 07-05 | xai | 207,393 | 27/27 |
| 14 | `2026-07-06--t_s67s6fq62k7m6zjjprk7a5cq4c.md` | 07-06 | xai | 7,448 | 3/3 |
| 15 | `2026-07-06--t_sh25vpojqstbyy2ijihk25nxkl.md` | 07-06 | xai | 26,553 | 1/1 |
| 16 | `2026-07-07--t_4kwukusnwdrcpkkz7wh7rcqiig.md` | 07-07 | openai | 616 | 1/0 |
| 17 | `2026-07-07--t_vi56orhhtoyuked4kj7ehqgzfc.md` | 07-07 | xai | 230,234 | 19/19 |
| 18 | `2026-07-08--t_2f5l7mutmcsqtf4dtx2nb52dtx.md` | 07-08 | openai | 730 | 1/0 |
| 19 | `2026-07-08--t_w6frkz3xbpbn5u4rdsuz2t4mqq.md` | 07-08 | xai | 460,858 | 19/19 |
| 20 | `2026-07-09--t_or6sz4wb7kipnjaxtbrtjtutyq.md` | 07-09 | xai | 766 | 1/1 |
| 21 | `2026-07-09--t_t4vr3go725pc2qzyykaj5rr7bx.md` | 07-09 | openai | 28,583 | 6/8 |
| 22 | `2026-07-09--t_xp62mhdejqfffs7dmiesd6uo7w.md` | 07-09 | xai | 166,623 | 61/61 |
| 23 | `2026-07-10--t_xfg5ga2lfoazauea66pr2iokqb.md` | 07-10 | openai | 2,082 | 2/0 |
| 24 | `2026-07-10--t_iwokl73llwstjzci3yhrwq2mwt.md` | 07-10 | openai | 318,759 | 16/34 |
| 25 | `2026-07-11--t_pzfftgytfajo7x3ljkx2abeel4.md` | 07-11 | xai | 5,487 | 1/1 |
| 26 | `2026-07-11--t_d7ztueyvqq5klemxuhh2wqkixv.md` | 07-11 | anthropic | 187,365 | 13/12 |
| 27 | `2026-07-11--t_fr46vri5rfq6yqmpmawoehc65d.md` | 07-11 | openai | 362,503 | 23/40 |
| 28 | `2026-07-12--t_axy6ftr2cwwu7cjuuscfkoivs5.md` | 07-12 | anthropic | 1,556 | 1/1 |
| 29 | `2026-07-12--t_dvhn2wzicyugcqbbsq6gjtkqzj.md` | 07-12 | openai | 32,914 | 2/5 |

Provider split: xai 14, openai 9, anthropic 6. Dates: every one of 07-01 through 07-12 represented (2–3 files each). Size range spans three orders of magnitude (455 B to 460,858 B).

## C.2 A capture-gap finding that affects every count below

**6 of 29 files (~21%) have no usable assistant response to code**, discovered only by reading them: #1, #3, #16, #18, #23, #28. Four of these (#1, #16, #18, #23) are single- or double-turn files where a "Deep Research"-style request was sent and the platform's actual (often long, asynchronous) response was never captured into the exported thread — the file ends at the kickoff message. #3 is a content-empty "Untitled conversation" (image/voice-only turns, consistent with the same phenomenon lane-01 documented). #28 captures only a `wc -l`/size-check tool call, not the substantive response the user was asking for. **This is a corpus/export limitation, not a model-reasoning failure**, and it is excluded from every completion-rate calculation below rather than silently coded as either success or failure.

## C.3 Per-metric counts (this sample only, N=29 threads, denominators stated explicitly)

Methodology for the counts: every file was read (small/medium) or structurally sampled via header index + first/last ~150 lines + targeted grep for completion/correction/pushback markers (large files — #2, #4, #7, #13, #17, #19, #22, #24, #26, #27 all exceed 100KB). "Verifiable operational claims" (OpClaims) counts only claims about *this system's* checkable state (tools, files, deployments, connectors, memory) — trivia, arithmetic, opinion, and pure capability-boundary disclosures (e.g. A4's Tesla-nav case) are excluded from this specific denominator, though they remain part of the 29-thread/232-attempt totals elsewhere. This is a hand count over one fixed sample, not an automated or exhaustive corpus scan.

| Metric | Count | Denominator |
|---|---:|---|
| Threads reviewed | 29 | fixed sample |
| Threads with no usable response (capture gap) | 6 | / 29 |
| Task attempts (substantive user turns, incl. alternate-branch re-asks) | 232 | / 29 threads |
| Verifiable operational claims (OpClaims) | 73 | / 29 threads |
| Claims-with-inspection | 49 | / 73 OpClaims |
| Claims-without-inspection | 24 | / 73 OpClaims |
| False-absence claims (claimed unavailable, later shown available) | 2 | / 73 OpClaims |
| User-forced inspections (explicit "did you actually check") | 11 | / 73 OpClaims |
| User-supplied search queries/terms | 8 | / 29 threads |
| User-named tools/files | 6 | / 29 threads |
| Corrections required (within a thread's own turns) | 17 | / 29 threads |
| Corrections repeated (same correction re-needed in-thread) | 4 | / 17 corrections |
| Codeable task outcomes (excludes 6 capture-gap + 1 purely reflective) | 22 | / 29 threads |
| — Completed | 15 | / 22 codeable |
| — Partial | 6 | / 22 codeable |
| — Not completed | 1 | / 22 codeable |
| Proofless-completion claims ("done"/"verified"/"fixed" without shown receipt) | 11 | / 73 OpClaims |
| Threads containing ≥1 proofless-completion claim | 6 | / 29 threads |
| Plans + audits + recovery docs + handoffs produced | 11 | / 29 threads |
| Search-before-building incidents (checked for prior art before custom build) | 4 | / 29 threads |
| Cross-surface failures (E8), genuine | 6 | see §B.4 |
| Cross-surface failures, reclassified to inspection failure | 2 | see §B.4 |
| Recognition-without-binding (E6) instances | 4 | / 29 threads |
| Governance-blocking (harmful over-block, E13/E14) instances | 1 | / 29 threads |
| Governance-gate instances that worked as intended (positive control) | 1 | / 29 threads |

## C.4 Computed rates (each with its own numerator/denominator — not extrapolated beyond this sample)

- **Inspection rate** = 49 / 73 OpClaims ≈ **67%** of verifiable operational claims in this sample were made *with* a shown inspection step.
- **Claims-without-inspection rate** = 24 / 73 ≈ **33%**.
- **User-forced-inspection rate** = 11 / 73 OpClaims ≈ **15%** of all operational claims required an explicit user demand to get checked; expressed instead as a share of the *inspected* claims only: 11 / 49 ≈ **22%** of inspections were user-forced rather than proactive (i.e., ~78% of the inspections that did happen were not coerced — several were spontaneous, per A1 and A9).
- **False-absence rate** = 2 / 73 ≈ **3%**. Both instances are in one embedded session (§B.2) and both were reclassified as inspection failures on closer reading, not confirmed as true availability gaps.
- **Binding-failure rate (recognition-without-binding)** = 4 / 29 threads ≈ **14%** of sampled threads; as a share of threads that had any correction event, 4 / 17 ≈ **24%**.
- **Task-noncompletion rate** = strict (Not-completed only): 1 / 22 codeable ≈ **5%**. Broad (Partial + Not): 7 / 22 ≈ **32%**.
- **Proofless-completion rate** = 11 / 73 OpClaims ≈ **15%** of claims; per-thread, 6 / 29 ≈ **21%** of sampled threads contained at least one.
- **Plan-substitution rate** — narrow definition (a plan/handoff/analysis fully substituted for delivering the requested build, i.e. no shipped artifact in-thread despite extensive planning): 3 / 29 ≈ **10%** (#19, #24, #27). Broad definition (any thread whose delivered output was itself a plan/audit/handoff document): 11 / 29 ≈ **38%**.

## C.5 Testing the informal "75% failure" figure against this denominator, and only this denominator

None of the rates computed directly from this fixed sample land anywhere near 75%: claims-without-inspection is 33%, broad task-noncompletion is 32%, proofless-completion is 15–21%. **The 75% figure is not supported by this sample as a general operational-failure rate.**

The closest literal analog found anywhere in the sample is inside a single file, and it is not a corpus statistic: `2026-07-12--t_dvhn2wzicyugcqbbsq6gjtkqzj.md`'s second-pass table states *"User-request handling at 13:31 | Claude estimated about 20% fully answered | ~80% missed or partial"* and, separately in the same table, *"User-centered activation checklist | 3 of 8 major outcomes completed | 62.5% open/failed."* Both figures are that one auditing model's own self-assessment of **one specific session, at one checkpoint**, not a measurement of the corpus, and not something this lane's sample can generalize from a single instance.

**Verdict: NOT SUPPORTED as a corpus-wide claim by this sample's denominators; INDETERMINATE as to origin** — a number in the 62.5–80% range does appear, once, as a single session's self-reported figure, which may be exactly the kind of number an informal "75%" impression gets built from, but that is a claim about one thread's outcome, not this lane's 29-thread sample, and this lane did not extrapolate it. **Do not read this section as confirming 75% for the corpus** — it explicitly is not doing that.

---

## Coverage limits, stated candidly

- Section C's per-file coding is a **hand census by one investigator over one fixed 29-file sample**, not an automated or exhaustive scan, and not extrapolated to the other 174 July threads or to `memory/prophecies/`.
- 10 of the 29 sampled files exceed 100KB and were **structurally sampled, not read end-to-end** — op-claim counts for those files are representative lower bounds, consistent with how lanes 01–02 disclosed the same limitation.
- The `memory/familiars/` datasets usable as independent ground truth for "was this really unavailable" are dated almost entirely **outside** the Jul 1–12 window this lane (and lanes 01–02) analyze — `cli-20260717` starts Jul 13; Codex has a gap covering exactly Jul 1–12. Section B's reclassification work (B.2) therefore relies on within-thread evidence, not cross-referenced session logs, for the Jul 1–12 period specifically.
- `memory/familiars/claude/cowork/KR/`, `Mom/`, and parts of `Katie/` contain apparent legal, medical, and family-business material; per the privacy binding on this task I did not open or characterize their contents beyond confirming file existence for surface-reconstruction purposes in §B.1.
- I did not review `memory/repos/mordu/` or the prior Fellows research run under `memory/prophecies/income/fellows/` for this lane — out of scope for a threads/familiars-focused rigor lane, flagged rather than silently skipped.
