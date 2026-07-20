import { createHash } from "node:crypto";
import { cpSync, existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { phaseFixtures } from "../fixtures/public-history.mjs";

const appRoot = resolve(import.meta.dirname, "..");
const integratedRoot = resolve(appRoot, "../evidence/public");
const publicRoot = resolve(appRoot, "public/evidence");
const generatedPath = resolve(appRoot, "src/generated/public-evidence.json");
const sha256 = (bytes) => createHash("sha256").update(bytes).digest("hex");
const mode = process.argv[2] ?? "--sync";

function fixtureTranscript(phase) {
  const events = phase.events.map(([speaker, text, tags], offset) => {
    const index = offset + 1;
    const sourceSlotId = `${phase.id}-public-fixture`;
    return {
      approvedForPublic: true,
      fidelity: "generalized",
      id: `${phase.id}-event-${String(index).padStart(3, "0")}`,
      index,
      redactions: [],
      sourceRanges: [{ end: index, sourceRole: speaker, sourceRoleEnd: index, sourceRoleStart: index, sourceSlotId, start: index }],
      sourceSlotId,
      speaker,
      tags,
      text,
      transcriptId: phase.id,
      verbatim: false,
    };
  });
  return { events, fidelity: "generalized", generalizationNotice: "All transcript content is generalized and public-safe; no event is a verbatim quotation.", id: phase.id, schemaVersion: "1.0.0", title: phase.title, verbatim: false };
}

function fixtureBundle() {
  const transcripts = phaseFixtures.map((phase) => {
    const transcript = fixtureTranscript(phase);
    const bytes = Buffer.from(`${JSON.stringify(transcript, null, 2)}\n`);
    return { ...transcript, publicHash: sha256(bytes) };
  });
  return {
    catalog: {
      allowedSpeakers: ["operator", "assistant", "system", "tool"],
      contentModel: "generalized-public-process",
      generalizationNotice: "All transcript content is generalized and public-safe; no event is a verbatim quotation.",
      schemaVersion: "1.0.0",
      transcripts: transcripts.map((transcript) => ({
        eventCount: transcript.events.length,
        fidelity: transcript.fidelity,
        id: transcript.id,
        path: `transcripts/${transcript.id}.json`,
        phase: transcript.id,
        publicHash: transcript.publicHash,
        title: transcript.title,
        verbatim: transcript.verbatim,
      })),
    },
    transcripts,
  };
}

function integratedBundle() {
  if (!existsSync(join(integratedRoot, "catalog.json"))) return fixtureBundle();
  const catalog = JSON.parse(readFileSync(join(integratedRoot, "catalog.json"), "utf8"));
  if (catalog.schemaVersion !== "1.0.0" || catalog.contentModel !== "generalized-public-process") throw new Error("Unsupported public evidence schema");
  const transcripts = catalog.transcripts.map((metadata) => {
    const bytes = readFileSync(join(integratedRoot, metadata.path));
    const publicHash = sha256(bytes);
    if (publicHash !== metadata.publicHash) throw new Error(`Transcript public hash mismatch: ${metadata.id}`);
    const transcript = JSON.parse(bytes.toString("utf8"));
    if (transcript.schemaVersion !== "1.0.0" || transcript.verbatim !== false || transcript.fidelity !== "generalized") throw new Error(`Unsafe transcript: ${metadata.id}`);
    if (transcript.events.length !== metadata.eventCount) throw new Error(`Transcript event count mismatch: ${metadata.id}`);
    if (transcript.events.some((event) => event.approvedForPublic !== true || event.verbatim !== false || event.fidelity !== "generalized")) throw new Error(`Unapproved transcript event: ${metadata.id}`);
    return { ...transcript, publicHash };
  });
  return { catalog, transcripts };
}

function bundleBytes() {
  return Buffer.from(`${JSON.stringify(integratedBundle(), null, 2)}\n`);
}

function refreshRuntimeCopy() {
  rmSync(publicRoot, { recursive: true, force: true });
  if (existsSync(join(integratedRoot, "catalog.json"))) {
    cpSync(integratedRoot, publicRoot, { recursive: true });
    return;
  }
  const { catalog, transcripts } = fixtureBundle();
  mkdirSync(join(publicRoot, "transcripts"), { recursive: true });
  writeFileSync(join(publicRoot, "catalog.json"), `${JSON.stringify(catalog, null, 2)}\n`);
  for (const transcript of transcripts) {
    const value = { ...transcript };
    delete value.publicHash;
    writeFileSync(join(publicRoot, `transcripts/${transcript.id}.json`), `${JSON.stringify(value, null, 2)}\n`);
  }
}

function checkContent(expected) {
  if (!existsSync(generatedPath) || !readFileSync(generatedPath).equals(expected)) {
    throw new Error("Committed public evidence bundle differs from authoritative integrated evidence; run npm run sync:content.");
  }
}

const expected = bundleBytes();
if (mode === "--check") {
  checkContent(expected);
  console.log("Public content check passed: committed bundle matches authoritative integrated evidence.");
} else if (mode === "--prepare") {
  checkContent(expected);
  refreshRuntimeCopy();
  console.log("Public content prepared: committed bundle checked and runtime evidence refreshed.");
} else if (mode === "--sync") {
  mkdirSync(dirname(generatedPath), { recursive: true });
  writeFileSync(generatedPath, expected);
  refreshRuntimeCopy();
  console.log(`Public content synchronized: ${integratedBundle().transcripts.reduce((count, item) => count + item.events.length, 0)} generalized events (${existsSync(join(integratedRoot, "catalog.json")) ? "integrated" : "fixture"})`);
} else {
  throw new Error(`Unknown content mode: ${mode}`);
}
