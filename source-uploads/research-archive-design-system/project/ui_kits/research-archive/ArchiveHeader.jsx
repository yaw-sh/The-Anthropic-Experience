// Document header + fidelity note. Composes Navbar, MetadataGrid, Badge, Callout.
function ArchiveHeader() {
  const { MetadataGrid, Badge } = window.ResearchArchiveDesignSystem_b308e3;
  return (
    <header style={{ marginBottom: 48 }}>
      <h1 style={{ font: 'var(--fw-semibold) clamp(30px,5vw,36px)/1.1 var(--font-sans)', letterSpacing: 'var(--tracking-tighter)', color: 'var(--text-strong)', margin: '0 0 12px' }}>THE ANTHROPIC EXPERIENCE</h1>
      <h2 style={{ font: 'var(--fw-medium) 18px/1.4 var(--font-sans)', color: 'var(--text-subtle)', margin: '0 0 32px' }}>Full Chat Transcript (Sanitized)</h2>
      <MetadataGrid columns={2} items={[
        { label: 'Date', value: '2026-07-18' },
        { label: 'Surface', value: (<span style={{ display: 'inline-flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>Claude Cowork <Badge variant="neutral">web, beta — 11 days old</Badge></span>) },
        { label: 'Participants', value: (<>The Operator <span style={{ color: 'var(--text-faint)', fontWeight: 400 }}>(name withheld)</span> · Claude</>) },
        { label: 'Models Used', value: (<span style={{ display: 'inline-flex', gap: 6, flexWrap: 'wrap' }}><Badge variant="neutral" mono>fable-5</Badge><Badge variant="info" mono>opus-4.8</Badge><Badge variant="neutral" mono>fable-5</Badge></span>) },
      ]} />
    </header>
  );
}

function FidelityNote() {
  const { Callout } = window.ResearchArchiveDesignSystem_b308e3;
  return (
    <div style={{ margin: '0 0 64px' }}>
      <Callout variant="info" title="Fidelity + redaction note (written by the assistant):">
        Reconstructed by the assistant from in-session context at the Operator's request. Operator messages are verbatim <strong>except</strong>: identifiers, machine paths and project pseudonyms are generalized; profanity is masked; personal material is held at pattern level. All confessed failures are reproduced without softening.
      </Callout>
    </div>
  );
}

Object.assign(window, { ArchiveHeader, FidelityNote });
