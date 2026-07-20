import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, useLocation } from "react-router-dom";
import { describe, expect, it } from "vitest";
import { AppShell } from "../src/app/AppShell";
import { publicCatalog } from "../src/content/catalog";
import { validateSharedCatalog } from "../src/content/publicAdapter";
import generatedEvidence from "../src/generated/public-evidence.json";

function LocationProbe() {
  const location = useLocation();
  return <output data-testid="location">{`${location.pathname}${location.search}`}</output>;
}

function renderRoute(entry: string) {
  return render(
    <MemoryRouter initialEntries={[entry]} future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <AppShell />
      <LocationProbe />
    </MemoryRouter>,
  );
}

describe("scene-specific interactive mechanisms", () => {
  const required = [
    ["eight-words", "Eight-word printer"],
    ["surface-wheel", "Surface family selector"],
    ["original-question", "Capability inventory"],
    ["original-question", "Authorization chain"],
    ["seven-minute-lesson", "Thesis framework"],
    ["user-control-plane", "Operator responsibilities"],
    ["build-this-website", "Paperwork output"],
    ["audit-needs-audit", "Audit counters"],
    ["export-only", "Export-only simulation"],
    ["branch-cleanup", "Branch collapse"],
    ["hands-off", "Manual advance"],
    ["handoff-understood", "Handoff comparison"],
    ["correction-loop", "Correction reveal"],
    ["mechanism-logos", "Mechanism replay"],
  ] as const;

  it.each(required)("renders a real %s mechanic", (sceneId, label) => {
    renderRoute(`/?scene=${sceneId}`);
    const scene = document.querySelector(`[data-scene-id="${sceneId}"]`)!;
    expect(within(scene as HTMLElement).getByRole("group", { name: label })).toBeVisible();
    expect(within(scene as HTMLElement).getAllByRole("button").length).toBeGreaterThan(0);
  });

  it("prints the eight-word request one token at a time", async () => {
    const user = userEvent.setup();
    renderRoute("/?scene=eight-words");
    const scene = document.querySelector('[data-scene-id="eight-words"]') as HTMLElement;
    await user.click(within(scene).getByRole("button", { name: /print next word/i }));
    expect(within(scene).getByRole("status")).toHaveTextContent(/^Unpack$/i);
  });

  it("makes each mode scene-specific and opens evidence from factual scene content", async () => {
    const user = userEvent.setup();
    renderRoute("/?scene=original-question&mode=transcript");
    const original = document.querySelector('[data-scene-id="original-question"]') as HTMLElement;
    const other = document.querySelector('[data-scene-id="seven-minute-lesson"]') as HTMLElement;
    expect(within(original).getByTestId("scene-mode-panel")).not.toHaveTextContent(
      within(other).getByTestId("scene-mode-panel").textContent ?? "",
    );
    await user.click(within(original).getAllByRole("button", { name: /open evidence/i })[0]);
    const dialog = screen.getByRole("dialog");
    expect(dialog).toHaveTextContent(/public location/i);
    expect(dialog).toHaveTextContent(/public hash/i);
    expect(dialog).toHaveTextContent(/fidelity/i);
    expect(dialog).toHaveTextContent(/claim state/i);
    expect(dialog).toHaveTextContent(/limitation/i);
    expect(dialog).toHaveTextContent(/correction history/i);
    expect(within(dialog).getByRole("link", { name: /back to scene/i })).toBeVisible();
  });
});

