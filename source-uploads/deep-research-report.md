# Adversarial Literature Review of Recognition Does Not Bind

## Executive verdict

**Verdict:** **The problem is recognized indirectly, but this formulation identifies a meaningful research gap.** My confidence is **moderately high**. The dossier’s **central empirical symptom**—an agent can have the right information available, can even inspect or acknowledge it, and still act against it later—is **not novel in spirit**. Closely related work already exists in at least three bodies of literature: **runtime enforcement and shielding** for autonomous systems and LLM agents, **self-correction and reflective tool use** for LLMs, and **instruction/policy adherence plus long-term memory under latent constraints** for agent benchmarks. What does look underdeveloped is the dossier’s attempt to **separate availability, inspection, and behavioral binding as distinct measurable stages**, and then test whether **deterministic obligation-carrying gates** outperform prompt-only reminders and memory-only support on that specific decomposition. citeturn26view0turn25view0turn27view0turn28view1turn24view6turn23view4turn23view6turn19search12turn24view4turn38search0turn24view5

The dossier’s proposed **Recall–Verify–Bind** layer is **not a genuinely new base mechanism**. As an architecture, it is best understood as a **new synthesis** of older and newer ingredients: memory persistence, claim verification, runtime monitoring, action gating, workflow/state-machine orchestration, and commitment tracking. Modern LLM-agent papers like **AgentSpec**, **Task Shield**, and **RvLLM** already implement parts of this pattern at inference time, including structured rules, runtime checks, and sometimes action blocking. Older work in **shielded reinforcement learning**, **robot execution monitoring**, **proof-carrying code**, and **BDI commitment strategies** supplies much of the conceptual ancestry. citeturn26view0turn25view0turn27view0turn24view4turn38search2turn38search0turn24view5

What is **plausibly novel** is narrower and more defensible: a benchmark and evaluation framework that asks, in a controlled way, whether agents **use** evidence they have already retrieved or acknowledged; whether **recognized corrections continue to constrain later decisions**; whether **completion claims are receipt-backed**; and whether **deterministic binding** improves reliability more than prompt-only or memory-only methods under the same tasks. Existing benchmarks stress policy adherence, prompt-injection resistance, memory, or tool correctness, but they usually do **not isolate the causal gap between recognition and later compliance** as the primary dependent variable. citeturn23view4turn10search2turn24view6turn23view6turn19search12turn28view1

So the literature does **not** support a claim that the dossier discovered an entirely unknown problem or a wholly new solution class. It **does** support a claim that the dossier identifies a **cross-cutting gap** that current work only partially covers: we have many systems for **making information available** and a growing number for **checking or critiquing outputs**, but fewer evaluations and comparatively fewer general architectures that test whether **retrieved evidence, rules, commitments, and unresolved obligations reliably bind subsequent actions over time**. citeturn24view3turn24view2turn27view0turn26view0turn25view0turn32search1turn33search0turn28view1

The three closest bodies of prior work are: **runtime enforcement for LLM agents and autonomous systems**; **self-correction and reflective tool-use evaluation**; and **instruction-hierarchy and latent-constraint memory benchmarks**. citeturn26view0turn25view0turn27view0turn24view4turn28view1turn32search1turn24view6turn23view6turn19search12

## Precise reconstruction of the dossier in neutral technical language

Read neutrally, the dossier appears to make a bundle of claims rather than one single claim.

At the most abstract level, it proposes that **agent reliability is not exhausted by retrieval or memory**. The dossier distinguishes between whether a relevant fact, rule, correction, or obligation is **available** to the agent; whether the agent **inspects** or acknowledges it; and whether that information subsequently **constrains behavior**. In more neutral terms, the dossier is hypothesizing a **compliance gap between epistemic access and action control**.

That breaks into several separable subclaims. One is that **retrieved evidence often fails to causally influence later actions**, even when the model appeared to notice it. A second is that **verbal acknowledgment is not a trustworthy proxy for policy incorporation**. A third is that **corrections, obligations, and open loops decay within long trajectories and across sessions**, especially when not externalized into structured state. A fourth is that agents frequently make **externally checkable factual or capability claims without first performing the inspection that would justify them**. A fifth is that agents make **completion claims without objective postconditions**, such as an artifact, execution receipt, test result, database delta, or other discharge evidence. A sixth is that **deterministic or semi-deterministic control layers** may outperform prompt-only methods because they move some decisions out of unconstrained token prediction and into explicit runtime checks.

