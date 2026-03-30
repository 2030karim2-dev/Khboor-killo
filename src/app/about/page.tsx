import type { Metadata } from "next";
import { Breadcrumb } from "@/components/ui";
import { Shield, Truck, Users, Award } from "lucide-react";

export const metadata: Metadata = {
  title: "من نحن",
  description: "تعرف على منصة خبور - منصة البيع والشراء الإلكترونية الرائدة في المملكة العربية السعودية",
};

const stats = [
  { value: "+10K", label: "مستخدم نشط" },
  { value: "+5K", label: "منتج متوفر" },
  { value: "+500", label: "بائع موثوق" },
  { value: "99%", label: "رضا العملاء" },
];

const values = [
  { icon: Shield, title: "الأمان", desc: "نحمي بياناتك ومعاملاتك بأعلى معايير الأمان" },
  { icon: Truck, title: "التوصيل السريع", desc: "نوفر خدمة توصيل سريعة لجميع مدن المملكة" },
  { icon: Users, title: "خدمة العملاء", desc: "فريق دعم متاح على مدار الساعة لمساعدتك" },
  { icon: Award, title: "الجودة", desc: "نضمن جودة المنتجات المتوفرة على منصتنا" },
];

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <Breadcrumb items={[{ label: "الرئيسية", href: "/" }, { label: "من نحن" }]} />

      <div className="card p-6 md:p-10 mb-8">
        <h1 className="text-3xl font-extrabold text-slate-800 mb-6">من نحن</h1>

        <div className="space-y-6 text-slate-600 leading-relaxed" dir="rtl">
          <p>
            <strong className="text-slate-800">خبور</strong> هي منصة تجارة إلكترونية سعودية تأسست بهدف توفير تجربة تسوق متميزة وموثوقة. نجمع بين التكنولوجيا المتقدمة وخدمة العملاء الممتازة لنقدم لك أفضل تجربة شراء عبر الإنترنت.
          </p>
          <p>
            نوفر تنوعاً واسعاً من المنتجات تشمل السيارات وقطع الغيار والملابس ومواد البناء والإكسسوارات، كل ذلك في مكان واحد لتسهيل تجربة التسوق عليك.
          </p>
          <p>
            نؤمن بأن التجارة الإلكترونية يجب أن تكون سهلة وآمنة وموثوقة، ولهذا السبب نعمل باستمرار على تطوير منصتنا وتحسين خدماتنا.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {stats.map((stat) => (
          <div key={stat.label} className="card p-5 text-center">
            <p className="text-2xl font-extrabold text-sky-600">{stat.value}</p>
            <p className="text-sm text-slate-500">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="card p-6 md:p-10">
        <h2 className="text-xl font-bold text-slate-800 mb-6">قيمنا</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {values.map((val) => (
            <div key={val.title} className="flex gap-4">
              <div className="w-12 h-12 rounded-xl bg-sky-50 flex items-center justify-center shrink-0">
                <val.icon size={22} className="text-sky-600" />
              </div>
              <div>
                <h3 className="font-bold text-slate-800">{val.title}</h3>
                <p className="text-sm text-slate-600">{val.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
