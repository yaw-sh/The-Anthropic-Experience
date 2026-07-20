import { publicCatalog, resolveAcceptedClaim } from "./catalog";

export type HarnessAnswers = Record<(typeof publicCatalog.harnessQuestions)[number]["id"], string>;

export function getInitialHarnessAnswers(presetId: string): HarnessAnswers {
  const preset = publicCatalog.harnessPresets.find(({ id }) => id === presetId);
  if (!preset) throw new Error(`Unknown harness preset: ${presetId}`);
  const answers = Object.fromEntries(
    publicCatalog.harnessQuestions.map((question) => [
      question.id,
      resolveAcceptedClaim(question.defaultClaimId).text,
    ]),
  ) as HarnessAnswers;
  const specificClaimId = preset.instructionClaimIds[1];
  if (specificClaimId) answers.outcome = resolveAcceptedClaim(specificClaimId).text;
  return answers;
}

export function getHarnessPreview(
  presetId: string,
  plainLanguage: boolean,
  answers: HarnessAnswers = getInitialHarnessAnswers(presetId),
): string {
  const preset = publicCatalog.harnessPresets.find(({ id }) => id === presetId);
  if (!preset) throw new Error(`Unknown harness preset: ${presetId}`);
  const sectionHeading = (questionId: keyof HarnessAnswers) => {
    const question = publicCatalog.harnessQuestions.find(({ id }) => id === questionId);
    if (!question) throw new Error(`Unknown harness question: ${questionId}`);
    return resolveAcceptedClaim(question.sectionClaimId).text;
  };
  const sections = [
    sectionHeading("outcome"), answers.outcome, "",
    resolveAcceptedClaim("claim-harness-definition-of-done").text,
    resolveAcceptedClaim("claim-harness-default-definition-of-done").text, "",
    sectionHeading("inputs"), answers.inputs, "",
    sectionHeading("authority"), answers.authority, "",
    sectionHeading("substitution-policy"), answers["substitution-policy"], "",
    sectionHeading("state"), answers.state, "",
    sectionHeading("verification"), answers.verification, "",
    sectionHeading("stop-conditions"), answers["stop-conditions"], "",
  ];
  if (plainLanguage && preset.plainLanguageClaimId) {
    sections.push(resolveAcceptedClaim(preset.plainLanguageClaimId).text, "");
  }
  return [
    `INTENT HARNESS / ${preset.label.toUpperCase()}`,
    "",
    ...sections,
  ].join("\n");
}
