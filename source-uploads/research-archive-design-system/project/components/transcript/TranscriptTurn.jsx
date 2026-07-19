import React from 'react';
import { Avatar } from './Avatar.jsx';

/**
 * TranscriptTurn — one message in the archive.
 * Human turns render the body inside a left-ruled quote block.
 * Agent turns render prose (with optional model tag + tool-log children above).
 */
export function TranscriptTurn({
  variant = 'user',
  author,
  model,
  turn,
  timestamp,
  icon,
  children,
  style,
  ...rest
}) {
  const isAgent = variant === 'agent';
  const name = author || (isAgent ? 'Claude' : 'Operator');
  return (
    <div style={{ display: 'flex', gap: 'var(--gap-turn)', ...style }} {...rest}>
      <div style={{ marginTop: 2 }}>
        <Avatar variant={isAgent ? 'agent' : 'user'} icon={icon} />
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: isAgent ? 12 : 8, flexWrap: 'wrap' }}>
          <span style={{ font: 'var(--fw-semibold) var(--fs-14)/1.2 var(--font-sans)', color: 'var(--text-strong)' }}>{name}</span>
          {model && (
            <span style={{
              font: 'var(--fw-regular) var(--fs-11)/1 var(--font-mono)',
              letterSpacing: 'var(--tracking-tight)',
              color: 'var(--info-tag-text)',
              background: 'var(--info-tag-bg)',
              border: '1px solid var(--info-tag-border)',
              borderRadius: 'var(--radius-md)',
              padding: '2px 6px',
            }}>{model}</span>
          )}
          {turn != null && (
            <span style={{ font: 'var(--fw-regular) var(--fs-12)/1 var(--font-sans)', color: 'var(--text-faint)' }}>
              {typeof turn === 'number' ? `Turn ${turn}` : turn}
            </span>
          )}
        </div>
        {isAgent ? (
          <div style={{ font: 'var(--text-body-role)', color: 'var(--text-muted)' }}>
            {children}
            {timestamp && <span style={{ color: 'var(--text-faint)', fontSize: 'var(--fs-14)' }}> ({timestamp})</span>}
          </div>
        ) : (
          <div style={{
            font: 'var(--text-body-role)',
            color: 'var(--text-body)',
            borderLeft: '2px solid var(--border-default)',
            paddingLeft: 'var(--space-4)',
            paddingTop: 4,
            paddingBottom: 4,
          }}>{children}</div>
        )}
      </div>
    </div>
  );
}
