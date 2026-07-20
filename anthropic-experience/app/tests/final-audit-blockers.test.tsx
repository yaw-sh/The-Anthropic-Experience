import { execFileSync } from "node:child_process";
import { existsSync, readFileSync } from "node:fs";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";
import { publicCatalog } from "../src/content/catalog";
import { getHarnessPreview, getInitialHarnessAnswers } from "../src/content/harness";
import { paritySnapshot } from "../src/content/paritySnapshot";
import { validateEvidenceBundle } from "../src/content/publicAdapter";
import { validatePublicCatalog } from "../src/content/schemas";
import { EvidenceDrawer } from "../src/features/evidence-drawer/EvidenceDrawer";
import { ReleaseScoreboard } from "../src/features/release-scoreboard/ReleaseScoreboard";
import { ScenePlayer } from "../src/features/scene-player/ScenePlayer";
import generatedEvidence from "../src/generated/public-evidence.json";

const catalog = publicCatalog as unknown as {
  claims: Array<{ id: string; text: string; status: string; sourceIds: string[]; evidenceBindings: Array<{ transcriptId: string; eventId: string; sourceRanges: unknown[] }> }>;
  sources: Array<{ id: string; transcriptId: string }>;
  scenes: Array<{ id: string; titleClaimId: string; roastClaimId: string; transcriptClaimId: string; transcriptEventId: string }>;
  transcripts: Array<{ id: string; events: Array<{ id: string; sourceRanges: unknown[]; textClaimId: string }> }>;
  releaseFacts: Array<{ id: string; status: string; evidence: string[] }>;
};

const claimById = (id: string) => catalog.claims.find((claim) => claim.id === id)!;

describe("exact claim-to-event evidence binding", () => {
  it("binds every renderable claim to an exact event and byte-for-byte source-range set", () => {
    for (const claim of catalog.claims.filter(({ status }) => status !== "rejected")) {
      expect(claim.evidenceBindings, claim.id).toBeDefined();
      if (!claim.evidenceBindings) continue;
      expect(claim.evidenceBindings.length, claim.id).toBeGreaterThan(0);
      for (const binding of claim.evidenceBindings) {
        const transcript = catalog.transcripts.find(({ id }) => id === binding.transcriptId);
        const event = transcript?.events.find(({ id }) => id === binding.eventId);
        expect(event, `${claim.id}:${binding.eventId}`).toBeDefined();
        expect(binding.sourceRanges, `${claim.id}:${binding.eventId}`).toEqual(event?.sourceRanges);
        expect(claim.sourceIds.some((sourceId) => catalog.sources.find(({ id }) => id === sourceId)?.transcriptId === binding.transcriptId)).toBe(true);
      }
    }
  });

  it("rejects source-range drift and marks exact-number claims without event support as limited", () => {
    const input = structuredClone(publicCatalog) as unknown as typeof catalog;
    expect(input.claims[0].evidenceBindings).toBeDefined();
    if (!input.claims[0].evidenceBindings) return;
    input.claims[0].evidenceBindings[0].sourceRanges = [{ sourceSlotId: "wrong", start: 1, end: 1 }];
    expect(() => validatePublicCatalog(input)).toThrow(/binding|range/i);
    for (const id of ["claim-build-this-website-body-1", "claim-audit-needs-audit-metric-1-value", "claim-review-pack-file-1-bytes"]) {
      expect(claimById(id).status, id).toBe("limited");
    }
  });

  it("shows the addressed claim's exact event and ranges in the drawer with a stable transcript deep link", () => {
    const claim = claimById("claim-original-question-body-1");
    expect(claim.evidenceBindings).toBeDefined();
    if (!claim.evidenceBindings) return;
    const binding = claim.evidenceBindings[0];
    render(<MemoryRouter><EvidenceDrawer receiptId="receipt-original-question" claimId={claim.id} onClose={() => undefined} /></MemoryRouter>);
    expect(screen.getByText(binding.eventId)).toBeVisible();
    expect(screen.getByRole("link", { name: /open exact transcript event/i })).toHaveAttribute(
      "href",
      `/transcripts/${binding.transcriptId}?event=${binding.eventId}`,
    );
    expect(screen.getByText(/source range/i).nextElementSibling?.textContent).toMatch(/:\d+-\d+/);
  });
});

describe("explicit scene-authored mode records", () => {
  it("gives all eighteen scenes unique roast copy and an explicit semantically bound transcript event", () => {
    const roastTexts = catalog.scenes.map(({ roastClaimId }) => claimById(roastClaimId).text);
    const transcriptTexts = catalog.scenes.map(({ transcriptClaimId }) => claimById(transcriptClaimId).text);
    expect(new Set(roastTexts).size).toBe(18);
    expect(new Set(transcriptTexts).size).toBe(18);
    expect(roastTexts.some((text) => text.includes("the ring records the requested outcome"))).toBe(false);
    for (const scene of catalog.scenes) {
      const transcriptClaim = claimById(scene.transcriptClaimId);
      expect(transcriptClaim.evidenceBindings[0].eventId, scene.id).toBe(scene.transcriptEventId);
      const event = catalog.transcripts.flatMap(({ events }) => events).find(({ id }) => id === scene.transcriptEventId)!;
      expect(transcriptClaim.text, scene.id).toBe(claimById(event.textClaimId).text);
    }
  });
});

