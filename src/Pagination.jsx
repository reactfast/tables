"use client"

import { ChevronLeftIcon, ChevronRightIcon } from "./icons"

export function Pagination({
  currentPage,
  totalItems,
  itemsPerPage,
  onPageChange,
  theme = {},
}) {
  const totalPages = Math.ceil(totalItems / itemsPerPage)
  if (totalPages <= 1) return null

  const start = (currentPage - 1) * itemsPerPage + 1
  const end = Math.min(currentPage * itemsPerPage, totalItems)

  const activeBg = theme.activeBg || "#020DF9"
  const activeText = theme.activeText || "#fff"
  const textColor = theme.text || "#4A4A4A"
  const mutedColor = theme.muted || "#9B9B9B"
  const borderColor = theme.border || "#E8E8E8"

  // Build page numbers with ellipsis
  const getPages = () => {
    const pages = []
    const delta = 1

    for (let i = 1; i <= totalPages; i++) {
      if (
        i === 1 ||
        i === totalPages ||
        (i >= currentPage - delta && i <= currentPage + delta)
      ) {
        pages.push(i)
      } else if (pages[pages.length - 1] !== "...") {
        pages.push("...")
      }
    }
    return pages
  }

  return (
    <div
      className="flex w-full items-center justify-between px-4 py-3"
      style={{ borderTop: `1px solid ${borderColor}` }}
    >
      <p className="text-sm" style={{ color: mutedColor }}>
        {start}–{end} of {totalItems}
      </p>

      <div className="flex items-center gap-1">
        <button
          onClick={() => onPageChange(Math.max(1, currentPage - 1))}
          disabled={currentPage === 1}
          className="rounded-md p-1.5 transition-colors disabled:opacity-30"
          style={{ color: textColor }}
        >
          <ChevronLeftIcon />
        </button>

        {getPages().map((page, i) =>
          page === "..." ? (
            <span key={`ellipsis-${i}`} className="px-1 text-sm" style={{ color: mutedColor }}>
              ...
            </span>
          ) : (
            <button
              key={page}
              onClick={() => onPageChange(page)}
              className="min-w-[32px] rounded-md px-2 py-1 text-sm font-medium transition-colors"
              style={{
                backgroundColor: page === currentPage ? activeBg : "transparent",
                color: page === currentPage ? activeText : textColor,
              }}
            >
              {page}
            </button>
          ),
        )}

        <button
          onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
          disabled={currentPage === totalPages}
          className="rounded-md p-1.5 transition-colors disabled:opacity-30"
          style={{ color: textColor }}
        >
          <ChevronRightIcon />
        </button>
      </div>
    </div>
  )
}
