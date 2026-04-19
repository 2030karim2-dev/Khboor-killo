"use client";

import { useState, useMemo } from "react";
import { 
  BarChart3, 
  ShoppingCart, 
  Package, 
  Users, 
  Download, 
  TrendingUp, 
  Calendar,
  ArrowUpRight,
  ArrowDownRight
} from "lucide-react";
import { useAdmin } from "@/contexts/AdminContext";
import { orderStatusLabels, orderStatusColors, type OrderStatus } from "@/components/admin/constants";

type ReportType = "sales" | "products" | "users";

export default function ReportsPage() {
  const { orders, products, users } = useAdmin();
  const [reportType, setReportType] = useState<ReportType>("sales");
  const [dateRange, setDateRange] = useState<"week" | "month" | "year">("month");

  const salesData = useMemo(() => {
    const now = new Date();
    const filtered = orders.filter((o) => {
      const orderDate = new Date(o.createdAt);
      const diff = now.getTime() - orderDate.getTime();
      const days = diff / (1000 * 60 * 60 * 24);
      
      if (dateRange === "week") return days <= 7;
      if (dateRange === "month") return days <= 30;
      return days <= 365;
    });

    const total = filtered.reduce((sum, o) => sum + o.total, 0);
    const delivered = filtered.filter((o) => o.status === "delivered").length;
    const pending = filtered.filter((o) => o.status === "pending").length;
    const cancelled = filtered.filter((o) => o.status === "cancelled").length;

    return { total, delivered, pending, cancelled, count: filtered.length };
  }, [orders, dateRange]);

  const productData = useMemo(() => {
    const totalProducts = products.length;
    const inStock = products.filter((p) => p.inStock).length;
    const outOfStock = products.filter((p) => !p.inStock).length;
    const featured = products.filter((p) => p.featured).length;

const topProducts = [...products]
      .sort((a, b) => b.price - a.price)
      .slice(0, 10);

    return { total: totalProducts, inStock, outOfStock, featured, topProducts };
  }, [products]);

  const userData = useMemo(() => {
    const now = new Date();
    const filtered = users.filter((u) => {
      const joinDate = new Date(u.joined);
      const diff = now.getTime() - joinDate.getTime();
      const days = diff / (1000 * 60 * 60 * 24);
      
      if (dateRange === "week") return days <= 7;
      if (dateRange === "month") return days <= 30;
      return days <= 365;
    });

    const active = filtered.filter((u) => u.status === "active").length;
    const pending = filtered.filter((u) => u.status === "pending").length;
    const buyers = filtered.filter((u) => u.role === "buyer").length;
    const sellers = filtered.filter((u) => u.role === "seller").length;

    return { total: filtered.length, active, pending, buyers, sellers };
  }, [users, dateRange]);

  const handleExport = () => {
    let data = "";
    let filename = "";
    let headers = "";

    if (reportType === "sales") {
      headers = "ID,العميل,المدينة,المبلغ,الحالة,التاريخ";
      data = orders.map((o) => `${o.id},${o.customer},${o.city},${o.total},${o.status},${o.createdAt}`).join("\n");
      filename = "sales-report";
    } else if (reportType === "products") {
      headers = "ID,الاسم,السعر,المخزون,التصنيف";
      data = products.map((p) => `${p.id},${p.name},${p.price},${p.inStock ? "متوفر" : "نفد"},${p.categorySlug}`).join("\n");
      filename = "products-report";
    } else {
      headers = "ID,الاسم,البريد,الدور,الحالة,تاريخ الانضمام";
      data = users.map((u) => `${u.id},${u.name},${u.email},${u.role},${u.status},${u.joined}`).join("\n");
      filename = "users-report";
    }

    const blob = new Blob([`${headers}\n${data}`], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `${filename}-${new Date().toISOString().split("T")[0]}.csv`;
    link.click();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-extrabold text-slate-800 dark:text-white">التقارير</h1>
          <p className="text-sm text-slate-500">تحليلات وإحصائيات شاملة</p>
        </div>
        <button
          onClick={handleExport}
          className="flex items-center gap-2 px-4 py-2 bg-sky-500 text-white rounded-xl text-sm font-medium hover:bg-sky-600 transition-colors"
        >
          <Download size={16} />
          تصدير CSV
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-4">
        <div className="flex gap-2">
          {(["sales", "products", "users"] as ReportType[]).map((type) => (
            <button
              key={type}
              onClick={() => setReportType(type)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
                reportType === type
                  ? "bg-sky-500 text-white"
                  : "bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600"
              }`}
            >
              {type === "sales" && <ShoppingCart size={16} className="inline ml-2" />}
              {type === "products" && <Package size={16} className="inline ml-2" />}
              {type === "users" && <Users size={16} className="inline ml-2" />}
              {type === "sales" ? "المبيعات" : type === "products" ? "المنتجات" : "المستخدمين"}
            </button>
          ))}
        </div>
        <div className="flex gap-2">
          {(["week", "month", "year"] as const).map((range) => (
            <button
              key={range}
              onClick={() => setDateRange(range)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors flex items-center gap-2 ${
                dateRange === range
                  ? "bg-slate-800 dark:bg-slate-200 text-white dark:text-slate-800"
                  : "bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300"
              }`}
            >
              <Calendar size={14} />
              {range === "week" ? "أسبوع" : range === "month" ? "شهر" : "سنة"}
            </button>
          ))}
        </div>
      </div>

      {/* Sales Report */}
      {reportType === "sales" && (
        <div className="space-y-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white dark:bg-slate-800 rounded-xl p-5 border border-slate-200 dark:border-slate-700">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm text-slate-500">إجمالي المبيعات</span>
                <ArrowUpRight size={18} className="text-emerald-500" />
              </div>
              <p className="text-2xl font-extrabold text-slate-800 dark:text-white">
                {salesData.total.toLocaleString("en")}
              </p>
              <span className="text-xs text-slate-400">ريال يمني</span>
            </div>

            <div className="bg-white dark:bg-slate-800 rounded-xl p-5 border border-slate-200 dark:border-slate-700">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm text-slate-500">الطلبات المكتملة</span>
                <TrendingUp size={18} className="text-sky-500" />
              </div>
              <p className="text-2xl font-extrabold text-slate-800 dark:text-white">
                {salesData.delivered}
              </p>
              <span className="text-xs text-slate-400">طلب</span>
            </div>

            <div className="bg-white dark:bg-slate-800 rounded-xl p-5 border border-slate-200 dark:border-slate-700">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm text-slate-500">طلبات معلقة</span>
                <Calendar size={18} className="text-amber-500" />
              </div>
              <p className="text-2xl font-extrabold text-slate-800 dark:text-white">
                {salesData.pending}
              </p>
              <span className="text-xs text-slate-400">طلب</span>
            </div>

            <div className="bg-white dark:bg-slate-800 rounded-xl p-5 border border-slate-200 dark:border-slate-700">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm text-slate-500">طلبات ملغاة</span>
                <ArrowDownRight size={18} className="text-red-500" />
              </div>
              <p className="text-2xl font-extrabold text-slate-800 dark:text-white">
                {salesData.cancelled}
              </p>
              <span className="text-xs text-slate-400">طلب</span>
            </div>
          </div>

          {/* Sales Table */}
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
      )}

      {/* Products Report */}
      {reportType === "products" && (
        <div className="space-y-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white dark:bg-slate-800 rounded-xl p-5 border border-slate-200 dark:border-slate-700">
              <p className="text-sm text-slate-500 mb-1">إجمالي المنتجات</p>
              <p className="text-2xl font-extrabold text-slate-800 dark:text-white">{productData.total}</p>
            </div>
            <div className="bg-white dark:bg-slate-800 rounded-xl p-5 border border-slate-200 dark:border-slate-700">
              <p className="text-sm text-slate-500 mb-1">متوفرة</p>
              <p className="text-2xl font-extrabold text-emerald-600">{productData.inStock}</p>
            </div>
            <div className="bg-white dark:bg-slate-800 rounded-xl p-5 border border-slate-200 dark:border-slate-700">
              <p className="text-sm text-slate-500 mb-1">نفد المخزون</p>
              <p className="text-2xl font-extrabold text-red-600">{productData.outOfStock}</p>
            </div>
            <div className="bg-white dark:bg-slate-800 rounded-xl p-5 border border-slate-200 dark:border-slate-700">
              <p className="text-sm text-slate-500 mb-1">مميزة</p>
              <p className="text-2xl font-extrabold text-sky-600">{productData.featured}</p>
            </div>
          </div>
        </div>
      )}

      {/* Users Report */}
      {reportType === "users" && (
        <div className="space-y-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white dark:bg-slate-800 rounded-xl p-5 border border-slate-200 dark:border-slate-700">
              <p className="text-sm text-slate-500 mb-1">إجمالي المستخدمين</p>
              <p className="text-2xl font-extrabold text-slate-800 dark:text-white">{userData.total}</p>
            </div>
            <div className="bg-white dark:bg-slate-800 rounded-xl p-5 border border-slate-200 dark:border-slate-700">
              <p className="text-sm text-slate-500 mb-1">نشط</p>
              <p className="text-2xl font-extrabold text-emerald-600">{userData.active}</p>
            </div>
            <div className="bg-white dark:bg-slate-800 rounded-xl p-5 border border-slate-200 dark:border-slate-700">
              <p className="text-sm text-slate-500 mb-1">مشترين</p>
              <p className="text-2xl font-extrabold text-sky-600">{userData.buyers}</p>
            </div>
            <div className="bg-white dark:bg-slate-800 rounded-xl p-5 border border-slate-200 dark:border-slate-700">
              <p className="text-sm text-slate-500 mb-1">بائعين</p>
              <p className="text-2xl font-extrabold text-purple-600">{userData.sellers}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}