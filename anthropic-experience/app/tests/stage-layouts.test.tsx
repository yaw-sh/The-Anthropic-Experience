import { describe, expect, it } from "vitest";
import { imageManifest } from "../src/content/imageManifest";
import { publicCatalog } from "../src/content/catalog";
import {
  stageLayouts,
  validateStageLayouts,
  type StageLayout,
} from "../src/content/stageLayouts";

const expectedPlacements = {
  "directory-wheel": [
    ["surface-wheel-control", 37.25, 21.5, 25.5, 45.3],
    ["surface-ticket-claude-web", 18, 31, 13, 7],
    ["surface-ticket-claude-code", 18, 39, 13, 7],
    ["surface-ticket-chatgpt-pro", 18, 47, 13, 7],
    ["surface-ticket-codex", 18, 55, 13, 7],
    ["surface-ticket-repository", 69, 31, 13, 7],
    ["surface-ticket-editor", 69, 39, 13, 7],
    ["surface-ticket-browser", 69, 47, 13, 7],
    ["surface-ticket-harness", 69, 55, 13, 7],
  ],
  "prologue-anchor": [],
  "surface-families": [
    ["family-assistant", 6.5, 14, 11, 14],
    ["family-coding-agent", 21, 19, 10, 15],
    ["family-repository", 37, 23, 8, 14],
    ["family-editor", 61.5, 23, 8, 14],
    ["family-browser", 76, 19, 10, 15],
    ["family-control", 89, 14, 10, 14],
  ],
  "capability-inventory": [
    ["capability-listing", 42, 30, 12, 12],
    ["capability-installed-tool", 55.5, 30, 12, 12],
    ["capability-connector", 42, 48, 12, 12],
    ["capability-credentials", 55.5, 48, 12, 12],
    ["capability-authorization", 42, 66, 12, 12],
    ["capability-repository-access", 55.5, 66, 12, 12],
  ],
  "authorization-chain": [
    ["authorization-requested-action", 6, 67, 12, 12],
    ["authorization-capability-available", 22.5, 67, 12, 12],
    ["authorization-credentials-present", 38.5, 67, 12, 12],
    ["authorization-permission-granted", 54.5, 67, 12, 12],
    ["authorization-target-in-scope", 69.5, 67, 12, 12],
    ["authorization-action-verified", 86, 67, 12, 12],
  ],
  "thesis-rings": [
    ["thesis-evidence", 32.5, 26, 36, 10],
    ["thesis-recognition", 33.5, 58, 36, 10],
    ["thesis-consequence", 33.5, 89, 36, 10],
  ],
  "operator-responsibilities": [
    ["responsibility-tool-discovery", 1, 44, 12, 9],
    ["responsibility-product-navigation", 9, 66, 13, 9],
    ["responsibility-repository-state", 34, 48, 11, 9],
    ["responsibility-continuity", 25, 76, 12, 9],
    ["responsibility-contradiction-detection", 63.5, 48, 12, 9],
    ["responsibility-privacy-review", 71, 77, 13, 9],
    ["responsibility-progress-enforcement", 88, 44, 11, 9],
    ["responsibility-definition-of-done", 40, 90, 28, 9],
  ],
  "paperwork-output": [["paperwork-reveal", 15.5, 86, 12, 10]],
  "evidence-room": [
    ["evidence-view-frontstage", 7.5, 11, 35, 11],
    ["evidence-view-backstage", 52, 25, 23, 17],
  ],
  "finale-scoreboard": [["return-to-directory", 2, 64, 14, 14]],
} as const;

describe("validated stage layout registry", () => {
  it("assigns every supplied image exactly once across ten layouts and 42 slots", () => {
    expect(stageLayouts).toHaveLength(10);
    expect(stageLayouts.flatMap(({ slots }) => slots)).toHaveLength(42);
    expect(new Set(stageLayouts.map(({ imageId }) => imageId))).toEqual(
      new Set(Object.keys(imageManifest)),
    );
  });

  it("locks every normalized placement to the supplied raster geometry", () => {
    expect(Object.fromEntries(stageLayouts.map((layout) => [
      layout.id,
      layout.slots.map(({ controlId, x, y, width, height }) => [controlId, x, y, width, height]),
    ]))).toEqual(expectedPlacements);
  });

  it("keeps layout, slot, and global control IDs unique and in bounds", () => {
    const slots = stageLayouts.flatMap(({ slots }) => slots);
    expect(new Set(stageLayouts.map(({ id }) => id)).size).toBe(stageLayouts.length);
    expect(new Set(slots.map(({ id }) => id)).size).toBe(slots.length);
    expect(new Set(slots.map(({ controlId }) => controlId)).size).toBe(slots.length);
    for (const slot of slots) {
      expect(slot.x).toBeGreaterThanOrEqual(0);
      expect(slot.y).toBeGreaterThanOrEqual(0);
      expect(slot.width).toBeGreaterThanOrEqual(0);
      expect(slot.height).toBeGreaterThanOrEqual(0);
      expect(slot.x + slot.width).toBeLessThanOrEqual(100);
      expect(slot.y + slot.height).toBeLessThanOrEqual(100);
    }
  });

  it("rejects unresolved scene, image, and control references", () => {
    const brokenScene = structuredClone(stageLayouts) as StageLayout[];
    brokenScene[0].sceneId = "missing-scene";
    expect(() => validateStageLayouts(brokenScene)).toThrow(/scene reference/i);

    const brokenImage = structuredClone(stageLayouts) as StageLayout[];
    brokenImage[0].imageId = "missing-image";
    expect(() => validateStageLayouts(brokenImage)).toThrow(/image reference|image set/i);

    const brokenControl = structuredClone(stageLayouts) as StageLayout[];
    brokenControl[0].slots[0].controlId = "missing-control";
    expect(() => validateStageLayouts(brokenControl)).toThrow(/control reference/i);
  });

  it("rejects overflow, duplicate IDs, and an image-set mismatch", () => {
    const overflow = structuredClone(stageLayouts) as StageLayout[];
    overflow[0].slots[0].x = 90;
    overflow[0].slots[0].width = 20;
    expect(() => validateStageLayouts(overflow)).toThrow(/x \+ width/i);

    const zeroSized = structuredClone(stageLayouts) as StageLayout[];
    zeroSized[0].slots[0].width = 0;
    expect(() => validateStageLayouts(zeroSized)).toThrow(/greater than 0/i);

    const duplicate = structuredClone(stageLayouts) as StageLayout[];
    duplicate[1].id = duplicate[0].id;
    duplicate[1].imageId = duplicate[0].imageId;
    expect(() => validateStageLayouts(duplicate)).toThrow(/duplicate layout|image set/i);
  });

  it("backs every stage control with valid claim, source, and receipt records", () => {
    const claimIds = new Set(publicCatalog.claims.map(({ id }) => id));
    const sourceIds = new Set(publicCatalog.sources.map(({ id }) => id));
    const receiptIds = new Set(publicCatalog.receipts.map(({ id }) => id));
    expect(publicCatalog.stageControls).toHaveLength(42);
    for (const control of publicCatalog.stageControls) {
      expect(claimIds.has(control.labelClaimId)).toBe(true);
      expect(claimIds.has(control.detailClaimId)).toBe(true);
      expect(sourceIds.has(control.sourceId)).toBe(true);
      expect(receiptIds.has(control.receiptId)).toBe(true);
    }
  });
});
