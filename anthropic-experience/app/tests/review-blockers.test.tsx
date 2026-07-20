import { readFileSync, statSync } from "node:fs";
import { resolve } from "node:path";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";
import { AppShell } from "../src/app/AppShell";
import { publicCatalog } from "../src/content/catalog";
import { getHarnessPreview } from "../src/content/harness";
import { imageManifest } from "../src/content/imageManifest";
import { validateEvidenceBundle } from "../src/content/publicAdapter";
import { taskOperations } from "../src/content/taskOperations";
import generatedEvidence from "../src/generated/public-evidence.json";

const sha = "a".repeat(64);
const range = {
  start: 1,
  end: 1,
  sourceRole: "operator" as const,
  sourceRoleStart: 1,
  sourceRoleEnd: 1,
  sourceSlotId: "public-slot",
};
const transcript = {
  schemaVersion: "1.0.0" as const,
  id: "phase-00-access-and-request",
  title: "Access and request",
  fidelity: "generalized" as const,
  verbatim: false as const,
  generalizationNotice: "Generalized and public-safe; not a quotation.",
  events: [{
    approvedForPublic: true,
    fidelity: "generalized" as const,
    verbatim: false as const,
    id: "event-001",
    transcriptId: "phase-00-access-and-request",
    index: 1,
    speaker: "operator" as const,
    text: "The operator requested an observable repository outcome.",
    sourceSlotId: "public-slot",
    sourceRanges: [range],
    tags: ["instruction"],
    redactions: [],
  }],
};

function bundle(overrides: Record<string, unknown> = {}) {
  return {
    catalog: {
      schemaVersion: "1.0.0",
      contentModel: "generalized-public-process",
      generalizationNotice: "All transcript content is generalized and public-safe; no event is a verbatim quotation.",
      allowedSpeakers: ["operator", "assistant", "system", "tool"],
      transcripts: [{
        eventCount: 1,
        fidelity: "generalized",
        verbatim: false,
        id: transcript.id,
        phase: transcript.id,
        path: `transcripts/${transcript.id}.json`,
        publicHash: sha,
        title: transcript.title,
      }],
    },
    transcripts: [{ ...transcript, publicHash: sha }],
    ...overrides,
  };
}

describe("Track B public interface adapter", () => {
  it("accepts the real metadata + per-phase transcript shape", () => {
    expect(validateEvidenceBundle(bundle()).events).toHaveLength(1);
  });

  it("rejects schema drift, verbatim content, unapproved events, count drift, and hash drift", () => {
    expect(() => validateEvidenceBundle(bundle({ catalog: { ...bundle().catalog, schemaVersion: "2.0.0" } }))).toThrow();
    expect(() => validateEvidenceBundle(bundle({ transcripts: [{ ...transcript, verbatim: true }] }))).toThrow();
    expect(() => validateEvidenceBundle(bundle({ transcripts: [{ ...transcript, events: [{ ...transcript.events[0], approvedForPublic: false }] }] }))).toThrow();
    expect(() => validateEvidenceBundle(bundle({ catalog: { ...bundle().catalog, transcripts: [{ ...bundle().catalog.transcripts[0], eventCount: 2 }] } }))).toThrow(/count/i);
    expect(() => validateEvidenceBundle(bundle({ transcripts: [{ ...transcript, publicHash: "b".repeat(64) }] }))).toThrow(/hash/i);
  });
});

