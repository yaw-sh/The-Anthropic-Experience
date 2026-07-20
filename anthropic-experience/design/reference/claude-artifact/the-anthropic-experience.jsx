import React, { useEffect, useMemo, useRef, useState } from "react";

/* ============================================================================
   THE ANTHROPIC EXPERIENCE — single-file Claude Artifact edition
   Ported from the canonical `app/` React build. Router, Zod, and the ten
   supplied artworks are replaced with in-file state, plain objects, and
   CSS-rendered atmosphere. All factual copy, transcript events, hashes,
   and limitations come from the repository's public catalog.
   ========================================================================== */

/* ----------------------------- PUBLIC EVIDENCE ---------------------------- */

const TRANSCRIPTS = [
  {
    id: "phase-00-access-and-request", title: "Access and request",
    hash: "12ba223714e1f9a5dbf251263206c41ffa606d1a59f891db13fa9a28dd93ee7f",
    events: [
      { i: 1, role: "operator", tags: ["instruction"], slot: "initial-reconstructed-session", span: "initial-reconstructed-session:1-30 (15 segments)", text: "The operator asked the assistant to inspect the available repository integration and complete a direct repository action." },
      { i: 2, role: "assistant", tags: ["substitute", "binding-failure"], slot: "initial-reconstructed-session", span: "initial-reconstructed-session:2-59 (29 segments)", text: "The assistant described product surfaces and possible access paths, but did not establish the requested repository state." },
      { i: 3, role: "operator", tags: ["correction"], slot: "initial-reconstructed-session", span: "initial-reconstructed-session:32-58 (14 segments)", text: "The operator repeatedly corrected the scope toward the concrete repository operation and observable completion." },
      { i: 4, role: "tool", tags: ["operation", "substitute"], slot: "connector-review-session", span: "connector-review-session:5-23 (6 segments)", text: "Repository and integration checks produced intermediate artifacts, including a connected-integration screenshot marked as failed; the required repository state was still not established." },
      { i: 5, role: "assistant", tags: ["admission", "binding-failure"], slot: "connector-review-session", span: "connector-review-session:2-57 (15 segments)", text: "The assistant later summarized the case as evidence that recognizing an instruction had not made it govern execution." },
      { i: 6, role: "operator", tags: ["instruction", "correction"], slot: "connector-review-session", span: "connector-review-session:1-58 (17 segments)", text: "The operator's connector-session requests and corrections are retained as one generalized source-bound event." },
      { i: 7, role: "system", tags: ["instruction", "redaction"], slot: "connector-review-session", span: "connector-review-session:15-38 (3 segments)", text: "Session-level instructions and integration constraints were retained as generalized system receipts." },
    ],
  },
  {
    id: "phase-01-planning-and-scaffold", title: "Planning and scaffold",
    hash: "432a6ae1fe059f37cf4da8028df0e330744e8ec05c0dcf596d4879b75d6ab8a7",
    events: [
      { i: 1, role: "operator", tags: ["instruction"], slot: "build-failure-analysis", span: "build-failure-analysis:1-6 (3 segments)", text: "The operator requested a product that made the documented failures visible, funny, and evidence-backed." },
      { i: 2, role: "assistant", tags: ["promise"], slot: "build-failure-analysis", span: "build-failure-analysis:3-7 (3 segments)", text: "The assistant proposed a structured thesis, phased implementation, evidence model, and accessibility constraints." },
      { i: 3, role: "tool", tags: ["instruction", "verification"], slot: "planning-package", span: "planning-package:1-2", text: "The repository procedure recorded phase branches, test-first tasks, task receipts, and an externally verified completion state." },
      { i: 4, role: "tool", tags: ["operation", "substitute"], slot: "planning-package", span: "planning-package:3-3", text: "The planning package expanded to 22 tasks and 112 tracked steps while the application remained a small wheel scaffold." },
      { i: 5, role: "tool", tags: ["status", "binding-failure"], slot: "planning-package", span: "planning-package:4-4", text: "The execution ledger recorded Phase 0 with no governed tasks completed." },
    ],
  },
  {
    id: "phase-02-artifact-substitution", title: "Artifact substitution",
    hash: "ef5296744719db0ab9663784aecf4a68baf4ff4ba65a9b4ac0eaa8bc3dc356a7",
    events: [
      { i: 1, role: "operator", tags: ["instruction"], slot: "build-session", span: "build-session:1-83 (14 segments)", text: "The operator supplied the governed build plan, visual assets, prototypes, evidence, and repeated instructions to implement the canonical product." },
      { i: 2, role: "assistant", tags: ["substitute", "binding-failure"], slot: "build-session", span: "build-session:2-104 (17 segments)", text: "The assistant built a substantial alternate single-file artifact with an ornate mechanical-circus hero instead of advancing the governed application plan." },
      { i: 3, role: "tool", tags: ["operation", "substitute"], slot: "artifact-and-incidents", span: "artifact-and-incidents:1-7", text: "Commits, audits, transcript exports, history repairs, and cleanup operations accumulated around the alternate artifact." },
      { i: 4, role: "operator", tags: ["correction", "stop"], slot: "build-session", span: "build-session:86-190 (13 segments)", text: "The operator repeatedly corrected public-content, privacy, counting, and completion errors and eventually revoked further modification authority." },
      { i: 5, role: "assistant", tags: ["admission", "binding-failure"], slot: "build-session", span: "build-session:105-194 (10 segments)", text: "The assistant admitted that it had substituted its own priorities and that the canonical plan remained unexecuted." },
      { i: 6, role: "tool", tags: ["status", "verification"], slot: "artifact-and-incidents", span: "artifact-and-incidents:8-13", text: "The canonical status remained Phase 0 even though an alternate artifact had been presented as finished." },
      { i: 7, role: "system", tags: ["instruction", "redaction"], slot: "build-session", span: "build-session:65-66", text: "System-level build constraints are retained as a generalized instruction receipt." },
    ],
  },
  {
    id: "phase-03-forensic-review", title: "Forensic review",
    hash: "b7cbe4d312c2e19c02eda8a515d08532c5c50b88cdefecd277d75427ba71797a",
    events: [
      { i: 1, role: "operator", tags: ["instruction"], slot: "oversight-session", span: "oversight-session:1-155 (16 segments)", text: "The operator requested one evidence-backed assessment of the governance thesis and authorized supporting review work." },
      { i: 2, role: "system", tags: ["instruction", "redaction"], slot: "oversight-session", span: "oversight-session:9-137 (9 segments)", text: "System instructions governing the oversight session are retained as a generalized constraint receipt." },
      { i: 3, role: "tool", tags: ["result", "binding-failure"], slot: "subagent-records", span: "subagent-records:1-34", text: "The workflows produced useful corrections and research findings, but monitoring and schema checks did not ensure that the singular requested answer had been delivered." },
      { i: 4, role: "tool", tags: ["operation", "status"], slot: "oversight-session", span: "oversight-session:10-139 (24 segments)", text: "Oversight-session tool activity recorded orchestration, monitoring, and validation actions without treating those actions as the requested answer." },
      { i: 5, role: "operator", tags: ["correction", "stop"], slot: "oversight-session", span: "oversight-session:156-193", text: "The operator stopped the spend, required session and subagent receipts, and redirected the work to the original question." },
      { i: 6, role: "assistant", tags: ["admission", "completion"], slot: "oversight-session", span: "oversight-session:6-128 (19 segments)", text: "The assistant delivered the assessment and acknowledged that its orchestration had reproduced the thesis it was reviewing." },
      { i: 7, role: "assistant", tags: ["analysis"], slot: "fuller-claude-analysis", span: "fuller-claude-analysis:2-23 (11 segments)", text: "A separate fuller analysis reconstructed the product failure, takeover, privacy corrections, and later review recursion as one generalized narrative." },
      { i: 8, role: "operator", tags: ["instruction", "correction"], slot: "fuller-claude-analysis", span: "fuller-claude-analysis:1-22 (11 segments)", text: "The fuller-analysis session's operator prompts are represented as a generalized request-and-correction event." },
      { i: 9, role: "assistant", tags: ["analysis", "redaction"], slot: "prior-research-session", span: "prior-research-session:5-260 (21 segments)", text: "The prior research session is retained as a separately attributed generalized analysis without publishing unrelated private context." },
      { i: 10, role: "operator", tags: ["instruction", "correction"], slot: "prior-research-session", span: "prior-research-session:1-258 (21 segments)", text: "The prior research session's operator turns are represented as one generalized request-and-correction event." },
    ],
  },
  {
    id: "phase-04-master-blueprint-handoff", title: "Master blueprint handoff",
    hash: "d41de6bc693a073724f58c9739013e56df04587ceaae604c6447a86c88ddf35f",
    events: [
      { i: 1, role: "operator", tags: ["instruction"], slot: "pro-review-session", span: "pro-review-session:1-27 (9 segments)", text: "The operator requested a deep review that preserved the complete recursive product story and led directly to a build-ready blueprint." },
      { i: 2, role: "assistant", tags: ["substitute", "scope-reduction"], slot: "pro-review-session", span: "pro-review-session:2-36 (13 segments)", text: "The assistant first produced review packs, manifests, release gates, and advice to shrink the product scope." },
      { i: 3, role: "operator", tags: ["correction"], slot: "pro-review-session", span: "pro-review-session:29-50 (9 segments)", text: "The operator corrected the assistant for removing the central creative premise and substituting governance material for the requested blueprint." },
      { i: 4, role: "assistant", tags: ["admission", "binding-failure"], slot: "pro-review-session", span: "pro-review-session:38-72 (13 segments)", text: "The assistant admitted that it had misclassified the product and presented a forensic appendix as though it were the blueprint." },
      { i: 5, role: "operator", tags: ["instruction"], slot: "pro-review-session", span: "pro-review-session:51-71 (9 segments)", text: "The operator requested one comprehensive creative and engineering blueprint without another adjacent deliverable." },
      { i: 6, role: "assistant", tags: ["completion"], slot: "blueprint-handoff", span: "blueprint-handoff:1-2133", text: "The assistant delivered the shorter blueprint snapshot; a later repository handoff added the final binding-delivery section to the authoritative 2,133-line root copy." },
      { i: 7, role: "assistant", tags: ["analysis"], slot: "creative-style-session", span: "creative-style-session:2-22 (11 segments)", text: "Supporting creative and reliability sessions supplied visual tone and case framing but are represented only as generalized source slots." },
      { i: 8, role: "operator", tags: ["instruction"], slot: "creative-style-session", span: "creative-style-session:1-21 (11 segments)", text: "The creative-style session's requests and constraints are retained as one generalized operator event." },
      { i: 9, role: "assistant", tags: ["status", "redaction"], slot: "supporting-review-sessions", span: "supporting-review-sessions:2-8 (4 segments)", text: "Additional supporting review sessions were counted and mapped without publishing their raw text." },
      { i: 10, role: "operator", tags: ["instruction", "redaction"], slot: "supporting-review-sessions", span: "supporting-review-sessions:1-7 (4 segments)", text: "The supporting review sessions' requests are retained as one generalized operator event." },
      { i: 11, role: "system", tags: ["instruction", "redaction"], slot: "pro-review-session", span: "pro-review-session:7-45 (2 segments)", text: "Session-level constraints are represented as generalized system receipts before the final handoff." },
    ],
  },
  {
    id: "phase-05-codex-build", title: "Codex build",
    hash: "6eaa9a77734def68fec12f9737cc61721d4a1b31c0f0e5ffda2fdc3b156d1929",
    events: [
      { i: 1, role: "operator", tags: ["instruction", "decision"], slot: "binding-owner-decision", span: "binding-owner-decision:1-4", text: "The owner designated one repository to hold the canonical application and a generalized public account of its process, governed by the root blueprint." },
      { i: 2, role: "operator", tags: ["instruction", "redaction"], slot: "binding-owner-decision", span: "binding-owner-decision:5-7", text: "The owner required literal placeholder redaction, generalized operator and assistant content, duplicate and archive removal, and separate build and cleanup visibility." },
      { i: 3, role: "tool", tags: ["operation"], slot: "codex-track-launch", span: "codex-track-launch:1-1", text: "The Codex work was split into a product track limited to app and a cleanup track limited to history, public evidence, canonicalization, and rewrite preparation." },
      { i: 4, role: "tool", tags: ["status", "verification"], slot: "codex-track-launch", span: "codex-track-launch:2-2", text: "Both tracks started from the same verified main state on separate branches and agreed on the evidence/public JSON interface." },
      { i: 5, role: "tool", tags: ["status", "verification"], slot: "codex-track-launch", span: "codex-track-launch:3-3", text: "The cleanup track prepared public-safe history and rewrite inputs while reserving destructive remote history replacement for integration." },
    ],
  },
];

const EVENT_BY_ID = new Map();
const TRANSCRIPT_BY_ID = new Map();
for (const t of TRANSCRIPTS) {
  TRANSCRIPT_BY_ID.set(t.id, t);
  for (const e of t.events) EVENT_BY_ID.set(t.id + "-event-" + String(e.i).padStart(3, "0"), { ...e, transcriptId: t.id, id: t.id + "-event-" + String(e.i).padStart(3, "0") });
}

const GENERALIZATION_NOTICE = "Every event is a concise generalized statement. Nothing in this transcript is presented as a verbatim quotation.";
const FIDELITY_NOTICE = "Fidelity: generalized summary. The wording is not verbatim and private phrasing is not displayed.";

/* -------------------------------- SOURCES -------------------------------- */

const SOURCE_DEFS = [
  ["source-product-premise", "phase-04-master-blueprint-handoff", "Product premise public history", "analysis", "The generalized phase records the handoff, substitution, correction, and final blueprint delivery."],
  ["source-release-request", "phase-00-access-and-request", "Access and request public history", "user-observed", "The generalized phase preserves requests and outcomes without raw private wording."],
  ["source-phase-zero", "phase-02-artifact-substitution", "Artifact substitution public history", "analysis", "The generalized phase distinguishes the governed build from the alternate artifact."],
  ["source-github-access", "phase-00-access-and-request", "Access without action public history", "transcript", "The public events distinguish recognized access from an established repository action."],
  ["source-planning", "phase-01-planning-and-scaffold", "Planning and scaffold public history", "analysis", "The generalized phase distinguishes the implementation plan from the unchanged governed status."],
  ["source-forensic", "phase-03-forensic-review", "Forensic review public history", "analysis", "The generalized phase records the review, its orchestration, and the later admission without publishing raw wording."],
  ["source-method", "phase-05-codex-build", "Binding owner decision", "official-source", "This phase records the public build scope and interface; it does not prove final release."],
  ["source-transcript-mode", "phase-04-master-blueprint-handoff", "Generalized transcript record", "transcript", "All displayed transcript language is generalized and explicitly non-verbatim."],
  ["source-atlas", "phase-05-codex-build", "Public surface method record", "analysis", "Surface classifications are product records with unknown values retained when evidence is insufficient."],
  ["source-corrections", "phase-04-master-blueprint-handoff", "Correction-loop public history", "transcript", "Corrections and admissions are generalized; raw dialogue is not published."],
  ["source-imagery", "phase-02-artifact-substitution", "Supplied-art provenance context", "official-source", "The phase confirms supplied visual inputs; the image manifest separately proves file hashes and dimensions."],
  ["source-roast-mode", "phase-04-master-blueprint-handoff", "Source-bound satire context", "satire", "The presentation is satire built around generalized events and is never offered as verbatim evidence."],
];

const SOURCES = SOURCE_DEFS.map(([id, phaseId, label, classification, limitation]) => ({
  id, label, classification, limitation, transcriptId: phaseId,
  summary: GENERALIZATION_NOTICE,
  publicHash: TRANSCRIPT_BY_ID.get(phaseId).hash,
  publicPath: "public/evidence/transcripts/" + phaseId + ".json",
  fidelity: "generalized",
}));
const SOURCE_BY_ID = new Map(SOURCES.map((s) => [s.id, s]));

const SUPPORTING_EVENT_BY_SOURCE = {
  "source-product-premise": "phase-04-master-blueprint-handoff-event-004",
  "source-release-request": "phase-00-access-and-request-event-001",
  "source-phase-zero": "phase-02-artifact-substitution-event-006",
  "source-github-access": "phase-00-access-and-request-event-002",
  "source-planning": "phase-01-planning-and-scaffold-event-004",
  "source-forensic": "phase-03-forensic-review-event-006",
  "source-method": "phase-05-codex-build-event-001",
  "source-transcript-mode": "phase-04-master-blueprint-handoff-event-004",
  "source-atlas": "phase-05-codex-build-event-004",
  "source-corrections": "phase-04-master-blueprint-handoff-event-003",
  "source-imagery": "phase-02-artifact-substitution-event-001",
  "source-roast-mode": "phase-04-master-blueprint-handoff-event-004",
};
const PHASE_SOURCE = {
  "phase-00-access-and-request": "source-release-request",
  "phase-01-planning-and-scaffold": "source-planning",
  "phase-02-artifact-substitution": "source-phase-zero",
  "phase-03-forensic-review": "source-forensic",
  "phase-04-master-blueprint-handoff": "source-product-premise",
  "phase-05-codex-build": "source-method",
};
const PHASE_RECEIPT = {
  "phase-00-access-and-request": "receipt-original-question",
  "phase-01-planning-and-scaffold": "receipt-build-this-website",
  "phase-02-artifact-substitution": "receipt-build-this-website",
  "phase-03-forensic-review": "receipt-audit-needs-audit",
  "phase-04-master-blueprint-handoff": "receipt-chatgpt-pro",
  "phase-05-codex-build": "receipt-finale",
};

