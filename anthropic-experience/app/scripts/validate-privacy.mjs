import { createHash } from "node:crypto";
import { existsSync, readdirSync, readFileSync, statSync, writeFileSync } from "node:fs";
import { extname, join, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const textExtensions = new Set([".css", ".html", ".js", ".json", ".map", ".md", ".mjs", ".svg", ".ts", ".tsx", ".yaml", ".yml"]);
const privateOwnerPattern = ["yaw", "sh"].join("-");
const privateProjectPattern = ["the", "anthropic", "experience"].join("[-_.]?");
const knownPrivateProjectPattern = ["anthropic", "experience", "actual", "blueprint"].join("[-_.]?");
const knownPrivateIdentifierPatterns = [new RegExp(`(?:^|[^a-z0-9])${privateOwnerPattern}(?:$|[^a-z0-9])`, "i"), new RegExp(privateProjectPattern, "i"), new RegExp(knownPrivateProjectPattern, "i")];

export const PUBLIC_URL_ORIGIN_ALLOWLIST = new Set(["https://openai.com", "https://www.openai.com", "https://anthropic.com", "https://www.anthropic.com", "https://docs.anthropic.com", "https://react.dev", "https://reactjs.org", "http://www.w3.org", "https://www.w3.org"]);

const commonAbsoluteRoots = ["Users", "Volumes", "etc", "home", "opt", "private", "root", "tmp", "usr", "var", "workspace"].join("|");
const absolutePathPattern = new RegExp(`(?:^|[\\s"'(=])(?:/(?:${commonAbsoluteRoots})(?:/|$)|[A-Z]:\\\\|file://)`, "im");
const authoredUrlPattern = /https?:\/\/[^\s"'<>()[\]{}]+/gi;
const forbidden = [{ label: "absolute local path", pattern: absolutePathPattern }, { label: "unrelated project path", pattern: /(?:Desktop|Documents)[/\\]+(?:os)(?:[/\\]|\b)/i }, { label: "personal email address", pattern: /\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/i }, { label: "raw transcript payload", pattern: /["'](?:messages|transcript)["']\s*:\s*\[/i }, { label: "base64 blob", pattern: /data:[^;,\s]+;base64,/i }];
const excludedDirectoryNames = new Set([".git", "dist", "dist-artifact", "node_modules", "playwright-report", "test-results"]);
const excludedFileNames = new Set(["package-lock.json"]);
const ignoredRuntimeEvidencePath = resolve(import.meta.dirname, "../public/evidence");

export function validatePrivacyText(text, filename) {
  if (knownPrivateIdentifierPatterns.some((pattern) => pattern.test(text))) throw new Error(`Privacy validation failed for ${filename}: known private identifier`);
  const violation = forbidden.find(({ pattern }) => pattern.test(text));
  if (violation) throw new Error(`Privacy validation failed for ${filename}: ${violation.label}`);
  for (const rawUrl of text.match(authoredUrlPattern) ?? []) {
    const url = new URL(rawUrl);
    if (!PUBLIC_URL_ORIGIN_ALLOWLIST.has(url.origin)) throw new Error(`Privacy validation failed for ${filename}: authored URL origin is not allowlisted`);
  }
}

function collectFiles(root) {
  if (statSync(root).isFile()) return [root];
  return readdirSync(root, { withFileTypes: true }).flatMap((entry) => {
    const path = join(root, entry.name);
    if (entry.isDirectory()) return excludedDirectoryNames.has(entry.name) || resolve(path) === ignoredRuntimeEvidencePath ? [] : collectFiles(path);
    return excludedFileNames.has(entry.name) ? [] : [path];
  });
}

function receiptPath(kind) {
  return resolve(import.meta.dirname, "../verification", `${kind}-privacy.json`);
}

export function buildPrivacyReceipt(root, kind, targetReceipt = receiptPath(kind)) {
  const absoluteRoot = resolve(root);
  const absoluteTargetReceipt = resolve(targetReceipt);
  const collectedFiles = collectFiles(absoluteRoot).filter((path) => textExtensions.has(extname(path))).sort();
  const files = collectedFiles.filter((path) => resolve(path) !== absoluteTargetReceipt);
  const existingTarget = collectedFiles.find((path) => resolve(path) === absoluteTargetReceipt);
  if (existingTarget) validatePrivacyText(readFileSync(existingTarget, "utf8"), relative(absoluteRoot, existingTarget));
  const digest = createHash("sha256");
  for (const path of files) {
    const bytes = readFileSync(path);
    validatePrivacyText(bytes.toString("utf8"), relative(absoluteRoot, path));
    digest.update(relative(absoluteRoot, path));
    digest.update("\0");
    digest.update(bytes);
    digest.update("\0");
  }
  const receipt = { schemaVersion: "1.0.0", target: kind, fileCount: files.length, contentHash: digest.digest("hex") };
  const bytes = Buffer.from(`${JSON.stringify(receipt, null, 2)}\n`);
  return { bytes, fileCount: files.length };
}

export function validatePrivacyPath(root, kind, writeReceipt = false) {
  const targetReceipt = receiptPath(kind);
  const { bytes, fileCount } = buildPrivacyReceipt(root, kind, targetReceipt);
  if (writeReceipt) writeFileSync(targetReceipt, bytes);
  else if (!existsSync(targetReceipt) || !readFileSync(targetReceipt).equals(bytes)) throw new Error(`Committed ${kind} privacy receipt differs; refresh it explicitly after an approved privacy review.`);
  return fileCount;
}

const isDirectRun = process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url);
if (isDirectRun) {
  const [target = ".", kind = "source", option] = process.argv.slice(2);
  try {
    const count = validatePrivacyPath(target, kind, option === "--write");
    console.log(`Privacy validation passed: ${count} text files scanned.`);
  } catch (error) {
    console.error(error.message);
    process.exitCode = 1;
  }
}
