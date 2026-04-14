"use client";

import { useState } from "react";
import Link from "next/link";
import { Breadcrumb } from "@/components/ui";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    q: "كيف أتتبع طلبي؟",
    a: "يمكنك تتبع طلبك من خلال الدخول إلى حسابك ثم الذهاب إلى 'طلباتي'. ستجد جميع طلباتك مع حالة كل طلب ومعلومات التتبع.",
  },
  {
    q: "ما هي طرق الدفع المتاحة؟",
    a: "نوفر الدفع عبر البطاقات الائتمانية (فيزا / ماستركارد) والدفع عند الاستلام. جميع المعاملات آمنة ومشفرة.",
  },
  {
    q: "كم تستغرق عملية التوصيل؟",
    a: "تختلف مدة التوصيل حسب المدينة. بشكل عام، التوصيل داخل المدينة خلال 1-2 يوم عمل، والمدن الأخرى 2-5 أيام عمل.",
  },
  {
    q: "هل الشحن مجاني؟",
    a: "نعم، الشحن مجاني للطلبات التي تتجاوز 200 ريال. للطلبات أقل من ذلك، تكلفة الشحن 25 ريال.",
  },
  {
    q: "كيف أرجع منتجاً؟",
    a: "يمكنك إرجاع المنتج خلال 14 يوماً من تاريخ الاستلام. انتقل إلى 'طلباتي' واختر الطلب ثم 'طلب إرجاع'. يجب أن يكون المنتج في حالته الأصلية.",
  },
  {
    q: "كيف أصبح بائعاً على المنصة؟",
    a: "يمكنك التسجيل كبائع من خلال الضغط على 'بيع منتج' في القائمة. ستحتاج إلى إكمال بيانات البائع ونشر منتجاتك.",
  },
  {
    q: "هل بياناتي آمنة؟",
    a: "نعم، نحمي بياناتك بأعلى معايير الأمان. نستخدم تشفير SSL ولا نخزن معلومات بطاقتك الائتمانية. راجع سياسة الخصوصية لمزيد من التفاصيل.",
  },
  {
    q: "كيف أغير كلمة المرور؟",
    a: "اذهب إلى 'حسابي' ثم 'الإعدادات' ثم 'الأمان' وستجد خيار تغيير كلمة المرور.",
  },
  {
    q: "هل توجد ضمانة على المنتجات؟",
    a: "تعتمد الضمانة على المنتج والبائع. يمكنك الاطلاع على تفاصيل الضمانة في صفحة المنتج. معظم المنتجات تأتي مع ضمانة من البائع.",
  },
  {
    q: "ما هي سياسة الإرجاع؟",
    a: "يمكنك إرجاع المنتج خلال 14 يوماً إذا كان في حالته الأصلية. بعض المنتجات غير قابلة للإرجاع مثل الملابس الداخلية والمنتجات القابلة للتلف. راجع الشروط والأحكام للتفاصيل.",
  },
];

export default function FaqPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <Breadcrumb items={[{ label: "الرئيسية", href: "/" }, { label: "الأسئلة الشائعة" }]} />

      <div className="card p-6 md:p-10">
        <h1 className="text-3xl font-extrabold text-slate-800 mb-2">الأسئلة الشائعة</h1>
        <p className="text-slate-500 mb-8">إجابات على أكثر الأسئلة شيوعاً</p>

        <div className="space-y-3">
          {faqs.map((faq, index) => (
            <div key={index} className="border border-slate-200 rounded-xl overflow-hidden">
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full flex items-center justify-between p-4 text-right hover:bg-slate-50 transition-colors"
                aria-expanded={openIndex === index}
              >
                <span className="font-medium text-slate-800">{faq.q}</span>
                <ChevronDown
                  size={20}
                  className={`text-slate-400 transition-transform shrink-0 mr-3 ${
                    openIndex === index ? "rotate-180" : ""
                  }`}
                />
              </button>
              {openIndex === index && (
                <div className="px-4 pb-4 text-slate-600 leading-relaxed animate-fade-in">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-8 p-5 bg-sky-50 rounded-xl text-center">
          <p className="text-slate-700 mb-2">لم تجد إجابة لسؤالك؟</p>
          <Link href="/contact" className="btn-primary text-sm">
            تواصل معنا
          </Link>
        </div>
      </div>
    </div>
  );
}
