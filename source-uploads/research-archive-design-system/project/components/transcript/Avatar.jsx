import React from 'react';

/**
 * Avatar — the small speaker glyph that leads each transcript turn.
 * Two shapes encode role: a round, light, ringed circle for the human
 * ("Operator"); a dark, square-cornered tile for the machine ("Claude").
 */
export function Avatar({ variant = 'user', icon, size = 32, style, ...rest }) {
  const isAgent = variant === 'agent';
  const base = {
    width: size,
    height: size,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    fontSize: Math.round(size * 0.56),
  };
  const skin = isAgent
    ? {
        borderRadius: 'var(--radius-sm)',
        background: 'var(--surface-inverse)',
        border: '1px solid var(--zinc-800)',
        color: 'var(--text-ondark)',
        boxShadow: 'var(--shadow-sm)',
      }
    : {
        borderRadius: 'var(--radius-full)',
        background: 'var(--surface-card)',
        border: '1px solid var(--border-strong)',
        color: 'var(--text-muted)',
        boxShadow: 'var(--shadow-xs)',
      };
  const glyph = icon || (isAgent ? 'solar:cpu-linear' : 'solar:user-linear');
  return (
    <div style={{ ...base, ...skin, ...style }} {...rest}>
      <iconify-icon icon={glyph} stroke-width="1.5"></iconify-icon>
    </div>
  );
}
