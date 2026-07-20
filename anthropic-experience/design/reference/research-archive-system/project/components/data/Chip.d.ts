import { ReactNode, CSSProperties } from 'react';

export interface ChipProps {
  children?: ReactNode;
  style?: CSSProperties;
}

/** Inline monospace code token for paths, commands, env vars, IDs. */
export function Chip(props: ChipProps): ReactNode;
