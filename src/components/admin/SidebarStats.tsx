"use client";

import { TrendingUp, ShoppingCart, DollarSign, UserPlus } from "lucide-react";

interface SidebarStatsProps {
  todayOrders: number;
  pendingOrders: number;
  revenue: number;
  newUsers: number;
}

export default function SidebarStats({
  todayOrders,
  pendingOrders,
  revenue,
  newUsers,
}: SidebarStatsProps) {
  return (
    <div className="p-3 border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50">
      <div className="grid grid-cols-2 gap-2">
        <StatItem
          label="اليوم"
          value={todayOrders}
          icon={<TrendingUp size={10} className="text-emerald-500" />}
        />
        <StatItem
          label="معلق"
          value={pendingOrders}
          icon={<ShoppingCart size={10} className="text-amber-500" />}
        />
        <StatItem
          label="الإيرادات"
          value={`${(revenue / 1000).toFixed(1)}k`}
          icon={<DollarSign size={10} className="text-sky-500" />}
        />
        <StatItem
          label="جديد"
          value={newUsers}
          icon={<UserPlus size={10} className="text-purple-500" />}
        />
      </div>
    </div>
  );
}

interface StatItemProps {
  label: string;
  value: string | number;
  icon: React.ReactNode;
}

function StatItem({ label, value, icon }: StatItemProps) {
  return (
    <div className="p-2 rounded-lg bg-white dark:bg-slate-700">
      <div className="flex items-center gap-1 text-[10px] text-slate-500">
        {icon}
        <span>{label}</span>
      </div>
      <p className="text-lg font-bold text-slate-800 dark:text-white">{value}</p>
    </div>
  );
}