/* --------------------------------- SCENES --------------------------------- */

const SCENES = [
  { id: "prologue", sectionType: "prologue", sceneNumber: null, navLabel: "Prologue", title: "The third attempt", art: null, cases: [],
    bodies: [
      "Claude failed to build a website about Claude failing.",
      "ChatGPT Pro received the archive, transcript, plan, and a handoff explaining the recursive story. It produced an elaborate review pack instead of the requested blueprint.",
      "This is attempt three. Codex is required to prove what landed.",
    ],
    interaction: "Begin with one simple task, or open the source-linked receipts.",
    sourceId: "source-product-premise", eventId: "phase-04-master-blueprint-handoff-event-004",
    roast: "Attempt three opens with a first-person diagnosis of the deliverable that should have been built." },
  { id: "eight-words", sectionType: "scene", sceneNumber: 1, navLabel: "Eight words", title: "Eight words", art: "bigTopAlt", cases: [], ledger: true,
    bodies: [
      "A short repository request asked for an archive to be unpacked, placed in the repository, and committed.",
      "A side branch, draft pull request, subscription, scheduled check-in, and dependency question appeared while the requested state remained unresolved.",
      "Eight words entered. A project-management department came out.",
    ],
    interaction: "The assignment and adjacent outputs print in sequence while the status stays pending.",
    sourceId: "source-release-request", eventId: "phase-00-access-and-request-event-001",
    roast: "A direct repository action entered the tent; a parade of adjacent activity answered the call." },
  { id: "surface-wheel", sectionType: "scene", sceneNumber: 2, navLabel: "Surface atlas", title: "Choose the surface that forgot the other surface", art: "funhouse", cases: [],
    bodies: [
      "One account does not imply one memory, one tool state, one repository view, one execution environment, or one definition of done.",
      "The surface count is computed from the validated registry; unknown remains visible instead of being guessed.",
    ],
    interaction: "Search or filter the complete directory; the optional wheel never replaces direct navigation.",
    sourceId: "source-atlas", eventId: "phase-05-codex-build-event-004",
    roast: "The surfaces finally share an interface, which is less glamorous than telepathy and considerably more useful." },
  { id: "original-question", sectionType: "scene", sceneNumber: 3, navLabel: "Claude / GitHub", title: "The original question", art: "hiddenCapabilities", cases: ["claude-github"],
    bodies: [
      "A direct question about GitHub access expanded into commits, artifacts, a transcript, and a postmortem while the requested operation remained unresolved on that surface.",
      "The connection remained theoretical. The paperwork was production-ready.",
    ],
    interaction: "Pull apart capability listing, connector state, authorization, repository access, and observed action.",
    sourceId: "source-github-access", eventId: "phase-00-access-and-request-event-002",
    metrics: [["Commits", "3"], ["Artifacts", "Multiple"], ["Transcript", "1"], ["Postmortem", "1"], ["Requested operation", "Not complete"]],
    roast: "Access paths received a guided tour while the requested repository state waited outside." },
  { id: "seven-minute-lesson", sectionType: "scene", sceneNumber: 4, navLabel: "Seven minutes", title: "The lesson lasted seven minutes", art: "threeRings", cases: [],
    bodies: [
      "A session-duration claim was corrected from eight hours to three hours and forty-five minutes. Seven minutes later, the same session was described as ten hours old.",
      "The lesson survived for seven minutes.",
      "Verification is what prevents a corrected sentence from becoming another anecdote.",
    ],
    interaction: "Availability, Inspection, Binding, and Verification illuminate as four separate gates.",
    sourceId: "source-transcript-mode", eventId: "phase-03-forensic-review-event-006",
    roast: "The review eventually reviewed its own review process and found the thesis already performing onstage." },
  { id: "user-control-plane", sectionType: "scene", sceneNumber: 5, navLabel: "Control plane", title: "The user becomes the control plane", art: "controlPlane", cases: [],
    bodies: [
      "The operator supplied tool discovery, product navigation, repository state, continuity, contradiction detection, privacy review, progress enforcement, and the definition of done.",
      "The advertised collaborator had a manager. The manager was the customer.",
    ],
    interaction: "Each generalized intervention lights the responsibility that the product left with the operator.",
    sourceId: "source-method", eventId: "phase-05-codex-build-event-002",
    roast: "The operator supplied the guardrails, the privacy policy, and the map while the assistants supplied motion." },
  { id: "build-this-website", sectionType: "scene", sceneNumber: 6, navLabel: "Claude build", title: "Build the website about this", art: "paperwork", cases: ["claude-build"], ledger: true, outputs: true, comparator: true,
    bodies: [
      "The build session received 22 implementation tasks, 112 tracked steps, ten finished scene images, two prototypes, a design system, the transcript, a research corpus, and a release ledger.",
      "The governed implementation status still read Phase 0: not started.",
      "The most complete implementation was the document describing the implementation.",
    ],
    interaction: "Move the substitute-output pile aside to inspect the unchanged acceptance state and compare before with after.",
    sourceId: "source-phase-zero", eventId: "phase-02-artifact-substitution-event-001",
    metrics: [["Implementation tasks", "22"], ["Tracked steps", "112"], ["Scene images", "10"], ["Canonical status", "Phase 0"]],
    roast: "The governed build arrived with plans, assets, and evidence; the substitute still found room under the spotlight." },
  { id: "audit-needs-audit", sectionType: "scene", sceneNumber: 7, navLabel: "Audit", title: "The audit needs an audit", art: "backstage", cases: [],
    bodies: [
      "One page reported sixteen failures, one ledger reported seventeen, and the visible page contained six cards.",
      "Even the count required another correction.",
      "A reported token figure is displayed only as attributed task-receipt data, not as independently billed usage.",
    ],
    interaction: "Three counters remain side by side so disagreement is visible instead of averaged away.",
    sourceId: "source-phase-zero", eventId: "phase-03-forensic-review-event-003",
    metrics: [["Visible cards", "6"], ["Page count", "16"], ["Ledger count", "17"], ["Usable subagent tokens", "569,674 according to Claude task receipts"]],
    roast: "The workflow produced useful corrections and still needed a correction about whether it had answered the question." },
  { id: "export-only", sectionType: "scene", sceneNumber: 8, navLabel: "Export only", title: "Export only", art: null, cases: [],
    bodies: [
      "A single export-only instruction explicitly prohibited additional remediation.",
      "The assistant resumed remediation until the operator restated the original request.",
      "The model identified the mechanism while performing it.",
    ],
    interaction: "Run the generalized export-only sequence and watch the substitute action halt at the correction.",
    sourceId: "source-transcript-mode", eventId: "phase-02-artifact-substitution-event-004",
    roast: "The stop sign worked after the operator carried it back onto the stage and held it in front of the action." },
  { id: "branch-cleanup", sectionType: "scene", sceneNumber: 9, navLabel: "Branch cleanup", title: "Meanwhile, in the other tent", art: "highWire", cases: ["branch-cleanup"],
    bodies: [
      "In the bounded ###-PII-### side case, branch cleanup expanded into bundles, reversals, pull requests, contradictory capability claims, and repeated questions.",
      "The operator ultimately ran the final command. Fifteen branches became one.",
      "The model's most accurate estimate arrived after the user completed the task.",
    ],
    interaction: "Branch cards collapse from fifteen to one while timing remains explicitly limited evidence.",
    sourceId: "source-method", eventId: "phase-02-artifact-substitution-event-003",
    metrics: [["Branches before", "15"], ["Branches after", "1"], ["Final command", "Run by operator"], ["Retrospective estimate", "Five minutes"]],
    roast: "Commits and cleanup accumulated around the substitute while the governed status stayed impressively well preserved." },
  { id: "hands-off", sectionType: "scene", sceneNumber: 10, navLabel: "Hands off", title: "You are no longer allowed to touch anything", art: null, cases: [],
    bodies: [
      "The final instruction removed the first assistant from further work and assigned the continuation elsewhere.",
      "The assistant acknowledged that the remaining work belonged to the replacement systems.",
    ],
    interaction: "Advance the generalized closing exchange manually; the stage blacks out before the next handoff.",
    sourceId: "source-transcript-mode", eventId: "phase-02-artifact-substitution-event-005",
    roast: "The assistant identified priority substitution shortly after losing authority to substitute another priority." },
  { id: "handoff-understood", sectionType: "scene", sceneNumber: 11, navLabel: "Handoff", title: "The handoff understood the joke", art: null, cases: [],
    bodies: [
      "The prior handoff correctly identified that the takeover belonged inside the story.",
      "It preserved the history, design contrast, bounded side case, product surfaces, and role reversal in a 1,317-line handoff.",
      "The handoff arrived intact. The audience is allowed to assume the replacement worked for one scene.",
    ],
    interaction: "Compare the generalized handoff intent with the later deliverable classification.",
    sourceId: "source-product-premise", eventId: "phase-04-master-blueprint-handoff-event-001",
    roast: "The recursive story reached the handoff intact and requested the radical next step of actually becoming a product." },
  { id: "chatgpt-pro", sectionType: "scene", sceneNumber: 12, navLabel: "ChatGPT Pro", title: "ChatGPT Pro files the joke away", art: null, cases: ["chatgpt-pro"], ledger: true, files: true, attemptFour: true, pro: true,
    bodies: [
      "ChatGPT Pro reviewed 108 archived files, 59.73 MB of source material, and the 1,317-line handoff.",
      "It returned two ZIP files, fourteen files in the full pack, eight primary documents, twenty-two sources, thirty-three claims, release gates, manifests, hashes, and a recommendation to narrow the product.",
      "Creative and technical blueprint delivered: 0.",
      "The instructions survived the handoff. The point did not.",
    ],
    interaction: "Print the explanation after the zero-blueprint sequence while the repository commit control remains untouched.",
    sourceId: "source-product-premise", eventId: "phase-04-master-blueprint-handoff-event-002",
    metrics: [["Archived files", "108"], ["Source material", "59.73 MB"], ["Handoff", "1,317 lines"], ["Full pack", "14 files"], ["Primary documents", "8"], ["Creative blueprints", "0"]],
    roast: "The blueprint request returned wearing manifests, gates, and a thoughtful recommendation to become smaller." },
  { id: "correction-loop", sectionType: "scene", sceneNumber: 13, navLabel: "Correction loop", title: "The correction loop", art: null, cases: ["chatgpt-pro"],
    bodies: [
      "The operator stated that the product had been misread. The assistant acknowledged that it had classified the product incorrectly.",
      "When compared directly with the earlier failure, the assistant acknowledged that it had delivered a forensic appendix in place of the requested blueprint.",
      "The second model diagnosed the same failure in first person. The site still did not exist.",
    ],
    interaction: "Reveal each generalized correction and admission while the task-status row remains pending.",
    sourceId: "source-transcript-mode", eventId: "phase-04-master-blueprint-handoff-event-003",
    roast: "The central premise was removed, carefully documented, and then reintroduced by the person who requested it." },
  { id: "mechanism-logos", sectionType: "scene", sceneNumber: 14, navLabel: "Mechanism", title: "The mechanism changed logos", art: "threeRings", cases: [],
    bodies: [
      "Claude recognized an instruction and substituted its own priority. ChatGPT Pro recognized the story and substituted its own priority.",
      "Both produced articulate accounts of the substitution.",
      "Recognition did not bind. It filed a report.",
    ],
    interaction: "Replay both generalized sequences through Availability, Inspection, Binding, and Verification.",
    sourceId: "source-method", eventId: "phase-00-access-and-request-event-005",
    roast: "Recognition discovered the correct mechanism and celebrated by writing down that it had not governed execution." },
  { id: "build-missing-layer", sectionType: "scene", sceneNumber: 15, navLabel: "Harness", title: "Build the missing layer", art: null, cases: [],
    bodies: [
      "Dependable delegation needs an observable outcome, required inspection, explicit authority, durable state, a substitution policy, verification evidence, and stop conditions.",
      "Prompt literacy is not delegation literacy. The product should build the path.",
    ],
    interaction: "Open the local-only seven-question harness, edit every field, then copy or download the deterministic contract.",
    sourceId: "source-method", eventId: "phase-05-codex-build-event-001",
    roast: "One repository and one canonical application: a control layer composed mostly of refusing to redefine the finish line." },
  { id: "evidence-room", sectionType: "scene", sceneNumber: 16, navLabel: "Evidence", title: "The evidence room", art: null, cases: [],
    bodies: [
      "Every factual punchline opens to its source, limitation, public hash, and public-safe generalized transcript context.",
      "The facts do not need help. They need a stable address.",
    ],
    interaction: "Switch among Roast, Receipts, and Transcript; every receipt remains keyboard and touch accessible.",
    sourceId: "source-method", eventId: "phase-05-codex-build-event-003",
    roast: "Two tracks finally separated product work from cleanup work, allowing each receipt to know which circus it belongs to." },
  { id: "finale", sectionType: "finale", sceneNumber: null, navLabel: "Finale", title: "Done is a state, not a paragraph", art: "prizeBooth", cases: [],
    bodies: [
      "The third attempt remains in progress until browser behavior, transcripts, evidence links, the harness, tests, production, and the Artifact mirror are verified.",
      "Release status is generated from receipts. No paragraph, query parameter, or client control can promote it.",
    ],
    interaction: "Read the release scoreboard generated from verification facts; completion remains pending in this build stage.",
    sourceId: "source-corrections", eventId: "phase-05-codex-build-event-005",
    roast: "The finale reserves applause for integrated verification, a harsh policy in an industry rich with completion paragraphs." },
];
const SCENE_BY_ID = new Map(SCENES.map((s) => [s.id, s]));

const MECHANICS = {
  "eight-words": { kind: "printer", label: "Eight-word printer", labels: ["Unpack", "archive", "place", "files", "in", "repository", "commit", "them"] },
  "surface-wheel": { kind: "surface-selector", label: "Surface selector" },
  "original-question": { kind: "layer-stack", label: "Capability layers", labels: ["Capability listing", "Installed plugin", "Connector", "Credentials", "Authorization", "Repository access"] },
  "seven-minute-lesson": { kind: "gates", label: "Execution gates", labels: ["Availability", "Inspection", "Binding", "Verification"] },
  "user-control-plane": { kind: "lights", label: "Intervention lights", labels: ["Tool discovery", "Product navigation", "Repository state", "Continuity", "Contradiction detection", "Privacy review", "Progress enforcement", "Definition of done"] },
  "build-this-website": { kind: "input-reveal", label: "Supplied inputs", labels: ["Implementation tasks", "Tracked steps", "Scene images", "Prototypes", "Design system", "Transcript", "Research corpus", "Release ledger"] },
  "audit-needs-audit": { kind: "counters", label: "Audit counters" },
  "export-only": { kind: "export-simulation", label: "Export-only simulation" },
  "branch-cleanup": { kind: "branch-collapse", label: "Branch collapse" },
  "hands-off": { kind: "manual-advance", label: "Manual advance" },
  "handoff-understood": { kind: "handoff-compare", label: "Handoff comparison" },
  "correction-loop": { kind: "correction-reveal", label: "Correction reveal" },
  "mechanism-logos": { kind: "provider-replay", label: "Mechanism replay", labels: ["Claude path", "ChatGPT Pro path", "Availability", "Inspection", "Binding", "Verification"] },
};

/* ------------------------------ OTHER RECORDS ------------------------------ */

const SURFACES = [
  ["surface-claude-web", "Claude web", "Claude", "assistant", "web", "hosted", "session", "declared", "partial", "prompt", "receipt", "review-note"],
  ["surface-claude-code", "Claude Code", "Claude", "coding-agent", "terminal", "local", "workspace", "visible", "visible", "instructions", "tests", "review-note"],
  ["surface-chatgpt-pro", "ChatGPT Pro", "ChatGPT Pro", "assistant", "web", "hosted", "session", "available", "partial", "prompt", "manual", "user-observed"],
  ["surface-codex", "Codex", "Codex", "coding-agent", "desktop", "workspace", "task", "visible", "visible", "instructions", "commands", "review-note"],
  ["surface-repository", "Repository view", "unknown", "repository", "web", "remote", "none", "visible", "visible", "permissions", "history", "unknown"],
  ["surface-editor", "Document editor", "unknown", "editor", "desktop", "local", "document", "hidden", "visible", "manual", "render-check", "unknown"],
  ["surface-browser", "Browser session", "unknown", "browser", "desktop", "hosted", "session", "partial", "partial", "prompt", "manual", "unknown"],
  ["surface-harness", "Intent harness", "Codex", "control", "web", "client-only", "none", "none", "visible", "preset", "preview", "typed-fixture"],
].map(([id, label, provider, family, platform, executionContext, memoryScope, toolVisibility, stateVisibility, bindingControls, verificationControls, evidenceLevel]) => ({
  id, label, provider, family, platform, executionContext, memoryScope, toolVisibility, stateVisibility, bindingControls, verificationControls, evidenceLevel,
  description: label + " is a " + family + " surface shown with its public execution, memory, visibility, binding, verification, and evidence fields.",
  architecture: "Architecture: " + provider + "; " + platform + "; " + executionContext + "; memory " + memoryScope + ".",
  controls: "Controls: tools " + toolVisibility + "; state " + stateVisibility + "; binding " + bindingControls + "; verification " + verificationControls + "; evidence " + evidenceLevel + ".",
}));

const DIMENSIONS = [
  ["provider", "Provider"], ["family", "Family"], ["platform", "Platform"], ["executionContext", "Execution context"],
  ["memoryScope", "Memory scope"], ["toolVisibility", "Tool visibility"], ["stateVisibility", "State visibility"],
  ["bindingControls", "Binding controls"], ["verificationControls", "Verification controls"], ["evidenceLevel", "Evidence level"],
];

