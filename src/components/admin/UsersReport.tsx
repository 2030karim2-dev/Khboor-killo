"use client";

import { User } from "@/types/user";

interface UsersReportProps {
  userData: {
    total: number;
    active: number;
    pending: number;
    buyers: number;
    sellers: number;
  };
}

export default function UsersReport({ userData }: UsersReportProps) {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCardItem label="إجمالي المستخدمين" value={userData.total} />
        <StatCardItem label="نشط" value={userData.active} color="emerald" />
        <StatCardItem label="مشترين" value={userData.buyers} color="sky" />
        <StatCardItem label="بائعين" value={userData.sellers} color="purple" />
      </div>
    </div>
  );
}

function StatCardItem({
  label,
  value,
  color,
}: {
  label: string;
  value: number;
  color?: "emerald" | "sky" | "purple" | "red" | "amber";
}) {
  const colorClasses = {
    emerald: "text-emerald-600",
    sky: "text-sky-600",
    purple: "text-purple-600",
    red: "text-red-600",
    amber: "text-amber-500",
    default: "text-slate-800 dark:text-white",
  };

  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl p-5 border border-slate-200 dark:border-slate-700">
      <p className="text-sm text-slate-500 mb-1">{label}</p>
      <p className={`text-2xl font-extrabold ${color ? colorClasses[color] : colorClasses.default}`}>
        {value}
      </p>
    </div>
  );
}