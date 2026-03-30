"use client";

import { useAdmin, type AdminUser } from "@/lib/AdminContext";
import { Eye, Pencil, UserPlus } from "lucide-react";
import ExcelTable, { type Column } from "@/components/admin/ExcelTable";
import { useToast } from "@/lib/ToastContext";

export default function AdminUsers() {
  const { users, updateUserRole, updateUserStatus } = useAdmin();
  const { success } = useToast();
  const roleLabels: Record<string, string> = { buyer: "مشتري", seller: "بائع", admin: "مسؤول" };
  const statusLabels: Record<string, string> = { active: "نشط", pending: "معلق", banned: "محظور" };

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
        <select value={v as string} onChange={(e) => { updateUserRole(row.id, e.target.value as AdminUser["role"]); success("تم تغيير الدور"); }} onClick={(e) => e.stopPropagation()} className={`text-xs font-medium px-2 py-1 rounded-lg border-0 cursor-pointer ${v === "admin" ? "bg-red-50 text-red-600" : v === "seller" ? "bg-purple-50 text-purple-600" : "bg-sky-50 text-sky-600"}`}>
          {Object.entries(roleLabels).map(([k, l]) => <option key={k} value={k}>{l}</option>)}
        </select>
      ),
    },
    { key: "orders", header: "الطلبات", width: 80 },
    { key: "totalSpent", header: "المشتريات", width: 120, render: (v) => <span className="font-bold">{(v as number).toLocaleString()} ر.س</span> },
    {
      key: "status", header: "الحالة", width: 110,
      render: (v, row) => (
        <select value={v as string} onChange={(e) => { updateUserStatus(row.id, e.target.value as AdminUser["status"]); success("تم تغيير الحالة"); }} onClick={(e) => e.stopPropagation()} className={`text-xs font-medium px-2 py-1 rounded-lg border-0 cursor-pointer ${v === "active" ? "bg-emerald-50 text-emerald-600" : v === "pending" ? "bg-amber-50 text-amber-600" : "bg-red-50 text-red-600"}`}>
          {Object.entries(statusLabels).map(([k, l]) => <option key={k} value={k}>{l}</option>)}
        </select>
      ),
    },
    { key: "joined", header: "الانضمام", width: 110 },
    {
      key: "actions", header: "إجراءات", width: 80, sortable: false,
      render: () => (
        <div className="flex items-center gap-1">
          <button className="p-1.5 rounded-lg hover:bg-sky-50 text-slate-400 hover:text-sky-600"><Eye size={15} /></button>
          <button className="p-1.5 rounded-lg hover:bg-amber-50 text-slate-400 hover:text-amber-600"><Pencil size={15} /></button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div><h1 className="text-xl font-extrabold text-slate-800 dark:text-white">المستخدمين</h1><p className="text-sm text-slate-500">{users.length} مستخدم</p></div>
        <button className="btn-primary text-sm"><UserPlus size={16} /> إضافة مستخدم</button>
      </div>
      <div className="grid grid-cols-3 gap-3">
        <div className="bg-white dark:bg-slate-800 rounded-xl p-4 border border-slate-200 dark:border-slate-700"><p className="text-2xl font-extrabold">{users.length}</p><p className="text-xs text-slate-500">إجمالي</p></div>
        <div className="bg-white dark:bg-slate-800 rounded-xl p-4 border border-slate-200 dark:border-slate-700"><p className="text-2xl font-extrabold text-purple-600">{users.filter((u) => u.role === "seller").length}</p><p className="text-xs text-slate-500">بائعين</p></div>
        <div className="bg-white dark:bg-slate-800 rounded-xl p-4 border border-slate-200 dark:border-slate-700"><p className="text-2xl font-extrabold text-amber-600">{users.filter((u) => u.status === "pending").length}</p><p className="text-xs text-slate-500">معلقين</p></div>
      </div>
      <ExcelTable columns={columns} data={users} getRowId={(u) => u.id} searchPlaceholder="بحث بالاسم أو البريد..." pageSize={8} />
    </div>
  );
}
