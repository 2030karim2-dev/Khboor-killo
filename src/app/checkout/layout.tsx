import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "إتمام الشراء",
  description: "إتمام عملية الشراء وتأكيد الطلب في منصة خبور",
};

export default function CheckoutLayout({ children }: { children: React.ReactNode }) {
  return children;
}
