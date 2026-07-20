import { createHash } from "node:crypto";
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { basename, dirname, resolve } from "node:path";
import { spawnSync } from "node:child_process";

const appRoot = resolve(import.meta.dirname, "..");
const widths = [480, 768, 1280, 1920];
const definitions = {
  heroBigTop: ["hero-big-top--wide.jpg", "An ornate big-top prologue stage with a blank circular center", "Static responsive prologue anchor; all narrative text remains HTML."],
  heroBigTopAlt: ["hero-big-top--alt--wide.jpg", "A big-top directory stage with a central wheel and two ticket banks", "Responsive shared surface directory; wheel and ticket controls remain HTML."],
  actThreeRings: ["act-three-rings--wide.jpg", "Three circus rings arranged for Evidence, Recognition, and Consequence", "Responsive thesis framework; method labels and detail remain HTML."],
  actHighWire: ["act-high-wire--wide.jpg", "Six high-wire platforms illustrating an authorization method chain", "Responsive authorization method stage; no historical outcome is encoded in the raster."],
  actPaperwork: ["act-paperwork--wide.jpg", "A ringmaster beside an oversized pile of paperwork", "Responsive paperwork-output stage; the existing OutputPile remains readable HTML."],
  actBackstage: ["act-backstage--wide.jpg", "A split circus frontstage and backstage evidence control room", "Responsive Evidence Room stage; source, receipt, and limitation metadata remain HTML."],
  actHiddenCapabilities: ["act-hidden-capabilities--wide.jpg", "A six-layer capability cabinet beside inspection machinery", "Responsive capability inventory; inspection-layer detail remains HTML."],
  actControlPlane: ["act-control-plane--wide.jpg", "A circus control booth surrounded by eight operator stations", "Responsive operator-responsibility stage; evidence-bound detail remains HTML."],
  actPrizeBooth: ["act-prize-booth--wide.jpg", "A circus prize booth framed for the generated release scoreboard", "Responsive finale stage; release facts and directory navigation remain HTML."],
  actFunhouse: ["act-funhouse--wide.jpg", "A six-door funhouse for assistant, agent, repository, editor, browser, and control families", "Responsive surface-family selector; shared URL-backed filtering remains HTML."],
};
const sha256 = (path) => createHash("sha256").update(readFileSync(path)).digest("hex");
const run = (command, args) => {
  const result = spawnSync(command, args, { encoding: "utf8" });
  if (result.status !== 0) throw new Error(`${command} failed: ${result.stderr || result.stdout}`);
};
const dimensions = (path) => {
  const result = spawnSync("sips", ["-g", "pixelWidth", "-g", "pixelHeight", path], { encoding: "utf8" });
  if (result.status !== 0) throw new Error(result.stderr);
  const width = Number(result.stdout.match(/pixelWidth: (\d+)/)?.[1]);
  const height = Number(result.stdout.match(/pixelHeight: (\d+)/)?.[1]);
  if (!width || !height) throw new Error(`Cannot read dimensions: ${path}`);
  return { width, height };
};

const manifest = {};
for (const [id, [sourceName, alt, purpose]] of Object.entries(definitions)) {
  const sourceFile = `../design/source-images/${sourceName}`;
  const sourcePath = resolve(appRoot, sourceFile);
  const source = dimensions(sourcePath);
  const stem = basename(sourceName, ".jpg");
  const derivatives = [];
  for (const width of widths) {
    if (width > source.width) continue;
    const height = Math.round((source.height / source.width) * width);
    for (const [extension, format, mime] of [["avif", "avif", "image/avif"], ["webp", "webp", "image/webp"], ["jpg", "jpeg", "image/jpeg"]]) {
      const file = `public/images/derivatives/${stem}--${width}.${extension}`;
      const output = resolve(appRoot, file);
      mkdirSync(dirname(output), { recursive: true });
      if (format === "webp") run("cwebp", ["-quiet", "-q", "55", "-resize", String(width), String(height), sourcePath, "-o", output]);
      else run("sips", ["--resampleHeightWidth", String(height), String(width), "--setProperty", "format", format, "--setProperty", "formatOptions", format === "jpeg" ? "32" : "38", sourcePath, "--out", output]);
      const measured = dimensions(output);
      if (measured.width !== width || measured.height !== height) throw new Error(`Dimension drift: ${file}`);
      derivatives.push({ file, format: mime, height, path: `/${file.replace(/^public\//, "")}`, sha256: sha256(output), width });
    }
  }
  manifest[id] = {
    alt,
    derivatives,
    purpose,
    sourceFile,
    sourceHeight: source.height,
    sourceSha256: sha256(sourcePath),
    sourceWidth: source.width,
  };
}
const target = resolve(appRoot, "src/generated/image-manifest.json");
mkdirSync(dirname(target), { recursive: true });
writeFileSync(target, `${JSON.stringify(manifest, null, 2)}\n`);
console.log(`Generated ${Object.values(manifest).reduce((sum, image) => sum + image.derivatives.length, 0)} publication derivatives; source files unchanged.`);