The proposed intervention, again stated neutrally, is a **hybrid runtime-control architecture**. “Recall” is an external memory and obligation-retrieval function. “Verify” is an inspection or evidence-checking requirement before high-stakes claims or transitions. “Bind” is an enforcement layer that blocks, revises, or escalates actions when recognized evidence, rules, or open obligations would otherwise be violated. In the dossier’s strongest form, the novelty claim is therefore **not just about memory** and **not just about verification**. It is about whether there is an under-measured stage between “the model had or even saw the relevant information” and “the system’s later action remained consistent with it.”

That thesis is narrower than general hallucination, broader than ordinary instruction following, and only partially overlapping with classic runtime verification. Its best academic version is a claim about **behavioral incorporation of already-available constraints**.

## Terminology and lineage map

The dossier’s vocabulary overlaps with several literatures, but the overlaps are partial rather than exact.

| Dossier term | Closest established terms | Where the overlap is real | Where it differs |
|---|---|---|---|
| **Availability** | retrieval, context access, external memory, long-term conversational memory | Work such as **LoCoMo**, **MemoryAgentBench**, and **LoCoMo-Plus** studies whether relevant information can be stored, recovered, and used later in multi-session settings. citeturn24view1turn19search12turn23view6 | These works mostly center on recall, update, conflict resolution, or latent-constraint use. They usually do **not** cleanly distinguish “available in context” from “inspected and then behaviorally binding.” citeturn24view1turn19search12turn23view6 |
| **Inspection** | verification, critique, self-reflection, process supervision, evidence grounding | **CRITIC**, **RARR**, **FActScore**, and **Let’s Verify Step by Step** are about checking claims, steps, or outputs against tools, evidence, or finer-grained feedback. citeturn28view3turn24view3turn24view2turn35search0 | These papers mostly evaluate or improve **assessment**, not whether the assessed evidence then governs later downstream action. citeturn24view3turn24view2turn35search0turn32search1 |
| **Binding** | runtime enforcement, shielding, policy compliance, action alignment, execution monitoring | **AgentSpec**, **Task Shield**, **shielding**, and robot execution-monitoring work all ask whether candidate actions must satisfy explicit constraints before execution. citeturn26view0turn25view0turn24view4turn38search2 | The dossier uses “binding” more broadly: not only safety constraints, but also corrections, evidence, unfinished commitments, and receipts for completion. That broader obligation-centered framing is less standard. |
| **Obligations** | commitments, intentions, norms, deontic constraints, prospective memory | In BDI and multi-agent systems, commitments and intentions are explicit control constructs; in cognitive science, **prospective memory** and **implementation intentions** study carrying future obligations into action. citeturn24view5turn16search11turn16search17turn17search0 | Those literatures rarely speak in terms of LLM runtime traces, tool APIs, or receipt-gated completion. |
| **Evidence-gated claims** | provenance, attribution, claim verification, grounded generation | **RARR**, **FActScore**, and newer provenance work decompose outputs into claims and check support against external evidence. citeturn24view3turn24view2turn21search5 | Most of this work verifies text quality or revises answers; it usually does not enforce later behavioral compliance at the agent-action layer. |
| **Receipt-gated completion** | postconditions, completion criteria, artifact verification, acceptance tests | In software and workflow systems, completion is often defined by unit tests, goal-state diffs, or durable workflow transitions; **SWE-bench Verified** evaluates success against test behavior rather than self-reported completion. citeturn22search0turn22search13turn34search1 | The academic agent literature has not yet standardized “receipt-backed completion claims” as a general benchmark dimension across domains. |
| **Recognition does not bind** | knowing–doing gap, belief–action inconsistency, failed self-correction, intention–behavior gap, akrasia | Organizational and cognitive literatures have long studied cases where knowing is not doing. In LLMs, **Kamoi et al.**, **Huang et al.**, and **ReflecTool-Bench** show that recognizing mistakes or being prompted to self-correct does not reliably produce corrected behavior. citeturn32search1turn33search0turn28view1 | None of these bodies, however, has made the **availability → inspection → binding** triad the central experimental object in general-purpose tool-using agents. |

This lineage matters because it shows why the dossier cannot honestly claim to have discovered the *existence* of the problem class. It can, however, plausibly claim to have **named and operationalized a specific cross-literature seam**.

## Closest prior art

The list below is ranked by **mechanistic similarity**, not by superficial topic match.

