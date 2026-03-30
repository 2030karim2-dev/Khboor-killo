"use client";

import { useState } from "react";
import type { Metadata } from "next";
import { Breadcrumb } from "@/components/ui";
import { useToast } from "@/lib/ToastContext";
import { Mail, Phone, MapPin, Clock, Loader2 } from "lucide-react";

const contactInfo = [
  { icon: Phone, label: "الهاتف", value: "920001234", dir: "ltr" as const },
  { icon: Mail, label: "البريد الإلكتروني", value: "support@khuboor.com", dir: "ltr" as const },
  { icon: MapPin, label: "العنوان", value: "الرياض، المملكة العربية السعودية", dir: undefined },
  { icon: Clock, label: "ساعات العمل", value: "السبت - الخميس: 9 صباحاً - 9 مساءً", dir: undefined },
];

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { success, error } = useToast();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const name = form.get("name") as string;
    const email = form.get("email") as string;
    const message = form.get("message") as string;

    if (!name || !email || !message) {
      error("يرجى ملء جميع الحقول المطلوبة");
      return;
    }

    setIsSubmitting(true);
    await new Promise((r) => setTimeout(r, 1000));
    setIsSubmitting(false);
    success("تم إرسال رسالتك بنجاح! سنتواصل معك قريباً");
    (e.target as HTMLFormElement).reset();
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <Breadcrumb items={[{ label: "الرئيسية", href: "/" }, { label: "اتصل بنا" }]} />

      <h1 className="text-3xl font-extrabold text-slate-800 mb-8">اتصل بنا</h1>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="card p-6">
          <h2 className="text-lg font-bold text-slate-800 mb-4">أرسل لنا رسالة</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="contact-name" className="block text-sm font-medium text-slate-700 mb-1.5">
                الاسم <span className="text-red-500">*</span>
              </label>
              <input
                id="contact-name"
                name="name"
                type="text"
                required
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-sky-500 focus:outline-none text-right"
                placeholder="اسمك الكامل"
              />
            </div>
            <div>
              <label htmlFor="contact-email" className="block text-sm font-medium text-slate-700 mb-1.5">
                البريد الإلكتروني <span className="text-red-500">*</span>
              </label>
              <input
                id="contact-email"
                name="email"
                type="email"
                required
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-sky-500 focus:outline-none"
                placeholder="example@email.com"
                dir="ltr"
              />
            </div>
            <div>
              <label htmlFor="contact-subject" className="block text-sm font-medium text-slate-700 mb-1.5">
                الموضوع
              </label>
              <select
                id="contact-subject"
                name="subject"
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-sky-500 focus:outline-none bg-white"
              >
                <option value="general">استفسار عام</option>
                <option value="order">استفسار عن طلب</option>
                <option value="complaint">شكوى</option>
                <option value="suggestion">اقتراح</option>
                <option value="seller">البيع على المنصة</option>
              </select>
            </div>
            <div>
              <label htmlFor="contact-message" className="block text-sm font-medium text-slate-700 mb-1.5">
                الرسالة <span className="text-red-500">*</span>
              </label>
              <textarea
                id="contact-message"
                name="message"
                rows={5}
                required
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-sky-500 focus:outline-none text-right resize-none"
                placeholder="اكتب رسالتك هنا..."
              />
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="btn-primary w-full justify-center disabled:opacity-60"
            >
              {isSubmitting ? (
                <><Loader2 size={18} className="animate-spin" /> جاري الإرسال...</>
              ) : (
                "إرسال الرسالة"
              )}
            </button>
          </form>
        </div>

        <div className="space-y-6">
          <div className="card p-6">
            <h2 className="text-lg font-bold text-slate-800 mb-4">معلومات التواصل</h2>
            <div className="space-y-4">
              {contactInfo.map((info) => (
                <div key={info.label} className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-sky-50 flex items-center justify-center shrink-0">
                    <info.icon size={18} className="text-sky-600" />
                  </div>
                  <div>
                    <p className="text-sm text-slate-500">{info.label}</p>
                    <p className="font-medium text-slate-800" dir={info.dir}>{info.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="card p-6">
            <h2 className="text-lg font-bold text-slate-800 mb-4">الأسئلة الشائعة</h2>
            <p className="text-slate-600 text-sm mb-3">
              هل لديك سؤال؟ قد تجد الإجابة في صفحة الأسئلة الشائعة.
            </p>
            <a href="/faq" className="btn-outline text-sm">
              تصفح الأسئلة الشائعة
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
