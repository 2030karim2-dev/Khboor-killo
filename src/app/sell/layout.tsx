import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "لوحة البائع",
  description: "أضف منتجاتك وخدماتك للبيع على منصة خبور",
};

export default function SellLayout({ children }: { children: React.ReactNode }) {
  return children;
}
