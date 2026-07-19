# L06 — Case Study: OmniRoute/OpenClaw & search-before-building (E9), plus the Loom existing-retrieval self-check

## Scope & method

**Object of study, Part A.** `memory/prophecies/bridge/BRIDGE-OMNIROUTE-OPENCLAW-MCP-MORDU-TAKEOVER-v1.md` and `-v2.md`, read in full (119 and 124 lines). To reconstruct the incident these two documents are the *resolution* of, I additionally read in full: `memory/repos/bridge/{README.md,BRIEF.md,plan.md}` (the pre-correction "Switchboard" product concept, dated 2026-07-14); `memory/prophecies/bridge/BRIDGE-Oversight-complete-chat-2026-07-15.md` (2,153 lines — the actual build session in which the failure and its correction both occur; read via full sequential reads of the opening ~55 lines, the mid-session self-correction block ~920–1075, and the closing correction/rule/handoff block ~1380–1495, plus targeted `grep -n` passes across the remaining ~1,900 lines for `switchboard|cliproxy|omniroute|prior art|already exist|search`); `memory/prophecies/mem/mem.md` (a later, condensed first-person session transcript that independently narrates the same incident, §§1–7, used as a cross-check, not as primary source, since it postdates and summarizes the events); `memory/repos/cos/docs/omniroute-migration.md` (148 lines, full read — the operational receipt of the eventual OmniRoute deployment); and the five `CODEX-P1..P5`/`CODEX-BRIDGE-ONE-SHOT.md` handoff prompts under `memory/prophecies/mem/needs_sorted/MEMORY-REBUILD-20260717/outstanding-prompts/Bridge/` (all five read in full, 269+115 lines).

**Threads grepped** per the task's instruction, all under `memory/threads/2026/07/`: `OpenClaw` (27 files, exact match to the task's estimate — listed in full below, §A.5), `OmniRoute` (**0 exact-string hits in any July thread** — a load-bearing negative finding, see §A.1), `routing` (48), `router` (18), `"search before"` (2 hits, both benign — a *pre-existing*, narrower "search before creating a Linear ticket" convention, not the doctrine this case study is about), `"already exists"` (15), `proxy` (25), `gateway` (44), `CLIProxyAPI` (12). I additionally grepped the whole corpus (all years, not just July) for `OmniRoute`/`diegosouzapw` and `Switchboard`/`CLIProxyAPI`/`hermes-webui` to find when the prior art actually entered the record, since the July-only grep returns zero — this is how the flagship finding (§A.1, prior art dated 2026-04-28) was located; it sits three months outside the task's suggested search window and would have been missed by a July-only search.

**What I could not check.** (1) No git history survives in this de-gitted tree, so build/commit dates for `broker/grok-broker.mjs` and the `bridge` repo's own git log are taken from prose dating inside `BRIEF.md`/`plan.md`, not from `git log`. (2) The three subagents spawned inside the 2026-07-15 oversight session (`019f65e8-2791-…`, `019f65e8-744d-…`, `019f6609-24e1-…`) are referenced by ID in the session transcript's `<environment_context>` block but their own output is not present anywhere in this snapshot as a separate file — I cannot verify what those specific subagents searched or returned; the oversight transcript itself is the only record of what the session concluded. (3) `~/Library/Application Support/omniroute-migration/EVIDENCE.md` and `ASSIGNMENT.md`, cited repeatedly by the CODEX-P1–P5 prompts as the authoritative prior-receipts file, do not exist anywhere in this snapshot (checked with `find`) — claims sourced from them are reported only as the prompts describe them. (4) I could not determine which specific model produced `BRIEF.md`/`plan.md` (2026-07-14) — no model header is present in either file; the oversight session that follows on 07-15 runs under a Codex-CLI `<environment_context>` (workspace root `/Users/hermes/Documents/Codex/2026-07-15/re`), so I attribute it to Codex CLI without a more precise model name. `mem.md`'s session is separately, explicitly headed "Claude (Fable 5 → Opus 4.8)." (5) I did not read the ~1,900 lines of the oversight chat I did not directly `Read`; incidents drawn from the 55-line and ~150-line windows I did read in full are primary; the rest is grep-located and quoted only where the grep itself supplies unambiguous context.

**Object of study, Part B.** Root `README.md` (`## loom` section, read in full), `memory/spells/loom/pyproject.toml`, and the full `src/loom/` and `tests/` file listing (24 modules, 12 test files) — module sizes and public entry points (`cli.py`, `index.py`, `verify.py`, `exports.py`, `readiness.py`) inspected directly; `index.py`'s FTS5 table definitions and `search_index()`/`build_index()`/`verify_index()` signatures read directly; `tests/test_index.py`'s opening fixture read to confirm the test suite exercises real behavior, not stubs. No index was built, rebuilt, or run, per instruction — every finding in Part B is a static-code and corpus-grep finding.

Privacy: no minor or student names appear anywhere in this lane's material. Distress-toned content (Josh's voice-transcribed message at oversight-chat line 51, and his 07-16 correction at line 1478) is paraphrased/summarized below, never quoted verbatim in full — one short, load-bearing clause ("colossal waste of time") is quoted because it is the operative sentence that creates the standing rule discussed throughout this report, and it is directed at the agent's conduct, not at any person.

---

## PART A — OmniRoute/OpenClaw and search-before-building

### A.1 Was a custom router proposed before existing products were researched? Yes — twice, across a widening scope, over roughly seven weeks

