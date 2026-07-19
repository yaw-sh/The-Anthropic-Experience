import React from 'react';

/**
 * Card — the archive's surface primitive. A white, hairline-bordered,
 * softly-shadowed, rounded container.
 *  - `default`  white raised card
 *  - `muted`    quiet zinc-wash summary strip (bg-zinc-100/70)
 *  - `flat`     no shadow (nested / inline blocks)
 */
export function Card({ variant = 'default', padding, children, style, ...rest }) {
  const skins = {
    default: { background: 'var(--surface-card)', border: '1px solid var(--border-default)', boxShadow: 'var(--shadow-xs)' },
    muted:   { background: 'color-mix(in srgb, var(--zinc-100) 70%, #fff)', border: '1px solid var(--border-default)', boxShadow: 'var(--shadow-xs)' },
    flat:    { background: 'var(--surface-card)', border: '1px solid var(--border-default)', boxShadow: 'none' },
  };
  return (
    <div style={{
      borderRadius: 'var(--radius-xl)',
      padding: padding != null ? padding : 'var(--pad-card)',
      font: 'var(--fw-regular) var(--fs-14)/var(--lh-relaxed) var(--font-sans)',
      color: 'var(--text-muted)',
      ...skins[variant],
      ...style,
    }} {...rest}>{children}</div>
  );
}
