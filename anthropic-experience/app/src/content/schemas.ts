import { z } from "zod";

export const modeSchema = z.enum(["roast", "receipts", "transcript"]);
export type ExperienceMode = z.infer<typeof modeSchema>;

export const releaseStatusSchema = z.enum(["requested", "substituted", "pending", "verified"]);
export const releaseFactSchema = z.object({
  id: z.string().min(1),
  label: z.string().min(1),
  status: releaseStatusSchema,
  claimId: z.string().min(1),
  receiptId: z.string().min(1),
  evidence: z.array(z.string().min(1)),
});
export type ReleaseFact = z.infer<typeof releaseFactSchema>;

const sourceSchema = z.object({
  id: z.string().min(1),
  label: z.string().min(1),
  classification: z.enum([
    "receipt",
    "transcript",
    "official-source",
    "user-observed",
    "analysis",
    "unknown",
    "satire",
  ]),
  summary: z.string().min(1),
  publicPath: z.string().min(1),
  fidelity: z.enum(["generalized", "public-safe excerpt", "generated receipt"]),
  publicHash: z.string().regex(/^[a-f0-9]{64}$/),
  limitation: z.string().min(1),
  transcriptId: z.string().min(1),
});

const sourceRangeSchema = z.object({
  start: z.number().int().positive(),
  end: z.number().int().positive(),
  sourceRole: z.enum(["operator", "assistant", "system", "tool"]),
  sourceRoleStart: z.number().int().positive(),
  sourceRoleEnd: z.number().int().positive(),
  sourceSlotId: z.string().min(1),
});

const claimSchema = z.object({
  id: z.string().min(1),
  text: z.string().min(1),
  status: z.enum(["accepted", "limited", "rejected"]),
  sourceIds: z.array(z.string().min(1)).min(1),
  receiptId: z.string().min(1),
  limitation: z.string().min(1),
  evidenceBindings: z.array(z.object({
    transcriptId: z.string().min(1),
    eventId: z.string().min(1),
    sourceRanges: z.array(sourceRangeSchema).min(1),
  })).min(1),
});

const receiptSchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1),
  summary: z.string().min(1),
  sourceId: z.string().min(1),
  excerptClaimId: z.string().min(1),
  sceneId: z.string().min(1),
  correctionClaimIds: z.array(z.string().min(1)),
});

const outputSchema = z.object({
  id: z.string().min(1),
  labelClaimId: z.string().min(1),
  detailClaimId: z.string().min(1),
  sourceId: z.string().min(1),
  receiptId: z.string().min(1),
  fileType: z.string().min(1),
  requested: z.boolean(),
  advancedAcceptance: z.boolean(),
  order: z.number().int().nonnegative(),
});

const stageControlSchema = z.object({
  id: z.string().min(1),
  labelClaimId: z.string().min(1),
  detailClaimId: z.string().min(1),
  sourceId: z.string().min(1),
  receiptId: z.string().min(1),
  action: z.enum(["select", "reveal", "filter", "navigate"]),
  value: z.string().min(1),
});

export const stageSlotSchema = z.object({
  id: z.string().min(1),
  controlId: z.string().min(1),
  x: z.number().min(0).max(100),
  y: z.number().min(0).max(100),
  width: z.number().positive().max(100),
  height: z.number().positive().max(100),
}).superRefine((slot, context) => {
  if (slot.x + slot.width > 100) {
    context.addIssue({ code: z.ZodIssueCode.custom, message: `Stage slot x + width exceeds 100: ${slot.id}` });
  }
  if (slot.y + slot.height > 100) {
    context.addIssue({ code: z.ZodIssueCode.custom, message: `Stage slot y + height exceeds 100: ${slot.id}` });
  }
});

export const stageLayoutSchema = z.object({
  id: z.string().min(1),
  sceneId: z.string().min(1),
  imageId: z.string().min(1),
  kind: z.enum([
    "directory", "static", "families", "capabilities", "authorization",
    "thesis", "responsibilities", "paperwork", "evidence", "finale",
  ]),
  slots: z.array(stageSlotSchema),
  mobilePresentation: z.enum(["none", "horizontal", "stacked"]),
});

