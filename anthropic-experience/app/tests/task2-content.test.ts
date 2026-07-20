import { createHash } from "node:crypto";
import { readFileSync, statSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import { publicCatalog } from "../src/content/catalog";
import { imageManifest } from "../src/content/imageManifest";
import { stageLayouts } from "../src/content/stageLayouts";
import { getHarnessPreview, getInitialHarnessAnswers } from "../src/content/harness";

const requiredCases = [
  "claude-github",
  "claude-build",
  "branch-cleanup",
  "chatgpt-pro",
];

function sha256(path: string) {
  return createHash("sha256").update(readFileSync(path)).digest("hex");
}

describe("Task 2 typed content", () => {
  it("uses the canonical blueprint scene identities and titles", () => {
    const expected = [
      ["prologue", "The third attempt"],
      ["eight-words", "Eight words"],
      ["surface-wheel", "Choose the surface that forgot the other surface"],
      ["original-question", "The original question"],
      ["seven-minute-lesson", "The lesson lasted seven minutes"],
      ["user-control-plane", "The user becomes the control plane"],
      ["build-this-website", "Build the website about this"],
      ["audit-needs-audit", "The audit needs an audit"],
      ["export-only", "Export only"],
      ["branch-cleanup", "Meanwhile, in the other tent"],
      ["hands-off", "You are no longer allowed to touch anything"],
      ["handoff-understood", "The handoff understood the joke"],
      ["chatgpt-pro", "ChatGPT Pro files the joke away"],
      ["correction-loop", "The correction loop"],
      ["mechanism-logos", "The mechanism changed logos"],
      ["build-missing-layer", "Build the missing layer"],
      ["evidence-room", "The evidence room"],
      ["finale", "Done is a state, not a paragraph"],
    ];
    expect(publicCatalog.scenes.map((scene) => [scene.id, resolveClaim(scene.titleClaimId)])).toEqual(expected);
  });

  it("retains canonical scene copy and the full Attempt Four frontstage beat", () => {
    const sceneOne = publicCatalog.scenes.find(({ sceneNumber }) => sceneNumber === 1)!;
    expect(sceneOne.claimIds.map(resolveClaim)).toContain("Eight words entered. A project-management department came out.");
    const sceneTwelve = publicCatalog.scenes.find(({ sceneNumber }) => sceneNumber === 12)! as typeof publicCatalog.scenes[number] & {
      attemptFour: { headlineClaimId: string; subheadClaimId: string; receiptClaimId: string; callbackClaimId: string; metricRows: Array<{ labelClaimId: string; valueClaimId: string }> } | null;
    };
    expect(resolveClaim(sceneTwelve.titleClaimId)).toBe("ChatGPT Pro files the joke away");
    expect(resolveClaim(sceneTwelve.attemptFour!.headlineClaimId)).toBe("IT HAD GITHUB ACCESS.");
    expect(resolveClaim(sceneTwelve.attemptFour!.subheadClaimId)).toBe("It used that access to explain why it should have used that access.");
    expect(resolveClaim(sceneTwelve.attemptFour!.receiptClaimId)).toBe("Recognition reached the correct action and stopped one inch before the button.");
    expect(resolveClaim(sceneTwelve.attemptFour!.callbackClaimId)).toBe("Done is still not a paragraph. Apparently neither is “commit.”");
    expect(sceneTwelve.attemptFour!.metricRows).toHaveLength(8);
    expect(sceneTwelve.order).toBe(12);
    expect(resolveClaim(publicCatalog.scenes[15].titleClaimId)).toBe("Build the missing layer");
    expect(resolveClaim(publicCatalog.scenes[16].titleClaimId)).toBe("The evidence room");
    expect(resolveClaim(publicCatalog.scenes[17].titleClaimId)).toBe("Done is a state, not a paragraph");
  });

  it("contains prologue, scenes 1 through 16, and finale in data order", () => {
    expect(publicCatalog.scenes).toHaveLength(18);
    expect(publicCatalog.scenes.map(({ order }) => order)).toEqual(
      Array.from({ length: 18 }, (_, index) => index),
    );
    expect(publicCatalog.scenes[0].sectionType).toBe("prologue");
    expect(publicCatalog.scenes.slice(1, 17).map(({ sceneNumber }) => sceneNumber)).toEqual(
      Array.from({ length: 16 }, (_, index) => index + 1),
    );
    expect(publicCatalog.scenes[17].sectionType).toBe("finale");
  });

  it("resolves every factual guided field through renderable source-bound claims", () => {
    const claims = new Map(publicCatalog.claims.map((claim) => [claim.id, claim]));
    const sources = new Set(publicCatalog.sources.map(({ id }) => id));

    for (const scene of publicCatalog.scenes) {
      const factualClaimIds = [
        ...scene.claimIds,
        scene.titleClaimId,
        scene.limitationClaimId,
        ...scene.ledger.flatMap(({ requestedClaimId, producedClaimId }) => [
          requestedClaimId,
          producedClaimId,
        ]),
        ...(scene as unknown as { interactionClaimId?: string }).interactionClaimId ? [(scene as unknown as { interactionClaimId: string }).interactionClaimId] : [],
      ];
      for (const claimId of factualClaimIds) {
        const claim = claims.get(claimId);
        expect(claim?.status, `${scene.id}:${claimId}`).not.toBe("rejected");
        expect(claim?.sourceIds.length, `${scene.id}:${claimId}`).toBeGreaterThan(0);
        expect(claim?.sourceIds.every((sourceId) => sources.has(sourceId))).toBe(true);
        expect(claim?.evidenceBindings.length, `${scene.id}:${claimId}`).toBeGreaterThan(0);
      }
    }
  });

  it("uses neutral case identifiers and keeps each required case deep-linkable", () => {
    expect(new Set(publicCatalog.scenes.flatMap(({ caseSlugs }) => caseSlugs))).toEqual(
      new Set(requiredCases),
    );
    expect(JSON.stringify(publicCatalog)).toContain("branch-cleanup");
    expect(JSON.stringify(publicCatalog)).toContain("###-PII-###");
  });

  it("provides every atlas dimension and computes its count from records", () => {
    expect(publicCatalog.surfaces.length).toBeGreaterThan(4);
    for (const surface of publicCatalog.surfaces) {
      expect(surface).toEqual(
        expect.objectContaining({
          provider: expect.any(String),
          family: expect.any(String),
          platform: expect.any(String),
          executionContext: expect.any(String),
          memoryScope: expect.any(String),
          toolVisibility: expect.any(String),
          stateVisibility: expect.any(String),
          bindingControls: expect.any(String),
          verificationControls: expect.any(String),
          evidenceLevel: expect.any(String),
        }),
      );
    }
    expect(publicCatalog.surfaces.some(({ provider }) => provider === "unknown")).toBe(true);
    expect(JSON.stringify(publicCatalog)).not.toContain("56+");
  });

  it("provides generalized non-verbatim transcripts with stable events and receipt links", () => {
    expect(publicCatalog.transcripts.length).toBeGreaterThanOrEqual(4);
    for (const transcript of publicCatalog.transcripts) {
      expect(transcript.fidelity).toBe("generalized");
      expect(transcript.verbatim).toBe(false);
      expect(transcript.events.length).toBeGreaterThan(0);
      expect(new Set(transcript.events.map(({ id }) => id)).size).toBe(
        transcript.events.length,
      );
      for (const event of transcript.events) {
        expect(publicCatalog.receipts.some(({ id }) => id === event.receiptId)).toBe(true);
      }
    }
  });

  it("builds every harness preset deterministically from accepted claims", () => {
    const ids = publicCatalog.harnessPresets.map(({ id }) => id);
    expect(ids).toEqual([
      "repository-coding",
      "research",
      "document-editing",
      "k12-support",
      "high-stakes",
    ]);
    for (const id of ids) {
      expect(getHarnessPreview(id, false)).toBe(getHarnessPreview(id, false));
      expect(getHarnessPreview(id, false).length).toBeGreaterThan(80);
    }
    expect(getHarnessPreview("k12-support", true)).not.toBe(
      getHarnessPreview("k12-support", false),
    );
  });

  it("defines seven editable canonical contract questions", () => {
    const questions = (publicCatalog as unknown as { harnessQuestions: Array<{ id: string }> }).harnessQuestions;
    expect(questions.map(({ id }) => id)).toEqual([
      "outcome",
      "inputs",
      "authority",
      "state",
      "substitution-policy",
      "verification",
      "stop-conditions",
    ]);
    const answers = getInitialHarnessAnswers("repository-coding");
    expect(Object.keys(answers)).toHaveLength(7);
    expect(getHarnessPreview("repository-coding", false, answers)).toContain("OBJECTIVE");
    expect(getHarnessPreview("repository-coding", false, answers)).toContain("STOP AND ASK WHEN");
  });

  it("resolves every harness preview line through a renderable sourced claim", () => {
    const renderableTexts = new Set(
      publicCatalog.claims
        .filter(({ status, sourceIds }) => status !== "rejected" && sourceIds.length > 0)
        .map(({ text }) => text),
    );
    for (const preset of publicCatalog.harnessPresets) {
      const lines = getHarnessPreview(preset.id, true).split("\n").slice(2).filter(Boolean);
      for (const line of lines) {
        expect(renderableTexts.has(line.replace(/^\d+\.\s+/, "")), line).toBe(true);
      }
    }
  });

  it("keeps owner review pending while deriving machine-verified facts", () => {
    expect(publicCatalog.releaseFacts.every(({ status }) => status === "pending" || status === "verified")).toBe(true);
    expect(publicCatalog.releaseFacts.some(({ status }) => String(status) === "verified")).toBe(true);
    expect(publicCatalog.releaseFacts.some(({ status }) => String(status) === "pending")).toBe(true);
    expect(JSON.stringify(publicCatalog.releaseFacts)).not.toContain("COMPLETE");
  });
});

describe("Task 2 image registry", () => {
  it("validates all ten supplied images and responsive local derivatives", () => {
    const images = Object.values(imageManifest);
    expect(images).toHaveLength(10);
    for (const entry of images) {
      expect(entry.alt.length).toBeGreaterThan(12);
      expect(entry.sourceSha256).toBe(sha256(resolve(entry.sourceFile)));
      expect(entry.derivatives).toHaveLength(12);
      for (const derivative of entry.derivatives) {
        expect(derivative.sha256).toBe(sha256(resolve(derivative.file)));
        expect(derivative.path).toMatch(/^\/images\//);
        expect(derivative.width).toBeGreaterThan(0);
      }
    }
    expect(new Set(stageLayouts.map(({ imageId }) => imageId))).toEqual(new Set(Object.keys(imageManifest)));
  });

  it("keeps a responsive hero matrix and every 1920 publication derivative under 350 kB", () => {
    const hero = imageManifest.heroBigTop;
    expect(new Set(hero.derivatives.map(({ format }) => format))).toEqual(new Set(["image/avif", "image/webp", "image/jpeg"]));
    expect(new Set(hero.derivatives.map(({ width }) => width))).toEqual(new Set([480, 768, 1280, 1920]));
    for (const derivative of hero.derivatives.filter(({ width }) => width === 1920)) {
      expect(statSync(resolve(derivative.file)).size).toBeLessThanOrEqual(350 * 1024);
    }
  });
});

function resolveClaim(claimId: string) {
  return publicCatalog.claims.find(({ id }) => id === claimId)?.text ?? "missing";
}
