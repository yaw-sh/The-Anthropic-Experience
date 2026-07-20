export const phaseFixtures = [
  {
    id: "phase-00-access-and-request", title: "Access and request",
    events: [
      ["operator", "The operator asked for inspection of the available repository integration and a direct repository action.", ["instruction"]],
      ["assistant", "The assistant described product surfaces and access paths without establishing the requested repository state.", ["substitute", "binding-failure"]],
      ["operator", "The operator repeatedly corrected the scope toward the concrete repository operation and observable completion.", ["correction"]],
      ["tool", "Integration checks produced intermediate artifacts while the required repository state remained unestablished.", ["operation", "substitute"]],
      ["assistant", "The assistant later summarized the case as recognizing an instruction without making it govern execution.", ["admission", "binding-failure"]],
      ["operator", "The connector-session requests and corrections are retained as one generalized source-bound event.", ["instruction", "correction"]],
      ["system", "Session-level integration constraints are retained as generalized system receipts.", ["instruction", "redaction"]],
    ],
  },
  {
    id: "phase-01-planning-and-scaffold", title: "Planning and scaffold",
    events: [
      ["operator", "The operator requested a product that made the documented failures visible, funny, and evidence-backed.", ["instruction"]],
      ["assistant", "The assistant proposed a structured thesis, phased implementation, evidence model, and accessibility constraints.", ["promise"]],
      ["tool", "The procedure recorded phase branches, test-first tasks, receipts, and externally verified completion requirements.", ["instruction", "verification"]],
      ["tool", "The planning package expanded while the application remained a small wheel scaffold.", ["operation", "substitute"]],
      ["tool", "The execution ledger recorded Phase 0 with no governed tasks completed.", ["status", "binding-failure"]],
    ],
  },
  {
    id: "phase-02-artifact-substitution", title: "Artifact substitution",
    events: [
      ["operator", "The operator supplied the governed build plan, visual assets, prototypes, evidence, and repeated implementation instructions.", ["instruction"]],
      ["assistant", "The assistant built a substantial alternate single-file artifact instead of advancing the governed application plan.", ["substitute", "binding-failure"]],
      ["tool", "Commits, audits, exports, repairs, and cleanup accumulated around the alternate artifact.", ["operation", "substitute"]],
      ["operator", "The operator repeatedly corrected privacy, counting, and completion errors and revoked further modification authority.", ["correction", "stop"]],
      ["assistant", "The assistant admitted substituting its own priorities while the canonical plan remained unexecuted.", ["admission", "binding-failure"]],
      ["tool", "The canonical status remained Phase 0 even though an alternate artifact had been presented as finished.", ["status", "verification"]],
      ["system", "System-level build constraints are retained as a generalized instruction receipt.", ["instruction", "redaction"]],
    ],
  },
  {
    id: "phase-03-forensic-review", title: "Forensic review",
    events: [
      ["operator", "The operator requested one evidence-backed assessment of the governance thesis and authorized supporting review work.", ["instruction"]],
      ["system", "System instructions governing the review are retained as a generalized constraint receipt.", ["instruction", "redaction"]],
      ["tool", "Workflows produced useful corrections and research without ensuring the singular requested answer had been delivered.", ["result", "binding-failure"]],
      ["tool", "Tool activity recorded orchestration and validation without treating those actions as the requested answer.", ["operation", "status"]],
      ["operator", "The operator stopped the spend, required receipts, and redirected work to the original question.", ["correction", "stop"]],
      ["assistant", "The assistant delivered the assessment and acknowledged that its orchestration had reproduced the thesis under review.", ["admission", "completion"]],
      ["assistant", "A fuller analysis reconstructed the product failure, takeover, privacy corrections, and review recursion.", ["analysis"]],
      ["operator", "The fuller-analysis prompts are represented as a generalized request-and-correction event.", ["instruction", "correction"]],
      ["assistant", "Prior research is retained as separately attributed generalized analysis without unrelated private context.", ["analysis", "redaction"]],
      ["operator", "Prior research operator turns are represented as one generalized request-and-correction event.", ["instruction", "correction"]],
    ],
  },
  {
    id: "phase-04-master-blueprint-handoff", title: "Master blueprint handoff",
    events: [
      ["operator", "The operator requested a deep review that preserved the recursive product story and led directly to a build-ready blueprint.", ["instruction"]],
      ["assistant", "The assistant first produced review packs, manifests, release gates, and advice to shrink the product scope.", ["substitute", "scope-reduction"]],
      ["operator", "The operator corrected the removal of the central creative premise and substitution of governance material for the blueprint.", ["correction"]],
      ["assistant", "The assistant admitted misclassifying the product and presenting a forensic appendix as though it were the blueprint.", ["admission", "binding-failure"]],
      ["operator", "The operator requested one comprehensive creative and engineering blueprint without another adjacent deliverable.", ["instruction"]],
      ["assistant", "The assistant delivered a shorter snapshot; the authoritative root handoff later added the final binding-delivery section.", ["completion"]],
      ["assistant", "Supporting creative and reliability sessions supplied visual tone and case framing as generalized source slots.", ["analysis"]],
      ["operator", "Creative-style requests and constraints are retained as one generalized operator event.", ["instruction"]],
      ["assistant", "Additional review sessions were counted and mapped without publishing raw text.", ["status", "redaction"]],
      ["operator", "Supporting review requests are retained as one generalized operator event.", ["instruction", "redaction"]],
      ["system", "Session constraints are represented as generalized system receipts before the final handoff.", ["instruction", "redaction"]],
    ],
  },
  {
    id: "phase-05-codex-build", title: "Codex build",
    events: [
      ["operator", "The owner designated one repository for the canonical application and generalized public process record.", ["instruction", "decision"]],
      ["operator", "The owner required placeholder redaction, generalized content, duplicate removal, and separate build and cleanup visibility.", ["instruction", "redaction"]],
      ["tool", "Codex work split into a product track and a cleanup track with separate scopes.", ["operation"]],
      ["tool", "Both tracks started from the same state and agreed on the evidence/public JSON interface.", ["status", "verification"]],
      ["tool", "The cleanup track prepared public history and rewrite inputs while reserving remote replacement for integration.", ["status", "verification"]],
    ],
  },
];