export const stageLayoutRegistrySchema = z.array(stageLayoutSchema).length(10).superRefine((layouts, context) => {
  const duplicate = (values: string[]) => values.find((value, index) => values.indexOf(value) !== index);
  const layoutDuplicate = duplicate(layouts.map(({ id }) => id));
  if (layoutDuplicate) context.addIssue({ code: z.ZodIssueCode.custom, message: `Duplicate layout ID: ${layoutDuplicate}` });
  const slots = layouts.flatMap(({ slots }) => slots);
  const slotDuplicate = duplicate(slots.map(({ id }) => id));
  if (slotDuplicate) context.addIssue({ code: z.ZodIssueCode.custom, message: `Duplicate slot ID: ${slotDuplicate}` });
  const controlDuplicate = duplicate(slots.map(({ controlId }) => controlId));
  if (controlDuplicate) context.addIssue({ code: z.ZodIssueCode.custom, message: `Duplicate global control ID: ${controlDuplicate}` });
  if (slots.length !== 42) context.addIssue({ code: z.ZodIssueCode.custom, message: `Expected 42 stage slots; received ${slots.length}` });
});

export type StageSlot = z.infer<typeof stageSlotSchema>;
export type StageLayout = z.infer<typeof stageLayoutSchema>;

const ledgerSchema = z.object({
  requestedClaimId: z.string().min(1),
  producedClaimId: z.string().min(1),
});

const metricRowSchema = z.object({
  labelClaimId: z.string().min(1),
  valueClaimId: z.string().min(1),
});
const fileRowSchema = z.object({
  nameClaimId: z.string().min(1),
  bytesClaimId: z.string().min(1),
  receiptId: z.string().min(1),
});

const attemptFourSchema = z.object({
  repositoryStateClaimId: z.string().min(1),
  headlineClaimId: z.string().min(1),
  subheadClaimId: z.string().min(1),
  receiptClaimId: z.string().min(1),
  callbackClaimId: z.string().min(1),
  reportTitleClaimId: z.string().min(1),
  commitButtonClaimId: z.string().min(1),
  printButtonClaimId: z.string().min(1),
  metricRows: z.array(metricRowSchema).length(8),
});

const sceneSchema = z.object({
  id: z.string().min(1),
  order: z.number().int().min(0),
  sectionType: z.enum(["prologue", "scene", "finale"]),
  sceneNumber: z.number().int().min(1).max(16).nullable(),
  navLabel: z.string().min(1),
  eyebrow: z.string().min(1),
  titleClaimId: z.string().min(1),
  interactionClaimId: z.string().min(1),
  claimIds: z.array(z.string().min(1)).min(1),
  sourceIds: z.array(z.string().min(1)).min(1),
  receiptId: z.string().min(1),
  outputIds: z.array(z.string().min(1)),
  roastClaimId: z.string().min(1),
  transcriptClaimId: z.string().min(1),
  limitationClaimId: z.string().min(1),
  transcriptEventId: z.string().min(1),
  ledger: z.array(ledgerSchema),
  imageId: z.string().min(1).nullable(),
  caseSlugs: z.array(
    z.enum(["claude-github", "claude-build", "branch-cleanup", "chatgpt-pro"]),
  ),
  comparator: z
    .object({
      beforeClaimId: z.string().min(1),
      afterClaimId: z.string().min(1),
      representations: z.array(z.object({
        id: z.string().min(1),
        labelClaimId: z.string().min(1),
        captionClaimId: z.string().min(1),
        architectureClaimId: z.string().min(1),
        fidelityClaimId: z.string().min(1),
        imagePath: z.string().min(1).nullable(),
        imageId: z.string().min(1).nullable(),
      })).length(5),
    })
    .nullable(),
  metrics: z.array(metricRowSchema),
  fileRows: z.array(fileRowSchema),
  attemptFour: attemptFourSchema.nullable(),
});

const surfaceValue = z.string().min(1);
const surfaceSchema = z.object({
  id: z.string().min(1),
  label: z.string().min(1),
  descriptionClaimId: z.string().min(1),
  provider: surfaceValue,
  family: surfaceValue,
  platform: surfaceValue,
  executionContext: surfaceValue,
  memoryScope: surfaceValue,
  toolVisibility: surfaceValue,
  stateVisibility: surfaceValue,
  bindingControls: surfaceValue,
  verificationControls: surfaceValue,
  evidenceLevel: surfaceValue,
  sourceIds: z.array(z.string().min(1)).min(1),
  receiptId: z.string().min(1),
  passportClaimIds: z.array(z.string().min(1)).min(1),
});

