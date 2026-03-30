"use client";

import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md animate-slide-up">
        <div className="text-center mb-8">
          <Link href="/" className="inline-block mb-4">
            <div className="w-16 h-16 rounded-2xl gradient-primary flex items-center justify-center text-white font-bold text-3xl mx-auto">
              خ
            </div>
          </Link>
          <h1 className="text-2xl font-extrabold text-slate-800">
            إنشاء حساب جديد
          </h1>
          <p className="text-slate-500 mt-1">انضم إلى عائلة خبور اليوم</p>
        </div>

        <div className="card p-6">
          <form className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">
                  الاسم الأول
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-sky-500 focus:outline-none transition-colors text-right"
                  placeholder="أحمد"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">
                  الاسم الأخير
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-sky-500 focus:outline-none transition-colors text-right"
                  placeholder="محمد"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">
                البريد الإلكتروني
              </label>
              <input
                type="email"
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-sky-500 focus:outline-none transition-colors text-right"
                placeholder="example@email.com"
                dir="ltr"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">
                رقم الجوال
              </label>
              <input
                type="tel"
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-sky-500 focus:outline-none transition-colors text-right"
                placeholder="05xxxxxxxx"
                dir="ltr"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">
                كلمة المرور
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-sky-500 focus:outline-none transition-colors"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <input
                type="checkbox"
                id="terms"
                className="accent-sky-500 rounded mt-1"
              />
              <label htmlFor="terms" className="text-sm text-slate-600">
                أوافق على{" "}
                <a href="#" className="text-sky-600 hover:text-sky-700">
                  الشروط والأحكام
                </a>{" "}
                و{" "}
                <a href="#" className="text-sky-600 hover:text-sky-700">
                  سياسة الخصوصية
                </a>
              </label>
            </div>
            <button type="submit" className="btn-primary w-full justify-center py-3 text-base">
              إنشاء الحساب
            </button>
          </form>

          <p className="text-center text-sm text-slate-500 mt-6">
            لديك حساب بالفعل؟{" "}
            <Link
              href="/login"
              className="text-sky-600 hover:text-sky-700 font-medium"
            >
              تسجيل الدخول
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
