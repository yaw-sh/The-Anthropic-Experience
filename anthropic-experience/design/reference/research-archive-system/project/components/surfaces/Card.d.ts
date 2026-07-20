import { ReactNode, CSSProperties } from 'react';

export interface CardProps {
  /** default (white raised) · muted (zinc summary strip) · flat (no shadow). */
  variant?: 'default' | 'muted' | 'flat';
  /** Override the default padding (any CSS length). */
  padding?: number | string;
  children?: ReactNode;
  style?: CSSProperties;
}

/**
 * White, hairline-bordered, softly-shadowed rounded surface.
 * @startingPoint section="Surfaces" subtitle="Card container + variants" viewport="700x200"
 */
export function Card(props: CardProps): ReactNode;
