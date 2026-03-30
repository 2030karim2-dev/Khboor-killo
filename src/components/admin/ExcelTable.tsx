"use client";

import { useState, useRef, useCallback, useMemo } from "react";
import { ChevronDown, ChevronUp, ChevronsUpDown, Search, ChevronLeft, ChevronRight } from "lucide-react";

export interface Column<T> {
  key: string;
  header: string;
  width?: number;
  minWidth?: number;
  maxWidth?: number;
  sortable?: boolean;
  render?: (value: unknown, row: T, index: number) => React.ReactNode;
  align?: "right" | "center" | "left";
}

interface ExcelTableProps<T> {
  columns: Column<T>[];
  data: T[];
  pageSize?: number;
  searchable?: boolean;
  searchPlaceholder?: string;
  onRowClick?: (row: T) => void;
  getRowId: (row: T) => string;
  emptyMessage?: string;
  className?: string;
}

type SortDir = "asc" | "desc" | null;

export default function ExcelTable<T>({
  columns,
  data,
  pageSize = 10,
  searchable = true,
  searchPlaceholder = "بحث...",
  onRowClick,
  getRowId,
  emptyMessage = "لا توجد بيانات",
  className = "",
}: ExcelTableProps<T>) {
  const [search, setSearch] = useState("");
  const [sortKey, setSortKey] = useState<string | null>(null);
  const [sortDir, setSortDir] = useState<SortDir>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [colWidths, setColWidths] = useState<Record<string, number>>(() => {
    const widths: Record<string, number> = {};
    columns.forEach((c) => {
      widths[c.key] = c.width || 150;
    });
    return widths;
  });
  const resizingRef = useRef<{ key: string; startX: number; startWidth: number } | null>(null);

  // Filter
  const filtered = useMemo(() => {
    if (!search.trim()) return data;
    const q = search.toLowerCase();
    return data.filter((row) =>
      columns.some((col) => {
        const val = (row as Record<string, unknown>)[col.key];
        return String(val ?? "").toLowerCase().includes(q);
      })
    );
  }, [data, search, columns]);

  // Sort
  const sorted = useMemo(() => {
    if (!sortKey || !sortDir) return filtered;
    return [...filtered].sort((a, b) => {
      const aVal = (a as Record<string, unknown>)[sortKey];
      const bVal = (b as Record<string, unknown>)[sortKey];
      if (aVal == null && bVal == null) return 0;
      if (aVal == null) return 1;
      if (bVal == null) return -1;
      const cmp = String(aVal).localeCompare(String(bVal), "ar", { numeric: true });
      return sortDir === "asc" ? cmp : -cmp;
    });
  }, [filtered, sortKey, sortDir]);

  // Pagination
  const totalPages = Math.max(1, Math.ceil(sorted.length / pageSize));
  const paginated = sorted.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const handleSort = (key: string) => {
    if (sortKey === key) {
      if (sortDir === "asc") setSortDir("desc");
      else if (sortDir === "desc") { setSortKey(null); setSortDir(null); }
    } else {
      setSortKey(key);
      setSortDir("asc");
    }
    setCurrentPage(1);
  };

  const SortIcon = ({ colKey }: { colKey: string }) => {
    if (sortKey !== colKey) return <ChevronsUpDown size={12} className="text-slate-300" />;
    if (sortDir === "asc") return <ChevronUp size={12} className="text-sky-600" />;
    return <ChevronDown size={12} className="text-sky-600" />;
  };

  // Resize
  const handleResizeStart = useCallback((e: React.MouseEvent, key: string) => {
    e.preventDefault();
    resizingRef.current = { key, startX: e.clientX, startWidth: colWidths[key] };
    const handleMove = (ev: MouseEvent) => {
      if (!resizingRef.current) return;
      const diff = ev.clientX - resizingRef.current.startX;
      const col = columns.find((c) => c.key === resizingRef.current!.key);
      const newWidth = Math.max(col?.minWidth || 80, Math.min(col?.maxWidth || 500, resizingRef.current.startWidth + diff));
      setColWidths((prev) => ({ ...prev, [resizingRef.current!.key]: newWidth }));
    };
    const handleUp = () => {
      resizingRef.current = null;
      document.removeEventListener("mousemove", handleMove);
      document.removeEventListener("mouseup", handleUp);
    };
    document.addEventListener("mousemove", handleMove);
    document.addEventListener("mouseup", handleUp);
  }, [colWidths, columns]);

  return (
    <div className={`bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden ${className}`}>
      {/* Search */}
      {searchable && (
        <div className="p-3 border-b border-slate-200 dark:border-slate-700">
          <div className="relative max-w-xs">
            <Search size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="search"
              value={search}
              onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }}
              placeholder={searchPlaceholder}
              className="w-full py-2 pr-9 pl-3 rounded-lg border border-slate-200 dark:border-slate-600 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 bg-transparent"
            />
          </div>
        </div>
      )}

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse" style={{ minWidth: columns.reduce((s, c) => s + (colWidths[c.key] || 150), 0) }}>
          <thead>
            <tr className="bg-slate-50 dark:bg-slate-700/50">
              {/* Row number column */}
              <th className="w-10 px-2 py-2.5 text-[10px] font-bold text-slate-400 text-center border-b border-slate-200 dark:border-slate-600 select-none bg-slate-100 dark:bg-slate-700">
                #
              </th>
              {columns.map((col) => (
                <th
                  key={col.key}
                  className="relative px-3 py-2.5 text-[11px] font-bold text-slate-600 dark:text-slate-300 border-b border-l border-slate-200 dark:border-slate-600 select-none whitespace-nowrap"
                  style={{ width: colWidths[col.key], minWidth: col.minWidth || 80, textAlign: col.align || "right" }}
                >
                  {col.sortable !== false ? (
                    <button
                      onClick={() => handleSort(col.key)}
                      className="flex items-center gap-1 w-full justify-center hover:text-sky-600 transition-colors"
                    >
                      <span>{col.header}</span>
                      <SortIcon colKey={col.key} />
                    </button>
                  ) : (
                    <span>{col.header}</span>
                  )}
                  {/* Resize handle */}
                  <div
                    className="absolute top-0 left-0 w-1 h-full cursor-col-resize hover:bg-sky-400/50 active:bg-sky-500 transition-colors"
                    onMouseDown={(e) => handleResizeStart(e, col.key)}
                  />
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paginated.length === 0 ? (
              <tr>
                <td colSpan={columns.length + 1} className="px-4 py-12 text-center text-slate-400 text-sm">
                  {emptyMessage}
                </td>
              </tr>
            ) : (
              paginated.map((row, rowIdx) => {
                const rowNum = (currentPage - 1) * pageSize + rowIdx + 1;
                return (
                  <tr
                    key={getRowId(row)}
                    onClick={() => onRowClick?.(row)}
                    className={`border-b border-slate-100 dark:border-slate-700/50 transition-colors ${
                      onRowClick ? "cursor-pointer hover:bg-sky-50/50 dark:hover:bg-sky-900/20" : "hover:bg-slate-50 dark:hover:bg-slate-700/30"
                    }`}
                  >
                    <td className="w-10 px-2 py-2 text-[10px] text-slate-400 text-center border-l border-slate-100 dark:border-slate-700/50 bg-slate-50/50 dark:bg-slate-700/20 font-mono">
                      {rowNum}
                    </td>
                    {columns.map((col) => {
                      const val = (row as Record<string, unknown>)[col.key];
                      return (
                        <td
                          key={col.key}
                          className="px-3 py-2 text-sm text-slate-700 dark:text-slate-300 border-l border-slate-100 dark:border-slate-700/50 whitespace-nowrap"
                          style={{ width: colWidths[col.key], textAlign: col.align || "right" }}
                        >
                          {col.render ? col.render(val, row, rowIdx) : (String(val ?? ""))}
                        </td>
                      );
                    })}
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between px-4 py-2.5 border-t border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-700/30">
        <p className="text-xs text-slate-500">
          عرض {paginated.length} من {sorted.length} سجل
        </p>
        <div className="flex items-center gap-1">
          <button
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="p-1.5 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-600 disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <ChevronRight size={16} />
          </button>
          {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
            let page: number;
            if (totalPages <= 5) page = i + 1;
            else if (currentPage <= 3) page = i + 1;
            else if (currentPage >= totalPages - 2) page = totalPages - 4 + i;
            else page = currentPage - 2 + i;
            return (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`w-7 h-7 rounded-lg text-xs font-medium transition-colors ${
                  currentPage === page
                    ? "bg-sky-500 text-white"
                    : "hover:bg-slate-200 dark:hover:bg-slate-600 text-slate-600 dark:text-slate-400"
                }`}
              >
                {page}
              </button>
            );
          })}
          <button
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="p-1.5 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-600 disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <ChevronLeft size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
