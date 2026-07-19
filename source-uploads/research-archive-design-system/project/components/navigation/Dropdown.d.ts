import { ReactNode, CSSProperties } from 'react';

export interface DropdownItem {
  label: ReactNode;
  /** Leading iconify glyph. */
  icon?: string;
  /** Renders the item as an anchor. */
  href?: string;
  onClick?: () => void;
}

export interface DropdownProps {
  /** Trigger label. Default "Options". */
  label?: string;
  items?: DropdownItem[];
  style?: CSSProperties;
}

/** Quiet trigger + bordered white menu panel; opens on hover or click. */
export function Dropdown(props: DropdownProps): ReactNode;
