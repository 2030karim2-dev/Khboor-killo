"use client";

import { useState } from "react";
import Link from "next/link";
import { Loader2, ArrowRight } from "lucide-react";
import { useToast } from "@/lib/ToastContext";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { success, error } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.includes("@")) {
      error("يرجى إدخال بريد إلكتروني صحيح");
      return;
    }
    setIsSubmitting(true);
    await new Promise((r) => setTimeout(r, 1000));
    setIsSubmitting(false);
    setSent(true);
    success("تم إرسال رابط إعادة التعيين إلى بريدك");
  };

  if (sent) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md text-center animate-fade-in">
          <div className="text-6xl mb-6">📧</div>
          <h1 className="text-2xl font-extrabold text-slate-800 mb-3">تم الإرسال!</h1>
          <p className="text-slate-500 mb-2">
            أرسلنا رابط إعادة تعيين كلمة المرور إلى
          </p>
          <p className="text-sky-600 font-medium mb-6">{email}</p>
          <p className="text-sm text-slate-400 mb-8">
            تحقق من بريدك الوارد وصندوق الرسائل غير المرغوب فيها
          </p>
          <Link href="/login" className="btn-primary">
            <ArrowRight size={18} />
            العودة لتسجيل الدخول
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md animate-slide-up">
        <div className="text-center mb-8">
          <Link href="/" className="inline-block mb-4">
            <div className="w-16 h-16 rounded-2xl gradient-primary flex items-center justify-center text-white font-bold text-3xl mx-auto">
              خ
            </div>
          </Link>
          <h1 className="text-2xl font-extrabold text-slate-800">نسيت كلمة المرور؟</h1>
          <p className="text-slate-500 mt-1">لا تقلق، سنساعدك في استعادتها</p>
        </div>

        <div className="card p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="forgot-email" className="block text-sm font-medium text-slate-700 mb-1.5">
                البريد الإلكتروني <span className="text-red-500">*</span>
              </label>
              <input
                id="forgot-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="example@email.com"
                dir="ltr"
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-sky-500 focus:outline-none transition-colors"
              />
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="btn-primary w-full justify-center py-3 text-base disabled:opacity-60"
            >
              {isSubmitting ? (
                <><Loader2 size={18} className="animate-spin" /> جاري الإرسال...</>
              ) : (
                "إرسال رابط الاستعادة"
              )}
            </button>
          </form>

          <div className="text-center mt-6">
            <Link href="/login" className="text-sm text-sky-600 hover:text-sky-700 font-medium">
              <ArrowRight size={14} className="inline-block ml-1" />
              العودة لتسجيل الدخول
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
