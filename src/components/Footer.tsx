import Link from "next/link";
import { Phone, Mail, MapPin, Send, MessageCircle, Heart } from "lucide-react";

const footerLinks = {
  shop: [
    { label: "الرئيسية", href: "/" },
    { label: "المنتجات", href: "/search" },
    { label: "التصنيفات", href: "/search" },
    { label: "عروض خاصة", href: "/search?featured=true" },
  ],
  sell: [
    { label: "ابدأ البيع", href: "/sell" },
    { label: "كيف يعمل؟", href: "/sell#how" },
    { label: "الأسئلة الشائعة", href: "/faq" },
  ],
  support: [
    { label: "اتصل بنا", href: "/contact" },
    { label: "سياسة الخصوصية", href: "/privacy" },
    { label: "الشروط والأحكام", href: "/terms" },
    { label: "سياسة الاستبدال", href: "/exchange-policy" },
  ],
};

const socialLinks = [
  { icon: Send, href: "#", label: "تلغرام" },
  { icon: MessageCircle, href: "#", label: "واتساب" },
  { icon: Heart, href: "#", label: "انستغرام" },
];

export default function Footer() {
  return (
    <footer className="bg-slate-900 dark:bg-black text-slate-400 mt-8">
      {/* Main footer content */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand column */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center text-white font-bold text-lg shadow-lg">
                خ
              </div>
              <div>
                <span className="text-white text-lg font-bold">خبور</span>
                <p className="text-slate-500 text-xs">كل شيء في مكان واحد</p>
              </div>
            </Link>
            <p className="text-sm text-slate-400 mb-4 leading-relaxed">
              منصتك الأولى للتسوق الإلكتروني في اليمن. سيارات، ملابس، قطع غيار، مواد بناء وإكسسوارات.
            </p>
            <div className="space-y-2">
              <a href="https://wa.me/967779816860" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm hover:text-sky-400 transition-colors">
                <Phone size={16} className="text-sky-500" />
                <span dir="ltr">+967 779 816 860</span>
              </a>
              <a href="mailto:alkarime0@gmail.com" className="flex items-center gap-2 text-sm hover:text-sky-400 transition-colors">
                <Mail size={16} className="text-sky-500" />
                <span>alkarime0@gmail.com</span>
              </a>
              <div className="flex items-center gap-2 text-sm">
                <MapPin size={16} className="text-sky-500" />
                <span>اليمن - صنعاء</span>
              </div>
            </div>
          </div>

          {/* Shop links */}
          <div>
            <h3 className="text-white font-bold mb-4">تسوق</h3>
            <ul className="space-y-2">
              {footerLinks.shop.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm hover:text-sky-400 transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Sell links */}
          <div>
            <h3 className="text-white font-bold mb-4">بيع معنا</h3>
            <ul className="space-y-2">
              {footerLinks.sell.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm hover:text-sky-400 transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support links */}
          <div>
            <h3 className="text-white font-bold mb-4">الدعم</h3>
            <ul className="space-y-2">
              {footerLinks.support.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm hover:text-sky-400 transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            
            {/* Social links */}
            <div className="mt-6">
              <h4 className="text-white text-sm font-semibold mb-3">تابعنا</h4>
              <div className="flex gap-3">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    className="w-9 h-9 rounded-lg bg-slate-800 flex items-center justify-center hover:bg-sky-500 hover:text-white transition-all"
                    aria-label={social.label}
                  >
                    <social.icon size={18} />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-slate-500">
              © {new Date().getFullYear()} خبور - جميع الحقوق محفوظة
            </p>
            <div className="flex items-center gap-4 text-xs text-slate-500">
              <span>صنع بـ</span>
              <span className="text-red-500">❤</span>
              <span>في اليمن</span>
              <span aria-hidden="true">🇾🇪</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}