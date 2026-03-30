import type { Metadata } from "next";
import { Breadcrumb } from "@/components/ui";

export const metadata: Metadata = {
  title: "سياسة الخصوصية",
  description: "سياسة الخصوصية وحماية البيانات الشخصية في منصة خبور",
};

export default function PrivacyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <Breadcrumb items={[{ label: "الرئيسية", href: "/" }, { label: "سياسة الخصوصية" }]} />

      <div className="card p-6 md:p-10">
        <h1 className="text-3xl font-extrabold text-slate-800 mb-6">سياسة الخصوصية</h1>
        <p className="text-slate-500 mb-8">آخر تحديث: يناير 2026</p>

        <div className="prose prose-slate max-w-none space-y-8" dir="rtl">
          <section>
            <h2 className="text-xl font-bold text-slate-800 mb-3">1. مقدمة</h2>
            <p className="text-slate-600 leading-relaxed">
              نحن في منصة خبور نحترم خصوصيتك ونلتزم بحماية بياناتك الشخصية. تشرح هذه السياسة كيفية جمع واستخدام وحماية المعلومات التي تقدمها لنا عند استخدامك لمنصتنا.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-800 mb-3">2. المعلومات التي نجمعها</h2>
            <ul className="list-disc list-inside space-y-2 text-slate-600">
              <li>معلومات الحساب: الاسم، البريد الإلكتروني، رقم الجوال</li>
              <li>معلومات الشحن: العناوين ومعلومات الاتصال</li>
              <li>معلومات الدفع: تتم معالجتها عبر بوابات دفع آمنة ولا نخزنها</li>
              <li>سجل الطلبات والتصفح: لتحسين تجربتك وتقديم توصيات مخصصة</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-800 mb-3">3. كيفية استخدام المعلومات</h2>
            <ul className="list-disc list-inside space-y-2 text-slate-600">
              <li>معالجة وتسليم طلباتك</li>
              <li>تحسين خدماتنا وتجربة المستخدم</li>
              <li>إرسال إشعارات حول حالة طلباتك</li>
              <li>التواصل معك بخصوص العروض والتحديثات (بموافقتك)</li>
              <li>منع الاحتيال وضمان أمان المنصة</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-800 mb-3">4. حماية المعلومات</h2>
            <p className="text-slate-600 leading-relaxed">
              نتخذ إجراءات أمنية صارمة لحماية بياناتك من الوصول غير المصرح به أو التغيير أو الإفصاح أو الإتلاف. نستخدم تشفير SSL لحماية البيانات أثناء النقل، ونخزن البيانات على خوادم آمنة.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-800 mb-3">5. مشاركة المعلومات</h2>
            <p className="text-slate-600 leading-relaxed">
              لا نبيع أو نؤجر أو نتاجر ببياناتك الشخصية مع أطراف ثالثة. قد نشارك بياناتك مع:
            </p>
            <ul className="list-disc list-inside space-y-2 text-slate-600 mt-2">
              <li>شركات الشحن والتوصيل لتسليم طلباتك</li>
              <li>بوابات الدفع لمعالجة المدفوعات</li>
              <li>الجهات الحكومية عند الطلب القانوني</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-800 mb-3">6. حقوقك</h2>
            <ul className="list-disc list-inside space-y-2 text-slate-600">
              <li>الوصول إلى بياناتك الشخصية وتحديثها</li>
              <li>طلب حذف بياناتك</li>
              <li>إلغاء الاشتراك في الرسائل التسويقية</li>
              <li>تصدير بياناتك</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-800 mb-3">7. التواصل معنا</h2>
            <p className="text-slate-600 leading-relaxed">
              إذا كان لديك أي استفسار حول سياسة الخصوصية، يمكنك التواصل معنا عبر البريد الإلكتروني: privacy@khuboor.com
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
