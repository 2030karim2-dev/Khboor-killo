import type { Metadata } from "next";
import { Breadcrumb } from "@/components/ui";

export const metadata: Metadata = {
  title: "الشروط والأحكام",
  description: "الشروط والأحكام لاستخدام منصة خبور للتجارة الإلكترونية",
};

export default function TermsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <Breadcrumb items={[{ label: "الرئيسية", href: "/" }, { label: "الشروط والأحكام" }]} />

      <div className="card p-6 md:p-10">
        <h1 className="text-3xl font-extrabold text-slate-800 mb-6">الشروط والأحكام</h1>
        <p className="text-slate-500 mb-8">آخر تحديث: يناير 2026</p>

        <div className="prose prose-slate max-w-none space-y-8" dir="rtl">
          <section>
            <h2 className="text-xl font-bold text-slate-800 mb-3">1. القبول بالشروط</h2>
            <p className="text-slate-600 leading-relaxed">
              باستخدامك لمنصة خبور، فإنك توافق على الالتزام بهذه الشروط والأحكام. إذا كنت لا توافق على أي جزء منها، يرجى عدم استخدام المنصة.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-800 mb-3">2. استخدام المنصة</h2>
            <ul className="list-disc list-inside space-y-2 text-slate-600">
              <li>يجب أن يكون عمرك 18 عاماً أو أكثر لاستخدام المنصة</li>
              <li>تتعهد بتقديم معلومات صحيحة ودقيقة عند التسجيل</li>
              <li>أنت مسؤول عن الحفاظ على سرية بيانات حسابك</li>
              <li>يُمنع استخدام المنصة لأي أغراض غير مشروعة</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-800 mb-3">3. المنتجات والطلبات</h2>
            <ul className="list-disc list-inside space-y-2 text-slate-600">
              <li>جميع الأسعار معروضة بالريال السعودي وشاملة ضريبة القيمة المضافة</li>
              <li>نحتفظ بالحق في تعديل الأسعار دون إشعار مسبق</li>
              <li>تأكيد الطلب لا يعني تأكيد التوفر</li>
              <li>يحق لنا رفض أو إلغاء أي طلب في حالة وجود خطأ في السعر أو الوصف</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-800 mb-3">4. الدفع والتوصيل</h2>
            <ul className="list-disc list-inside space-y-2 text-slate-600">
              <li>الدفع متاح عبر البطاقات الائتمانية أو الدفع عند الاستلام</li>
              <li>مدة التوصيل تختلف حسب الموقع ونوع المنتج</li>
              <li>الشحن مجاني للطلبات فوق 200 ريال</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-800 mb-3">5. الإرجاع والاستبدال</h2>
            <ul className="list-disc list-inside space-y-2 text-slate-600">
              <li>يمكنك إرجاع المنتج خلال 14 يوماً من تاريخ الاستلام</li>
              <li>يجب أن يكون المنتج في حالته الأصلية وغير مستخدم</li>
              <li>بعض المنتجات غير قابلة للإرجاع (المنتجات القابلة للتلف، الملابس الداخلية)</li>
              <li>يتم استرداد المبلغ خلال 7-14 يوم عمل</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-800 mb-3">6. البائعون</h2>
            <ul className="list-disc list-inside space-y-2 text-slate-600">
              <li>البائعون مسؤولون عن دقة وصف منتجاتهم</li>
              <li>البائعون مسؤولون عن توصيل المنتجات في الوقت المحدد</li>
              <li>تحتفظ خبور بالحق في إيقاف حساب أي بائع يخالف الشروط</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-800 mb-3">7. الملكية الفكرية</h2>
            <p className="text-slate-600 leading-relaxed">
              جميع المحتوى والعلامات التجارية والشعارات الموجودة على المنصة هي ملك لخبور أو مرخصيها. يُمنع نسخ أو استخدام أي محتوى دون إذن كتابي.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-800 mb-3">8. القانون الحاكم</h2>
            <p className="text-slate-600 leading-relaxed">
              تخضع هذه الشروط لقوانين المملكة العربية السعودية. أي نزاع ينشأ عنها يتم حله وفقاً للأنظمة المعمول بها.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
