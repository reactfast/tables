import { ReactNode, FC } from 'react'

export interface Column {
  /** Database column name */
  name: string
  /** Display title for the header */
  title: string
  /** Whether column is sortable (default true) */
  sortable?: boolean
  /** Custom render function: (value, row) => ReactNode */
  render?: (value: any, row: any) => ReactNode
  /** CSS width (e.g. '200px', '25%') */
  width?: string
}

export interface Action {
  /** Icon element to display */
  icon: ReactNode
  /** Click handler, receives the row */
  onClick: (row: any) => void
  /** Tooltip text */
  title?: string
}

export interface TableTheme {
  headerBg?: string
  headerText?: string
  rowBg?: string
  rowHoverBg?: string
  rowText?: string
  borderColor?: string
  accentColor?: string
  mutedText?: string
  activeBg?: string
  activeText?: string
  text?: string
  muted?: string
  border?: string
}

export interface DataTableProps {
  /** Array of row objects */
  data: any[]
  /** Column definitions */
  columns: Column[]
  /** Row action buttons */
  actions?: Action[]
  /** Called when a row is clicked */
  onRowClick?: (row: any) => void
  /** Items per page (default 10) */
  itemsPerPage?: number
  /** Show search bar (default true) */
  searchable?: boolean
  /** Search input placeholder */
  searchPlaceholder?: string
  /** Which columns to search (defaults to all) */
  searchColumns?: string[]
  /** Show loading skeleton */
  loading?: boolean
  /** Message when no data */
  emptyMessage?: string
  /** Theme color overrides */
  theme?: TableTheme
}

export interface PaginationProps {
  currentPage: number
  totalItems: number
  itemsPerPage: number
  onPageChange: (page: number) => void
  theme?: TableTheme
}

export declare const DataTable: FC<DataTableProps>
export declare const Pagination: FC<PaginationProps>
