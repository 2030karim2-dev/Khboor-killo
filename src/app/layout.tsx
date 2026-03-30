import type { Metadata } from "next";
import { Noto_Kufi_Arabic, Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { CartProvider } from "@/lib/CartContext";
import { AuthProvider } from "@/lib/AuthContext";
import { ToastProvider } from "@/lib/ToastContext";
import { WishlistProvider } from "@/lib/WishlistContext";
import { OrderProvider } from "@/lib/OrderContext";
import { NotificationsProvider } from "@/lib/NotificationsContext";
import { ThemeProvider } from "@/lib/ThemeContext";
import { AdminProvider } from "@/lib/AdminContext";
import { LanguageProvider } from "@/lib/i18n";
import { CurrencyProvider } from "@/lib/CurrencyContext";
import ToastContainer from "@/components/ui/ToastContainer";
import { OrganizationJsonLd, WebsiteJsonLd } from "@/components/seo/JsonLd";
import BottomNav from "@/components/layout/BottomNav";
import AdminFloatingButton from "@/components/AdminFloatingButton";

const notoKufi = Noto_Kufi_Arabic({
  variable: "--font-arabic",
  subsets: ["arabic"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "خبور - منصة البيع والشراء",
    template: "%s | خبور",
  },
  description:
    "خبور هو منصة البيع والشراء الإلكترونية الرائدة في المملكة العربية السعودية. سيارات، قطع غيار، ملابس، مواد بناء، إكسسوارات - كل شيء في مكان واحد.",
  keywords: [
    "تسوق إلكتروني",
    "متجر إلكتروني",
    "السعودية",
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
    locale: "ar_SA",
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
    <html lang="ar" dir="rtl">
      <body className={`${notoKufi.variable} antialiased`}>
        <OrganizationJsonLd />
        <WebsiteJsonLd />
        <ThemeProvider>
          <LanguageProvider>
            <CurrencyProvider>
              <AdminProvider>
                <ToastProvider>
                <AuthProvider>
                  <WishlistProvider>
                    <CartProvider>
                      <OrderProvider>
                        <NotificationsProvider>
                          <a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:right-2 focus:z-[200] focus:bg-sky-600 focus:text-white focus:px-4 focus:py-2 focus:rounded-lg">
                            تخطي إلى المحتوى الرئيسي
                          </a>
                          <Header />
                          <main id="main-content" className="min-h-screen pb-20 md:pb-0">{children}</main>
                          <Footer />
                          <BottomNav />
                          <AdminFloatingButton />
                          <ToastContainer />
                        </NotificationsProvider>
                      </OrderProvider>
                    </CartProvider>
                  </WishlistProvider>
                </AuthProvider>
              </ToastProvider>
            </AdminProvider>
          </CurrencyProvider>
        </LanguageProvider>
      </ThemeProvider>
      </body>
    </html>
  );
}
