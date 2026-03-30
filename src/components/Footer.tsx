import Link from "next/link";
import { SITE_NAME } from "@/lib";
import { Newsletter, FooterLinks } from "@/components/layout";

const socialLinks = [
  { icon: "🌐", label: "موقعنا الإلكتروني", href: "#" },
  { icon: "📨", label: "تيليجرام", href: "#" },
  { icon: "📸", label: "إنستغرام", href: "#" },
  { icon: "🎬", label: "يوتيوب", href: "#" },
];

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 mt-10">
      <Newsletter />

      <div className="max-w-7xl mx-auto px-4 py-8">
        <FooterLinks />

        <div className="mt-6 pt-6 border-t border-slate-800">
          <div className="flex gap-2">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                aria-label={social.label}
                className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center hover:bg-sky-600 transition-colors text-sm"
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 py-3 flex flex-col sm:flex-row justify-between items-center gap-1 text-xs">
          <p>© {new Date().getFullYear()} {SITE_NAME}. جميع الحقوق محفوظة.</p>
        </div>
      </div>
    </footer>
  );
}
