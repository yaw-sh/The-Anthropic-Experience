import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import { imageManifest } from "../src/content/imageManifest";

function sha256(path: string) {
  return createHash("sha256").update(readFileSync(path)).digest("hex");
}

describe("image provenance manifest", () => {
  it("records source and publication derivative hashes without upscaling", () => {
    const hero = imageManifest.heroBigTop as Record<string, unknown>;
    expect(hero.sourceSha256).toMatch(/^[a-f0-9]{64}$/);
    expect(
      sha256(resolve(String(hero.sourceFile))),
    ).toBe(hero.sourceSha256);
    const derivatives = hero.derivatives as Array<{ file: string; sha256: string; width: number; format: string }>;
    expect(derivatives).toHaveLength(12);
    expect(new Set(derivatives.map(({ format }) => format))).toEqual(new Set(["image/avif", "image/webp", "image/jpeg"]));
    for (const derivative of derivatives) expect(sha256(resolve(derivative.file))).toBe(derivative.sha256);
  });
});
