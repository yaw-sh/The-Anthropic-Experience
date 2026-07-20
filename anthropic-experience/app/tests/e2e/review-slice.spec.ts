import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

test("review slice is responsive and has no automatically detectable accessibility issues", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/?mode=receipts&scene=build-this-website");
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "THE ANTHROPIC EXPERIENCE",
  );
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute(
    "content",
    "noindex, nofollow",
  );
  expect(await page.locator("html").evaluate((element) => element.scrollWidth <= element.clientWidth)).toBe(true);
  await expect(page.locator("html")).toHaveCSS("scroll-behavior", "auto");

  await page.getByRole("button", { name: /Open Claude build receipt/i }).click();
  await expect(page).toHaveURL(/receipt=receipt-build-this-website/);
  await page.reload();
  await expect(page.getByRole("dialog", { name: /Claude build receipt/i })).toBeVisible();

  const results = await new AxeBuilder({ page }).analyze();
  expect(results.violations).toEqual([]);

  await page.keyboard.press("Escape");
  await expect(page.getByRole("dialog")).toBeHidden();
});
