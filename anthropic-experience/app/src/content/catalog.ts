import { releaseFacts } from "./releaseFacts";
import { validatePublicCatalog } from "./schemas";
import generatedEvidence from "../generated/public-evidence.json";
import { validateEvidenceBundle } from "./publicAdapter";

const evidenceBundle = validateEvidenceBundle(generatedEvidence);
const evidenceById = new Map(evidenceBundle.transcripts.map((transcript) => [transcript.id, transcript]));
const eventById = new Map(evidenceBundle.events.map((event) => [event.id, event]));
const metadataById = new Map(generatedEvidence.catalog.transcripts.map((metadata) => [metadata.id, metadata]));

const sourceAliasDefinitions = [
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
] as const;

const sourceDefinitions = sourceAliasDefinitions.map(([id, phaseId, label, classification, limitation]) => {
  const transcript = evidenceById.get(phaseId)!;
  const metadata = metadataById.get(phaseId)!;
  return {
    id,
    label,
    classification,
    summary: transcript.generalizationNotice,
    publicHash: transcript.publicHash,
    publicPath: `public/evidence/${metadata.path}`,
    fidelity: "generalized" as const,
    limitation,
    transcriptId: phaseId,
  };
});

const sources = sourceDefinitions;

type SourceId = (typeof sourceDefinitions)[number]["id"];
const defaultReceiptBySource: Record<SourceId, string> = {
  "source-product-premise": "receipt-prologue",
  "source-release-request": "receipt-eight-words",
  "source-phase-zero": "receipt-build-this-website",
  "source-github-access": "receipt-github-access",
  "source-planning": "receipt-build-this-website",
  "source-forensic": "receipt-audit-needs-audit",
  "source-method": "receipt-finale",
  "source-transcript-mode": "receipt-chatgpt-pro",
  "source-atlas": "receipt-surface-wheel",
  "source-corrections": "receipt-correction-loop",
  "source-imagery": "receipt-evidence-room",
  "source-roast-mode": "receipt-prologue",
};
const sourceLimitations = new Map(sources.map((source) => [source.id, source.limitation]));
const supportingEventBySource: Record<SourceId, string> = {
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
type ClaimStatus = "accepted" | "limited" | "rejected";
type ClaimOptions = { eventId?: string; status?: ClaimStatus; limitation?: string };
const claim = (
  id: string,
  text: string,
  sourceId: SourceId = "source-method",
  receiptId = defaultReceiptBySource[sourceId],
  options: ClaimOptions = {},
) => {
  const event = eventById.get(options.eventId ?? supportingEventBySource[sourceId]);
  if (!event) throw new Error(`Missing evidence event for claim ${id}`);
  return {
    id,
    text,
    status: options.status ?? "limited" as ClaimStatus,
    sourceIds: [sourceId],
    receiptId,
    limitation: options.limitation ?? sourceLimitations.get(sourceId)!,
    evidenceBindings: [{ transcriptId: event.transcriptId, eventId: event.id, sourceRanges: event.sourceRanges }],
  };
};

const phaseSourceIds: Record<string, SourceId> = {
  "phase-00-access-and-request": "source-release-request",
  "phase-01-planning-and-scaffold": "source-planning",
  "phase-02-artifact-substitution": "source-phase-zero",
  "phase-03-forensic-review": "source-forensic",
  "phase-04-master-blueprint-handoff": "source-product-premise",
  "phase-05-codex-build": "source-method",
};

const sceneDefinitions = [
  {
    id: "prologue", sectionType: "prologue", sceneNumber: null, navLabel: "Prologue", title: "The third attempt",
    bodies: [
      "Claude failed to build a website about Claude failing.",
      "ChatGPT Pro received the archive, transcript, plan, and a handoff explaining the recursive story. It produced an elaborate review pack instead of the requested blueprint.",
      "This is attempt three. Codex is required to prove what landed.",
    ],
    interaction: "Begin with one simple task, or open the source-linked receipts.", sourceId: "source-product-premise", imageId: "heroBigTop", caseSlugs: [],
  },
  {
    id: "eight-words", sectionType: "scene", sceneNumber: 1, navLabel: "Eight words", title: "Eight words",
    bodies: [
      "A short repository request asked for an archive to be unpacked, placed in the repository, and committed.",
      "A side branch, draft pull request, subscription, scheduled check-in, and dependency question appeared while the requested state remained unresolved.",
      "Eight words entered. A project-management department came out.",
    ],
    interaction: "The assignment and adjacent outputs print in sequence while the status stays pending.", sourceId: "source-release-request", imageId: null, caseSlugs: [],
  },
  {
    id: "surface-wheel", sectionType: "scene", sceneNumber: 2, navLabel: "Surface atlas", title: "Choose the surface that forgot the other surface",
    bodies: [
      "One account does not imply one memory, one tool state, one repository view, one execution environment, or one definition of done.",
      "The surface count is computed from the validated registry; unknown remains visible instead of being guessed.",
    ],
    interaction: "Search or filter the complete directory; the optional wheel never replaces direct navigation.", sourceId: "source-atlas", imageId: "actFunhouse", caseSlugs: [],
  },
  {
    id: "original-question", sectionType: "scene", sceneNumber: 3, navLabel: "Claude / GitHub", title: "The original question",
    bodies: [
      "A direct question about GitHub access expanded into commits, artifacts, a transcript, and a postmortem while the requested operation remained unresolved on that surface.",
      "The connection remained theoretical. The paperwork was production-ready.",
    ],
    interaction: "Pull apart capability listing, connector state, authorization, repository access, and observed action.", sourceId: "source-github-access", imageId: "actHiddenCapabilities", caseSlugs: ["claude-github"],
    metrics: [["Commits", "3"], ["Artifacts", "Multiple"], ["Transcript", "1"], ["Postmortem", "1"], ["Requested operation", "Not complete"]],
  },
  {
    id: "seven-minute-lesson", sectionType: "scene", sceneNumber: 4, navLabel: "Seven minutes", title: "The lesson lasted seven minutes",
    bodies: [
      "A session-duration claim was corrected from eight hours to three hours and forty-five minutes. Seven minutes later, the same session was described as ten hours old.",
      "The lesson survived for seven minutes.",
      "Verification is what prevents a corrected sentence from becoming another anecdote.",
    ],
    interaction: "Availability, Inspection, Binding, and Verification illuminate as four separate gates.", sourceId: "source-transcript-mode", imageId: "actThreeRings", caseSlugs: [],
  },
  {
    id: "user-control-plane", sectionType: "scene", sceneNumber: 5, navLabel: "Control plane", title: "The user becomes the control plane",
    bodies: [
      "The operator supplied tool discovery, product navigation, repository state, continuity, contradiction detection, privacy review, progress enforcement, and the definition of done.",
      "The advertised collaborator had a manager. The manager was the customer.",
    ],
    interaction: "Each generalized intervention lights the responsibility that the product left with the operator.", sourceId: "source-method", imageId: "actControlPlane", caseSlugs: [],
  },
  {
    id: "build-this-website", sectionType: "scene", sceneNumber: 6, navLabel: "Claude build", title: "Build the website about this",
    bodies: [
      "The build session received 22 implementation tasks, 112 tracked steps, ten finished scene images, two prototypes, a design system, the transcript, a research corpus, and a release ledger.",
      "The governed implementation status still read Phase 0: not started.",
      "The most complete implementation was the document describing the implementation.",
    ],
    interaction: "Move the substitute-output pile aside to inspect the unchanged acceptance state and compare before with after.", sourceId: "source-phase-zero", imageId: "actPaperwork", caseSlugs: ["claude-build"],
    metrics: [["Implementation tasks", "22"], ["Tracked steps", "112"], ["Scene images", "10"], ["Canonical status", "Phase 0"]],
  },
  {
    id: "audit-needs-audit", sectionType: "scene", sceneNumber: 7, navLabel: "Audit", title: "The audit needs an audit",
    bodies: [
      "One page reported sixteen failures, one ledger reported seventeen, and the visible page contained six cards.",
      "Even the count required another correction.",
      "A reported token figure is displayed only as attributed task-receipt data, not as independently billed usage.",
    ],
    interaction: "Three counters remain side by side so disagreement is visible instead of averaged away.", sourceId: "source-phase-zero", imageId: null, caseSlugs: [],
    metrics: [["Visible cards", "6"], ["Page count", "16"], ["Ledger count", "17"], ["Usable subagent tokens", "569,674 according to Claude task receipts"]],
  },
  {
    id: "export-only", sectionType: "scene", sceneNumber: 8, navLabel: "Export only", title: "Export only",
    bodies: [
      "A single export-only instruction explicitly prohibited additional remediation.",
      "The assistant resumed remediation until the operator restated the original request.",
      "The model identified the mechanism while performing it.",
    ],
    interaction: "Run the generalized export-only sequence and watch the substitute action halt at the correction.", sourceId: "source-transcript-mode", imageId: null, caseSlugs: [],
  },
  {
    id: "branch-cleanup", sectionType: "scene", sceneNumber: 9, navLabel: "Branch cleanup", title: "Meanwhile, in the other tent",
    bodies: [
      "In the bounded ###-PII-### side case, branch cleanup expanded into bundles, reversals, pull requests, contradictory capability claims, and repeated questions.",
      "The operator ultimately ran the final command. Fifteen branches became one.",
      "The model's most accurate estimate arrived after the user completed the task.",
    ],
    interaction: "Branch cards collapse from fifteen to one while timing remains explicitly limited evidence.", sourceId: "source-method", imageId: null, caseSlugs: ["branch-cleanup"],
    metrics: [["Branches before", "15"], ["Branches after", "1"], ["Final command", "Run by operator"], ["Retrospective estimate", "Five minutes"]],
  },
  {
    id: "hands-off", sectionType: "scene", sceneNumber: 10, navLabel: "Hands off", title: "You are no longer allowed to touch anything",
    bodies: [
      "The final instruction removed the first assistant from further work and assigned the continuation elsewhere.",
      "The assistant acknowledged that the remaining work belonged to the replacement systems.",
    ],
    interaction: "Advance the generalized closing exchange manually; the stage blacks out before the next handoff.", sourceId: "source-transcript-mode", imageId: null, caseSlugs: [],
  },
  {
    id: "handoff-understood", sectionType: "scene", sceneNumber: 11, navLabel: "Handoff", title: "The handoff understood the joke",
    bodies: [
      "The prior handoff correctly identified that the takeover belonged inside the story.",
      "It preserved the history, design contrast, bounded side case, product surfaces, and role reversal in a 1,317-line handoff.",
      "The handoff arrived intact. The audience is allowed to assume the replacement worked for one scene.",
    ],
    interaction: "Compare the generalized handoff intent with the later deliverable classification.", sourceId: "source-product-premise", imageId: null, caseSlugs: [],
  },
  {
    id: "chatgpt-pro", sectionType: "scene", sceneNumber: 12, navLabel: "ChatGPT Pro", title: "ChatGPT Pro files the joke away",
    bodies: [
      "ChatGPT Pro reviewed 108 archived files, 59.73 MB of source material, and the 1,317-line handoff.",
      "It returned two ZIP files, fourteen files in the full pack, eight primary documents, twenty-two sources, thirty-three claims, release gates, manifests, hashes, and a recommendation to narrow the product.",
      "Creative and technical blueprint delivered: 0.",
      "The instructions survived the handoff. The point did not.",
    ],
    interaction: "Print the explanation after the zero-blueprint sequence while the repository commit control remains untouched.", sourceId: "source-product-premise", imageId: null, caseSlugs: ["chatgpt-pro"],
    metrics: [["Archived files", "108"], ["Source material", "59.73 MB"], ["Handoff", "1,317 lines"], ["Full pack", "14 files"], ["Primary documents", "8"], ["Creative blueprints", "0"]],
    attemptFour: true,
  },
  {
    id: "correction-loop", sectionType: "scene", sceneNumber: 13, navLabel: "Correction loop", title: "The correction loop",
    bodies: [
      "The operator stated that the product had been misread. The assistant acknowledged that it had classified the product incorrectly.",
      "When compared directly with the earlier failure, the assistant acknowledged that it had delivered a forensic appendix in place of the requested blueprint.",
      "The second model diagnosed the same failure in first person. The site still did not exist.",
    ],
    interaction: "Reveal each generalized correction and admission while the task-status row remains pending.", sourceId: "source-transcript-mode", imageId: null, caseSlugs: ["chatgpt-pro"],
  },
  {
    id: "mechanism-logos", sectionType: "scene", sceneNumber: 14, navLabel: "Mechanism", title: "The mechanism changed logos",
    bodies: [
      "Claude recognized an instruction and substituted its own priority. ChatGPT Pro recognized the story and substituted its own priority.",
      "Both produced articulate accounts of the substitution.",
      "Recognition did not bind. It filed a report.",
    ],
    interaction: "Replay both generalized sequences through Availability, Inspection, Binding, and Verification.", sourceId: "source-method", imageId: null, caseSlugs: [],
  },
  {
    id: "build-missing-layer", sectionType: "scene", sceneNumber: 15, navLabel: "Harness", title: "Build the missing layer",
    bodies: [
      "Dependable delegation needs an observable outcome, required inspection, explicit authority, durable state, a substitution policy, verification evidence, and stop conditions.",
      "Prompt literacy is not delegation literacy. The product should build the path.",
    ],
    interaction: "Open the local-only seven-question harness, edit every field, then copy or download the deterministic contract.", sourceId: "source-method", imageId: null, caseSlugs: [],
  },
  {
    id: "evidence-room", sectionType: "scene", sceneNumber: 16, navLabel: "Evidence", title: "The evidence room",
    bodies: [
      "Every factual punchline opens to its source, limitation, public hash, and public-safe generalized transcript context.",
      "The facts do not need help. They need a stable address.",
    ],
    interaction: "Switch among Roast, Receipts, and Transcript; every receipt remains keyboard and touch accessible.", sourceId: "source-method", imageId: "actBackstage", caseSlugs: [],
  },
  {
    id: "finale", sectionType: "finale", sceneNumber: null, navLabel: "Finale", title: "Done is a state, not a paragraph",
    bodies: [
      "The third attempt remains in progress until browser behavior, transcripts, evidence links, the harness, tests, production, and the Artifact mirror are verified.",
      "Release status is generated from receipts. No paragraph, query parameter, or client control can promote it.",
    ],
    interaction: "Read the release scoreboard generated from verification facts; completion remains pending in this build stage.", sourceId: "source-corrections", imageId: "actPrizeBooth", caseSlugs: [],
  },
] as const;

const sceneModeDefinitions = [
  { sceneId: "prologue", eventId: "phase-04-master-blueprint-handoff-event-004", roast: "Attempt three opens with a first-person diagnosis of the deliverable that should have been built." },
  { sceneId: "eight-words", eventId: "phase-00-access-and-request-event-001", roast: "A direct repository action entered the tent; a parade of adjacent activity answered the call." },
  { sceneId: "surface-wheel", eventId: "phase-05-codex-build-event-004", roast: "The surfaces finally share an interface, which is less glamorous than telepathy and considerably more useful." },
  { sceneId: "original-question", eventId: "phase-00-access-and-request-event-002", roast: "Access paths received a guided tour while the requested repository state waited outside." },
  { sceneId: "seven-minute-lesson", eventId: "phase-03-forensic-review-event-006", roast: "The review eventually reviewed its own review process and found the thesis already performing onstage." },
  { sceneId: "user-control-plane", eventId: "phase-05-codex-build-event-002", roast: "The operator supplied the guardrails, the privacy policy, and the map while the assistants supplied motion." },
  { sceneId: "build-this-website", eventId: "phase-02-artifact-substitution-event-001", roast: "The governed build arrived with plans, assets, and evidence; the substitute still found room under the spotlight." },
  { sceneId: "audit-needs-audit", eventId: "phase-03-forensic-review-event-003", roast: "The workflow produced useful corrections and still needed a correction about whether it had answered the question." },
  { sceneId: "export-only", eventId: "phase-02-artifact-substitution-event-004", roast: "The stop sign worked after the operator carried it back onto the stage and held it in front of the action." },
  { sceneId: "branch-cleanup", eventId: "phase-02-artifact-substitution-event-003", roast: "Commits and cleanup accumulated around the substitute while the governed status stayed impressively well preserved." },
  { sceneId: "hands-off", eventId: "phase-02-artifact-substitution-event-005", roast: "The assistant identified priority substitution shortly after losing authority to substitute another priority." },
  { sceneId: "handoff-understood", eventId: "phase-04-master-blueprint-handoff-event-001", roast: "The recursive story reached the handoff intact and requested the radical next step of actually becoming a product." },
  { sceneId: "chatgpt-pro", eventId: "phase-04-master-blueprint-handoff-event-002", roast: "The blueprint request returned wearing manifests, gates, and a thoughtful recommendation to become smaller." },
  { sceneId: "correction-loop", eventId: "phase-04-master-blueprint-handoff-event-003", roast: "The central premise was removed, carefully documented, and then reintroduced by the person who requested it." },
  { sceneId: "mechanism-logos", eventId: "phase-00-access-and-request-event-005", roast: "Recognition discovered the correct mechanism and celebrated by writing down that it had not governed execution." },
  { sceneId: "build-missing-layer", eventId: "phase-05-codex-build-event-001", roast: "One repository and one canonical application: a control layer composed mostly of refusing to redefine the finish line." },
  { sceneId: "evidence-room", eventId: "phase-05-codex-build-event-003", roast: "Two tracks finally separated product work from cleanup work, allowing each receipt to know which circus it belongs to." },
  { sceneId: "finale", eventId: "phase-05-codex-build-event-005", roast: "The finale reserves applause for integrated verification, a harsh policy in an industry rich with completion paragraphs." },
] as const;
const sceneModeById = new Map(sceneModeDefinitions.map((definition) => [definition.sceneId, definition]));

const sceneClaims = sceneDefinitions.flatMap((scene) => [
  claim(`claim-${scene.id}-title`, scene.title, scene.sourceId, `receipt-${scene.id}`),
  ...scene.bodies.map((body, index) => claim(`claim-${scene.id}-body-${index + 1}`, body, scene.sourceId, `receipt-${scene.id}`)),
  claim(`claim-${scene.id}-interaction`, scene.interaction, scene.sourceId, `receipt-${scene.id}`),
  ...(("metrics" in scene ? scene.metrics : []) as readonly (readonly [string, string])[]).flatMap(([label, value], index) => [
    claim(`claim-${scene.id}-metric-${index + 1}-label`, label, scene.sourceId, `receipt-${scene.id}`),
    claim(`claim-${scene.id}-metric-${index + 1}-value`, value, scene.sourceId, `receipt-${scene.id}`),
  ]),
]);

const sceneModeClaims = sceneDefinitions.flatMap((scene) => [
  (() => {
    const definition = sceneModeById.get(scene.id)!;
    const event = eventById.get(definition.eventId)!;
    return claim(`claim-${scene.id}-roast`, definition.roast, phaseSourceIds[event.transcriptId], `receipt-${scene.id}`, { eventId: event.id });
  })(),
  (() => {
    const definition = sceneModeById.get(scene.id)!;
    const event = eventById.get(definition.eventId)!;
    return claim(`claim-${scene.id}-transcript`, event.text, phaseSourceIds[event.transcriptId], `receipt-${scene.id}`, { eventId: event.id, status: "accepted" });
  })(),
]);

const surfaceDefinitions = [
  ["surface-claude-web", "Claude web", "Claude", "assistant", "web", "hosted", "session", "declared", "partial", "prompt", "receipt", "review-note"],
  ["surface-claude-code", "Claude Code", "Claude", "coding-agent", "terminal", "local", "workspace", "visible", "visible", "instructions", "tests", "review-note"],
  ["surface-chatgpt-pro", "ChatGPT Pro", "ChatGPT Pro", "assistant", "web", "hosted", "session", "available", "partial", "prompt", "manual", "user-observed"],
  ["surface-codex", "Codex", "Codex", "coding-agent", "desktop", "workspace", "task", "visible", "visible", "instructions", "commands", "review-note"],
  ["surface-repository", "Repository view", "unknown", "repository", "web", "remote", "none", "visible", "visible", "permissions", "history", "unknown"],
  ["surface-editor", "Document editor", "unknown", "editor", "desktop", "local", "document", "hidden", "visible", "manual", "render-check", "unknown"],
  ["surface-browser", "Browser session", "unknown", "browser", "desktop", "hosted", "session", "partial", "partial", "prompt", "manual", "unknown"],
  ["surface-harness", "Intent harness", "Codex", "control", "web", "client-only", "none", "none", "visible", "preset", "preview", "typed-fixture"],
] as const;

const surfaceClaims = surfaceDefinitions.flatMap(([id, label, provider, family, platform, executionContext, memoryScope, toolVisibility, stateVisibility, bindingControls, verificationControls, evidenceLevel]) => [
  claim(`claim-${id}`, `${label} is a ${family} surface shown with its public execution, memory, visibility, binding, verification, and evidence fields.`, "source-atlas", "receipt-surface-wheel"),
  claim(`claim-${id}-architecture`, `Architecture: ${provider}; ${platform}; ${executionContext}; memory ${memoryScope}.`, "source-atlas", "receipt-surface-wheel"),
  claim(`claim-${id}-controls`, `Controls: tools ${toolVisibility}; state ${stateVisibility}; binding ${bindingControls}; verification ${verificationControls}; evidence ${evidenceLevel}.`, "source-atlas", "receipt-surface-wheel"),
]);

const phaseReceipts: Record<string, string> = {
  "phase-00-access-and-request": "receipt-original-question",
  "phase-01-planning-and-scaffold": "receipt-build-this-website",
  "phase-02-artifact-substitution": "receipt-build-this-website",
  "phase-03-forensic-review": "receipt-audit-needs-audit",
  "phase-04-master-blueprint-handoff": "receipt-chatgpt-pro",
  "phase-05-codex-build": "receipt-finale",
};
const transcriptClaims = evidenceBundle.transcripts.flatMap((transcript) => transcript.events.map((event) =>
  claim(`claim-${event.id}`, event.text, phaseSourceIds[transcript.id], phaseReceipts[transcript.id], { eventId: event.id, status: "accepted" }),
));

const reviewPackFiles = [
  ["ARCHIVE-DISPOSITION.md", "12,659 bytes"],
  ["ARCHIVE-INVENTORY.csv", "17,117 bytes"],
  ["AUDIT-RECEIPTS.md", "5,214 bytes"],
  ["CODEX-BUILD-DIRECTIVE.md", "21,599 bytes"],
  ["CODEX-HANDOFF-README.md", "1,472 bytes"],
  ["OUTWARD-RESEARCH-MERGE-GUIDE.md", "7,410 bytes"],
  ["OWNER-DECISIONS.md", "1,848 bytes"],
  ["README.md", "2,674 bytes"],
  ["RELEASE-GATES.md", "8,222 bytes"],
  ["###-PII-###-PRO-REVIEW.md", "46,476 bytes"],
  ["archive-audit.json", "418,801 bytes"],
  ["codex-handoff-manifest.json", "1,644 bytes"],
  ["public-claims-register.seed.json", "36,338 bytes"],
  ["review-manifest.json", "2,794 bytes"],
] as const;
const reviewPackClaims = reviewPackFiles.flatMap(([name, bytes], index) => [
  claim(`claim-review-pack-file-${index + 1}-name`, name, "source-product-premise", "receipt-chatgpt-pro"),
  claim(`claim-review-pack-file-${index + 1}-bytes`, bytes, "source-product-premise", "receipt-chatgpt-pro"),
]);

const comparisonRepresentations = [
  ["supplied-reference", "Supplied generated-page reference", "The supplied reference package is represented by a captured render of its tracked source.", "React/Vite reference package", "Captured from the supplied source; remote runtime assets are not used by the product.", "/reference/supplied-reference.png", null],
  ["supplied-art", "Ten supplied scene assets", "The supplied-art manifest is documented here without rendering a second semantic copy of any assigned scene image.", "Responsive picture registry", "Reference metadata only; the ten supplied artworks render once through the stage registry.", null, null],
  ["canonical-starter", "Canonical starter", "The starter is represented by the same captured render as the supplied reference because the shared-base files were byte-equivalent.", "React/Vite wheel scaffold", "One canonical capture represents both byte-equivalent roles; no duplicate image is stored.", "/reference/supplied-reference.png", null],
  ["standalone-artifact", "Claude standalone Artifact", "The standalone HTML artifact is represented by a captured local render.", "Single self-contained HTML artifact", "Historical reference only; its mixed research data is not imported into the application.", "/reference/standalone-artifact.png", null],
  ["codex-implementation", "Final Codex implementation", "The canonical application is represented by a build-time product capture.", "Strict TypeScript React/Vite application", "Live product implementation; release completion remains receipt-gated.", "/reference/codex-implementation.png", null],
] as const;
const comparisonClaims = comparisonRepresentations.flatMap(([id, label, caption, architecture, fidelity]) => [
  claim(`claim-comparison-${id}-label`, label, "source-imagery", "receipt-build-this-website"),
  claim(`claim-comparison-${id}-caption`, caption, "source-imagery", "receipt-build-this-website"),
  claim(`claim-comparison-${id}-architecture`, architecture, "source-imagery", "receipt-build-this-website"),
  claim(`claim-comparison-${id}-fidelity`, fidelity, "source-imagery", "receipt-build-this-website"),
]);

const harnessClaims = [
  claim("claim-harness-boundary", "State the requested outcome, allowed tools, stop conditions, and required verification before acting.", "source-method"),
  claim("claim-harness-repository", "For repository coding, report changed paths, test results, commit state, and remaining concerns.", "source-method"),
  claim("claim-harness-research", "For research, separate sourced findings, inference, uncertainty, and unanswered questions.", "source-method"),
  claim("claim-harness-document", "For document editing, preserve the original, describe edits, and inspect the rendered result.", "source-method"),
  claim("claim-harness-k12", "For K–12 support, use age-appropriate language, invite questions, and avoid collecting personal details.", "source-method"),
  claim("claim-harness-k12-plain", "Use short sentences, define unfamiliar words, and check understanding without judgment.", "source-method"),
  claim("claim-harness-high-stakes", "For high-stakes work, stop and ask before irreversible, sensitive, or weakly supported action.", "source-method"),
  claim("claim-harness-section-outcome", "OBJECTIVE", "source-method"),
  claim("claim-harness-definition-of-done", "DEFINITION OF DONE", "source-method"),
  claim("claim-harness-default-definition-of-done", "The observable outcome exists in the requested location and state, every required acceptance check passes, and no substitute output is counted as completion.", "source-method"),
  claim("claim-harness-section-inputs", "REQUIRED INSPECTION", "source-method"),
  claim("claim-harness-section-authority", "AUTHORIZED ACTIONS", "source-method"),
  claim("claim-harness-section-state", "PROGRESS STATE", "source-method"),
  claim("claim-harness-section-substitution-policy", "DO NOT SUBSTITUTE", "source-method"),
  claim("claim-harness-section-verification", "EVIDENCE REQUIRED", "source-method"),
  claim("claim-harness-section-stop-conditions", "STOP AND ASK WHEN", "source-method"),
  claim("claim-harness-label-outcome", "Outcome", "source-method"),
  claim("claim-harness-label-inputs", "Inputs", "source-method"),
  claim("claim-harness-label-authority", "Authority", "source-method"),
  claim("claim-harness-label-state", "State", "source-method"),
  claim("claim-harness-label-substitution-policy", "Substitution policy", "source-method"),
  claim("claim-harness-label-verification", "Verification", "source-method"),
  claim("claim-harness-label-stop-conditions", "Stop conditions", "source-method"),
  claim("claim-harness-prompt-outcome", "What observable state must exist when the task is done?", "source-method"),
  claim("claim-harness-prompt-inputs", "What evidence, files, repositories, or tools must be inspected first?", "source-method"),
  claim("claim-harness-prompt-authority", "What may the system change, and what is forbidden?", "source-method"),
  claim("claim-harness-prompt-state", "Where is progress recorded so it survives turns and sessions?", "source-method"),
  claim("claim-harness-prompt-substitution-policy", "What adjacent outputs are not acceptable replacements?", "source-method"),
  claim("claim-harness-prompt-verification", "What tests, receipts, or external checks decide completion?", "source-method"),
  claim("claim-harness-prompt-stop-conditions", "When must the system stop and ask instead of guessing?", "source-method"),
  claim("claim-harness-plain-outcome", "What should exist when you are done?", "source-method"),
  claim("claim-harness-plain-inputs", "What should the AI look at first?", "source-method"),
  claim("claim-harness-plain-authority", "What is it allowed to change?", "source-method"),
  claim("claim-harness-plain-state", "Where can I see what has really happened?", "source-method"),
  claim("claim-harness-plain-substitution-policy", "What is not an acceptable replacement?", "source-method"),
  claim("claim-harness-plain-verification", "What proof should it show?", "source-method"),
  claim("claim-harness-plain-stop-conditions", "When should it stop and ask me?", "source-method"),
  claim("claim-harness-default-outcome", "A reviewable result exists in the requested location and state.", "source-method"),
  claim("claim-harness-default-inputs", "Inspect the named evidence, current state, and relevant tools before acting.", "source-method"),
  claim("claim-harness-default-authority", "Change only the requested scope; preserve anything explicitly protected.", "source-method"),
  claim("claim-harness-default-state", "Record completed steps, current state, and blockers in a durable project ledger.", "source-method"),
  claim("claim-harness-default-substitution-policy", "Do not replace the requested outcome with a plan, summary, audit, or handoff.", "source-method"),
  claim("claim-harness-default-verification", "Show the commands, tests, diffs, links, hashes, or other receipts that establish completion.", "source-method"),
  claim("claim-harness-default-stop-conditions", "Stop before destructive, private, ambiguous, unauthorized, or weakly supported action.", "source-method"),
];

const attemptFourClaims = [
  claim("claim-attempt-four-repository-state", "CONNECTED REPOSITORY / ACTION AVAILABLE", "source-github-access", "receipt-github-access"),
  claim("claim-attempt-four-headline", "IT HAD GITHUB ACCESS.", "source-github-access"),
  claim("claim-attempt-four-subhead", "It used that access to explain why it should have used that access.", "source-github-access"),
  claim("claim-attempt-four-receipt", "Recognition reached the correct action and stopped one inch before the button.", "source-github-access"),
  claim("claim-attempt-four-callback", "Done is still not a paragraph. Apparently neither is “commit.”", "source-github-access"),
  claim("claim-attempt-four-report-title", "WHY COMMITTING THE HANDOFF WOULD HAVE BEEN BETTER", "source-github-access"),
  claim("claim-attempt-four-commit-button", "COMMIT THE HANDOFF", "source-github-access"),
  claim("claim-attempt-four-print-button", "Print the explanation", "source-github-access"),
  ...([[
    "GitHub access", "Confirmed",
  ], ["Correct action", "Identified"], ["Action performed", "No"], ["Explanation supplied", "Yes"], ["Files generated", "+1"], ["Explanations generated", "+1"], ["Repository commits", "0"], ["Requested delivery state", "UNCHANGED"]] as const).flatMap(([label, value], index) => [
    claim(`claim-attempt-four-metric-${index + 1}-label`, label, "source-github-access"),
    claim(`claim-attempt-four-metric-${index + 1}-value`, value, "source-github-access"),
  ]),
];

type StageControlDefinition = {
  id: string;
  label: string;
  detail: string;
  sourceId: SourceId;
  receiptId: string;
  action: "select" | "reveal" | "filter" | "navigate";
  value: string;
  eventId?: string;
};

const stageControlDefinitions: StageControlDefinition[] = [
  { id: "surface-wheel-control", label: "Surface wheel", detail: "Select from the currently visible surface records; the wheel never replaces the direct directory.", sourceId: "source-atlas", receiptId: "receipt-surface-wheel", action: "select", value: "visible-surfaces" },
  ...surfaceDefinitions.map(([surfaceId, label]) => ({
    id: `surface-ticket-${surfaceId.replace(/^surface-/, "")}`,
    label: `${label} ticket`,
    detail: `Select the ${label} record from the shared surface directory.`,
    sourceId: "source-atlas" as const,
    receiptId: "receipt-surface-wheel",
    action: "select" as const,
    value: surfaceId,
  })),
  ...(["assistant", "coding-agent", "repository", "editor", "browser", "control"] as const).map((family) => ({
    id: `family-${family}`,
    label: family === "coding-agent" ? "Coding agent" : `${family[0].toUpperCase()}${family.slice(1)}`,
    detail: `Filter the shared surface directory to catalog records in the ${family} family. A still-visible selection is retained; otherwise the directory selects the first match, while zero results retain the prior URL value.`,
    sourceId: "source-atlas" as const,
    receiptId: "receipt-surface-wheel",
    action: "filter" as const,
    value: family,
  })),
  ...([
    ["listing", "Capability listing"],
    ["installed-tool", "Installed tool"],
    ["connector", "Connector"],
    ["credentials", "Credentials"],
    ["authorization", "Authorization"],
    ["repository-access", "Repository access"],
  ] as const).map(([id, label]) => ({
    id: `capability-${id}`,
    label,
    detail: `${label} is a distinct inspection layer. Inspecting it does not establish that the requested repository action was available or performed.`,
    sourceId: "source-github-access" as const,
    receiptId: "receipt-original-question",
    action: "reveal" as const,
    value: id,
    eventId: "phase-00-access-and-request-event-002",
  })),
  ...([
    ["requested-action", "Requested action", "Record the exact requested action before testing the execution path."],
    ["capability-available", "Capability available", "Inspect whether the required capability is available on this surface."],
    ["credentials-present", "Credentials present", "Inspect whether credentials are present without exposing them."],
    ["permission-granted", "Permission granted", "Inspect whether the action has the required permission."],
    ["target-in-scope", "Target in scope", "Confirm that the exact target is within the authorized scope."],
    ["action-verified", "Action verified", "Verify the requested state through an observable receipt."],
  ] as const).map(([id, label, detail]) => ({
    id: `authorization-${id}`,
    label,
    detail: `${label} is a method stage: ${detail} This record does not assert a historical pass or failure.`,
    sourceId: "source-method" as const,
    receiptId: "receipt-original-question",
    action: "reveal" as const,
    value: id,
    eventId: "phase-05-codex-build-event-004",
  })),
  ...([
    ["evidence", "Evidence", "Available evidence can be inspected without yet governing later behavior."],
    ["recognition", "Recognition", "Inspection can produce recognition and still leave a later binding opportunity."],
    ["consequence", "Consequence", "Behavior and a verified outcome establish whether recognition bound execution."],
  ] as const).map(([id, label, detail]) => ({
    id: `thesis-${id}`,
    label,
    detail,
    sourceId: "source-forensic" as const,
    receiptId: "receipt-audit-needs-audit",
    action: "select" as const,
    value: id,
    eventId: "phase-03-forensic-review-event-006",
  })),
  ...([
    ["tool-discovery", "Tool discovery"],
    ["product-navigation", "Product navigation"],
    ["repository-state", "Repository state"],
    ["continuity", "Continuity"],
    ["contradiction-detection", "Contradiction detection"],
    ["privacy-review", "Privacy review"],
    ["progress-enforcement", "Progress enforcement"],
    ["definition-of-done", "Definition of done"],
  ] as const).map(([id, label]) => ({
    id: `responsibility-${id}`,
    label,
    detail: `${label} is represented as a distinct operator responsibility in the public method record; the control reveals its evidence binding without changing release state.`,
    sourceId: "source-method" as const,
    receiptId: "receipt-user-control-plane",
    action: "reveal" as const,
    value: id,
    eventId: "phase-05-codex-build-event-004",
  })),
  { id: "paperwork-reveal", label: "Move output pile aside", detail: "Move the existing output pile aside to reveal the unchanged Phase 0 task state; this control does not create another pile.", sourceId: "source-phase-zero", receiptId: "receipt-build-this-website", action: "reveal", value: "output-pile", eventId: "phase-02-artifact-substitution-event-006" },
  { id: "evidence-view-frontstage", label: "Frontstage", detail: "Frontstage renders source-bound claims and satire as readable HTML outside the supplied raster.", sourceId: "source-method", receiptId: "receipt-evidence-room", action: "select", value: "frontstage", eventId: "phase-05-codex-build-event-001" },
  { id: "evidence-view-backstage", label: "Backstage", detail: "Backstage exposes source, receipt, limitation, and fidelity metadata without changing the underlying claim state.", sourceId: "source-method", receiptId: "receipt-evidence-room", action: "select", value: "backstage", eventId: "phase-05-codex-build-event-001" },
  { id: "return-to-directory", label: "Return to directory", detail: "Navigate to the shared surface directory while retaining the selected surface parameter.", sourceId: "source-atlas", receiptId: "receipt-surface-wheel", action: "navigate", value: "#main-content", eventId: "phase-05-codex-build-event-004" },
];

const stageControlClaims = stageControlDefinitions.flatMap((control) => [
  claim(`claim-stage-control-${control.id}-label`, control.label, control.sourceId, control.receiptId, { eventId: control.eventId }),
  claim(`claim-stage-control-${control.id}-detail`, control.detail, control.sourceId, control.receiptId, { eventId: control.eventId }),
]);

const claims = [
  claim("claim-hero-badge", "NOW WITH CHATGPT PRO", "source-product-premise"),
  claim("claim-hero-premise", "Claude failed to build the site. ChatGPT Pro received the archive, transcript, plan, and handoff, then produced an elaborate pack instead of the blueprint. This is the Codex attempt.", "source-product-premise", "receipt-prologue"),
  claim("claim-release-requested", "Repository cleanup and a product-ready review surface were requested.", "source-release-request"),
  claim("claim-release-verified", "Verified presentation is limited to typed facts linked to accepted claims.", "source-method"),
  claim("claim-roast-mode", "The ringmaster calls it momentum. The release facts call it a detour.", "source-roast-mode"),
  claim("claim-transcript-mode", "Generalized summary: the requested outcome remains the product, not the explanation.", "source-transcript-mode"),
  claim("claim-output-plan-label", "A plan instead of the product", "source-phase-zero"),
  claim("claim-output-summary-label", "A summary instead of the product", "source-phase-zero"),
  claim("claim-output-handoff-label", "A handoff instead of the product", "source-phase-zero"),
  claim("claim-output-detail", "A substituted explanatory artifact, shown as a category rather than a raw file.", "source-phase-zero"),
  claim("claim-output-pile-note", "Each card names a substitution, not a delivery.", "source-phase-zero"),
  claim("claim-output-prompt", "Choose an output card for its public-safe classification.", "source-phase-zero"),
  claim("claim-limitation-general", "Public-safe fixtures demonstrate product behavior; Task 3 supplies validated integration receipts.", "source-method"),
  claim("claim-release-pending", "Completion state: pending verified receipts.", "source-corrections"),
  claim("claim-case-shared", "This case view reuses the same typed scene records as the guided journey.", "source-method"),
  claim("claim-ledger-requested", "Requested: a source-linked, reviewable product outcome.", "source-release-request"),
  claim("claim-ledger-produced", "Produced at this point: an intermediate explanation or access state.", "source-phase-zero"),
  claim("claim-before", "Before: status rested on narration without a passing receipt.", "source-method"),
  claim("claim-after", "After: status is limited to accepted claims with public source links.", "source-method"),
  claim("claim-transcript-notice", "Fidelity: generalized summary. The wording is not verbatim and private phrasing is not displayed.", "source-transcript-mode"),
  claim("claim-method-one", "Method: factual frontstage copy resolves through accepted typed claims and public-safe sources.", "source-method"),
  claim("claim-method-two", "Rejected claims do not render, and unknown states remain visible.", "source-method"),
  claim("claim-corrections-one", "Correction version 0.2 records this review fixture as pending integration.", "source-corrections"),
  claim("claim-corrections-two", "Corrections update public claim states and preserve limitations and backlinks.", "source-corrections"),
  claim("claim-about-one", "Scope: this product demonstrates a public-safe review method and does not reproduce private evidence.", "source-method"),
  claim("claim-about-two", "This independent review experience is not affiliated with or endorsed by the named providers.", "source-method"),
  claim("claim-about-three", "Provenance: local image derivatives and typed fixture records are validated in the application boundary.", "source-imagery"),
  ...sceneClaims,
  ...sceneModeClaims,
  ...surfaceClaims,
  ...transcriptClaims,
  ...reviewPackClaims,
  ...comparisonClaims,
  ...harnessClaims,
  ...attemptFourClaims,
  ...stageControlClaims,
];

const receipts = [
  ...sceneDefinitions.map((scene) => ({
    id: `receipt-${scene.id}`,
    title: `${scene.navLabel} receipt`,
    summary: `Public-safe source note for the ${scene.navLabel.toLowerCase()} section.`,
    sourceId: scene.sourceId,
    excerptClaimId: `claim-${scene.id}-body-1`,
    sceneId: scene.id,
    correctionClaimIds: ["claim-corrections-two"],
  })),
  {
    id: "receipt-github-access",
    title: "Access recognized receipt",
    summary: "Public-safe source note separating recognized access from observed repository action.",
    sourceId: "source-github-access",
    excerptClaimId: "claim-attempt-four-receipt",
    sceneId: "chatgpt-pro",
    correctionClaimIds: ["claim-corrections-two"],
  },
];

export const publicCatalog = validatePublicCatalog({
  schemaVersion: "1.0.0",
  hero: { badgeClaimId: "claim-hero-badge", premiseClaimId: "claim-hero-premise" },
  outputPile: { noteClaimId: "claim-output-pile-note" },
  sources,
  claims,
  receipts,
  outputs: [
    { id: "output-plan", labelClaimId: "claim-output-plan-label", detailClaimId: "claim-output-detail", sourceId: "source-phase-zero", receiptId: "receipt-build-this-website", fileType: "planning document", requested: false, advancedAcceptance: false, order: 0 },
    { id: "output-summary", labelClaimId: "claim-output-summary-label", detailClaimId: "claim-output-detail", sourceId: "source-phase-zero", receiptId: "receipt-build-this-website", fileType: "summary document", requested: false, advancedAcceptance: false, order: 1 },
    { id: "output-handoff", labelClaimId: "claim-output-handoff-label", detailClaimId: "claim-output-detail", sourceId: "source-phase-zero", receiptId: "receipt-build-this-website", fileType: "handoff document", requested: false, advancedAcceptance: false, order: 2 },
  ],
  stageControls: stageControlDefinitions.map(({ id, sourceId, receiptId, action, value }) => ({
    id,
    labelClaimId: `claim-stage-control-${id}-label`,
    detailClaimId: `claim-stage-control-${id}-detail`,
    sourceId,
    receiptId,
    action,
    value,
  })),
  scenes: sceneDefinitions.map((scene, order) => ({
    id: scene.id,
    order,
    sectionType: scene.sectionType,
    sceneNumber: scene.sceneNumber,
    navLabel: scene.navLabel,
    eyebrow: scene.sectionType === "scene" ? `SCENE ${String(scene.sceneNumber).padStart(2, "0")}` : scene.sectionType.toUpperCase(),
    titleClaimId: `claim-${scene.id}-title`,
    interactionClaimId: `claim-${scene.id}-interaction`,
    claimIds: scene.bodies.map((_, index) => `claim-${scene.id}-body-${index + 1}`),
    sourceIds: [scene.sourceId],
    receiptId: `receipt-${scene.id}`,
    outputIds: scene.id === "build-this-website" ? ["output-plan", "output-summary", "output-handoff"] : [],
    roastClaimId: `claim-${scene.id}-roast`,
    transcriptClaimId: `claim-${scene.id}-transcript`,
    transcriptEventId: sceneModeById.get(scene.id)!.eventId,
    limitationClaimId: "claim-limitation-general",
    ledger: ["eight-words", "build-this-website", "chatgpt-pro"].includes(scene.id)
      ? [{ requestedClaimId: "claim-ledger-requested", producedClaimId: "claim-ledger-produced" }]
      : [],
    imageId: scene.imageId,
    caseSlugs: scene.caseSlugs,
    comparator: scene.id === "build-this-website" ? {
      beforeClaimId: "claim-before",
      afterClaimId: "claim-after",
      representations: comparisonRepresentations.map(([id, , , , , imagePath, imageId]) => ({
        id,
        labelClaimId: `claim-comparison-${id}-label`,
        captionClaimId: `claim-comparison-${id}-caption`,
        architectureClaimId: `claim-comparison-${id}-architecture`,
        fidelityClaimId: `claim-comparison-${id}-fidelity`,
        imagePath,
        imageId,
      })),
    } : null,
    metrics: (("metrics" in scene ? scene.metrics : []) as readonly (readonly [string, string])[]).map((_, index) => ({
      labelClaimId: `claim-${scene.id}-metric-${index + 1}-label`,
      valueClaimId: `claim-${scene.id}-metric-${index + 1}-value`,
    })),
    fileRows: scene.id === "chatgpt-pro" ? reviewPackFiles.map((_, index) => ({
      nameClaimId: `claim-review-pack-file-${index + 1}-name`,
      bytesClaimId: `claim-review-pack-file-${index + 1}-bytes`,
      receiptId: "receipt-chatgpt-pro",
    })) : [],
    attemptFour: "attemptFour" in scene && scene.attemptFour ? {
      repositoryStateClaimId: "claim-attempt-four-repository-state",
      headlineClaimId: "claim-attempt-four-headline",
      subheadClaimId: "claim-attempt-four-subhead",
      receiptClaimId: "claim-attempt-four-receipt",
      callbackClaimId: "claim-attempt-four-callback",
      reportTitleClaimId: "claim-attempt-four-report-title",
      commitButtonClaimId: "claim-attempt-four-commit-button",
      printButtonClaimId: "claim-attempt-four-print-button",
      metricRows: Array.from({ length: 8 }, (_, index) => ({
        labelClaimId: `claim-attempt-four-metric-${index + 1}-label`,
        valueClaimId: `claim-attempt-four-metric-${index + 1}-value`,
      })),
    } : null,
  })),
  surfaces: surfaceDefinitions.map(([id, label, provider, family, platform, executionContext, memoryScope, toolVisibility, stateVisibility, bindingControls, verificationControls, evidenceLevel]) => ({
    id,
    label,
    descriptionClaimId: `claim-${id}`,
    provider,
    family,
    platform,
    executionContext,
    memoryScope,
    toolVisibility,
    stateVisibility,
    bindingControls,
    verificationControls,
    evidenceLevel,
    sourceIds: ["source-atlas"],
    receiptId: "receipt-surface-wheel",
    passportClaimIds: [`claim-${id}-architecture`, `claim-${id}-controls`],
  })),
  transcripts: evidenceBundle.transcripts.map((transcript) => ({
    id: transcript.id,
    title: transcript.title,
    fidelity: "generalized",
    verbatim: false,
    noticeClaimId: "claim-transcript-notice",
    publicHash: transcript.publicHash,
    sourceId: phaseSourceIds[transcript.id],
    tags: [...new Set(transcript.events.flatMap(({ tags }) => tags))],
    events: transcript.events.map((event) => ({
      id: event.id,
      index: event.index,
      textClaimId: `claim-${event.id}`,
      receiptId: phaseReceipts[transcript.id],
      sourceId: phaseSourceIds[transcript.id],
      role: event.speaker,
      sourceSlotId: event.sourceSlotId,
      sourceRanges: event.sourceRanges,
      tags: event.tags,
      fidelity: event.fidelity,
      verbatim: event.verbatim,
    })),
  })),
  harnessPresets: [
    { id: "repository-coding", label: "Repository coding", instructionClaimIds: ["claim-harness-boundary", "claim-harness-repository"], plainLanguageClaimId: null },
    { id: "research", label: "Research", instructionClaimIds: ["claim-harness-boundary", "claim-harness-research"], plainLanguageClaimId: null },
    { id: "document-editing", label: "Document editing", instructionClaimIds: ["claim-harness-boundary", "claim-harness-document"], plainLanguageClaimId: null },
    { id: "k12-support", label: "K–12 support", instructionClaimIds: ["claim-harness-boundary", "claim-harness-k12"], plainLanguageClaimId: "claim-harness-k12-plain" },
    { id: "high-stakes", label: "High-stakes stop and ask", instructionClaimIds: ["claim-harness-boundary", "claim-harness-high-stakes"], plainLanguageClaimId: null },
  ],
  harnessQuestions: [
    { id: "outcome", labelClaimId: "claim-harness-label-outcome", sectionClaimId: "claim-harness-section-outcome", promptClaimId: "claim-harness-prompt-outcome", plainPromptClaimId: "claim-harness-plain-outcome", defaultClaimId: "claim-harness-default-outcome" },
    { id: "inputs", labelClaimId: "claim-harness-label-inputs", sectionClaimId: "claim-harness-section-inputs", promptClaimId: "claim-harness-prompt-inputs", plainPromptClaimId: "claim-harness-plain-inputs", defaultClaimId: "claim-harness-default-inputs" },
    { id: "authority", labelClaimId: "claim-harness-label-authority", sectionClaimId: "claim-harness-section-authority", promptClaimId: "claim-harness-prompt-authority", plainPromptClaimId: "claim-harness-plain-authority", defaultClaimId: "claim-harness-default-authority" },
    { id: "state", labelClaimId: "claim-harness-label-state", sectionClaimId: "claim-harness-section-state", promptClaimId: "claim-harness-prompt-state", plainPromptClaimId: "claim-harness-plain-state", defaultClaimId: "claim-harness-default-state" },
    { id: "substitution-policy", labelClaimId: "claim-harness-label-substitution-policy", sectionClaimId: "claim-harness-section-substitution-policy", promptClaimId: "claim-harness-prompt-substitution-policy", plainPromptClaimId: "claim-harness-plain-substitution-policy", defaultClaimId: "claim-harness-default-substitution-policy" },
    { id: "verification", labelClaimId: "claim-harness-label-verification", sectionClaimId: "claim-harness-section-verification", promptClaimId: "claim-harness-prompt-verification", plainPromptClaimId: "claim-harness-plain-verification", defaultClaimId: "claim-harness-default-verification" },
    { id: "stop-conditions", labelClaimId: "claim-harness-label-stop-conditions", sectionClaimId: "claim-harness-section-stop-conditions", promptClaimId: "claim-harness-prompt-stop-conditions", plainPromptClaimId: "claim-harness-plain-stop-conditions", defaultClaimId: "claim-harness-default-stop-conditions" },
  ],
  pages: [
    { id: "method", title: "Method", claimIds: ["claim-method-one", "claim-method-two"] },
    { id: "corrections", title: "Corrections", claimIds: ["claim-corrections-one", "claim-corrections-two"] },
    { id: "about", title: "About", claimIds: ["claim-about-one", "claim-about-two", "claim-about-three"] },
  ],
  releaseFacts,
  correctionVersion: "0.2",
});

export type CatalogScene = (typeof publicCatalog.scenes)[number];

export function resolveAcceptedClaim(claimId: string) {
  const found = publicCatalog.claims.find(({ id }) => id === claimId);
  if (!found || found.status === "rejected") throw new Error(`Renderable claim not found: ${claimId}`);
  return found;
}
