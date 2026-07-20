import { publicCatalog } from "./catalog";
import { imageManifest } from "./imageManifest";
import {
  stageLayoutRegistrySchema,
  type StageLayout,
  type StageSlot,
} from "./schemas";

export type { StageLayout, StageSlot } from "./schemas";

const slot = (
  layoutId: string,
  controlId: string,
  x: number,
  y: number,
  width: number,
  height: number,
): StageSlot => ({ id: `${layoutId}--${controlId}`, controlId, x, y, width, height });

const definitions: StageLayout[] = [
  {
    id: "directory-wheel", sceneId: "surface-wheel", imageId: "heroBigTopAlt", kind: "directory", mobilePresentation: "horizontal",
    slots: [
      slot("directory-wheel", "surface-wheel-control", 37.25, 21.5, 25.5, 45.3),
      slot("directory-wheel", "surface-ticket-claude-web", 18, 31, 13, 7),
      slot("directory-wheel", "surface-ticket-claude-code", 18, 39, 13, 7),
      slot("directory-wheel", "surface-ticket-chatgpt-pro", 18, 47, 13, 7),
      slot("directory-wheel", "surface-ticket-codex", 18, 55, 13, 7),
      slot("directory-wheel", "surface-ticket-repository", 69, 31, 13, 7),
      slot("directory-wheel", "surface-ticket-editor", 69, 39, 13, 7),
      slot("directory-wheel", "surface-ticket-browser", 69, 47, 13, 7),
      slot("directory-wheel", "surface-ticket-harness", 69, 55, 13, 7),
    ],
  },
  { id: "prologue-anchor", sceneId: "prologue", imageId: "heroBigTop", kind: "static", mobilePresentation: "none", slots: [] },
  {
    id: "surface-families", sceneId: "surface-wheel", imageId: "actFunhouse", kind: "families", mobilePresentation: "horizontal",
    slots: [
      slot("surface-families", "family-assistant", 6.5, 14, 11, 14),
      slot("surface-families", "family-coding-agent", 21, 19, 10, 15),
      slot("surface-families", "family-repository", 37, 23, 8, 14),
      slot("surface-families", "family-editor", 61.5, 23, 8, 14),
      slot("surface-families", "family-browser", 76, 19, 10, 15),
      slot("surface-families", "family-control", 89, 14, 10, 14),
    ],
  },
  {
    id: "capability-inventory", sceneId: "original-question", imageId: "actHiddenCapabilities", kind: "capabilities", mobilePresentation: "stacked",
    slots: [
      slot("capability-inventory", "capability-listing", 42, 30, 12, 12),
      slot("capability-inventory", "capability-installed-tool", 55.5, 30, 12, 12),
      slot("capability-inventory", "capability-connector", 42, 48, 12, 12),
      slot("capability-inventory", "capability-credentials", 55.5, 48, 12, 12),
      slot("capability-inventory", "capability-authorization", 42, 66, 12, 12),
      slot("capability-inventory", "capability-repository-access", 55.5, 66, 12, 12),
    ],
  },
  {
    id: "authorization-chain", sceneId: "original-question", imageId: "actHighWire", kind: "authorization", mobilePresentation: "horizontal",
    slots: [
      slot("authorization-chain", "authorization-requested-action", 6, 67, 12, 12),
      slot("authorization-chain", "authorization-capability-available", 22.5, 67, 12, 12),
      slot("authorization-chain", "authorization-credentials-present", 38.5, 67, 12, 12),
      slot("authorization-chain", "authorization-permission-granted", 54.5, 67, 12, 12),
      slot("authorization-chain", "authorization-target-in-scope", 69.5, 67, 12, 12),
      slot("authorization-chain", "authorization-action-verified", 86, 67, 12, 12),
    ],
  },
  {
    id: "thesis-rings", sceneId: "seven-minute-lesson", imageId: "actThreeRings", kind: "thesis", mobilePresentation: "stacked",
    slots: [
      slot("thesis-rings", "thesis-evidence", 32.5, 26, 36, 10),
      slot("thesis-rings", "thesis-recognition", 33.5, 58, 36, 10),
      slot("thesis-rings", "thesis-consequence", 33.5, 89, 36, 10),
    ],
  },
  {
    id: "operator-responsibilities", sceneId: "user-control-plane", imageId: "actControlPlane", kind: "responsibilities", mobilePresentation: "stacked",
    slots: [
      slot("operator-responsibilities", "responsibility-tool-discovery", 1, 44, 12, 9),
      slot("operator-responsibilities", "responsibility-product-navigation", 9, 66, 13, 9),
      slot("operator-responsibilities", "responsibility-repository-state", 34, 48, 11, 9),
      slot("operator-responsibilities", "responsibility-continuity", 25, 76, 12, 9),
      slot("operator-responsibilities", "responsibility-contradiction-detection", 63.5, 48, 12, 9),
      slot("operator-responsibilities", "responsibility-privacy-review", 71, 77, 13, 9),
      slot("operator-responsibilities", "responsibility-progress-enforcement", 88, 44, 11, 9),
      slot("operator-responsibilities", "responsibility-definition-of-done", 40, 90, 28, 9),
    ],
  },
  { id: "paperwork-output", sceneId: "build-this-website", imageId: "actPaperwork", kind: "paperwork", mobilePresentation: "stacked", slots: [slot("paperwork-output", "paperwork-reveal", 15.5, 86, 12, 10)] },
  {
    id: "evidence-room", sceneId: "evidence-room", imageId: "actBackstage", kind: "evidence", mobilePresentation: "horizontal",
    slots: [
      slot("evidence-room", "evidence-view-frontstage", 7.5, 11, 35, 11),
      slot("evidence-room", "evidence-view-backstage", 52, 25, 23, 17),
    ],
  },
  { id: "finale-scoreboard", sceneId: "finale", imageId: "actPrizeBooth", kind: "finale", mobilePresentation: "stacked", slots: [slot("finale-scoreboard", "return-to-directory", 2, 64, 14, 14)] },
];

export function validateStageLayouts(input: unknown): StageLayout[] {
  const layouts = stageLayoutRegistrySchema.parse(input);
  const sceneIds = new Set(publicCatalog.scenes.map(({ id }) => id));
  const imageIds = new Set(Object.keys(imageManifest));
  const controlIds = new Set(publicCatalog.stageControls.map(({ id }) => id));
  for (const layout of layouts) {
    if (!sceneIds.has(layout.sceneId)) throw new Error(`Unresolved stage scene reference: ${layout.sceneId}`);
    if (!imageIds.has(layout.imageId)) throw new Error(`Unresolved stage image reference: ${layout.imageId}`);
    for (const stageSlot of layout.slots) {
      if (!controlIds.has(stageSlot.controlId)) throw new Error(`Unresolved stage control reference: ${stageSlot.controlId}`);
    }
  }
  const assignedImages = layouts.map(({ imageId }) => imageId).sort();
  const manifestImages = [...imageIds].sort();
  if (JSON.stringify(assignedImages) !== JSON.stringify(manifestImages)) {
    throw new Error("Stage image set must equal the supplied image manifest exactly");
  }
  return layouts;
}

export const stageLayouts = validateStageLayouts(definitions);

export function getStageLayoutsForScene(sceneId: string) {
  return stageLayouts.filter((layout) => layout.sceneId === sceneId);
}

export function getStageLayout(layoutId: string) {
  return stageLayouts.find(({ id }) => id === layoutId) ?? null;
}
