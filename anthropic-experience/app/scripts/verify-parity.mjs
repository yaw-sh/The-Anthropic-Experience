import { readFileSync } from "node:fs";
import { isDeepStrictEqual } from "node:util";

const canonical = JSON.parse(readFileSync("verification/canonical-build-parity.json", "utf8"));
const artifact = JSON.parse(readFileSync("verification/artifact-build-parity.json", "utf8"));
if (!isDeepStrictEqual(canonical, artifact)) throw new Error("Canonical and Artifact content receipts differ");
for (const key of [
  "sceneOrder", "hero", "outputPile", "outputs", "claims", "sources", "receipts", "scenes",
  "surfaces", "transcripts", "harness", "pages", "correctionVersion", "images", "requiredRoutes",
  "releaseFacts", "taskOperations", "finalTaskStatus",
]) {
  if (!(key in canonical)) throw new Error(`Parity receipt missing ${key}`);
}
console.log(`Build parity passed: ${canonical.contentHash}`);
