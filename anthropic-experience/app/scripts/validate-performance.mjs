import { gzipSync } from "node:zlib";
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";

const outDir = process.argv[2];
if (!outDir) throw new Error("Output directory is required");
const assetsDir = join(outDir, "assets");
const files = readdirSync(assetsDir);
const gzipTotal = (extension) => files.filter((file) => file.endsWith(extension)).reduce((total, file) => total + gzipSync(readFileSync(join(assetsDir, file))).length, 0);
const jsGzip = gzipTotal(".js");
const cssGzip = gzipTotal(".css");
const heroBytes = statSync("public/images/derivatives/hero-big-top--wide--1920.avif").size;
const limits = { jsGzip: 180 * 1024, cssGzip: 45 * 1024, heroBytes: 350 * 1024 };
const actual = { jsGzip, cssGzip, heroBytes };
for (const key of Object.keys(limits)) if (actual[key] > limits[key]) throw new Error(`${key} exceeds budget: ${actual[key]} > ${limits[key]}`);
console.log(`Performance budgets passed: ${JSON.stringify(actual)}`);
