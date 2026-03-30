import type { Metadata } from "next";
import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminHeader from "@/components/admin/AdminHeader";

export const metadata: Metadata = {
  title: "لوحة التحكم | خبور",
  description: "لوحة تحكم المسؤول - إدارة الموقع",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-900 flex">
      <AdminSidebar />
      <div className="flex-1 flex flex-col min-h-screen">
        <AdminHeader />
        <main className="flex-1 p-4 md:p-6 overflow-auto">{children}</main>
      </div>
    </div>
  );
}
