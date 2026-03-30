"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema, type RegisterInput } from "@/lib/validations";
import { useAuth } from "@/lib/AuthContext";
import { useToast } from "@/lib/ToastContext";
import FormField from "@/components/ui/FormField";

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const { register: registerUser } = useAuth();
  const { success, error } = useToast();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterInput) => {
    const result = await registerUser({
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      phone: data.phone,
      password: data.password,
    });
    if (result) {
      success("تم إنشاء الحساب بنجاح! مرحباً بك في خبور");
      router.push("/");
    } else {
      error("حدث خطأ أثناء إنشاء الحساب. يرجى المحاولة مرة أخرى.");
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
          <h1 className="text-2xl font-extrabold text-slate-800">إنشاء حساب جديد</h1>
          <p className="text-slate-500 mt-1">انضم إلى عائلة خبور اليوم</p>
        </div>

        <div className="card p-6">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
            <div className="grid grid-cols-2 gap-4">
              <FormField
                label="الاسم الأول"
                placeholder="أحمد"
                error={errors.firstName?.message}
                required
                {...register("firstName")}
              />
              <FormField
                label="الاسم الأخير"
                placeholder="محمد"
                error={errors.lastName?.message}
                required
                {...register("lastName")}
              />
            </div>
            <FormField
              label="البريد الإلكتروني"
              type="email"
              placeholder="example@email.com"
              dir="ltr"
              error={errors.email?.message}
              required
              {...register("email")}
            />
            <FormField
              label="رقم الجوال"
              type="tel"
              placeholder="05xxxxxxxx"
              dir="ltr"
              error={errors.phone?.message}
              required
              {...register("phone")}
            />

            <div>
              <label htmlFor="reg-password" className="block text-sm font-medium text-slate-700 mb-1.5">
                كلمة المرور <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  id="reg-password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  aria-invalid={!!errors.password}
                  className={`w-full px-4 py-2.5 rounded-xl border transition-colors focus:outline-none ${
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
                <p className="text-red-500 text-xs mt-1" role="alert">{errors.password.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="confirm-password" className="block text-sm font-medium text-slate-700 mb-1.5">
                تأكيد كلمة المرور <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  id="confirm-password"
                  type={showConfirm ? "text" : "password"}
                  placeholder="••••••••"
                  aria-invalid={!!errors.confirmPassword}
                  className={`w-full px-4 py-2.5 rounded-xl border transition-colors focus:outline-none ${
                    errors.confirmPassword
                      ? "border-red-300 focus:border-red-500 bg-red-50/50"
                      : "border-slate-200 focus:border-sky-500"
                  }`}
                  {...register("confirmPassword")}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirm(!showConfirm)}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  aria-label={showConfirm ? "إخفاء كلمة المرور" : "إظهار كلمة المرور"}
                >
                  {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="text-red-500 text-xs mt-1" role="alert">{errors.confirmPassword.message}</p>
              )}
            </div>

            <div className="flex items-start gap-2">
              <input
                type="checkbox"
                id="terms"
                className="accent-sky-500 rounded mt-1"
                {...register("terms")}
              />
              <label htmlFor="terms" className="text-sm text-slate-600">
                أوافق على{" "}
                <Link href="/terms" className="text-sky-600 hover:text-sky-700">الشروط والأحكام</Link>
                {" "}و{" "}
                <Link href="/privacy" className="text-sky-600 hover:text-sky-700">سياسة الخصوصية</Link>
              </label>
            </div>
            {errors.terms && (
              <p className="text-red-500 text-xs" role="alert">{errors.terms.message}</p>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="btn-primary w-full justify-center py-3 text-base disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  جاري إنشاء الحساب...
                </>
              ) : (
                "إنشاء الحساب"
              )}
            </button>
          </form>

          <p className="text-center text-sm text-slate-500 mt-6">
            لديك حساب بالفعل؟{" "}
            <Link href="/login" className="text-sky-600 hover:text-sky-700 font-medium">تسجيل الدخول</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
