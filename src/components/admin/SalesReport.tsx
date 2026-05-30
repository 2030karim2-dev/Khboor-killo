"use client";

import { AdminOrder } from "@/types/admin";
import { orderStatusLabels, orderStatusColors, type OrderStatus } from "./constants";

interface SalesReportProps {
  orders: AdminOrder[];
  salesData: {
    total: number;
    delivered: number;
    pending: number;
    cancelled: number;
    count: number;
  };
}

export default function SalesReport({ orders, salesData }: SalesReportProps) {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCardItem
          label="إجمالي المبيعات"
          value={salesData.total}
          color="slate"
          icon={<div className="text-emerald-500"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="19" x2="12" y2="5"/><polyline points="5 12 12 5 19 12"/></svg></div>}
          subLabel="ريال يمني"
        />
        <StatCardItem
          label="الطلبات المكتملة"
          value={salesData.delivered}
          color="emerald"
          subLabel="طلب"
        />
        <StatCardItem
          label="طلبات معلقة"
          value={salesData.pending}
          color="amber"
          subLabel="طلب"
        />
        <StatCardItem
          label="طلبات ملغاة"
          value={salesData.cancelled}
          color="red"
          subLabel="طلب"
        />
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden">
        <div className="p-4 border-b border-slate-200 dark:border-slate-700">
          <h2 className="font-bold text-slate-800 dark:text-white">تفاصيل المبيعات</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-xs text-slate-500 text-right border-b border-slate-100 dark:border-slate-700">
                <th className="px-4 py-3 font-medium">#</th>
                <th className="px-4 py-3 font-medium">الطلب</th>
                <th className="px-4 py-3 font-medium">العميل</th>
                <th className="px-4 py-3 font-medium">المدينة</th>
                <th className="px-4 py-3 font-medium">المبلغ</th>
                <th className="px-4 py-3 font-medium">الحالة</th>
                <th className="px-4 py-3 font-medium">التاريخ</th>
              </tr>
            </thead>
            <tbody>
              {orders.slice(0, 20).map((order, i) => (
                <tr key={order.id} className="border-b border-slate-50 dark:border-slate-700/50 hover:bg-slate-50 dark:hover:bg-slate-700/30">
                  <td className="px-4 py-3 text-xs text-slate-400">{i + 1}</td>
                  <td className="px-4 py-3 text-sm font-medium text-sky-600">{order.id}</td>
                  <td className="px-4 py-3 text-sm text-slate-700 dark:text-slate-300">{order.customer}</td>
                  <td className="px-4 py-3 text-sm text-slate-500">{order.city}</td>
                  <td className="px-4 py-3 text-sm font-bold text-slate-800 dark:text-white">{order.total.toLocaleString("en")}</td>
                  <td className="px-4 py-3">
                    <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${orderStatusColors[order.status as OrderStatus]}`}>
                      {orderStatusLabels[order.status as OrderStatus]}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-xs text-slate-400">{order.createdAt.split("T")[0]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

interface StatCardItemProps {
  label: string;
  value: number;
  color?: "emerald" | "sky" | "purple" | "red" | "amber" | "slate";
  icon?: React.ReactNode;
  subLabel?: string;
}

function StatCardItem({ label, value, color = "slate", icon, subLabel }: StatCardItemProps) {
  const colorClasses = {
    emerald: "text-emerald-600",
    sky: "text-sky-600",
    purple: "text-purple-600",
    red: "text-red-600",
    amber: "text-amber-500",
    slate: "text-slate-800 dark:text-white",
  };

  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl p-5 border border-slate-200 dark:border-slate-700">
      <div className="flex items-center justify-between mb-3">
        <span className="text-sm text-slate-500">{label}</span>
        {icon}
      </div>
      <p className={`text-2xl font-extrabold ${colorClasses[color]}`}>
        {value.toLocaleString("en")}
      </p>
      {subLabel && <span className="text-xs text-slate-400">{subLabel}</span>}
    </div>
  );
}