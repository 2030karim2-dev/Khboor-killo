import { Eye, Pencil, Trash2, Search, UserPlus, Mail, Phone } from "lucide-react";

const users = [
  { id: "1", name: "أحمد محمد", email: "ahmed@email.com", phone: "0501234567", role: "مشتري", orders: 12, totalSpent: "15,430 ر.س", status: "نشط", joined: "2025-06-15" },
  { id: "2", name: "فاطمة علي", email: "fatima@email.com", phone: "0509876543", role: "مشتري", orders: 5, totalSpent: "3,200 ر.س", status: "نشط", joined: "2025-07-20" },
  { id: "3", name: "عبدالله سعيد", email: "abdullah@email.com", phone: "0551234567", role: "بائع", orders: 0, totalSpent: "0 ر.س", status: "نشط", joined: "2025-08-01" },
  { id: "4", name: "مريم حسن", email: "mariam@email.com", phone: "0561234567", role: "مشتري", orders: 8, totalSpent: "7,890 ر.س", status: "معلق", joined: "2025-08-15" },
  { id: "5", name: "خالد عمر", email: "khaled@email.com", phone: "0571234567", role: "بائع", orders: 0, totalSpent: "0 ر.س", status: "نشط", joined: "2025-09-10" },
  { id: "6", name: "سارة أحمد", email: "sara@email.com", phone: "0581234567", role: "مشتري", orders: 3, totalSpent: "2,100 ر.س", status: "نشط", joined: "2025-09-25" },
  { id: "7", name: "يوسف محمد", email: "yousef@email.com", phone: "0591234567", role: "مشتري", orders: 20, totalSpent: "28,500 ر.س", status: "نشط", joined: "2025-05-01" },
  { id: "8", name: "نورة سالم", email: "noura@email.com", phone: "0531234567", role: "بائع", orders: 0, totalSpent: "0 ر.س", status: "معلق", joined: "2025-10-01" },
];

export default function AdminUsers() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-extrabold text-slate-800 dark:text-white">المستخدمين</h1>
          <p className="text-sm text-slate-500">{users.length} مستخدم</p>
        </div>
        <button className="btn-primary text-sm">
          <UserPlus size={16} />
          إضافة مستخدم
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3">
        <div className="bg-white dark:bg-slate-800 rounded-xl p-4 border border-slate-200 dark:border-slate-700">
          <p className="text-2xl font-extrabold text-slate-800 dark:text-white">{users.length}</p>
          <p className="text-xs text-slate-500">إجمالي المستخدمين</p>
        </div>
        <div className="bg-white dark:bg-slate-800 rounded-xl p-4 border border-slate-200 dark:border-slate-700">
          <p className="text-2xl font-extrabold text-slate-800 dark:text-white">{users.filter((u) => u.role === "بائع").length}</p>
          <p className="text-xs text-slate-500">البائعين</p>
        </div>
        <div className="bg-white dark:bg-slate-800 rounded-xl p-4 border border-slate-200 dark:border-slate-700">
          <p className="text-2xl font-extrabold text-slate-800 dark:text-white">{users.filter((u) => u.status === "معلق").length}</p>
          <p className="text-xs text-slate-500">معلقين</p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-4 flex flex-wrap gap-3">
        <div className="relative flex-1 min-w-[200px]">
          <Search size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input type="search" placeholder="بحث بالاسم أو البريد..." className="w-full py-2 pr-9 pl-3 rounded-lg border border-slate-200 dark:border-slate-600 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 bg-transparent" />
        </div>
        <select className="px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-600 text-sm bg-transparent">
          <option>جميع الأدوار</option>
          <option>مشتري</option>
          <option>بائع</option>
        </select>
        <select className="px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-600 text-sm bg-transparent">
          <option>الحالة</option>
          <option>نشط</option>
          <option>معلق</option>
        </select>
      </div>

      {/* Table */}
      <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-xs text-slate-500 text-right border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-700/50">
                <th className="px-4 py-3 font-medium">المستخدم</th>
                <th className="px-4 py-3 font-medium hidden md:table-cell">البريد</th>
                <th className="px-4 py-3 font-medium hidden lg:table-cell">الهاتف</th>
                <th className="px-4 py-3 font-medium">الدور</th>
                <th className="px-4 py-3 font-medium hidden md:table-cell">الطلبات</th>
                <th className="px-4 py-3 font-medium">الحالة</th>
                <th className="px-4 py-3 font-medium">الإجراءات</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id} className="border-b border-slate-100 dark:border-slate-700/50 hover:bg-slate-50 dark:hover:bg-slate-700/30">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-sky-100 flex items-center justify-center shrink-0">
                        <span className="text-sky-600 font-bold text-sm">{user.name.charAt(0)}</span>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-slate-800 dark:text-white">{user.name}</p>
                        <p className="text-xs text-slate-400 md:hidden">{user.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm text-slate-600 hidden md:table-cell" dir="ltr">{user.email}</td>
                  <td className="px-4 py-3 text-sm text-slate-600 hidden lg:table-cell" dir="ltr">{user.phone}</td>
                  <td className="px-4 py-3">
                    <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${user.role === "بائع" ? "bg-purple-50 text-purple-600" : "bg-sky-50 text-sky-600"}`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm hidden md:table-cell">
                    {user.orders} طلب
                  </td>
                  <td className="px-4 py-3">
                    <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${user.status === "نشط" ? "bg-emerald-50 text-emerald-600" : "bg-amber-50 text-amber-600"}`}>
                      {user.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1">
                      <button className="p-1.5 rounded-lg hover:bg-sky-50 text-slate-400 hover:text-sky-600" aria-label="عرض">
                        <Eye size={16} />
                      </button>
                      <button className="p-1.5 rounded-lg hover:bg-amber-50 text-slate-400 hover:text-amber-600" aria-label="تعديل">
                        <Pencil size={16} />
                      </button>
                      <button className="p-1.5 rounded-lg hover:bg-red-50 text-slate-400 hover:text-red-600" aria-label="حذف">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
