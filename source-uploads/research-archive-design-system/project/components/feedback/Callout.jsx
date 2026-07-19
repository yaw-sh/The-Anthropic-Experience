import React from 'react';

/**
 * Callout — a bordered note block with a colored left accent bar.
 * `info` = the blue fidelity/redaction note; `alert` = red critical evidence.
 */
export function Callout({ variant = 'info', icon, title, children, style, ...rest }) {
  const isAlert = variant === 'alert';
  const palette = isAlert
    ? { bg: 'var(--alert-surface)', border: 'var(--red-500)', accent: 'var(--alert-accent)', icon: 'var(--red-500)', text: 'var(--alert-text)' }
    : { bg: 'var(--info-surface)', border: 'var(--info-border)', accent: 'var(--info-accent)', icon: 'var(--info-icon)', text: 'var(--info-text)' };
  const glyph = icon || (isAlert ? 'solar:danger-triangle-linear' : 'solar:info-circle-linear');
  return (
    <div style={{
      position: 'relative',
      borderRadius: 'var(--radius-xl)',
      border: `1px solid ${palette.border}`,
      background: palette.bg,
      padding: 'var(--pad-card)',
      color: palette.text,
      font: 'var(--fw-regular) var(--fs-14)/var(--lh-relaxed) var(--font-sans)',
      boxShadow: 'var(--shadow-xs)',
      overflow: 'hidden',
      ...style,
    }} {...rest}>
      <div style={{ position: 'absolute', top: 0, left: 0, width: 4, height: '100%', background: palette.accent }} />
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
        <iconify-icon icon={glyph} stroke-width="1.5" style={{ color: palette.icon, fontSize: 18, marginTop: 2, flexShrink: 0 }}></iconify-icon>
        <div>
          {title && <span style={{ fontWeight: 'var(--fw-semibold)', display: 'block', marginBottom: 4 }}>{title}</span>}
          {children}
        </div>
      </div>
    </div>
  );
}
