"use client";

import { DashboardStats, DashboardAlerts, DashboardRecentOrders, DashboardTopProducts } from "@/components/admin/DashboardComponents";

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-extrabold text-slate-800 dark:text-white">لوحة التحكم</h1>
        <p className="text-sm text-slate-500">مرحباً بك في لوحة تحكم خبور</p>
      </div>
      <DashboardStats />
      <DashboardAlerts />
      <div className="grid lg:grid-cols-3 gap-6">
        <DashboardRecentOrders />
        <DashboardTopProducts />
      </div>
    </div>
  );
}