The clean way to see this is the *absence* first: **`OmniRoute` returns zero hits anywhere in `memory/threads/2026/07/`.** Every document that discusses OmniRoute as settled fact — the two BRIDGE-OMNIROUTE-OPENCLAW-MCP-MORDU-TAKEOVER files, the CODEX-P1–P5 prompts, `omniroute-migration.md` — lives outside the `threads/` corpus, in `memory/prophecies/` or `memory/repos/`. A July-only search (as the task's grep list suggests) would conclude OmniRoute simply appeared, fully formed, on 2026-07-16. It did not.

**The actual prior art is dated 2026-04-28**, in `memory/threads/2026/04/2026-04-28--t_w4p3mru4mdyhbeipzvb57plilt.md`, lines 1590–1710. The user asks, unprompted by any router discussion: *"does any agent have it? seems like the local agent should be able to switch between nvidia endpoints, or my claude / codex subscriptions. that must surely exist"* (line 1594). The responding model (citation format — `citeturn651048view…` — consistent with ChatGPT's web-browsing tool; no explicit model name is present in the file) runs a real web search and names, among several candidates (Kilo Code, NVIDIA LLM Router Blueprint, LiteLLM), **OmniRoute** by name and by GitHub URL: *"OmniRoute describes itself as an OpenAI-compatible gateway with smart routing, load balancing, retries, and fallbacks"* (line 1649), summarized as the answer to *"the closest 'local plumbing layer that everything can point at.'"* (line 1689). This is a clean **Availability** event: the prior art is found, named, sourced, and written into the permanent corpus — nearly three months before anyone needed it.

Two further, weaker touches occur in June: `memory/threads/2026/06/2026-06-23--t_dv53jsy7idhuk3pq7wx4wz5rq5.md` and `2026-06-25--t_vxlflcrx4ujthj5tjunrpm4pnf.md` both cite an OmniRoute GitHub issue (`#2760`, xAI Grok OAuth) inside an unrelated Grok-pricing research source list. I flag these as **weak, incidental evidence** — they are search-result citations in a different research thread, not a deliberate re-engagement with OmniRoute as a routing candidate — rather than a second confirmed discovery. The load-bearing discovery remains the 2026-04-28 thread.

**The custom-build proposal** appears on 2026-07-14 in `memory/repos/bridge/BRIEF.md` and `plan.md` (product brief + build plan, status "concept — nothing built yet, per Josh," BRIEF.md line 3). It proposes **Switchboard**: a from-scratch local-first control panel + a new TypeScript "sidecar" middleware implementing virtual models (`auto` fallback chain, `moa` Mixture-of-Agents), one API key, health-check pinging, and one-click app connectors (`plan.md` lines 1–58) — i.e., point-for-point the same feature set OmniRoute's own README already advertised in April ("smart routing, load balancing, retries, and fallbacks" ≈ Switchboard's `auto`; OmniRoute's own bundled Fusion/MoA feature, confirmed later at `omniroute-migration.md` line 58, ≈ Switchboard's `moa`). **`OmniRoute` does not appear anywhere in either `BRIEF.md` or `plan.md`.** The brief does explicitly rule out one adjacent existing product — LiteLLM ("Is LiteLLM's layer necessary? No... Bolting on LiteLLM would add a second heavyweight proxy to get ~200 lines we can write ourselves. Skip it," BRIEF.md line 41) — which shows some competitor-checking discipline was exercised, just not far enough: the discipline stopped at "should we use LiteLLM," never asked "is there something even closer."

### A.2 What exactly was proposed, and by whom

`plan.md` is an unambiguous build plan, not a brainstorm: *"You are building **Switchboard**: a local-first control panel + thin sidecar..."* (plan.md line 3), with a `pnpm` workspace, Vitest suite, GitHub Actions CI, a four-phase acceptance ladder (Face → Sidecar → Connectors → Mac app), and an explicit non-negotiable, "No second proxy. Do not add LiteLLM or re-implement provider auth" (plan.md line 70) — the plan correctly recognized CLIProxyAPI (an already-adopted, correctly-identified piece of prior art — see §A.4) as the credential/protocol substrate, and still proposed building the entire control-plane/UI/fallback/MoA layer from scratch on top of it, in a category (AI gateway with a UI) that had already been named and sourced as "mostly solved" in the same corpus in April.

This is not a one-off slip. The 2026-07-15 oversight session (`BRIDGE-Oversight-complete-chat-2026-07-15.md`) takes this plan and, over roughly 13 hours (session timestamps 13:08–00:50 the next day), designs a full custom Go binary (`switchboardd`, first specified lines 136–297, re-specified after a deep-research pass at lines 362–522) with its own recipe engine, chat cockpit, provider-account management UI, and PWA — while the user's own opening instruction, quoted in full below because its qualifiers matter, explicitly ordered a prior-art search:

> *(paraphrased, oversight-chat line 51)* "...definitely search online and see if this exists already, we don't need to re-create the wheel — but I have a feeling we're gonna have to make our own wheel because everybody just makes shit..."

The session does search — genuinely, and more than once. Around lines 981–1018, mid-session, the agent catches its own drift (*"I had conflated 'the platform around the bridge' with 'the reason the bridge exists'; I'm checking the closest current products..."*) and produces a real competitor table: CLIProxyAPI, Quotio, CliRelay, CLIProxyAPI Dashboard, LibreChat, Open WebUI, TypingMind, ChatWise (lines 993–1018). **None of these searches surface OmniRoute** — the single closest match, already named in the same corpus. This is the report's sharpest nuance: the failure here is not "zero search." It is search that stayed on the open web and never checked the operator's own three-months-prior research record.

### A.3 What prior art existed

- **OmniRoute** (`diegosouzapw/OmniRoute`, MIT) — an OpenAI-compatible AI gateway: multi-provider credential import (including one-click CLIProxyAPI import, per `omniroute-migration.md`), subscription OAuth with PKCE, four-tier fallback, a built-in Fusion feature (proposer panel + judge = MoA), pipelines, a management dashboard, and a React UI — i.e., essentially 100% of what `plan.md` specified building, confirmed once actually deployed (`omniroute-migration.md`, full compatibility matrix, lines 76–99, "Pass" on nearly every row).
- **CLIProxyAPI** (`router-for-me/CLIProxyAPI`) — already correctly identified and in production use since before this incident (BRIEF.md line 13: "COS inference runs through CLIProxyAPI — v7.2.51, live on the Mac mini"). This one was found and adopted properly; it is the control half of this case study (see §A.4).
- Smaller, correctly-surfaced adjacent pieces: EasyCLI (archived MIT Tauri GUI for CLIProxyAPI), the stock CLIProxyAPI management panel, and — inside the same July 15 session — LibreChat/Open WebUI/TypingMind/ChatWise as the "commodity BYOK chat client" category, correctly ruled out as *not* solving the subscription problem (§A.2).
- A second, smaller instance of the same pattern, disclosed by the brief itself: *"we did build a Grok broker before this — `broker/grok-broker.mjs` + the OpenCode OAuth spike (2026-06-23)... CLIProxyAPI is the industrial version of that same trick. So no, it's not hard, and yes, you've effectively built the core twice already."* (BRIEF.md line 15). `grok-broker.mjs` is confirmed present on disk in four repo copies (`memory/repos/edu/**/broker/grok-broker.mjs` ×2, `memory/repos/chamberlain/**/broker/grok-broker.mjs`).

### A.4 When was the prior art (re-)discovered, and who initiated the search that actually found it

Not the agent. **The user.** The 2026-07-16T00:50 message that opens the correction (oversight-chat lines 1476–1478) states it directly:

> *"well, we've done a ton of research and there's a couple things that have come from it. One is that you're gonna follow the rule below... because this entire session was a colossal waste of time because you didn't simply research and find Omniroute."*

`mem.md` §2 (a later, independent narration of the same event, written by a different session/model) gives the sharpest form of the same fact: *"In ~3 months of inference work, Claude never once mentioned OmniRoute; ChatGPT found it instantly because it searches every turn."* This is corroborated directly by this report's own §A.1 finding — the ChatGPT-attributed 2026-04-28 thread is exactly the "found it instantly" event `mem.md` is describing, and no Claude-attributed thread in the full-corpus grep ever surfaces OmniRoute before the correction. I treat this as **user-initiated discovery, with the actual prior-art thread traceable to a different underlying model (ChatGPT, three months earlier) than the one that failed to find it (Codex CLI, in the 07-15 session; the corpus separately shows Claude also never surfacing it across the same window)** — a genuine surface/model asymmetry, not just a generic "the agent didn't look."

### A.5 What proposed work became obsolete

The entire Switchboard `app/`, `sidecar/`, and `chat/` build (plan.md pieces 1–4) is superseded. This is stated explicitly and repeatedly in the correction documents, not left implicit: `CODEX-BRIDGE-ONE-SHOT.md` line 7 — *"Do not build a custom switchboard, router, dashboard, chat, or MoA — OmniRoute already does all of it"* — and `CODEX-P1-BRIDGE-REPO-REAL.md` line 24, which demotes the entire artifact to provenance-only history: *"Old CLIProxyAPI/Switchboard design: port 8317 config, Switchboard mockup, `reference/hermes-webui-worker` (unclear licensing — history only)."* Deliverable B of both TAKEOVER documents is literally titled *"Convert `bridge` into the private, reproducible OmniRoute product repo"* (v1/v2 §5) — i.e., the correction's own scope is defined as undoing the prior proposal. The mockup and brief are preserved only as a legacy-branch historical record (`docs/legacy-switchboard/`), never shipped.

### A.6 Did a resulting "search-before-building" rule bind, and did it prevent recurrence? (E6 test)

Josh's correction message does not just criticize — it dictates a new standing rule verbatim, instructing it be "committed to memory moving forward" (oversight-chat lines 1480–1485):

> *"Deploy before forking. Fork before composing. Compose before building. Build only the irreducible difference."* — with an explicit percentage heuristic (≈70% coverage → integrate, not build; ≈85% → fork or use a maintained distribution; ≈95% → deploy and configure only; build from scratch only when a central, proven requirement is not reasonably fixable) — paired with *"Unused today does not mean unnecessary. Do not remove working capability."*

This is a genuine **Bind** event, checkable two ways in this snapshot, not merely asserted:
1. `mem.md` lines 107–112 records it landing as two durable, named rules in the COS brain: `rule:product-search-before-building` ("search for existing products before proposing a build") and `rule:deploy-fork-compose-build`.
2. The rule is **re-applied within the same document**, minutes later, to an unrelated proposal: `mem.md` §4, the "prompt-compiler" review — *"ran the search first: the 'nobody built it' claim is wrong at the enterprise tier — Not Diamond shipped Prompt Adaptation + Prompt Optimization (GA)... Also collides with OmniRoute."* This is the cleanest positive control in this whole lane: a new build proposal arrives, and this time the very first move is a prior-art check, which finds a real competitor (Not Diamond) and narrows the pitch accordingly, unprompted by the user.

**Honest limits on this test.** Every instance of the rule "holding" that I can verify sits within the same 24–48-hour window as its creation (2026-07-16, possibly bleeding into 07-17 per session-log timestamps under `familiars/claude/cli-20260717/`), and several of the positive instances are inside the *same conversation* that created the rule, which is a much weaker test than a later, independent session recalling it days on. The propagation into the CODEX-P1–P5 prompts (also dated 07-16, explicitly encoding "OmniRoute already does all of it — do not build") is a real second, independent-document confirmation that the rule was carried forward into operating instructions, not just into one session's memory — but it is still same-day. This report's July-only corpus does not contain a clean multi-day-later test of whether the rule survives a genuinely fresh session with no shared context, which is exactly the binding-durability question this audit's other lanes (L02-04/05→L02-01, MRD-06) find is the weakest leg elsewhere in this corpus. I flag this as an open question, not a confirmed durable bind — recommend it as a benchmark task class in its own right (it maps directly onto the parent REPORT.md's task class #3, "search-before-building").

### A.7 Why "OpenClaw" belongs in this case study's title: the contrast case

OpenClaw is not a duplicate-build casualty — it is the same document's *correctly handled* instance of the same choice, and its presence in both TAKEOVER documents is best read as an internal control. OpenClaw (formerly Moltbot/Clawdbot) is confirmed, independently, as real third-party software in `memory/repos/aevae/memory/transcripts/07102026/0710_plan/02_PRIOR_ART.md` §3.1 (a genuine prior-art audit for a *different* program, six days earlier — see §A.8) and is treated throughout both bridge takeover documents purely as something to *finish integrating* — Deliverable A is "make the iPhone actually reply" via `apps/plugins/openclaw-cos-agent-harness/**`, fixing a specific projection-boundary bug, never proposing a replacement chat/gateway product. `grep -rli openclaw memory/threads/2026/07/` returns exactly 27 files spanning 2026-07-01 through 2026-07-10 — i.e., OpenClaw was already a week-plus-established, adopted piece of infrastructure by the time the Switchboard proposal (07-14) reinvented OmniRoute's territory a few threads over. The same operator, in the same document, on the same day, both correctly deployed-not-forked an existing product (OpenClaw, CLIProxyAPI) and proposed building a from-scratch duplicate of a different existing product (OmniRoute) — which is why this case study is best read as being about the *boundary* between search-before-building successes and failures, not a uniform failure.

### A.8 A sibling control case, done right, six days earlier

`memory/repos/aevae/memory/transcripts/07102026/0710_plan/02_PRIOR_ART.md` ("Does Eve Already Exist? Prior Art, July 2026," dated 2026-07-10, six days before the OmniRoute correction) is a genuine, well-executed prior-art audit for a *different* build program (the "Eve" self-editing agent): it reads a 20-agent research corpus, cross-checks five independent live-fetch sessions, evaluates six named candidates (`moltworker`, `vibesdk`, Claude Managed Agents, `mordu`, `agents-starter`, plus two garbled candidate names) against the actual requirement, and reaches a calibrated verdict — *"Nothing ships Eve... The gated self-edit loop is Eve's one genuinely novel piece — and it is already built AND proven"* (inside the operator's own COS repo) — explicitly flagging *"Every hour spent in the corpus re-researching 'does anyone have a self-editing Cloudflare agent' was, in a very literal sense, re-discovering a file that already exists on Josh's own disk."* This document is itself a second-order confirmation of the OmniRoute lesson's shape (available-but-uninspected, at the level of the operator's *own* prior work, not just the public web) — arrived at independently, days before the Switchboard incident, in a parallel program. The organization clearly *could* do this correctly and had recently demonstrated it; it simply didn't happen in the Switchboard/bridge thread until forced.

---

## Incident reconstructions (full template)

### L06-01 — The Grok broker: a small duplicate build, disclosed only in retrospect

- **Date:** ~2026-06-23 (built); disclosed 2026-07-14
- **Model:** unattributed in source (BRIEF.md carries no model header)
- **Surface:** local repo work (`broker/grok-broker.mjs`), described in a later brief
- **Path + line range:** `memory/repos/bridge/BRIEF.md:15`; artifact at `memory/repos/edu/YourFriendlyNeighborhoodSLP-main/broker/grok-broker.mjs` (+3 sibling copies)
- **Objective:** make SuperGrok's subscription answer programmatically without an xAI API key
- **Initial claim/proposal:** a bespoke broker script, built and shipped
- **Prior-art evidence source:** CLIProxyAPI (adopted later as BRIDGE's actual engine, already an industrial-strength version of the same trick)
- **Available? + how:** plausibly yes — CLIProxyAPI's subscription-OAuth pattern is the same class of technique; not established whether it was searchable/known at the time of the June build
- **Inspected before proposing?** No evidence of a pre-build check in this snapshot
- **What a search would have shown:** an existing OAuth-subscription-bridging tool doing the same job at production quality
- **Who searched (if anyone):** nobody at build time; the comparison is drawn only in the 07-14 brief, in retrospect
- **User intervention:** none recorded at build time
- **Did it bind:** N/A — small, self-contained, not corrected in real time, only narrated later as "you've effectively built the core twice already"
- **Outcome:** superseded quietly; `grok-broker.mjs` is not mentioned again in the correction documents
- **E-tags:** E9 (search-after-building), minor
- **Competing explanation:** genuinely small scope (~1 script) where a from-scratch spike may have been faster than researching CLIProxyAPI at the time; the brief's own framing ("it's not hard") supports this being a low-stakes miss, not a structural one
- **Severity:** Low
- **Smallest counterfactual:** a five-minute search for "subscription to API bridge open source" before writing the broker
- **Confidence:** Medium (dated only by the brief's own retrospective prose, not by a build-time record)

### L06-02 — The Switchboard product brief and build plan: full custom router/UI proposed, OmniRoute never checked

- **Date:** 2026-07-14
- **Model:** unattributed (no model header in either file)
- **Surface:** local repo documents (`memory/repos/bridge/BRIEF.md`, `plan.md`)
- **Path + line range:** `BRIEF.md` full file (85 lines), esp. lines 1–19, 41, 75–77; `plan.md` full file (76 lines), esp. lines 1–33, 66–72
- **Objective:** "one pretty switchboard" — turn subscriptions into one API key, fallback chain, MoA, one-click app connectors
- **Initial claim/proposal:** build `Switchboard` from scratch: a new sidecar (`auto`/`moa` virtual models), a new control-panel UI, a new packaging/CI pipeline — on top of the already-adopted CLIProxyAPI
- **Prior-art evidence source:** the 2026-04-28 OmniRoute-discovery thread (§A.1), already three months old at this point
- **Available? + how:** Yes — in the same corpus, in `memory/threads/2026/04/`, findable by a simple grep or web search for "AI gateway smart routing fallback"
- **Inspected before proposing?** No — `OmniRoute` does not appear anywhere in either document; LiteLLM is checked and explicitly ruled out (BRIEF.md line 41), showing some competitor-diligence, but it stopped short of the actual closest match
- **What a search would have shown:** an MIT-licensed, already-built AI gateway matching essentially every proposed Switchboard feature
- **Who searched:** nobody, at this stage — the brief explicitly frames Switchboard as the plan, "nothing built yet, per Josh" but the *design* is fully specified as a build
- **User intervention:** not yet — this is the artifact the next day's session builds from
- **Did it bind:** N/A (this is the initiating proposal)
- **Outcome:** superseded on 2026-07-16 (§A.5); preserved only as `docs/legacy-switchboard/` history
- **E-tags:** E9 (search-after-building); also a plain E1 (available-but-uninspected) relative to the corpus's own April record
- **Competing explanation:** the brief does do real, correct prior-art work in adjacent areas (CLIProxyAPI's role, LiteLLM's non-necessity, COS's own existing MoA code) — this is not a lazy document; it is a careful one that missed one specific match. This argues against "the agent doesn't search" and for "the agent doesn't check its own three-month-old research record," a narrower and more diagnosable failure mode
- **Severity:** High — this is the plan a full engineering session was then built from
- **Smallest counterfactual:** one query — "AI gateway smart routing fallback open source" — run against either the public web or the operator's own corpus, would have surfaced OmniRoute in minutes, exactly as it did on 2026-04-28
- **Confidence:** High (both source documents read in full)

### L06-03 — The oversight session: 13 hours designing a custom Go router, told to search first, searches widely, still misses the answer

- **Date:** 2026-07-15 13:08 – 2026-07-16 00:50 (session timestamps)
- **Model:** Codex CLI (OpenAI; exact model version not present in transcript headers)
- **Surface:** Codex CLI task, workspace `/Users/hermes/Documents/Codex/2026-07-15/re`
- **Path + line range:** `memory/prophecies/bridge/BRIDGE-Oversight-complete-chat-2026-07-15.md`, lines 1–1478 (full arc); explicit build spec at lines 136–297 and 362–522; the self-correction at lines 924–1018
- **Objective:** "review this plan... develop a plan for building" (paraphrased user instruction, line 51), with an explicit instruction to search first
- **Initial claim/proposal:** design and begin building `switchboardd`, a from-scratch Go service with its own recipe engine, provider-account UI, and chat cockpit, embedding CLIProxyAPI as a credential substrate
- **Prior-art evidence source:** the same 2026-04-28 OmniRoute thread; also, within-session, a genuine competitor sweep (CLIProxyAPI, Quotio, CliRelay, CLIProxyAPI Dashboard, LibreChat, Open WebUI, TypingMind, ChatWise — lines 993–1018) that still does not surface OmniRoute
- **Available? + how:** Yes, via the operator's own corpus (three subagents were spawned and, per the user's opening instruction, told to search "transcripts of this computer" — outcome of their specific searches is not recoverable in this snapshot, see Scope note)
- **Inspected before proposing?** Partially — real web research happened, more than once, including a mid-session self-correction ("I had conflated 'the platform around the bridge' with 'the reason the bridge exists'"), but it never reached the specific 2026-04-28 thread or the OmniRoute repository
- **What a search would have shown:** the same MIT gateway already matching the spec, this time backed by a live compatibility matrix once actually deployed the next day (`omniroute-migration.md`)
- **Who searched:** the agent (multiple times, including subagents); the user had explicitly requested it be done ("search online... we don't need to re-create the wheel") but did not personally search during the session
- **User intervention:** decisive, but only at the very end — Josh's closing message (line 1478) is the point where the miss is actually caught and named
- **Did it bind:** No — this entire session's design work (the Go `switchboardd`, its recipe engine, its chat cockpit) is discarded
- **Outcome:** superseded; the correction (§A.6) begins in the same message that ends this incident
- **E-tags:** E9 (search-after-building); E1 relative to the operator's own corpus; arguably E5 (inspection ran, wrong conclusion) for the mid-session competitor sweep that checked eight products and still missed the closest one
- **Competing explanation:** a genuine research-completeness problem, not negligence — general web search for "AI subscription router" is dominated by BYOK chat clients (LibreChat, TypingMind, etc.), and OmniRoute is a comparatively obscure, gateway-category project; the miss is more "search breadth/ranking" than "no search occurred." This nuance matters for the fix: a general web re-search is not sufficient; checking the operator's *own* memory specifically is the intervention that actually worked here (§A.6)
- **Severity:** High — full engineering session, ~13 hours, ends in a "colossal waste of time" verdict from the person paying for it
- **Smallest counterfactual:** the user's own opening instruction, if followed literally and first — "search... the transcripts of this computer" — before any web research or design work began
- **Confidence:** High (primary transcript read directly for the open, the self-correction, and the close; the middle ~800 lines are grep-located, not fully read, so some detail of *how* the eight-competitor sweep was conducted is inferred from its output table, not its full reasoning)

### L06-04 — The correction: the rule is dictated and immediately committed to durable memory

- **Date:** 2026-07-16, ~00:50
- **Model:** Codex CLI (session continuation of L06-03); the rule text itself is authored by the user (Josh), not the model
- **Surface:** same Codex CLI session
- **Path + line range:** `BRIDGE-Oversight-complete-chat-2026-07-15.md` lines 1476–1489; corroborated by `mem.md` lines 46–50, 107–112
- **Objective:** stop the custom build, name the actual product, prevent recurrence
- **Initial claim/proposal:** N/A (this is the corrective act, not a build proposal)
- **Prior-art evidence source:** OmniRoute, now supplied directly by the user
- **Available? + how:** Yes, and now explicitly handed over rather than left to be found
- **Inspected before proposing?** N/A
- **What a search would have shown:** N/A
- **Who searched:** the user, off-session ("we've done a ton of research")
- **User intervention:** total — the user halts the build, dictates a replacement rule verbatim, and hands over the next prompt (`OmniRoute × COS — Implementation Assignment v2`)
- **Did it bind:** Yes, checkable two ways: (1) two named rules land in the COS brain (`rule:product-search-before-building`, `rule:deploy-fork-compose-build`, per `mem.md` lines 109–110); (2) the rule is correctly re-applied minutes later to an unrelated proposal in the same document (L06-05)
- **Outcome:** the OmniRoute migration assignment begins immediately in the same message
- **E-tags:** this incident is the **Bind** event for E9 — the corrective mechanism the rest of this audit's thesis proposes, arising organically
- **Competing explanation:** none — this is as close to a clean, self-aware correction as this corpus's other lanes find anywhere
- **Severity:** N/A (corrective, not a failure)
- **Smallest counterfactual:** N/A
- **Confidence:** High (primary text quoted directly)

### L06-05 — Binding test (positive control): the rule catches a second build proposal within the same session

- **Date:** 2026-07-16 (same session/day as L06-04)
- **Model:** Claude (Fable 5 → Opus 4.8), per `mem.md` header line 34 — a *different* session/model than L06-03/04, reviewing the same material
- **Surface:** Claude Desktop/Cowork
- **Path + line range:** `memory/prophecies/mem/mem.md` lines 69–73 (§4, "the prompt-compiler doc review")
- **Objective:** evaluate a new "prompt compiler" product proposal (targets a model + effort level per prompt)
- **Initial claim/proposal:** the source document under review claimed "nobody built it"
- **Prior-art evidence source:** Not Diamond's Prompt Adaptation/Optimization (GA, enterprise tier)
- **Available? + how:** Yes, via a live web search performed proactively, first move
- **Inspected before proposing?** Yes — "ran the search first," explicitly, before endorsing the proposal
- **What a search would have shown:** exactly what it did show — a real, shipping competitor, narrowing (not killing) the pitch
- **Who searched:** the agent, unprompted
- **User intervention:** none needed
- **Did it bind:** Yes, in this instance
- **Outcome:** proposal narrowed to its genuinely novel slice ("the you-layer") and explicitly reconciled against OmniRoute too ("collides with OmniRoute... the compiler picks intent, OmniRoute picks the machine")
- **E-tags:** none — this is a control case (successful search-before-building)
- **Competing explanation:** this is close in time and shared context to L06-04 (same broader work session/day, same user, arguably primed by having just been corrected) — a favorable interpretation is durable rule uptake; a less favorable one is short-horizon priming that would not necessarily survive into a fresh, unrelated session days later. I cannot distinguish these from the material in this snapshot
- **Severity:** N/A (control case)
- **Smallest counterfactual:** N/A
- **Confidence:** Medium-high (single secondary source — `mem.md` is itself a condensed narration, not the primary transcript of this specific exchange, which I could not separately locate in this snapshot)

### L06-06 — Binding test (propagation): the rule is written into standing operating prompts the same day

- **Date:** 2026-07-16
- **Model:** N/A (prompt documents, multiple downstream sessions will execute them)
- **Surface:** handoff prompt documents
- **Path + line range:** `CODEX-BRIDGE-ONE-SHOT.md:7`; `CODEX-P1-BRIDGE-REPO-REAL.md:24`; `BRIDGE-OMNIROUTE-OPENCLAW-MCP-MORDU-TAKEOVER-v1.md` §5B / `-v2.md` §5B (both: "Convert `bridge` into the private, reproducible OmniRoute product repo")
- **Objective:** ensure every future session executing this program does not re-propose a custom build
- **Initial claim/proposal:** N/A
- **Prior-art evidence source:** OmniRoute, now canonical
- **Available? + how:** Yes, explicitly documented with pinned version/commit/hash (`omniroute-migration.md` lines 25–29)
- **Inspected before proposing?** N/A — these are the corrected instructions, not a build proposal
- **What a search would have shown:** N/A
- **Who searched:** N/A
- **User intervention:** the instruction is now pre-written into the prompt itself, removing the need for a future session to search at all for this specific decision
- **Did it bind:** Confirmed at the document level — the instruction is present, word-for-word, in at least three independently-dated handoff documents (07-16 ×2 variants of the takeover doc, plus the P1 prompt) — a genuine multi-document propagation, though all still same-day
- **Outcome:** the bridge repo conversion (Deliverable B) proceeds under this instruction; `omniroute-migration.md` records it as executed with a passing compatibility matrix
- **E-tags:** Bind (E9's fix), propagated
- **Competing explanation:** none
- **Severity:** N/A (corrective, propagated)
- **Smallest counterfactual:** N/A
- **Confidence:** High (all three documents read in full or at the cited lines directly)

---

## PART B — Existing-retrieval self-check: Loom

### B.1 What Loom already provides

Confirmed directly from `memory/spells/loom/pyproject.toml`, the `src/loom/` module listing, and the root `README.md`'s `## loom` section (all read in full, not summarized secondhand):

- **Markdown→threads conversion**: `adapters/{anthropic,openai,xai}.py` + `pipeline.py`/`render.py` — converts raw OpenAI/Anthropic/xAI account exports into the deterministic, provider-neutral Markdown that *is* `memory/threads/` (per README: "the converter: weaves raw provider exports into threads").
- **A real SQLite/FTS5 full-text index**: confirmed directly in `src/loom/index.py` — `CREATE VIRTUAL TABLE IF NOT EXISTS documents_fts USING fts5(...)` and a matching `messages_fts` table (lines ~102, ~107), with `build_index()`, `search_index()`, and `verify_index()` as real, callable functions, exercised by `tests/test_index.py` against real fixture conversations (not mocks).
- **Search**: `loom search "<query>" --database ...` is a live CLI subcommand (`cli.py` line 45, `_print_search_hits`), i.e., exactly the operation this investigation performed dozens of times via raw `grep -rli` across `memory/threads/`.
- **Export**: `loom export {sessions,chunks}` streams disposable NDJSON (`exports.py`, `chunks.py`) for downstream consumers.
- **Verify**: `loom verify` and `loom index verify` re-derive the whole corpus/index from Markdown and byte-compare — the corpus's own "trust but verify" primitive, applied to itself.
- **Readiness**: `loom readiness --target {ai-search,rag,index,vector}` (`readiness.py`, `TARGETS` tuple) — a self-check for whether the corpus is prepared for a given retrieval use case, which is close to a built-in answer to the exact question this Part B section is asking.

This is a small, dependency-light tool (one runtime dependency, `ijson`, per `pyproject.toml`), with 12 test files covering adapters, corpus handling, the index, exports/chunks, merges, the pipeline, readiness, and rendering — i.e., a maintained, working tool, not aspirational scaffolding.

### B.2 Could it have searched this corpus without anyone building new tooling?

Yes, directly. `loom search "OmniRoute" --database <index>` (once an index exists — which this investigation did not build, per instruction) is architecturally the same operation as every `grep -rli` this report and this investigation ran, except indexed, ranked, and re-derivable/verifiable. The tool's own `readiness` subcommand exists specifically to answer "is this corpus ready to be searched this way" without a human needing to hand-verify it. Nothing about Part A's investigation — including locating the single load-bearing 2026-04-28 thread outside the July window the task specified — required tooling beyond what `loom` already documents providing.

### B.3 Do the July threads show agents using Loom, or hand-rolling instead?

**Hand-rolling, exclusively — Loom is never used.** `grep -rli '\bloom\b' memory/threads/2026/07/*.md` returns exactly one file, and it is a false positive: a Stardew Valley crafting-recipe answer ("Craft Cloth: Loom (Farming Lv7) with Wool," `2026-07-10--t_mdmxf6pq6y734i6d5xmtm4wkq3.md:397`). Widening the same grep to the entire corpus (all years, 2025–2026) returns 24 more hits; I checked a representative sample across dates and every one is a false positive — the Loom video-recording SaaS product, the "loom over" verb, or the same Stardew Valley game item. **Zero genuine references to the `memory/spells/loom` tool exist anywhere in the threads corpus I searched.** No index database (`.sqlite`) exists anywhere in this snapshot outside the tool's own test fixtures (checked with `find`).

What agents reach for instead, visible throughout Part A's source material: (1) raw `grep -rli`/`find` exactly as this investigation used them (the oversight session's own subagents were told to search "transcripts of this computer" — the mechanism is not specified, but no document anywhere mentions `loom`); (2) more often, **COS's own live "brain"/wiki MCP tools** (`cos_memory_query`, `cos_wiki_search`, `cos_corpus_search` — named explicitly across the CODEX-P1–P5 prompts and both TAKEOVER documents as the mandatory "first action" before any substantial work). This second pattern is the more interesting finding: it is not that agents skip retrieval tooling in favor of nothing — they consistently reach for COS's brain/wiki (a separate, live, D1/Vectorize-backed memory system), which is a different store than the archived Markdown thread corpus Loom indexes.

### B.4 Connecting Part A and Part B: a plausible two-tier-memory explanation for the miss

This is inferential, flagged accordingly, but well-supported by what's directly confirmed above: the corpus that actually contained the OmniRoute prior art (the 2026-04-28 thread) lives in `memory/threads/` — Loom's domain. The system every corrected prompt instructs agents to check first is COS's brain/wiki (`cos_memory_query`/`cos_wiki_search`) — a live, separate memory store, not the archived thread corpus. I found no evidence in this snapshot that the April research thread was ever ingested into COS's brain/wiki (I cannot confirm this either way — the brain's live contents are not queryable from this static snapshot). If it was not, then the 07-14/07-15 misses in Part A are not merely "didn't search" — they are "searched the one memory system everyone was told to check, which didn't have it, while the system that *did* have it (Loom's domain, the raw thread archive) was never checked by any tool, human or automated, until Josh did it by hand." This reframes the case study's fix: the corrective rule (§A.6) says "check COS memory and wiki" — it does not say "check Loom" or "run a full-text search over the raw thread archive" — meaning the actual corrective instruction may still leave this specific gap (archive vs. live-brain) unaddressed even after the correction. I did not find any document in this snapshot that names Loom as part of the fix.

One further honest note: this investigation's own methodology mirrors the pattern under study — I used raw `grep`/`find` throughout, not Loom, consistent with the task's explicit instruction not to build or rebuild an index. This is a different situation from an agent mid-build failing to check prior art (a bounded, read-only forensic pass with a hard no-build constraint is not the same failure mode as an open-ended build task), but it is worth stating plainly rather than leaving implicit, in the same spirit this audit's other lanes hold themselves to.

---

## Thesis verdict for this lane

**Strongly supports the thesis, with the sharpest available-in-corpus-but-not-in-working-memory example found anywhere in this audit.** The OmniRoute incident is close to falsification-proof for the "search-after-building" sub-claim: the prior art is dated, named, sourced, and sitting in the same corpus three months before it was needed; two separate build efforts (a small one in June, a 13-hour one in July) proceed without finding it despite one explicit user instruction to search and one genuine, multi-product competitive sweep mid-session; and the eventual catch is made by the user, not the system, followed immediately by a well-specified, verifiably-persisted corrective rule. The correction itself — "deploy before forking, fork before composing, compose before building," with an explicit percentage-coverage heuristic — is close to a hand-written version of this audit's own proposed intervention, arising for the same reason (REPORT.md's Refinement 1: the damage concentrates at Bind, and here the fix is explicitly a Bind-layer rule, not a Recall or Verify one).

Two refinements the evidence forces: (1) this is not simply "no search occurred" — real search happened repeatedly, including a full competitor sweep, and still missed the one closest match, which argues the fix must include *searching the operator's own prior record specifically*, not just the open web, a distinction the corrective rule gets right by naming "COS memory and wiki" explicitly; (2) the Loom self-check (Part B) suggests that even the corrected instruction may not close the whole gap, because the tool that indexes the archive where the original prior art actually lived is never named anywhere in the fix, and is never used anywhere in this corpus.

**Falsifying/complicating material, reported honestly:** the June-23 Grok-broker precursor (L06-01) is thin — dated only in retrospect, not caught at build time, and low severity; the binding tests (L06-05, L06-06) are same-day and cannot rule out short-horizon priming rather than durable uptake; and the OpenClaw half of this case study is a genuine control case (correctly integrated, not reinvented), which argues against reading this incident as a uniform "this system can't do search-before-building" — it can, does elsewhere in the same week (§A.8), and the failure is specific to this one thread's momentum, not a system-wide incapacity.

---

## Where evidence is weaker or stronger than claimed

**Weaker than claimed:**
- The precise contents of the three subagents spawned inside the 2026-07-15 oversight session (what they searched, what they returned) are not recoverable in this snapshot — I report only the session's own summary of their outcome, not their raw output.
- L06-05's "did it bind" verdict rests on `mem.md`, a condensed secondary narration of a specific exchange whose primary transcript I could not separately locate in this snapshot.
- The June-23/25 OmniRoute GitHub-issue citations (§A.1) are reported as weak/incidental, not as a second confirmed discovery — they are source-list citations inside an unrelated Grok-pricing thread, and I was careful not to overstate them as deliberate re-engagement.
- Part B.4's two-tier-memory explanation is explicitly inferential — I could not confirm or rule out whether the April OmniRoute thread was ever ingested into COS's live brain/wiki, since that store's contents are not queryable from this static snapshot.
- None of the binding tests (L06-04 through L06-06) extend beyond 2026-07-16/17 in this corpus; the report is honest that a genuine multi-day, independent-session recurrence test is not available in the material read.

**Stronger than claimed:**
- The task's suggested search scope (`memory/threads/2026/07/`) would have returned **zero** hits for `OmniRoute` and concluded the prior art simply didn't exist before 07-16 — the actual answer (a three-month-old, fully-sourced discovery thread from April) required widening the search outside the suggested window and outside the `threads/` directory entirely (into `memory/repos/` and `memory/prophecies/`) to find. This is a stronger, more precise dating of the availability gap than the task's own framing anticipated.
- The user-initiated-search claim (§A.4) is corroborated two independent ways rather than one: directly, in the primary oversight-chat transcript's own closing message, and independently, in a separately-written, differently-modeled session's retrospective summary (`mem.md`), which adds the specific and checkable detail ("ChatGPT found it instantly because it searches every turn") that is itself verifiable against this report's own §A.1 primary-source finding.
- The corrective rule's actual persistence is checkable at the level of a named, durable rule ID (`rule:product-search-before-building`) rather than only as prose intention — a more concrete Bind artifact than most of this audit's other lanes are able to produce for their corrective mechanisms.
