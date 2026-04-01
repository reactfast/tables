"use client"

import { useState, useMemo, useCallback } from "react"
import { Pagination } from "./Pagination"
import {
  ChevronUpIcon,
  ChevronDownIcon,
  ChevronUpDownIcon,
  MagnifyingGlassIcon,
} from "./icons"

/**
 * DataTable — declarative data tables for React
 *
 * @param {Object} props
 * @param {Array} props.data - Array of row objects
 * @param {Array} props.columns - Column definitions: [{ name: 'db_column', title: 'Display Title', sortable?, render?, width? }]
 * @param {Array} props.actions - Row actions: [{ icon: <Component/>, onClick: (row) => {}, title? }]
 * @param {Function} props.onRowClick - Called with row when a row is clicked
 * @param {number} props.itemsPerPage - Items per page (default 10)
 * @param {boolean} props.searchable - Show search bar (default true)
 * @param {string} props.searchPlaceholder - Search input placeholder
 * @param {string[]} props.searchColumns - Which columns to search (defaults to all)
 * @param {boolean} props.loading - Show loading state
 * @param {string} props.emptyMessage - Message when no data
 * @param {Object} props.theme - Color overrides
 */
export function DataTable({
  data = [],
  columns = [],
  actions = [],
  onRowClick,
  itemsPerPage = 10,
  searchable = true,
  searchPlaceholder = "Search...",
  searchColumns,
  loading = false,
  emptyMessage = "No data found",
  theme = {},
}) {
  const [currentPage, setCurrentPage] = useState(1)
  const [sortColumn, setSortColumn] = useState(null)
  const [sortDirection, setSortDirection] = useState("asc")
  const [searchTerm, setSearchTerm] = useState("")

  // Theme
  const headerBg = theme.headerBg || "#FAFAFA"
  const headerText = theme.headerText || "#1A1A1A"
  const rowBg = theme.rowBg || "#fff"
  const rowHoverBg = theme.rowHoverBg || "#FAFAFA"
  const rowText = theme.rowText || "#4A4A4A"
  const borderColor = theme.borderColor || "#F5F5F5"
  const accentColor = theme.accentColor || "#020DF9"
  const mutedText = theme.mutedText || "#9B9B9B"

  // Sort
  const handleSort = useCallback(
    (colName) => {
      if (sortColumn === colName) {
        setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"))
      } else {
        setSortColumn(colName)
        setSortDirection("asc")
      }
      setCurrentPage(1)
    },
    [sortColumn],
  )

  // Filter + Sort + Paginate
  const processedData = useMemo(() => {
    let result = [...data]

    // Search
    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase()
      const cols = searchColumns || columns.map((c) => c.name)
      result = result.filter((row) =>
        cols.some((col) => {
          const val = row[col]
          if (val == null) return false
          return String(val).toLowerCase().includes(term)
        }),
      )
    }

    // Sort
    if (sortColumn) {
      result.sort((a, b) => {
        const aVal = a[sortColumn] ?? ""
        const bVal = b[sortColumn] ?? ""

        if (typeof aVal === "number" && typeof bVal === "number") {
          return sortDirection === "asc" ? aVal - bVal : bVal - aVal
        }

        const aStr = String(aVal).toLowerCase()
        const bStr = String(bVal).toLowerCase()
        if (aStr < bStr) return sortDirection === "asc" ? -1 : 1
        if (aStr > bStr) return sortDirection === "asc" ? 1 : -1
        return 0
      })
    }

    return result
  }, [data, searchTerm, sortColumn, sortDirection, columns, searchColumns])

  const totalItems = processedData.length
  const totalPages = Math.ceil(totalItems / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedData = processedData.slice(startIndex, startIndex + itemsPerPage)

  // Reset page when search changes
  const handleSearch = (e) => {
    setSearchTerm(e.target.value)
    setCurrentPage(1)
  }

  // Loading
  if (loading) {
    return (
      <div className="flex h-full w-full flex-col">
        <div className="flex-1">
          <div className="animate-pulse space-y-3 p-4">
            <div className="h-10 rounded bg-gray-100" />
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="h-12 rounded bg-gray-50" />
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex h-full w-full flex-col">
      {/* Search — top aligned, full width */}
      {searchable && (
        <div className="w-full px-4 py-3" style={{ borderBottom: `1px solid ${borderColor}` }}>
          <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <MagnifyingGlassIcon className="h-4 w-4" style={{ color: mutedText }} />
            </div>
            <input
              type="text"
              value={searchTerm}
              onChange={handleSearch}
              placeholder={searchPlaceholder}
              className="block w-full rounded-lg border py-2 pl-9 pr-3 text-sm transition-colors focus:outline-none focus:ring-1"
              style={{
                borderColor,
                color: rowText,
                backgroundColor: rowBg,
              }}
              onFocus={(e) => {
                e.target.style.borderColor = accentColor
                e.target.style.boxShadow = `0 0 0 1px ${accentColor}`
              }}
              onBlur={(e) => {
                e.target.style.borderColor = borderColor
                e.target.style.boxShadow = "none"
              }}
            />
          </div>
        </div>
      )}

      {/* Table — fills remaining space */}
      <div className="flex-1 overflow-auto">
        <table className="w-full">
          <thead className="sticky top-0 z-10" style={{ backgroundColor: headerBg }}>
            <tr style={{ borderBottom: `1px solid ${borderColor}` }}>
              {columns.map((col) => (
                <th
                  key={col.name}
                  onClick={col.sortable !== false ? () => handleSort(col.name) : undefined}
                  className={`px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider ${
                    col.sortable !== false ? "cursor-pointer select-none" : ""
                  }`}
                  style={{
                    color: headerText,
                    width: col.width || "auto",
                  }}
                >
                  <span className="inline-flex items-center gap-1">
                    {col.title}
                    {col.sortable !== false && (
                      <span style={{ color: sortColumn === col.name ? accentColor : mutedText }}>
                        {sortColumn === col.name ? (
                          sortDirection === "asc" ? (
                            <ChevronUpIcon className="h-3 w-3" />
                          ) : (
                            <ChevronDownIcon className="h-3 w-3" />
                          )
                        ) : (
                          <ChevronUpDownIcon className="h-3 w-3" />
                        )}
                      </span>
                    )}
                  </span>
                </th>
              ))}
              {actions.length > 0 && (
                <th
                  className="px-4 py-3 text-right text-xs font-semibold uppercase tracking-wider"
                  style={{ color: headerText, width: `${actions.length * 40 + 16}px` }}
                >
                  Actions
                </th>
              )}
            </tr>
          </thead>
          <tbody>
            {paginatedData.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length + (actions.length > 0 ? 1 : 0)}
                  className="px-4 py-16 text-center text-sm"
                  style={{ color: mutedText }}
                >
                  {searchTerm ? `No results for "${searchTerm}"` : emptyMessage}
                </td>
              </tr>
            ) : (
              paginatedData.map((row, rowIndex) => (
                <tr
                  key={row.id || rowIndex}
                  onClick={onRowClick ? () => onRowClick(row) : undefined}
                  className={`transition-colors ${onRowClick ? "cursor-pointer" : ""}`}
                  style={{
                    backgroundColor: rowBg,
                    borderBottom: `1px solid ${borderColor}`,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = rowHoverBg
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = rowBg
                  }}
                >
                  {columns.map((col) => (
                    <td
                      key={col.name}
                      className="whitespace-nowrap px-4 py-3 text-sm"
                      style={{ color: rowText }}
                    >
                      {col.render ? col.render(row[col.name], row) : row[col.name] ?? "—"}
                    </td>
                  ))}
                  {actions.length > 0 && (
                    <td className="whitespace-nowrap px-4 py-3 text-right">
                      <div className="inline-flex items-center gap-1">
                        {actions.map((action, actionIndex) => (
                          <button
                            key={actionIndex}
                            onClick={(e) => {
                              e.stopPropagation()
                              action.onClick(row)
                            }}
                            title={action.title || ""}
                            className="rounded-md p-1.5 transition-colors"
                            style={{ color: mutedText }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.color = accentColor
                              e.currentTarget.style.backgroundColor = headerBg
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.color = mutedText
                              e.currentTarget.style.backgroundColor = "transparent"
                            }}
                          >
                            {action.icon}
                          </button>
                        ))}
                      </div>
                    </td>
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination — bottom aligned, full width */}
      <Pagination
        currentPage={currentPage}
        totalItems={totalItems}
        itemsPerPage={itemsPerPage}
        onPageChange={setCurrentPage}
        theme={theme}
      />
    </div>
  )
}
