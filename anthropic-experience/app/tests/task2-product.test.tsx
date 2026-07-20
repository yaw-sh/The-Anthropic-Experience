import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, useLocation } from "react-router-dom";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { AppShell } from "../src/app/AppShell";
import { publicCatalog } from "../src/content/catalog";

function LocationProbe() {
  const location = useLocation();
  return <output data-testid="route-location">{`${location.pathname}${location.search}`}</output>;
}

function renderRoute(entry: string) {
  return render(
    <MemoryRouter initialEntries={[entry]} future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <AppShell />
      <LocationProbe />
    </MemoryRouter>,
  );
}

describe("guided experience", () => {
  it("renders all eighteen content-record sections in order", () => {
    renderRoute("/?mode=roast&scene=prologue");
    const sections = screen.getAllByTestId("guided-section");
    expect(sections).toHaveLength(18);
    expect(sections.map((section) => section.dataset.sceneId)).toEqual(
      publicCatalog.scenes.map(({ id }) => id),
    );
    expect(sections[0]).toHaveTextContent("Prologue");
    expect(sections[17]).toHaveTextContent("Finale");
  });

  it("renders all ten responsive stage images once with only the directory eager", () => {
    renderRoute("/");
    const images = Array.from(document.querySelectorAll<HTMLImageElement>("[data-stage-image-id] img"));
    expect(images).toHaveLength(10);
    expect(images.slice(1).every((image) => image.getAttribute("loading") === "lazy")).toBe(true);
    expect(images[0]).toHaveAttribute("fetchpriority", "high");
    expect(images.every((image) => image.srcset.includes("480w") && image.srcset.includes("1920w"))).toBe(true);
  });

  it("keeps mode, scene, and receipt state URL-addressable", async () => {
    const user = userEvent.setup();
    renderRoute("/?mode=transcript&scene=chatgpt-pro");
    expect(screen.getByTestId("route-location")).toHaveTextContent("mode=transcript");
    await user.click(screen.getByRole("button", { name: "Receipts" }));
    await user.click(screen.getByRole("button", { name: /Open ChatGPT Pro receipt/i }));
    expect(screen.getByTestId("route-location")).toHaveTextContent("receipt=receipt-chatgpt-pro");
  });

  it("offers a keyboard-operable real before and after comparator", async () => {
    const user = userEvent.setup();
    renderRoute("/?scene=build-this-website");
    const slider = screen.getByRole("slider", { name: /comparison position/i });
    slider.focus();
    await user.keyboard("{ArrowRight}{ArrowRight}");
    expect(slider).toHaveValue("52");
    const comparator = screen.getByRole("group", { name: /visual comparator/i });
    expect(within(comparator).getAllByText("Supplied generated-page reference").some((item) => item.tagName === "STRONG")).toBe(true);
    expect(within(comparator).getAllByText("Final Codex implementation").some((item) => item.tagName === "STRONG")).toBe(true);
  });
});

describe("required routes", () => {
  it.each([
    ["/", "THE ANTHROPIC EXPERIENCE"],
    ["/cases/claude-github", "Claude / GitHub"],
    ["/cases/claude-build", "Claude build"],
    ["/cases/branch-cleanup", "Branch cleanup"],
    ["/cases/chatgpt-pro", "ChatGPT Pro"],
    ["/surfaces", "Surface Atlas"],
    ["/harness", "Harness Builder"],
    ["/transcripts", "Transcript Theater"],
    ["/transcripts/phase-04-master-blueprint-handoff?event=phase-04-master-blueprint-handoff-event-001", "Master blueprint handoff"],
    ["/evidence", "Evidence Room"],
    ["/method", "Method"],
    ["/corrections", "Corrections"],
    ["/about", "About"],
  ])("deep-links %s", (path, heading) => {
    renderRoute(path);
    expect(screen.getByRole("heading", { level: 1, name: new RegExp(heading, "i") })).toBeVisible();
  });

  it("uses the same scene records for case views", () => {
    renderRoute("/cases/chatgpt-pro");
    for (const scene of publicCatalog.scenes.filter(({ caseSlugs }) => caseSlugs.includes("chatgpt-pro"))) {
      expect(screen.getByText(publicCatalog.claims.find(({ id }) => id === scene.titleClaimId)?.text ?? "missing")).toBeVisible();
    }
  });
});

