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
    <footer className="bg-slate-900 text-slate-300 mt-16">
      <Newsletter />

      <div className="max-w-7xl mx-auto px-4 py-12">
        <FooterLinks />

        <div className="mt-8 pt-8 border-t border-slate-800">
          <div className="flex gap-3 mb-4">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                aria-label={social.label}
                className="w-9 h-9 rounded-lg bg-slate-800 flex items-center justify-center hover:bg-sky-600 transition-colors text-base"
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col sm:flex-row justify-between items-center gap-2 text-sm">
          <p>© {new Date().getFullYear()} {SITE_NAME}. جميع الحقوق محفوظة.</p>
        </div>
      </div>
    </footer>
  );
}
