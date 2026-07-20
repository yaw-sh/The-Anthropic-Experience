import { execFileSync, spawnSync } from "node:child_process";
import { existsSync } from "node:fs";
import { basename, dirname, join, relative } from "node:path";
import { fileURLToPath } from "node:url";

const scriptDirectory = dirname(fileURLToPath(import.meta.url));
const contentRoot = dirname(scriptDirectory);
const repositoryRoot = basename(contentRoot) === "anthropic-experience" ? dirname(contentRoot) : contentRoot;
const requiredRootEntries = new Set(["README.md", "anthropic-experience"]);
const preservedArtifact = join(contentRoot, "design/reference/claude-artifact/the-anthropic-experience.jsx");
const artifactRepositoryPath = relative(repositoryRoot, preservedArtifact);

const gitSucceeds = (args) => spawnSync("git", ["-C", repositoryRoot, ...args], { stdio: "ignore" }).status === 0;

const trackedRootEntries = new Set(
  execFileSync("git", ["-C", repositoryRoot, "ls-files", "-z"], { encoding: "utf8" })
    .split("\0")
    .filter(Boolean)
    .map((path) => path.split("/", 1)[0]),
);
const unexpectedEntries = [...trackedRootEntries].filter((entry) => !requiredRootEntries.has(entry)).sort();
const missingEntries = [...requiredRootEntries].filter((entry) => !trackedRootEntries.has(entry)).sort();

if (unexpectedEntries.length || missingEntries.length) {
  if (unexpectedEntries.length) console.error(`Unexpected tracked root entries: ${unexpectedEntries.join(", ")}`);
  if (missingEntries.length) console.error(`Missing tracked root entries: ${missingEntries.join(", ")}`);
  process.exitCode = 1;
} else if (!existsSync(preservedArtifact)) {
  console.error("Preserved Claude artifact is missing.");
  process.exitCode = 1;
} else if (!gitSucceeds(["ls-files", "--error-unmatch", "--", artifactRepositoryPath])) {
  console.error("Preserved Claude artifact is not tracked.");
  process.exitCode = 1;
} else if (!gitSucceeds(["cat-file", "-e", `HEAD:${artifactRepositoryPath}`])) {
  console.error("Preserved Claude artifact is absent from HEAD.");
  process.exitCode = 1;
} else if (!gitSucceeds(["diff", "--quiet", "HEAD", "--", artifactRepositoryPath])) {
  console.error("Preserved Claude artifact differs from HEAD.");
  process.exitCode = 1;
}
