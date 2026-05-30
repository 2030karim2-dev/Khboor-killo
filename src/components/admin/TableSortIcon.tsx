"use client";

import { ChevronDown, ChevronUp, ChevronsUpDown } from "lucide-react";

interface SortIconProps {
  colKey: string;
  sortKey: string | null;
  sortDir: "asc" | "desc" | null;
}

export function SortIcon({ colKey, sortKey, sortDir }: SortIconProps) {
  if (sortKey !== colKey) return <ChevronsUpDown size={12} className="text-slate-300" />;
  if (sortDir === "asc") return <ChevronUp size={12} className="text-sky-600" />;
  return <ChevronDown size={12} className="text-sky-600" />;
}