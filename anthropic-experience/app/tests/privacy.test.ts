import { mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { buildPrivacyReceipt, validatePrivacyText } from "../scripts/validate-privacy.mjs";
import packageJson from "../package.json";

const privateOwner = ["yaw", "sh"].join("-");
const privateProject = ["The", "Anthropic", "Experience"].join("-");
const knownPrivateProject = ["anthropic", "experience", "actual", "blueprint"].join(
  "_",
);
const unrelatedProject = ["o", "s"].join("");
const unixPath = ["", "Users", "example", "Desktop", unrelatedProject, "notes.md"].join(
  "/",
);
const windowsPath = ["C:", "Users", "example", "Documents", "notes.txt"].join("\\");
const privateUrl = [
  "https:",
  "",
  "github.com",
  "example-owner",
  "private-repository",
].join("/");
const personalEmail = ["person", "example.test"].join("@");
const rawTranscript = JSON.stringify({
  messages: [{ role: "user", content: "private" }],
});
const base64Blob = ["data:image/png;", "base64,aGVsbG8="].join("");
const unlistedPublicUrl = ["https:", "", "example.com", "public-note"].join("/");
const allowlistedPublicUrl = ["https:", "", "openai.com", "policies"].join("/");

describe("privacy validation", () => {
  it.each([
    ["raw private identifier", [privateOwner, privateProject].join("/")],
    ["bare private owner handle", privateOwner],
    ["known private project identifier", knownPrivateProject],
    ["private project slug", privateProject.toLowerCase()],
    ["private project underscore variant", privateProject.replaceAll("-", "_")],
    ["private project dotted variant", privateProject.replaceAll("-", ".")],
    ["private project compact variant", privateProject.replaceAll("-", "")],
    ["unrelated repository identifier", [privateOwner, unrelatedProject].join("/")],
    ["absolute Unix path", unixPath],
    ["absolute Windows path", windowsPath],
    ["absolute private temporary path", ["", "private", "tmp", "notes.txt"].join("/")],
    ["absolute temporary path", ["", "tmp", "private-notes.txt"].join("/")],
    ["absolute system path", ["", "etc", "private-notes.txt"].join("/")],
    ["absolute volume path", ["", "Volumes", "private", "notes.txt"].join("/")],
    ["private repository URL", privateUrl],
    ["unlisted authored public URL", unlistedPublicUrl],
    ["personal email", personalEmail],
    ["raw transcript payload", rawTranscript],
    ["base64 blob", base64Blob],
  ])("rejects %s", (_label, value) => {
    expect(() => validatePrivacyText(value, "fixture.txt")).toThrow(/privacy/i);
  });

  it("accepts the neutral runtime identifier and redaction token", () => {
    expect(() =>
      validatePrivacyText("branch-cleanup ###-PII-###", "fixture.txt"),
    ).not.toThrow();
  });

  it("accepts only explicitly allowlisted authored public URLs", () => {
    expect(() => validatePrivacyText(allowlistedPublicUrl, "fixture.md")).not.toThrow();
  });

  it("scans the tracked app text boundary rather than source alone", () => {
    expect(packageJson.scripts.privacy).toBe("node scripts/validate-privacy.mjs . source");
  });

  it("excludes the target receipt from both its count and digest", () => {
    const root = mkdtempSync(join(tmpdir(), "privacy-receipt-"));
    try {
      writeFileSync(join(root, "source.ts"), "export const safe = true;\n");
      const target = join(root, "source-privacy.json");
      const absent = buildPrivacyReceipt(root, "source", target);
      writeFileSync(target, absent.bytes);
      const present = buildPrivacyReceipt(root, "source", target);
      expect(JSON.parse(readFileSync(target, "utf8")).fileCount).toBe(1);
      expect(present.bytes.equals(absent.bytes)).toBe(true);
    } finally {
      rmSync(root, { recursive: true, force: true });
    }
  });
});
