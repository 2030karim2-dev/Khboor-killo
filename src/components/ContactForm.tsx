"use client";

import { useState } from "react";
import { Loader2 } from "lucide-react";
import { useToast } from "@/lib/ToastContext";
import { FormTextarea, FormSelect, FormActions } from "@/components/ui/FormElements";
import FormField from "@/components/ui/FormField";

export default function ContactForm() {
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
    <div className="card p-6">
      <h2 className="text-lg font-bold text-slate-800 mb-4">أرسل لنا رسالة</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <FormField label="الاسم" name="name" required placeholder="اسمك الكامل" />
        <FormField label="البريد الإلكتروني" name="email" type="email" required placeholder="example@email.com" dir="ltr" />
        <FormSelect
          label="الموضوع"
          name="subject"
          options={[
            { value: "general", label: "استفسار عام" },
            { value: "order", label: "استفسار عن طلب" },
            { value: "complaint", label: "شكوى" },
            { value: "suggestion", label: "اقتراح" },
            { value: "seller", label: "البيع على المنصة" },
          ]}
        />
        <FormTextarea label="الرسالة" name="message" rows={5} required placeholder="اكتب رسالتك هنا..." />
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
  );
}