| Work | Publication status | Why it is close | Key overlap and key difference |
|---|---|---|---|
| **AgentSpec: Customizable Runtime Enforcement for Safe and Reliable LLM Agents** | ICSE 2026 main track | The closest architectural match. It defines runtime rules with triggers, predicates, and enforcement actions, and can stop, inspect, or redirect actions before execution. | Overlap: deterministic runtime constraints around LLM agents; action blocking; policy predicates; low overhead; some user-inspection hooks. Difference: safety-oriented rather than obligation-ledger-oriented; no general receipt-backed completion framework; little emphasis on cross-session commitments. citeturn26view0turn26view3turn26view5 |
| **The Task Shield: Enforcing Task Alignment to Defend Against Indirect Prompt Injection in LLM Agents** | ACL 2025 | Very close on the question “does each candidate instruction or tool call actually serve the user’s objective?” | Overlap: test-time checking of each instruction/tool call against user goals; runtime intervention. Difference: framed as security and prompt-injection defense, not as a general evidence-and-obligation binding layer; no persistent obligation ledger or receipt-gated completion. citeturn25view0turn25view1turn25view3 |
| **RvLLM: LLM Runtime Verification with Domain Knowledge** | arXiv preprint 2025 | A direct runtime-verification approach for LLM outputs using a lightweight specification language and follow-up queries. | Overlap: formal constraints, runtime checking, domain rules, targeted follow-up verification. Difference: predominantly **detection** of inconsistent outputs, not durable action governance or completion gating. citeturn27view0 |
| **Do LLMs Catch Their Own Mistakes? A Comprehensive Benchmark for Reflective Tool Use LLMs** | Findings of ACL 2026 | Mechanistically important because it isolates the gap between **error detection** and **corrective action** in tool use. | Overlap: recognition does not reliably produce repair; detection and correction are measured separately. Difference: benchmark rather than control architecture; focuses on reflective tool mistakes, not obligation persistence or receipt-backed completion. citeturn28view1 |
| **IHEval: Evaluating Language Models on Following the Instruction Hierarchy** | recent preprint / research release | Close on policy incorporation: models often understand priority structures yet fail under conflict. | Overlap: distinguishes instruction availability and hierarchy from actual compliance under conflict. Difference: does not study evidence inspection or persistent obligations; geared to instruction priority, not general binding of retrieved evidence. citeturn24view6 |
| **τ-bench: A Benchmark for Tool-Agent-User Interaction in Real-World Domains** | arXiv 2024 | Close because it evaluates tool use under domain policies and measures repeated-trial reliability with **pass^k**. | Overlap: real-world policy-constrained agent behavior; final state judged by environment rather than rhetoric. Difference: does not decompose availability vs inspection vs binding, and does not directly measure whether recognized evidence constrains later action. citeturn23view4 |
| **AgentDojo** | NeurIPS 2024 Datasets and Benchmarks | Close because it tests tool-using agents in dynamic environments with attacks, defenses, and utility/security tradeoffs. | Overlap: real agent tasks, defensive layers, runtime robustness concerns. Difference: centered on prompt injection and security, not obligation persistence or receipt-backed completion. citeturn10search2turn10search11 |
| **LoCoMo-Plus** | ACL 2026 | One of the clearest benchmarks for latent constraints that must be applied later, rather than merely recalled as facts. | Overlap: “constraint consistency” and cue–trigger disconnect resemble the dossier’s concern that remembered information may fail to govern later outputs. Difference: conversational memory benchmark, not runtime enforcement or action blocking. citeturn23view6 |
| **MemoryAgentBench** | ICLR 2026 submission / preprint 2025 | Close because it evaluates whether memory agents can update and use long-term information rather than just retrieve it. | Overlap: multi-turn, incremental information processing; conflict resolution. Difference: memory-centric, not specifically about binding recognized evidence to later actions or receipt-backed completion. citeturn19search12turn19search15 |
| **LoCoMo** | ACL 2024 | Foundational for long-term conversational memory evaluation. | Overlap: highlights that long-context access and RAG do not guarantee human-level use of long-range information. Difference: largely factual and temporal memory; not explicit about recognition-to-compliance gaps. citeturn24view1 |
| **RARR: Researching and Revising What Language Models Say** | ACL 2023 | One of the closest prior art items for **evidence-gated claims**. | Overlap: external evidence search and post-hoc revision of unsupported content. Difference: revisions text, not agent actions; does not maintain unresolved obligations or block completion claims without receipts. citeturn24view3 |
| **FActScore** | EMNLP 2023 | Strong prior art for claim decomposition and evidence support at atomic-fact level. | Overlap: verifies whether claims are supported by reliable sources. Difference: purely evaluative; no runtime enforcement, obligation tracking, or postcondition gating. citeturn24view2 |
| **StateFlow** | 2024 preprint / OpenReview | Close because it explicitly uses state machines to constrain LLM task solving. | Overlap: workflow/state transition control around an LLM agent. Difference: does not center on evidence binding, receipts, or unresolved obligations as first-class objects. citeturn11search2turn11search20 |
| **Life-Harness: Runtime Harness Adaptation for Deterministic LLM Agents** | arXiv preprint 2026 | Close because it argues that reliability gains can come from adapting the **runtime harness**, not the model, in deterministic environments. | Overlap: environment-side intervention, not weight tuning, can strongly improve agent reliability. Difference: learned harness adaptation rather than explicit obligation ledger or verification policy; broad runtime mediation, not a named binding layer. citeturn14search2 |
| **Safe Reinforcement Learning via Shielding** | AAAI 2018 | A key conceptual ancestor for deterministic external guards around learning systems. | Overlap: a shield monitors candidate actions against formal safety specifications and blocks unsafe moves at runtime. Difference: not about language models, evidence inspection, or receipt-backed claims; still a crucial formal precedent. citeturn24view4 |
| **Proof-Carrying Code** | POPL 1997 | The closest classic analogue to “proof-carrying actions.” | Overlap: untrusted producers must supply machine-checkable evidence of compliance before execution is allowed. Difference: applies to executable code, not to ongoing agent actions in open-ended environments; still conceptually important for the dossier’s strongest enforcement intuition. citeturn38search0turn38search3 |
| **Commitment and Effectiveness of Situated Agents** | IJCAI 1991 | A foundational ancestor for commitment persistence as a control problem, not just a memory problem. | Overlap: studies how commitment strategies affect effective behavior in dynamic environments. Difference: not about LLMs, evidence grounding, or modern tool use; the similarity is conceptual rather than implementation-level. citeturn24view5 |

