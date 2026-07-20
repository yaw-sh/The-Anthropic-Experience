import { act, fireEvent, render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { MemoryRouter, useLocation } from "react-router-dom";
import { afterEach, describe, expect, it, vi } from "vitest";
import { AppShell } from "../src/app/AppShell";
import { publicCatalog } from "../src/content/catalog";
import { SurfaceDirectoryExperience } from "../src/features/surface-directory/SurfaceDirectoryExperience";

function LocationProbe() {
  const location = useLocation();
  return <output data-testid="location">{location.pathname}{location.search}</output>;
}

function renderDirectory(entry = "/surfaces", fullFilters = true) {
  return render(
    <MemoryRouter
      initialEntries={[entry]}
      future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
    >
      <SurfaceDirectoryExperience fullFilters={fullFilters} />
      <LocationProbe />
    </MemoryRouter>,
  );
}

afterEach(() => {
  vi.useRealTimers();
  vi.restoreAllMocks();
  vi.unstubAllGlobals();
});

describe("shared surface directory", () => {
  it("synchronizes URL, ticket, wheel, passport, and count from the catalog", async () => {
    const user = userEvent.setup();
    renderDirectory("/surfaces?surface=surface-codex&utm=kept");

    expect(screen.getByText("8 surfaces", { exact: true })).toBeVisible();
    const wheelSegments = [...document.querySelectorAll<HTMLElement>(".surface-wheel__segment")];
    expect(wheelSegments).toHaveLength(publicCatalog.surfaces.length);
    expect(new Set(wheelSegments.map((segment) => `${segment.style.getPropertyValue("--segment-x")}:${segment.style.getPropertyValue("--segment-y")}`)).size).toBe(publicCatalog.surfaces.length);
    expect(screen.getByRole("radio", { name: "Wheel segment 04 · Codex" })).toHaveAttribute("aria-checked", "true");
    expect(screen.getByRole("button", { name: "Ticket 04 · Codex" })).toHaveAttribute("aria-pressed", "true");
    expect(screen.getByRole("region", { name: /surface passport/i })).toHaveTextContent("Codex");

    await user.click(screen.getByRole("radio", { name: "Wheel segment 02 · Claude Code" }));

    expect(screen.getByTestId("location")).toHaveTextContent("surface=surface-claude-code");
    expect(screen.getByTestId("location")).toHaveTextContent("utm=kept");
    expect(screen.getByRole("radio", { name: "Wheel segment 02 · Claude Code" })).toHaveAttribute("aria-checked", "true");
    expect(screen.getByRole("button", { name: "Ticket 02 · Claude Code" })).toHaveAttribute("aria-pressed", "true");
    expect(screen.getByRole("region", { name: /surface passport/i })).toHaveTextContent("Claude Code");
  });

  it("makes family addressable and replaces a hidden selection with the first visible surface", async () => {
    const user = userEvent.setup();
    renderDirectory("/surfaces?surface=surface-codex&mode=receipts");

    await user.selectOptions(screen.getByRole("combobox", { name: "Family" }), "assistant");

    await waitFor(() => {
      expect(screen.getByTestId("location")).toHaveTextContent("family=assistant");
      expect(screen.getByTestId("location")).toHaveTextContent("surface=surface-claude-web");
    });
    expect(screen.getByTestId("location")).toHaveTextContent("mode=receipts");
    expect(screen.getByText("2 surfaces", { exact: true })).toBeVisible();
    expect(screen.getByRole("region", { name: /surface passport/i })).toHaveTextContent("Claude web");
  });

  it("retains the prior URL selection and renders an empty state when no surfaces match", async () => {
    const user = userEvent.setup();
    renderDirectory("/surfaces?surface=surface-codex");

    await user.type(screen.getByRole("searchbox", { name: /search surfaces/i }), "no such surface");

    expect(screen.getByText("0 surfaces", { exact: true })).toBeVisible();
    expect(screen.getByText("No matching surfaces.")).toBeVisible();
    expect(screen.queryByRole("region", { name: /surface passport/i })).not.toBeInTheDocument();
    expect(screen.getByRole("button", { name: /spin/i })).toBeDisabled();
    expect(screen.getByTestId("location")).toHaveTextContent("surface=surface-codex");
  });

  it("keeps canonical ordinals when filters hide earlier records", async () => {
    const user = userEvent.setup();
    renderDirectory("/surfaces?surface=surface-codex");

    await user.selectOptions(screen.getByRole("combobox", { name: "Provider" }), "unknown");

    await waitFor(() => expect(screen.getByRole("radio", { name: "Wheel segment 05 · Repository view" })).toBeVisible());
    expect(screen.getByRole("radio", { name: "Wheel segment 06 · Document editor" })).toBeVisible();
    expect(screen.getByRole("radio", { name: "Wheel segment 07 · Browser session" })).toBeVisible();
    expect(screen.queryByRole("radio", { name: /Wheel segment 01 ·/ })).not.toBeInTheDocument();
  });

  it("locks repeated spins, keeps focus, resolves in 1.2 seconds, and announces the winner", () => {
    vi.useFakeTimers();
    vi.spyOn(Math, "random").mockReturnValue(0.5);
    renderDirectory("/surfaces?surface=surface-claude-web");
    const spin = screen.getByRole("button", { name: "Spin" });
    spin.focus();

    fireEvent.click(spin);
    fireEvent.click(spin);

    expect(Math.random).toHaveBeenCalledTimes(1);
    expect(spin).toBeDisabled();
    expect(spin).toHaveFocus();
    expect(screen.getByText("Spinning.")).toHaveAttribute("aria-live", "polite");
    expect(screen.getByTestId("location")).toHaveTextContent("surface=surface-claude-web");

    act(() => vi.advanceTimersByTime(1199));
    expect(screen.getByTestId("location")).toHaveTextContent("surface=surface-claude-web");
    act(() => vi.advanceTimersByTime(1));

    expect(spin).toBeEnabled();
    expect(spin).toHaveFocus();
    expect(screen.getByTestId("location")).toHaveTextContent("surface=surface-repository");
    expect(screen.getByText("Selected 05 · Repository view.")).toHaveAttribute("aria-live", "polite");
  });

  it("rotates the live catalog segment to the pointer while its contents stay upright", () => {
    vi.useFakeTimers();
    vi.spyOn(Math, "random").mockReturnValue(0.25);
    renderDirectory("/surfaces?surface=surface-claude-web");

    fireEvent.click(screen.getByRole("button", { name: "Spin" }));

    const rotor = document.querySelector<HTMLElement>(".surface-wheel__rotor");
    const winner = screen.getByRole("radio", { name: "Wheel segment 03 · ChatGPT Pro" });
    const content = winner.querySelector<HTMLElement>(".surface-wheel__segment-content");
    const rotation = Number.parseFloat(rotor?.style.getPropertyValue("--wheel-rotation") ?? "");
    const segmentAngle = Number.parseFloat(winner.style.getPropertyValue("--segment-angle"));
    const counterRotation = Number.parseFloat(content?.style.getPropertyValue("--counter-rotation") ?? "");

    expect(rotor).toContainElement(winner);
    expect(((rotation + segmentAngle) % 360 + 360) % 360).toBeCloseTo(0, 5);
    expect(counterRotation).toBe(-rotation);
  });

  it("cancels a pending spin when filtering produces zero results", () => {
    vi.useFakeTimers();
    vi.spyOn(Math, "random").mockReturnValue(0.5);
    renderDirectory("/surfaces?surface=surface-codex");

    fireEvent.click(screen.getByRole("button", { name: "Spin" }));
    fireEvent.change(screen.getByRole("searchbox", { name: /search surfaces/i }), { target: { value: "no such surface" } });

    expect(screen.getByText("0 surfaces", { exact: true })).toBeVisible();
    expect(screen.getByTestId("location")).toHaveTextContent("surface=surface-codex");
    expect(screen.getByTestId("location")).toHaveTextContent("q=no+such+surface");
    act(() => vi.advanceTimersByTime(1200));

    expect(screen.getByTestId("location")).toHaveTextContent("surface=surface-codex");
    expect(screen.getByTestId("location")).toHaveTextContent("q=no+such+surface");
    expect(screen.queryByText("Selected 05 · Repository view.")).not.toBeInTheDocument();
  });

  it("cancels a pending spin when a filter changes but its sampled winner remains visible", () => {
    vi.useFakeTimers();
    vi.spyOn(Math, "random").mockReturnValue(0.75);
    renderDirectory("/surfaces?surface=surface-repository");

    fireEvent.click(screen.getByRole("button", { name: "Spin" }));
    fireEvent.change(screen.getByRole("combobox", { name: "Provider" }), { target: { value: "unknown" } });

    expect(screen.getByRole("radio", { name: "Wheel segment 07 · Browser session" })).toBeVisible();
    act(() => vi.advanceTimersByTime(1200));

    expect(screen.getByTestId("location")).toHaveTextContent("provider=unknown");
    expect(screen.getByTestId("location")).toHaveTextContent("surface=surface-repository");
    expect(screen.queryByText("Selected 07 · Browser session.")).not.toBeInTheDocument();
  });

  it("cancels a pending spin when the user directly selects a different surface", () => {
    vi.useFakeTimers();
    vi.spyOn(Math, "random").mockReturnValue(0.5);
    renderDirectory("/surfaces?surface=surface-claude-web&utm=kept");

    fireEvent.click(screen.getByRole("button", { name: "Spin" }));
    fireEvent.click(screen.getByRole("button", { name: "Ticket 02 · Claude Code" }));
    act(() => vi.advanceTimersByTime(1200));

    expect(screen.getByTestId("location")).toHaveTextContent("surface=surface-claude-code");
    expect(screen.getByTestId("location")).toHaveTextContent("utm=kept");
    expect(screen.queryByText("Selected 05 · Repository view.")).not.toBeInTheDocument();
  });

  it("gives the passport receipt link an explicit 44px hit target", () => {
    renderDirectory("/surfaces?surface=surface-codex");

    expect(screen.getByRole("link", { name: "Open surface receipt" })).toHaveClass("surface-passport__receipt");
    const css = readFileSync(resolve(process.cwd(), "src/styles/system.css"), "utf8");
    const receiptRule = css.match(/\.surface-passport__receipt\s*\{([^}]*)\}/)?.[1] ?? "";
    expect(receiptRule).toMatch(/display:\s*inline-flex/);
    expect(receiptRule).toMatch(/min-height:\s*44px/);
  });

  it("resolves a reduced-motion spin immediately", () => {
    vi.spyOn(Math, "random").mockReturnValue(0.25);
    vi.stubGlobal("matchMedia", vi.fn().mockReturnValue({
      matches: true,
      media: "(prefers-reduced-motion: reduce)",
      onchange: null,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      addListener: vi.fn(),
      removeListener: vi.fn(),
      dispatchEvent: vi.fn(),
    }));
    renderDirectory("/surfaces?surface=surface-claude-web");

    fireEvent.click(screen.getByRole("button", { name: "Spin" }));

    expect(screen.getByRole("button", { name: "Spin" })).toBeEnabled();
    expect(screen.getByTestId("location")).toHaveTextContent("surface=surface-chatgpt-pro");
    expect(screen.getByText("Selected 03 · ChatGPT Pro.")).toHaveAttribute("aria-live", "polite");
  });

  it("uses one roving radio tab stop with wrapping keys and explicit activation", () => {
    renderDirectory("/surfaces?surface=surface-codex");
    const radios = screen.getAllByRole("radio");
    expect(radios.filter((radio) => radio.tabIndex === 0)).toHaveLength(1);
    const selected = screen.getByRole("radio", { name: "Wheel segment 04 · Codex" });
    selected.focus();

    fireEvent.keyDown(selected, { key: "ArrowRight" });
    const next = screen.getByRole("radio", { name: "Wheel segment 05 · Repository view" });
    expect(next).toHaveFocus();
    expect(screen.getByTestId("location")).toHaveTextContent("surface=surface-codex");
    fireEvent.keyDown(next, { key: "Enter" });
    expect(screen.getByTestId("location")).toHaveTextContent("surface=surface-repository");

    fireEvent.keyDown(next, { key: "End" });
    const last = screen.getByRole("radio", { name: "Wheel segment 08 · Intent harness" });
    expect(last).toHaveFocus();
    fireEvent.keyDown(last, { key: " " });
    expect(screen.getByTestId("location")).toHaveTextContent("surface=surface-harness");
    fireEvent.keyDown(last, { key: "Home" });
    expect(screen.getByRole("radio", { name: "Wheel segment 01 · Claude web" })).toHaveFocus();
  });

  it("keeps full-atlas dimensions dormant on home and links to the same URL state", () => {
    renderDirectory("/?surface=surface-codex&provider=unknown&campaign=kept", false);

    expect(screen.getByText("8 surfaces", { exact: true })).toBeVisible();
    expect(screen.getByRole("region", { name: /surface passport/i })).toHaveTextContent("Codex");
    const link = screen.getByRole("link", { name: /open full surface atlas/i });
    expect(link).toHaveAttribute("href", expect.stringContaining("surface=surface-codex"));
    expect(link).toHaveAttribute("href", expect.stringContaining("provider=unknown"));
    expect(link).toHaveAttribute("href", expect.stringContaining("campaign=kept"));
  });

  it("shows all ten filters only on the full directory route", () => {
    const { unmount } = renderDirectory("/?surface=surface-claude-web", false);
    expect(screen.getByRole("combobox", { name: "Family" })).toBeVisible();
    expect(screen.queryByRole("combobox", { name: "Provider" })).not.toBeInTheDocument();
    unmount();

    renderDirectory("/surfaces?surface=surface-claude-web", true);
    expect(screen.getAllByRole("combobox")).toHaveLength(10);
  });
});

describe("homepage composition", () => {
  it("opens with the alternate directory artwork and keeps the original hero as a lazy prologue", () => {
    render(
      <MemoryRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <AppShell />
      </MemoryRouter>,
    );
    const images = screen.getAllByRole("img");
    expect(images[0]).toHaveAttribute("alt", expect.stringMatching(/big-top directory stage/i));
    expect(images[0]).toHaveAttribute("fetchpriority", "high");
    expect(images[0]).toHaveAttribute("width", "1920");
    expect(images[0]).toHaveAttribute("height", "1080");
    expect(images[1]).toHaveAttribute("alt", expect.stringMatching(/big-top prologue stage/i));
    expect(images[1]).toHaveAttribute("loading", "lazy");

    const scene = document.querySelector('[data-scene-id="surface-wheel"]') as HTMLElement;
    expect(within(scene).queryByRole("button", { name: /select next surface/i })).not.toBeInTheDocument();
    expect(within(scene).getByRole("link", { name: /open filtered surface directory/i })).toBeVisible();
  });
});
