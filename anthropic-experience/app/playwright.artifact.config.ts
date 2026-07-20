import { defineConfig, devices } from "@playwright/test";

const artifactOrigin = ["http:", "", "127.0.0.1:4174"].join("/");

export default defineConfig({
  testDir: "./tests/artifact",
  use: { baseURL: artifactOrigin },
  webServer: {
    command: "vite preview --outDir dist-artifact --host 127.0.0.1 --port 4174",
    port: 4174,
    reuseExistingServer: true,
  },
  projects: [{ name: "artifact-desktop", use: { ...devices["Desktop Chrome"] } }],
});
