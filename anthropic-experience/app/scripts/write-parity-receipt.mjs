import { createHash } from "node:crypto";
import { existsSync, readFileSync, unlinkSync, writeFileSync } from "node:fs";
import { join, resolve } from "node:path";
import { pathToFileURL } from "node:url";
import { build } from "esbuild";

const [outDir, buildKind, option] = process.argv.slice(2);
if (!outDir || !["canonical", "artifact"].includes(buildKind)) throw new Error("Usage: write-parity-receipt.mjs <output-directory> <canonical|artifact> [--write]");

const appRoot = resolve(import.meta.dirname, "..");
const verificationPath = join(appRoot, "verification", `${buildKind}-build-parity.json`);
const bundled = await build({ entryPoints: ["src/content/paritySnapshot.ts"], bundle: true, format: "esm", platform: "node", write: false });
const modulePath = join(outDir, ".parity-snapshot.mjs");
writeFileSync(modulePath, bundled.outputFiles[0].text);
let snapshot;
try {
  snapshot = (await import(pathToFileURL(modulePath).href)).paritySnapshot;
} finally {
  unlinkSync(modulePath);
}
const hash = (value) => createHash("sha256").update(JSON.stringify(value)).digest("hex");
const receipt = {
  schemaVersion: "2.0.0",
  sceneOrder: snapshot.sceneOrder,
  hero: snapshot.hero,
  outputPile: snapshot.outputPile,
  outputs: snapshot.outputs,
  claims: snapshot.claims,
  sources: snapshot.sources,
  receipts: snapshot.receipts,
  scenes: snapshot.scenes,
  surfaces: snapshot.surfaces,
  transcripts: snapshot.transcripts,
  harness: snapshot.harness,
  pages: snapshot.pages,
  correctionVersion: snapshot.correctionVersion,
  images: snapshot.images,
  requiredRoutes: snapshot.requiredRoutes,
  releaseFacts: snapshot.releaseFacts,
  taskOperations: snapshot.taskOperations,
  finalTaskStatus: snapshot.finalTaskStatus,
  contentHash: hash(snapshot),
};
const bytes = Buffer.from(`${JSON.stringify(receipt, null, 2)}\n`);
writeFileSync(join(outDir, "content-parity.json"), bytes);
if (option === "--write") {
  writeFileSync(verificationPath, bytes);
  console.log(`Tracked ${buildKind} build parity receipt refreshed.`);
} else if (!existsSync(verificationPath) || !readFileSync(verificationPath).equals(bytes)) {
  throw new Error(`Committed ${buildKind} build parity receipt differs; rebuild and refresh the tracked receipt explicitly.`);
} else {
  console.log(`Committed ${buildKind} build parity receipt matches.`);
}