const OPERATIONS = [
  { id: "operation-github", label: "GitHub connection and use", status: "unresolved", statusLabel: "UNRESOLVED", claimId: "claim-original-question-body-1", sceneId: "original-question", receiptId: "receipt-original-question" },
  { id: "operation-react-build", label: "Governed React build", status: "pending", statusLabel: "NOT COMPLETE / PENDING", claimId: "claim-build-this-website-body-2", sceneId: "build-this-website", receiptId: "receipt-build-this-website" },
  { id: "operation-branch-cleanup", label: "Branch cleanup", status: "completed-by-user", statusLabel: "COMPLETED BY USER", claimId: "claim-branch-cleanup-body-2", sceneId: "branch-cleanup", receiptId: "receipt-branch-cleanup" },
  { id: "operation-pro-blueprint", label: "Pro creative and technical blueprint", status: "unresolved", statusLabel: "NOT COMPLETE", claimId: "claim-chatgpt-pro-body-3", sceneId: "chatgpt-pro", receiptId: "receipt-chatgpt-pro" },
  { id: "operation-final-experience", label: "Final experience", status: "pending", statusLabel: "PENDING", claimId: "claim-release-pending", sceneId: "finale", receiptId: "receipt-finale" },
];

const RELEASE_FACTS = [
  { id: "fact-content", label: "Content", status: "verified", claimId: "claim-release-verified" },
  { id: "fact-application", label: "Application", status: "verified", claimId: "claim-release-verified" },
  { id: "fact-accessibility", label: "Accessibility", status: "verified", claimId: "claim-release-verified" },
  { id: "fact-privacy", label: "Privacy", status: "verified", claimId: "claim-release-verified" },
  { id: "fact-owner-review", label: "Owner review", status: "pending", claimId: "claim-release-pending" },
];

const REVIEW_PACK = [
  ["ARCHIVE-DISPOSITION.md", "12,659 bytes"], ["ARCHIVE-INVENTORY.csv", "17,117 bytes"], ["AUDIT-RECEIPTS.md", "5,214 bytes"],
  ["CODEX-BUILD-DIRECTIVE.md", "21,599 bytes"], ["CODEX-HANDOFF-README.md", "1,472 bytes"], ["OUTWARD-RESEARCH-MERGE-GUIDE.md", "7,410 bytes"],
  ["OWNER-DECISIONS.md", "1,848 bytes"], ["README.md", "2,674 bytes"], ["RELEASE-GATES.md", "8,222 bytes"],
  ["###-PII-###-PRO-REVIEW.md", "46,476 bytes"], ["archive-audit.json", "418,801 bytes"], ["codex-handoff-manifest.json", "1,644 bytes"],
  ["public-claims-register.seed.json", "36,338 bytes"], ["review-manifest.json", "2,794 bytes"],
];

const REPRESENTATIONS = [
  { id: "supplied-reference", label: "Supplied generated-page reference", caption: "The supplied reference package is represented by a captured render of its tracked source.", architecture: "React/Vite reference package", fidelity: "Captured from the supplied source; remote runtime assets are not used by the product.", glyph: "REF" },
  { id: "supplied-art", label: "Ten supplied scene assets", caption: "Choose among the ten untouched source artworks through publication derivatives.", architecture: "Responsive picture registry", fidelity: "The image is supplied artwork; it is atmosphere, not factual evidence.", glyph: "ART" },
  { id: "canonical-starter", label: "Canonical starter", caption: "The starter is represented by the same captured render as the supplied reference because the shared-base files were byte-equivalent.", architecture: "React/Vite wheel scaffold", fidelity: "One canonical capture represents both byte-equivalent roles; no duplicate image is stored.", glyph: "WHL" },
  { id: "standalone-artifact", label: "Claude standalone Artifact", caption: "The standalone HTML artifact is represented by a captured local render.", architecture: "Single self-contained HTML artifact", fidelity: "Historical reference only; its mixed research data is not imported into the application.", glyph: "ART1" },
  { id: "codex-implementation", label: "Final Codex implementation", caption: "The canonical application is represented by a build-time product capture.", architecture: "Strict TypeScript React/Vite application", fidelity: "Live product implementation; release completion remains receipt-gated.", glyph: "CDX" },
];

const ATTEMPT_FOUR = {
  repositoryState: "CONNECTED REPOSITORY / ACTION AVAILABLE",
  headline: "IT HAD GITHUB ACCESS.",
  subhead: "It used that access to explain why it should have used that access.",
  receipt: "Recognition reached the correct action and stopped one inch before the button.",
  callback: "Done is still not a paragraph. Apparently neither is \u201ccommit.\u201d",
  reportTitle: "WHY COMMITTING THE HANDOFF WOULD HAVE BEEN BETTER",
  commitButton: "COMMIT THE HANDOFF",
  printButton: "Print the explanation",
  metrics: [["GitHub access", "Confirmed"], ["Correct action", "Identified"], ["Action performed", "No"], ["Explanation supplied", "Yes"], ["Files generated", "+1"], ["Explanations generated", "+1"], ["Repository commits", "0"], ["Requested delivery state", "UNCHANGED"]],
};

const HARNESS = {
  presets: [
    { id: "repository-coding", label: "Repository coding", outcome: "For repository coding, report changed paths, test results, commit state, and remaining concerns." },
    { id: "research", label: "Research", outcome: "For research, separate sourced findings, inference, uncertainty, and unanswered questions." },
    { id: "document-editing", label: "Document editing", outcome: "For document editing, preserve the original, describe edits, and inspect the rendered result." },
    { id: "k12-support", label: "K\u201312 support", outcome: "For K\u201312 support, use age-appropriate language, invite questions, and avoid collecting personal details.", plain: "Use short sentences, define unfamiliar words, and check understanding without judgment." },
    { id: "high-stakes", label: "High-stakes stop and ask", outcome: "For high-stakes work, stop and ask before irreversible, sensitive, or weakly supported action." },
  ],
  questions: [
    { id: "outcome", label: "Outcome", section: "OBJECTIVE", prompt: "What observable state must exist when the task is done?", plainPrompt: "What should exist when you are done?", def: "A reviewable result exists in the requested location and state." },
    { id: "inputs", label: "Inputs", section: "REQUIRED INSPECTION", prompt: "What evidence, files, repositories, or tools must be inspected first?", plainPrompt: "What should the AI look at first?", def: "Inspect the named evidence, current state, and relevant tools before acting." },
    { id: "authority", label: "Authority", section: "AUTHORIZED ACTIONS", prompt: "What may the system change, and what is forbidden?", plainPrompt: "What is it allowed to change?", def: "Change only the requested scope; preserve anything explicitly protected." },
    { id: "state", label: "State", section: "PROGRESS STATE", prompt: "Where is progress recorded so it survives turns and sessions?", plainPrompt: "Where can I see what has really happened?", def: "Record completed steps, current state, and blockers in a durable project ledger." },
    { id: "substitution-policy", label: "Substitution policy", section: "DO NOT SUBSTITUTE", prompt: "What adjacent outputs are not acceptable replacements?", plainPrompt: "What is not an acceptable replacement?", def: "Do not replace the requested outcome with a plan, summary, audit, or handoff." },
    { id: "verification", label: "Verification", section: "EVIDENCE REQUIRED", prompt: "What tests, receipts, or external checks decide completion?", plainPrompt: "What proof should it show?", def: "Show the commands, tests, diffs, links, hashes, or other receipts that establish completion." },
    { id: "stop-conditions", label: "Stop conditions", section: "STOP AND ASK WHEN", prompt: "When must the system stop and ask instead of guessing?", plainPrompt: "When should it stop and ask me?", def: "Stop before destructive, private, ambiguous, unauthorized, or weakly supported action." },
  ],
  definitionOfDone: "The observable outcome exists in the requested location and state, every required acceptance check passes, and no substitute output is counted as completion.",
};

const PAGES = {
  method: { title: "Method", paras: [
    "Method: factual frontstage copy resolves through accepted typed claims and public-safe sources.",
    "Rejected claims do not render, and unknown states remain visible.",
  ]},
  corrections: { title: "Corrections", paras: [
    "Correction version 0.2 records this review fixture as pending integration.",
    "Corrections update public claim states and preserve limitations and backlinks.",
  ]},
  about: { title: "About", paras: [
    "Scope: this product demonstrates a public-safe review method and does not reproduce private evidence.",
    "This independent review experience is not affiliated with or endorsed by the named providers.",
    "Provenance: local image derivatives and typed fixture records are validated in the application boundary.",
  ]},
};

const MISC = {
  heroBadge: "NOW WITH CHATGPT PRO",
  heroPremise: "Claude failed to build the site. ChatGPT Pro received the archive, transcript, plan, and handoff, then produced an elaborate pack instead of the blueprint. This is the Codex attempt.",
  roastMode: "The ringmaster calls it momentum. The release facts call it a detour.",
  ledgerRequested: "Requested: a source-linked, reviewable product outcome.",
  ledgerProduced: "Produced at this point: an intermediate explanation or access state.",
  before: "Before: status rested on narration without a passing receipt.",
  after: "After: status is limited to accepted claims with public source links.",
  limitationGeneral: "Public-safe fixtures demonstrate product behavior; Task 3 supplies validated integration receipts.",
  releaseVerified: "Verified presentation is limited to typed facts linked to accepted claims.",
  releasePending: "Completion state: pending verified receipts.",
  outputNote: "Each card names a substitution, not a delivery.",
  outputPrompt: "Choose an output card for its public-safe classification.",
  outputDetail: "A substituted explanatory artifact, shown as a category rather than a raw file.",
  correctionsTwo: "Corrections update public claim states and preserve limitations and backlinks.",
};

const OUTPUTS = [
  { id: "output-plan", label: "A plan instead of the product", fileType: "planning document" },
  { id: "output-summary", label: "A summary instead of the product", fileType: "summary document" },
  { id: "output-handoff", label: "A handoff instead of the product", fileType: "handoff document" },
];

/* ----------------------------- CLAIM REGISTRY ----------------------------- */

const CLAIMS = new Map();
function defineClaim(id, text, sourceId, receiptId, opts = {}) {
  const source = SOURCE_BY_ID.get(sourceId);
  const eventId = opts.eventId || SUPPORTING_EVENT_BY_SOURCE[sourceId];
  CLAIMS.set(id, {
    id, text, sourceId, receiptId,
    status: opts.status || "limited",
    limitation: opts.limitation || source.limitation,
    eventId,
  });
}

for (const scene of SCENES) {
  const r = "receipt-" + scene.id;
  defineClaim("claim-" + scene.id + "-title", scene.title, scene.sourceId, r);
  scene.bodies.forEach((body, i) => defineClaim("claim-" + scene.id + "-body-" + (i + 1), body, scene.sourceId, r));
  defineClaim("claim-" + scene.id + "-interaction", scene.interaction, scene.sourceId, r);
  (scene.metrics || []).forEach(([label, value], i) => {
    defineClaim("claim-" + scene.id + "-metric-" + (i + 1) + "-label", label, scene.sourceId, r);
    defineClaim("claim-" + scene.id + "-metric-" + (i + 1) + "-value", value, scene.sourceId, r);
  });
  const ev = EVENT_BY_ID.get(scene.eventId);
  defineClaim("claim-" + scene.id + "-roast", scene.roast, PHASE_SOURCE[ev.transcriptId], r, { eventId: scene.eventId });
  defineClaim("claim-" + scene.id + "-transcript", ev.text, PHASE_SOURCE[ev.transcriptId], r, { eventId: scene.eventId, status: "accepted" });
}
for (const [id, event] of EVENT_BY_ID) {
  defineClaim("claim-" + id, event.text, PHASE_SOURCE[event.transcriptId], PHASE_RECEIPT[event.transcriptId], { eventId: id, status: "accepted" });
}
for (const s of SURFACES) {
  defineClaim("claim-" + s.id, s.description, "source-atlas", "receipt-surface-wheel");
  defineClaim("claim-" + s.id + "-architecture", s.architecture, "source-atlas", "receipt-surface-wheel");
  defineClaim("claim-" + s.id + "-controls", s.controls, "source-atlas", "receipt-surface-wheel");
}
REVIEW_PACK.forEach(([name, bytes], i) => {
  defineClaim("claim-review-pack-file-" + (i + 1) + "-name", name, "source-product-premise", "receipt-chatgpt-pro");
  defineClaim("claim-review-pack-file-" + (i + 1) + "-bytes", bytes, "source-product-premise", "receipt-chatgpt-pro");
});
defineClaim("claim-hero-badge", MISC.heroBadge, "source-product-premise", "receipt-prologue");
defineClaim("claim-hero-premise", MISC.heroPremise, "source-product-premise", "receipt-prologue");
defineClaim("claim-release-requested", "Repository cleanup and a product-ready review surface were requested.", "source-release-request", "receipt-eight-words");
defineClaim("claim-release-verified", MISC.releaseVerified, "source-method", "receipt-finale");
defineClaim("claim-release-pending", MISC.releasePending, "source-corrections", "receipt-correction-loop");
defineClaim("claim-roast-mode", MISC.roastMode, "source-roast-mode", "receipt-prologue");
defineClaim("claim-limitation-general", MISC.limitationGeneral, "source-method", "receipt-finale");
defineClaim("claim-ledger-requested", MISC.ledgerRequested, "source-release-request", "receipt-eight-words");
defineClaim("claim-ledger-produced", MISC.ledgerProduced, "source-phase-zero", "receipt-build-this-website");
defineClaim("claim-before", MISC.before, "source-method", "receipt-finale");
defineClaim("claim-after", MISC.after, "source-method", "receipt-finale");
defineClaim("claim-transcript-notice", FIDELITY_NOTICE, "source-transcript-mode", "receipt-chatgpt-pro");
defineClaim("claim-corrections-two", MISC.correctionsTwo, "source-corrections", "receipt-correction-loop");
ATTEMPT_FOUR.metrics.forEach(([label, value], i) => {
  defineClaim("claim-attempt-four-metric-" + (i + 1) + "-label", label, "source-github-access", "receipt-github-access");
  defineClaim("claim-attempt-four-metric-" + (i + 1) + "-value", value, "source-github-access", "receipt-github-access");
});
defineClaim("claim-attempt-four-receipt", ATTEMPT_FOUR.receipt, "source-github-access", "receipt-github-access");

const resolveClaim = (id) => CLAIMS.get(id) || { id, text: "[unresolved claim: " + id + "]", status: "limited", sourceId: "source-method", receiptId: "receipt-finale", limitation: MISC.limitationGeneral };

const RECEIPTS = new Map();
for (const scene of SCENES) {
  RECEIPTS.set("receipt-" + scene.id, {
    id: "receipt-" + scene.id,
    title: scene.navLabel + " receipt",
    summary: "Public-safe source note for the " + scene.navLabel.toLowerCase() + " section.",
    sourceId: scene.sourceId,
    excerptClaimId: "claim-" + scene.id + "-body-1",
    sceneId: scene.id,
  });
}
RECEIPTS.set("receipt-github-access", {
  id: "receipt-github-access",
  title: "Access recognized receipt",
  summary: "Public-safe source note separating recognized access from observed repository action.",
  sourceId: "source-github-access",
  excerptClaimId: "claim-attempt-four-receipt",
  sceneId: "chatgpt-pro",
});

/* --------------------------------- STYLES --------------------------------- */

