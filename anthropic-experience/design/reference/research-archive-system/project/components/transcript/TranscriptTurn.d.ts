import { ReactNode, CSSProperties } from 'react';

export interface TranscriptTurnProps {
  /** `user` = left-ruled quote block; `agent` = prose with model tag. */
  variant?: 'user' | 'agent';
  /** Speaker name. Defaults to "Operator" / "Claude" by variant. */
  author?: string;
  /** Model chip shown next to the name (agent turns), e.g. "fable-5". */
  model?: string;
  /** Turn index (number → "Turn N") or a custom label string. */
  turn?: number | string;
  /** Timestamp appended to agent prose, e.g. "1745". */
  timestamp?: string;
  /** Override the avatar icon. */
  icon?: string;
  /** Message body. For agent turns, place ToolLog cards here before the prose. */
  children?: ReactNode;
  style?: CSSProperties;
}

/**
 * One message in a transcript/archive thread.
 * @startingPoint section="Transcript" subtitle="Human + agent message turn" viewport="700x220"
 */
export function TranscriptTurn(props: TranscriptTurnProps): ReactNode;
