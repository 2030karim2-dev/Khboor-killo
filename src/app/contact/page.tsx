"use client";

import Link from "next/link";
import { Breadcrumb } from "@/components/ui";
import ContactForm from "@/components/ContactForm";
import { Mail, Phone, MapPin, Clock } from "lucide-react";

const contactInfo = [
  { icon: Phone, label: "الهاتف", value: "+967 779 816 860", dir: "ltr" as const },
  { icon: Mail, label: "البريد الإلكتروني", value: "alkarime0@gmail.com", dir: "ltr" as const },
  { icon: MapPin, label: "العنوان", value: "اليمن 🇾🇪", dir: undefined },
  { icon: Clock, label: "ساعات العمل", value: "السبت - الخميس: 9 صباحاً - 9 مساءً", dir: undefined },
];

export default function ContactPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <Breadcrumb items={[{ label: "الرئيسية", href: "/" }, { label: "اتصل بنا" }]} />

      <h1 className="text-3xl font-extrabold text-slate-800 mb-8">اتصل بنا</h1>

      <div className="grid md:grid-cols-2 gap-8">
        <ContactForm />

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
            <Link href="/faq" className="btn-outline text-sm">
              تصفح الأسئلة الشائعة
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
