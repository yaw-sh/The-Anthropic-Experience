import { ReactNode, CSSProperties } from 'react';

export interface ModelSwitchDividerProps {
  /** Leading iconify glyph. Default solar:settings-linear. */
  icon?: string;
  /** Mono command text, e.g. "/model claude-opus-4-8". */
  command?: string;
  /** Sans-serif trailing note, e.g. "— switched by the Operator." */
  note?: ReactNode;
  children?: ReactNode;
  style?: CSSProperties;
}

/** Centered capsule-on-a-rule marking a model swap or system break. */
export function ModelSwitchDivider(props: ModelSwitchDividerProps): ReactNode;
