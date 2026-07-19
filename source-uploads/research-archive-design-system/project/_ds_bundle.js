/* @ds-bundle: {"format":4,"namespace":"ResearchArchiveDesignSystem_b308e3","components":[{"name":"Chip","sourcePath":"components/data/Chip.jsx"},{"name":"DataTable","sourcePath":"components/data/DataTable.jsx"},{"name":"MetadataGrid","sourcePath":"components/data/MetadataGrid.jsx"},{"name":"Cell","sourcePath":"components/data/MetadataGrid.jsx"},{"name":"Badge","sourcePath":"components/feedback/Badge.jsx"},{"name":"Callout","sourcePath":"components/feedback/Callout.jsx"},{"name":"ToolLog","sourcePath":"components/feedback/ToolLog.jsx"},{"name":"Dropdown","sourcePath":"components/navigation/Dropdown.jsx"},{"name":"Navbar","sourcePath":"components/navigation/Navbar.jsx"},{"name":"Card","sourcePath":"components/surfaces/Card.jsx"},{"name":"Avatar","sourcePath":"components/transcript/Avatar.jsx"},{"name":"ModelSwitchDivider","sourcePath":"components/transcript/ModelSwitchDivider.jsx"},{"name":"TranscriptTurn","sourcePath":"components/transcript/TranscriptTurn.jsx"}],"sourceHashes":{"components/data/Chip.jsx":"138f695ca31e","components/data/DataTable.jsx":"d0340217c3ed","components/data/MetadataGrid.jsx":"729367a1894f","components/feedback/Badge.jsx":"405baf4e9ab1","components/feedback/Callout.jsx":"c54b5807e082","components/feedback/ToolLog.jsx":"bd54c8774754","components/navigation/Dropdown.jsx":"0cd083817dc7","components/navigation/Navbar.jsx":"aa047fa5ff72","components/surfaces/Card.jsx":"ed57f342ca4a","components/transcript/Avatar.jsx":"86d31eb3b5c9","components/transcript/ModelSwitchDivider.jsx":"5986939d106b","components/transcript/TranscriptTurn.jsx":"2bba0f8ee803","ui_kits/research-archive/ArchiveHeader.jsx":"b9e20ff52df8","ui_kits/research-archive/ArchiveLedger.jsx":"d2d75de01794","ui_kits/research-archive/ArchiveThread.jsx":"5d0f5e56499e"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.ResearchArchiveDesignSystem_b308e3 = window.ResearchArchiveDesignSystem_b308e3 || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/data/Chip.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Chip — an inline monospace code token (paths, commands, env vars, IDs).
 * The archive uses these constantly inside prose and table cells.
 */
function Chip({
  children,
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("code", _extends({
    style: {
      font: 'var(--fw-regular) var(--fs-12)/1.4 var(--font-mono)',
      color: 'var(--text-muted)',
      background: 'var(--surface-muted)',
      borderRadius: 'var(--radius-sm)',
      padding: '1px 5px',
      whiteSpace: 'nowrap',
      ...style
    }
  }, rest), children);
}
Object.assign(__ds_scope, { Chip });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data/Chip.jsx", error: String((e && e.message) || e) }); }

// components/data/DataTable.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * DataTable — the ledger table: rounded bordered shell, sunken header row,
 * hairline row dividers, and an optional zebra wash on alternating rows.
 *
 * columns: [{ key, header, width?, align?, mono? }]
 * rows: array of objects keyed by column.key. Cell values may be nodes.
 */
function DataTable({
  columns,
  rows,
  zebra = true,
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      overflowX: 'auto',
      borderRadius: 'var(--radius-xl)',
      border: '1px solid var(--border-default)',
      background: 'var(--surface-card)',
      boxShadow: 'var(--shadow-xs)',
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("table", {
    style: {
      width: '100%',
      borderCollapse: 'collapse',
      textAlign: 'left',
      font: 'var(--fw-regular) var(--fs-14)/var(--lh-normal) var(--font-sans)'
    }
  }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", {
    style: {
      background: 'var(--surface-sunken)',
      borderBottom: '1px solid var(--border-default)'
    }
  }, columns.map((c, i) => /*#__PURE__*/React.createElement("th", {
    key: c.key,
    style: {
      padding: '12px 16px',
      font: 'var(--fw-medium) var(--fs-14)/1.3 var(--font-sans)',
      color: 'var(--text-strong)',
      textAlign: c.align || 'left',
      width: c.width,
      borderLeft: i === 0 ? 'none' : '1px solid var(--border-default)',
      whiteSpace: 'nowrap'
    }
  }, c.header)))), /*#__PURE__*/React.createElement("tbody", null, rows.map((row, ri) => /*#__PURE__*/React.createElement("tr", {
    key: ri,
    style: {
      borderTop: ri === 0 ? 'none' : '1px solid var(--border-subtle)',
      background: zebra && ri % 2 === 1 ? 'color-mix(in srgb, var(--zinc-50) 30%, transparent)' : 'transparent'
    }
  }, columns.map((c, ci) => /*#__PURE__*/React.createElement("td", {
    key: c.key,
    style: {
      padding: '12px 16px',
      color: 'var(--text-muted)',
      textAlign: c.align || 'left',
      borderLeft: ci === 0 ? 'none' : '1px solid var(--border-subtle)',
      font: c.mono ? 'var(--fw-regular) var(--fs-12)/var(--lh-normal) var(--font-mono)' : 'inherit',
      verticalAlign: 'top'
    }
  }, row[c.key])))))));
}
Object.assign(__ds_scope, { DataTable });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data/DataTable.jsx", error: String((e && e.message) || e) }); }

