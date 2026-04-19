import type { Metadata } from "next";
import { Breadcrumb } from "@/components/ui";
import { Shield, Lock, Eye, Server, Database, Bell } from "lucide-react";

export const metadata: Metadata = {
  title: "سياسة الأمان",
  description: "سياسة الأمان وحماية البيانات في منصة خبور",
};

const securityFeatures = [
  {
    icon: Lock,
    title: "تشفير البيانات",
    description: "نستخدم تشفير SSL/TLS لجميع البيانات المنقولة بين جهازك وخوادمنا. جميع المعاملات المالية مشفرة ومحمية.",
  },
  {
    icon: Shield,
    title: "حماية الدفع",
    description: "نلتزم بمعايير PCI DSS for secure payments. لا نخزن أي بيانات بطاقات ائتمانية على خوادمنا.",
  },
  {
    icon: Eye,
    title: "مراقبة مستمرة",
    description: "نراقب أنظمتنا على مدار الساعة للكشف عن أي نشاط مشبوه أو محاولات اختراق.",
  },
  {
    icon: Database,
    title: "نسخ احتياطي",
    description: "نأخذ نسخ احتياطية منتظمة من بياناتنا لضمان استعادتها في حالة أي طوارئ.",
  },
  {
    icon: Bell,
    title: "إشعارات أمنية",
    description: "نخطرك فوراً عبر البريد الإلكتروني أو SMS لأي نشاط مشبوه في حسابك.",
  },
  {
    icon: Server,
    title: "خوادم آمنة",
    description: "نستضيف بياناتك على خوادم مؤمنة في مراكز بيانات محمية的高级.",
  },
];

const dataProtection = [
  "نجمع فقط البيانات الضرورية لتقديم خدماتنا",
  "لا نبيع بياناتك الشخصية لأي طرف ثالث",
  "يمكنك طلب حذف بياناتك في أي وقت",
  "نحتفظ بالبيانات لفترة محددة وفقاً للقانون",
];

export default function SecurityPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <Breadcrumb items={[{ label: "الرئيسية", href: "/" }, { label: "سياسة الأمان" }]} />

      <div className="card p-6 md:p-10 mb-8">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center">
            <Shield size={32} className="text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-extrabold text-slate-800">سياسة الأمان</h1>
            <p className="text-slate-500">كيف نحمي بياناتك ومعلوماتك</p>
          </div>
        </div>

        <div className="space-y-6 text-slate-600 leading-relaxed" dir="rtl">
          <p>
            في <strong className="text-slate-800">خبور</strong>، نعتبر أمان بياناتك أولوية قصوى. نستخدم أحدث التقنيات والممارسات الأمنية لحماية معلوماتك الشخصية والمعاملات المالية.
          </p>
        </div>
      </div>

      {/* Security Features */}
      <div className="mb-8">
        <h2 className="text-xl font-bold text-slate-800 mb-4">ميزات الأمان</h2>
        <div className="grid md:grid-cols-2 gap-4">
          {securityFeatures.map((feature) => (
            <div key={feature.title} className="card p-5">
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-xl bg-sky-50 flex items-center justify-center shrink-0">
                  <feature.icon size={22} className="text-sky-600" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-800 mb-1">{feature.title}</h3>
                  <p className="text-sm text-slate-600">{feature.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Data Protection */}
      <div className="card p-6 md:p-10 mb-8">
        <h2 className="text-xl font-bold text-slate-800 mb-4">حماية البيانات</h2>
        <ul className="space-y-3">
          {dataProtection.map((item, index) => (
            <li key={index} className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center shrink-0 mt-0.5">
                <span className="text-emerald-600 text-sm">✓</span>
              </div>
              <span className="text-slate-600">{item}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Contact Security */}
      <div className="card p-6 md:p-10">
        <h2 className="text-xl font-bold text-slate-800 mb-4">الإبلاغ عن ثغرات</h2>
        <p className="text-slate-600 mb-4">
          إذا اكتشفت أي ثغرة أمنية، نرجو الإبلاغ عنها فوراً عبر البريد الإلكتروني:
        </p>
        <a
          href="mailto:security@khuboor.com"
          className="inline-flex items-center gap-2 text-sky-600 hover:underline font-medium"
        >
          security@khuboor.com
        </a>
      </div>
    </div>
  );
}