describe("canonical harness contract", () => {
  it("generates seven ordered parts without duplicating verification", () => {
    const answers = getInitialHarnessAnswers("repository-coding");
    const preview = getHarnessPreview("repository-coding", false, answers);
    const headings = preview.split("\n").filter((line) => [
      "OBJECTIVE", "DEFINITION OF DONE", "REQUIRED INSPECTION", "AUTHORIZED ACTIONS",
      "DO NOT SUBSTITUTE", "PROGRESS STATE", "EVIDENCE REQUIRED", "STOP AND ASK WHEN",
    ].includes(line));
    expect(headings).toEqual([
      "OBJECTIVE", "DEFINITION OF DONE", "REQUIRED INSPECTION", "AUTHORIZED ACTIONS",
      "DO NOT SUBSTITUTE", "PROGRESS STATE", "EVIDENCE REQUIRED", "STOP AND ASK WHEN",
    ]);
    expect(publicCatalog.harnessQuestions).toHaveLength(7);
    expect(preview.match(/^DEFINITION OF DONE$/gm)).toHaveLength(1);
    expect(preview.match(/^EVIDENCE REQUIRED$/gm)).toHaveLength(1);
    expect(preview.split(answers.verification)).toHaveLength(2);
    expect(preview.match(/^The observable outcome exists in the requested location and state,/gm)).toHaveLength(1);
    expect(preview.split(answers.outcome)).toHaveLength(2);
  });
});

describe("verification-derived release facts and comprehensive parity", () => {
  it("derives non-empty evidence and verified states from the machine-readable verification receipt", () => {
    expect(existsSync("verification/release-verification.json")).toBe(true);
    const receipt = JSON.parse(readFileSync("verification/release-verification.json", "utf8")) as { generator: string; checks: Array<{ id: string; status: string; evidencePath: string | null; evidenceExists: boolean }> };
    expect(receipt.generator).toBe("app/scripts/verify-release.mjs");
    expect(receipt.checks.length).toBeGreaterThan(5);
    for (const check of receipt.checks.filter(({ status }) => status === "pass")) {
      expect(check.evidenceExists, check.id).toBe(true);
      expect(check.evidencePath && existsSync(check.evidencePath), check.id).toBe(true);
      expect(execFileSync("git", ["ls-files", "--error-unmatch", check.evidencePath!], { encoding: "utf8" }).trim(), check.id).not.toBe("");
    }
    expect(catalog.releaseFacts.every(({ evidence }) => evidence.length > 0)).toBe(true);
    expect(catalog.releaseFacts.some(({ status }) => status === "verified")).toBe(true);
    expect(catalog.releaseFacts.find(({ id }) => id === "fact-owner-review")?.status).toBe("pending");
  });

  it("renders machine status as text and visibly qualifies scene synthesis", () => {
    render(<ReleaseScoreboard />);
    expect(screen.getAllByText("VERIFIED")).toHaveLength(4);
    expect(screen.getByText("PENDING")).toBeVisible();

    const scene = publicCatalog.scenes.find(({ id }) => id === "chatgpt-pro")!;
    render(<MemoryRouter><ScenePlayer scene={scene} mode="receipts" onOpenReceipt={() => undefined} /></MemoryRouter>);
    expect(screen.getByRole("note")).toHaveTextContent(/limited evidence.*exact values.*does not independently establish/i);
  });

  it("snapshots every factual surface and the generated harness output", () => {
    const snapshot = paritySnapshot as unknown as Record<string, unknown>;
    expect(Object.keys(snapshot)).toEqual(expect.arrayContaining([
      "hero", "outputPile", "outputs", "claims", "sources", "receipts", "scenes", "surfaces",
      "transcripts", "harness", "pages", "releaseFacts", "images", "requiredRoutes", "taskOperations",
    ]));
    expect((snapshot.claims as unknown[]).length).toBe(publicCatalog.claims.length);
    expect((snapshot.sources as unknown[]).length).toBe(publicCatalog.sources.length);
    expect((snapshot.receipts as unknown[]).length).toBe(publicCatalog.receipts.length);
    expect((snapshot.pages as Array<{ id: string }>).map(({ id }) => id)).toEqual(["method", "corrections", "about"]);
    expect((snapshot.harness as { previews: unknown[] }).previews).toHaveLength(10);
  });
});

describe("current authoritative public interface regression", () => {
  it("validates the committed bundle against current authoritative metadata and its locked event total", () => {
    const authoritativeCatalog = JSON.parse(readFileSync("../evidence/public/catalog.json", "utf8"));
    expect(generatedEvidence.catalog).toEqual(authoritativeCatalog);
    const declaredCount = generatedEvidence.catalog.transcripts.reduce((count, transcript) => count + transcript.eventCount, 0);
    expect(declaredCount).toBe(78);
    const validated = validateEvidenceBundle(generatedEvidence);
    expect(validated.transcripts).toHaveLength(6);
    expect(validated.events).toHaveLength(declaredCount);
  });
});
