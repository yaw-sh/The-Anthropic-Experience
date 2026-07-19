import { ReactNode, CSSProperties } from 'react';

export interface AvatarProps {
  /** `user` = round light circle (human/Operator); `agent` = dark square tile (Claude). */
  variant?: 'user' | 'agent';
  /** Iconify icon name. Defaults to solar:user-linear / solar:cpu-linear by variant. */
  icon?: string;
  /** Pixel size of the square. Default 32. */
  size?: number;
  style?: CSSProperties;
}

/**
 * Speaker glyph leading a transcript turn.
 * @startingPoint section="Transcript" subtitle="Role avatars (human vs agent)" viewport="700x160"
 */
export function Avatar(props: AvatarProps): ReactNode;
