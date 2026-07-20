import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, useLocation } from "react-router-dom";
import { describe, expect, it } from "vitest";
import { AppShell } from "../src/app/AppShell";
import { stageLayouts } from "../src/content/stageLayouts";

function LocationProbe() {
  const location = useLocation();
  return <output data-testid="stage-location">{`${location.pathname}${location.search}${location.hash}`}</output>;
}

function renderApp(entry = "/") {
  return render(
    <MemoryRouter initialEntries={[entry]} future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <AppShell />
      <LocationProbe />
    </MemoryRouter>,
  );
}

const mapping = {
  prologue: "heroBigTop",
  "surface-wheel": "actFunhouse",
  "original-question": "actHiddenCapabilities",
  "seven-minute-lesson": "actThreeRings",
  "user-control-plane": "actControlPlane",
  "build-this-website": "actPaperwork",
  "evidence-room": "actBackstage",
  finale: "actPrizeBooth",
} as const;

describe("responsive scene frameworks", () => {
  it("renders the exact ten-image map once and never duplicates the directory", () => {
    renderApp();
    expect(document.querySelectorAll("[data-stage-image-id]")).toHaveLength(10);
    for (const imageId of stageLayouts.map(({ imageId }) => imageId)) {
      expect(document.querySelectorAll(`[data-stage-image-id="${imageId}"]`)).toHaveLength(1);
    }
    expect(document.querySelectorAll('[data-stage-image-id="heroBigTopAlt"]')).toHaveLength(1);
    for (const [sceneId, imageId] of Object.entries(mapping)) {
      const scene = document.querySelector(`[data-scene-id="${sceneId}"]`) as HTMLElement;
      expect(scene.querySelector(`[data-stage-image-id="${imageId}"]`)).not.toBeNull();
    }
    for (const sceneId of ["eight-words", "audit-needs-audit", "export-only", "branch-cleanup", "hands-off", "handoff-understood", "correction-loop", "mechanism-logos", "build-missing-layer"]) {
      expect(document.querySelector(`[data-scene-id="${sceneId}"] [data-stage-image-id]`)).toBeNull();
    }
  });

  it("renders one shared control tree with every stage control exactly once", () => {
    renderApp();
    const controls = stageLayouts.flatMap(({ slots }) => slots.map(({ controlId }) => controlId));
    expect(document.querySelectorAll("[data-stage-control-id]")).toHaveLength(42);
    for (const controlId of controls) {
      expect(document.querySelectorAll(`[data-stage-control-id="${controlId}"]`)).toHaveLength(1);
    }
    for (const stage of document.querySelectorAll(".responsive-scene-stage")) {
      expect(stage.querySelectorAll(".responsive-scene-stage__controls")).toHaveLength(1);
    }
  });

  it("keeps intrinsic image sizing and structural reuse below 900px", () => {
    renderApp();
    const stageImage = document.querySelector(".responsive-scene-stage__image") as HTMLImageElement;
    expect(stageImage.width).toBeGreaterThan(0);
    expect(stageImage.height).toBeGreaterThan(0);
    expect(stageImage.getAttribute("style") ?? "").not.toMatch(/object-fit\s*:\s*cover/i);
    const css = readFileSync(resolve("src/styles/system.css"), "utf8");
    expect(css).toMatch(/@media\s*\(max-width:\s*899px\)/);
    expect(css).toMatch(/\.responsive-scene-stage__controls[\s\S]*position:\s*static/);
    expect(css).not.toMatch(/responsive-scene-stage__controls--mobile/);
  });

  it("filters the shared family URL while retaining the selected surface", async () => {
    const user = userEvent.setup();
    renderApp("/?surface=surface-codex&scene=surface-wheel");
    const scene = document.querySelector('[data-scene-id="surface-wheel"]') as HTMLElement;
    await user.click(within(scene).getByRole("button", { name: /coding agent/i }));
    expect(screen.getByTestId("stage-location")).toHaveTextContent("surface=surface-codex");
    expect(screen.getByTestId("stage-location")).toHaveTextContent("family=coding-agent");
  });

  it("reveals sourced capability detail and receipt access", async () => {
    const user = userEvent.setup();
    renderApp("/?scene=original-question");
    const scene = document.querySelector('[data-scene-id="original-question"]') as HTMLElement;
    await user.click(within(scene).getByRole("button", { name: /^credentials$/i }));
    const companion = within(scene).getByRole("region", { name: /capability inventory detail/i });
    expect(companion).toHaveTextContent(/inspection layer/i);
    await user.click(within(companion).getByRole("button", { name: /open receipt/i }));
    expect(screen.getByRole("dialog")).toBeVisible();
  });

  it("presents authorization as sourced method stages without fabricated outcomes", async () => {
    const user = userEvent.setup();
    renderApp("/?scene=original-question");
    const scene = document.querySelector('[data-scene-id="original-question"]') as HTMLElement;
    await user.click(within(scene).getByRole("button", { name: /permission granted/i }));
    const authorization = within(scene).getByRole("region", { name: /authorization chain detail/i });
    expect(authorization).toHaveTextContent(/method stage/i);
    expect(within(authorization).queryByText(/^(?:OPEN|PASSED|CLOSED|NOT PASSED)$/i)).not.toBeInTheDocument();
  });

  it("uses Evidence, Recognition, and Consequence with the complete method sequence", async () => {
    const user = userEvent.setup();
    renderApp("/?scene=seven-minute-lesson");
    const scene = document.querySelector('[data-scene-id="seven-minute-lesson"]') as HTMLElement;
    for (const name of ["Evidence", "Recognition", "Consequence"]) {
      expect(within(scene).getByRole("button", { name })).toBeVisible();
    }
    await user.click(within(scene).getByRole("button", { name: "Recognition" }));
    expect(within(scene).getByRole("region", { name: /thesis framework detail/i })).toHaveTextContent(
      "Available → Inspected → Recognized → Later binding opportunity → Behavior → Verified outcome",
    );
  });

  it("activates all eight responsibility records", async () => {
    const user = userEvent.setup();
    renderApp("/?scene=user-control-plane");
    const scene = document.querySelector('[data-scene-id="user-control-plane"]') as HTMLElement;
    expect(within(scene).getAllByRole("button", { name: /tool discovery|product navigation|repository state|continuity|contradiction detection|privacy review|progress enforcement|definition of done/i })).toHaveLength(8);
    await user.click(within(scene).getByRole("button", { name: /definition of done/i }));
    expect(within(scene).getByRole("region", { name: /operator responsibility detail/i })).toHaveTextContent(/definition of done/i);
  });

  it("reuses one OutputPile instance for paperwork and preserves its unchanged task state", async () => {
    const user = userEvent.setup();
    renderApp("/?scene=build-this-website");
    const scene = document.querySelector('[data-scene-id="build-this-website"]') as HTMLElement;
    expect(scene.querySelectorAll(".output-pile-wrap")).toHaveLength(1);
    await user.click(within(scene).getByRole("button", { name: /move output pile aside/i }));
    expect(within(scene).getByRole("region", { name: /paperwork output detail/i })).toHaveTextContent(/Phase 0/i);
  });

  it("switches readable Evidence Room metadata and links to the route", async () => {
    const user = userEvent.setup();
    renderApp("/?scene=evidence-room");
    const scene = document.querySelector('[data-scene-id="evidence-room"]') as HTMLElement;
    await user.click(within(scene).getByRole("button", { name: /backstage/i }));
    const companion = within(scene).getByRole("region", { name: /evidence room detail/i });
    expect(companion).toHaveTextContent(/source/i);
    expect(companion).toHaveTextContent(/receipt/i);
    expect(within(companion).getByRole("link", { name: /open evidence room/i })).toHaveAttribute("href", "/evidence");
  });

  it("owns the only full scoreboard in the finale and returns with surface state", async () => {
    const user = userEvent.setup();
    renderApp("/?surface=surface-codex&scene=finale");
    const finale = document.querySelector('[data-scene-id="finale"]') as HTMLElement;
    expect(document.querySelectorAll(".release-scoreboard")).toHaveLength(1);
    expect(finale.querySelector(".release-scoreboard")).not.toBeNull();
    const footer = screen.getByRole("contentinfo");
    expect(footer.querySelector(".release-scoreboard")).toBeNull();
    expect(within(footer).getByRole("link", { name: /generated release status/i })).toBeVisible();
    await user.click(within(finale).getByRole("link", { name: /return to directory/i }));
    expect(screen.getByTestId("stage-location")).toHaveTextContent("surface=surface-codex");
    expect(screen.getByTestId("stage-location")).toHaveTextContent("#main-content");
  });
});
