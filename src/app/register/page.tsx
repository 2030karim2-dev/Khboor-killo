"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import RegisterForm from "@/components/auth/RegisterForm";

export default function RegisterPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md animate-slide-up">
        <div className="text-center mb-8">
          <Link href="/" className="inline-block mb-4">
            <div className="w-16 h-16 rounded-2xl gradient-primary flex items-center justify-center text-white font-bold text-3xl mx-auto">خ</div>
          </Link>
          <h1 className="text-2xl font-extrabold text-slate-800">إنشاء حساب جديد</h1>
          <p className="text-slate-500 mt-1">انضم إلى عائلة خبور اليوم</p>
        </div>
        <div className="card p-6">
          <RegisterForm onSuccess={() => router.push("/")} />
          <p className="text-center text-sm text-slate-500 mt-6">
            لديك حساب بالفعل؟{" "}
            <Link href="/login" className="text-sky-600 hover:text-sky-700 font-medium">تسجيل الدخول</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
