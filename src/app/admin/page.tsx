"use client";

import Link from "next/link";
import { useAdmin } from "@/lib/AdminContext";
import {
  ShoppingCart, Package, Users, DollarSign,
  TrendingUp, ArrowUpRight, Clock, AlertTriangle,
} from "lucide-react";

export default function AdminDashboard() {
  const { getStats, orders, products } = useAdmin();
  const stats = getStats();

  const recentOrders = orders.slice(0, 5);
  const topProducts = products
    .filter((p) => p.featured)
    .slice(0, 5)
    .map((p) => ({ name: p.name, sales: p.reviews, revenue: `${(p.price * p.reviews).toLocaleString()} ر.س` }));

  const statusColors: Record<string, string> = {
    pending: "bg-amber-50 text-amber-600",
    confirmed: "bg-sky-50 text-sky-600",
    processing: "bg-purple-50 text-purple-600",
    shipped: "bg-indigo-50 text-indigo-600",
    delivered: "bg-emerald-50 text-emerald-600",
    cancelled: "bg-red-50 text-red-600",
  };

  const statusLabels: Record<string, string> = {
    pending: "جديد",
    confirmed: "مؤكد",
    processing: "قيد التجهيز",
    shipped: "قيد الشحن",
    delivered: "مكتمل",
    cancelled: "ملغي",
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-extrabold text-slate-800 dark:text-white">لوحة التحكم</h1>
        <p className="text-sm text-slate-500">مرحباً بك في لوحة تحكم خبور</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { title: "إجمالي المبيعات", value: `${stats.totalSales.toLocaleString()} ر.س`, icon: DollarSign, color: "bg-emerald-50 text-emerald-600" },
          { title: "الطلبات", value: stats.totalOrders.toString(), icon: ShoppingCart, color: "bg-sky-50 text-sky-600" },
          { title: "المنتجات", value: stats.totalProducts.toString(), icon: Package, color: "bg-purple-50 text-purple-600" },
          { title: "المستخدمين", value: stats.totalUsers.toString(), icon: Users, color: "bg-orange-50 text-orange-600" },
        ].map((stat) => (
          <div key={stat.title} className="bg-white dark:bg-slate-800 rounded-xl p-4 border border-slate-200 dark:border-slate-700">
            <div className="flex items-center justify-between mb-3">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${stat.color}`}>
                <stat.icon size={20} />
              </div>
              <div className="flex items-center gap-0.5 text-xs font-medium text-emerald-600">
                <ArrowUpRight size={14} /> +12%
              </div>
            </div>
            <p className="text-2xl font-extrabold text-slate-800 dark:text-white">{stat.value}</p>
            <p className="text-xs text-slate-500">{stat.title}</p>
          </div>
        ))}
      </div>

      {/* Alerts */}
      {(stats.pendingOrders > 0 || stats.lowStockProducts > 0) && (
        <div className="flex flex-wrap gap-3">
          {stats.pendingOrders > 0 && (
            <div className="flex items-center gap-2 px-4 py-2.5 bg-amber-50 dark:bg-amber-900/20 rounded-xl text-amber-700 dark:text-amber-400 text-sm">
              <Clock size={16} /> <span>{stats.pendingOrders} طلب في الانتظار</span>
            </div>
          )}
          {stats.lowStockProducts > 0 && (
            <div className="flex items-center gap-2 px-4 py-2.5 bg-red-50 dark:bg-red-900/20 rounded-xl text-red-700 dark:text-red-400 text-sm">
              <AlertTriangle size={16} /> <span>{stats.lowStockProducts} منتج نفد مخزونه</span>
            </div>
          )}
        </div>
      )}

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Recent Orders */}
        <div className="lg:col-span-2 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
          <div className="p-4 border-b border-slate-200 dark:border-slate-700 flex items-center justify-between">
            <h2 className="font-bold text-slate-800 dark:text-white">آخر الطلبات</h2>
            <Link href="/admin/orders" className="text-xs text-sky-600 hover:text-sky-700">عرض الكل</Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-xs text-slate-500 text-right border-b border-slate-100 dark:border-slate-700">
                  <th className="px-4 py-3 font-medium">#</th>
                  <th className="px-4 py-3 font-medium">الطلب</th>
                  <th className="px-4 py-3 font-medium">العميل</th>
                  <th className="px-4 py-3 font-medium">المبلغ</th>
                  <th className="px-4 py-3 font-medium">الحالة</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map((order, i) => (
                  <tr key={order.id} className="border-b border-slate-50 dark:border-slate-700/50 hover:bg-slate-50 dark:hover:bg-slate-700/30">
                    <td className="px-4 py-3 text-xs text-slate-400 font-mono">{i + 1}</td>
                    <td className="px-4 py-3 text-sm font-medium text-sky-600">{order.id}</td>
                    <td className="px-4 py-3 text-sm text-slate-700 dark:text-slate-300">{order.customer}</td>
                    <td className="px-4 py-3 text-sm font-bold text-slate-800 dark:text-white">{order.total.toLocaleString()} ر.س</td>
                    <td className="px-4 py-3">
                      <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${statusColors[order.status]}`}>
                        {statusLabels[order.status]}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Top Products */}
        <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
          <div className="p-4 border-b border-slate-200 dark:border-slate-700 flex items-center justify-between">
            <h2 className="font-bold text-slate-800 dark:text-white">الأكثر مبيعاً</h2>
            <TrendingUp size={16} className="text-emerald-500" />
          </div>
          <div className="p-4 space-y-3">
            {topProducts.map((product, i) => (
              <div key={product.name} className="flex items-center gap-3">
                <span className="w-6 h-6 rounded-full bg-slate-100 dark:bg-slate-700 flex items-center justify-center text-xs font-bold text-slate-500">{i + 1}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-slate-800 dark:text-white truncate">{product.name}</p>
                  <p className="text-xs text-slate-500">{product.sales} مبيعة</p>
                </div>
                <p className="text-sm font-bold text-emerald-600 shrink-0">{product.revenue}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
