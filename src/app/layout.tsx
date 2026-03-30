import type { Metadata } from "next";
import { Noto_Kufi_Arabic } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { CartProvider } from "@/lib/CartContext";

const notoKufi = Noto_Kufi_Arabic({
  variable: "--font-arabic",
  subsets: ["arabic"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "خبور - منصة البيع والشراء",
  description:
    "خبور هو منصة البيع والشراء الإلكترونية الرائدة. سيارات، قطع غيار، ملابس، مواد بناء، إكسسوارات - كل شيء في مكان واحد.",
  keywords: [
    "تسوق",
    "买车",
    "سيارات",
    "قطع غيار",
    "ملابس",
    "مواد بناء",
    "إكسسوارات",
    "السعودية",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl">
      <body className={`${notoKufi.variable} antialiased`}>
        <CartProvider>
          <Header />
          <main className="min-h-screen">{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