const transcriptEventSchema = z.object({
  id: z.string().min(1),
  index: z.number().int().positive(),
  textClaimId: z.string().min(1),
  receiptId: z.string().min(1),
  sourceId: z.string().min(1),
  role: z.enum(["operator", "assistant", "system", "tool"]),
  sourceSlotId: z.string().min(1),
  sourceRanges: z.array(sourceRangeSchema).min(1),
  tags: z.array(z.string().min(1)).min(1),
  fidelity: z.literal("generalized"),
  verbatim: z.literal(false),
});

const transcriptSchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1),
  fidelity: z.literal("generalized"),
  verbatim: z.literal(false),
  noticeClaimId: z.string().min(1),
  publicHash: z.string().regex(/^[a-f0-9]{64}$/),
  sourceId: z.string().min(1),
  tags: z.array(z.string().min(1)).min(1),
  events: z.array(transcriptEventSchema).min(1),
});

const harnessPresetSchema = z.object({
  id: z.enum([
    "repository-coding",
    "research",
    "document-editing",
    "k12-support",
    "high-stakes",
  ]),
  label: z.string().min(1),
  instructionClaimIds: z.array(z.string().min(1)).min(1),
  plainLanguageClaimId: z.string().min(1).nullable(),
});

const harnessQuestionSchema = z.object({
  id: z.enum([
    "outcome",
    "inputs",
    "authority",
    "state",
    "substitution-policy",
    "verification",
    "stop-conditions",
  ]),
  labelClaimId: z.string().min(1),
  sectionClaimId: z.string().min(1),
  promptClaimId: z.string().min(1),
  plainPromptClaimId: z.string().min(1),
  defaultClaimId: z.string().min(1),
});

const pageSchema = z.object({
  id: z.enum(["method", "corrections", "about"]),
  title: z.string().min(1),
  claimIds: z.array(z.string().min(1)).min(1),
});

const catalogShape = z.object({
  schemaVersion: z.literal("1.0.0"),
  hero: z.object({
    badgeClaimId: z.string().min(1),
    premiseClaimId: z.string().min(1),
  }),
  outputPile: z.object({ noteClaimId: z.string().min(1) }),
  sources: z.array(sourceSchema).min(1),
  claims: z.array(claimSchema).min(1),
  receipts: z.array(receiptSchema).min(1),
  outputs: z.array(outputSchema).min(1),
  stageControls: z.array(stageControlSchema).length(42),
  scenes: z.array(sceneSchema).length(18),
  surfaces: z.array(surfaceSchema).min(1),
  transcripts: z.array(transcriptSchema).min(1),
  harnessPresets: z.array(harnessPresetSchema).length(5),
  harnessQuestions: z.array(harnessQuestionSchema).length(7),
  pages: z.array(pageSchema).length(3),
  releaseFacts: z.array(releaseFactSchema).min(1),
  correctionVersion: z.string().min(1),
});

export type PublicCatalog = z.infer<typeof catalogShape>;