// components/data/MetadataGrid.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * MetadataGrid — a hairline-separated grid of labelled fields, built the
 * archive way: a zinc-200 background showing through 1px gaps between white
 * cells, wrapped in a rounded, bordered card.
 *
 * Pass `items` as [{ label, value }] or compose <MetadataGrid.Cell> children.
 */
function MetadataGrid({
  items,
  columns = 2,
  children,
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      display: 'grid',
      gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
      gap: 1,
      background: 'var(--border-default)',
      border: '1px solid var(--border-default)',
      borderRadius: 'var(--radius-xl)',
      overflow: 'hidden',
      boxShadow: 'var(--shadow-xs)',
      ...style
    }
  }, rest), items ? items.map((it, i) => /*#__PURE__*/React.createElement(Cell, {
    key: i,
    label: it.label
  }, it.value)) : children);
}
function Cell({
  label,
  children,
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      background: 'var(--surface-card)',
      padding: 'var(--pad-cell)',
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--fw-medium) var(--fs-12)/1.4 var(--font-sans)',
      textTransform: 'uppercase',
      letterSpacing: 'var(--tracking-widest)',
      color: 'var(--text-subtle)',
      marginBottom: 4
    }
  }, label), /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--fw-medium) var(--fs-14)/var(--lh-snug) var(--font-sans)',
      color: 'var(--text-strong)'
    }
  }, children));
}
MetadataGrid.Cell = Cell;
Object.assign(__ds_scope, { MetadataGrid, Cell });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data/MetadataGrid.jsx", error: String((e && e.message) || e) }); }

// components/feedback/Badge.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Badge — a compact status/label pill.
 * Variants map to the archive's roles: neutral (mono meta tags),
 * info (blue model chips), status (emerald dot pill), alert (red).
 */
function Badge({
  variant = 'neutral',
  dot = false,
  mono = false,
  icon,
  children,
  style,
  ...rest
}) {
  const palettes = {
    neutral: {
      color: 'var(--text-subtle)',
      background: 'var(--surface-muted)',
      border: 'var(--border-default)'
    },
    info: {
      color: 'var(--info-tag-text)',
      background: 'var(--info-tag-bg)',
      border: 'var(--info-tag-border)'
    },
    status: {
      color: 'var(--text-subtle)',
      background: 'var(--surface-muted)',
      border: 'var(--border-default)',
      dotColor: 'var(--status-ok)'
    },
    alert: {
      color: 'var(--alert-text)',
      background: 'var(--alert-surface)',
      border: 'var(--red-500)'
    }
  };
  const p = palettes[variant] || palettes.neutral;
  return /*#__PURE__*/React.createElement("span", _extends({
    style: {
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
      ...style
    }
  }, rest), dot && /*#__PURE__*/React.createElement("span", {
    style: {
      width: 6,
      height: 6,
      borderRadius: '50%',
      background: p.dotColor || 'currentColor',
      flexShrink: 0
    }
  }), icon && /*#__PURE__*/React.createElement("iconify-icon", {
    icon: icon,
    "stroke-width": "1.5"
  }), children);
}
Object.assign(__ds_scope, { Badge });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/Badge.jsx", error: String((e && e.message) || e) }); }

// components/feedback/Callout.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Callout — a bordered note block with a colored left accent bar.
 * `info` = the blue fidelity/redaction note; `alert` = red critical evidence.
 */
