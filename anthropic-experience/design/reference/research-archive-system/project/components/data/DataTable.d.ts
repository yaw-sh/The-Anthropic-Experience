import { ReactNode, CSSProperties } from 'react';

export interface DataColumn {
  key: string;
  header: ReactNode;
  /** CSS width for the column, e.g. "48px" or "12rem". */
  width?: string;
  align?: 'left' | 'center' | 'right';
  /** Render this column's cells in JetBrains Mono at xs size. */
  mono?: boolean;
}

export interface DataTableProps {
  columns: DataColumn[];
  /** Row objects keyed by column.key; values may be React nodes. */
  rows: Record<string, ReactNode>[];
  /** Alternating-row wash. Default true. */
  zebra?: boolean;
  style?: CSSProperties;
}

/**
 * Bordered ledger table with sunken header and hairline dividers.
 * @startingPoint section="Data" subtitle="Ledger / evidence table" viewport="700x260"
 */
export function DataTable(props: DataTableProps): ReactNode;
