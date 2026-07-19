import React from 'react';

/**
 * Chip — an inline monospace code token (paths, commands, env vars, IDs).
 * The archive uses these constantly inside prose and table cells.
 */
export function Chip({ children, style, ...rest }) {
  return (
    <code style={{
      font: 'var(--fw-regular) var(--fs-12)/1.4 var(--font-mono)',
      color: 'var(--text-muted)',
      background: 'var(--surface-muted)',
      borderRadius: 'var(--radius-sm)',
      padding: '1px 5px',
      whiteSpace: 'nowrap',
      ...style,
    }} {...rest}>{children}</code>
  );
}
