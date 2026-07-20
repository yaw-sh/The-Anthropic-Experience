import { defineConfig, devices } from "@playwright/test";

const developmentOrigin = ["http:", "", "127.0.0.1:5173"].join("/");

export default defineConfig({
  testDir: "./tests/dev",
  use: { baseURL: developmentOrigin, ...devices["Desktop Chrome"] },
  webServer: {
    command: "npm run dev -- --host 127.0.0.1",
    port: 5173,
    reuseExistingServer: false,
  },
});
