import React from 'react';

/**
 * Navbar — the sticky, glass, hairline-bottom top bar. Renders a monogram
 * tile + wordmark on the left; arbitrary children on the right.
 * With no logo asset in this system, the mark is a text monogram tile.
 */
export function Navbar({ monogram = 'AE', title = 'Research Archive', children, style, ...rest }) {
  return (
    <nav style={{
      position: 'sticky',
      top: 0,
      zIndex: 50,
      background: 'var(--glass-bg)',
      backdropFilter: 'blur(var(--blur-nav))',
      WebkitBackdropFilter: 'blur(var(--blur-nav))',
      borderBottom: '1px solid var(--border-default)',
      ...style,
    }} {...rest}>
      <div style={{
        maxWidth: 'var(--shell-max)',
        margin: '0 auto',
        padding: '0 24px',
        height: 'var(--nav-height)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{
            width: 32,
            height: 32,
            background: 'var(--surface-inverse)',
            color: 'var(--text-ondark)',
            borderRadius: 'var(--radius-sm)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            font: 'var(--fw-semibold) var(--fs-14)/1 var(--font-sans)',
            letterSpacing: '-0.05em',
          }}>{monogram}</div>
          <span style={{ font: 'var(--fw-medium) var(--fs-14)/1 var(--font-sans)', letterSpacing: 'var(--tracking-tight)', color: 'var(--text-strong)' }}>{title}</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>{children}</div>
      </div>
    </nav>
  );
}
