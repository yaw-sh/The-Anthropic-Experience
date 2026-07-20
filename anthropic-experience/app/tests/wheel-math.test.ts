import { describe, expect, it } from "vitest";
import { landingRotation, wheelGradient } from "../src/features/surface-directory/wheelMath";

describe("landingRotation", () => {
  it("centers the single available segment under the pointer", () => {
    expect(landingRotation(0, 0, 1)).toBe(1980);
  });

  it("lands on an indexed segment among all eight surfaces", () => {
    expect(landingRotation(0, 2, 8)).toBe(2047.5);
  });

  it("uses the filtered result count without discarding accumulated rotation", () => {
    expect(landingRotation(1950, 1, 3)).toBe(3780);
  });

  it("is deterministic and rejects impossible selections", () => {
    expect(landingRotation(45, 3, 8, 3)).toBe(1282.5);
    expect(landingRotation(45, 3, 8, 3)).toBe(1282.5);
    expect(() => landingRotation(0, 0, 0)).toThrow(RangeError);
    expect(() => landingRotation(0, 8, 8)).toThrow(RangeError);
  });
});

describe("wheelGradient", () => {
  it("alternates the v2 cream and burgundy sectors with a divider at any count", () => {
    const gradient = wheelGradient(4);
    expect(gradient).toContain("#f1dba8 0deg 89deg");
    expect(gradient).toContain("#7b213d 90deg 179deg");
    expect(gradient.match(/#3d1930/g)).toHaveLength(4);
    expect(gradient.match(/#f1dba8/g)).toHaveLength(2);
    expect(gradient.match(/#7b213d/g)).toHaveLength(2);
  });
});
