import { defineConfig, devices } from "@playwright/test";

const reviewOrigin = ["http:", "", "127.0.0.1:4173"].join("/");

export default defineConfig({
  testDir: "./tests/e2e",
  use: { baseURL: reviewOrigin },
  webServer: {
    command: "npm run preview -- --host 127.0.0.1",
    port: 4173,
    reuseExistingServer: true,
  },
  projects: [
    { name: "desktop", use: { ...devices["Desktop Chrome"] } },
    { name: "mobile-390", use: { viewport: { width: 390, height: 844 } } },
    { name: "mobile-320", use: { viewport: { width: 320, height: 700 } } },
  ],
});
