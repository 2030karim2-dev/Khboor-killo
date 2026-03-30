"use client";

import { use } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { useAdmin, type AdminUser } from "@/lib/AdminContext";
import { useToast } from "@/lib/ToastContext";
import { ArrowRight, Mail, Phone, MapPin, Calendar, ShoppingBag, DollarSign, Shield } from "lucide-react";

const roleLabels: Record<string, string> = { buyer: "مشتري", seller: "بائع", admin: "مسؤول" };
const statusLabels: Record<string, string> = { active: "نشط", pending: "معلق", banned: "محظور" };

export default function UserDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const { users, updateUserRole, updateUserStatus, orders } = useAdmin();
  const { success } = useToast();
  const user = users.find((u) => u.id === id);

  if (!user) notFound();

  const userOrders = orders.filter((o) => o.customer === user.name).slice(0, 5);

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center gap-3">
        <Link href="/admin/users" className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700">
          <ArrowRight size={20} />
        </Link>
        <div>
          <h1 className="text-xl font-extrabold text-slate-800 dark:text-white">{user.name}</h1>
          <p className="text-sm text-slate-500">عضو منذ {user.joined}</p>
        </div>
        <span className={`mr-auto text-sm font-medium px-3 py-1 rounded-lg ${
          user.status === "active" ? "bg-emerald-50 text-emerald-600" : user.status === "pending" ? "bg-amber-50 text-amber-600" : "bg-red-50 text-red-600"
        }`}>
          {statusLabels[user.status]}
        </span>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Info */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6">
            <h2 className="font-bold text-slate-800 dark:text-white mb-4">معلومات المستخدم</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="flex items-center gap-3 p-3 bg-slate-50 dark:bg-slate-700/50 rounded-xl">
                <Mail size={18} className="text-slate-400" />
                <div><p className="text-xs text-slate-500">البريد</p><p className="text-sm font-medium" dir="ltr">{user.email}</p></div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-slate-50 dark:bg-slate-700/50 rounded-xl">
                <Phone size={18} className="text-slate-400" />
                <div><p className="text-xs text-slate-500">الهاتف</p><p className="text-sm font-medium" dir="ltr">{user.phone}</p></div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-slate-50 dark:bg-slate-700/50 rounded-xl">
                <Calendar size={18} className="text-slate-400" />
                <div><p className="text-xs text-slate-500">تاريخ الانضمام</p><p className="text-sm font-medium">{user.joined}</p></div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-slate-50 dark:bg-slate-700/50 rounded-xl">
                <Shield size={18} className="text-slate-400" />
                <div><p className="text-xs text-slate-500">الدور</p><p className="text-sm font-medium">{roleLabels[user.role]}</p></div>
              </div>
            </div>
          </div>

          {/* Orders */}
          <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6">
            <h2 className="font-bold text-slate-800 dark:text-white mb-4">آخر الطلبات ({user.orders})</h2>
            {userOrders.length > 0 ? (
              <div className="space-y-2">
                {userOrders.map((order) => (
                  <div key={order.id} className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-700/50 rounded-xl">
                    <div>
                      <p className="text-sm font-medium text-sky-600">{order.id}</p>
                      <p className="text-xs text-slate-500">{order.date}</p>
                    </div>
                    <p className="text-sm font-bold">{order.total.toLocaleString()} ر.س</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-slate-500 text-center py-6">لا توجد طلبات</p>
            )}
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          {/* Stats */}
          <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-4 space-y-3">
            <div className="flex items-center gap-3 p-3 bg-sky-50 dark:bg-sky-900/20 rounded-xl">
              <ShoppingBag size={18} className="text-sky-600" />
              <div><p className="text-xs text-slate-500">الطلبات</p><p className="text-lg font-extrabold">{user.orders}</p></div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-emerald-50 dark:bg-emerald-900/20 rounded-xl">
              <DollarSign size={18} className="text-emerald-600" />
              <div><p className="text-xs text-slate-500">إجمالي المشتريات</p><p className="text-lg font-extrabold">{user.totalSpent.toLocaleString()} ر.س</p></div>
            </div>
          </div>

          {/* Actions */}
          <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-4 space-y-3">
            <h3 className="font-bold text-slate-800 dark:text-white">إجراءات</h3>
            <div>
              <label className="block text-xs text-slate-500 mb-1">تغيير الدور</label>
              <select
                value={user.role}
                onChange={(e) => { updateUserRole(user.id, e.target.value as AdminUser["role"]); success("تم تغيير الدور"); }}
                className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-600 bg-transparent text-sm"
              >
                {Object.entries(roleLabels).map(([k, l]) => <option key={k} value={k}>{l}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs text-slate-500 mb-1">تغيير الحالة</label>
              <select
                value={user.status}
                onChange={(e) => { updateUserStatus(user.id, e.target.value as AdminUser["status"]); success("تم تغيير الحالة"); }}
                className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-600 bg-transparent text-sm"
              >
                {Object.entries(statusLabels).map(([k, l]) => <option key={k} value={k}>{l}</option>)}
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
