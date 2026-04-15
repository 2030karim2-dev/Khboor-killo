"use client";

import { Eye, EyeOff, Loader2 } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema, type RegisterInput } from "@/lib/validations";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/contexts/ToastContext";
import FormField from "@/components/ui/FormField";

export default function RegisterForm({ onSuccess }: { onSuccess?: () => void }) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const { register: registerUser } = useAuth();
  const { success, error } = useToast();

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterInput) => {
    const result = await registerUser({ firstName: data.firstName, lastName: data.lastName, email: data.email, phone: data.phone, password: data.password });
    if (result) { success("تم إنشاء الحساب بنجاح!"); onSuccess?.(); }
    else { error("حدث خطأ أثناء إنشاء الحساب."); }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
      <div className="grid grid-cols-2 gap-4">
        <FormField label="الاسم الأول" placeholder="أحمد" error={errors.firstName?.message} required {...register("firstName")} />
        <FormField label="الاسم الأخير" placeholder="محمد" error={errors.lastName?.message} required {...register("lastName")} />
      </div>
      <FormField label="البريد الإلكتروني" type="email" placeholder="example@email.com" dir="ltr" error={errors.email?.message} required {...register("email")} />
      <FormField label="رقم الجوال" type="tel" placeholder="05xxxxxxxx" dir="ltr" error={errors.phone?.message} required {...register("phone")} />

      <div>
        <label htmlFor="reg-password" className="block text-sm font-medium text-slate-700 mb-1.5">كلمة المرور <span className="text-red-500">*</span></label>
        <div className="relative">
          <input id="reg-password" type={showPassword ? "text" : "password"} placeholder="••••••••" aria-invalid={!!errors.password} className={`w-full px-4 py-2.5 rounded-xl border transition-colors focus:outline-none ${errors.password ? "border-red-300 focus:border-red-500 bg-red-50/50" : "border-slate-200 focus:border-sky-500"}`} {...register("password")} />
          <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600" aria-label={showPassword ? "إخفاء" : "إظهار"}>
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>
        {errors.password && <p className="text-red-500 text-xs mt-1" role="alert">{errors.password.message}</p>}
      </div>

      <div>
        <label htmlFor="confirm-password" className="block text-sm font-medium text-slate-700 mb-1.5">تأكيد كلمة المرور <span className="text-red-500">*</span></label>
        <div className="relative">
          <input id="confirm-password" type={showConfirm ? "text" : "password"} placeholder="••••••••" aria-invalid={!!errors.confirmPassword} className={`w-full px-4 py-2.5 rounded-xl border transition-colors focus:outline-none ${errors.confirmPassword ? "border-red-300 focus:border-red-500 bg-red-50/50" : "border-slate-200 focus:border-sky-500"}`} {...register("confirmPassword")} />
          <button type="button" onClick={() => setShowConfirm(!showConfirm)} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600" aria-label={showConfirm ? "إخفاء" : "إظهار"}>
            {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>
        {errors.confirmPassword && <p className="text-red-500 text-xs mt-1" role="alert">{errors.confirmPassword.message}</p>}
      </div>

      <div className="flex items-start gap-2">
        <input type="checkbox" id="terms" className="accent-sky-500 rounded mt-1" {...register("terms")} />
        <label htmlFor="terms" className="text-sm text-slate-600">أوافق على <a href="/terms" className="text-sky-600 hover:text-sky-700">الشروط</a> و <a href="/privacy" className="text-sky-600 hover:text-sky-700">الخصوصية</a></label>
      </div>
      {errors.terms && <p className="text-red-500 text-xs" role="alert">{errors.terms.message}</p>}

      <button type="submit" disabled={isSubmitting} className="btn-primary w-full justify-center py-3 text-base disabled:opacity-60 disabled:cursor-not-allowed">
        {isSubmitting ? <><Loader2 size={18} className="animate-spin" /> جاري إنشاء الحساب...</> : "إنشاء الحساب"}
      </button>
    </form>
  );
}