describe("Surface Atlas", () => {
  it("searches, filters, exposes every dimension, and computes the visible count", async () => {
    const user = userEvent.setup();
    renderRoute("/surfaces");
    expect(screen.getByText(`${publicCatalog.surfaces.length} surfaces`)).toBeVisible();
    const atlas = screen.getByRole("region", { name: /surface directory/i });
    expect(within(atlas).getAllByRole("listitem")).toHaveLength(publicCatalog.surfaces.length);
    await user.type(screen.getByRole("searchbox", { name: /search surfaces/i }), "Codex");
    expect(within(atlas).getAllByRole("listitem")).toHaveLength(2);
    await user.clear(screen.getByRole("searchbox", { name: /search surfaces/i }));
    await user.selectOptions(screen.getByRole("combobox", { name: /provider/i }), "unknown");
    expect(within(atlas).getAllByRole("listitem").length).toBeGreaterThan(0);
    expect(atlas).toHaveTextContent("unknown");
    for (const label of ["Family", "Platform", "Execution context", "Memory scope", "Tool visibility", "State visibility", "Binding controls", "Verification controls", "Evidence level"]) {
      expect(screen.getByRole("combobox", { name: label })).toBeVisible();
    }
    expect(document.body).not.toHaveTextContent("56+");
  });
});

describe("Transcript Theater", () => {
  it("labels generalized fidelity, searches metadata, tags, and event prose, and links stable event anchors", async () => {
    const user = userEvent.setup();
    renderRoute("/transcripts");
    expect(screen.getByRole("note")).toHaveTextContent(/generalized summary/i);
    await user.type(screen.getByRole("searchbox", { name: /search transcripts/i }), "observable completion");
    expect(screen.getByRole("link", { name: /Access and request/i })).toBeVisible();
    await user.clear(screen.getByRole("searchbox", { name: /search transcripts/i }));
    await user.type(screen.getByRole("searchbox", { name: /search transcripts/i }), "access");
    expect(screen.getByRole("link", { name: /Access and request/i })).toBeVisible();
  });

  it("renders instruction/action and admission/next-action comparisons at a stable event", () => {
    const transcript = publicCatalog.transcripts[0];
    const event = transcript.events[0];
    renderRoute(`/transcripts/${transcript.id}?event=${event.id}`);
    expect(screen.getByRole("heading", { name: transcript.title })).toBeVisible();
    expect(document.getElementById(event.id)).not.toBeNull();
    expect(document.getElementById(event.id)).toHaveFocus();
    expect(document.getElementById(event.id)).toHaveAttribute("aria-current", "true");
    expect(screen.getByRole("heading", { name: /^Instruction$/i })).toBeVisible();
    expect(screen.getByRole("heading", { name: /Next recorded action/i })).toBeVisible();
    expect(within(document.getElementById(event.id)!).getByRole("link", { name: /receipt/i })).toHaveAttribute("href", expect.stringContaining(event.receiptId));
  });
});

