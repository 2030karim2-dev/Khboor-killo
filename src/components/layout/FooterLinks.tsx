import Link from "next/link";
import { categories } from "@/data/categories";

const quickLinks = [
  { label: "بيع معنا", href: "/sell" },
  { label: "حسابي", href: "/account" },
  { label: "سياسة الخصوصية", href: "/privacy" },
  { label: "الشروط والأحكام", href: "/terms" },
  { label: "الأسئلة الشائعة", href: "/faq" },
  { label: "اتصل بنا", href: "/contact" },
  { label: "من نحن", href: "/about" },
];

export default function FooterLinks() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
      {/* About */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center text-white font-bold text-xl">
            خ
          </div>
          <div>
            <h2 className="text-white text-xl font-bold">خبور</h2>
            <p className="text-xs text-slate-400">كل شيء في مكان واحد</p>
          </div>
        </div>
        <p className="text-sm leading-relaxed">
          خبور هو منصة البيع والشراء الإلكترونية الرائدة في المملكة. نوفر لك
          كل ما تحتاجه من سيارات وقطع غيار وملابس ومواد بناء وإكسسوارات.
        </p>
      </div>

      {/* Categories */}
      <div>
        <h3 className="text-white font-bold mb-4">الأقسام</h3>
        <ul className="space-y-2.5">
          {categories.map((cat) => (
            <li key={cat.slug}>
              <Link
                href={`/category/${cat.slug}`}
                className="text-sm hover:text-sky-400 transition-colors flex items-center gap-2"
              >
                <span>{cat.icon}</span>
                <span>{cat.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Quick Links */}
      <div>
        <h3 className="text-white font-bold mb-4">روابط سريعة</h3>
        <ul className="space-y-2.5 text-sm">
          {quickLinks.map((link) => (
            <li key={link.label}>
              <Link href={link.href} className="hover:text-sky-400 transition-colors">
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Contact */}
      <div>
        <h3 className="text-white font-bold mb-4">تواصل معنا</h3>
        <ul className="space-y-3 text-sm">
          <li>📞 920001234</li>
          <li>📧 info@khuboor.com</li>
          <li>📍 الرياض، المملكة العربية السعودية</li>
        </ul>
        <div className="mt-4 flex gap-2">
          <div className="bg-slate-800 rounded-xl px-3 py-2 text-xs">
            <p className="text-slate-400">متاح على</p>
            <p className="font-bold text-white">App Store</p>
          </div>
          <div className="bg-slate-800 rounded-xl px-3 py-2 text-xs">
            <p className="text-slate-400">متاح على</p>
            <p className="font-bold text-white">Google Play</p>
          </div>
        </div>
      </div>
    </div>
  );
}
