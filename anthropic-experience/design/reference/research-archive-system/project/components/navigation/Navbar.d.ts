import { ReactNode, CSSProperties } from 'react';

export interface NavbarProps {
  /** Text monogram shown in the dark tile (no logo asset in this system). */
  monogram?: string;
  /** Wordmark next to the monogram. */
  title?: string;
  /** Right-side content (badges, Dropdown, actions). */
  children?: ReactNode;
  style?: CSSProperties;
}

/**
 * Sticky glass top bar with monogram tile + wordmark.
 * @startingPoint section="Navigation" subtitle="Sticky glass top bar" viewport="900x80"
 */
export function Navbar(props: NavbarProps): ReactNode;
