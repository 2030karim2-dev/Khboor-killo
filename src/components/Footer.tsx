"use client";

import Link from "next/link";
import {
  Mail,
  Phone,
  MapPin,
  Globe,
  Send,
  Camera,
  Video,
} from "lucide-react";
import { categories } from "@/lib/data";

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 mt-16">
      {/* Newsletter */}
      <div className="gradient-primary">
        <div className="max-w-7xl mx-auto px-4 py-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-white text-xl font-bold">
                اشترك في نشرتنا البريدية
              </h3>
              <p className="text-sky-100 text-sm mt-1">
                احصل على أحدث العروض والتخفيضات مباشرة في بريدك
              </p>
            </div>
            <form className="flex w-full md:w-auto gap-2">
              <input
                type="email"
                placeholder="بريدك الإلكتروني"
                className="flex-1 md:w-80 px-4 py-3 rounded-xl text-slate-800 text-right focus:outline-none focus:ring-2 focus:ring-white"
              />
              <button
                type="submit"
                className="px-6 py-3 bg-white text-sky-600 font-bold rounded-xl hover:bg-sky-50 transition-colors whitespace-nowrap"
              >
                اشترك
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-4 py-12">
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
            <div className="flex gap-3 mt-4">
              <a
                href="#"
                className="w-9 h-9 rounded-lg bg-slate-800 flex items-center justify-center hover:bg-sky-600 transition-colors"
              >
                <Globe size={18} />
              </a>
              <a
                href="#"
                className="w-9 h-9 rounded-lg bg-slate-800 flex items-center justify-center hover:bg-sky-600 transition-colors"
              >
                <Send size={18} />
              </a>
              <a
                href="#"
                className="w-9 h-9 rounded-lg bg-slate-800 flex items-center justify-center hover:bg-sky-600 transition-colors"
              >
                <Camera size={18} />
              </a>
              <a
                href="#"
                className="w-9 h-9 rounded-lg bg-slate-800 flex items-center justify-center hover:bg-sky-600 transition-colors"
              >
                <Video size={18} />
              </a>
            </div>
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

          {/* Links */}
          <div>
            <h3 className="text-white font-bold mb-4">روابط سريعة</h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/sell" className="hover:text-sky-400 transition-colors">
                  بيع معنا
                </Link>
              </li>
              <li>
                <Link href="/account" className="hover:text-sky-400 transition-colors">
                  حسابي
                </Link>
              </li>
              <li>
                <a href="#" className="hover:text-sky-400 transition-colors">
                  سياسة الخصوصية
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-sky-400 transition-colors">
                  الشروط والأحكام
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-sky-400 transition-colors">
                  الأسئلة الشائعة
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-sky-400 transition-colors">
                  اتصل بنا
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-bold mb-4">تواصل معنا</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-3">
                <Phone size={16} className="text-sky-400 shrink-0" />
                <span>920001234</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={16} className="text-sky-400 shrink-0" />
                <span>info@khuboor.com</span>
              </li>
              <li className="flex items-start gap-3">
                <MapPin size={16} className="text-sky-400 shrink-0 mt-0.5" />
                <span>الرياض، المملكة العربية السعودية</span>
              </li>
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
      </div>

      {/* Bottom */}
      <div className="border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col sm:flex-row justify-between items-center gap-2 text-sm">
          <p>© 2024 خبور. جميع الحقوق محفوظة.</p>
          <div className="flex gap-4">
            <img
              src="https://img.icons8.com/color/48/visa.png"
              alt="Visa"
              className="h-6"
            />
            <img
              src="https://img.icons8.com/color/48/mastercard.png"
              alt="Mastercard"
              className="h-6"
            />
            <img
              src="https://img.icons8.com/color/48/apple-pay.png"
              alt="Apple Pay"
              className="h-6"
            />
            <img
              src="https://img.icons8.com/color/48/cash-in-hand.png"
              alt="Cash"
              className="h-6"
            />
          </div>
        </div>
      </div>
    </footer>
  );
}
