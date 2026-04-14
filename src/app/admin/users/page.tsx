"use client";

import { useState } from "react";
import Link from "next/link";
import { useAdmin, type AdminUser } from "@/lib/AdminContext";
import { Eye, Pencil, UserPlus, X } from "lucide-react";
import ExcelTable, { type Column } from "@/components/admin/ExcelTable";
import { useToast } from "@/lib/ToastContext";
import { userRoleLabels, userStatusLabels, userRoleColors, userStatusColors } from "@/components/admin/constants";

export default function AdminUsers() {
  const { users, addUser, updateUserRole, updateUserStatus } = useAdmin();
  const { success } = useToast();
  const [showAddForm, setShowAddForm] = useState(false);

  const handleAddUser = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const name = form.get("name") as string;
    const email = form.get("email") as string;
    const phone = form.get("phone") as string || "";
    const role = form.get("role") as AdminUser["role"];
    if (!name || !email) return;
    addUser({ name, email, phone, role, status: "active" });
    success("تمت إضافة المستخدم");
    setShowAddForm(false);
    (e.target as HTMLFormElement).reset();
  };

  const columns: Column<AdminUser>[] = [
    {
      key: "name", header: "المستخدم", width: 200,
      render: (v, row) => (
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-sky-100 flex items-center justify-center shrink-0"><span className="text-sky-600 font-bold text-sm">{(v as string).charAt(0)}</span></div>
          <div><p className="font-medium text-slate-800 dark:text-white">{v as string}</p><p className="text-[10px] text-slate-400">{row.id}</p></div>
        </div>
      ),
    },
    { key: "email", header: "البريد", width: 180, render: (v) => <span dir="ltr">{String(v)}</span> },
    { key: "phone", header: "الهاتف", width: 120, render: (v) => <span dir="ltr">{String(v)}</span> },
    {
      key: "role", header: "الدور", width: 110,
      render: (v, row) => (
        <select value={v as string} onChange={(e) => { updateUserRole(row.id, e.target.value as AdminUser["role"]); success("تم تغيير الدور"); }} onClick={(e) => e.stopPropagation()} className={`text-xs font-medium px-2 py-1 rounded-lg border-0 cursor-pointer ${userRoleColors[v as string] || "bg-sky-50 text-sky-600"}`}>
          {Object.entries(userRoleLabels).map(([k, l]) => <option key={k} value={k}>{l}</option>)}
        </select>
      ),
    },
    { key: "orders", header: "الطلبات", width: 80 },
    { key: "totalSpent", header: "المشتريات", width: 120, render: (v) => <span className="font-bold">{(v as number).toLocaleString("en")} ر.ي</span> },
    {
      key: "status", header: "الحالة", width: 110,
      render: (v, row) => (
        <select value={v as string} onChange={(e) => { updateUserStatus(row.id, e.target.value as AdminUser["status"]); success("تم تغيير الحالة"); }} onClick={(e) => e.stopPropagation()} className={`text-xs font-medium px-2 py-1 rounded-lg border-0 cursor-pointer ${userStatusColors[v as string] || "bg-emerald-50 text-emerald-600"}`}>
          {Object.entries(userStatusLabels).map(([k, l]) => <option key={k} value={k}>{l}</option>)}
        </select>
      ),
    },
    { key: "joined", header: "الانضمام", width: 110 },
    {
      key: "actions", header: "إجراءات", width: 100, sortable: false,
      render: (_, row) => (
        <div className="flex items-center gap-1">
          <Link href={`/admin/users/${row.id}`} className="p-1.5 rounded-lg hover:bg-sky-50 text-slate-400 hover:text-sky-600" aria-label="عرض المستخدم"><Eye size={15} /></Link>
          <button onClick={(e) => { e.stopPropagation(); success("ميزة التعديل قيد التطوير"); }} className="p-1.5 rounded-lg hover:bg-amber-50 text-slate-400 hover:text-amber-600" aria-label="تعديل المستخدم"><Pencil size={15} /></button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div><h1 className="text-xl font-extrabold text-slate-800 dark:text-white">المستخدمين</h1><p className="text-sm text-slate-500">{users.length} مستخدم</p></div>
        <button onClick={() => setShowAddForm(!showAddForm)} className="btn-primary text-sm"><UserPlus size={16} /> إضافة مستخدم</button>
      </div>

      {showAddForm && (
        <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6 animate-slide-up">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-bold text-slate-800 dark:text-white">مستخدم جديد</h2>
            <button onClick={() => setShowAddForm(false)} className="p-1.5 rounded-lg hover:bg-slate-100"><X size={18} className="text-slate-500" /></button>
          </div>
          <form onSubmit={handleAddUser} className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div><label className="block text-sm font-medium mb-1.5">الاسم الكامل</label><input name="name" required className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-600 focus:outline-none focus:ring-2 focus:ring-sky-500 bg-transparent" /></div>
              <div><label className="block text-sm font-medium mb-1.5">البريد الإلكتروني</label><input name="email" type="email" required className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-600 focus:outline-none focus:ring-2 focus:ring-sky-500 bg-transparent" dir="ltr" /></div>
              <div><label className="block text-sm font-medium mb-1.5">الهاتف</label><input name="phone" className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-600 focus:outline-none focus:ring-2 focus:ring-sky-500 bg-transparent" dir="ltr" /></div>
              <div><label className="block text-sm font-medium mb-1.5">الدور</label>
                <select name="role" className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-600 focus:outline-none focus:ring-2 focus:ring-sky-500 bg-transparent">
                  {Object.entries(userRoleLabels).map(([k, l]) => <option key={k} value={k}>{l}</option>)}
                </select>
              </div>
            </div>
            <div className="flex gap-3">
              <button type="submit" className="btn-primary text-sm">حفظ</button>
              <button type="button" onClick={() => setShowAddForm(false)} className="btn-outline text-sm">إلغاء</button>
            </div>
          </form>
        </div>
      )}

      <div className="grid grid-cols-3 gap-3">
        <div className="bg-white dark:bg-slate-800 rounded-xl p-4 border border-slate-200 dark:border-slate-700"><p className="text-2xl font-extrabold">{users.length}</p><p className="text-xs text-slate-500">إجمالي</p></div>
        <div className="bg-white dark:bg-slate-800 rounded-xl p-4 border border-slate-200 dark:border-slate-700"><p className="text-2xl font-extrabold text-purple-600">{users.filter((u) => u.role === "seller").length}</p><p className="text-xs text-slate-500">بائعين</p></div>
        <div className="bg-white dark:bg-slate-800 rounded-xl p-4 border border-slate-200 dark:border-slate-700"><p className="text-2xl font-extrabold text-amber-600">{users.filter((u) => u.status === "pending").length}</p><p className="text-xs text-slate-500">معلقين</p></div>
      </div>
      <ExcelTable columns={columns} data={users} getRowId={(u) => u.id} searchPlaceholder="بحث بالاسم أو البريد..." pageSize={8} />
    </div>
  );
}