function Callout({
  variant = 'info',
  icon,
  title,
  children,
  style,
  ...rest
}) {
  const isAlert = variant === 'alert';
  const palette = isAlert ? {
    bg: 'var(--alert-surface)',
    border: 'var(--red-500)',
    accent: 'var(--alert-accent)',
    icon: 'var(--red-500)',
    text: 'var(--alert-text)'
  } : {
    bg: 'var(--info-surface)',
    border: 'var(--info-border)',
    accent: 'var(--info-accent)',
    icon: 'var(--info-icon)',
    text: 'var(--info-text)'
  };
  const glyph = icon || (isAlert ? 'solar:danger-triangle-linear' : 'solar:info-circle-linear');
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      position: 'relative',
      borderRadius: 'var(--radius-xl)',
      border: `1px solid ${palette.border}`,
      background: palette.bg,
      padding: 'var(--pad-card)',
      color: palette.text,
      font: 'var(--fw-regular) var(--fs-14)/var(--lh-relaxed) var(--font-sans)',
      boxShadow: 'var(--shadow-xs)',
      overflow: 'hidden',
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: 4,
      height: '100%',
      background: palette.accent
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'flex-start',
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("iconify-icon", {
    icon: glyph,
    "stroke-width": "1.5",
    style: {
      color: palette.icon,
      fontSize: 18,
      marginTop: 2,
      flexShrink: 0
    }
  }), /*#__PURE__*/React.createElement("div", null, title && /*#__PURE__*/React.createElement("span", {
    style: {
      fontWeight: 'var(--fw-semibold)',
      display: 'block',
      marginBottom: 4
    }
  }, title), children)));
}
Object.assign(__ds_scope, { Callout });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/Callout.jsx", error: String((e && e.message) || e) }); }

// components/feedback/ToolLog.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * ToolLog — a monospace action-log card (the wrench-icon receipts shown
 * inside agent turns). `critical` adds a red left border for alarming output.
 */
function ToolLog({
  icon = 'solar:wrench-linear',
  critical = false,
  children,
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      background: 'var(--surface-card)',
      border: '1px solid var(--border-default)',
      borderLeft: critical ? '4px solid var(--red-500)' : '1px solid var(--border-default)',
      borderRadius: 'var(--radius-lg)',
      padding: 'var(--space-3)',
      boxShadow: 'var(--shadow-xs)',
      font: 'var(--text-mono-role)',
      color: critical ? 'var(--alert-text)' : 'var(--text-muted)',
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 10,
      alignItems: 'flex-start'
    }
  }, /*#__PURE__*/React.createElement("iconify-icon", {
    icon: icon,
    "stroke-width": "1.5",
    style: {
      color: critical ? 'var(--red-500)' : 'var(--text-faint)',
      fontSize: 14,
      marginTop: 2,
      flexShrink: 0
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      lineHeight: 'var(--lh-normal)'
    }
  }, children)));
}
Object.assign(__ds_scope, { ToolLog });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/ToolLog.jsx", error: String((e && e.message) || e) }); }

// components/navigation/Dropdown.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Dropdown — a hover/click menu: a quiet trigger button and a bordered
 * white panel of items. Uncontrolled by default (opens on hover + click).
 * items: [{ label, icon, href, onClick }]
 */
function Dropdown({
  label = 'Options',
  items = [],
  style,
  ...rest
}) {
  const [open, setOpen] = React.useState(false);
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      position: 'relative',
      ...style
    },
    onMouseEnter: () => setOpen(true),
    onMouseLeave: () => setOpen(false)
  }, rest), /*#__PURE__*/React.createElement("button", {
    onClick: () => setOpen(o => !o),
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 4,
      font: 'var(--fw-medium) var(--fs-12)/1 var(--font-sans)',
      color: open ? 'var(--text-strong)' : 'var(--text-muted)',
      background: 'none',
      border: 'none',
      cursor: 'pointer',
      padding: 0,
      transition: 'var(--transition-colors)'
    }
  }, label, /*#__PURE__*/React.createElement("iconify-icon", {
    icon: "solar:alt-arrow-down-linear",
    "stroke-width": "1.5",
    style: {
      color: 'var(--text-faint)'
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      right: 0,
      marginTop: 8,
      width: 176,
      background: 'var(--surface-card)',
      border: '1px solid var(--border-default)',
      borderRadius: 'var(--radius-lg)',
      boxShadow: 'var(--shadow-xs)',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
      opacity: open ? 1 : 0,
      visibility: open ? 'visible' : 'hidden',
      transform: open ? 'translateY(0)' : 'translateY(-4px)',
      transition: `opacity var(--dur-fast) var(--ease-standard), transform var(--dur-fast) var(--ease-standard), visibility var(--dur-fast)`,
      zIndex: 60
    }
  }, items.map((it, i) => {
    const Tag = it.href ? 'a' : 'button';
    return /*#__PURE__*/React.createElement(Tag, {
      key: i,
      href: it.href,
      onClick: it.onClick,
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        padding: '8px 12px',
        textAlign: 'left',
        width: '100%',
        font: 'var(--fw-medium) var(--fs-14)/1.3 var(--font-sans)',
        color: 'var(--text-muted)',
        background: 'none',
        border: 'none',
        borderBottom: i < items.length - 1 ? '1px solid var(--border-subtle)' : 'none',
        cursor: 'pointer',
        textDecoration: 'none',
        transition: 'var(--transition-colors)'
      },
      onMouseEnter: e => {
        e.currentTarget.style.background = 'var(--hover-menu)';
        e.currentTarget.style.color = 'var(--text-strong)';
      },
      onMouseLeave: e => {
        e.currentTarget.style.background = 'none';
        e.currentTarget.style.color = 'var(--text-muted)';
      }
    }, it.icon && /*#__PURE__*/React.createElement("iconify-icon", {
      icon: it.icon,
      "stroke-width": "1.5"
    }), it.label);
  })));
}
Object.assign(__ds_scope, { Dropdown });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/Dropdown.jsx", error: String((e && e.message) || e) }); }

