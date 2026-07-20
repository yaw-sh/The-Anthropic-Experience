import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

async function expectNoHorizontalOverflow(page: import("@playwright/test").Page) {
  expect(await page.locator("html").evaluate((element) => element.scrollWidth <= element.clientWidth)).toBe(true);
}

async function expectNoAxeViolations(page: import("@playwright/test").Page) {
  expect((await new AxeBuilder({ page }).analyze()).violations).toEqual([]);
}

test("guided journey and receipt deep link survive refresh", async ({ page }) => {
  await page.goto("/?mode=receipts&scene=chatgpt-pro");
  await expect(page.getByTestId("guided-section")).toHaveCount(18);
  await page.getByRole("button", { name: /Open ChatGPT Pro receipt/i }).click();
  await expect(page).toHaveURL(/receipt=receipt-chatgpt-pro/);
  await page.reload();
  await expect(page.getByRole("dialog", { name: /ChatGPT Pro receipt/i })).toBeVisible();
  await expectNoAxeViolations(page);
});

test("ChatGPT Pro case is directly addressable and refresh-safe", async ({ page }) => {
  await page.goto("/cases/chatgpt-pro");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("ChatGPT Pro");
  await expect(page.getByRole("heading", { name: "ChatGPT Pro files the joke away" })).toBeVisible();
  await page.reload();
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("ChatGPT Pro");
});

test("every required route loads directly and survives refresh", async ({ page }) => {
  const routes = [
    "/",
    "/surfaces",
    "/cases/claude-github",
    "/cases/claude-build",
    "/cases/branch-cleanup",
    "/cases/chatgpt-pro",
    "/harness",
    "/transcripts",
    "/transcripts/phase-04-master-blueprint-handoff?event=phase-04-master-blueprint-handoff-event-001",
    "/evidence",
    "/method",
    "/corrections",
    "/about",
  ];
  for (const route of routes) {
    await page.goto(route);
    await expect(page.locator("main")).toBeVisible();
    await page.reload();
    await expect(page.locator("main")).toBeVisible();
  }
});

test("a transcript event query focuses and marks the addressed event", async ({ page }) => {
  await page.goto("/transcripts/phase-04-master-blueprint-handoff?event=phase-04-master-blueprint-handoff-event-001");
  const event = page.locator("#phase-04-master-blueprint-handoff-event-001");
  await expect(event).toBeFocused();
  await expect(event).toHaveAttribute("aria-current", "true");
});

test("atlas passport search and unknown filters retain a usable directory", async ({ page }) => {
  await page.goto("/surfaces");
  await page.getByRole("searchbox", { name: /search surfaces/i }).fill("Codex");
  await expect(page.getByRole("region", { name: /surface directory/i }).getByRole("listitem")).toHaveCount(2);
  await page.getByRole("searchbox", { name: /search surfaces/i }).fill("");
  await expect(page.getByRole("region", { name: /surface directory/i }).getByRole("listitem")).toHaveCount(8);
  await page.getByRole("combobox", { name: "Provider" }).selectOption("unknown");
  await expect(page.getByText("3 surfaces", { exact: true })).toBeVisible();
  await expectNoHorizontalOverflow(page);
});

test("K–12 harness toggles language and downloads without an external request", async ({ page }) => {
  const externalRequests: string[] = [];
  await page.goto("/harness");
  page.on("request", (request) => {
    if (new URL(request.url()).origin !== new URL(page.url()).origin) externalRequests.push(request.url());
  });
  await page.getByRole("combobox", { name: /preset/i }).selectOption("k12-support");
  await page.getByRole("checkbox", { name: /plain language/i }).check();
  await expect(page.getByRole("textbox", { name: /deterministic preview/i })).toHaveValue(/short sentences/);
  const downloadPromise = page.waitForEvent("download");
  await page.getByRole("button", { name: /Download/i }).click();
  const download = await downloadPromise;
  expect(download.suggestedFilename()).toBe("intent-harness-k12-support.txt");
  expect(externalRequests).toEqual([]);
});

test("desktop harness preview is populated and visible in the initial viewport", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "desktop", "Desktop two-column layout regression");
  await page.goto("/harness");
  const preview = page.getByRole("textbox", { name: /deterministic preview/i });
  await expect(preview).toHaveValue(/\S/);
  await expect(preview).toBeInViewport();
});