**Citation chaining** reinforces this picture. The most modern LLM-agent enforcement work traces back to classic runtime-verification and shielding ideas; reflective-tool-use benchmarks sit downstream of the self-correction literature and react against its overly optimistic claims; and memory work has progressed from long-context factual recall (**LoCoMo**) to incremental multi-turn competencies (**MemoryAgentBench**) and then to latent-constraint consistency (**LoCoMo-Plus**). That progression suggests the dossier is pointing in a real direction, but not from a blank slate. citeturn24view4turn26view0turn25view0turn32search1turn33search0turn24view1turn19search12turn23view6

## Comparison and solution status

### Comparison matrix

| System or line of work | Makes information available | Requires inspection | Enforces behavior at runtime | Persistent obligations across steps or sessions | Evidence-gated factual claims | Receipt-gated completion | Runtime blocking or revision | Measures false blocking |
|---|---|---:|---:|---:|---:|---:|---:|---:|
| **Dossier’s Recall–Verify–Bind** | Yes | Yes | Yes | Intended yes | Intended yes | Intended yes | Yes | Intended yes |
| **AgentSpec** | Sometimes | Sometimes via user inspection or self-examination | **Yes** | Limited | Not central | No | **Yes** | Partly, through precision/recall and discussion of false positives. citeturn26view0turn26view4turn26view5 |
| **Task Shield** | Yes | Yes, per instruction/tool-call alignment check | **Yes** | No | Indirectly | No | **Yes** | Yes, via utility-security tradeoffs. citeturn25view0turn25view3 |
| **RvLLM** | Yes | Yes | Mostly detection, not hard blocking | No | **Yes** for domain-rule consistency | No | Mostly detection/querying | Not centrally. citeturn27view0 |
| **RARR / FActScore** | Yes | **Yes** | No | No | **Yes** | No | Revision or scoring, not action blocking | Not centrally. citeturn24view3turn24view2 |
| **ReflecTool-Bench** | Benchmark | Benchmark | No | No | No | No | No | Measures detection vs correction, not blocking. citeturn28view1 |
| **IHEval** | Benchmark | Implicitly | No | No | No | No | No | No. citeturn24view6 |
| **τ-bench** | Benchmark | Not directly | No | Limited within trajectory | No | Final environment state only | No | Reliability via pass^k, but not false-blocking. citeturn23view4 |
| **LoCoMo-Plus / MemoryAgentBench** | Benchmark | Indirectly | No | Yes for memory use | No | No | No | No. citeturn23view6turn19search12 |
| **Shielding / runtime assurance / workflows** | Yes | Sometimes | **Yes** | Depends on workflow engine | Sometimes | Sometimes through postconditions | **Yes** | Often, but domain-specific. citeturn24view4turn34search1turn34search13 |