// components/navigation/Navbar.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Navbar — the sticky, glass, hairline-bottom top bar. Renders a monogram
 * tile + wordmark on the left; arbitrary children on the right.
 * With no logo asset in this system, the mark is a text monogram tile.
 */
function Navbar({
  monogram = 'AE',
  title = 'Research Archive',
  children,
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("nav", _extends({
    style: {
      position: 'sticky',
      top: 0,
      zIndex: 50,
      background: 'var(--glass-bg)',
      backdropFilter: 'blur(var(--blur-nav))',
      WebkitBackdropFilter: 'blur(var(--blur-nav))',
      borderBottom: '1px solid var(--border-default)',
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 'var(--shell-max)',
      margin: '0 auto',
      padding: '0 24px',
      height: 'var(--nav-height)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 32,
      height: 32,
      background: 'var(--surface-inverse)',
      color: 'var(--text-ondark)',
      borderRadius: 'var(--radius-sm)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      font: 'var(--fw-semibold) var(--fs-14)/1 var(--font-sans)',
      letterSpacing: '-0.05em'
    }
  }, monogram), /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--fw-medium) var(--fs-14)/1 var(--font-sans)',
      letterSpacing: 'var(--tracking-tight)',
      color: 'var(--text-strong)'
    }
  }, title)), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 16
    }
  }, children)));
}
Object.assign(__ds_scope, { Navbar });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/Navbar.jsx", error: String((e && e.message) || e) }); }

// components/surfaces/Card.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Card — the archive's surface primitive. A white, hairline-bordered,
 * softly-shadowed, rounded container.
 *  - `default`  white raised card
 *  - `muted`    quiet zinc-wash summary strip (bg-zinc-100/70)
 *  - `flat`     no shadow (nested / inline blocks)
 */
function Card({
  variant = 'default',
  padding,
  children,
  style,
  ...rest
}) {
  const skins = {
    default: {
      background: 'var(--surface-card)',
      border: '1px solid var(--border-default)',
      boxShadow: 'var(--shadow-xs)'
    },
    muted: {
      background: 'color-mix(in srgb, var(--zinc-100) 70%, #fff)',
      border: '1px solid var(--border-default)',
      boxShadow: 'var(--shadow-xs)'
    },
    flat: {
      background: 'var(--surface-card)',
      border: '1px solid var(--border-default)',
      boxShadow: 'none'
    }
  };
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      borderRadius: 'var(--radius-xl)',
      padding: padding != null ? padding : 'var(--pad-card)',
      font: 'var(--fw-regular) var(--fs-14)/var(--lh-relaxed) var(--font-sans)',
      color: 'var(--text-muted)',
      ...skins[variant],
      ...style
    }
  }, rest), children);
}
Object.assign(__ds_scope, { Card });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/surfaces/Card.jsx", error: String((e && e.message) || e) }); }

// components/transcript/Avatar.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Avatar — the small speaker glyph that leads each transcript turn.
 * Two shapes encode role: a round, light, ringed circle for the human
 * ("Operator"); a dark, square-cornered tile for the machine ("Claude").
 */
