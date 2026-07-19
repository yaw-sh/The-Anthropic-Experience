import React from 'react';

/**
 * DataTable — the ledger table: rounded bordered shell, sunken header row,
 * hairline row dividers, and an optional zebra wash on alternating rows.
 *
 * columns: [{ key, header, width?, align?, mono? }]
 * rows: array of objects keyed by column.key. Cell values may be nodes.
 */
export function DataTable({ columns, rows, zebra = true, style, ...rest }) {
  return (
    <div style={{
      overflowX: 'auto',
      borderRadius: 'var(--radius-xl)',
      border: '1px solid var(--border-default)',
      background: 'var(--surface-card)',
      boxShadow: 'var(--shadow-xs)',
      ...style,
    }} {...rest}>
      <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', font: 'var(--fw-regular) var(--fs-14)/var(--lh-normal) var(--font-sans)' }}>
        <thead>
          <tr style={{ background: 'var(--surface-sunken)', borderBottom: '1px solid var(--border-default)' }}>
            {columns.map((c, i) => (
              <th key={c.key} style={{
                padding: '12px 16px',
                font: 'var(--fw-medium) var(--fs-14)/1.3 var(--font-sans)',
                color: 'var(--text-strong)',
                textAlign: c.align || 'left',
                width: c.width,
                borderLeft: i === 0 ? 'none' : '1px solid var(--border-default)',
                whiteSpace: 'nowrap',
              }}>{c.header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, ri) => (
            <tr key={ri} style={{
              borderTop: ri === 0 ? 'none' : '1px solid var(--border-subtle)',
              background: zebra && ri % 2 === 1 ? 'color-mix(in srgb, var(--zinc-50) 30%, transparent)' : 'transparent',
            }}>
              {columns.map((c, ci) => (
                <td key={c.key} style={{
                  padding: '12px 16px',
                  color: 'var(--text-muted)',
                  textAlign: c.align || 'left',
                  borderLeft: ci === 0 ? 'none' : '1px solid var(--border-subtle)',
                  font: c.mono ? 'var(--fw-regular) var(--fs-12)/var(--lh-normal) var(--font-mono)' : 'inherit',
                  verticalAlign: 'top',
                }}>{row[c.key]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
