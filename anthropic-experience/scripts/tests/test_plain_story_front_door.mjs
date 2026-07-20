import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const repo = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../../..');
const standalone = path.join(repo, 'anthropic-experience/The Anthropic Experience (standalone).html');
const expectedHeadings = [
  '1:THE ANTHROPIC EXPERIENCE',
  '2:What happened next',
  '2:Why one Claude could see the project and another could not',
  '2:The simple question became a four-hour project',
  '2:It corrected itself — then forgot the correction seven minutes later',
  '2:Then the website about the failure began failing the same way',
  '3:The larger build',
  '2:The audit could not agree with itself',
  '2:The same pattern appeared in another project',
  '2:Changing AI companies did not automatically fix it',
  '3:What changed the outcome',
  '2:The finished website went back to Claude',
  '3:What happened next',
  '2:When files disappeared, the project history saved them',
  '2:The public page was only a small window into the record',
  '3:What the numbers do — and do not — prove',
  '2:How much computer work did this take?',
  '3:A separate case, not part of this bill',
  '2:What this story actually shows',
  '3:The central finding',
  '2:Sources and records',
];
const assetHashes = {
  '0f116fa0-1080-43a8-bcb7-396438d2b348.jpg': '84b5555f56abb86d8b65dfcd9dcd601bc20d658e3291847563676e77ec6baf7b',
  '1cf99952-f626-4a6a-8506-ea0b0f6d22ed.jpg': '2cf347020f21a59e5ba36782b6a2c1b6e1c315b2fcfdfa258dd9264a2d6f7f01',
  '29b7df40-8121-4a92-a248-2ac60d785dbe.jpg': '8e118fb40c1f01fedac30f2b6f4eb1ccdd9113f6c932b859fa4f774dffe7104e',
  '3bab3a95-f7b5-4ddb-81f9-e29bd1bf2ac2.jpg': 'c68194d9b40562bc513bc045fb215c6debab5c162df6174ba442e86b4a911dd1',
  '42c9a0bd-7b6f-4e17-ba34-7af7bfcc80d9.jpg': '7ac354dcbf626ee3298b6ff426941559e7edd3bf65ae1fb3159b65d4c08ea4e8',
  '7010c6fa-bd1c-438c-835e-3a3f07948c86.png': 'd566a1973c4958fab6ba8ed5961b18bfdf7b804fb33c34a4d7d3d4aa4b4885cf',
  '7f36a52c-3b71-4778-b899-26e8202cb969.jpg': 'bf691fc9524d0906af54fdd84e8fa4d89a7a093b35cac7d97d094495d73f91bd',
  '948034a2-fb54-4cdd-a884-559d558a203b.png': 'b373060738099c5cbd3dcadf23ed0fb20527fbaad0bf15d5be4362644a92ddf4',
  '95239653-d495-4d44-9af4-c6242c481c1e.woff2': '213b4683d65efe68c64d461fb8874d349c725282d840503b14f93642d826ef92',
  'a6850199-f922-4f59-8f8c-81b39e924739.jpg': 'ecc68beb839c15281efd7bd7c21a4fe5f1050255a276052781ee3f0ca0cdbbd0',
  'b15be2a3-8d7f-4585-bef2-deb6cbb2a52f.jpg': 'fca7dde5373ea15686a9e743c7c779eb114a3ce06034b8d38815deec30b21739',
  'bda6b8de-6a14-4875-8306-56a362e6604c.jpg': '60bdd5c4d3d623a286815a741365de349fd7b149dab8f8a71c4c25d36e3a3222',
  'c920be86-1c48-4b63-b368-e73b90f1efcc.png': 'f90c66089938657b63f5360d6cc7de877d1d5c4ca6db437a1e17ca19fec0d94b',
  'cc6731de-3f50-4308-97b5-f6267ee01992.jpg': 'c60974e2625cd7610ab95069f12bde3e7003d0c11e20eaf096dbc4e9740d1f93',
  'd9a33169-62b9-446f-813c-b5f3f3ebbcc4.woff2': 'b5ec97155b67179ef69643ed61552bfab7cfbbe6271db93a1f9ae939beae3c8e',
  'f0dc0ecc-0d74-4bff-a8b9-bec19eebbf7c.jpg': 'ccec54bf90e5c76a55c4c1432e7f692350c261ec64cae692f41127daabc5f900',
};

function scriptPayload(html, type) {
  const match = html.match(new RegExp(`<script type="${type}">([\\s\\S]*?)</script>`));
  assert.ok(match, `missing ${type} payload`);
  return JSON.parse(match[1].trim());
}

function textContent(html) {
  return html.replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
}