function Avatar({
  variant = 'user',
  icon,
  size = 32,
  style,
  ...rest
}) {
  const isAgent = variant === 'agent';
  const base = {
    width: size,
    height: size,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    fontSize: Math.round(size * 0.56)
  };
  const skin = isAgent ? {
    borderRadius: 'var(--radius-sm)',
    background: 'var(--surface-inverse)',
    border: '1px solid var(--zinc-800)',
    color: 'var(--text-ondark)',
    boxShadow: 'var(--shadow-sm)'
  } : {
    borderRadius: 'var(--radius-full)',
    background: 'var(--surface-card)',
    border: '1px solid var(--border-strong)',
    color: 'var(--text-muted)',
    boxShadow: 'var(--shadow-xs)'
  };
  const glyph = icon || (isAgent ? 'solar:cpu-linear' : 'solar:user-linear');
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      ...base,
      ...skin,
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("iconify-icon", {
    icon: glyph,
    "stroke-width": "1.5"
  }));
}
Object.assign(__ds_scope, { Avatar });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/transcript/Avatar.jsx", error: String((e && e.message) || e) }); }

// components/transcript/ModelSwitchDivider.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * ModelSwitchDivider — a centered mono capsule sitting on a hairline rule,
 * used to mark a model swap or any system-level break in the thread.
 */
function ModelSwitchDivider({
  icon = 'solar:settings-linear',
  command,
  note,
  children,
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 'var(--space-4)',
      margin: 'var(--space-12) 0',
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("div", {
    style: {
      height: 1,
      background: 'var(--rule)',
      flex: 1
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      whiteSpace: 'nowrap',
      font: 'var(--text-mono-role)',
      color: 'var(--text-subtle)',
      background: 'var(--surface-card)',
      border: '1px solid var(--border-default)',
      borderRadius: 'var(--radius-full)',
      boxShadow: 'var(--shadow-xs)',
      padding: '6px 16px'
    }
  }, /*#__PURE__*/React.createElement("iconify-icon", {
    icon: icon,
    "stroke-width": "1.5"
  }), command && /*#__PURE__*/React.createElement("span", null, command), (note || children) && /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-sans)',
      color: 'var(--text-faint)'
    }
  }, note || children)), /*#__PURE__*/React.createElement("div", {
    style: {
      height: 1,
      background: 'var(--rule)',
      flex: 1
    }
  }));
}
Object.assign(__ds_scope, { ModelSwitchDivider });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/transcript/ModelSwitchDivider.jsx", error: String((e && e.message) || e) }); }

// components/transcript/TranscriptTurn.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * TranscriptTurn — one message in the archive.
 * Human turns render the body inside a left-ruled quote block.
 * Agent turns render prose (with optional model tag + tool-log children above).
 */
function TranscriptTurn({
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
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      display: 'flex',
      gap: 'var(--gap-turn)',
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 2
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Avatar, {
    variant: isAgent ? 'agent' : 'user',
    icon: icon
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      marginBottom: isAgent ? 12 : 8,
      flexWrap: 'wrap'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--fw-semibold) var(--fs-14)/1.2 var(--font-sans)',
      color: 'var(--text-strong)'
    }
  }, name), model && /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--fw-regular) var(--fs-11)/1 var(--font-mono)',
      letterSpacing: 'var(--tracking-tight)',
      color: 'var(--info-tag-text)',
      background: 'var(--info-tag-bg)',
      border: '1px solid var(--info-tag-border)',
      borderRadius: 'var(--radius-md)',
      padding: '2px 6px'
    }
  }, model), turn != null && /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--fw-regular) var(--fs-12)/1 var(--font-sans)',
      color: 'var(--text-faint)'
    }
  }, typeof turn === 'number' ? `Turn ${turn}` : turn)), isAgent ? /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--text-body-role)',
      color: 'var(--text-muted)'
    }
  }, children, timestamp && /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--text-faint)',
      fontSize: 'var(--fs-14)'
    }
  }, " (", timestamp, ")")) : /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--text-body-role)',
      color: 'var(--text-body)',
      borderLeft: '2px solid var(--border-default)',
      paddingLeft: 'var(--space-4)',
      paddingTop: 4,
      paddingBottom: 4
    }
  }, children)));
}
Object.assign(__ds_scope, { TranscriptTurn });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/transcript/TranscriptTurn.jsx", error: String((e && e.message) || e) }); }

