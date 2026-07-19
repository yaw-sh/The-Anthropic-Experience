import React from 'react';

/**
 * Dropdown — a hover/click menu: a quiet trigger button and a bordered
 * white panel of items. Uncontrolled by default (opens on hover + click).
 * items: [{ label, icon, href, onClick }]
 */
export function Dropdown({ label = 'Options', items = [], style, ...rest }) {
  const [open, setOpen] = React.useState(false);
  return (
    <div
      style={{ position: 'relative', ...style }}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      {...rest}
    >
      <button
        onClick={() => setOpen((o) => !o)}
        style={{
          display: 'flex', alignItems: 'center', gap: 4,
          font: 'var(--fw-medium) var(--fs-12)/1 var(--font-sans)',
          color: open ? 'var(--text-strong)' : 'var(--text-muted)',
          background: 'none', border: 'none', cursor: 'pointer', padding: 0,
          transition: 'var(--transition-colors)',
        }}
      >
        {label}
        <iconify-icon icon="solar:alt-arrow-down-linear" stroke-width="1.5" style={{ color: 'var(--text-faint)' }}></iconify-icon>
      </button>
      <div style={{
        position: 'absolute', right: 0, marginTop: 8, width: 176,
        background: 'var(--surface-card)', border: '1px solid var(--border-default)',
        borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-xs)', overflow: 'hidden',
        display: 'flex', flexDirection: 'column',
        opacity: open ? 1 : 0, visibility: open ? 'visible' : 'hidden',
        transform: open ? 'translateY(0)' : 'translateY(-4px)',
        transition: `opacity var(--dur-fast) var(--ease-standard), transform var(--dur-fast) var(--ease-standard), visibility var(--dur-fast)`,
        zIndex: 60,
      }}>
        {items.map((it, i) => {
          const Tag = it.href ? 'a' : 'button';
          return (
            <Tag
              key={i}
              href={it.href}
              onClick={it.onClick}
              style={{
                display: 'flex', alignItems: 'center', gap: 8,
                padding: '8px 12px', textAlign: 'left', width: '100%',
                font: 'var(--fw-medium) var(--fs-14)/1.3 var(--font-sans)',
                color: 'var(--text-muted)', background: 'none', border: 'none',
                borderBottom: i < items.length - 1 ? '1px solid var(--border-subtle)' : 'none',
                cursor: 'pointer', textDecoration: 'none',
                transition: 'var(--transition-colors)',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--hover-menu)'; e.currentTarget.style.color = 'var(--text-strong)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = 'none'; e.currentTarget.style.color = 'var(--text-muted)'; }}
            >
              {it.icon && <iconify-icon icon={it.icon} stroke-width="1.5"></iconify-icon>}
              {it.label}
            </Tag>
          );
        })}
      </div>
    </div>
  );
}