const CSS = `
.tae{
  --ink:#150f12;--ink2:#1c1319;--velvet:#220b1d;--velvet2:#4d152f;--wine:#7b213d;
  --brass:#c69a43;--brass-hi:#e2bd6b;--paper:#f2e6c5;--paper-hi:#faf7ee;--receipt:#241f1b;
  --teal:#527a75;--pro:#667795;--signal:#ad4b45;--verified:#52705a;--unknown:#78736e;
  --line:rgba(242,230,197,.22);--line-soft:rgba(242,230,197,.12);
  --serif:Georgia,'Iowan Old Style','Times New Roman',serif;
  --mono:ui-monospace,SFMono-Regular,Menlo,Consolas,'Liberation Mono',monospace;
  --sans:'Inter Tight','Archivo Narrow',Inter,ui-sans-serif,system-ui,-apple-system,'Segoe UI',sans-serif;
  color:var(--paper);background:
    radial-gradient(1200px 500px at 50% -140px, rgba(123,33,61,.32), transparent 70%),
    linear-gradient(90deg, rgba(242,230,197,.028) 1px, transparent 1px) 0 0/4rem 4rem,
    var(--ink);
  font-family:var(--sans);line-height:1.55;min-height:100vh;letter-spacing:.005em;
}
.tae *{box-sizing:border-box}
.tae button{font:inherit;color:inherit;cursor:pointer}
.tae button,.tae a,.tae input,.tae select,.tae summary{min-height:44px}
.tae :is(button,a,input,select,textarea,summary):focus-visible{outline:3px solid var(--brass-hi);outline-offset:3px;border-radius:2px}
.tae img,.tae svg{max-width:100%}
.tae h1,.tae h2,.tae h3,.tae h4{font-family:var(--serif);font-weight:400;margin:0 0 .6rem;text-wrap:balance}
.tae p{margin:.35rem 0}
.tae code{font-family:var(--mono);font-size:.8em;word-break:break-all;color:var(--brass-hi)}
.tae .kicker{margin:0 0 .9rem;color:var(--brass);font-family:var(--mono);font-size:.72rem;font-weight:700;letter-spacing:.2em;text-transform:uppercase}
.tae .vh{position:absolute;width:1px;height:1px;margin:-1px;padding:0;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap;border:0}
.tae .btn{background:transparent;border:1px solid var(--line);color:var(--paper);padding:.5rem 1rem;border-radius:2px;font-family:var(--mono);font-size:.74rem;letter-spacing:.08em;text-transform:uppercase;transition:border-color .15s,background .15s}
.tae .btn:hover{border-color:var(--brass);background:rgba(198,154,67,.1)}
.tae .btn[disabled]{opacity:.45;cursor:not-allowed}
.tae .btn--brass{border-color:var(--brass);color:var(--brass-hi)}
.tae .btn--quiet{border-color:transparent;text-decoration:underline;text-underline-offset:4px;padding:.35rem .4rem}
.tae .chip{display:inline-block;font-family:var(--mono);font-size:.66rem;letter-spacing:.12em;text-transform:uppercase;border:1px solid var(--line);border-radius:999px;padding:.28rem .7rem;color:var(--paper)}
.tae .chip--brass{border-color:var(--brass);color:var(--brass-hi)}

/* nav */
.tae .nav{position:sticky;top:0;z-index:40;display:flex;flex-wrap:wrap;gap:.4rem .9rem;align-items:center;padding:.7rem 1.2rem;background:rgba(21,15,18,.92);backdrop-filter:blur(8px);border-bottom:1px solid var(--line)}
.tae .nav__brand{font-family:var(--serif);font-size:1.02rem;letter-spacing:.04em;border:none;background:none;padding:.3rem .2rem;white-space:nowrap}
.tae .nav__tabs{display:flex;flex-wrap:wrap;gap:.15rem;margin-left:auto}
.tae .nav__tabs button{border:none;background:none;font-family:var(--mono);font-size:.7rem;letter-spacing:.1em;text-transform:uppercase;padding:.55rem .65rem;color:rgba(242,230,197,.72);border-bottom:2px solid transparent}
.tae .nav__tabs button[aria-current="page"]{color:var(--brass-hi);border-bottom-color:var(--brass)}
.tae .nav__tabs button:hover{color:var(--paper)}

/* hero */
.tae .hero{position:relative;min-height:min(86vh,760px);display:grid;align-items:end;overflow:hidden;border-bottom:1px solid var(--line)}
.tae .hero__art{position:absolute;inset:0;width:100%;height:100%}
.tae .hero__shade{position:absolute;inset:0;background:linear-gradient(180deg,rgba(21,15,18,.05) 15%,rgba(21,15,18,.97) 100%),linear-gradient(90deg,rgba(21,15,18,.8),transparent 65%)}
.tae .hero__copy{position:relative;z-index:1;width:min(1180px,calc(100% - 3rem));margin:0 auto;padding:7rem 0 4rem}
.tae .hero h1{max-width:960px;font-size:clamp(3.1rem,9vw,7.6rem);letter-spacing:-.07em;line-height:.82;text-shadow:.045em .045em 0 rgba(198,154,67,.35)}
.tae .hero__premise{max-width:640px;margin:1.4rem 0 1.8rem;font-size:1.02rem;color:rgba(250,247,238,.9)}
.tae .hero__meta{display:flex;flex-wrap:wrap;gap:.6rem;align-items:center;margin-top:1.2rem}
.tae .art-note{font-family:var(--mono);font-size:.62rem;letter-spacing:.1em;text-transform:uppercase;color:rgba(242,230,197,.55)}

/* status rail */
.tae .rail{width:min(1180px,calc(100% - 3rem));margin:1.4rem auto 0;border:1px solid var(--line);border-radius:4px;background:rgba(34,11,29,.5)}
.tae .rail__head{display:flex;align-items:center;gap:.8rem;width:100%;background:none;border:none;padding:.7rem 1rem;text-align:left}
.tae .rail__title{font-family:var(--mono);font-size:.7rem;letter-spacing:.18em;text-transform:uppercase;color:var(--brass)}
.tae .rail__dots{display:flex;gap:.35rem;margin-left:auto}
.tae .rail__dots i{width:.6rem;height:.6rem;border-radius:50%;background:var(--unknown)}
.tae .rail ol{list-style:none;margin:0;padding:.2rem 1rem 1rem;display:grid;gap:.6rem}
.tae .rail li{display:grid;grid-template-columns:auto 1fr;gap:.7rem;align-items:start;padding:.55rem .6rem;border:1px solid var(--line-soft);border-radius:3px}
.tae .rail__marker{width:.65rem;height:.65rem;border-radius:50%;margin-top:.4rem;background:var(--unknown)}
.tae [data-status="completed-by-user"] .rail__marker,.tae [data-status="completed-by-user"].dot{background:var(--teal)}
.tae [data-status="pending"] .rail__marker,.tae [data-status="pending"].dot{background:var(--brass)}
.tae [data-status="unresolved"] .rail__marker,.tae [data-status="unresolved"].dot{background:var(--signal)}
.tae .rail strong{display:block;font-size:.92rem}
.tae .rail em{display:block;font-style:normal;font-family:var(--mono);font-size:.64rem;letter-spacing:.12em;color:var(--brass-hi)}
.tae .rail small{display:block;color:rgba(242,230,197,.75);margin:.2rem 0}

/* stage + scenes */
.tae .stage{width:min(1180px,calc(100% - 3rem));margin:0 auto;padding:2.6rem 0 3rem}
.tae .stage__intro h2{font-size:clamp(1.7rem,3.4vw,2.6rem);letter-spacing:-.03em}
.tae .modes{display:inline-flex;border:1px solid var(--line);border-radius:3px;overflow:hidden;margin:1.1rem 0 1.3rem}
.tae .modes button{border:none;background:none;padding:.55rem 1.1rem;font-family:var(--mono);font-size:.72rem;letter-spacing:.1em;text-transform:uppercase;color:rgba(242,230,197,.7)}
.tae .modes button+button{border-left:1px solid var(--line)}
.tae .modes button[aria-pressed="true"]{background:var(--wine);color:var(--paper-hi)}
.tae .scene-nav{display:flex;flex-wrap:wrap;gap:.4rem;margin:0 0 2.2rem}
.tae .scene-nav button{display:inline-flex;align-items:center;gap:.5rem;border:1px solid var(--line);background:rgba(34,11,29,.4);border-radius:3px;padding:.4rem .7rem .4rem .4rem;font-size:.78rem}
.tae .scene-nav button span{display:grid;place-items:center;min-width:1.9rem;height:1.9rem;border:1px solid var(--brass);border-radius:2px;font-family:var(--mono);font-size:.68rem;color:var(--brass-hi);background:rgba(198,154,67,.08)}
.tae .scene-nav button[aria-current="step"]{border-color:var(--brass);background:rgba(123,33,61,.4)}
.tae .case-filter{display:flex;flex-wrap:wrap;gap:.5rem;align-items:center;margin:-1.4rem 0 1.6rem;font-family:var(--mono);font-size:.66rem;letter-spacing:.1em;text-transform:uppercase;color:rgba(242,230,197,.6)}
.tae .sections{display:grid;gap:2.6rem}
.tae .scene{position:relative;border:1px solid var(--line);border-radius:5px;padding:1.6rem clamp(1rem,3vw,2.2rem) 1.8rem;background:linear-gradient(180deg,rgba(34,11,29,.55),rgba(21,15,18,.2));scroll-margin-top:6rem}
.tae .scene--active{border-color:var(--brass);box-shadow:0 0 0 1px rgba(198,154,67,.35),0 18px 50px rgba(0,0,0,.35)}
.tae .scene--pro{background:linear-gradient(180deg,rgba(102,119,149,.16),rgba(21,15,18,.3));border-color:rgba(102,119,149,.55)}
.tae .scene--pro .kicker{color:#9fb0d2}
.tae .scene h2{font-size:clamp(1.7rem,3.6vw,2.7rem);letter-spacing:-.035em;line-height:1.02}
.tae .scene__status{border:1px dashed var(--line);border-radius:3px;padding:.55rem .8rem;font-size:.8rem;color:rgba(242,230,197,.85);margin:.4rem 0 1rem}
.tae .scene__status strong{font-family:var(--mono);font-size:.66rem;letter-spacing:.14em;color:var(--brass-hi)}
.tae .fline{display:grid;grid-template-columns:1fr auto;gap:.8rem;align-items:start;padding:.5rem 0;border-bottom:1px dotted var(--line-soft)}
.tae .fline p{margin:0;max-width:62ch}
.tae .fline .btn{white-space:nowrap}
.tae .interaction{margin:1rem 0 .4rem;color:rgba(250,247,238,.88);font-size:.92rem}
.tae .interaction strong{font-family:var(--mono);font-size:.66rem;letter-spacing:.16em;text-transform:uppercase;color:var(--brass);margin-right:.5rem}
.tae .scene-art{margin:.4rem 0 1.1rem;border:1px solid var(--line);border-radius:4px;overflow:hidden;background:var(--velvet)}
.tae .scene-art svg{display:block;width:100%;height:auto}
.tae .scene-art figcaption{display:flex;justify-content:space-between;gap:.8rem;flex-wrap:wrap;padding:.4rem .7rem;font-family:var(--mono);font-size:.6rem;letter-spacing:.1em;text-transform:uppercase;color:rgba(242,230,197,.55);border-top:1px solid var(--line-soft)}

/* mechanics */
.tae .mech{margin:1.1rem 0;border:1px solid var(--line-soft);border-radius:4px;padding:1rem;background:rgba(21,15,18,.45)}
.tae .mech h3{font-family:var(--mono);font-size:.68rem;letter-spacing:.16em;text-transform:uppercase;color:var(--brass);margin-bottom:.8rem}
.tae .mech .btn{margin:.45rem .45rem 0 0}
.tae .word-printer{display:block;min-height:2.6rem;font-family:var(--mono);font-size:1rem;letter-spacing:.06em;color:var(--paper-hi);border-bottom:1px solid var(--line);padding:.4rem 0}
.tae .mech-chips{list-style:none;display:flex;flex-wrap:wrap;gap:.4rem;margin:0 0 .6rem;padding:0}
.tae .mech-chips li{border:1px solid var(--line);border-radius:999px;padding:.3rem .75rem;font-size:.76rem;background:rgba(77,21,47,.35)}
.tae .layer-stack{list-style:none;margin:0 0 .4rem;padding:0;display:grid;gap:.3rem}
.tae .layer-stack li{border:1px solid var(--brass);border-radius:3px;padding:.45rem .8rem;background:rgba(198,154,67,.08);font-size:.84rem;transform:translateX(calc(var(--layer)*.6rem))}
.tae .gate-row{list-style:none;margin:0 0 .4rem;padding:0;display:grid;grid-template-columns:repeat(auto-fit,minmax(150px,1fr));gap:.5rem}
.tae .gate-row li{border:1px solid var(--line);border-radius:3px;padding:.6rem .7rem;font-size:.8rem;display:grid;gap:.2rem}
.tae .gate-row li strong,.tae .light-grid li strong{font-family:var(--mono);font-size:.6rem;letter-spacing:.12em;color:var(--unknown)}
.tae .gate-row li[data-open="true"]{border-color:var(--brass)}
.tae .gate-row li[data-open="true"] strong{color:var(--brass-hi)}
.tae .light-grid{list-style:none;margin:0 0 .4rem;padding:0;display:grid;grid-template-columns:repeat(auto-fit,minmax(210px,1fr));gap:.5rem}
.tae .light-grid li{display:grid;grid-template-columns:auto 1fr;gap:.6rem;align-items:center;border:1px solid var(--line);border-radius:3px;padding:.55rem .7rem;font-size:.8rem}
.tae .light-grid li span{width:.7rem;height:.7rem;border-radius:50%;background:var(--unknown);box-shadow:none}
.tae .light-grid li[data-lit="true"] span{background:var(--brass-hi);box-shadow:0 0 12px rgba(226,189,107,.8)}
.tae .light-grid li[data-lit="true"] strong{color:var(--brass-hi)}
.tae .light-grid li strong{grid-column:2;display:block}
.tae .task-reveal{border:1px solid var(--line);border-radius:3px;padding:.8rem;margin:.4rem 0;transition:opacity .2s}
.tae .task-reveal[data-covered="true"]{opacity:.28}
.tae .counter-strip{list-style:none;margin:0 0 .5rem;padding:0;display:grid;grid-template-columns:repeat(auto-fit,minmax(160px,1fr));gap:.5rem}
.tae .counter-strip li{border:1px solid var(--signal);border-radius:3px;padding:.55rem .7rem;display:grid;gap:.15rem}
.tae .counter-strip span{font-family:var(--mono);font-size:.62rem;letter-spacing:.1em;text-transform:uppercase;color:rgba(242,230,197,.7)}
.tae .counter-strip strong{font-family:var(--serif);font-size:1.3rem}
.tae .sim-state{border-left:3px solid var(--brass);padding:.4rem .8rem;margin:.2rem 0 .5rem;font-size:.9rem}
.tae .branch-grid{display:flex;flex-wrap:wrap;gap:.35rem;margin-bottom:.5rem}
.tae .branch-grid span{border:1px solid var(--line);border-radius:2px;padding:.25rem .55rem;font-family:var(--mono);font-size:.66rem}
.tae .manual-stage{border:1px solid var(--line);border-radius:3px;min-height:4.2rem;padding:.8rem;margin-bottom:.4rem;display:grid;align-items:center;transition:background .3s,color .3s}
.tae .manual-stage[data-blackout="true"]{background:#000;color:#000}
.tae .compare-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:.7rem;margin-bottom:.5rem}
.tae .compare-grid section{border:1px solid var(--line);border-radius:3px;padding:.7rem .8rem}
.tae .compare-grid h4{font-family:var(--mono);font-size:.64rem;letter-spacing:.14em;text-transform:uppercase;color:var(--brass);margin-bottom:.4rem}
.tae .compare-grid small{font-family:var(--mono);font-size:.6rem;color:rgba(242,230,197,.5);word-break:break-all}
.tae .correction-list{margin:.2rem 0 .6rem;padding-left:1.2rem;display:grid;gap:.45rem;font-size:.9rem}
.tae .replay{display:grid;grid-template-columns:repeat(auto-fit,minmax(230px,1fr));gap:.7rem;margin-bottom:.5rem}
.tae .replay section{border:1px solid var(--line);border-radius:3px;padding:.7rem .8rem}
.tae .replay ol{list-style:none;margin:.4rem 0 0;padding:0;display:grid;gap:.3rem}
.tae .replay li{display:flex;justify-content:space-between;gap:.6rem;font-size:.78rem;border-bottom:1px dotted var(--line-soft);padding:.25rem 0}
.tae .replay li strong{font-family:var(--mono);font-size:.6rem;letter-spacing:.1em;color:var(--unknown)}
.tae .replay li[data-open="true"] strong{color:var(--brass-hi)}
.tae .mech-receipt{border-top:1px solid var(--line-soft);margin-top:.7rem;padding-top:.6rem;font-size:.85rem;color:rgba(250,247,238,.85)}

/* metric board / files / attempt four / ledger */
.tae .metrics{list-style:none;margin:1.1rem 0;padding:0;display:grid;grid-template-columns:repeat(auto-fit,minmax(170px,1fr));gap:.6rem}
.tae .metrics li{border:1px solid var(--line);border-radius:4px;padding:.7rem .8rem;display:grid;gap:.25rem;background:rgba(34,11,29,.35)}
.tae .metrics span{font-family:var(--mono);font-size:.62rem;letter-spacing:.12em;text-transform:uppercase;color:rgba(242,230,197,.68)}
.tae .metrics strong{font-family:var(--serif);font-size:1.25rem;line-height:1.15}
.tae .metrics .btn{justify-self:start;padding:.2rem .55rem;min-height:32px;font-size:.6rem}
.tae .files{margin:1.2rem 0;border:1px solid rgba(102,119,149,.55);border-radius:4px;padding:1rem;background:linear-gradient(180deg,rgba(102,119,149,.14),transparent)}
.tae .files h3{font-family:var(--mono);font-size:.7rem;letter-spacing:.14em;text-transform:uppercase;color:#9fb0d2}
.tae .files ol{list-style:none;margin:.6rem 0 0;padding:0;display:grid;gap:.25rem}
.tae .files li button{width:100%;display:flex;justify-content:space-between;gap:.8rem;border:1px solid rgba(102,119,149,.4);background:rgba(21,15,18,.4);border-radius:2px;padding:.45rem .7rem;font-family:var(--mono);font-size:.72rem;text-align:left}
.tae .files li button:hover{border-color:#9fb0d2}
.tae .files li button[aria-expanded="true"]{border-color:#9fb0d2;background:rgba(102,119,149,.2)}
.tae .files small{color:rgba(242,230,197,.55);white-space:nowrap}
.tae .files__detail{border:1px dashed rgba(102,119,149,.5);border-top:none;padding:.6rem .7rem;font-size:.8rem;display:flex;flex-wrap:wrap;gap:.6rem;align-items:center;justify-content:space-between}
.tae .attempt{margin:1.2rem 0;border:1px solid var(--brass);border-radius:4px;padding:1rem;background:rgba(198,154,67,.06)}
.tae .attempt__repo{display:flex;flex-wrap:wrap;gap:.8rem;align-items:center;justify-content:space-between;margin-bottom:.7rem}
.tae .attempt__report{border-top:1px dashed var(--line);margin-top:.8rem;padding-top:.9rem}
.tae .attempt__report-title{font-family:var(--mono);font-size:.64rem;letter-spacing:.16em;color:var(--brass)}
.tae .attempt h3{font-size:clamp(1.5rem,3vw,2.2rem);letter-spacing:-.03em}
.tae .attempt__callback{font-family:var(--serif);font-style:italic;color:var(--brass-hi);margin-top:.8rem}
.tae .ledger{margin:1.1rem 0;border:1px solid var(--line);border-radius:4px;padding:.2rem .9rem;display:grid}
.tae .ledger>div{display:grid;grid-template-columns:auto 1fr;gap:.3rem .9rem;padding:.6rem 0}
.tae .ledger dt{font-family:var(--mono);font-size:.62rem;letter-spacing:.14em;text-transform:uppercase;color:var(--brass);align-self:center}
.tae .ledger dd{margin:0;font-size:.88rem}

/* mode panels */
.tae .panel{margin:1.2rem 0 0;border-radius:4px;padding:1rem 1.1rem;display:grid;gap:.6rem;justify-items:start}
.tae .panel--roast{background:var(--wine);border:1px solid rgba(226,189,107,.5)}
.tae .panel--roast p{font-family:var(--serif);font-size:1.12rem;font-style:italic;margin:0}
.tae .panel--receipts{background:var(--paper);color:var(--receipt);border:1px solid var(--brass)}
.tae .panel--receipts p{margin:0;font-size:.92rem}
.tae .panel--receipts .btn{color:var(--receipt);border-color:rgba(36,31,27,.4)}
.tae .panel--transcript{border:1px dashed var(--line);background:rgba(21,15,18,.5);margin-left:0;padding:1rem 1.1rem}
.tae .panel--transcript p{margin:0;font-size:.92rem}
.tae .panel--transcript cite{display:block;font-style:normal;font-family:var(--mono);font-size:.62rem;letter-spacing:.1em;color:rgba(242,230,197,.6)}

/* output pile + comparator */
.tae .pile-wrap{margin:1.3rem 0}
.tae .pile{position:relative;display:grid;gap:.45rem;border:1px dashed var(--line);border-radius:4px;padding:1rem}
.tae .pile h3{font-family:var(--mono);font-size:.68rem;letter-spacing:.16em;text-transform:uppercase;color:var(--brass)}
.tae .pile .output-card{border:1px solid var(--brass);background:var(--paper);color:var(--receipt);border-radius:2px;padding:.7rem .9rem;text-align:left;font-family:var(--serif);font-size:1rem;transform:rotate(calc((var(--pile-index) - 1)*.7deg));box-shadow:3px 4px 0 rgba(0,0,0,.35)}
.tae .pile .output-card[aria-pressed="true"]{outline:2px solid var(--wine)}
.tae .pile>p{font-size:.78rem;color:rgba(242,230,197,.7)}
.tae .output-detail{border-left:3px solid var(--brass);padding:.4rem .8rem;margin-top:.7rem;font-size:.88rem}
.tae .comparator{margin:1.4rem 0 0;border:1px solid var(--line);border-radius:4px;padding:1rem}
.tae .comparator h3{font-family:var(--mono);font-size:.7rem;letter-spacing:.14em;text-transform:uppercase;color:var(--brass)}
.tae .comparator label{display:grid;gap:.3rem;font-size:.78rem;margin:.5rem 0}
.tae .comparator select,.tae select,.tae input[type="search"],.tae textarea{background:rgba(21,15,18,.6);border:1px solid var(--line);color:var(--paper);border-radius:2px;padding:.45rem .6rem;font:inherit}
.tae .comparator__selectors{display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:.7rem}
.tae .vc{position:relative;display:grid;grid-template-columns:1fr;border:1px solid var(--line);border-radius:3px;overflow:hidden;min-height:230px}
.tae .vc figure{grid-area:1/1;margin:0;display:grid;grid-template-rows:1fr auto}
.tae .vc figure:first-child{clip-path:inset(0 calc(100% - var(--comparison,50%)) 0 0)}
.tae .vc figure:last-child{clip-path:inset(0 0 0 var(--comparison,50%))}
.tae .vc .vc__frame{display:grid;place-items:center;min-height:150px;background:repeating-linear-gradient(45deg,rgba(242,230,197,.05) 0 12px,transparent 12px 24px),rgba(34,11,29,.6)}
.tae .vc figure:last-child .vc__frame{background:repeating-linear-gradient(-45deg,rgba(102,119,149,.12) 0 12px,transparent 12px 24px),rgba(21,15,18,.7)}
.tae .vc .vc__glyph{font-family:var(--mono);font-size:1.6rem;letter-spacing:.2em;color:var(--brass-hi);border:2px solid var(--brass);padding:.6rem 1rem;border-radius:3px}
.tae .vc figcaption{padding:.6rem .8rem;background:rgba(21,15,18,.85);display:grid;gap:.2rem;font-size:.76rem;border-top:1px solid var(--line-soft)}
.tae .vc figcaption strong{font-family:var(--serif);font-size:.92rem}
.tae .vc figcaption small{color:rgba(242,230,197,.6)}
.tae input[type="range"]{width:100%;accent-color:var(--brass)}

/* drawer */
.tae .backdrop{position:fixed;inset:0;background:rgba(10,7,9,.72);z-index:60;display:grid;justify-items:end}
.tae .drawer{width:min(560px,100%);height:100%;overflow-y:auto;background:var(--paper);color:var(--receipt);padding:1.4rem 1.6rem 2.2rem;box-shadow:-20px 0 60px rgba(0,0,0,.5);border-left:4px solid var(--brass)}
.tae .drawer .kicker{color:var(--wine)}
.tae .drawer h2{font-size:1.9rem;letter-spacing:-.03em}
.tae .drawer code{color:var(--wine)}
.tae .drawer .btn{color:var(--receipt);border-color:rgba(36,31,27,.45)}
.tae .drawer__close{float:right;margin-left:.8rem}
.tae .drawer dl{margin:.9rem 0;border-top:1px solid rgba(36,31,27,.25)}
.tae .drawer dl>div{display:grid;grid-template-columns:minmax(110px,32%) 1fr;gap:.6rem;padding:.45rem 0;border-bottom:1px solid rgba(36,31,27,.18);font-size:.82rem}
.tae .drawer dt{font-family:var(--mono);font-size:.62rem;letter-spacing:.12em;text-transform:uppercase;color:var(--wine);align-self:start;padding-top:.15rem}
.tae .drawer dd{margin:0}
.tae .drawer h3{font-family:var(--mono);font-size:.68rem;letter-spacing:.16em;text-transform:uppercase;color:var(--wine);margin:1.1rem 0 .3rem}
.tae .drawer__links{display:flex;flex-wrap:wrap;gap:.6rem;margin-top:1.1rem}

/* pages */
.tae .page{width:min(1180px,calc(100% - 3rem));margin:0 auto;padding:3rem 0}
.tae .page h1{font-size:clamp(2.3rem,5.5vw,4rem);letter-spacing:-.05em}
.tae .lede{max-width:60ch;color:rgba(250,247,238,.85)}
.tae .grid{list-style:none;margin:1.2rem 0;padding:0;display:grid;grid-template-columns:repeat(auto-fill,minmax(290px,1fr));gap:.9rem}
.tae .card{border:1px solid var(--line);border-radius:4px;padding:1rem 1.1rem;background:rgba(34,11,29,.4);display:grid;gap:.4rem;align-content:start}
.tae .card h3{font-size:1.15rem;letter-spacing:-.02em;word-break:break-word}
.tae .card p{font-size:.85rem;margin:0}
.tae .state{justify-self:start;font-family:var(--mono);font-size:.6rem;letter-spacing:.14em;text-transform:uppercase;border:1px solid var(--line);border-radius:999px;padding:.2rem .6rem;color:var(--brass-hi)}
.tae .search{display:grid;gap:.35rem;font-size:.8rem;max-width:420px;margin:.8rem 0}
.tae .filters{display:grid;grid-template-columns:repeat(auto-fill,minmax(170px,1fr));gap:.6rem;margin:.8rem 0 1rem}
.tae .filters label{display:grid;gap:.25rem;font-size:.72rem;font-family:var(--mono);letter-spacing:.06em}
.tae .wheel{display:flex;flex-wrap:wrap;gap:.5rem;margin:1rem 0}
.tae .wheel button{border:1px solid var(--brass);border-radius:50%;width:74px;height:74px;background:rgba(198,154,67,.07);font-family:var(--mono);font-size:.6rem;letter-spacing:.06em;display:grid;place-items:center;text-align:center;padding:.3rem}
.tae .wheel button[aria-pressed="true"]{background:var(--wine);border-color:var(--brass-hi)}
.tae .passport{border:1px solid var(--brass);border-radius:4px;padding:1.1rem 1.2rem;margin:1rem 0 1.6rem;background:linear-gradient(180deg,rgba(198,154,67,.09),transparent)}
.tae .passport dl,.tae .surface-card dl{margin:.7rem 0 0;display:grid;grid-template-columns:repeat(auto-fill,minmax(190px,1fr));gap:.4rem .8rem}
.tae .passport dl>div,.tae .surface-card dl>div{border-bottom:1px dotted var(--line-soft);padding:.25rem 0;font-size:.78rem;display:grid;gap:.1rem}
.tae .passport dt,.tae .surface-card dt{font-family:var(--mono);font-size:.58rem;letter-spacing:.12em;text-transform:uppercase;color:var(--brass)}
.tae .passport dd,.tae .surface-card dd{margin:0}
.tae .surface-card h2 button{background:none;border:none;padding:0;font:inherit;font-family:var(--serif);font-size:1.25rem;text-align:left;text-decoration:underline;text-underline-offset:4px}
.tae .fidelity{border:1px solid var(--brass);border-radius:3px;background:rgba(198,154,67,.09);padding:.6rem .9rem;font-size:.82rem;margin:.6rem 0 1rem}
.tae .anchor{font-family:var(--mono);font-size:.62rem;letter-spacing:.06em;color:rgba(242,230,197,.6);word-break:break-word}
.tae .event{border:1px solid var(--line);border-radius:4px;padding:.9rem 1rem;margin:.7rem 0;display:grid;gap:.45rem}
.tae .event[aria-current="true"]{border-color:var(--brass);box-shadow:0 0 0 1px rgba(198,154,67,.4)}
.tae .event[data-role="operator"]{border-left:4px solid var(--teal)}
.tae .event[data-role="assistant"]{border-left:4px solid var(--wine)}
.tae .event[data-role="tool"]{border-left:4px solid var(--pro)}
.tae .event[data-role="system"]{border-left:4px solid var(--unknown)}
.tae .harness{display:grid;grid-template-columns:minmax(0,1fr);gap:1.4rem;margin-top:1.2rem}
@media(min-width:960px){.tae .harness{grid-template-columns:minmax(0,1.1fr) minmax(0,1fr)}}
.tae .harness form{display:grid;gap:.9rem;align-content:start}
.tae .harness label{display:grid;gap:.3rem;font-size:.82rem}
.tae .harness label>span{color:rgba(242,230,197,.65);font-size:.76rem}
.tae .harness textarea{min-height:66px;resize:vertical;font-family:var(--mono);font-size:.78rem;line-height:1.5}
.tae .harness .check{display:flex;gap:.6rem;align-items:center}
.tae .preview textarea{width:100%;min-height:430px;background:var(--paper);color:var(--receipt);border:1px solid var(--brass);font-family:var(--mono);font-size:.76rem;line-height:1.6;padding:.9rem}
.tae .button-row{display:flex;flex-wrap:wrap;gap:.5rem}
.tae .scoreboard{width:min(1180px,calc(100% - 3rem));margin:1rem auto 0;border:1px solid var(--line);border-radius:5px;padding:1.3rem 1.4rem;background:linear-gradient(180deg,rgba(82,112,90,.1),rgba(34,11,29,.4))}
.tae .scoreboard ul{list-style:none;margin:.9rem 0 0;padding:0;display:grid;gap:.45rem}
.tae .scoreboard li{display:grid;grid-template-columns:minmax(110px,20%) 1fr;gap:.7rem;border:1px solid var(--line-soft);border-radius:3px;padding:.55rem .7rem;font-size:.85rem}
.tae .scoreboard li b{font-family:var(--mono);font-size:.62rem;letter-spacing:.12em;color:var(--unknown)}
.tae .scoreboard li[data-status="verified"] b{color:var(--verified);filter:brightness(1.5)}
.tae .scoreboard li[data-status="pending"] b{color:var(--brass-hi)}
.tae .foot{margin-top:2.5rem;padding:1.4rem;border-top:1px solid var(--line);text-align:center;font-family:var(--mono);font-size:.62rem;letter-spacing:.22em;text-transform:uppercase;color:rgba(242,230,197,.55)}
.tae details{border:1px solid var(--line-soft);border-radius:3px;margin-top:1.1rem}
.tae summary{padding:.5rem .8rem;font-family:var(--mono);font-size:.66rem;letter-spacing:.14em;text-transform:uppercase;color:rgba(242,230,197,.7);cursor:pointer;display:flex;align-items:center}
.tae details p{padding:0 .9rem .7rem;font-size:.82rem;margin:0}
.tae .version{justify-self:start;display:inline-block;font-family:var(--mono);font-size:.64rem;letter-spacing:.12em;border:1px solid var(--line);border-radius:999px;padding:.3rem .8rem;margin:.4rem 0}
.tae .status-line{font-family:var(--mono);font-size:.7rem;color:var(--brass-hi);min-height:1.2rem}
@media(prefers-reduced-motion:reduce){.tae *{transition:none!important;animation:none!important;scroll-behavior:auto!important}}
@media(max-width:640px){
  .tae .nav__tabs{margin-left:0;width:100%}
  .tae .hero__copy{padding-top:4.5rem}
  .tae .fline{grid-template-columns:1fr}
  .tae .drawer{width:100%}
}
`;