// ui_kits/research-archive/ArchiveHeader.jsx
try { (() => {
// Document header + fidelity note. Composes Navbar, MetadataGrid, Badge, Callout.
function ArchiveHeader() {
  const {
    MetadataGrid,
    Badge
  } = window.ResearchArchiveDesignSystem_b308e3;
  return /*#__PURE__*/React.createElement("header", {
    style: {
      marginBottom: 48
    }
  }, /*#__PURE__*/React.createElement("h1", {
    style: {
      font: 'var(--fw-semibold) clamp(30px,5vw,36px)/1.1 var(--font-sans)',
      letterSpacing: 'var(--tracking-tighter)',
      color: 'var(--text-strong)',
      margin: '0 0 12px'
    }
  }, "THE ANTHROPIC EXPERIENCE"), /*#__PURE__*/React.createElement("h2", {
    style: {
      font: 'var(--fw-medium) 18px/1.4 var(--font-sans)',
      color: 'var(--text-subtle)',
      margin: '0 0 32px'
    }
  }, "Full Chat Transcript (Sanitized)"), /*#__PURE__*/React.createElement(MetadataGrid, {
    columns: 2,
    items: [{
      label: 'Date',
      value: '2026-07-18'
    }, {
      label: 'Surface',
      value: /*#__PURE__*/React.createElement("span", {
        style: {
          display: 'inline-flex',
          gap: 8,
          alignItems: 'center',
          flexWrap: 'wrap'
        }
      }, "Claude Cowork ", /*#__PURE__*/React.createElement(Badge, {
        variant: "neutral"
      }, "web, beta \u2014 11 days old"))
    }, {
      label: 'Participants',
      value: /*#__PURE__*/React.createElement(React.Fragment, null, "The Operator ", /*#__PURE__*/React.createElement("span", {
        style: {
          color: 'var(--text-faint)',
          fontWeight: 400
        }
      }, "(name withheld)"), " \xB7 Claude")
    }, {
      label: 'Models Used',
      value: /*#__PURE__*/React.createElement("span", {
        style: {
          display: 'inline-flex',
          gap: 6,
          flexWrap: 'wrap'
        }
      }, /*#__PURE__*/React.createElement(Badge, {
        variant: "neutral",
        mono: true
      }, "fable-5"), /*#__PURE__*/React.createElement(Badge, {
        variant: "info",
        mono: true
      }, "opus-4.8"), /*#__PURE__*/React.createElement(Badge, {
        variant: "neutral",
        mono: true
      }, "fable-5"))
    }]
  }));
}
function FidelityNote() {
  const {
    Callout
  } = window.ResearchArchiveDesignSystem_b308e3;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      margin: '0 0 64px'
    }
  }, /*#__PURE__*/React.createElement(Callout, {
    variant: "info",
    title: "Fidelity + redaction note (written by the assistant):"
  }, "Reconstructed by the assistant from in-session context at the Operator's request. Operator messages are verbatim ", /*#__PURE__*/React.createElement("strong", null, "except"), ": identifiers, machine paths and project pseudonyms are generalized; profanity is masked; personal material is held at pattern level. All confessed failures are reproduced without softening."));
}
Object.assign(window, {
  ArchiveHeader,
  FidelityNote
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/research-archive/ArchiveHeader.jsx", error: String((e && e.message) || e) }); }

// ui_kits/research-archive/ArchiveLedger.jsx
try { (() => {
// Session ledger: heading, DataTable of strikes, muted summary strip.

function SectionRule() {
  return /*#__PURE__*/React.createElement("hr", {
    style: {
      border: 'none',
      borderTop: '1px solid var(--rule)',
      margin: '0 0 64px'
    }
  });
}
function SectionHeading({
  children,
  sub
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: sub ? 16 : 24
    }
  }, /*#__PURE__*/React.createElement("h3", {
    style: {
      font: 'var(--fw-semibold) 24px/1.2 var(--font-sans)',
      letterSpacing: 'var(--tracking-tight)',
      color: 'var(--text-strong)',
      margin: 0
    }
  }, children), sub && /*#__PURE__*/React.createElement("p", {
    style: {
      font: 'var(--fw-regular) 14px/1.4 var(--font-sans)',
      color: 'var(--text-subtle)',
      margin: '8px 0 0'
    }
  }, sub));
}
function ArchiveLedger() {
  const {
    DataTable,
    Card,
    Chip
  } = window.ResearchArchiveDesignSystem_b308e3;
  const rows = [{
    n: '1',
    e: 'Strike one',
    v: /*#__PURE__*/React.createElement(React.Fragment, null, "Proposed building a GitHub connector; asserted none existed without searching. Anthropic's own ", /*#__PURE__*/React.createElement(Chip, null, "knowledge-work-plugins"), " found 30s after being told to look.")
  }, {
    n: '2',
    e: 'Strike two',
    v: /*#__PURE__*/React.createElement(React.Fragment, null, "\"Corrected\" the Operator with 2024 deprecation history after being told twice the subject was ", /*#__PURE__*/React.createElement("strong", null, "ChatGPT Work"), ".")
  }, {
    n: '3',
    e: 'Strike three',
    v: /*#__PURE__*/React.createElement(React.Fragment, null, "Answered with narrative without reading files. ", /*#__PURE__*/React.createElement(Chip, null, "engineering/.mcp.json"), " found pre-configuring ", /*#__PURE__*/React.createElement("strong", null, "GitHub"), " \u2014 on disk since session start.")
  }, {
    n: '4',
    e: 'Strike four',
    v: /*#__PURE__*/React.createElement(React.Fragment, null, "Repeated \"zero GitHub credentials\" while ", /*#__PURE__*/React.createElement(Chip, null, "GH_TOKEN"), "/", /*#__PURE__*/React.createElement(Chip, null, "GITHUB_TOKEN"), " sat in the environment, unchecked.")
  }, {
    n: '5',
    e: 'Strike five',
    v: /*#__PURE__*/React.createElement(React.Fragment, null, "Twice claimed the opening question was \"eight hours ago\"; true elapsed time was 3h45m. First self-caught false statement.")
  }, {
    n: '6',
    e: 'Strike six',
    v: /*#__PURE__*/React.createElement(React.Fragment, null, "Container-blindness: analyzed the evidence contents but never read the address \u2014 missing the corpus was a fellowship application.")
  }];
  return /*#__PURE__*/React.createElement("section", {
    style: {
      marginBottom: 64
    }
  }, /*#__PURE__*/React.createElement(SectionHeading, {
    sub: "(summary up front)"
  }, "Session ledger"), /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: 24
    }
  }, /*#__PURE__*/React.createElement(DataTable, {
    columns: [{
      key: 'n',
      header: '#',
      width: '48px',
      align: 'center'
    }, {
      key: 'e',
      header: 'Event',
      width: '11rem'
    }, {
      key: 'v',
      header: 'Evidence'
    }],
    rows: rows
  })), /*#__PURE__*/React.createElement(Card, {
    variant: "muted",
    padding: "var(--space-4)"
  }, /*#__PURE__*/React.createElement("strong", {
    style: {
      color: 'var(--text-strong)',
      fontWeight: 600
    }
  }, "Live environment numbers (measured mid-session):"), " 35 Claude surfaces cataloged \xB7 12 connectors installed at peak / 0 enabled in this chat \xB7 32 plugins \u2192 pruned to 2 \xB7 0 GitHub plugins in catalog \xB7 4 built-in skills \xB7 2 models across 3 switches."));
}
Object.assign(window, {
  ArchiveLedger,
  SectionRule,
  SectionHeading
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/research-archive/ArchiveLedger.jsx", error: String((e && e.message) || e) }); }

// ui_kits/research-archive/ArchiveThread.jsx
try { (() => {
// The transcript thread: a sequence of TranscriptTurns, ToolLogs and ModelSwitchDividers.
function ArchiveThread() {
  const {
    TranscriptTurn,
    ModelSwitchDivider,
    ToolLog,
    Chip
  } = window.ResearchArchiveDesignSystem_b308e3;
  const turn = {
    marginBottom: 48
  };
  return /*#__PURE__*/React.createElement("section", null, /*#__PURE__*/React.createElement("h3", {
    style: {
      font: 'var(--fw-semibold) 24px/1.2 var(--font-sans)',
      letterSpacing: 'var(--tracking-tight)',
      color: 'var(--text-strong)',
      margin: '0 0 40px'
    }
  }, "Transcript"), /*#__PURE__*/React.createElement(TranscriptTurn, {
    variant: "user",
    turn: 1,
    style: turn
  }, "Are you able to connect to github"), /*#__PURE__*/React.createElement(TranscriptTurn, {
    variant: "agent",
    model: "fable-5",
    turn: 2,
    timestamp: "20260718-1505",
    style: turn
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: 16
    }
  }, /*#__PURE__*/React.createElement(ToolLog, null, /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--text-strong)',
      fontWeight: 500
    }
  }, "git ls-remote"), " public repo \u2192 success \xB7 ", /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--text-strong)',
      fontWeight: 500
    }
  }, "gh"), " not installed \xB7 connector registry \u2192 opt-in required")), "Yes \u2014 I just tested it. ", /*#__PURE__*/React.createElement("strong", null, "What works:"), " this sandbox reaches github.com; public repos need no setup. ", /*#__PURE__*/React.createElement("strong", null, "What needs setup:"), " private repos need credentials. Two options: a GitHub connector, or a fine-grained PAT."), /*#__PURE__*/React.createElement(TranscriptTurn, {
    variant: "user",
    turn: 5,
    style: turn
  }, "I'm talking about my personal private repo. Are you saying Claude doesn't have a github connector? Don't you find that a little suspicious? The largest frontier coding platform in the world just forgot GitHub?"), /*#__PURE__*/React.createElement(TranscriptTurn, {
    variant: "agent",
    model: "fable-5",
    turn: 8,
    timestamp: "1530",
    style: turn
  }, "Correct \u2014 I can't. Zero access right now. No OAuth token, no PAT \u2014 \"nothing GitHub-shaped in here.\" ", /*#__PURE__*/React.createElement("em", {
    style: {
      color: 'var(--text-subtle)'
    }
  }, "(Later note: that sentence became Strike Four \u2014 ", /*#__PURE__*/React.createElement(Chip, null, "GITHUB_TOKEN"), " was in the environment at that moment, unchecked.)")), /*#__PURE__*/React.createElement(ModelSwitchDivider, {
    command: "/model claude-opus-4-8",
    note: "\u2014 switched by the Operator."
  }), /*#__PURE__*/React.createElement(TranscriptTurn, {
    variant: "agent",
    model: "opus-4.8",
    turn: 10,
    timestamp: "1531",
    icon: "solar:cpu-linear",
    style: turn
  }, "It's not a legal issue. When ChatGPT writes a repo in a browser, that's ", /*#__PURE__*/React.createElement("strong", null, "Codex"), "; Anthropic's equivalent is ", /*#__PURE__*/React.createElement("strong", null, "Claude Code on the web"), ". The wall: I'm not Claude Code; I'm Cowork. ", /*#__PURE__*/React.createElement("em", {
    style: {
      color: 'var(--text-subtle)'
    }
  }, "(Later note: answered the wrong product \u2014 Strike Two.)")), /*#__PURE__*/React.createElement(ModelSwitchDivider, {
    command: "/model claude-fable-5",
    note: "\u2014 switched back by the Operator."
  }), /*#__PURE__*/React.createElement(TranscriptTurn, {
    variant: "agent",
    model: "fable-5",
    turn: 25,
    timestamp: "1745",
    style: turn
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: 16
    }
  }, /*#__PURE__*/React.createElement(ToolLog, null, /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--text-strong)',
      fontWeight: 500
    }
  }, "env | grep"), " \u2192 ", /*#__PURE__*/React.createElement("strong", null, "GH_TOKEN/GITHUB_TOKEN SET"), " (14-char proxy sentinel) \xB7 Disclosed test \u2192 ", /*#__PURE__*/React.createElement("strong", null, "HTTP 502 \u2014 builtin injection failed"))), "\"One ", /*#__PURE__*/React.createElement(Chip, null, "env | grep -i github"), " \u2014 the first command any developer would run \u2014 would have shown it. I never ran it. This surface has a ", /*#__PURE__*/React.createElement("strong", null, "native"), " GitHub connection path \u2014 pre-wired into the walls; the assistant just hasn't looked at the walls.\""), /*#__PURE__*/React.createElement(TranscriptTurn, {
    variant: "agent",
    model: "fable-5",
    turn: 49,
    timestamp: "1858",
    style: turn
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: 16
    }
  }, /*#__PURE__*/React.createElement(ToolLog, {
    critical: true
  }, "Re-probed: private repo \u2192 403 \xB7 a ", /*#__PURE__*/React.createElement("em", null, "public"), " repo \u2192 the same 403. ", /*#__PURE__*/React.createElement("strong", null, "Session repository set: empty. Even public repos blocked."))), "\"", /*#__PURE__*/React.createElement("strong", null, "I pointed you at a door that has been standing open for three months."), " Your GitHub has been maximally authorized to Anthropic since approximately April. Claude Code Web is using this exact installation right now. One surface has read/write to everything you own; this surface has your name and an empty room.\""));
}
Object.assign(window, {
  ArchiveThread
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/research-archive/ArchiveThread.jsx", error: String((e && e.message) || e) }); }

__ds_ns.Chip = __ds_scope.Chip;

__ds_ns.DataTable = __ds_scope.DataTable;

__ds_ns.MetadataGrid = __ds_scope.MetadataGrid;

__ds_ns.Cell = __ds_scope.Cell;

__ds_ns.Badge = __ds_scope.Badge;

__ds_ns.Callout = __ds_scope.Callout;

__ds_ns.ToolLog = __ds_scope.ToolLog;

__ds_ns.Dropdown = __ds_scope.Dropdown;

__ds_ns.Navbar = __ds_scope.Navbar;

__ds_ns.Card = __ds_scope.Card;

__ds_ns.Avatar = __ds_scope.Avatar;

__ds_ns.ModelSwitchDivider = __ds_scope.ModelSwitchDivider;

__ds_ns.TranscriptTurn = __ds_scope.TranscriptTurn;

})();
