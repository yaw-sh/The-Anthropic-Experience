import { ReactNode, CSSProperties } from 'react';

export interface CalloutProps {
  /** info = blue note; alert = red critical block. */
  variant?: 'info' | 'alert';
  /** Override the leading iconify glyph. */
  icon?: string;
  /** Bold lead line above the body. */
  title?: ReactNode;
  children?: ReactNode;
  style?: CSSProperties;
}

/**
 * Bordered note block with a colored left accent bar.
 * @startingPoint section="Feedback" subtitle="Info / alert callout" viewport="700x180"
 */
export function Callout(props: CalloutProps): ReactNode;
