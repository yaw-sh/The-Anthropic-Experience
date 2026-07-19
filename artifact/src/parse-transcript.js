// Parse the transcript markdown into the TRN structure for the Research Archive renderer.
// Usage: node parse-transcript.js <input.md> <output.json>
const fs = require('fs');
const { marked } = require('/tmp/claude-0/-home-user-The-Anthropic-Experience/06ae5b22-6ed0-58c8-b444-6a66a555e489/scratchpad/node_modules/marked');
marked.setOptions({ mangle: false, headerIds: false });

const [,, IN, OUT] = process.argv;
const src = fs.readFileSync(IN, 'utf8');

const inline = (s) => marked.parseInline(s.trim());
const block = (s) => marked.parse(s.trim());

// ---- header meta ----
const meta = [];
const dateLine = src.match(/\*\*Date:\*\*\s*([^·\n]+)·\s*\*\*Surface:\*\*\s*([^\n]+)/);
const partLine = src.match(/\*\*Participants:\*\*\s*([^\n]+)/);
const modelLine = src.match(/\*\*Models used[^:]*:\*\*\s*([^\n]+)/);
if (dateLine) {
  meta.push({ k: 'Date', v: dateLine[1].trim(), mono: true });
  meta.push({ k: 'Surface', v: dateLine[2].trim().replace(/\*\*/g, '') });
}
if (partLine) meta.push({ k: 'Participants', v: partLine[1].trim().replace(/\*\*/g, '').replace(/·/g, ' · ') });
if (modelLine) meta.push({ k: 'Models (in order)', v: modelLine[1].trim().replace(/`/g, ''), mono: true });
meta.push({ k: 'Turns', v: '59', mono: true });
meta.push({ k: 'Edition', v: 'Public — Operator generalized, assistant verbatim' });

// ---- session ledger table ----
const ledger = [];
const ledgerSec = src.split(/^## Session ledger.*$/m)[1]?.split(/^## /m)[0] || '';
for (const row of ledgerSec.split('\n')) {
  const m = row.match(/^\|\s*([^|]*)\|\s*([^|]*)\|\s*([^|]*)\|/);
  if (!m) continue;
  const [_, n, ev, evid] = m;
  if (/^[-\s:]*$/.test(n) || /^\s*#\s*$/.test(n)) continue;
  ledger.push({ n: n.trim() || '—', event: inline(ev), evidence: inline(evid) });
}

// ---- thread ----
const bodyStart = src.indexOf('## Transcript');
const appxStart = src.search(/^## Appendix /m);
const body = src.slice(bodyStart, appxStart === -1 ? undefined : appxStart);

const thread = [];
// split into segments on turn headings, keeping switch markers that appear between turns
const parts = body.split(/^### /m).slice(1);
// capture switch markers from the raw body with their position between turn indices
const switchRe = /^>\s*⚙️\s*(.+)$/gm;

for (const part of parts) {
  const head = part.match(/^Turn (\d+(?:[–-]\d+)?)\s*—\s*(Operator|Claude)(?:\s*\(([^)]+)\))?/);
  if (!head) continue;
  const n = head[1];
  const actor = head[2] === 'Operator' ? 'operator' : 'claude';
  const model = head[3] ? (head[3].includes('opus') ? 'claude-opus-4-8' : 'claude-fable-5') : null;
  let content = part.slice(part.indexOf('\n') + 1);

  // switch markers inside this chunk's tail belong between turns — extract and queue after this turn
  const switches = [];
  content = content.replace(/^>\s*⚙️\s*(.+)$/gm, (_, lbl) => { switches.push(lbl.replace(/`/g, '').replace(/\*\*/g, '').trim()); return ''; });

  // tool logs: "> 🔧 ..." lines (possibly multi-line quote blocks starting with 🔧)
  const tools = [];
  content = content.replace(/^>\s*🔧\s*(.+(?:\n>\s*(?!🔧).+)*)$/gm, (_, t) => {
    const text = t.replace(/\n>\s*/g, ' ');
    tools.push({ html: inline(text), critical: /502|403|denied|stopped|halt/i.test(text) });
    return '';
  });

  content = content.replace(/^---\s*$/gm, '').trim();
  thread.push({ kind: 'turn', n, actor, model: actor === 'claude' ? model : null, tools, html: block(content) });
  for (const s of switches) thread.push({ kind: 'switch', label: s });
}

// ---- appendices ----
const appendices = [];
if (appxStart !== -1) {
  const rest = src.slice(appxStart);
  for (const part of rest.split(/^## /m).filter(Boolean)) {
    const nl = part.indexOf('\n');
    const title = part.slice(0, nl).trim();
    if (!/^Appendix/.test(title)) continue;
    appendices.push({ title, html: block(part.slice(nl + 1)) });
  }
}

const out = { meta, ledger, thread, appendices };
fs.writeFileSync(OUT, JSON.stringify(out));
const turns = thread.filter(t => t.kind === 'turn');
console.log(JSON.stringify({
  meta: meta.length, ledger: ledger.length,
  turns: turns.length, operatorTurns: turns.filter(t => t.actor === 'operator').length,
  claudeTurns: turns.filter(t => t.actor === 'claude').length,
  toolLogs: turns.reduce((a, t) => a + t.tools.length, 0),
  switches: thread.filter(t => t.kind === 'switch').length,
  appendices: appendices.length,
}));