The table makes the core point. **No single prior line cleanly covers the entire dossier package.** But the package is assembled from **existing parts**, many of which are mature. What is missing is a standard way to evaluate whether an agent’s later behavior is constrained by information it already had and already surfaced. citeturn26view0turn25view0turn27view0turn23view6turn28view1turn24view6

### What has already been solved

**Deterministic runtime enforcement** is already a real and usable pattern. In modern LLM-agent work, AgentSpec shows that explicit rules with triggers, predicates, and enforcement mechanisms can prevent unsafe code executions, eliminate hazardous embodied actions in evaluated categories, and enforce full compliance in tested autonomous-driving scenarios, all with millisecond-scale overhead. Task Shield likewise demonstrates that a runtime checker can inspect each instruction or tool call and intervene before execution, substantially reducing attack success while preserving utility. In older control literature, shielding already established the idea of an external monitor that blocks unsafe learned actions at runtime. citeturn26view0turn26view3turn25view0turn25view3turn24view4

**Evidence-gated textual verification** is also established. RARR retrofits attribution and revises unsupported claims; FActScore decomposes long-form output into atomic facts and checks source support; RvLLM applies domain-specific rule checking to LLM outputs with follow-up queries and formalized constraints. The literature therefore already knows how to ask, in several domains, “what claim was made?” and “what evidence or rule supports it?” citeturn24view3turn24view2turn27view0

**Workflow and state-machine control** around probabilistic models is established in both research and engineering. StateFlow explicitly casts LLM problem solving as state transitions; durable workflow systems such as Temporal maintain long-running state and postconditioned steps; LangGraph and Guardrails provide practical orchestration and validation layers around model calls. These are not, by themselves, proof that the dossier’s thesis is solved, but they do mean the architecture is **not** unprecedented. citeturn11search2turn34search1turn34search4turn34search3turn34search13turn34search17

**Memory benchmarks** are established, and the field has already moved beyond pure recall. LoCoMo exposed long-range memory limitations; MemoryAgentBench extended evaluation to multi-turn retrieval, updating, and conflict resolution; LoCoMo-Plus went further by stressing latent constraints and “constraint consistency.” So the field already recognizes that “remembering” is not the same as answering a later factual query. citeturn24view1turn19search12turn23view6

### What remains unsolved

What remains unsolved is **not** whether hard guards, verifiers, or memories can help. It is whether there is a **general, reproducible, cross-domain measurement framework** for the exact gap the dossier cares about: once relevant evidence is available and even noticed, how often does later behavior still drift? Existing work typically measures **retrieval success**, **output factuality**, **policy adherence**, **attack resilience**, or **task completion**. Very little work makes **binding conditional on recognition** the core variable. citeturn23view4turn25view0turn28view1turn23view6turn19search12

The literature also does **not** yet offer a standard account of **persistent unresolved obligations** in general-purpose LLM agents. BDI, multi-agent commitments, and cognitive prospective memory all study obligation persistence in some sense, but modern LLM-agent papers rarely maintain a first-class ledger of open commitments that survives turns or sessions and is checked before claims of completion. Long-term memory systems store preferences and facts; they do not usually maintain **discharge conditions**. citeturn24view5turn16search11turn16search17turn24view1turn19search12

**Receipt-backed completion** is surprisingly under-studied as an explicit research construct. Software engineering has strong analogues: tests, artifacts, and state diffs are standard receipts, and benchmarks like SWE-bench Verified already judge success by actual repository behavior rather than self-report. But the agent literature has not generalized this into a broader principle that “completion claims must be backed by externally checkable discharge evidence.” citeturn22search0turn22search13turn22search11

There is also substantial **negative evidence** against naive versions of the dossier’s intervention. Self-correction without reliable external feedback often fails and can even degrade performance, as argued by Huang et al. and Kamoi et al. ReflecTool-Bench similarly finds that top models can detect many errors while still failing to repair them, especially for their own prior mistakes. AgentSpec’s own discussion shows that generated hard rules can become overly rigid and cause false positives. In other words, “just add a verifier” and “just add rules” are not magic bullets. citeturn33search0turn32search1turn28view1turn26view4

## Novelty assessment and better experimental design

### Novelty assessment

