import type { Metadata } from "next";
import { Cairo, Tajawal } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AppProviders from "@/AppProviders";
import ToastContainer from "@/components/ui/ToastContainer";
import { OrganizationJsonLd, WebsiteJsonLd } from "@/components/seo/JsonLd";
import BottomNav from "@/components/layout/BottomNav";
import AdminFloatingButton from "@/components/AdminFloatingButton";
import ServiceWorkerRegistration from "@/components/layout/ServiceWorkerRegistration";

const cairo = Cairo({
  variable: "--font-cairo",
  subsets: ["arabic"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
});

const tajawal = Tajawal({
  variable: "--font-tajawal",
  subsets: ["arabic"],
  weight: ["200", "300", "400", "500", "700", "800", "900"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "خبور - منصة البيع والشراء",
    template: "%s | خبور",
  },
  description:
    "خبور هو منصة البيع والشراء الإلكترونية الرائدة في اليمن. سيارات، قطع غيار، ملابس، مواد بناء، إكسسوارات - كل شيء في مكان واحد.",
  keywords: [
    "تسوق إلكتروني",
    "متجر إلكتروني",
    "اليمن",
    "سيارات",
    "قطع غيار",
    "ملابس",
    "مواد بناء",
    "إكسسوارات",
    "تسوق",
    "عروض",
  ],
  openGraph: {
    type: "website",
    locale: "ar_YE",
    siteName: "خبور",
    title: "خبور - منصة البيع والشراء",
    description: "كل ما تحتاجه في مكان واحد. سيارات، قطع غيار، ملابس، مواد بناء، إكسسوارات.",
  },
  twitter: {
    card: "summary_large_image",
    title: "خبور - منصة البيع والشراء",
    description: "كل ما تحتاجه في مكان واحد.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                var theme = localStorage.getItem('khuboor_theme');
                if (!theme) {
                  theme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
                }
                document.documentElement.dataset.theme = theme;
                if (theme === 'dark') {
                  document.documentElement.classList.add('dark');
                }
                var currency = localStorage.getItem('khuboor_currency');
                if (currency) {
                  document.documentElement.dataset.currency = currency;
                }
              })();
            `,
          }}
        />
      </head>
      <body className={`${cairo.variable} ${tajawal.variable} antialiased`}>
        <OrganizationJsonLd />
        <WebsiteJsonLd />
        <AppProviders>
          <a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:right-2 focus:z-[200] focus:bg-sky-600 focus:text-white focus:px-4 focus:py-2 focus:rounded-lg">
            تخطي إلى المحتوى الرئيسي
          </a>
          <Header />
          <main id="main-content" className="min-h-screen pb-20 md:pb-0">{children}</main>
          <Footer />
          <BottomNav />
          <AdminFloatingButton />
          <ServiceWorkerRegistration />
          <ToastContainer />
        </AppProviders>
      </body>
    </html>
  );
}
