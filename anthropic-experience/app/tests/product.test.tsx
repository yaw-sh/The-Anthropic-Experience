import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, useLocation } from "react-router-dom";
import { describe, expect, it } from "vitest";
import { AppShell } from "../src/app/AppShell";
import { OutputPile } from "../src/features/output-pile/OutputPile";
import { StatusRail } from "../src/features/status-rail/StatusRail";
import { taskOperations } from "../src/content/taskOperations";
import { publicCatalog } from "../src/content/catalog";

function renderableClaimTexts() {
  return publicCatalog.claims
    .filter(({ status }) => status !== "rejected")
    .map(({ text }) => text);
}

function LocationProbe() {
  const location = useLocation();
  return <output data-testid="location">{location.search}</output>;
}

function renderApp(entry = "/") {
  return render(
    <MemoryRouter
      initialEntries={[entry]}
      future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
    >
      <AppShell />
      <LocationProbe />
    </MemoryRouter>,
  );
}

describe("reviewable vertical slice", () => {
  it("opens with the required premise", () => {
    renderApp();
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      "THE ANTHROPIC EXPERIENCE",
    );
    expect(screen.getByText("NOW WITH CHATGPT PRO")).toBeVisible();
    expect(screen.getByText(/Claude.*ChatGPT Pro.*Codex/i)).toBeVisible();
    const heroText = screen.getByRole("banner").textContent ?? "";
    expect(renderableClaimTexts().some((text) => heroText.includes(text))).toBe(true);
  });

  it("does not assert an unsourced telemetry state in the footer", () => {
    renderApp();
    expect(screen.getByRole("contentinfo")).not.toHaveTextContent(/telemetry/i);
  });

  it("enters the review without discarding URL state", async () => {
    const user = userEvent.setup();
    renderApp("/?mode=transcript&scene=original-question");
    await user.click(screen.getByRole("button", { name: "Enter the review" }));
    expect(screen.getByTestId("location")).toHaveTextContent("mode=transcript");
    expect(screen.getByTestId("location")).toHaveTextContent("scene=original-question");
  });

  it("renders the status rail only from typed task operations", () => {
    render(<MemoryRouter><StatusRail operations={taskOperations} /></MemoryRouter>);
    const rail = screen.getByLabelText("Task operations");
    const items = within(rail).getAllByRole("listitem");
    expect(items).toHaveLength(taskOperations.length);
    expect(items.map((item) => item.dataset.status)).toEqual(
      taskOperations.map((operation) => operation.status),
    );
    expect(rail).toHaveTextContent("COMPLETED BY USER");
    expect(rail).toHaveTextContent("NOT COMPLETE");
    expect(rail).toHaveTextContent("PENDING");
    expect(rail).toHaveTextContent("UNRESOLVED");
    for (const fact of taskOperations) {
      const linkedClaim = publicCatalog.claims.find(
        ({ id }) => id === (fact as unknown as { claimId?: string }).claimId,
      );
      expect(linkedClaim?.status).not.toBe("rejected");
      expect(linkedClaim?.sourceIds.length).toBeGreaterThan(0);
      expect(rail).toHaveTextContent(linkedClaim?.text ?? "missing accepted claim");
    }
  });

  it.each(["roast", "transcript"] as const)(
    "renders %s mode copy from a renderable sourced claim",
    (mode) => {
      renderApp(`/?mode=${mode}&scene=build-this-website`);
      const panel = document.querySelector(".mode-panel");
      expect(panel).not.toBeNull();
      expect(
        publicCatalog.claims.some(
          (claim) =>
            claim.status !== "rejected" &&
            claim.sourceIds.length > 0 &&
            panel?.textContent?.includes(claim.text),
        ),
      ).toBe(true);
    },
  );

  it("navigates both required scenes and stores scene in URL state", async () => {
    const user = userEvent.setup();
    renderApp("/?mode=roast&scene=build-this-website");
    expect(screen.getByRole("heading", { name: /Build the website about this/i })).toBeVisible();
    await user.click(screen.getByRole("button", { name: /Claude \/ GitHub/i }));
    expect(screen.getByRole("heading", { name: /The original question/i })).toBeVisible();
    expect(screen.getByTestId("location")).toHaveTextContent("scene=original-question");
  });

  it("encodes Roast, Receipts, and Transcript modes in URL state", async () => {
    const user = userEvent.setup();
    renderApp("/?scene=build-this-website&mode=roast");
    for (const mode of ["Receipts", "Transcript", "Roast"]) {
      await user.click(screen.getByRole("button", { name: mode }));
      expect(screen.getByTestId("location")).toHaveTextContent(
        `mode=${mode.toLowerCase()}`,
      );
    }
  });

  it("restores a receipt deep link and closes the drawer with Escape", async () => {
    const user = userEvent.setup();
    renderApp("/?mode=receipts&scene=build-this-website&receipt=receipt-build-this-website");
    expect(screen.getByRole("dialog", { name: /Claude build receipt/i })).toBeVisible();
    await user.keyboard("{Escape}");
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    expect(screen.getByTestId("location")).not.toHaveTextContent("receipt=");
  });

  it("traps focus within the evidence drawer", async () => {
    const user = userEvent.setup();
    renderApp("/?mode=receipts&scene=build-this-website&receipt=receipt-build-this-website");
    const dialog = screen.getByRole("dialog");
    const close = within(dialog).getByRole("button", { name: /close evidence/i });
    expect(within(dialog).getAllByRole("button")).toEqual([close]);
    expect(close).toHaveFocus();
    await user.tab();
    expect(within(dialog).getByRole("link", { name: /open public source/i })).toHaveFocus();
    await user.tab();
    expect(within(dialog).getByRole("link", { name: /open exact transcript event/i })).toHaveFocus();
    await user.tab();
    expect(within(dialog).getByRole("link", { name: /back to scene/i })).toHaveFocus();
    await user.tab();
    expect(close).toHaveFocus();
    await user.tab({ shift: true });
    expect(within(dialog).getByRole("link", { name: /back to scene/i })).toHaveFocus();
  });

  it("opens evidence from a receipt link", async () => {
    const user = userEvent.setup();
    renderApp("/?mode=receipts&scene=build-this-website");
    await user.click(screen.getByRole("button", { name: /Open Claude build receipt/i }));
    expect(screen.getByRole("dialog")).toBeVisible();
    expect(screen.getByTestId("location")).toHaveTextContent(
      "receipt=receipt-build-this-website",
    );
  });
});

