"use client";

import Link from "next/link";
import { ChevronRight, ChevronDown, LayoutDashboard } from "lucide-react";
import { type AdminNavItem } from "./constants";

interface SidebarSectionProps {
  title: string;
  icon: typeof LayoutDashboard;
  items: AdminNavItem[];
  isCollapsed: boolean;
  hasActiveItem: boolean;
  badge?: number;
  onToggle: () => void;
  isActive: (href: string, exact?: boolean) => boolean;
  badges?: Record<string, number>;
}

export default function SidebarSection({
  title,
  icon: Icon,
  items,
  isCollapsed,
  hasActiveItem,
  onToggle,
  isActive,
  badges,
}: SidebarSectionProps) {
  return (
    <div>
      <button
        onClick={onToggle}
        className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
          hasActiveItem
            ? "text-sky-600 dark:text-sky-400 bg-sky-50 dark:bg-sky-900/20"
            : "text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300"
        }`}
      >
        <Icon size={14} />
        <span className="flex-1 text-right">{title}</span>
        {items.length > 1 && (
          <ChevronDown
            size={12}
            className={`transition-transform ${isCollapsed ? "-rotate-90" : ""}`}
          />
        )}
      </button>

      {!isCollapsed && (
        <div className="mr-2 space-y-1 border-s border-slate-100 dark:border-slate-700 pr-2">
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${
                isActive(item.href, item.exact)
                  ? "bg-sky-50 dark:bg-sky-900/30 text-sky-600 font-medium"
                  : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700"
              }`}
            >
              <item.icon size={16} />
              <span className="flex-1">{item.label}</span>
              {badges?.[item.href] && badges[item.href] > 0 && (
                <span className="bg-red-500 text-white text-[10px] px-1.5 py-0.5 rounded-full font-bold">
                  {badges[item.href]}
                </span>
              )}
              {isActive(item.href, item.exact) && (
                <ChevronRight size={14} className="text-sky-400" />
              )}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}