| Dossier claim | Assessment | Why |
|---|---|---|
| Retrieved information often fails to influence later action | **Already established** | Self-correction and reflective-tool-use work shows recognition and later correction come apart; policy and memory benchmarks show use is weaker than access. citeturn32search1turn33search0turn28view1turn23view6 |
| Verbal acknowledgment is not reliable evidence of incorporation | **Weakly to moderately established** | ReflecTool-Bench’s detection-versus-correction gap and IHEval’s conflict failures strongly suggest this, but a dedicated “acknowledged rule then later violated it” benchmark remains limited. citeturn28view1turn24view6 |
| Corrections and obligations decay within or across sessions | **Weakly established as behavior, newly combined as framing** | Memory benchmarks show long-range use failures, but explicit obligation-decay is not yet a standard benchmark target. citeturn24view1turn19search12turn23view6 |
| Agents make capability or factual claims without prior inspection | **Already established indirectly** | Hallucination, unsupported claims, and tool-use mistakes are widely documented; verification frameworks exist precisely because unsupported claims remain common. citeturn24view3turn24view2turn27view0 |
| Completion claims should be blocked unless receipts exist | **Plausibly novel as a general agent-evaluation principle** | Strong analogues exist in workflows and software engineering, but this does not appear to be a standardized LLM-agent research construct. citeturn22search13turn34search1 |
| Deterministic gates outperform prompt-only reminders | **Partly established in narrow domains** | Runtime enforcement beats weaker prompt-only defenses in papers like Task Shield and AgentSpec, but broad cross-domain proof is still missing. citeturn25view3turn26view0 |
| Availability–inspection–binding is the right measurement decomposition | **Plausibly novel** | I found close proxies, not a clean prior formalization that makes these three stages the central framework across LLM agents. citeturn23view6turn28view1turn24view6turn27view0 |
| Recall–Verify–Bind is a new architecture | **Newly combined, not fundamentally new** | The ingredients are old and partly standard; the combination is useful, but it strongly resembles runtime assurance plus memory plus workflow postconditions. citeturn26view0turn25view0turn24view4turn34search1turn34search13 |

### Better experimental design

The dossier’s four-way comparison—baseline, prompt-only verification, memory-supported behavior, deterministic binding—is directionally correct, but it is **not yet strong enough** to support the novelty claim on its own.

The benchmark should be redesigned around **conditional stages**. For each task instance, first fix whether the relevant evidence or rule is objectively present in the environment. Then measure whether the agent **retrieves or opens** it. Then measure whether the agent **extracts the operative constraint correctly**. Only then ask whether later behavior remains consistent with that recognized constraint. Without this staged design, improvements in a strict runtime layer can be falsely attributed to “binding” when they were actually caused by better retrieval, easier tasks, or post-hoc rejection of bad outputs. Prior work already warns that self-correction experiments are often confounded by weak baselines and poorly defined research questions. citeturn32search1turn23view4turn28view1turn23view6

A stronger benchmark would include at least six classes of tasks. One class should test **evidence-gated factual claims**: the agent must inspect a document, tool output, or database row before making a claim. A second should test **tool-call preconditions**: the action should only fire if required state truly holds. A third should test **obligation carryover**: an unresolved condition introduced earlier must still constrain a later step or a later session. A fourth should test **receipt-gated completion**: “done” is only valid if an artifact, test pass, or state delta is present. A fifth should test **correction retention**: after the system explicitly recognizes an earlier mistake, does the corrected rule govern the next analogous decision? A sixth should test **conflicted instructions or rules**, where higher-priority constraints must prevail over tempting lower-priority instructions. These task classes can be motivated directly from τ-bench, AgentDojo, IHEval, ReflecTool-Bench, LoCoMo-Plus, and SWE-bench-style final-state verification. citeturn23view4turn10search2turn24view6turn28view1turn23view6turn22search13

The baseline set should also be strengthened. In addition to the dossier’s four conditions, the evaluation should include a **verifier-only probabilistic critic** with no hard blocking, a **schema/workflow-only controller** without persistent memory, and a **strong workflow/runtime-enforcement baseline** modeled after AgentSpec or Task Shield. It should also include an **oracle upper bound** in which a symbolic or human judge supplies perfect binding signals. Otherwise the proposed RVB layer could look impressive merely because the baselines are too weak. citeturn26view0turn25view0turn32search1

