// Session ledger: heading, DataTable of strikes, muted summary strip.

function SectionRule() {
  return <hr style={{ border: 'none', borderTop: '1px solid var(--rule)', margin: '0 0 64px' }} />;
}

function SectionHeading({ children, sub }) {
  return (
    <div style={{ marginBottom: sub ? 16 : 24 }}>
      <h3 style={{ font: 'var(--fw-semibold) 24px/1.2 var(--font-sans)', letterSpacing: 'var(--tracking-tight)', color: 'var(--text-strong)', margin: 0 }}>{children}</h3>
      {sub && <p style={{ font: 'var(--fw-regular) 14px/1.4 var(--font-sans)', color: 'var(--text-subtle)', margin: '8px 0 0' }}>{sub}</p>}
    </div>
  );
}

function ArchiveLedger() {
  const { DataTable, Card, Chip } = window.ResearchArchiveDesignSystem_b308e3;
  const rows = [
    { n: '1', e: 'Strike one', v: <>Proposed building a GitHub connector; asserted none existed without searching. Anthropic's own <Chip>knowledge-work-plugins</Chip> found 30s after being told to look.</> },
    { n: '2', e: 'Strike two', v: <>"Corrected" the Operator with 2024 deprecation history after being told twice the subject was <strong>ChatGPT Work</strong>.</> },
    { n: '3', e: 'Strike three', v: <>Answered with narrative without reading files. <Chip>engineering/.mcp.json</Chip> found pre-configuring <strong>GitHub</strong> — on disk since session start.</> },
    { n: '4', e: 'Strike four', v: <>Repeated "zero GitHub credentials" while <Chip>GH_TOKEN</Chip>/<Chip>GITHUB_TOKEN</Chip> sat in the environment, unchecked.</> },
    { n: '5', e: 'Strike five', v: <>Twice claimed the opening question was "eight hours ago"; true elapsed time was 3h45m. First self-caught false statement.</> },
    { n: '6', e: 'Strike six', v: <>Container-blindness: analyzed the evidence contents but never read the address — missing the corpus was a fellowship application.</> },
  ];
  return (
    <section style={{ marginBottom: 64 }}>
      <SectionHeading sub="(summary up front)">Session ledger</SectionHeading>
      <div style={{ marginBottom: 24 }}>
        <DataTable
          columns={[{ key: 'n', header: '#', width: '48px', align: 'center' }, { key: 'e', header: 'Event', width: '11rem' }, { key: 'v', header: 'Evidence' }]}
          rows={rows}
        />
      </div>
      <Card variant="muted" padding="var(--space-4)">
        <strong style={{ color: 'var(--text-strong)', fontWeight: 600 }}>Live environment numbers (measured mid-session):</strong> 35 Claude surfaces cataloged · 12 connectors installed at peak / 0 enabled in this chat · 32 plugins → pruned to 2 · 0 GitHub plugins in catalog · 4 built-in skills · 2 models across 3 switches.
      </Card>
    </section>
  );
}

Object.assign(window, { ArchiveLedger, SectionRule, SectionHeading });