describe("Harness Builder", () => {
  beforeEach(() => {
    Object.defineProperty(navigator, "clipboard", { configurable: true, value: { writeText: vi.fn().mockResolvedValue(undefined) } });
    Object.defineProperty(URL, "createObjectURL", { configurable: true, value: vi.fn(() => "blob:fixture") });
    Object.defineProperty(URL, "revokeObjectURL", { configurable: true, value: vi.fn() });
  });

  it("supports every preset, K–12 language, copy, download, and reset without network", async () => {
    const user = userEvent.setup();
    const clipboardSpy = vi.spyOn(navigator.clipboard, "writeText");
    const clickSpy = vi.spyOn(HTMLAnchorElement.prototype, "click").mockImplementation(() => undefined);
    renderRoute("/harness");
    const preset = screen.getByRole("combobox", { name: /preset/i });
    for (const item of publicCatalog.harnessPresets) {
      await user.selectOptions(preset, item.id);
      expect((screen.getByRole("textbox", { name: /deterministic preview/i }) as HTMLTextAreaElement).value).toContain(item.label.toUpperCase());
    }
    await user.selectOptions(preset, "k12-support");
    const initial = (screen.getByRole("textbox", { name: /deterministic preview/i }) as HTMLTextAreaElement).value;
    await user.click(screen.getByRole("checkbox", { name: /plain language/i }));
    expect(screen.getByRole("textbox", { name: /deterministic preview/i })).not.toHaveValue(initial);
    await user.click(screen.getByRole("button", { name: /^Copy$/i }));
    expect(clipboardSpy).toHaveBeenCalledTimes(1);
    await user.click(screen.getByRole("button", { name: /Download/i }));
    expect(URL.createObjectURL).toHaveBeenCalledTimes(1);
    expect(clickSpy).toHaveBeenCalledTimes(1);
    await user.click(screen.getByRole("button", { name: /Reset/i }));
    expect(preset).toHaveValue("repository-coding");
    clickSpy.mockRestore();
  });

  it("edits all seven local contract answers and updates the deterministic contract", async () => {
    const user = userEvent.setup();
    renderRoute("/harness");
    for (const label of ["Outcome", "Inputs", "Authority", "State", "Substitution policy", "Verification", "Stop conditions"]) {
      expect(screen.getByRole("textbox", { name: new RegExp(`^${label}`, "i") })).toBeVisible();
    }
    const outcome = screen.getByRole("textbox", { name: /^Outcome/i });
    await user.clear(outcome);
    await user.type(outcome, "A reviewed local state exists.");
    expect((screen.getByRole("textbox", { name: /deterministic preview/i }) as HTMLTextAreaElement).value).toContain("A reviewed local state exists.");
    await user.click(screen.getByRole("button", { name: /Reset/i }));
    expect(outcome).not.toHaveValue("A reviewed local state exists.");
  });

  it("reveals the full Attempt Four report and counters in canonical scene 12", async () => {
    const user = userEvent.setup();
    renderRoute("/?scene=chatgpt-pro");
    expect(screen.getByRole("button", { name: "COMMIT THE HANDOFF" })).toBeDisabled();
    await user.click(screen.getByRole("button", { name: /Print the explanation/i }));
    expect(screen.getByRole("heading", { name: "IT HAD GITHUB ACCESS." })).toBeVisible();
    expect(screen.getByText("Repository commits").closest("li")).toHaveTextContent("0");
    expect(screen.getByText("Requested delivery state").closest("li")).toHaveTextContent("UNCHANGED");
  });
});

describe("Evidence Room and release state", () => {
  it("searches claims and sources, exposing hashes, limitations, correction history, and backlinks", async () => {
    const user = userEvent.setup();
    renderRoute("/evidence");
    expect(screen.getAllByText(/public hash/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/limitation/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/correction version 0.2/i).length).toBeGreaterThan(0);
    await user.type(screen.getByRole("searchbox", { name: /search evidence/i }), "access");
    expect(screen.getAllByRole("link", { name: /scene/i }).length).toBeGreaterThan(0);
  });

  it("cannot enable completion from query parameters or client controls", () => {
    renderRoute("/?scene=finale&complete=true&status=COMPLETE");
    const scoreboard = screen.getByRole("region", { name: /release scoreboard/i });
    expect(scoreboard).toHaveTextContent(/pending/i);
    expect(scoreboard).not.toHaveTextContent("COMPLETE");
    expect(within(scoreboard).queryByRole("button")).not.toBeInTheDocument();
  });
});
