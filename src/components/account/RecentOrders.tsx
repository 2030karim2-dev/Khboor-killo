"use client";

import { useOrders } from "@/contexts/OrderContext";
import Link from "next/link";
import { orderStatusLabels, orderStatusColors, type OrderStatus } from "@/components/admin/constants";

export default function RecentOrders() {
  const { orders } = useOrders();
  const recentOrders = orders.slice(0, 3);

  if (recentOrders.length === 0) {
    return (
      <div className="card p-6 md:p-8 mt-6">
        <h2 className="text-xl font-bold text-slate-800 mb-6">آخر الطلبات</h2>
        <p className="text-slate-500 text-center py-6">لا توجد طلبات بعد</p>
      </div>
    );
  }

  return (
    <div className="card p-6 md:p-8 mt-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-slate-800">آخر الطلبات</h2>
        <Link href="/account/orders" className="text-sm text-sky-600 hover:text-sky-700">عرض الكل</Link>
      </div>
      <div className="space-y-4">
        {recentOrders.map((order) => (
          <div
            key={order.id}
            className="flex items-center justify-between p-4 rounded-xl bg-slate-50 dark:bg-slate-700/50"
          >
            <div>
              <p className="font-bold text-slate-800 dark:text-white">#{order.id}</p>
              <p className="text-sm text-slate-500">{new Date(order.createdAt).toLocaleDateString("ar-YE")}</p>
            </div>
            <div className="text-left">
              <p className="font-bold text-slate-800 dark:text-white">{order.totalPrice.toLocaleString("en")} ر.ي</p>
              <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${orderStatusColors[order.status as OrderStatus] || "bg-slate-100 text-slate-600"}`}>
                {orderStatusLabels[order.status as OrderStatus] || order.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
