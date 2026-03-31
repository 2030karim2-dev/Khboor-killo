import Link from "next/link";
import { SITE_NAME } from "@/lib";
import { categories } from "@/lib";

const quickLinks = [
  { label: "سياسة الخصوصية", href: "/privacy" },
  { label: "الشروط", href: "/terms" },
  { label: "اتصل بنا", href: "/contact" },
  { label: "من نحن", href: "/about" },
];

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 mt-6">
      {/* Compact content */}
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {/* Logo + desc */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-1.5 mb-2">
              <div className="w-7 h-7 rounded-lg gradient-primary flex items-center justify-center text-white font-bold text-xs">خ</div>
              <span className="text-white text-sm font-bold">خبور</span>
            </div>
            <p className="text-[10px] text-slate-400 leading-relaxed">
              منصة البيع والشراء الإلكترونية الرائدة في المملكة
            </p>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-white text-xs font-bold mb-2">الأقسام</h3>
            <ul className="space-y-1">
              {categories.slice(0, 4).map((cat) => (
                <li key={cat.slug}>
                  <Link href={`/category/${cat.slug}`} className="text-[10px] hover:text-sky-400 transition-colors">
                    {cat.icon} {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white text-xs font-bold mb-2">روابط</h3>
            <ul className="space-y-1">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-[10px] hover:text-sky-400 transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white text-xs font-bold mb-2">تواصل</h3>
            <ul className="space-y-1 text-[10px]">
              <li>📞 920001234</li>
              <li>📧 info@khuboor.com</li>
              <li>📍 الرياض، السعودية</li>
            </ul>
            <div className="flex gap-1.5 mt-2">
              {["🌐", "📨", "📸", "🎬"].map((icon, i) => (
                <a key={i} href="#" className="w-6 h-6 rounded-md bg-slate-800 flex items-center justify-center hover:bg-sky-600 transition-colors text-[10px]">
                  {icon}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 py-2 text-center text-[10px] text-slate-500">
          © {new Date().getFullYear()} {SITE_NAME}. جميع الحقوق محفوظة.
        </div>
      </div>
    </footer>
  );
}
