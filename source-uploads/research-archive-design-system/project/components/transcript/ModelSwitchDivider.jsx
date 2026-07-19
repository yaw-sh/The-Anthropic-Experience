import React from 'react';

/**
 * ModelSwitchDivider — a centered mono capsule sitting on a hairline rule,
 * used to mark a model swap or any system-level break in the thread.
 */
export function ModelSwitchDivider({ icon = 'solar:settings-linear', command, note, children, style, ...rest }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-4)', margin: 'var(--space-12) 0', ...style }} {...rest}>
      <div style={{ height: 1, background: 'var(--rule)', flex: 1 }} />
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        whiteSpace: 'nowrap',
        font: 'var(--text-mono-role)',
        color: 'var(--text-subtle)',
        background: 'var(--surface-card)',
        border: '1px solid var(--border-default)',
        borderRadius: 'var(--radius-full)',
        boxShadow: 'var(--shadow-xs)',
        padding: '6px 16px',
      }}>
        <iconify-icon icon={icon} stroke-width="1.5"></iconify-icon>
        {command && <span>{command}</span>}
        {(note || children) && (
          <span style={{ fontFamily: 'var(--font-sans)', color: 'var(--text-faint)' }}>{note || children}</span>
        )}
      </div>
      <div style={{ height: 1, background: 'var(--rule)', flex: 1 }} />
    </div>
  );
}
