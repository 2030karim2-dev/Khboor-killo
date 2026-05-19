"use client";

import { ExternalLink } from "lucide-react";

interface PageHeaderProps {
  title: string;
  description?: string;
  action?: React.ReactNode;
  backHref?: string;
}

export function PageHeader({
  title,
  description,
  action,
  backHref,
}: PageHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 md:mb-6">
      <div>
        {backHref && (
          <a
            href={backHref}
            className="inline-flex items-center gap-1 text-xs md:text-sm text-slate-500 hover:text-sky-600 mb-1"
          >
            <ExternalLink size={12} className="rotate-180" />
            <span>عودة</span>
          </a>
        )}
        <h1 className="text-xl md:text-2xl font-extrabold text-slate-800 dark:text-white">
          {title}
        </h1>
        {description && (
          <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400 mt-1">
            {description}
          </p>
        )}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}