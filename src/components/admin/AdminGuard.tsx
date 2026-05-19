"use client";

import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { ShieldAlert, AlertTriangle } from "lucide-react";
import type { UserRole } from "@/lib/permissions";

interface AdminGuardProps {
  children: React.ReactNode;
  requiredRole?: UserRole;
}

export default function AdminGuard({ children, requiredRole = "admin" }: AdminGuardProps) {
  const { isAuthenticated, user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.replace("/login?redirect=/admin");
    }
  }, [isAuthenticated, isLoading, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-100 dark:bg-slate-900">
        <div className="text-center">
          <div className="animate-spin w-10 h-10 border-4 border-sky-600 border-t-transparent rounded-full mx-auto mb-4" />
          <p className="text-slate-600 dark:text-slate-400">جاري التحقق من الهوية...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-100 dark:bg-slate-900">
        <div className="text-center p-8 max-w-md">
          <ShieldAlert size={56} className="text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-slate-800 dark:text-white mb-2">غير مصرح بالدخول</h2>
          <p className="text-slate-500 dark:text-slate-400 mb-5">يجب تسجيل الدخول للوصول إلى لوحة التحكم</p>
          <button 
            onClick={() => router.push("/login?redirect=/admin")} 
            className="btn-primary"
          >
            تسجيل الدخول
          </button>
        </div>
      </div>
    );
  }

  if (!user?.role) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-100 dark:bg-slate-900">
        <div className="text-center p-8 max-w-md">
          <AlertTriangle size={56} className="text-amber-500 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-slate-800 dark:text-white mb-2">خطأ في التحقق</h2>
          <p className="text-slate-500 dark:text-slate-400 mb-5">لم يتم تحديد دور المستخدم</p>
          <button onClick={() => router.push("/")} className="btn-primary">
            العودة للرئيسية
          </button>
        </div>
      </div>
    );
  }

  if (user.role !== "admin" && user.role !== requiredRole) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-100 dark:bg-slate-900">
        <div className="text-center p-8 max-w-md">
          <ShieldAlert size={56} className="text-amber-500 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-slate-800 dark:text-white mb-2">وصول مقيد</h2>
          <p className="text-slate-500 dark:text-slate-400 mb-5">
            أنت مسجل كـ <span className="font-medium text-slate-700 dark:text-slate-300">{user.role}</span>
            <br />
            لا يملك هذا الدور صلاحية الوصول إلى هذه الصفحة
          </p>
          <button onClick={() => router.push("/")} className="btn-primary">
            العودة للرئيسية
          </button>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
