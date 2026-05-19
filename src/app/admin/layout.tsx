import type { Metadata } from "next";
import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminHeader from "@/components/admin/AdminHeader";
import AdminGuard from "@/components/admin/AdminGuard";

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
    <AdminGuard>
      <div className="min-h-screen bg-slate-50 dark:bg-slate-900 flex">
        <AdminSidebar />
        <div className="flex-1 flex flex-col min-h-screen w-full max-w-full overflow-x-hidden">
          <AdminHeader />
          <main className="flex-1 p-3 md:p-4 lg:p-6 overflow-x-auto">
            <div className="w-full max-w-7xl mx-auto">
              {children}
            </div>
          </main>
        </div>
      </div>
    </AdminGuard>
  );
}
