import { expect, test } from "@playwright/test";

test("Artifact target uses hash routes with the canonical content model", async ({ page }) => {
  await page.goto("/#/surfaces?surface=surface-codex");
  await expect(page.getByRole("heading", { level: 1, name: "Surface Atlas" })).toBeVisible();
  await expect(page.getByRole("region", { name: /surface passport/i })).toContainText("Codex");
  await page.goto("/#/?scene=eight-words&mode=transcript");
  await expect(page.getByRole("group", { name: /eight-word printer/i })).toBeVisible();
  await expect(page.getByRole("button", { name: "Transcript", exact: true })).toHaveAttribute("aria-pressed", "true");
});

test("Artifact target shows receipt-derived release facts without claiming completion", async ({ page }) => {
  await page.goto("/#/");
  const scoreboard = page.getByRole("region", { name: /release scoreboard/i });
  await expect(scoreboard.getByRole("listitem")).toHaveCount(5);
  await expect(scoreboard).toContainText("pending");
  await expect(scoreboard).not.toContainText("COMPLETE");
});