test("keyboard-only path changes mode and opens a receipt", async ({ page }) => {
  await page.goto("/?scene=build-this-website&mode=roast");
  for (let index = 0; index < 120; index += 1) {
    const name = await page.evaluate(() => document.activeElement?.textContent?.trim());
    if (name === "Receipts") break;
    await page.keyboard.press("Tab");
  }
  await expect(page.getByRole("button", { name: "Receipts", exact: true })).toBeFocused();
  await page.keyboard.press("Enter");
  await expect(page.getByRole("button", { name: "Receipts", exact: true })).toHaveAttribute("aria-pressed", "true");
  for (let index = 0; index < 200; index += 1) {
    const name = await page.evaluate(() => document.activeElement?.textContent?.trim());
    if (name?.includes("Open Claude build receipt")) break;
    await page.keyboard.press("Tab");
  }
  await expect(page.getByRole("button", { name: /Open Claude build receipt/i })).toBeFocused();
  await page.keyboard.press("Enter");
  await expect(page.getByRole("dialog", { name: /Claude build receipt/i })).toBeVisible();
});

test("reduced-motion path removes smooth scrolling and transitions", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/?scene=build-this-website");
  await expect(page.locator("html")).toHaveCSS("scroll-behavior", "auto");
  const transitionSeconds = await page.getByRole("slider", { name: /comparison position/i }).evaluate((element) => parseFloat(getComputedStyle(element).transitionDuration));
  expect(transitionSeconds).toBeLessThan(0.001);
});

test("mobile transcript to evidence path is complete at 320 and 390 widths", async ({ page }) => {
  for (const width of [320, 390]) {
    await page.setViewportSize({ width, height: 760 });
    await page.goto("/transcripts/phase-04-master-blueprint-handoff?event=phase-04-master-blueprint-handoff-event-001");
    await expect(page.getByRole("note")).toContainText(/not verbatim/i);
    await expectNoHorizontalOverflow(page);
    await page.locator("#phase-04-master-blueprint-handoff-event-001").getByRole("link", { name: /receipt/i }).click();
    await expect(page.getByRole("heading", { level: 1, name: /Evidence Room/i })).toBeVisible();
    await expect(page.getByRole("dialog", { name: /ChatGPT Pro receipt/i })).toBeVisible();
    await expectNoHorizontalOverflow(page);
    await page.keyboard.press("Escape");
  }
  await expectNoAxeViolations(page);
});

test("scene mechanics change observable state without a pointer", async ({ page }) => {
  await page.goto("/?scene=eight-words");
  const printer = page.getByRole("group", { name: "Eight-word printer" });
  await printer.getByRole("button", { name: /print next word/i }).focus();
  await page.keyboard.press("Enter");
  await expect(printer.getByRole("status")).toHaveText("Unpack");

  const authorization = page.locator('[data-layout-id="authorization-chain"]');
  const permission = authorization.getByRole("button", { name: /permission granted/i });
  await permission.focus();
  await page.keyboard.press("Enter");
  await expect(permission).toHaveAttribute("aria-pressed", "true");
  await expect(authorization.getByRole("region", { name: /authorization chain detail/i })).toContainText(/method stage/i);
});

test("visual comparator opens and closes its full-screen dialog", async ({ page }) => {
  await page.goto("/?scene=build-this-website");
  const comparator = page.getByRole("group", { name: /visual comparator/i });
  await expect(comparator.getByRole("img")).toHaveCount(2);
  await comparator.getByRole("button", { name: /full screen/i }).click();
  await expect(page.getByRole("dialog", { name: /visual comparison/i })).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(page.getByRole("dialog", { name: /visual comparison/i })).toBeHidden();
});

test("surface passport and task rail state remain addressable", async ({ page }) => {
  await page.goto("/surfaces?surface=surface-codex");
  await expect(page.getByRole("region", { name: /surface passport/i })).toContainText("Codex");
  await page.getByRole("button", { name: "Ticket 01 · Claude web", exact: true }).click();
  await expect(page).toHaveURL(/surface=surface-claude-web/);
  await page.reload();
  await expect(page.getByRole("region", { name: /surface passport/i })).toContainText("Claude web");

  if ((page.viewportSize()?.width ?? 1000) <= 390) {
    const disclosure = page.getByRole("button", { name: /task operations/i });
    await disclosure.click();
    await expect(disclosure).toHaveAttribute("aria-expanded", "true");
    await expect(page.getByRole("complementary", { name: /task operations/i }).getByRole("listitem")).toHaveCount(5);
  }
});

test("visible controls meet the minimum target size", async ({ page }) => {
  await page.goto("/?scene=build-this-website");
  const undersized = await page.locator("button:visible, a:visible, input:visible, select:visible, summary:visible").evaluateAll((elements) => elements.flatMap((element) => {
    const box = element.getBoundingClientRect();
    return box.width < 43.5 || box.height < 43.5 ? [{ text: element.textContent?.trim(), width: box.width, height: box.height, tag: element.tagName }] : [];
  }));
  expect(undersized).toEqual([]);
});
