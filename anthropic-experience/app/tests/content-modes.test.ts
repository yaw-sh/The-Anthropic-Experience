import { execFileSync } from "node:child_process";
import { cpSync, mkdirSync, mkdtempSync, readFileSync, readdirSync, rmSync, statSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, relative } from "node:path";
import { describe, expect, it } from "vitest";

const packageJson = JSON.parse(readFileSync("package.json", "utf8")) as { scripts: Record<string, string> };

function snapshot(root: string) {
  const paths: string[] = [];
  const visit = (directory: string) => {
    for (const entry of readdirSync(directory, { withFileTypes: true })) {
      const path = join(directory, entry.name);
      if (entry.isDirectory()) visit(path);
      else paths.push(path);
    }
  };
  visit(root);
  return paths.sort().map((path) => ({ path: relative(root, path), bytes: readFileSync(path).toString("base64"), mode: statSync(path).mode }));
}

describe("integrated public content modes", () => {
  it("keeps synchronization explicit while test and build preparation checks tracked content first", () => {
    expect(packageJson.scripts["sync:content"]).toContain("sync-public-content.mjs --sync");
    expect(packageJson.scripts["check:content"]).toContain("sync-public-content.mjs --check");
    expect(packageJson.scripts["prepare:content"]).toContain("sync-public-content.mjs --prepare");
    for (const script of ["test", "build", "build:artifact"]) {
      expect(packageJson.scripts[script], script).toContain("prepare:content");
      expect(packageJson.scripts[script], script).not.toContain("sync:content");
    }
  });

  it("runs check mode without changing any bytes or paths", () => {
    const root = mkdtempSync(join(tmpdir(), "content-check-"));
    try {
      mkdirSync(join(root, "app/scripts"), { recursive: true });
      mkdirSync(join(root, "app/fixtures"), { recursive: true });
      mkdirSync(join(root, "app/src/generated"), { recursive: true });
      cpSync("scripts/sync-public-content.mjs", join(root, "app/scripts/sync-public-content.mjs"));
      cpSync("fixtures/public-history.mjs", join(root, "app/fixtures/public-history.mjs"));
      cpSync("src/generated/public-evidence.json", join(root, "app/src/generated/public-evidence.json"));
      cpSync("../evidence/public", join(root, "evidence/public"), { recursive: true });
      const before = snapshot(root);
      execFileSync(process.execPath, [join(root, "app/scripts/sync-public-content.mjs"), "--check"], { cwd: join(root, "app") });
      expect(snapshot(root)).toEqual(before);
    } finally {
      rmSync(root, { recursive: true, force: true });
    }
  });
});
