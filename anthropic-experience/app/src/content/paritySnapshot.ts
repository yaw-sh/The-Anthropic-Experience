import { getHarnessPreview, getInitialHarnessAnswers } from "./harness";
import { publicCatalog, resolveAcceptedClaim } from "./catalog";
import { imageManifest } from "./imageManifest";
import { requiredRoutes } from "./routes";
import { taskOperations } from "./taskOperations";

const claimText = (claimId: string) => resolveAcceptedClaim(claimId).text;

const renderScene = (scene: (typeof publicCatalog.scenes)[number]) => ({
  ...scene,
  title: claimText(scene.titleClaimId),
  interaction: claimText(scene.interactionClaimId),
  body: scene.claimIds.map(claimText),
  roast: claimText(scene.roastClaimId),
  transcript: claimText(scene.transcriptClaimId),
  limitation: claimText(scene.limitationClaimId),
  ledger: scene.ledger.map((row) => ({
    ...row,
    requested: claimText(row.requestedClaimId),
    produced: claimText(row.producedClaimId),
  })),
  metrics: scene.metrics.map((row) => ({
    ...row,
    label: claimText(row.labelClaimId),
    value: claimText(row.valueClaimId),
  })),
  fileRows: scene.fileRows.map((row) => ({
    ...row,
    name: claimText(row.nameClaimId),
    bytes: claimText(row.bytesClaimId),
  })),
  comparator: scene.comparator && {
    ...scene.comparator,
    before: claimText(scene.comparator.beforeClaimId),
    after: claimText(scene.comparator.afterClaimId),
    representations: scene.comparator.representations.map((representation) => ({
      ...representation,
      label: claimText(representation.labelClaimId),
      caption: claimText(representation.captionClaimId),
      architecture: claimText(representation.architectureClaimId),
      fidelity: claimText(representation.fidelityClaimId),
    })),
  },
  attemptFour: scene.attemptFour && {
    ...scene.attemptFour,
    repositoryState: claimText(scene.attemptFour.repositoryStateClaimId),
    headline: claimText(scene.attemptFour.headlineClaimId),
    subhead: claimText(scene.attemptFour.subheadClaimId),
    receipt: claimText(scene.attemptFour.receiptClaimId),
    callback: claimText(scene.attemptFour.callbackClaimId),
    reportTitle: claimText(scene.attemptFour.reportTitleClaimId),
    commitButton: claimText(scene.attemptFour.commitButtonClaimId),
    printButton: claimText(scene.attemptFour.printButtonClaimId),
    metricRows: scene.attemptFour.metricRows.map((row) => ({
      ...row,
      label: claimText(row.labelClaimId),
      value: claimText(row.valueClaimId),
    })),
  },
});

export const paritySnapshot = {
  schemaVersion: publicCatalog.schemaVersion,
  sceneOrder: publicCatalog.scenes.map(({ id }) => id),
  hero: {
    ...publicCatalog.hero,
    badge: claimText(publicCatalog.hero.badgeClaimId),
    premise: claimText(publicCatalog.hero.premiseClaimId),
  },
  outputPile: {
    ...publicCatalog.outputPile,
    note: claimText(publicCatalog.outputPile.noteClaimId),
  },
  outputs: publicCatalog.outputs.map((output) => ({
    ...output,
    label: claimText(output.labelClaimId),
    detail: claimText(output.detailClaimId),
  })),
  claims: publicCatalog.claims,
  sources: publicCatalog.sources,
  receipts: publicCatalog.receipts.map((receipt) => ({
    ...receipt,
    excerpt: claimText(receipt.excerptClaimId),
    corrections: receipt.correctionClaimIds.map(claimText),
  })),
  scenes: publicCatalog.scenes.map(renderScene),
  surfaces: publicCatalog.surfaces.map((surface) => ({
    ...surface,
    description: claimText(surface.descriptionClaimId),
    passport: surface.passportClaimIds.map(claimText),
  })),
  transcripts: publicCatalog.transcripts.map((transcript) => ({
    ...transcript,
    notice: claimText(transcript.noticeClaimId),
    events: transcript.events.map((event) => ({
      ...event,
      text: claimText(event.textClaimId),
    })),
  })),
  harness: {
    questions: publicCatalog.harnessQuestions.map((question) => ({
      ...question,
      label: claimText(question.labelClaimId),
      section: claimText(question.sectionClaimId),
      prompt: claimText(question.promptClaimId),
      plainPrompt: claimText(question.plainPromptClaimId),
      defaultValue: claimText(question.defaultClaimId),
    })),
    presets: publicCatalog.harnessPresets.map((preset) => ({
      ...preset,
      instructions: preset.instructionClaimIds.map(claimText),
      plainLanguage: preset.plainLanguageClaimId ? claimText(preset.plainLanguageClaimId) : null,
    })),
    previews: publicCatalog.harnessPresets.flatMap((preset) => [false, true].map((plainLanguage) => ({
      presetId: preset.id,
      plainLanguage,
      text: getHarnessPreview(preset.id, plainLanguage, getInitialHarnessAnswers(preset.id)),
    }))),
  },
  pages: publicCatalog.pages.map((page) => ({
    ...page,
    claims: page.claimIds.map(claimText),
  })),
  releaseFacts: publicCatalog.releaseFacts,
  correctionVersion: publicCatalog.correctionVersion,
  images: Object.entries(imageManifest).map(([id, image]) => ({
    id,
    ...image,
  })),
  requiredRoutes,
  taskOperations,
  finalTaskStatus: taskOperations.at(-1)!.status,
};
