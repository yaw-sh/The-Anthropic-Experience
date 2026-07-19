import { ReactNode, CSSProperties } from 'react';

export interface BadgeProps {
  /** neutral (mono/meta), info (blue), status (emerald dot), alert (red). */
  variant?: 'neutral' | 'info' | 'status' | 'alert';
  /** Show a leading status dot (emerald on `status`, else currentColor). */
  dot?: boolean;
  /** Render label in JetBrains Mono at micro size (model chips, IDs). */
  mono?: boolean;
  /** Optional leading iconify glyph. */
  icon?: string;
  children?: ReactNode;
  style?: CSSProperties;
}

/**
 * Compact status/label pill.
 * @startingPoint section="Feedback" subtitle="Status & label pills" viewport="700x150"
 */
export function Badge(props: BadgeProps): ReactNode;
