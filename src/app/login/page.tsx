"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { useState, use } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, type LoginInput } from "@/lib/validations";
import { useAuth } from "@/lib/AuthContext";
import { useToast } from "@/lib/ToastContext";
import FormField from "@/components/ui/FormField";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useAuth();
  const { success, error } = useToast();
  const router = useRouter();
  const searchParams = useSearchParams();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginInput) => {
    const result = await login(data.email, data.password);
    if (result) {
      success("تم تسجيل الدخول بنجاح");
      const callbackUrl = searchParams.get("redirect") || searchParams.get("callbackUrl") || "/";
      router.push(callbackUrl);
    } else {
      error("البريد الإلكتروني أو كلمة المرور غير صحيحة");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md animate-slide-up">
        <div className="text-center mb-8">
          <Link href="/" className="inline-block mb-4">
            <div className="w-16 h-16 rounded-2xl gradient-primary flex items-center justify-center text-white font-bold text-3xl mx-auto">
              خ
            </div>
          </Link>
          <h1 className="text-2xl font-extrabold text-slate-800">تسجيل الدخول</h1>
          <p className="text-slate-500 mt-1">مرحباً بعودتك إلى خبور</p>
        </div>

        <div className="card p-6">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
            <FormField
              label="البريد الإلكتروني"
              type="email"
              placeholder="example@email.com"
              dir="ltr"
              error={errors.email?.message}
              required
              {...register("email")}
            />
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-slate-700 mb-1.5">
                كلمة المرور <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  aria-invalid={!!errors.password}
                  aria-describedby={errors.password ? "password-error" : undefined}
                  className={`w-full px-4 py-2.5 rounded-xl border transition-colors text-right focus:outline-none ${
                    errors.password
                      ? "border-red-300 focus:border-red-500 bg-red-50/50"
                      : "border-slate-200 focus:border-sky-500"
                  }`}
                  {...register("password")}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  aria-label={showPassword ? "إخفاء كلمة المرور" : "إظهار كلمة المرور"}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {errors.password && (
                <p id="password-error" className="text-red-500 text-xs mt-1" role="alert">
                  {errors.password.message}
                </p>
              )}
            </div>
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 text-sm text-slate-600 cursor-pointer">
                <input type="checkbox" className="accent-sky-500 rounded" {...register("rememberMe")} />
                تذكرني
              </label>
              <Link href="/forgot-password" className="text-sm text-sky-600 hover:text-sky-700">
                نسيت كلمة المرور؟
              </Link>
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="btn-primary w-full justify-center py-3 text-base disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  جاري تسجيل الدخول...
                </>
              ) : (
                "تسجيل الدخول"
              )}
            </button>
          </form>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-200" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-white px-3 text-slate-500">أو</span>
            </div>
          </div>

          <button className="w-full py-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 transition-colors font-medium text-sm flex items-center justify-center gap-2">
            تسجيل الدخول عبر Google
          </button>

          <p className="text-center text-sm text-slate-500 mt-6">
            ليس لديك حساب؟{" "}
            <Link href="/register" className="text-sky-600 hover:text-sky-700 font-medium">
              أنشئ حساباً جديداً
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