const outer = fs.readFileSync(standalone, 'utf8');
const manifest = scriptPayload(outer, '__bundler/manifest');
const template = scriptPayload(outer, '__bundler/template');
const headings = [...template.matchAll(/<h([1-3])\b[^>]*>([\s\S]*?)<\/h\1>/gi)]
  .map(([, level, content]) => `${level}:${textContent(content)}`);

assert.deepEqual(headings, expectedHeadings, 'the visible heading sequence must be the Plain Story Edition');
for (const oldHeading of ['One f*cking file', 'Spin for amnesia', 'Tokens: not even close']) {
  assert.ok(!template.includes(oldHeading), `old heading remains visible: ${oldHeading}`);
}

assert.match(outer, /<title>The Anthropic Experience<\/title>/);
for (const metadata of ['rel="icon"', 'rel="canonical"', 'property="og:', 'name="twitter:']) {
  assert.ok(outer.includes(metadata), `missing outer metadata: ${metadata}`);
}
for (const bannerDetail of [
  'https://the-anthropic-experience.com',
  'aria-label="The Anthropic Experience home"',
  'Artifact by Yawsh',
  'https://claude.ai/code/artifact/08a38d19-7766-4587-8bcf-19af7fffd34d',
  'https://grok.com/badrudi',
  'aria-label="Bad Rudi"',
  'https://enter.the-anthropic-experience.com/',
]) {
  assert.ok(template.includes(bannerDetail), `missing preserved front-door control: ${bannerDetail}`);
}
const homeTitleAnchor = template.match(/<a\b(?=[^>]*\baria-label="The Anthropic Experience home")[^>]*>/);
assert.ok(homeTitleAnchor, 'missing preserved home-title anchor');
for (const declaration of ['min-width:0', 'overflow:hidden', 'text-overflow:ellipsis']) {
  assert.ok(homeTitleAnchor[0].includes(declaration), `home-title anchor must be shrinkable: ${declaration}`);
}

for (const wheelDetail of [
  'id="surface-wheel"', 'aria-label="Spin the Surface Selector wheel"',
  'id="wheel-result"', 'aria-live="polite"', 'prefers-reduced-motion:reduce',
  '_wireWheel()', 'transitionend',
]) {
  assert.ok(template.includes(wheelDetail), `missing wheel behavior: ${wheelDetail}`);
}

const resourceReferences = new Set([
  ...[...template.matchAll(/(?:src|href)="([0-9a-f-]{36})"/gi)].map((match) => match[1]),
  ...[...template.matchAll(/url\(["']?([0-9a-f-]{36})["']?\)/gi)].map((match) => match[1]),
]);
for (const uuid of resourceReferences) assert.ok(manifest[uuid], `unresolved template resource: ${uuid}`);
assert.equal(Object.keys(manifest).length, 19, 'the optimized 19-resource manifest must remain intact');
assert.ok(manifest['a6850199-f922-4f59-8f8c-81b39e924739'], 'Bad Rudi manifest record is required');
for (const [uuid, resource] of Object.entries(manifest)) {
  if (!resource.mime.startsWith('image/') && !resource.mime.startsWith('font/')) continue;
  assert.equal(resource.data, undefined, `${uuid} must be external, not embedded`);
  assert.ok(resource.url, `${uuid} must retain a relative asset URL`);
  assert.ok(fs.existsSync(path.join(repo, 'anthropic-experience', resource.url)), `${uuid} asset file is missing`);
  if (resource.mime.startsWith('image/')) {
    assert.ok(Number.isFinite(resource.width) && Number.isFinite(resource.height), `${uuid} image dimensions are missing`);
  }
}
for (const [file, expectedHash] of Object.entries(assetHashes)) {
  const actual = createHash('sha256').update(fs.readFileSync(path.join(repo, 'anthropic-experience/assets', file))).digest('hex');
  assert.equal(actual, expectedHash, `asset changed: ${file}`);
}

assert.ok(Buffer.byteLength(outer) < 300_000, 'standalone page exceeds the optimized size budget');
assert.throws(
  () => execFileSync('git', ['ls-files', '--error-unmatch', 'The Anthropic Experience - Plain Story Edition.html'], { cwd: repo, stdio: 'pipe' }),
  'the 15.8 MB attachment must not be tracked',
);
const images = [...template.matchAll(/<img\b[^>]*>/gi)].map((match) => match[0]);
assert.ok(images.length > 1, 'Plain Story narrative images are missing');
for (const image of images.slice(1)) assert.match(image, /\bloading="lazy"/i, 'non-hero narrative images must lazy-load');

console.log(`plain-story front door verified: ${headings.length} headings, ${Object.keys(manifest).length} manifest resources`);
