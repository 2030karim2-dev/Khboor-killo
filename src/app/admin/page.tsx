import Link from "next/link";
import {
  ShoppingCart, Package, Users, DollarSign,
  TrendingUp, ArrowUpRight, ArrowDownRight,
} from "lucide-react";

const stats = [
  {
    title: "إجمالي المبيعات",
    value: "125,430 ر.س",
    change: "+12.5%",
    up: true,
    icon: DollarSign,
    color: "bg-emerald-50 text-emerald-600",
  },
  {
    title: "الطلبات",
    value: "1,284",
    change: "+8.2%",
    up: true,
    icon: ShoppingCart,
    color: "bg-sky-50 text-sky-600",
  },
  {
    title: "المنتجات",
    value: "456",
    change: "+3",
    up: true,
    icon: Package,
    color: "bg-purple-50 text-purple-600",
  },
  {
    title: "المستخدمين",
    value: "2,847",
    change: "+15.3%",
    up: true,
    icon: Users,
    color: "bg-orange-50 text-orange-600",
  },
];

const recentOrders = [
  { id: "KH12345678", customer: "أحمد محمد", total: "1,450 ر.س", status: "مكتمل", date: "منذ ساعة" },
  { id: "KH12345677", customer: "فاطمة علي", total: "380 ر.س", status: "قيد الشحن", date: "منذ 3 ساعات" },
  { id: "KH12345676", customer: "عبدالله سعيد", total: "12,500 ر.س", status: "جديد", date: "منذ 5 ساعات" },
  { id: "KH12345675", customer: "مريم حسن", total: "890 ر.س", status: "ملغي", date: "منذ يوم" },
  { id: "KH12345674", customer: "خالد عمر", total: "2,100 ر.س", status: "قيد التجهيز", date: "منذ يوم" },
];

const topProducts = [
  { name: "تويوتا كامري 2024", sales: 45, revenue: "5,625,000 ر.س" },
  { name: "طقم فرامل أصلي", sales: 234, revenue: "105,300 ر.س" },
  { name: "ثوب رجالي فاخر", sales: 445, revenue: "80,100 ر.س" },
  { name: "ساعة ذكية احترافية", sales: 678, revenue: "406,122 ر.س" },
  { name: "بلاط سيراميك 60x60", sales: 567, revenue: "25,515 ر.س" },
];

const statusColors: Record<string, string> = {
  "مكتمل": "bg-emerald-50 text-emerald-600",
  "قيد الشحن": "bg-sky-50 text-sky-600",
  "جديد": "bg-blue-50 text-blue-600",
  "قيد التجهيز": "bg-purple-50 text-purple-600",
  "ملغي": "bg-red-50 text-red-600",
};

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-extrabold text-slate-800 dark:text-white">لوحة التحكم</h1>
        <p className="text-sm text-slate-500">مرحباً بك في لوحة تحكم خبور</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <div key={stat.title} className="bg-white dark:bg-slate-800 rounded-xl p-4 border border-slate-200 dark:border-slate-700">
            <div className="flex items-center justify-between mb-3">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${stat.color}`}>
                <stat.icon size={20} />
              </div>
              <div className={`flex items-center gap-0.5 text-xs font-medium ${stat.up ? "text-emerald-600" : "text-red-600"}`}>
                {stat.up ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                {stat.change}
              </div>
            </div>
            <p className="text-2xl font-extrabold text-slate-800 dark:text-white">{stat.value}</p>
            <p className="text-xs text-slate-500">{stat.title}</p>
          </div>
        ))}
      </div>

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
                  <th className="px-4 py-3 font-medium">رقم الطلب</th>
                  <th className="px-4 py-3 font-medium">العميل</th>
                  <th className="px-4 py-3 font-medium">المبلغ</th>
                  <th className="px-4 py-3 font-medium">الحالة</th>
                  <th className="px-4 py-3 font-medium">التاريخ</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map((order) => (
                  <tr key={order.id} className="border-b border-slate-50 dark:border-slate-700/50 hover:bg-slate-50 dark:hover:bg-slate-700/30">
                    <td className="px-4 py-3 text-sm font-medium text-sky-600">{order.id}</td>
                    <td className="px-4 py-3 text-sm text-slate-700 dark:text-slate-300">{order.customer}</td>
                    <td className="px-4 py-3 text-sm font-bold text-slate-800 dark:text-white">{order.total}</td>
                    <td className="px-4 py-3">
                      <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${statusColors[order.status] || "bg-slate-100 text-slate-600"}`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-xs text-slate-500">{order.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Top Products */}
        <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
          <div className="p-4 border-b border-slate-200 dark:border-slate-700 flex items-center justify-between">
            <h2 className="font-bold text-slate-800 dark:text-white">المنتجات الأكثر مبيعاً</h2>
            <TrendingUp size={16} className="text-emerald-500" />
          </div>
          <div className="p-4 space-y-3">
            {topProducts.map((product, i) => (
              <div key={product.name} className="flex items-center gap-3">
                <span className="w-6 h-6 rounded-full bg-slate-100 dark:bg-slate-700 flex items-center justify-center text-xs font-bold text-slate-500">
                  {i + 1}
                </span>
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
