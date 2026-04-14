"use client";

import { useAuth } from "@/lib/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { ShieldAlert } from "lucide-react";

export default function AdminGuard({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.replace("/login?redirect=/admin");
    }
  }, [isAuthenticated, isLoading, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-100">
        <div className="animate-spin w-8 h-8 border-4 border-sky-600 border-t-transparent rounded-full" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-100">
        <div className="text-center p-8">
          <ShieldAlert size={48} className="text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-slate-800 mb-2">غير مصرح بالدخول</h2>
          <p className="text-slate-500 mb-4">يجب تسجيل الدخول للوصول إلى لوحة التحكم</p>
          <button onClick={() => router.push("/login?redirect=/admin")} className="btn-primary">
            تسجيل الدخول
          </button>
        </div>
      </div>
    );
  }

  if (user?.role !== "admin") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-100">
        <div className="text-center p-8">
          <ShieldAlert size={48} className="text-amber-500 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-slate-800 mb-2">وصول مقيد</h2>
          <p className="text-slate-500 mb-4">ليس لديك صلاحية الوصول إلى لوحة التحكم</p>
          <button onClick={() => router.push("/")} className="btn-primary">
            العودة للرئيسية
          </button>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
