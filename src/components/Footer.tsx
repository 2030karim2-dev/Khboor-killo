"use client";

import { Newsletter, FooterLinks } from "@/components/layout";
import { Globe, Send, Camera, Video } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 mt-16">
      <Newsletter />

      <div className="max-w-7xl mx-auto px-4 py-12">
        <FooterLinks />

        <div className="mt-8 pt-8 border-t border-slate-800">
          <div className="flex gap-3 mb-4">
            {[
              { icon: Globe, label: "web" },
              { icon: Send, label: "telegram" },
              { icon: Camera, label: "instagram" },
              { icon: Video, label: "youtube" },
            ].map((social) => (
              <a
                key={social.label}
                href="#"
                className="w-9 h-9 rounded-lg bg-slate-800 flex items-center justify-center hover:bg-sky-600 transition-colors"
              >
                <social.icon size={18} />
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col sm:flex-row justify-between items-center gap-2 text-sm">
          <p>© 2024 خبور. جميع الحقوق محفوظة.</p>
        </div>
      </div>
    </footer>
  );
}
