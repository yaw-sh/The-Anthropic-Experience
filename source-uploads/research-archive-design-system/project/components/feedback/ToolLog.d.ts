import { ReactNode, CSSProperties } from 'react';

export interface ToolLogProps {
  /** Leading iconify glyph. Default solar:wrench-linear. */
  icon?: string;
  /** Red left border + red text for alarming output. */
  critical?: boolean;
  /** Log body — mono text, may include <strong>/<span> emphasis. */
  children?: ReactNode;
  style?: CSSProperties;
}

/** Monospace action-log receipt card, shown inside agent turns. */
export function ToolLog(props: ToolLogProps): ReactNode;