describe("canonical operation rail and generated release facts", () => {
  it("renders exactly five operations with receipt links and mobile disclosure", () => {
    renderRoute("/");
    const rail = screen.getByRole("complementary", { name: /task operations/i });
    expect(within(rail).getAllByRole("listitem")).toHaveLength(5);
    expect(within(rail).getAllByRole("link")).toHaveLength(5);
    expect(within(rail).getByRole("button", { name: /task operations/i })).toHaveAttribute("aria-expanded", "false");
  });

  it("binds every substitute output to source, request, acceptance, and receipt metadata", () => {
    for (const output of publicCatalog.outputs) {
      expect(output.sourceId).toMatch(/^source-/);
      expect(output.receiptId).toMatch(/^receipt-/);
      expect(output.requested).toBe(false);
      expect(output.advancedAcceptance).toBe(false);
      expect(output.fileType.length).toBeGreaterThan(0);
    }
  });

  it("imports machine-verified facts while keeping owner review pending", () => {
    expect(publicCatalog.releaseFacts).toHaveLength(5);
    expect(publicCatalog.releaseFacts.filter(({ status }) => status === "verified")).toHaveLength(4);
    expect(publicCatalog.releaseFacts.filter(({ status }) => status === "pending")).toHaveLength(1);
    expect(publicCatalog.releaseFacts.every(({ evidence }) => evidence.length > 0)).toBe(true);
  });
});

describe("visual comparator and atlas passports", () => {
  it("compares supplied visual representations and opens a focus-trapped full-screen view", async () => {
    const user = userEvent.setup();
    renderRoute("/?scene=build-this-website");
    const comparator = screen.getByRole("group", { name: /visual comparator/i });
    expect(within(comparator).getAllByRole("img")).toHaveLength(2);
    await user.click(within(comparator).getByRole("button", { name: /full screen/i }));
    expect(screen.getByRole("dialog", { name: /visual comparison/i })).toBeVisible();
  });

  it("selects a wheel passport and keeps the surface in a shareable query", async () => {
    const user = userEvent.setup();
    renderRoute("/surfaces?surface=surface-codex");
    expect(screen.getByRole("region", { name: /surface passport/i })).toHaveTextContent("Codex");
    await user.click(screen.getByRole("button", { name: "Ticket 01 · Claude web" }));
    expect(screen.getByTestId("location")).toHaveTextContent("surface=surface-claude-web");
    expect(screen.getByRole("region", { name: /surface passport/i })).toHaveTextContent("Claude web");
  });
});

describe("transcript metadata and public interface boundary", () => {
  it("searches event summaries and source ranges and filters tags", async () => {
    const user = userEvent.setup();
    const firstTranscript = generatedEvidence.transcripts[0];
    const firstRange = firstTranscript.events[0].sourceRanges[0];
    const rangeQuery = `${firstRange.sourceSlotId}:${firstRange.start}-${firstRange.end}`;
    renderRoute("/transcripts");
    await user.type(screen.getByRole("searchbox", { name: /search transcripts/i }), rangeQuery);
    expect(screen.getByRole("link", { name: firstTranscript.title })).toBeVisible();
    await user.clear(screen.getByRole("searchbox", { name: /search transcripts/i }));
    await user.selectOptions(screen.getByRole("combobox", { name: /tag filter/i }), "instruction");
    expect(screen.getAllByRole("link", { name: /transcript/i }).length).toBeGreaterThan(0);
  });

  it("switches the transcript comparison between handoff and deliverable", async () => {
    const user = userEvent.setup();
    renderRoute("/transcripts/phase-04-master-blueprint-handoff?event=phase-04-master-blueprint-handoff-event-001");
    await user.selectOptions(screen.getByRole("combobox", { name: /comparison/i }), "handoff-deliverable");
    expect(screen.getByRole("heading", { name: /handoff request/i })).toBeVisible();
    expect(screen.getByRole("heading", { name: /recorded deliverable/i })).toBeVisible();
  });

  it("validates the locked shared schema and rejects version drift or generalized verbatim records", () => {
    expect(validateSharedCatalog(generatedEvidence).schemaVersion).toBe("1.0.0");
    expect(() => validateSharedCatalog({
      ...generatedEvidence,
      catalog: { ...generatedEvidence.catalog, schemaVersion: "2.0.0" },
    })).toThrow();
    expect(() => validateSharedCatalog({
      ...generatedEvidence,
      transcripts: [{
        ...generatedEvidence.transcripts[0],
        events: [{ ...generatedEvidence.transcripts[0].events[0], verbatim: true }, ...generatedEvidence.transcripts[0].events.slice(1)],
      }, ...generatedEvidence.transcripts.slice(1)],
    })).toThrow();
  });
});
