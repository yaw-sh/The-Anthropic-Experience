# Outward Research Merge Guide

Use this when merging the separate forum/literature research session into the build directive.

## 1. Keep three evidence lanes separate

### Lane A — This case

Sources from the supplied archive. Supports only what happened or was reported in the documented sessions and build snapshot.

### Lane B — Official product facts

Current official Anthropic, GitHub, Cloudflare, browser, framework, or hosting documentation. Use for current product capabilities, terminology, dates, deployment behavior, and limits.

### Lane C — External experiences and research

Forum posts, issue reports, social posts, academic papers, benchmarks, and third-party analyses. These may establish that similar reports exist or that a mechanism has prior art. They do not independently prove this case or a provider-wide rate.

Never let a Lane C anecdote upgrade a Lane A reconstructed claim to a direct receipt.

---

## 2. Forum-experience record

Normalize every candidate external experience into a record like:

```json
{
  "id": "forum-...",
  "canonicalUrl": "...",
  "archiveUrl": "...",
  "platform": "Anthropic forum | Reddit | GitHub issue | X | other",
  "publishedAt": "ISO-8601 or unknown",
  "accessedAt": "ISO-8601",
  "authorPublicName": "omit from site unless necessary",
  "product": "...",
  "surface": "...",
  "versionOrDateContext": "...",
  "task": "...",
  "reportedObservedState": "...",
  "reportedClaim": "...",
  "reportedOutcome": "...",
  "failureStage": "availability | inspection | interpretation | binding | completion | unknown",
  "receiptLevel": "screenshot | logs | reproduction | narrative-only",
  "alternativeExplanations": [],
  "followUpResolution": "...",
  "duplicateGroup": "...",
  "confidence": "high | medium | low",
  "publicUse": "background-only | selected-example | reject"
}
```

Record only the minimum personal information needed. Do not copy full posts into the repository.

---

## 3. Deduplication

External complaint counts are especially vulnerable to inflation.

Deduplicate:

- cross-posts by the same person;
- copied screenshots;
- news/blog articles summarizing one original post;
- replies describing the same incident;
- posts that cite this project after launch;
- repeated reports from one unresolved configuration problem;
- historical behavior that predates a documented product change.

A cluster of reposts is one incident family, not many independent observations.

---

## 4. Classification

Map external reports to the same chain used by the product:

```text
Configured / declared
→ available to the active runtime
→ inspected
→ interpreted correctly
→ bound later behavior
→ completed with receipt
```

Do not classify “connector not visible” as an inspection failure if the connector was genuinely unavailable to that runtime. Do not classify a failed operation as false completion unless the agent claimed completion.

Suggested external mechanism labels:

- settings/session mismatch;
- tool exists but is not exposed to runtime;
- evidence available but not inspected;
- evidence inspected but interpreted incorrectly;
- correction recognized but not retained;
- completion claimed without receipt;
- plan substituted for execution;
- cross-surface state loss;
- unclear/insufficient evidence;
- successful control.

Include successful controls and resolved cases. A report containing only complaints cannot support a comparative reliability conclusion.

---

## 5. What the outward report must not claim without stronger data

- prevalence or failure rate from forum-post counts;
- Anthropic is uniquely worse than competitors;
- all connector failures share one internal cause;
- public complaints represent typical users;
- a settings UI state guarantees runtime/repository authorization;
- a model’s self-explanation identifies the actual mechanism;
- lack of a public response means acknowledgement or fault;
- forum silence means absence of the problem.

Use language such as “similar public reports exist” rather than “this proves a systemic rate.”

---

## 6. Literature source registry

For every academic or technical source, record:

- canonical title;
- authors;
- DOI, arXiv ID, proceedings URL, or official documentation URL;
- publication venue/status;
- version/date;
- accessed date;
- retraction/correction status;
- exact claim supported;
- page/section/table/figure locator;
- whether the source studies retrieval, inspection, recognition, binding, runtime enforcement, verification, completion, or another construct;
- limitations and differences from this project;
- quote used, if any, kept minimal.

Do not preserve ChatGPT-internal citation IDs as citations.

---

## 7. Priority outward questions

The separate research should answer these, in order:

1. Are there documented current cases of connectors/integrations appearing configured but unavailable in an active Anthropic session?
2. Are there official explanations of connector authorization layers, surface/runtime availability, and repository-scoping behavior?
3. Are there documented cases across providers where an agent asserts completion without a verifiable state change?
4. What research already separates retrieval/inspection from later behavioral compliance or binding?
5. What runtime-enforcement, obligation-tracking, receipt-gating, or state-machine approaches are established prior art?
6. What false-blocking, deadlock, utility, and overhead costs do those systems report?
7. Which inherited 2025–2026 citations are real, current, and accurately characterized?
8. What disconfirming evidence or successful controls would weaken the project’s broadest interpretation?

---

## 8. Merge rules

### May enter public v1

- official current product documentation necessary to explain layers or limits;
- a small number of high-quality, minimally quoted external examples labeled as reports, not proof;
- established academic concepts needed to avoid false novelty claims;
- explicit counterexamples and limitations.

### Keep in methodology/background

- forum sample counts;
- comparative observations without denominator/control data;
- unresolved GitHub issues;
- social-media reactions;
- preliminary or unpublished research.

### Keep out

- scraped personal data;
- large copied forum text;
- usernames not necessary to attribution;
- speculative claims of motive;
- provider rankings from anecdotal counts;
- anything that broadens v1 into the Fellows safety thesis.

---

## 9. Claim-register integration

The outward session should return machine-readable records that can be merged into the seed register. Use new source IDs and claims rather than editing narrative copy directly.

For each proposed public addition, supply:

```json
{
  "proposedClaimId": "...",
  "publicText": "...",
  "scope": "...",
  "status": "candidate",
  "confidence": "...",
  "sourceRefs": [],
  "limitations": [],
  "contradictsOrSupersedes": [],
  "recommendedPlacement": "method | case | evidence | omit"
}
```

Codex should reject any research output that cannot be normalized to this structure.

---

## 10. Narrative merge test

After adding outward research, the public story must still be true if every forum anecdote is removed.

The case should stand on its own supplied evidence. External material should provide context, prior art, counterexamples, and limits—not carry the accusation.
