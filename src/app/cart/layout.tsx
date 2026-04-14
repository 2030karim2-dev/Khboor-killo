import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "سلة التسوق",
  description: "مراجعة المنتجات في سلة التسوق وإتمام عملية الشراء",
};

export default function CartLayout({ children }: { children: React.ReactNode }) {
  return children;
}