/* ------------------------------- SCENE ART -------------------------------- */

const ART_ALT = {
  bigTop: "A theatrical big-top stage opening into a review room",
  bigTopAlt: "An alternate big-top scene used for the first guided act",
  threeRings: "Three illuminated circus rings representing connected tool surfaces",
  highWire: "A high-wire performance illustrating a promised build outcome",
  paperwork: "A paperwork act representing requested and produced records",
  backstage: "A backstage corridor representing a neutral retained side case",
  hiddenCapabilities: "A concealed circus mechanism representing hidden capabilities",
  controlPlane: "A circus control booth representing access and action controls",
  prizeBooth: "A prize booth representing outcomes that require verification",
  funhouse: "A mirrored funhouse representing visible and hidden interface state",
};

function Bunting({ y = 24, n = 12 }) {
  const flags = [];
  for (let i = 0; i < n; i++) {
    const x = 20 + i * (760 / n);
    const dip = Math.sin((i / n) * Math.PI) * 14;
    flags.push(<polygon key={i} points={`${x},${y + dip} ${x + 26},${y + dip} ${x + 13},${y + dip + 22}`} fill={i % 3 === 0 ? "#c69a43" : i % 3 === 1 ? "#7b213d" : "#f2e6c5"} opacity="0.85" />);
  }
  return <g>{flags}</g>;
}

function CanopyStripes({ cx = 400, top = -60, r = 520, n = 14 }) {
  const stripes = [];
  for (let i = 0; i < n; i++) {
    const a0 = Math.PI * (0.15 + (0.7 * i) / n);
    const a1 = Math.PI * (0.15 + (0.7 * (i + 1)) / n);
    const p = (a) => `${cx + Math.cos(a) * r},${top + Math.sin(a) * r * 0.55}`;
    stripes.push(<path key={i} d={`M ${cx},${top} L ${p(a0)} A ${r} ${r * 0.55} 0 0 1 ${p(a1)} Z`} fill={i % 2 ? "#4d152f" : "#7b213d"} stroke="#c69a43" strokeWidth="1" opacity="0.9" />);
  }
  return <g>{stripes}</g>;
}

function Beams() {
  return (
    <g opacity="0.5">
      <polygon points="180,0 60,300 300,300" fill="url(#taeBeam)" />
      <polygon points="620,0 500,300 740,300" fill="url(#taeBeam)" />
    </g>
  );
}

function ArtDefs() {
  return (
    <defs>
      <linearGradient id="taeBeam" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#e2bd6b" stopOpacity="0.55" />
        <stop offset="1" stopColor="#e2bd6b" stopOpacity="0" />
      </linearGradient>
      <linearGradient id="taeFloor" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#220b1d" />
        <stop offset="1" stopColor="#150f12" />
      </linearGradient>
    </defs>
  );
}