describe("source-bound product truth", () => {
  it("uses every generalized public event declared by authoritative metadata", () => {
    const events = publicCatalog.transcripts.flatMap(({ events }) => events);
    const declaredCount = generatedEvidence.catalog.transcripts.reduce((count, transcript) => count + transcript.eventCount, 0);
    expect(events).toHaveLength(declaredCount);
    expect(events.every((event) => event.fidelity === "generalized" && event.verbatim === false)).toBe(true);
    expect(events.every((event) => event.sourceRanges.every((sourceRange) => typeof sourceRange.start === "number"))).toBe(true);
    expect(events.some((event) => event.tags.includes("admission"))).toBe(true);
    expect(events.some((event) => event.tags.includes("scope-reduction"))).toBe(true);
  });

  it("resolves every source path and uses a real public hash", () => {
    for (const source of publicCatalog.sources) {
      expect(source.publicHash).toMatch(/^[a-f0-9]{64}$/);
      expect(new Set(source.publicHash)).not.toEqual(new Set([source.publicHash[0]]));
      expect(statSync(resolve(source.publicPath)).isFile()).toBe(true);
    }
  });

  it("binds every rendered factual claim to its exact receipt and limitation", () => {
    const receiptIds = new Set(publicCatalog.receipts.map(({ id }) => id));
    for (const claim of publicCatalog.claims.filter(({ status }) => status === "accepted")) {
      expect(claim.limitation).toBeTruthy();
      expect(receiptIds.has(claim.receiptId)).toBe(true);
    }
  });

  it("uses the canonical five operations and explicit completed-by-user state", () => {
    expect(taskOperations.map(({ id }) => id)).toEqual([
      "operation-github",
      "operation-react-build",
      "operation-branch-cleanup",
      "operation-pro-blueprint",
      "operation-final-experience",
    ]);
    expect(taskOperations[2].status).toBe("completed-by-user");
  });

  it("keeps the canonical premise in the hero first viewport", () => {
    render(<MemoryRouter><AppShell /></MemoryRouter>);
    const hero = screen.getByRole("banner");
    expect(hero).toHaveTextContent(/Claude failed to build the site/i);
    expect(hero).toHaveTextContent(/ChatGPT Pro.*archive.*transcript.*plan.*handoff/i);
    expect(hero).toHaveTextContent(/Codex attempt/i);
  });

  it("opens the receipt for the exact clicked claim", async () => {
    const user = userEvent.setup();
    render(<MemoryRouter initialEntries={["/?scene=chatgpt-pro"]}><AppShell /></MemoryRouter>);
    const scene = document.querySelector('[data-scene-id="chatgpt-pro"]') as HTMLElement;
    const factual = within(scene).getAllByTestId("factual-line")[1];
    const expected = factual.querySelector("p")?.textContent;
    await user.click(within(factual).getByRole("button", { name: /open evidence/i }));
    expect(screen.getByRole("dialog")).toHaveTextContent(expected ?? "missing");
  });
});

describe("review mechanics and delivery", () => {
  it("includes definition of done without app release status", () => {
    const preview = getHarnessPreview("repository-coding", false);
    expect(preview).toContain("OBJECTIVE");
    expect(preview).toContain("DEFINITION OF DONE");
    expect(preview).not.toContain("Completion state:");
  });

  it("exposes the thesis framework without fabricating pass/fail state", () => {
    render(<MemoryRouter initialEntries={["/?scene=seven-minute-lesson"]}><AppShell /></MemoryRouter>);
    const framework = screen.getByRole("group", { name: /thesis framework/i });
    expect(within(framework).getByRole("button", { name: "Evidence" })).toBeVisible();
    expect(within(framework).getByRole("button", { name: "Recognition" })).toBeVisible();
    expect(within(framework).getByRole("button", { name: "Consequence" })).toBeVisible();
    expect(framework).not.toHaveTextContent(/\b(?:OPEN|PASSED|CLOSED|NOT PASSED)\b/);
  });

  it("gives surfaces source and receipt passports and synchronized wheel controls", () => {
    render(<MemoryRouter initialEntries={["/surfaces?surface=surface-codex"]}><AppShell /></MemoryRouter>);
    expect(screen.getByRole("radio", { name: "Wheel segment 01 · Claude web" })).toHaveTextContent("01");
    expect(screen.getByRole("button", { name: "Ticket 04 · Codex" })).toHaveAttribute("aria-pressed", "true");
    const passport = screen.getByRole("region", { name: /surface passport/i });
    expect(passport).toHaveTextContent(/source/i);
    expect(within(passport).getByRole("link", { name: /receipt/i })).toBeVisible();
  });

  it("provides modern publication formats without upscaling originals", () => {
    for (const image of Object.values(imageManifest)) {
      expect(new Set(image.derivatives.map(({ format }) => format))).toEqual(new Set(["image/avif", "image/webp", "image/jpeg"]));
      expect(Math.max(...image.derivatives.map(({ width }) => width))).toBeLessThanOrEqual(image.sourceWidth);
      expect(image.derivatives.some(({ width }) => width === 480)).toBe(true);
      expect(image.derivatives.some(({ width }) => width === 1920)).toBe(true);
    }
  });

  it("declares production-host rewrites for BrowserRouter deep links", () => {
    const config = JSON.parse(readFileSync(resolve("vercel.json"), "utf8")) as { rewrites: unknown[] };
    expect(config.rewrites.length).toBeGreaterThan(0);
  });
});
