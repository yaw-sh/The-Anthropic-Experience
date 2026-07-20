import { spawnSync } from "node:child_process";
import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";

const root = process.cwd();
const receiptPath = resolve(root, "verification/release-verification.json");
const receipt = JSON.parse(readFileSync(receiptPath, "utf8"));
const commands = [
  { id: "unit", command: ["npm", "test", "--", "--run"] },
  { id: "typecheck", command: ["npm", "run", "typecheck"] },
  { id: "lint", command: ["npm", "run", "lint"] },
  { id: "privacy", command: ["npm", "run", "privacy"] },
  { id: "canonical-build", command: ["npm", "run", "build"] },
  { id: "artifact-build", command: ["npm", "run", "build:artifact"] },
  { id: "parity", command: ["npm", "run", "verify:parity"] },
  { id: "playwright", command: ["npm", "run", "test:e2e"] },
  { id: "artifact-playwright", command: ["npm", "run", "test:artifact"] },
  { id: "dev-csp", command: ["npm", "run", "test:dev"] },
];

if (receipt.schemaVersion !== "1.0.0" || !Array.isArray(receipt.checks)) throw new Error("release-verification.json does not match schemaVersion 1.0.0");
for (const check of receipt.checks.filter(({ status }) => status === "pass")) {
  if (typeof check.evidencePath !== "string" || !existsSync(resolve(root, check.evidencePath))) throw new Error(`Passing verification check has no existing tracked evidence path: ${check.id}`);
  const tracked = spawnSync("git", ["ls-files", "--error-unmatch", check.evidencePath], { cwd: root, encoding: "utf8" });
  if (tracked.status !== 0 || !tracked.stdout.trim()) throw new Error(`Passing verification check has untracked evidence: ${check.id}`);
}

for (const entry of commands) {
  const result = spawnSync(entry.command[0], entry.command.slice(1), { cwd: root, encoding: "utf8", stdio: "inherit" });
  if (result.status !== 0) {
    console.error(`Release verification failed: ${entry.id}`);
    process.exitCode = 1;
    break;
  }
}

if (process.exitCode !== 1) console.log(`Release verification passed ${commands.length} fresh commands using committed evidence paths.`);
