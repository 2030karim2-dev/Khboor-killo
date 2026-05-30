"use client";

import { ShoppingCart, Package, Users, Calendar } from "lucide-react";

interface ReportFiltersProps {
  reportType: "sales" | "products" | "users";
  dateRange: "week" | "month" | "year";
  onReportTypeChange: (type: "sales" | "products" | "users") => void;
  onDateRangeChange: (range: "week" | "month" | "year") => void;
}

export default function ReportFilters({
  reportType,
  dateRange,
  onReportTypeChange,
  onDateRangeChange,
}: ReportFiltersProps) {
  return (
    <div className="flex flex-wrap gap-4">
      <div className="flex gap-2">
        {(["sales", "products", "users"] as const).map((type) => (
          <ReportTypeButton
            key={type}
            type={type}
            isActive={reportType === type}
            onClick={() => onReportTypeChange(type)}
          />
        ))}
      </div>
      <div className="flex gap-2">
        {(["week", "month", "year"] as const).map((range) => (
          <DateRangeButton
            key={range}
            range={range}
            isActive={dateRange === range}
            onClick={() => onDateRangeChange(range)}
          />
        ))}
      </div>
    </div>
  );
}

function ReportTypeButton({
  type,
  isActive,
  onClick,
}: {
  type: "sales" | "products" | "users";
  isActive: boolean;
  onClick: () => void;
}) {
  const icons = {
    sales: ShoppingCart,
    products: Package,
    users: Users,
  };

  const labels = {
    sales: "المبيعات",
    products: "المنتجات",
    users: "المستخدمين",
  };

  const Icon = icons[type];

  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
        isActive
          ? "bg-sky-500 text-white"
          : "bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600"
      }`}
    >
      <Icon size={16} className="inline ml-2" />
      {labels[type]}
    </button>
  );
}

function DateRangeButton({
  range,
  isActive,
  onClick,
}: {
  range: "week" | "month" | "year";
  isActive: boolean;
  onClick: () => void;
}) {
  const labels = {
    week: "أسبوع",
    month: "شهر",
    year: "سنة",
  };

  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors flex items-center gap-2 ${
        isActive
          ? "bg-slate-800 dark:bg-slate-200 text-white dark:text-slate-800"
          : "bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300"
      }`}
    >
      <Calendar size={14} />
      {labels[range]}
    </button>
  );
}