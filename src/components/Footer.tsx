import Link from "next/link";
import { categories } from "@/lib";

const quickLinks = [
  { label: "بيع معنا", href: "/sell" },
  { label: "حسابي", href: "/account" },
  { label: "سياسة الخصوصية", href: "/privacy" },
  { label: "الشروط والأحكام", href: "/terms" },
  { label: "الأسئلة الشائعة", href: "/faq" },
  { label: "اتصل بنا", href: "/contact" },
  { label: "من نحن", href: "/about" },
];

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 pt-8 pb-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-9 h-9 rounded-lg gradient-primary flex items-center justify-center text-white font-bold text-lg">
                خ
              </div>
              <div>
                <h2 className="text-white text-base font-extrabold leading-tight">خبور</h2>
                <p className="text-[10px] text-sky-400 font-medium">Khuboor</p>
              </div>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed mb-4">
              أول متجر إلكتروني شامل في اليمن 🇾🇪
              <br />
              كل ما تحتاجه من سيارات وقطع غيار وملابس وإكسسوارات ومواد بناء في مكان واحد.
            </p>
            {/* Social */}
            <div className="flex gap-2">
              {[
                { icon: "🌐", label: "الموقع", href: "#" },
                { icon: "💬", label: "واتساب", href: "https://wa.me/967779816860" },
                { icon: "📘", label: "فيسبوك", href: "#" },
                { icon: "📸", label: "إنستغرام", href: "#" },
              ].map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target={s.href.startsWith("http") ? "_blank" : undefined}
                  rel={s.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  aria-label={s.label}
                  className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-sky-600 flex items-center justify-center transition-colors text-sm"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-white text-xs font-bold mb-3 relative pb-2 after:content-[''] after:absolute after:bottom-0 after:right-0 after:w-6 after:h-0.5 after:bg-sky-500 after:rounded-full">
              الأقسام
            </h3>
            <ul className="space-y-2">
              {categories.map((cat) => (
                <li key={cat.slug}>
                  <Link
                    href={`/category/${cat.slug}`}
                    className="text-xs text-slate-400 hover:text-sky-400 transition-colors flex items-center gap-1.5 hover:translate-x-1 transition-transform"
                  >
                    <span className="text-sm">{cat.icon}</span>
                    <span>{cat.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white text-xs font-bold mb-3 relative pb-2 after:content-[''] after:absolute after:bottom-0 after:right-0 after:w-6 after:h-0.5 after:bg-sky-500 after:rounded-full">
              روابط سريعة
            </h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-xs text-slate-400 hover:text-sky-400 transition-colors hover:translate-x-1 transition-transform inline-block"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white text-xs font-bold mb-3 relative pb-2 after:content-[''] after:absolute after:bottom-0 after:right-0 after:w-6 after:h-0.5 after:bg-sky-500 after:rounded-full">
              تواصل معنا
            </h3>
            <ul className="space-y-2.5">
              <li>
                <a
                  href="https://wa.me/967779816860"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-xs text-slate-400 hover:text-green-400 transition-colors"
                >
                  <span className="w-6 h-6 rounded-md bg-green-500/20 flex items-center justify-center text-green-400 shrink-0">
                    📱
                  </span>
                  <span dir="ltr">+967 779 816 860</span>
                </a>
              </li>
              <li>
                <a
                  href="mailto:alkarime0@gmail.com"
                  className="flex items-center gap-2 text-xs text-slate-400 hover:text-sky-400 transition-colors"
                >
                  <span className="w-6 h-6 rounded-md bg-sky-500/20 flex items-center justify-center text-sky-400 shrink-0">
                    ✉️
                  </span>
                  <span dir="ltr" className="break-all">alkarime0@gmail.com</span>
                </a>
              </li>
              <li>
                <div className="flex items-center gap-2 text-xs text-slate-400">
                  <span className="w-6 h-6 rounded-md bg-orange-500/20 flex items-center justify-center text-orange-400 shrink-0">
                    📍
                  </span>
                  <span>اليمن 🇾🇪</span>
                </div>
              </li>
            </ul>

            {/* App badge */}
            <div className="mt-4">
              <div className="bg-slate-800 hover:bg-slate-700 transition-colors rounded-lg px-3 py-2 text-center cursor-pointer inline-block">
                <p className="text-[9px] text-slate-400">حمّل التطبيق</p>
                <p className="text-xs font-bold text-white">متاح قريباً</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-2">
            <p className="text-[10px] text-slate-500">
              © {new Date().getFullYear()} <span className="text-sky-400 font-medium">خبور</span> - أول متجر إلكتروني شامل في اليمن
            </p>
            <div className="flex items-center gap-3 text-[10px] text-slate-500">
              <Link href="/privacy" className="hover:text-sky-400 transition-colors">الخصوصية</Link>
              <span>•</span>
              <Link href="/terms" className="hover:text-sky-400 transition-colors">الشروط</Link>
              <span>•</span>
              <Link href="/contact" className="hover:text-sky-400 transition-colors">الدعم</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
