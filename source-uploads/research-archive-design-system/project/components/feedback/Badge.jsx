import React from 'react';

/**
 * Badge — a compact status/label pill.
 * Variants map to the archive's roles: neutral (mono meta tags),
 * info (blue model chips), status (emerald dot pill), alert (red).
 */
export function Badge({ variant = 'neutral', dot = false, mono = false, icon, children, style, ...rest }) {
  const palettes = {
    neutral: { color: 'var(--text-subtle)', background: 'var(--surface-muted)', border: 'var(--border-default)' },
    info:    { color: 'var(--info-tag-text)', background: 'var(--info-tag-bg)', border: 'var(--info-tag-border)' },
    status:  { color: 'var(--text-subtle)', background: 'var(--surface-muted)', border: 'var(--border-default)', dotColor: 'var(--status-ok)' },
    alert:   { color: 'var(--alert-text)', background: 'var(--alert-surface)', border: 'var(--red-500)' },
  };
  const p = palettes[variant] || palettes.neutral;
  return (
    <span style={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: 6,
      font: `var(--fw-medium) ${mono ? 'var(--fs-11)' : 'var(--fs-12)'}/1 ${mono ? 'var(--font-mono)' : 'var(--font-sans)'}`,
      letterSpacing: mono ? 'var(--tracking-tight)' : 'normal',
      color: p.color,
      background: p.background,
      border: `1px solid ${p.border}`,
      borderRadius: 'var(--radius-md)',
      padding: '4px 8px',
      whiteSpace: 'nowrap',
      ...style,
    }} {...rest}>
      {dot && <span style={{ width: 6, height: 6, borderRadius: '50%', background: p.dotColor || 'currentColor', flexShrink: 0 }} />}
      {icon && <iconify-icon icon={icon} stroke-width="1.5"></iconify-icon>}
      {children}
    </span>
  );
}