export const publicCatalogSchema = catalogShape.superRefine((catalog, context) => {
  const allIds = [
    ...catalog.sources.map(({ id }) => id),
    ...catalog.claims.map(({ id }) => id),
    ...catalog.receipts.map(({ id }) => id),
    ...catalog.outputs.map(({ id }) => id),
    ...catalog.stageControls.map(({ id }) => id),
    ...catalog.scenes.map(({ id }) => id),
    ...catalog.surfaces.map(({ id }) => id),
    ...catalog.transcripts.map(({ id }) => id),
    ...catalog.transcripts.flatMap(({ events }) => events.map(({ id }) => id)),
    ...catalog.harnessPresets.map(({ id }) => id),
    ...catalog.harnessQuestions.map(({ id }) => id),
    ...catalog.pages.map(({ id }) => id),
    ...catalog.releaseFacts.map(({ id }) => id),
  ];
  const seen = new Set<string>();
  for (const id of allIds) {
    if (seen.has(id)) context.addIssue({ code: z.ZodIssueCode.custom, message: `Duplicate ID: ${id}` });
    seen.add(id);
  }

  const sourceIds = new Set(catalog.sources.map(({ id }) => id));
  const sources = new Map(catalog.sources.map((source) => [source.id, source]));
  const claims = new Map(catalog.claims.map((claim) => [claim.id, claim]));
  const transcripts = new Map(catalog.transcripts.map((transcript) => [transcript.id, transcript]));
  const events = new Map(catalog.transcripts.flatMap((transcript) =>
    transcript.events.map((event) => [event.id, { transcriptId: transcript.id, event }] as const),
  ));
  const receiptIds = new Set(catalog.receipts.map(({ id }) => id));
  const outputIds = new Set(catalog.outputs.map(({ id }) => id));
  const requireSource = (sourceId: string) => {
    if (!sourceIds.has(sourceId)) context.addIssue({ code: z.ZodIssueCode.custom, message: `Unresolved source link: ${sourceId}` });
  };
  const requireAcceptedClaim = (claimId: string, relationship: string) => {
    const claim = claims.get(claimId);
    if (!claim) context.addIssue({ code: z.ZodIssueCode.custom, message: `Unresolved ${relationship} claim: ${claimId}` });
    else if (claim.status === "rejected") context.addIssue({ code: z.ZodIssueCode.custom, message: `Rejected claim cannot render in ${relationship}: ${claimId}` });
  };

  for (const claim of catalog.claims) {
    claim.sourceIds.forEach(requireSource);
    if (!receiptIds.has(claim.receiptId)) context.addIssue({ code: z.ZodIssueCode.custom, message: `Unresolved claim receipt: ${claim.id}` });
    for (const binding of claim.evidenceBindings) {
      const transcript = transcripts.get(binding.transcriptId);
      const bound = events.get(binding.eventId);
      if (!transcript || !bound || bound.transcriptId !== binding.transcriptId) {
        context.addIssue({ code: z.ZodIssueCode.custom, message: `Unresolved claim evidence binding: ${claim.id}:${binding.eventId}` });
        continue;
      }
      if (JSON.stringify(binding.sourceRanges) !== JSON.stringify(bound.event.sourceRanges)) {
        context.addIssue({ code: z.ZodIssueCode.custom, message: `Claim evidence binding range drift: ${claim.id}:${binding.eventId}` });
      }
      if (!claim.sourceIds.some((sourceId) => sources.get(sourceId)?.transcriptId === binding.transcriptId)) {
        context.addIssue({ code: z.ZodIssueCode.custom, message: `Claim evidence binding has no matching source: ${claim.id}:${binding.transcriptId}` });
      }
    }
  }
  for (const source of catalog.sources) {
    if (!transcripts.has(source.transcriptId)) context.addIssue({ code: z.ZodIssueCode.custom, message: `Unresolved source transcript: ${source.id}:${source.transcriptId}` });
  }
  for (const receipt of catalog.receipts) {
    requireSource(receipt.sourceId);
    requireAcceptedClaim(receipt.excerptClaimId, "receipt excerpt");
    receipt.correctionClaimIds.forEach((id) => requireAcceptedClaim(id, "receipt correction"));
  }
  requireAcceptedClaim(catalog.hero.badgeClaimId, "hero badge");
  requireAcceptedClaim(catalog.hero.premiseClaimId, "hero premise");
  requireAcceptedClaim(catalog.outputPile.noteClaimId, "output pile note");
  for (const fact of catalog.releaseFacts) {
    requireAcceptedClaim(fact.claimId, "release fact");
    if (!receiptIds.has(fact.receiptId)) context.addIssue({ code: z.ZodIssueCode.custom, message: `Unresolved release receipt: ${fact.receiptId}` });
  }
  for (const output of catalog.outputs) {
    requireAcceptedClaim(output.labelClaimId, "output label");
    requireAcceptedClaim(output.detailClaimId, "output detail");
    requireSource(output.sourceId);
    if (!receiptIds.has(output.receiptId)) context.addIssue({ code: z.ZodIssueCode.custom, message: `Unresolved output receipt: ${output.receiptId}` });
  }
  for (const control of catalog.stageControls) {
    requireAcceptedClaim(control.labelClaimId, "stage control label");
    requireAcceptedClaim(control.detailClaimId, "stage control detail");
    requireSource(control.sourceId);
    if (!receiptIds.has(control.receiptId)) context.addIssue({ code: z.ZodIssueCode.custom, message: `Unresolved stage control receipt: ${control.id}` });
    for (const claimId of [control.labelClaimId, control.detailClaimId]) {
      const boundClaim = claims.get(claimId);
      if (boundClaim && !boundClaim.sourceIds.includes(control.sourceId)) {
        context.addIssue({ code: z.ZodIssueCode.custom, message: `Stage control claim has no matching source: ${control.id}:${claimId}` });
      }
      if (boundClaim && boundClaim.receiptId !== control.receiptId) {
        context.addIssue({ code: z.ZodIssueCode.custom, message: `Stage control claim receipt drift: ${control.id}:${claimId}` });
      }
    }
  }
  for (const scene of catalog.scenes) {
    [...scene.claimIds, scene.titleClaimId, scene.interactionClaimId, scene.roastClaimId, scene.transcriptClaimId, scene.limitationClaimId].forEach((id) => requireAcceptedClaim(id, "scene"));
    scene.sourceIds.forEach(requireSource);
    if (!receiptIds.has(scene.receiptId)) context.addIssue({ code: z.ZodIssueCode.custom, message: `Unresolved receipt link: ${scene.receiptId}` });
    for (const outputId of scene.outputIds) if (!outputIds.has(outputId)) context.addIssue({ code: z.ZodIssueCode.custom, message: `Unresolved output link: ${outputId}` });
    for (const row of scene.ledger) {
      requireAcceptedClaim(row.requestedClaimId, "scene ledger");
      requireAcceptedClaim(row.producedClaimId, "scene ledger");
    }
    if (scene.comparator) {
      requireAcceptedClaim(scene.comparator.beforeClaimId, "scene comparator");
      requireAcceptedClaim(scene.comparator.afterClaimId, "scene comparator");
      for (const representation of scene.comparator.representations) {
        [representation.labelClaimId, representation.captionClaimId, representation.architectureClaimId, representation.fidelityClaimId].forEach((id) => requireAcceptedClaim(id, "scene comparator representation"));
      }
    }
    for (const row of scene.metrics) {
      requireAcceptedClaim(row.labelClaimId, "scene metric");
      requireAcceptedClaim(row.valueClaimId, "scene metric");
    }
    for (const row of scene.fileRows) {
      requireAcceptedClaim(row.nameClaimId, "scene file row");
      requireAcceptedClaim(row.bytesClaimId, "scene file row");
      if (!receiptIds.has(row.receiptId)) context.addIssue({ code: z.ZodIssueCode.custom, message: `Unresolved file receipt: ${row.receiptId}` });
    }
    if (scene.attemptFour) {
      [scene.attemptFour.repositoryStateClaimId, scene.attemptFour.headlineClaimId, scene.attemptFour.subheadClaimId, scene.attemptFour.receiptClaimId, scene.attemptFour.callbackClaimId, scene.attemptFour.reportTitleClaimId, scene.attemptFour.commitButtonClaimId, scene.attemptFour.printButtonClaimId].forEach((id) => requireAcceptedClaim(id, "Attempt Four"));
      for (const row of scene.attemptFour.metricRows) {
        requireAcceptedClaim(row.labelClaimId, "Attempt Four metric");
        requireAcceptedClaim(row.valueClaimId, "Attempt Four metric");
      }
    }
  }
  for (const surface of catalog.surfaces) {
    requireAcceptedClaim(surface.descriptionClaimId, "surface");
    surface.passportClaimIds.forEach((id) => requireAcceptedClaim(id, "surface passport"));
    surface.sourceIds.forEach(requireSource);
    if (!receiptIds.has(surface.receiptId)) context.addIssue({ code: z.ZodIssueCode.custom, message: `Unresolved surface receipt: ${surface.id}` });
  }
  for (const transcript of catalog.transcripts) {
    requireAcceptedClaim(transcript.noticeClaimId, "transcript notice");
    requireSource(transcript.sourceId);
    for (const event of transcript.events) {
      requireAcceptedClaim(event.textClaimId, "transcript event");
      requireSource(event.sourceId);
      if (!receiptIds.has(event.receiptId)) context.addIssue({ code: z.ZodIssueCode.custom, message: `Unresolved transcript receipt: ${event.receiptId}` });
    }
  }
  for (const preset of catalog.harnessPresets) {
    preset.instructionClaimIds.forEach((id) => requireAcceptedClaim(id, "harness preset"));
    if (preset.plainLanguageClaimId) requireAcceptedClaim(preset.plainLanguageClaimId, "harness language toggle");
  }
  for (const question of catalog.harnessQuestions) {
    [question.labelClaimId, question.sectionClaimId, question.promptClaimId, question.plainPromptClaimId, question.defaultClaimId].forEach((id) => requireAcceptedClaim(id, "harness question"));
  }
  for (const page of catalog.pages) page.claimIds.forEach((id) => requireAcceptedClaim(id, `${page.id} page`));

  const orders = catalog.scenes.map(({ order }) => order);
  if (new Set(orders).size !== orders.length || orders.some((order, index) => order !== index)) {
    context.addIssue({ code: z.ZodIssueCode.custom, message: "Scene order must be unique and contiguous" });
  }
});

export function validatePublicCatalog(input: unknown): PublicCatalog {
  return publicCatalogSchema.parse(input);
}
