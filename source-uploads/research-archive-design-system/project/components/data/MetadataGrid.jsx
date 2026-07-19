import React from 'react';

/**
 * MetadataGrid — a hairline-separated grid of labelled fields, built the
 * archive way: a zinc-200 background showing through 1px gaps between white
 * cells, wrapped in a rounded, bordered card.
 *
 * Pass `items` as [{ label, value }] or compose <MetadataGrid.Cell> children.
 */
export function MetadataGrid({ items, columns = 2, children, style, ...rest }) {
  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
      gap: 1,
      background: 'var(--border-default)',
      border: '1px solid var(--border-default)',
      borderRadius: 'var(--radius-xl)',
      overflow: 'hidden',
      boxShadow: 'var(--shadow-xs)',
      ...style,
    }} {...rest}>
      {items
        ? items.map((it, i) => <Cell key={i} label={it.label}>{it.value}</Cell>)
        : children}
    </div>
  );
}

export function Cell({ label, children, style, ...rest }) {
  return (
    <div style={{ background: 'var(--surface-card)', padding: 'var(--pad-cell)', ...style }} {...rest}>
      <div style={{
        font: 'var(--fw-medium) var(--fs-12)/1.4 var(--font-sans)',
        textTransform: 'uppercase',
        letterSpacing: 'var(--tracking-widest)',
        color: 'var(--text-subtle)',
        marginBottom: 4,
      }}>{label}</div>
      <div style={{ font: 'var(--fw-medium) var(--fs-14)/var(--lh-snug) var(--font-sans)', color: 'var(--text-strong)' }}>{children}</div>
    </div>
  );
}

MetadataGrid.Cell = Cell;
