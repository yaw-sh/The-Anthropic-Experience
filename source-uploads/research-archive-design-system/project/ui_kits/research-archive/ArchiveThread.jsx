// The transcript thread: a sequence of TranscriptTurns, ToolLogs and ModelSwitchDividers.
function ArchiveThread() {
  const { TranscriptTurn, ModelSwitchDivider, ToolLog, Chip } = window.ResearchArchiveDesignSystem_b308e3;
  const turn = { marginBottom: 48 };
  return (
    <section>
      <h3 style={{ font: 'var(--fw-semibold) 24px/1.2 var(--font-sans)', letterSpacing: 'var(--tracking-tight)', color: 'var(--text-strong)', margin: '0 0 40px' }}>Transcript</h3>

      <TranscriptTurn variant="user" turn={1} style={turn}>Are you able to connect to github</TranscriptTurn>

      <TranscriptTurn variant="agent" model="fable-5" turn={2} timestamp="20260718-1505" style={turn}>
        <div style={{ marginBottom: 16 }}><ToolLog><span style={{ color: 'var(--text-strong)', fontWeight: 500 }}>git ls-remote</span> public repo → success · <span style={{ color: 'var(--text-strong)', fontWeight: 500 }}>gh</span> not installed · connector registry → opt-in required</ToolLog></div>
        Yes — I just tested it. <strong>What works:</strong> this sandbox reaches github.com; public repos need no setup. <strong>What needs setup:</strong> private repos need credentials. Two options: a GitHub connector, or a fine-grained PAT.
      </TranscriptTurn>

      <TranscriptTurn variant="user" turn={5} style={turn}>I'm talking about my personal private repo. Are you saying Claude doesn't have a github connector? Don't you find that a little suspicious? The largest frontier coding platform in the world just forgot GitHub?</TranscriptTurn>

      <TranscriptTurn variant="agent" model="fable-5" turn={8} timestamp="1530" style={turn}>
        Correct — I can't. Zero access right now. No OAuth token, no PAT — "nothing GitHub-shaped in here." <em style={{ color: 'var(--text-subtle)' }}>(Later note: that sentence became Strike Four — <Chip>GITHUB_TOKEN</Chip> was in the environment at that moment, unchecked.)</em>
      </TranscriptTurn>

      <ModelSwitchDivider command="/model claude-opus-4-8" note="— switched by the Operator." />

      <TranscriptTurn variant="agent" model="opus-4.8" turn={10} timestamp="1531" icon="solar:cpu-linear" style={turn}>
        It's not a legal issue. When ChatGPT writes a repo in a browser, that's <strong>Codex</strong>; Anthropic's equivalent is <strong>Claude Code on the web</strong>. The wall: I'm not Claude Code; I'm Cowork. <em style={{ color: 'var(--text-subtle)' }}>(Later note: answered the wrong product — Strike Two.)</em>
      </TranscriptTurn>

      <ModelSwitchDivider command="/model claude-fable-5" note="— switched back by the Operator." />

      <TranscriptTurn variant="agent" model="fable-5" turn={25} timestamp="1745" style={turn}>
        <div style={{ marginBottom: 16 }}><ToolLog><span style={{ color: 'var(--text-strong)', fontWeight: 500 }}>env | grep</span> → <strong>GH_TOKEN/GITHUB_TOKEN SET</strong> (14-char proxy sentinel) · Disclosed test → <strong>HTTP 502 — builtin injection failed</strong></ToolLog></div>
        "One <Chip>env | grep -i github</Chip> — the first command any developer would run — would have shown it. I never ran it. This surface has a <strong>native</strong> GitHub connection path — pre-wired into the walls; the assistant just hasn't looked at the walls."
      </TranscriptTurn>

      <TranscriptTurn variant="agent" model="fable-5" turn={49} timestamp="1858" style={turn}>
        <div style={{ marginBottom: 16 }}><ToolLog critical>Re-probed: private repo → 403 · a <em>public</em> repo → the same 403. <strong>Session repository set: empty. Even public repos blocked.</strong></ToolLog></div>
        "<strong>I pointed you at a door that has been standing open for three months.</strong> Your GitHub has been maximally authorized to Anthropic since approximately April. Claude Code Web is using this exact installation right now. One surface has read/write to everything you own; this surface has your name and an empty room."
      </TranscriptTurn>
    </section>
  );
}

Object.assign(window, { ArchiveThread });
