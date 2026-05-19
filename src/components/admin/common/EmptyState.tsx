"use client";

import { FileX } from "lucide-react";

interface EmptyStateProps {
  title?: string;
  description?: string;
  icon?: React.ReactNode;
  action?: React.ReactNode;
}

export function EmptyState({
  title = "لا توجد بيانات",
  description = "لم يتم العثور على أي سجلات",
  icon,
  action,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
      <div className="w-16 h-16 rounded-full bg-slate-100 dark:bg-slate-700 flex items-center justify-center mb-4">
        {icon || <FileX size={32} className="text-slate-400" />}
      </div>
      <h3 className="text-lg font-medium text-slate-800 dark:text-white mb-2">{title}</h3>
      <p className="text-sm text-slate-500 dark:text-slate-400 mb-4 max-w-sm">{description}</p>
      {action}
    </div>
  );
}