import { readFileSync, writeFileSync } from "node:fs";

const verificationUrl = new URL("../verification/release-verification.json", import.meta.url);
const verification = JSON.parse(readFileSync(verificationUrl, "utf8"));

if (verification.schemaVersion !== "1.0.0" || !Array.isArray(verification.checks)) {
  throw new Error("release-verification.json does not match schemaVersion 1.0.0");
}

for (const check of verification.checks) {
  if (check.status === "pass" && (!check.evidenceExists || typeof check.evidencePath !== "string")) {
    throw new Error(`Passing verification check has no existing evidence path: ${check.id}`);
  }
}

const checks = new Map(verification.checks.map((check) => [check.id, check]));
const definitions = [
  {
    id: "content",
    label: "Content",
    receipt: "prologue",
    checkIds: ["content-schema", "content-links", "public-evidence-adapter"],
  },
  {
    id: "application",
    label: "Application",
    receipt: "build-this-website",
    checkIds: ["unit-tests", "typecheck", "lint", "canonical-build", "artifact-build", "parity"],
  },
  {
    id: "accessibility",
    label: "Accessibility",
    receipt: "evidence-room",
    checkIds: ["playwright-axe", "keyboard", "mobile-320-390", "reduced-motion"],
  },
  {
    id: "privacy",
    label: "Privacy",
    receipt: "correction-loop",
    checkIds: ["source-privacy", "bundle-privacy", "artifact-bundle-privacy", "remote-runtime"],
  },
  {
    id: "owner-review",
    label: "Owner review",
    receipt: "finale",
    checkIds: ["owner-review"],
  },
];

const facts = definitions.map(({ id, label, receipt, checkIds }) => {
  const selected = checkIds.map((checkId) => {
    const check = checks.get(checkId);
    if (!check) throw new Error(`Missing verification check: ${checkId}`);
    return check;
  });
  return {
    id: `fact-${id}`,
    label,
    status: selected.every(({ status }) => status === "pass") ? "verified" : "pending",
    claimId: selected.every(({ status }) => status === "pass") ? "claim-release-verified" : "claim-release-pending",
    receiptId: `receipt-${receipt}`,
    evidence: selected.map(({ id: checkId }) => `verification/release-verification.json#${checkId}`),
  };
});

writeFileSync(new URL("../src/generated/release-facts.json", import.meta.url), `${JSON.stringify(facts, null, 2)}\n`);