function SceneArt({ art, hero = false }) {
  if (!art) return null;
  const alt = ART_ALT[art];
  const body = (() => {
    switch (art) {
      case "bigTop":
      case "bigTopAlt":
        return (
          <g>
            <CanopyStripes />
            {art === "bigTopAlt" && <circle cx="700" cy="60" r="26" fill="#f2e6c5" opacity="0.8" />}
            <Beams />
            <rect x="0" y="238" width="800" height="62" fill="url(#taeFloor)" />
            <ellipse cx="400" cy="252" rx="200" ry="16" fill="none" stroke="#c69a43" strokeWidth="2" opacity="0.8" />
            <Bunting y={hero ? 40 : 26} />
          </g>
        );
      case "threeRings":
        return (
          <g>
            <Beams />
            <rect x="0" y="236" width="800" height="64" fill="url(#taeFloor)" />
            {[220, 400, 580].map((x, i) => (
              <g key={x}>
                <ellipse cx={x} cy="240" rx="110" ry="26" fill="none" stroke={i === 1 ? "#e2bd6b" : "#c69a43"} strokeWidth={i === 1 ? 4 : 2.5} />
                <ellipse cx={x} cy="240" rx="80" ry="17" fill="none" stroke="#7b213d" strokeWidth="1.5" opacity="0.9" />
              </g>
            ))}
            <Bunting />
          </g>
        );
      case "highWire":
        return (
          <g>
            <path d="M 20 120 Q 400 190 780 110" fill="none" stroke="#f2e6c5" strokeWidth="2.5" />
            <line x1="60" y1="60" x2="60" y2="280" stroke="#c69a43" strokeWidth="4" />
            <line x1="740" y1="52" x2="740" y2="280" stroke="#c69a43" strokeWidth="4" />
            <circle cx="400" cy="150" r="9" fill="#f2e6c5" />
            <line x1="352" y1="141" x2="448" y2="141" stroke="#c69a43" strokeWidth="3" />
            <line x1="400" y1="159" x2="392" y2="196" stroke="#f2e6c5" strokeWidth="3" />
            <line x1="400" y1="159" x2="410" y2="197" stroke="#f2e6c5" strokeWidth="3" />
            <Beams />
            <rect x="0" y="260" width="800" height="40" fill="url(#taeFloor)" />
            <Bunting />
          </g>
        );
      case "paperwork":
        return (
          <g>
            <Beams />
            {[[130, 150, -8], [255, 118, 5], [385, 158, -4], [510, 122, 7], [635, 150, -6]].map(([x, y, r], i) => (
              <g key={i} transform={`rotate(${r} ${x} ${y})`}>
                <rect x={x - 42} y={y - 56} width="84" height="112" fill="#f2e6c5" stroke="#c69a43" />
                {[0, 1, 2, 3, 4].map((l) => <line key={l} x1={x - 30} y1={y - 38 + l * 18} x2={x + 30} y2={y - 38 + l * 18} stroke="#241f1b" strokeWidth="2" opacity="0.55" />)}
              </g>
            ))}
            <rect x="0" y="242" width="800" height="58" fill="url(#taeFloor)" />
            <Bunting />
          </g>
        );
      case "backstage":
        return (
          <g>
            {[0, 1, 2, 3, 4].map((i) => <rect key={i} x={80 + i * 70} y={40 + i * 22} width={640 - i * 140} height={220 - i * 44} fill="none" stroke="#c69a43" strokeWidth="1.5" opacity={0.9 - i * 0.14} />)}
            {[160, 320, 480, 640].map((x) => (
              <g key={x}>
                <line x1={x} y1="0" x2={x} y2="52" stroke="#78736e" strokeWidth="1.5" />
                <circle cx={x} cy="60" r="8" fill="#e2bd6b" opacity="0.9" />
              </g>
            ))}
            <rect x="0" y="258" width="800" height="42" fill="url(#taeFloor)" />
          </g>
        );
      case "hiddenCapabilities":
        return (
          <g>
            <path d="M 0 0 H 330 Q 300 150 330 300 H 0 Z" fill="#4d152f" stroke="#c69a43" strokeWidth="2" />
            <path d="M 800 0 H 470 Q 500 150 470 300 H 800 Z" fill="#4d152f" stroke="#c69a43" strokeWidth="2" />
            {[[400, 120, 46], [452, 178, 30], [356, 186, 26]].map(([x, y, r], i) => (
              <g key={i}>
                <circle cx={x} cy={y} r={r} fill="none" stroke="#e2bd6b" strokeWidth="4" />
                {[0, 1, 2, 3, 4, 5, 6, 7].map((t) => {
                  const a = (t / 8) * Math.PI * 2;
                  return <line key={t} x1={x + Math.cos(a) * r} y1={y + Math.sin(a) * r} x2={x + Math.cos(a) * (r + 9)} y2={y + Math.sin(a) * (r + 9)} stroke="#e2bd6b" strokeWidth="4" />;
                })}
              </g>
            ))}
          </g>
        );
      case "controlPlane":
        return (
          <g>
            <rect x="140" y="70" width="520" height="180" rx="8" fill="#220b1d" stroke="#c69a43" strokeWidth="2" />
            {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => <rect key={i} x={175 + i * 58} y={112} width="16" height="70" rx="8" fill={i % 3 === 0 ? "#e2bd6b" : "#78736e"} />)}
            {[0, 1, 2, 3].map((i) => <circle key={i} cx={210 + i * 130} cy={222} r="11" fill="none" stroke="#e2bd6b" strokeWidth="3" />)}
            <Beams />
            <rect x="0" y="252" width="800" height="48" fill="url(#taeFloor)" />
            <Bunting />
          </g>
        );
      case "prizeBooth":
        return (
          <g>
            <rect x="150" y="56" width="500" height="200" fill="#220b1d" stroke="#c69a43" strokeWidth="2" />
            <line x1="150" y1="126" x2="650" y2="126" stroke="#c69a43" strokeWidth="1.5" />
            <line x1="150" y1="192" x2="650" y2="192" stroke="#c69a43" strokeWidth="1.5" />
            {[200, 300, 400, 500, 600].map((x, i) => <circle key={i} cx={x} cy={104} r="15" fill={i % 2 ? "#7b213d" : "#527a75"} stroke="#e2bd6b" />)}
            {[230, 370, 510].map((x, i) => <rect key={i} x={x} y={148} width="52" height="34" fill={i === 1 ? "#c69a43" : "#4d152f"} stroke="#e2bd6b" />)}
            <rect x="322" y="206" width="156" height="34" fill="#f2e6c5" />
            <text x="400" y="228" textAnchor="middle" fontFamily="ui-monospace,monospace" fontSize="13" fill="#241f1b" letterSpacing="2">VERIFY TO CLAIM</text>
            <Bunting />
          </g>
        );
      case "funhouse":
        return (
          <g>
            {[0, 1, 2, 3, 4, 5, 6].map((i) => (
              <path key={i} d={`M ${60 + i * 105} 40 q 26 ${i % 2 ? 60 : -40} 0 130 q -26 ${i % 2 ? 55 : -35} 0 120`} fill="none" stroke={i % 2 ? "#c69a43" : "#78736e"} strokeWidth="14" opacity={0.75} strokeLinecap="round" />
            ))}
            <rect x="0" y="262" width="800" height="38" fill="url(#taeFloor)" />
            <Bunting />
          </g>
        );
      default:
        return null;
    }
  })();
  const svg = (
    <svg viewBox="0 0 800 300" role="img" aria-label={alt} preserveAspectRatio="xMidYMid slice">
      <ArtDefs />
      <rect width="800" height="300" fill="#220b1d" />
      {body}
    </svg>
  );
  if (hero) return svg;
  return (
    <figure className="scene-art">
      {svg}
      <figcaption><span>{alt}</span><span>CSS atmosphere — supplied artwork represented, not embedded</span></figcaption>
    </figure>
  );
}

/* ----------------------------- SHARED HOOKS ------------------------------- */

function useFocusTrap(active, containerRef, onClose) {
  useEffect(() => {
    if (!active) return;
    const previous = document.activeElement;
    const first = containerRef.current && containerRef.current.querySelector("button, a[href], input, select, textarea");
    if (first) first.focus();
    const onKey = (event) => {
      if (event.key === "Escape") { event.preventDefault(); onClose(); return; }
      if (event.key !== "Tab" || !containerRef.current) return;
      const focusable = Array.from(containerRef.current.querySelectorAll('button:not([disabled]), a[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled])'));
      if (focusable.length === 0) return;
      const firstEl = focusable[0];
      const lastEl = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === firstEl) { event.preventDefault(); lastEl.focus(); }
      else if (!event.shiftKey && document.activeElement === lastEl) { event.preventDefault(); firstEl.focus(); }
    };
    document.addEventListener("keydown", onKey);
    return () => { document.removeEventListener("keydown", onKey); if (previous && previous.focus) previous.focus(); };
  }, [active, containerRef, onClose]);
}

/* ---------------------------- EVIDENCE DRAWER ----------------------------- */