describe("output pile", () => {
  it("resolves every output label, detail, and pile note from renderable sourced claims", () => {
    render(<OutputPile />);
    for (const output of publicCatalog.outputs) {
      for (const claimId of [output.labelClaimId, output.detailClaimId]) {
        const claim = publicCatalog.claims.find(({ id }) => id === claimId);
        expect(claim?.status).not.toBe("rejected");
        expect(claim?.sourceIds.length).toBeGreaterThan(0);
      }
      const labelClaim = publicCatalog.claims.find(
        ({ id }) => id === output.labelClaimId,
      );
      expect(document.body).toHaveTextContent(labelClaim?.text ?? "missing label claim");
    }
    const noteClaim = publicCatalog.claims.find(
      ({ id }) => id === publicCatalog.outputPile.noteClaimId,
    );
    expect(noteClaim?.status).not.toBe("rejected");
    expect(noteClaim?.sourceIds.length).toBeGreaterThan(0);
    expect(document.body).toHaveTextContent(noteClaim?.text ?? "missing note claim");
  });

  it("exposes an equivalent semantic list for every interactive output", () => {
    render(<OutputPile />);
    const pile = screen.getByLabelText("Substituted outputs");
    const outputNames = within(pile)
      .getAllByRole("button")
      .map((button) => button.textContent);
    const semanticNames = within(screen.getByLabelText("Output inventory"))
      .getAllByRole("listitem")
      .map((item) => item.textContent);
    expect(semanticNames).toHaveLength(outputNames.length);
    expect(semanticNames.every((name, index) => name?.startsWith(outputNames[index] ?? "missing"))).toBe(true);
  });

  it("reveals the meaning of an output card when activated", async () => {
    const user = userEvent.setup();
    render(<OutputPile />);
    const output = publicCatalog.outputs[0];
    const labelClaim = publicCatalog.claims.find(({ id }) => id === output.labelClaimId);
    const detailClaim = publicCatalog.claims.find(({ id }) => id === output.detailClaimId);
    const card = screen.getByRole("button", {
      name: labelClaim?.text ?? "missing output label",
    });
    await user.click(card);
    expect(card).toHaveAttribute("aria-pressed", "true");
    expect(screen.getByRole("status")).toHaveTextContent(
      detailClaim?.text ?? "missing detail claim",
    );
  });
});
