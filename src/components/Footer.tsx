import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-400 mt-4">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-3">
          {/* Logo + brand */}
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg gradient-primary flex items-center justify-center text-white font-bold text-xs">خ</div>
            <span className="text-white text-xs font-bold">خبور - أول متجر شامل في اليمن 🇾🇪</span>
          </div>

          {/* Links */}
          <div className="flex items-center gap-3 text-[10px]">
            <Link href="/sell" className="hover:text-sky-400 transition-colors">بيع معنا</Link>
            <span className="text-slate-600">|</span>
            <Link href="/privacy" className="hover:text-sky-400 transition-colors">الخصوصية</Link>
            <span className="text-slate-600">|</span>
            <Link href="/terms" className="hover:text-sky-400 transition-colors">الشروط</Link>
            <span className="text-slate-600">|</span>
            <Link href="/contact" className="hover:text-sky-400 transition-colors">اتصل بنا</Link>
          </div>

          {/* Contact */}
          <div className="flex items-center gap-3 text-[10px]">
            <a href="https://wa.me/967779816860" target="_blank" rel="noopener noreferrer" className="hover:text-green-400 transition-colors" dir="ltr">📱 +967 779 816 860</a>
            <span className="text-slate-600">|</span>
            <a href="mailto:alkarime0@gmail.com" className="hover:text-sky-400 transition-colors" dir="ltr">✉️ alkarime0@gmail.com</a>
          </div>
        </div>
      </div>

      <div className="border-t border-slate-800">
        <p className="text-center text-[9px] text-slate-600 py-2">
          © {new Date().getFullYear()} خبور - جميع الحقوق محفوظة
        </p>
      </div>
    </footer>
  );
}