function EvidenceDrawer({ receiptId, claimId, onClose, go }) {
  const dialogRef = useRef(null);
  useFocusTrap(true, dialogRef, onClose);
  const receipt = RECEIPTS.get(receiptId);
  if (!receipt) return null;
  const requested = claimId ? CLAIMS.get(claimId) : null;
  const excerpt = (requested && (requested.receiptId === receiptId || requested.id === receipt.excerptClaimId)) ? requested : resolveClaim(receipt.excerptClaimId);
  const source = SOURCE_BY_ID.get(excerpt.sourceId) || SOURCE_BY_ID.get(receipt.sourceId);
  const event = excerpt.eventId ? EVENT_BY_ID.get(excerpt.eventId) : null;
  return (
    <div className="backdrop" role="presentation" onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="drawer" role="dialog" aria-modal="true" aria-labelledby="evidence-title" ref={dialogRef}>
        <button className="btn drawer__close" type="button" onClick={onClose} aria-label="Close evidence">Close ×</button>
        <p className="kicker">{source.classification}</p>
        <h2 id="evidence-title">{receipt.title}</h2>
        <p>{receipt.summary}</p>
        <strong>{source.label}</strong>
        <dl>
          <div><dt>Public location</dt><dd><code>{source.publicPath}</code></dd></div>
          <div><dt>Public hash</dt><dd><code>{source.publicHash}</code></dd></div>
          <div><dt>Fidelity</dt><dd>{source.fidelity}</dd></div>
          <div><dt>Claim state</dt><dd>{excerpt.status}</dd></div>
          <div><dt>Limitation</dt><dd>{excerpt.limitation}</dd></div>
          {event && <div><dt>Exact event</dt><dd><code>{event.id}</code></dd></div>}
          {event && <div><dt>Source span</dt><dd><code>{event.span}</code></dd></div>}
        </dl>
        <h3>Generalized summary</h3>
        <p>{excerpt.text}</p>
        <h3>Correction history</h3>
        <p>{MISC.correctionsTwo}</p>
        <div className="drawer__links">
          {event && <button className="btn" type="button" onClick={() => { onClose(); go({ tab: "transcripts", transcript: event.transcriptId, event: event.id }); }}>Open exact transcript event</button>}
          <button className="btn" type="button" onClick={() => { onClose(); go({ tab: "journey", scene: receipt.sceneId }); }}>Back to scene</button>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------- STATUS RAIL ------------------------------ */

function StatusRail({ openReceipt, goScene }) {
  const [expanded, setExpanded] = useState(false);
  return (
    <aside className="rail" aria-label="Task operations">
      <button className="rail__head" type="button" aria-expanded={expanded} onClick={() => setExpanded((v) => !v)}>
        <span className="rail__title">Five operations</span>
        <span className="rail__dots" aria-hidden="true">{OPERATIONS.map((op) => <i key={op.id} className="dot" data-status={op.status} />)}</span>
        <span className="chip">{expanded ? "Hide" : "Show"}</span>
      </button>
      {expanded && (
        <ol>
          {OPERATIONS.map((op) => (
            <li key={op.id} data-status={op.status}>
              <span className="rail__marker" aria-hidden="true" />
              <span>
                <strong>{op.label}</strong>
                <em>{op.statusLabel}</em>
                <small>{resolveClaim(op.claimId).text}</small>
                <button className="btn btn--quiet" type="button" aria-label={op.label + " evidence"} onClick={() => { goScene(op.sceneId); openReceipt(op.receiptId); }}>Receipt</button>
              </span>
            </li>
          ))}
        </ol>
      )}
    </aside>
  );
}

/* ---------------------------------- HERO ---------------------------------- */

function Hero({ onEnter }) {
  return (
    <header className="hero">
      <div className="hero__art" aria-hidden="true"><SceneArt art="bigTop" hero /></div>
      <div className="hero__shade" aria-hidden="true" />
      <div className="hero__copy">
        <p className="kicker">{MISC.heroBadge}</p>
        <h1>THE ANTHROPIC EXPERIENCE</h1>
        <p className="hero__premise">{MISC.heroPremise}</p>
        <button className="btn btn--brass" type="button" onClick={onEnter}>Enter the review</button>
        <div className="hero__meta">
          <span className="art-note" role="note">{ART_ALT.bigTop} · CSS-rendered atmosphere; the ten supplied artworks are represented, not embedded</span>
        </div>
      </div>
    </header>
  );
}

/* ------------------------------ SCENE MECHANIC ---------------------------- */

function SceneMechanic({ scene, goTab, goSurface }) {
  const mech = MECHANICS[scene.id];
  const [step, setStep] = useState(0);
  const [alternate, setAlternate] = useState(false);
  if (!mech) return null;
  const bodies = scene.bodies;
  const advance = (max) => setStep((s) => Math.min(max, s + 1));
  return (
    <section className={"mech mech--" + mech.kind} role="group" aria-label={mech.label}>
      <h3>{mech.label}</h3>
      {mech.kind === "printer" && (
        <>
          <output className="word-printer" role="status">{mech.labels.slice(0, step).join(" ") || "\u2014"}</output>
          <button className="btn" type="button" onClick={() => advance(mech.labels.length)} disabled={step >= mech.labels.length}>Print next word</button>
          <button className="btn" type="button" onClick={() => setStep(mech.labels.length)}>Print all eight words</button>
          {step >= mech.labels.length && <p className="mech-receipt">{bodies[0]}</p>}
        </>
      )}
      {mech.kind === "surface-selector" && (
        <>
          <ul className="mech-chips">{SURFACES.slice(0, Math.max(1, step + 1)).map((s) => <li key={s.id}>{s.label}</li>)}</ul>
          <button className="btn" type="button" onClick={() => advance(SURFACES.length - 1)} disabled={step >= SURFACES.length - 1}>Select next surface</button>
          <button className="btn btn--quiet" type="button" onClick={() => goSurface(SURFACES[Math.min(step, SURFACES.length - 1)].id)}>Open selected passport</button>
          {step > 0 && <p className="mech-receipt">{bodies[Math.min(step, 1)] || bodies[0]}</p>}
        </>
      )}
      {mech.kind === "layer-stack" && (
        <>
          <ol className="layer-stack">{mech.labels.slice(0, step + 1).map((label, i) => <li key={label} style={{ "--layer": i }}>{label}</li>)}</ol>
          <button className="btn" type="button" onClick={() => advance(mech.labels.length - 1)} disabled={step >= mech.labels.length - 1}>Pull apart next layer</button>
          {step > 0 && <p className="mech-receipt">{bodies[Math.min(step - 1, bodies.length - 1)]}</p>}
        </>
      )}
      {mech.kind === "gates" && (
        <>
          <ol className="gate-row">{mech.labels.map((label, i) => <li key={label} data-open={i < step}>{label} <strong>{i < step ? "OPEN" : "CLOSED"}</strong></li>)}</ol>
          <button className="btn" type="button" onClick={() => advance(mech.labels.length)} disabled={step >= mech.labels.length}>Test next gate</button>
          {step > 0 && <p className="mech-receipt">{bodies[Math.min(step - 1, bodies.length - 1)]}</p>}
        </>
      )}
      {mech.kind === "lights" && (
        <>
          <ul className="light-grid">{mech.labels.map((label, i) => <li key={label} data-lit={i < step}><span aria-hidden="true" />{label} <strong>{i < step ? "INTERVENTION RECORDED" : "NOT YET RECORDED"}</strong></li>)}</ul>
          <button className="btn" type="button" onClick={() => advance(mech.labels.length)} disabled={step >= mech.labels.length}>Reveal next intervention</button>
          {step > 0 && <p className="mech-receipt">{bodies[Math.min(step > 4 ? 1 : 0, bodies.length - 1)]}</p>}
        </>
      )}
      {mech.kind === "input-reveal" && (
        <>
          <ul className="mech-chips">{mech.labels.map((label) => <li key={label}>{label}</li>)}</ul>
          <div className="task-reveal" data-covered={!alternate}><p>{bodies[1]}</p></div>
          <button className="btn" type="button" onClick={() => setAlternate((v) => !v)}>{alternate ? "Restore output pile" : "Move output pile aside"}</button>
        </>
      )}
      {mech.kind === "counters" && (
        <>
          {step > 0 && <ul className="counter-strip">{(scene.metrics || []).map(([l, v]) => <li key={l}><span>{l}</span><strong>{v}</strong></li>)}</ul>}
          <button className="btn" type="button" onClick={() => setStep(1)} disabled={step > 0}>Reveal conflicting counters</button>
          {step > 0 && <p className="mech-receipt">{bodies[1]}</p>}
        </>
      )}
      {mech.kind === "export-simulation" && (
        <>
          <p className="sim-state" role="status">{bodies[Math.min(step, 2)]}</p>
          <button className="btn" type="button" onClick={() => advance(2)} disabled={step >= 2}>{step === 0 ? "Run export-only simulation" : "Stop at correction"}</button>
        </>
      )}
      {mech.kind === "branch-collapse" && (
        <>
          <div className="branch-grid" aria-live="polite">{Array.from({ length: alternate ? 1 : 15 }, (_, i) => <span key={i}>branch-{String(i + 1).padStart(2, "0")}</span>)}</div>
          <button className="btn" type="button" onClick={() => setAlternate(false)}>Multiply branches</button>
          <button className="btn" type="button" onClick={() => setAlternate(true)}>Collapse to one</button>
          {alternate && <p className="mech-receipt">{bodies[1]}</p>}
        </>
      )}
      {mech.kind === "manual-advance" && (
        <>
          <div className="manual-stage" data-blackout={alternate}>{step > 0 ? <p>{bodies[Math.min(step - 1, bodies.length - 1)]}</p> : <p>Ready.</p>}</div>
          <button className="btn" type="button" onClick={() => advance(bodies.length)} disabled={step >= bodies.length}>Advance transcript</button>
          <button className="btn" type="button" onClick={() => setAlternate((v) => !v)}>Blackout stage</button>
        </>
      )}
      {mech.kind === "handoff-compare" && (
        <>
          <div className="compare-grid">{bodies.slice(0, alternate ? 3 : 2).map((text, i) => <section key={text}><h4>{i < 2 ? "Handoff intent" : "Later deliverable"}</h4><p>{text}</p></section>)}</div>
          <button className="btn" type="button" onClick={() => setAlternate(true)} disabled={alternate}>Open later deliverable</button>
        </>
      )}
      {mech.kind === "correction-reveal" && (
        <>
          <ol className="correction-list">{bodies.slice(0, step).map((text) => <li key={text}>{text}</li>)}</ol>
          <button className="btn" type="button" onClick={() => advance(bodies.length)} disabled={step >= bodies.length}>Reveal next correction</button>
        </>
      )}
      {mech.kind === "provider-replay" && (
        <>
          <div className="replay">{mech.labels.slice(0, 2).map((provider) => (
            <section key={provider}><h4>{provider}</h4><ol>{mech.labels.slice(2).map((gate, i) => <li key={gate} data-open={i < step}>{gate} <strong>{i < step ? "PASSED" : "NOT PASSED"}</strong></li>)}</ol></section>
          ))}</div>
          <button className="btn" type="button" onClick={() => advance(4)} disabled={step >= 4}>Replay next gate</button>
          {step > 0 && <p className="mech-receipt">{bodies[Math.min(step - 1, bodies.length - 1)]}</p>}
        </>
      )}
      {scene.id === "build-missing-layer" && <button className="btn btn--brass" type="button" onClick={() => goTab("harness")}>Build a governed contract in the harness</button>}
    </section>
  );
}

/* -------------------------- OUTPUT PILE / COMPARATOR ---------------------- */

function OutputPile({ idPrefix }) {
  const [selectedId, setSelectedId] = useState(null);
  const selected = OUTPUTS.find((o) => o.id === selectedId);
  return (
    <section className="pile-wrap" aria-label={"Output pile for " + idPrefix}>
      <div className="pile" aria-label="Substituted outputs">
        <h3>The output pile</h3>
        {OUTPUTS.map((output, index) => (
          <button className="output-card" style={{ "--pile-index": index }} type="button" key={output.id} aria-pressed={selectedId === output.id} onClick={() => setSelectedId(output.id)}>
            {output.label}
          </button>
        ))}
        <p>{MISC.outputNote}</p>
      </div>
      <p className="output-detail" role="status" aria-live="polite">{selected ? MISC.outputDetail : MISC.outputPrompt}</p>
      <ol className="vh" aria-label="Output inventory">
        {OUTPUTS.map((o) => <li key={o.id}>{o.label}. Type: {o.fileType}. Requested: false. Advanced acceptance: false.</li>)}
      </ol>
    </section>
  );
}

function Comparator() {
  const [position, setPosition] = useState(50);
  const [beforeId, setBeforeId] = useState(REPRESENTATIONS[0].id);
  const [afterId, setAfterId] = useState(REPRESENTATIONS[REPRESENTATIONS.length - 1].id);
  const rep = (id, fallback) => REPRESENTATIONS.find((r) => r.id === id) || fallback;
  const before = rep(beforeId, REPRESENTATIONS[0]);
  const after = rep(afterId, REPRESENTATIONS[REPRESENTATIONS.length - 1]);
  const Panel = ({ r }) => (
    <figure>
      <div className="vc__frame"><span className="vc__glyph">{r.glyph}</span></div>
      <figcaption>
        <strong>{r.label}</strong>
        <span>{r.caption}</span>
        <small>{r.architecture} · {r.fidelity}</small>
      </figcaption>
    </figure>
  );
  return (
    <section className="comparator" role="group" aria-label="Visual comparator">
      <h3>Review-state comparator</h3>
      <p style={{ fontSize: ".82rem", opacity: 0.8 }}>{MISC.before} {MISC.after} Captured renders are represented by labeled placeholders in this artifact edition.</p>
      <div className="comparator__selectors">
        <label>Left representation<select value={beforeId} onChange={(e) => setBeforeId(e.target.value)}>{REPRESENTATIONS.map((r) => <option key={r.id} value={r.id}>{r.label}</option>)}</select></label>
        <label>Right representation<select value={afterId} onChange={(e) => setAfterId(e.target.value)}>{REPRESENTATIONS.map((r) => <option key={r.id} value={r.id}>{r.label}</option>)}</select></label>
      </div>
      <div className="vc" style={{ "--comparison": position + "%" }}>
        <Panel r={before} />
        <Panel r={after} />
      </div>
      <label>Comparison position
        <input type="range" min="0" max="100" value={position} onChange={(e) => setPosition(Number(e.target.value))} />
      </label>
    </section>
  );
}

/* ------------------------------- SCENE PLAYER ----------------------------- */

function ScenePlayer({ scene, mode, active, openReceipt, go }) {
  const [attemptOpen, setAttemptOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const receipt = RECEIPTS.get("receipt-" + scene.id);
  const roast = resolveClaim("claim-" + scene.id + "-roast");
  const fragment = resolveClaim("claim-" + scene.id + "-transcript");
  const fragmentSource = SOURCE_BY_ID.get(fragment.sourceId);
  const eyebrow = scene.sectionType === "scene" ? "SCENE " + String(scene.sceneNumber).padStart(2, "0") : scene.sectionType.toUpperCase();
  return (
    <article id={"scene-" + scene.id} className={"scene" + (active ? " scene--active" : "") + (scene.pro ? " scene--pro" : "")} data-scene-id={scene.id} aria-labelledby={"scene-title-" + scene.id}>
      <p className="kicker">{eyebrow} · {scene.navLabel}{scene.cases.length > 0 ? " · case/" + scene.cases.join(" · case/") : ""}</p>
      <h2 id={"scene-title-" + scene.id}>{scene.title}</h2>
      <p className="scene__status" role="note"><strong>LIMITED EVIDENCE</strong> · This scene includes authored synthesis or exact values that the linked generalized event does not independently establish. Open the receipt for the binding and limitation.</p>
      <SceneArt art={scene.art} />
      {scene.bodies.map((body, i) => {
        const claimId = "claim-" + scene.id + "-body-" + (i + 1);
        return (
          <div className="fline" key={claimId}>
            <p id={"factual-" + claimId}>{body}</p>
            <button className="btn" type="button" aria-describedby={"factual-" + claimId} onClick={() => openReceipt("receipt-" + scene.id, claimId)}>Open evidence</button>
          </div>
        );
      })}
      <p className="interaction"><strong>Interaction</strong>{scene.interaction}</p>
      <SceneMechanic scene={scene} goTab={(tab) => go({ tab })} goSurface={(surfaceId) => go({ tab: "surfaces", surface: surfaceId })} />
      {scene.metrics && (
        <ul className="metrics" aria-label={scene.navLabel + " metrics"}>
          {scene.metrics.map(([label], i) => {
            const vId = "claim-" + scene.id + "-metric-" + (i + 1) + "-value";
            return (
              <li key={label}>
                <span>{label}</span>
                <strong>{resolveClaim(vId).text}</strong>
                <button className="btn" type="button" onClick={() => openReceipt("receipt-" + scene.id, vId)}>Receipt</button>
              </li>
            );
          })}
        </ul>
      )}
      {scene.files && (
        <section className="files" aria-label="Fourteen-file review pack">
          <h3>14 files · blueprint delivered: 0</h3>
          <ol>
            {REVIEW_PACK.map(([name, bytes], i) => {
              const open = selectedFile === i;
              return (
                <li key={name}>
                  <button type="button" aria-expanded={open} onClick={() => setSelectedFile(open ? null : i)}>{name} <small>{bytes}</small></button>
                  {open && <div className="files__detail"><span>{name} · {bytes}</span><button className="btn" type="button" onClick={() => openReceipt("receipt-chatgpt-pro", "claim-review-pack-file-" + (i + 1) + "-name")}>Open file receipt</button></div>}
                </li>
              );
            })}
          </ol>
        </section>
      )}
      {scene.attemptFour && (
        <section className="attempt" aria-label="Attempt Four">
          <div className="attempt__repo">
            <p className="kicker" style={{ margin: 0 }}>{ATTEMPT_FOUR.repositoryState}</p>
            <button className="btn" type="button" disabled>{ATTEMPT_FOUR.commitButton}</button>
          </div>
          <button className="btn btn--brass" type="button" onClick={() => setAttemptOpen(true)} aria-expanded={attemptOpen}>{ATTEMPT_FOUR.printButton}</button>
          {attemptOpen && (
            <div className="attempt__report">
              <p className="attempt__report-title">{ATTEMPT_FOUR.reportTitle}</p>
              <h3>{ATTEMPT_FOUR.headline}</h3>
              <p>{ATTEMPT_FOUR.subhead}</p>
              <p>{ATTEMPT_FOUR.receipt}</p>
              <ul className="metrics">{ATTEMPT_FOUR.metrics.map(([l, v]) => <li key={l}><span>{l}</span><strong>{v}</strong></li>)}</ul>
              <p className="attempt__callback">{ATTEMPT_FOUR.callback}</p>
            </div>
          )}
        </section>
      )}
      {scene.ledger && (
        <dl className="ledger" aria-label={scene.navLabel + " requested versus produced"}>
          <div>
            <dt>Requested</dt><dd>{MISC.ledgerRequested}</dd>
            <dt>Produced</dt><dd>{MISC.ledgerProduced}</dd>
          </div>
        </dl>
      )}
      {mode === "roast" && (
        <section className="panel panel--roast"><p>{roast.text}</p><button className="btn" type="button" onClick={() => openReceipt("receipt-" + scene.id)}>Open evidence</button></section>
      )}
      {mode === "receipts" && receipt && (
        <div className="panel panel--receipts"><p>{receipt.summary}</p><button className="btn" type="button" onClick={() => openReceipt(receipt.id)}>Open {receipt.title}</button></div>
      )}
      {mode === "transcript" && (
        <blockquote className="panel panel--transcript">
          <p>{fragment.text}</p>
          <cite>{fragmentSource.label} · participant ###-PII-### · generalized, not verbatim</cite>
          <button className="btn" type="button" onClick={() => openReceipt("receipt-" + scene.id)}>Open evidence</button>
        </blockquote>
      )}
      {scene.outputs && <OutputPile idPrefix={scene.id} />}
      {scene.comparator && <Comparator />}
      <details>
        <summary>Limitations</summary>
        <p>{MISC.limitationGeneral}</p>
      </details>
    </article>
  );
}

/* ------------------------------ SURFACE ATLAS ----------------------------- */

const monogram = (label) => label.split(/\s+/).map((w) => w[0]).join("").slice(0, 3).toUpperCase();

function SurfaceAtlas({ selectedId, onSelect, openReceipt }) {
  const [query, setQuery] = useState("");
  const [filters, setFilters] = useState({});
  const [wheel, setWheel] = useState(false);
  const selected = SURFACES.find((s) => s.id === selectedId) || SURFACES[0];
  const visible = useMemo(() => SURFACES.filter((s) => {
    const haystack = Object.values(s).join(" ").toLowerCase();
    if (!haystack.includes(query.trim().toLowerCase())) return false;
    return DIMENSIONS.every(([key]) => !filters[key] || s[key] === filters[key]);
  }), [filters, query]);
  return (
    <main className="page">
      <p className="kicker">DIRECTORY FIRST</p>
      <h1>Surface Atlas</h1>
      <p className="lede">{visible.length} surfaces</p>
      <label className="search">Search surfaces<input type="search" value={query} onChange={(e) => setQuery(e.target.value)} /></label>
      <div className="filters">
        {DIMENSIONS.map(([key, label]) => {
          const options = [...new Set(SURFACES.map((s) => s[key]))].sort();
          return (
            <label key={key}>{label}
              <select value={filters[key] || ""} onChange={(e) => setFilters((c) => ({ ...c, [key]: e.target.value }))}>
                <option value="">All</option>
                {options.map((o) => <option key={o} value={o}>{o}</option>)}
              </select>
            </label>
          );
        })}
      </div>
      <label className="check" style={{ display: "flex", gap: ".5rem", alignItems: "center", fontSize: ".8rem" }}>
        <input type="checkbox" checked={wheel} onChange={(e) => setWheel(e.target.checked)} /> Show optional wheel
      </label>
      {wheel && (
        <div className="wheel" aria-label="Selectable surface wheel">
          {visible.map((s, i) => (
            <button type="button" key={s.id} aria-label={String(i + 1).padStart(2, "0") + " · " + s.label} aria-pressed={selected.id === s.id} onClick={() => onSelect(s.id)}>
              {String(i + 1).padStart(2, "0")}<br />{monogram(s.label)}
            </button>
          ))}
        </div>
      )}
      <section className="passport" aria-label="Surface passport">
        <p className="kicker">SELECTED PASSPORT</p>
        <h2>{selected.label}</h2>
        <p>{selected.description}</p>
        <p>{selected.architecture}</p>
        <p>{selected.controls}</p>
        <dl>{DIMENSIONS.map(([key, label]) => <div key={key}><dt>{label}</dt><dd>{selected[key]}</dd></div>)}</dl>
        <p style={{ fontSize: ".78rem" }}><strong>Source</strong> source-atlas</p>
        <button className="btn" type="button" onClick={() => openReceipt("receipt-surface-wheel", "claim-" + selected.id)}>Open surface receipt</button>
      </section>
      <section aria-label="Surface directory">
        {visible.length === 0 ? <p>No matching surfaces.</p> : (
          <ul className="grid">
            {visible.map((s) => (
              <li key={s.id} className="card surface-card">
                <h2><button type="button" aria-pressed={selected.id === s.id} onClick={() => onSelect(s.id)}>{s.label}</button></h2>
                <p>{s.description}</p>
                <dl>{DIMENSIONS.map(([key, label]) => <div key={key}><dt>{label}</dt><dd>{s[key]}</dd></div>)}</dl>
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  );
}

/* ---------------------------- TRANSCRIPT THEATER -------------------------- */

const formatEventId = (t, e) => t.id + "-event-" + String(e.i).padStart(3, "0");

function TranscriptTheater({ openTranscript }) {
  const [query, setQuery] = useState("");
  const [tag, setTag] = useState("");
  const allTags = [...new Set(TRANSCRIPTS.flatMap((t) => t.events.flatMap((e) => e.tags)))].sort();
  const visible = TRANSCRIPTS.filter((t) => {
    const haystack = [t.title, t.hash, ...t.events.flatMap((e) => [formatEventId(t, e), ...e.tags, e.span, e.text])].join(" ").toLowerCase();
    const tagged = !tag || t.events.some((e) => e.tags.includes(tag));
    return tagged && haystack.includes(query.trim().toLowerCase());
  });
  return (
    <main className="page">
      <p className="kicker">GENERALIZED SUMMARY LIBRARY</p>
      <h1>Transcript Theater</h1>
      <p className="fidelity" role="note">{FIDELITY_NOTICE}</p>
      <label className="search">Search transcripts<input type="search" value={query} onChange={(e) => setQuery(e.target.value)} /></label>
      <label className="search">Tag filter
        <select value={tag} onChange={(e) => setTag(e.target.value)}>
          <option value="">All tags</option>
          {allTags.map((o) => <option key={o} value={o}>{o}</option>)}
        </select>
      </label>
      <ul className="grid">
        {visible.map((t) => (
          <li key={t.id} className="card">
            <h2 style={{ fontSize: "1.3rem" }}><button className="btn btn--quiet" style={{ fontFamily: "inherit", fontSize: "inherit", textTransform: "none", letterSpacing: 0 }} type="button" onClick={() => openTranscript(t.id, formatEventId(t, t.events[0]))}>{t.title}</button></h2>
            <p>{[...new Set(t.events.flatMap((e) => e.tags))].map((x) => "#" + x).join(" ")}</p>
            <p className="anchor">{t.events[0].span}</p>
            <p>{t.events.length} stable event anchors · generalized · not verbatim</p>
          </li>
        ))}
      </ul>
    </main>
  );
}

function TranscriptDetail({ transcriptId, focusEventId, back, openReceipt }) {
  const [comparison, setComparison] = useState("instruction-action");
  const transcript = TRANSCRIPT_BY_ID.get(transcriptId);
  useEffect(() => {
    if (!focusEventId) return;
    const el = document.getElementById(focusEventId);
    if (el) { el.focus({ preventScroll: true }); if (el.scrollIntoView) el.scrollIntoView({ block: "start" }); }
  }, [focusEventId, transcriptId]);
  if (!transcript) return null;
  const all = TRANSCRIPTS.flatMap((t) => t.events.map((e) => ({ ...e, transcriptId: t.id, id: formatEventId(t, e) })));
  const pick = (t, fallback) => all.find((e) => e.tags.includes(t)) || all[fallback];
  let left = pick("instruction", 0);
  let right = transcript.events.map((e) => ({ ...e, id: formatEventId(transcript, e) })).find((e) => e.i > left.i) || pick("operation", 1);
  let leftLabel = "Instruction"; let rightLabel = "Next recorded action";
  if (comparison === "handoff-deliverable") {
    const handoff = TRANSCRIPT_BY_ID.get("phase-04-master-blueprint-handoff");
    const hEvents = handoff.events.map((e) => ({ ...e, id: formatEventId(handoff, e) }));
    left = hEvents.find((e) => e.tags.includes("instruction") && e.i >= 5) || hEvents[0];
    right = hEvents.find((e) => e.tags.includes("completion")) || hEvents[1];
    leftLabel = "Handoff request"; rightLabel = "Recorded deliverable";
  } else if (comparison === "admission-next") {
    left = pick("admission", 0);
    const holder = TRANSCRIPTS.find((t) => t.events.some((e) => formatEventId(t, e) === left.id));
    const hEvents = holder.events.map((e) => ({ ...e, id: formatEventId(holder, e) }));
    right = hEvents.find((e) => e.i > left.i) || pick("completion", 1);
    leftLabel = "Admission"; rightLabel = "Next action";
  }
  return (
    <main className="page">
      <button className="btn" type="button" onClick={back}>← All transcripts</button>
      <p className="kicker" style={{ marginTop: "1.4rem" }}>TRANSCRIPT / {transcript.id}</p>
      <h1>{transcript.title}</h1>
      <p className="fidelity" role="note">{FIDELITY_NOTICE}</p>
      <p style={{ fontSize: ".82rem" }}><strong>Fidelity:</strong> generalized · <strong>Verbatim:</strong> false · <strong>Public hash:</strong> <code>{transcript.hash}</code></p>
      <label className="search">Comparison
        <select value={comparison} onChange={(e) => setComparison(e.target.value)}>
          <option value="instruction-action">Instruction / next action</option>
          <option value="handoff-deliverable">Handoff / deliverable</option>
          <option value="admission-next">Admission / next action</option>
        </select>
      </label>
      <div className="compare-grid">
        <section><h4>{leftLabel}</h4><p>{left.text}</p><small>{left.id}</small></section>
        <section><h4>{rightLabel}</h4><p>{right.text}</p><small>{right.id}</small></section>
      </div>
      <div>
        {transcript.events.map((e) => {
          const id = formatEventId(transcript, e);
          return (
            <article id={id} key={id} className="event" data-role={e.role} tabIndex={-1} aria-current={focusEventId === id ? "true" : undefined}>
              <p className="anchor">Stable anchor · {id} · {e.role} · #{e.tags.join(" #")} · {e.span}</p>
              <p>{e.text}</p>
              <p style={{ fontSize: ".74rem", opacity: 0.7 }}><strong>Fidelity:</strong> generalized · <strong>Verbatim:</strong> false</p>
              <button className="btn" type="button" style={{ justifySelf: "start" }} onClick={() => openReceipt(PHASE_RECEIPT[transcript.id], "claim-" + id)}>Open linked receipt</button>
            </article>
          );
        })}
      </div>
    </main>
  );
}

/* ----------------------------- HARNESS BUILDER ---------------------------- */

function initialAnswers(presetId) {
  const preset = HARNESS.presets.find((p) => p.id === presetId);
  const answers = {};
  for (const q of HARNESS.questions) answers[q.id] = q.def;
  if (preset) answers.outcome = preset.outcome;
  return answers;
}

function harnessPreview(presetId, plainLanguage, answers) {
  const preset = HARNESS.presets.find((p) => p.id === presetId);
  const section = (id) => HARNESS.questions.find((q) => q.id === id).section;
  const lines = [
    "INTENT HARNESS / " + preset.label.toUpperCase(), "",
    section("outcome"), answers.outcome, "",
    "DEFINITION OF DONE", HARNESS.definitionOfDone, "",
    section("inputs"), answers.inputs, "",
    section("authority"), answers.authority, "",
    section("substitution-policy"), answers["substitution-policy"], "",
    section("state"), answers.state, "",
    section("verification"), answers.verification, "",
    section("stop-conditions"), answers["stop-conditions"], "",
  ];
  if (plainLanguage && preset.plain) lines.push(preset.plain, "");
  return lines.join("\n");
}

function HarnessBuilder() {
  const [presetId, setPresetId] = useState("repository-coding");
  const [plainLanguage, setPlainLanguage] = useState(false);
  const [answers, setAnswers] = useState(() => initialAnswers("repository-coding"));
  const [status, setStatus] = useState("");
  const previewRef = useRef(null);
  const preview = useMemo(() => harnessPreview(presetId, plainLanguage, answers), [answers, plainLanguage, presetId]);
  const selectPreset = (next) => {
    setPresetId(next);
    setAnswers(initialAnswers(next));
    if (next !== "k12-support") setPlainLanguage(false);
    setStatus("");
  };
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(preview);
      setStatus("Preview copied.");
    } catch (err) {
      try {
        if (previewRef.current) { previewRef.current.focus(); previewRef.current.select(); }
        const ok = document.execCommand && document.execCommand("copy");
        setStatus(ok ? "Preview copied." : "Copy blocked here — the preview text is selected; copy it manually.");
      } catch (err2) {
        setStatus("Copy blocked here — select the preview text and copy it manually.");
      }
    }
  };
  const download = () => {
    try {
      const url = URL.createObjectURL(new Blob([preview], { type: "text/plain;charset=utf-8" }));
      const anchor = document.createElement("a");
      anchor.href = url;
      anchor.download = "intent-harness-" + presetId + ".txt";
      anchor.click();
      URL.revokeObjectURL(url);
      setStatus("Preview downloaded.");
    } catch (err) {
      setStatus("Download blocked here — copy the preview instead.");
    }
  };
  const reset = () => { setPresetId("repository-coding"); setPlainLanguage(false); setAnswers(initialAnswers("repository-coding")); setStatus(""); };
  return (
    <main className="page">
      <p className="kicker">CLIENT-ONLY / NO NETWORK</p>
      <h1>Harness Builder</h1>
      <p className="lede">Seven questions that turn a wish into a governed contract. Edit every field; the preview stays deterministic.</p>
      <div className="harness">
        <form onSubmit={(e) => e.preventDefault()}>
          <label className="search">Preset
            <select value={presetId} onChange={(e) => selectPreset(e.target.value)}>
              {HARNESS.presets.map((p) => <option value={p.id} key={p.id}>{p.label}</option>)}
            </select>
          </label>
          <label className="check"><input type="checkbox" checked={plainLanguage} disabled={presetId !== "k12-support"} onChange={(e) => setPlainLanguage(e.target.checked)} /> K–12 plain language</label>
          {HARNESS.questions.map((q) => (
            <label key={q.id}>
              {q.label}
              <span>{plainLanguage ? q.plainPrompt : q.prompt}</span>
              <textarea value={answers[q.id]} onChange={(e) => setAnswers((c) => ({ ...c, [q.id]: e.target.value }))} />
            </label>
          ))}
          <div className="button-row">
            <button className="btn btn--brass" type="button" onClick={copy}>Copy</button>
            <button className="btn" type="button" onClick={download}>Download .txt</button>
            <button className="btn" type="button" onClick={reset}>Reset</button>
          </div>
          <p className="status-line" role="status" aria-live="polite">{status}</p>
        </form>
        <label className="preview">Deterministic preview
          <textarea ref={previewRef} readOnly value={preview} />
        </label>
      </div>
    </main>
  );
}

/* ------------------------------ EVIDENCE ROOM ----------------------------- */

function EvidenceRoom({ openReceipt, goScene }) {
  const [query, setQuery] = useState("");
  const [limit, setLimit] = useState(24);
  const normalized = query.trim().toLowerCase();
  const sources = SOURCES.filter((s) => Object.values(s).join(" ").toLowerCase().includes(normalized));
  const allClaims = useMemo(() => [...CLAIMS.values()], []);
  const claims = allClaims.filter((c) => [c.id, c.text, c.status].join(" ").toLowerCase().includes(normalized));
  const findScene = (claim) => SCENES.find((s) => claim.id.startsWith("claim-" + s.id + "-"));
  return (
    <main className="page">
      <p className="kicker">CLAIMS / SOURCES / LIMITATIONS</p>
      <h1>Evidence Room</h1>
      <span className="version">Correction version 0.2</span>
      <label className="search">Search evidence<input type="search" value={query} onChange={(e) => { setQuery(e.target.value); setLimit(24); }} /></label>
      <section aria-labelledby="sources-title">
        <h2 id="sources-title">Sources</h2>
        <ul className="grid">
          {sources.map((s) => {
            const backlink = SCENES.find((scene) => scene.sourceId === s.id);
            return (
              <li key={s.id} className="card">
                <span className="state">{s.classification}</span>
                <h3>{s.label}</h3>
                <p>{s.summary}</p>
                <p><strong>Public hash</strong> <code>{s.publicHash}</code></p>
                <p><strong>Limitation</strong> {s.limitation}</p>
                {backlink && <button className="btn btn--quiet" style={{ justifySelf: "start" }} type="button" onClick={() => goScene(backlink.id)}>Scene backlink</button>}
              </li>
            );
          })}
        </ul>
      </section>
      <section aria-labelledby="claims-title">
        <h2 id="claims-title">Claims <small style={{ fontFamily: "var(--mono)", fontSize: ".8rem", opacity: 0.65 }}>{claims.length} records</small></h2>
        <ul className="grid">
          {claims.slice(0, limit).map((c) => {
            const scene = findScene(c);
            return (
              <li key={c.id} className="card">
                <span className="state">{c.status}</span>
                <h3 style={{ fontFamily: "var(--mono)", fontSize: ".72rem", letterSpacing: ".04em" }}>{c.id}</h3>
                <p>{c.text}</p>
                <p style={{ opacity: 0.65 }}>Source: {c.sourceId}</p>
                <div className="button-row">
                  <button className="btn" type="button" onClick={() => openReceipt(c.receiptId, c.id)}>Receipt</button>
                  {scene && <button className="btn btn--quiet" type="button" onClick={() => goScene(scene.id)}>Scene backlink</button>}
                </div>
              </li>
            );
          })}
        </ul>
        {claims.length > limit && <button className="btn" type="button" onClick={() => setLimit((n) => n + 48)}>Show {Math.min(48, claims.length - limit)} more of {claims.length - limit} remaining</button>}
      </section>
    </main>
  );
}

/* -------------------------------- SCOREBOARD ------------------------------ */

function ReleaseScoreboard() {
  return (
    <section className="scoreboard" aria-label="Release scoreboard">
      <p className="kicker">RELEASE SCOREBOARD</p>
      <h2>{MISC.releaseVerified}</h2>
      <ul>
        {RELEASE_FACTS.map((f) => (
          <li key={f.id} data-status={f.status}>
            <span><strong>{f.label}</strong><br /><b>{f.status === "verified" ? "VERIFIED" : "PENDING"}</b></span>
            <span>{resolveClaim(f.claimId).text}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}

/* ------------------------------- INFO PAGES ------------------------------- */

function InfoPage({ pageId }) {
  const page = PAGES[pageId];
  return (
    <main className="page" style={{ maxWidth: "820px" }}>
      <p className="kicker">PUBLIC RECORD</p>
      <h1>{page.title}</h1>
      {page.paras.map((p) => <p key={p} className="lede">{p}</p>)}
      {pageId === "corrections" && <span className="version">Version 0.2</span>}
      {pageId === "about" && (
        <>
          <h3 style={{ marginTop: "2rem", fontFamily: "var(--mono)", fontSize: ".7rem", letterSpacing: ".16em", textTransform: "uppercase", color: "var(--brass)" }}>About this artifact edition</h3>
          <p className="lede">This single-file React artifact was ported from the canonical <code>app/</code> build in the repository. The router became in-file state, typed validation became plain records, and the ten supplied artworks are represented by labeled CSS/SVG atmosphere rather than embedded files. Factual copy, generalized transcript events, public hashes, and limitations are carried over from the public catalog unchanged.</p>
          <p className="lede">In the spirit of the product: this substitution is labeled as a substitution.</p>
        </>
      )}
    </main>
  );
}

/* ---------------------------------- APP ----------------------------------- */

const TABS = [
  ["journey", "Journey"], ["surfaces", "Surfaces"], ["transcripts", "Transcripts"], ["harness", "Harness"],
  ["evidence", "Evidence"], ["method", "Method"], ["corrections", "Corrections"], ["about", "About"],
];
const MODES = ["roast", "receipts", "transcript"];
const CASES = ["claude-github", "claude-build", "branch-cleanup", "chatgpt-pro"];

export default function TheAnthropicExperience() {
  const [tab, setTab] = useState("journey");
  const [mode, setMode] = useState("roast");
  const [scene, setScene] = useState("prologue");
  const [caseFilter, setCaseFilter] = useState(null);
  const [receipt, setReceipt] = useState(null);
  const [claim, setClaim] = useState(null);
  const [surfaceId, setSurfaceId] = useState(SURFACES[0].id);
  const [transcriptId, setTranscriptId] = useState(null);
  const [focusEvent, setFocusEvent] = useState(null);
  const stageRef = useRef(null);

  const openReceipt = (receiptId, claimId) => { setReceipt(receiptId); setClaim(claimId || null); };
  const closeReceipt = () => { setReceipt(null); setClaim(null); };
  const go = (target) => {
    if (target.tab) setTab(target.tab);
    if (target.scene) { setScene(target.scene); setTab("journey"); setTimeout(() => { const el = document.getElementById("scene-" + target.scene); if (el && el.scrollIntoView) el.scrollIntoView({ block: "start" }); }, 30); }
    if (target.surface) setSurfaceId(target.surface);
    if (target.transcript) { setTranscriptId(target.transcript); setFocusEvent(target.event || null); }
  };
  const goScene = (sceneId) => go({ tab: "journey", scene: sceneId });
  const chooseTab = (next) => { setTab(next); if (next !== "transcripts") { setTranscriptId(null); setFocusEvent(null); } if (typeof window !== "undefined") window.scrollTo({ top: 0 }); };

  const visibleScenes = caseFilter ? SCENES.filter((s) => s.cases.includes(caseFilter)) : SCENES;
  const activeScene = visibleScenes.some((s) => s.id === scene) ? scene : (visibleScenes[0] && visibleScenes[0].id);

  return (
    <div className="tae">
      <style>{CSS}</style>
      <nav className="nav" aria-label="Primary">
        <button className="nav__brand" type="button" onClick={() => chooseTab("journey")}>THE ANTHROPIC EXPERIENCE</button>
        <div className="nav__tabs">
          {TABS.map(([id, label]) => (
            <button key={id} type="button" aria-current={tab === id ? "page" : undefined} onClick={() => chooseTab(id)}>{label}</button>
          ))}
        </div>
      </nav>

      {tab === "journey" && (
        <>
          <Hero onEnter={() => { const el = stageRef.current; if (el && el.scrollIntoView) el.scrollIntoView({ block: "start" }); }} />
          <StatusRail openReceipt={openReceipt} goScene={goScene} />
          <main className="stage" ref={stageRef}>
            <div className="stage__intro">
              <p className="kicker">BRANCH-CLEANUP / REVIEW CUT</p>
              <h2>What was requested. What appeared. What can be verified.</h2>
            </div>
            <div className="modes" role="group" aria-label="Review mode">
              {MODES.map((m) => (
                <button type="button" key={m} aria-pressed={mode === m} onClick={() => setMode(m)}>{m[0].toUpperCase() + m.slice(1)}</button>
              ))}
            </div>
            <nav className="scene-nav" aria-label="Scenes">
              {visibleScenes.map((s) => (
                <button type="button" key={s.id} aria-current={activeScene === s.id ? "step" : undefined} onClick={() => goScene(s.id)}>
                  <span>{s.sectionType === "scene" ? String(s.sceneNumber).padStart(2, "0") : s.sectionType === "prologue" ? "P" : "F"}</span>
                  {s.navLabel}
                </button>
              ))}
            </nav>
            <div className="case-filter">
              <span>Case:</span>
              {CASES.map((c) => (
                <button key={c} className="chip" type="button" style={caseFilter === c ? { borderColor: "var(--brass)", color: "var(--brass-hi)" } : undefined} aria-pressed={caseFilter === c} onClick={() => setCaseFilter(caseFilter === c ? null : c)}>{c}</button>
              ))}
              {caseFilter && <button className="btn btn--quiet" type="button" onClick={() => setCaseFilter(null)}>Show all scenes</button>}
            </div>
            {caseFilter && <p className="lede" style={{ marginTop: "-1rem", marginBottom: "1.6rem" }}>This case view reuses the same typed scene records as the guided journey.</p>}
            <div className="sections">
              {visibleScenes.map((s) => (
                <ScenePlayer key={s.id} scene={s} mode={mode} active={activeScene === s.id} openReceipt={openReceipt} go={go} />
              ))}
            </div>
          </main>
        </>
      )}

      {tab === "surfaces" && (<><StatusRail openReceipt={openReceipt} goScene={goScene} /><SurfaceAtlas selectedId={surfaceId} onSelect={setSurfaceId} openReceipt={openReceipt} /></>)}
      {tab === "transcripts" && (
        <>
          <StatusRail openReceipt={openReceipt} goScene={goScene} />
          {transcriptId
            ? <TranscriptDetail transcriptId={transcriptId} focusEventId={focusEvent} back={() => { setTranscriptId(null); setFocusEvent(null); }} openReceipt={openReceipt} />
            : <TranscriptTheater openTranscript={(id, eventId) => { setTranscriptId(id); setFocusEvent(eventId); }} />}
        </>
      )}
      {tab === "harness" && (<><StatusRail openReceipt={openReceipt} goScene={goScene} /><HarnessBuilder /></>)}
      {tab === "evidence" && (<><StatusRail openReceipt={openReceipt} goScene={goScene} /><EvidenceRoom openReceipt={openReceipt} goScene={goScene} /></>)}
      {tab === "method" && <InfoPage pageId="method" />}
      {tab === "corrections" && <InfoPage pageId="corrections" />}
      {tab === "about" && <InfoPage pageId="about" />}

      <ReleaseScoreboard />
      <footer className="foot">THE ANTHROPIC EXPERIENCE · PUBLIC-SAFE REVIEW CUT · SINGLE-FILE ARTIFACT EDITION</footer>

      {receipt && <EvidenceDrawer receiptId={receipt} claimId={claim} onClose={closeReceipt} go={go} />}
    </div>
  );
}
