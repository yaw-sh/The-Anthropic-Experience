import { ReactNode, CSSProperties } from 'react';

export interface MetadataItem {
  label: ReactNode;
  value: ReactNode;
}

export interface MetadataGridProps {
  /** Convenience data form; alternatively compose <MetadataGrid.Cell> children. */
  items?: MetadataItem[];
  /** Column count. Default 2. */
  columns?: number;
  children?: ReactNode;
  style?: CSSProperties;
}

export interface CellProps {
  label: ReactNode;
  children?: ReactNode;
  style?: CSSProperties;
}

/**
 * Hairline-separated grid of labelled metadata fields.
 * @startingPoint section="Data" subtitle="Labelled metadata grid" viewport="700x220"
 */
export function MetadataGrid(props: MetadataGridProps): ReactNode;
export function Cell(props: CellProps): ReactNode;