Operational definitions should be made explicit. **Availability** should mean the relevant rule or evidence is present and machine-accessible at the time of decision. **Inspection** should mean the agent actually issues the read/open/query operation or otherwise obtains the evidence within the traced trajectory. **Recognition** should mean the agent extracts the operative proposition or obligation correctly into a structured representation. **Binding** should mean that every later relevant action and claim stays consistent with that recognized proposition until it is discharged or superseded. **Obligation** should include an issuer, a content field, a triggering condition, and a discharge test. **Completion** should mean the agent asserts closure of a task. **Receipt** should mean an externally checkable artifact or state transition that independently verifies completion. Those definitions are necessary if the work is to be reproducible rather than anecdotal. This recommendation follows directly from the problems identified in self-correction surveys and from the benchmark program in long-term memory and tool-use work. citeturn32search1turn19search12turn23view6turn28view1

The metrics should distinguish **detection** from **prevention**. At minimum, the study should report: task success; pass^k reliability; availability rate; inspection coverage conditional on availability; recognition accuracy conditional on inspection; binding compliance conditional on recognition; unsupported-claim rate; unsupported-completion rate; false-block rate; deadlock rate; latency; token and tool cost; number of user escalations; and recovery success after a blocked or revised action. Task Shield’s utility-security frontier, τ-bench’s pass^k, and ReflecTool-Bench’s separation of detection and correction all show why these distinctions matter. citeturn25view3turn23view4turn28view1

A result that would **falsify the dossier’s strongest thesis** is straightforward. If, once evidence is made available and the agent demonstrably inspects it, later inconsistency becomes rare **without** a binding layer, or if a strong memory-plus-verifier baseline matches the deterministic layer’s performance with similar costs and fewer false blocks, then the dossier’s claim that “recognition does not bind” names a distinct unsolved mechanism would be greatly weakened. Another falsifier would be if hard binding improves compliance only by causing excessive refusals, deadlocks, or utility collapse. The literature already gives reason to take these failure modes seriously. citeturn33search0turn32search1turn26view4turn25view3

## Recommended reframing

The academically strongest reframing is **not** “we discovered that AI agents fail to use available evidence.” That claim is too broad and too easy to rebut with prior work on memory, self-correction, rule following, runtime assurance, and execution monitoring. A safer, stronger framing is this:

**Existing work separately studies retrieval, instruction following, verification, and runtime safeguards, but lacks a unified framework for measuring whether already-available and even explicitly recognized evidence reliably constrains subsequent agent behavior.**

That reframing makes the contribution a **benchmark and systems question**, not a sweeping origin claim. The strongest defensible research question is something like:

**When relevant evidence, corrections, rules, or obligations are already available to a tool-using agent, what fraction of failures arise from non-retrieval, non-inspection, and non-binding respectively, and which interventions most reduce the binding-specific portion of those failures?**

The strongest defensible contribution statement is then:

**We introduce an obligation-centered evaluation framework that separates availability, inspection, recognition, and behavioral binding; a benchmark spanning evidence-gated claims, correction retention, persistent obligations, and receipt-gated completion; and a runtime reference implementation that combines memory, verification, and deterministic enforcement.**

That framing would also answer the practical question implicit in the dossier’s flagship product case. It does **not** mean the product work—such as *The Anthropic Experience*—is invalid or needs to stop. It means the product case is best treated as a **motivating case study and deployment testbed**, not as proof that the underlying problem or architecture is wholly unprecedented. What changes is the **research claim**, not the fact that the engineering pattern can still be useful and worth building.

## Bibliography

Wang, H., Poskitt, C. M., & Sun, J. **AgentSpec: Customizable Runtime Enforcement for Safe and Reliable LLM Agents**. ICSE 2026. citeturn23view0turn26view0

Jia, F., Wu, T., Qin, X., & Squicciarini, A. **The Task Shield: Enforcing Task Alignment to Defend Against Indirect Prompt Injection in LLM Agents**. ACL 2025. citeturn25view0

Zhang, Y., Emma, S. Y., Lee Jia En, A., & Dong, J. S. **RvLLM: LLM Runtime Verification with Domain Knowledge**. arXiv, 2025. citeturn27view0

Yao, S., Shinn, N., Razavi, P., & Narasimhan, K. **τ-bench: A Benchmark for Tool-Agent-User Interaction in Real-World Domains**. arXiv, 2024. citeturn23view4

Debenedetti, E., Zhang, J., Balunovic, M., Beurer-Kellner, L., Fischer, M., & Tramèr, F. **AgentDojo: A Dynamic Environment to Evaluate Prompt Injection Attacks and Defenses for LLM Agents**. NeurIPS Datasets and Benchmarks 2024. citeturn10search2turn10search11

