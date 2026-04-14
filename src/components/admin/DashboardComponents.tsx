"use client";

import Link from "next/link";
import { ShoppingCart, Package, Users, DollarSign, ArrowUpRight, ArrowDownRight, Clock, AlertTriangle, TrendingUp, Activity } from "lucide-react";
import { useAdmin } from "@/lib/AdminContext";
import { orderStatusLabels, orderStatusColors, type OrderStatus } from "@/components/admin/constants";

export function DashboardStats() {
  const { orders, products, users } = useAdmin();
  const totalSales = orders.filter((o) => o.status === "delivered").reduce((s, o) => s + o.total + o.shippingCost, 0);
  const pendingOrders = orders.filter((o) => o.status === "pending" || o.status === "confirmed").length;
  const lowStock = products.filter((p) => !p.inStock).length;

  const stats = [
    { title: "إجمالي المبيعات", value: `${totalSales.toLocaleString("en")} ر.ي`, icon: DollarSign, color: "bg-emerald-50 text-emerald-600", change: orders.filter((o) => o.status === "delivered").length },
    { title: "الطلبات", value: orders.length.toString(), icon: ShoppingCart, color: "bg-sky-50 text-sky-600", change: pendingOrders },
    { title: "المنتجات", value: products.length.toString(), icon: Package, color: "bg-purple-50 text-purple-600", change: lowStock },
    { title: "المستخدمين", value: users.length.toString(), icon: Users, color: "bg-orange-50 text-orange-600", change: users.filter((u) => u.status === "pending").length },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat) => (
        <div key={stat.title} className="bg-white dark:bg-slate-800 rounded-xl p-4 border border-slate-200 dark:border-slate-700">
          <div className="flex items-center justify-between mb-3">
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${stat.color}`}><stat.icon size={20} /></div>
            {stat.change > 0 && (
              <div className="flex items-center gap-0.5 text-xs font-medium text-amber-600"><AlertTriangle size={12} /> {stat.change}</div>
            )}
          </div>
          <p className="text-2xl font-extrabold text-slate-800 dark:text-white">{stat.value}</p>
          <p className="text-xs text-slate-500">{stat.title}</p>
        </div>
      ))}
    </div>
  );
}

export function DashboardAlerts() {
  const { orders, products } = useAdmin();
  const pendingOrders = orders.filter((o) => o.status === "pending" || o.status === "confirmed").length;
  const lowStock = products.filter((p) => !p.inStock).length;
  if (!pendingOrders && !lowStock) return null;
  return (
    <div className="flex flex-wrap gap-3">
      {pendingOrders > 0 && <div className="flex items-center gap-2 px-4 py-2.5 bg-amber-50 dark:bg-amber-900/20 rounded-xl text-amber-700 dark:text-amber-400 text-sm"><Clock size={16} /> <span>{pendingOrders} طلب في الانتظار</span></div>}
      {lowStock > 0 && <div className="flex items-center gap-2 px-4 py-2.5 bg-red-50 dark:bg-red-900/20 rounded-xl text-red-700 dark:text-red-400 text-sm"><AlertTriangle size={16} /> <span>{lowStock} منتج نفد مخزونه</span></div>}
    </div>
  );
}

export function DashboardRecentOrders() {
  const { orders } = useAdmin();
  return (
    <div className="lg:col-span-2 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
      <div className="p-4 border-b border-slate-200 dark:border-slate-700 flex items-center justify-between">
        <h2 className="font-bold text-slate-800 dark:text-white">آخر الطلبات</h2>
        <Link href="/admin/orders" className="text-xs text-sky-600 hover:text-sky-700">عرض الكل</Link>
      </div>
      {orders.length === 0 ? (
        <p className="p-6 text-center text-sm text-slate-400">لا توجد طلبات</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead><tr className="text-xs text-slate-500 text-right border-b border-slate-100 dark:border-slate-700"><th className="px-4 py-3 font-medium">#</th><th className="px-4 py-3 font-medium">الطلب</th><th className="px-4 py-3 font-medium">العميل</th><th className="px-4 py-3 font-medium">المبلغ</th><th className="px-4 py-3 font-medium">الحالة</th></tr></thead>
            <tbody>
              {orders.slice(0, 5).map((order, i) => (
                <tr key={order.id} className="border-b border-slate-50 dark:border-slate-700/50 hover:bg-slate-50 dark:hover:bg-slate-700/30">
                  <td className="px-4 py-3 text-xs text-slate-400 font-mono">{i + 1}</td>
                  <td className="px-4 py-3 text-sm font-medium text-sky-600">{order.id}</td>
                  <td className="px-4 py-3 text-sm text-slate-700 dark:text-slate-300">{order.customer}</td>
                  <td className="px-4 py-3 text-sm font-bold text-slate-800 dark:text-white">{(order.total + order.shippingCost).toLocaleString("en")} ر.ي</td>
                  <td className="px-4 py-3"><span className={`text-xs font-medium px-2 py-0.5 rounded-full ${orderStatusColors[order.status as OrderStatus]}`}>{orderStatusLabels[order.status as OrderStatus]}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export function DashboardTopProducts() {
  const { products } = useAdmin();
  const top = [...products].sort((a, b) => b.reviews - a.reviews).slice(0, 5).map((p) => ({
    name: p.name,
    reviews: p.reviews,
    price: p.price,
  }));
  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
      <div className="p-4 border-b border-slate-200 dark:border-slate-700 flex items-center justify-between"><h2 className="font-bold text-slate-800 dark:text-white">الأكثر تقييماً</h2><TrendingUp size={16} className="text-emerald-500" /></div>
      <div className="p-4 space-y-3">
        {top.map((p, i) => (
          <div key={p.name} className="flex items-center gap-3">
            <span className="w-6 h-6 rounded-full bg-slate-100 dark:bg-slate-700 flex items-center justify-center text-xs font-bold text-slate-500">{i + 1}</span>
            <div className="flex-1 min-w-0"><p className="text-sm font-medium text-slate-800 dark:text-white truncate">{p.name}</p><p className="text-xs text-slate-500">{p.reviews} تقييم</p></div>
            <p className="text-sm font-bold text-emerald-600 shrink-0">{p.price.toLocaleString("en")} ر.ي</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export function DashboardActivityLog() {
  const { activityLog } = useAdmin();
  const recent = activityLog.slice(0, 8);
  const typeColors: Record<string, string> = {
    order: "bg-sky-100 text-sky-600",
    product: "bg-purple-100 text-purple-600",
    user: "bg-amber-100 text-amber-600",
    category: "bg-emerald-100 text-emerald-600",
    settings: "bg-slate-100 text-slate-600",
  };
  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
      <div className="p-4 border-b border-slate-200 dark:border-slate-700 flex items-center justify-between">
        <h2 className="font-bold text-slate-800 dark:text-white">سجل النشاط</h2>
        <Activity size={16} className="text-slate-400" />
      </div>
      {recent.length === 0 ? (
        <p className="p-6 text-center text-sm text-slate-400">لا يوجد نشاط بعد</p>
      ) : (
        <div className="divide-y divide-slate-100 dark:divide-slate-700/50">
          {recent.map((entry) => (
            <div key={entry.id} className="px-4 py-3 flex items-center gap-3">
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${typeColors[entry.type] || "bg-slate-100 text-slate-600"}`}>{entry.action}</span>
              <p className="text-sm text-slate-600 dark:text-slate-400 flex-1 truncate">{entry.details}</p>
              <p className="text-[10px] text-slate-400 shrink-0">{new Date(entry.timestamp).toLocaleDateString("ar-YE")}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
