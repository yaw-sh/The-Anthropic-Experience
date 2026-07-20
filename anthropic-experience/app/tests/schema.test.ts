import { describe, expect, it } from "vitest";
import { publicCatalog } from "../src/content/catalog";
import { validatePublicCatalog } from "../src/content/schemas";
import { cloneCatalog } from "./fixtures";

describe("public content schema", () => {
  it("accepts the public-safe fixture catalog", () => {
    expect(validatePublicCatalog(publicCatalog)).toEqual(publicCatalog);
  });

  it("rejects duplicate IDs", () => {
    const input = cloneCatalog(publicCatalog);
    input.sources.push({ ...input.sources[0] });
    expect(() => validatePublicCatalog(input)).toThrow(/duplicate id/i);
  });

  it("rejects duplicate IDs in Task 2 harness and transcript event records", () => {
    const duplicatePreset = cloneCatalog(publicCatalog);
    duplicatePreset.harnessPresets[1].id = duplicatePreset.harnessPresets[0].id;
    expect(() => validatePublicCatalog(duplicatePreset)).toThrow(/duplicate id/i);

    const duplicateEvent = cloneCatalog(publicCatalog);
    duplicateEvent.transcripts[1].events[0].id = duplicateEvent.transcripts[0].events[0].id;
    expect(() => validatePublicCatalog(duplicateEvent)).toThrow(/duplicate id/i);
  });

  it("rejects unresolved claim and source links", () => {
    const input = cloneCatalog(publicCatalog);
    input.scenes[0].claimIds.push("claim-missing");
    input.scenes[0].sourceIds.push("source-missing");
    expect(() => validatePublicCatalog(input)).toThrow(/unresolved/i);
  });

  it("rejects rendered claims that were rejected", () => {
    const input = cloneCatalog(publicCatalog);
    input.claims[0].status = "rejected";
    expect(() => validatePublicCatalog(input)).toThrow(/rejected claim/i);
  });

  it("rejects invalid release fact status values", () => {
    const input = cloneCatalog(publicCatalog) as unknown as {
      releaseFacts: Array<{ status: string }>;
    };
    input.releaseFacts[0].status = "complete";
    expect(() => validatePublicCatalog(input)).toThrow(/status/i);
  });

  it("rejects a release fact whose claim link is unresolved", () => {
    const input = cloneCatalog(publicCatalog) as unknown as {
      releaseFacts: Array<{ claimId: string }>;
    };
    input.releaseFacts[0].claimId = "claim-missing";
    expect(() => validatePublicCatalog(input)).toThrow(/unresolved release fact claim/i);
  });

  it("requires every release fact to reference a claim instead of free-form copy", () => {
    for (const fact of publicCatalog.releaseFacts) {
      expect(fact).toHaveProperty("claimId");
      expect(fact).not.toHaveProperty("note");
    }
  });

  it("rejects unresolved output label, detail, and pile-note claim links", () => {
    const input = cloneCatalog(publicCatalog);
    input.outputs[0].labelClaimId = "claim-missing-label";
    input.outputs[0].detailClaimId = "claim-missing-detail";
    input.outputPile.noteClaimId = "claim-missing-note";
    expect(() => validatePublicCatalog(input)).toThrow(/unresolved output/i);
  });

  it("requires output records to use claim references instead of factual copy", () => {
    for (const output of publicCatalog.outputs) {
      expect(output).toHaveProperty("labelClaimId");
      expect(output).toHaveProperty("detailClaimId");
      expect(output).not.toHaveProperty("label");
      expect(output).not.toHaveProperty("detail");
    }
  });
});
