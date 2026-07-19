import React from 'react';

/**
 * ToolLog — a monospace action-log card (the wrench-icon receipts shown
 * inside agent turns). `critical` adds a red left border for alarming output.
 */
export function ToolLog({ icon = 'solar:wrench-linear', critical = false, children, style, ...rest }) {
  return (
    <div style={{
      background: 'var(--surface-card)',
      border: '1px solid var(--border-default)',
      borderLeft: critical ? '4px solid var(--red-500)' : '1px solid var(--border-default)',
      borderRadius: 'var(--radius-lg)',
      padding: 'var(--space-3)',
      boxShadow: 'var(--shadow-xs)',
      font: 'var(--text-mono-role)',
      color: critical ? 'var(--alert-text)' : 'var(--text-muted)',
      ...style,
    }} {...rest}>
      <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
        <iconify-icon icon={icon} stroke-width="1.5" style={{ color: critical ? 'var(--red-500)' : 'var(--text-faint)', fontSize: 14, marginTop: 2, flexShrink: 0 }}></iconify-icon>
        <div style={{ lineHeight: 'var(--lh-normal)' }}>{children}</div>
      </div>
    </div>
  );
}
