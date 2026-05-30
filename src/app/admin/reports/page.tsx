"use client";

import { useState, useMemo } from "react";
import { Download } from "lucide-react";
import { useAdminOrders } from "@/contexts/AdminOrderContext";
import { useAdminProducts } from "@/contexts/AdminProductContext";
import { useAdminUsers } from "@/contexts/AdminUserContext";
import ReportFilters from "@/components/admin/ReportFilters";
import SalesReport from "@/components/admin/SalesReport";
import ProductsReport from "@/components/admin/ProductsReport";
import UsersReport from "@/components/admin/UsersReport";

type ReportType = "sales" | "products" | "users";

export default function ReportsPage() {
  const { orders } = useAdminOrders();
  const { products } = useAdminProducts();
  const { users } = useAdminUsers();
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

      <ReportFilters
        reportType={reportType}
        dateRange={dateRange}
        onReportTypeChange={setReportType}
        onDateRangeChange={setDateRange}
      />

      {reportType === "sales" && (
        <SalesReport orders={orders} salesData={salesData} />
      )}

      {reportType === "products" && (
        <ProductsReport products={products} productData={productData} />
      )}

      {reportType === "users" && (
        <UsersReport userData={userData} />
      )}
    </div>
  );
}