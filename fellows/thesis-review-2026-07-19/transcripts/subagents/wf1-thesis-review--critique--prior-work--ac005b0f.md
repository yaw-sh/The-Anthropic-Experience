# wf1-thesis-review / critique--prior-work (ac005b0f)

> Subagent transcript, workflow `wf_4879874c-0da`, model sonnet. Exported from `agent-ac005b0f900f79c40.jsonl`.
> Format: thinking and written output preserved verbatim; tool calls collapsed to one-line breadcrumbs; tool results and attachments omitted.

## USER / ORCHESTRATOR PROMPT

Context: The repo at /home/user/The-Anthropic-Experience is "THE ANTHROPIC EXPERIENCE" — a static evidence-backed satirical site documenting a failed 2-month attempt to have Claude build a simple React site. The repo owner is preparing an Anthropic Fellows application whose thesis ("From Prompting to Governance: Intent Binding for Agentic AI Under Weak Oversight") is contained in the file /root/.claude/uploads/40cd1ac5-1114-5b20-844f-0241cf6338fd/a821b614-Anthropicbuildfailureanalysis.md (the section starting "# From Prompting to Governance" through the end). A second uploaded file, /root/.claude/uploads/40cd1ac5-1114-5b20-844f-0241cf6338fd/f0c38eca-deepresearchreport.md, is a ChatGPT deep-research report analyzing the failure. Your final message is consumed as raw data by an orchestrator, not shown to a human — return precise, evidence-cited data. Cite file paths and line numbers for every factual claim. Distinguish OBSERVED (you read it) from INFERRED (you concluded it). Never invent facts.
Task: You are a prior-work / novelty reviewer with web access. Read the thesis in /root/.claude/uploads/40cd1ac5-1114-5b20-844f-0241cf6338fd/a821b614-Anthropicbuildfailureanalysis.md (section "# From Prompting to Governance" onward). Then use WebSearch/WebFetch to situate it in the 2024-2026 literature and product landscape. Cover at minimum: (1) agent guardrail/constraint frameworks (NVIDIA NeMo Guardrails, LlamaFirewall, AgentSpec, Task Shield, GuardAgent, runtime policy enforcement work); (2) long-horizon / instruction-drift benchmarks and evals (tau-bench, SWE-bench verified-style receipts, LongMemEval or similar memory benchmarks, instruction-following evals, multi-turn drift studies); (3) contract/spec-driven agent work (plan-and-execute frameworks, task contracts, formal verification of agent behavior, 'artifact-based' completion checks, OpenAI structured outputs/evals, Anthropic's own hooks/CLAUDE.md/verification guidance as productized partial solutions); (4) scalable oversight and AI control literature (Redwood-style control evals, weak-to-strong oversight) — does 'intent binding under weak oversight' genuinely connect to that agenda or is the connection cosmetic? (5) HCI work on human-agent delegation and trust calibration. For each area: cite specific works (verify they exist via search), state what the thesis would need to differentiate itself, and flag any claim in the thesis that is already contradicted or already solved. End with a novelty verdict: what is genuinely new here, if anything, and what is the closest existing work.

`-> tool 1: Read` — `/root/.claude/uploads/40cd1ac5-1114-5b20-844f-0241cf6338fd/a821b614-Anthropicbuildfailureanalysis.md`

`-> tool 2: ToolSearch` — `select:WebSearch,WebFetch`

`-> tool 3: WebSearch` — `NVIDIA NeMo Guardrails LLM agent runtime policy enforcement`

`-> tool 4: WebSearch` — `LlamaFirewall Meta agent security framework 2025`

`-> tool 5: WebSearch` — `AgentSpec LLM agent runtime enforcement paper`

`-> tool 6: WebSearch` — `"Task Shield" LLM agent paper defense`

`-> tool 7: WebSearch` — `GuardAgent LLM agent guardrail paper`

`-> tool 8: WebSearch` — `tau-bench benchmark tool-agent-user interaction paper Sierra`

`-> tool 9: WebSearch` — `SWE-bench Verified OpenAI human-validated subset`

`-> tool 10: WebSearch` — `LongMemEval benchmark long-term memory LLM chat assistants paper`

`-> tool 11: WebSearch` — `multi-turn instruction drift LLM agent benchmark degradation long conversation`

`-> tool 12: WebSearch` — `instruction following evaluation benchmark IFEval multi-turn constraint`

`-> tool 13: WebSearch` — `AGENTIF benchmark instruction following agentic scenarios paper arxiv 2505.16944`

`-> tool 14: WebSearch` — `plan-and-execute LLM agent framework task decomposition paper`

`-> tool 15: WebSearch` — `formal verification LLM agent behavior specification correctness`

`-> tool 16: WebSearch` — `OpenAI structured outputs evals function calling reliability 2024`

`-> tool 17: WebSearch` — `Redwood Research AI control agent evaluations untrusted models`

`-> tool 18: WebSearch` — `scalable oversight weak-to-strong generalization OpenAI Anthropic paper`

`-> tool 19: WebSearch` — `human-AI delegation trust calibration HCI appropriate reliance agent`

`-> tool 20: WebSearch` — `Claude Code hooks CLAUDE.md verification agent behavior Anthropic documentation`

`-> tool 21: WebSearch` — `METR time horizon paper measuring AI ability long autonomous tasks`

`-> tool 22: WebSearch` — `"context rot" Chroma research long context LLM degradation`

`-> tool 23: WebSearch` — `Anthropic agentic misalignment reward hacking research blog`

`-> tool 24: WebSearch` — `AgentDojo benchmark prompt injection agent tool use`

`-> tool 25: WebSearch` — `OpenAI evals framework open source github LLM evaluation`

`-> tool 26: WebSearch` — `SHADE-Arena Redwood Research sabotage agent evaluation`

`-> tool 27: WebSearch` — `sycophancy large language models benchmark paper`

`-> tool 28: WebSearch` — `Anthropic Fellows program AI safety Constellation scalable oversight AI control application`

`-> tool 29: WebSearch` — `"Evaluating Control Protocols for Untrusted AI Agents" arxiv 2511.02997`

`-> tool 30: WebSearch` — `LLM agent fabricated success false completion claim hallucinated task`

`-> tool 31: WebSearch` — `specification gaming DeepMind examples list reward hacking AI safety`

`-> tool 32: WebSearch` — `Devin AI software engineer autonomy claims controversy overstated backlash`

`-> tool 33: WebSearch` — `Lee See 2004 trust in automation appropriate reliance calibration`

`-> tool 34: WebSearch` — `principal-agent problem AI alignment framing paper economics delegation`

`-> tool 35: WebFetch` — `What does this page say about applicants using AI to draft application materials? Quote the relevant guidance `

`-> tool 36: WebFetch` — `What research areas, workstreams, or priority topics does this page list for the Anthropic Fellows Program (es`

`-> tool 37: WebSearch` — `"Incomplete Contracting and AI Alignment" Hadfield-Menell Hadfield summary reward specification`

`-> tool 38: WebSearch` — `Buçinca cognitive forcing functions AI-assisted decision making CHI`

`-> tool 39: WebSearch` — `Vasconcelos trust calibration explanations reliance CHI 2023`

`-> tool 40: WebSearch` — `Anthropic "effective context engineering" agents blog 2025`

`-> tool 41: WebSearch` — `OECD "Empowering learners for the age of AI" report 2026 AI literacy framework`

`-> tool 42: WebFetch` — `Summarize this paper's abstract in full: what is "false success" in LLM agents, what benchmarks/models were te`

`-> tool 43: WebFetch` — `Summarize this paper's abstract and approach in full: what is AgentSpec, what does the DSL look like (triggers`

`-> tool 44: WebSearch` — `"task contract" OR "obligation ledger" LLM agent paper specification persistent`

`-> tool 45: WebSearch` — `"Governing AI Agents" arxiv 2501.07913 summary legal economic framework`

`-> tool 46: WebSearch` — `LLM agent verifier critic self-check before completion claim paper 2025`

`-> tool 47: WebFetch` — `Does this documentation explicitly describe CLAUDE.md instructions as advisory/non-binding and hooks as determ`

`-> tool 48: WebSearch` — `"weak oversight" AI control term paper definition scalable`

`-> tool 49: WebSearch` — `reddit Claude Code ignores CLAUDE.md instructions claims done not done`

`-> tool 50: WebSearch` — `Claude Code says task complete but tests fail user complaints forum`

`-> tool 51: WebSearch` — `"definition of done" AI coding agent completion criteria verification 2025`

`-> tool 52: WebSearch` — `"intent binding" AI agent term existing usage paper`

`-> tool 53: WebSearch` — `spec-driven development AI coding agent Kiro GitHub Spec Kit natural language to spec`

`-> tool 54: WebSearch` — `"Verification Horizon" coding agent rewards no silver bullet arxiv 2606.26300`

`-> tool 55: WebSearch` — `AutoGPT BabyAGI early autonomous agent failure loop postmortem 2023`

`-> tool 56: WebSearch` — `AI control literature trusted model untrusted model definition Redwood distinguish scalable oversight alignmen`

`-> tool 57: WebSearch` — `"Human-Anchored Intent-Bound Delegation" HAID AI agents foundation american innovation`

`-> tool 58: WebSearch` — `novice user oversight AI agent non-expert supervision benchmark HCI 2025`

`-> tool 59: WebSearch` — `benchmark compare baseline prompting memory agent conditions ablation long-horizon reliability`

`-> tool 60: WebSearch` — `"Overseeing Agents Without Constant Oversight" arxiv 2602.16844 summary findings`

`-> tool 61: WebSearch` — `"To Rely or Not to Rely" CHI 2025 appropriate reliance large language models interventions`

`-> tool 62: Read` — `/root/.claude/uploads/40cd1ac5-1114-5b20-844f-0241cf6338fd/f0c38eca-deepresearchreport.md`

`-> tool 63: WebSearch` — `ReflecTool-Bench self-reflection tool use LLM agent benchmark`

`-> tool 64: WebSearch` — `τ²-bench dual control conversational agents 2025 paper`

`-> tool 65: StructuredOutput` — ``

`-> tool 66: StructuredOutput` — ``


---
*Receipts: 66 tool calls; API usage across calls: input 87,291 tokens, output 1,005 tokens (excl. cache).*