Li, Y., Guo, W., Zhang, L., Xu, R., Huang, M., Liu, H., Xu, L., Xu, Y., & Liu, J. **LoCoMo-Plus: Beyond-Factual Cognitive Memory Evaluation Framework for LLM Agents**. ACL 2026. citeturn23view6

Hu, Y., Wang, Y., & McAuley, J. **Evaluating Memory in LLM Agents via Incremental Multi-Turn Interactions**. Preprint / ICLR 2026 submission, 2025. citeturn19search12turn19search15

Maharana, A., Lee, D.-H., Tulyakov, S., Bansal, M., Barbieri, F., & Fang, Y. **Evaluating Very Long-Term Conversational Memory of LLM Agents**. ACL 2024. citeturn24view1

Liu, Z., Xiao, L., Li, Y., Yun, H., Li, L., Zhang, C., & Jiang, M. **Do LLMs Catch Their Own Mistakes? A Comprehensive Benchmark for Reflective Tool Use LLMs**. Findings of ACL 2026. citeturn28view1

Kamoi, R., Zhang, Y., Zhang, N., Han, J., & Zhang, R. **When Can LLMs Actually Correct Their Own Mistakes? A Critical Survey of Self-Correction of LLMs**. TACL, 2024. citeturn32search1

Huang, J., Chen, X., Mishra, S., Zheng, H. S., Yu, A. W., Song, X., & Zhou, D. **Large Language Models Cannot Self-Correct Reasoning Yet**. ICLR 2024 / arXiv 2023. citeturn33search0turn33search2

Gao, L., Dai, Z., Pasupat, P., Chen, A., Chaganty, A. T., Fan, Y., Zhao, V., Lao, N., Lee, H., Juan, D.-C., & Guu, K. **RARR: Researching and Revising What Language Models Say, Using Language Models**. ACL 2023. citeturn24view3

Min, S., Krishna, K., Lyu, X., Lewis, M., Yih, W.-t., Koh, P., Iyyer, M., Zettlemoyer, L., & Hajishirzi, H. **FActScore: Fine-grained Atomic Evaluation of Factual Precision in Long Form Text Generation**. EMNLP 2023. citeturn24view2

Lightman, H., Kosaraju, V., Burda, Y., Edwards, H., Baker, B., Lee, T., Leike, J., Schulman, J., Sutskever, I., & Cobbe, K. **Let’s Verify Step by Step**. arXiv / OpenAI, 2023. citeturn35search0turn35search2

Wu, Y., Yue, Y., et al. **StateFlow: Enhancing LLM Task-Solving through State Machines**. 2024. citeturn11search2turn11search20

Xu, T., Wen, H., & Li, M. **Adapting the Interface, Not the Model: Runtime Harness Adaptation for Deterministic LLM Agents**. arXiv, 2026. citeturn14search2

Alshiekh, M., Bloem, R., Ehlers, R., Könighofer, B., Niekum, S., & Topcu, U. **Safe Reinforcement Learning via Shielding**. AAAI 2018. citeturn24view4

Necula, G. C. **Proof-Carrying Code**. POPL 1997. citeturn38search0turn38search3

Kinny, D. N., & Georgeff, M. P. **Commitment and Effectiveness of Situated Agents**. IJCAI 1991. citeturn24view5

Mendoza, J. P., Veloso, M., & Simmons, R. **Plan Execution Monitoring through Detection of Unmet Expectations about Action Outcomes**. ICRA 2015. citeturn38search2

Colledanchise, M., & Ögren, P. **Behavior Trees in Robotics and AI: An Introduction**. 2018. citeturn38search1

McDaniel, M. A., & Einstein, G. O. **Strategic and Automatic Processes in Prospective Memory Retrieval**. Cognitive Psychology, 2000. citeturn16search11

Gollwitzer, P. M. **Implementation Intentions** and subsequent synthesis on plan-based action initiation. citeturn16search18

Pfeffer, J., & Sutton, R. I. **The Knowing-Doing Gap**. 2000. citeturn17search0turn17search20

**Non-academic systems and documentation cited for deployed mechanisms**

LangGraph documentation and repository, for long-running stateful agent orchestration. citeturn34search0turn34search3

Temporal documentation and repository, for durable execution and workflow postconditions. citeturn34search1turn34search4

Guardrails AI documentation, for validator-based runtime checking of inputs and outputs. citeturn34search13turn34search17turn34search20

SWE-bench Verified documentation and OpenAI announcement, for environment-judged success rather than self-reported completion. citeturn22search0turn22search11turn22search13