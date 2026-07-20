import { expect, test } from "@playwright/test";

test("development server applies the application stylesheet under CSP", async ({ page }) => {
  await page.goto("/harness");
  await expect(page.getByRole("heading", { name: "Harness Builder" })).toBeVisible();
  await expect.poll(() => page.locator("body").evaluate((body) => getComputedStyle(body).backgroundColor)).toBe("rgb(18, 15, 18)");
});
