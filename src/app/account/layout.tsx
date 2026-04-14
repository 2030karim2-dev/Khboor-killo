import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "حسابي",
  description: "إدارة حسابك الشخصي وطلباتك وعناوينك في منصة خبور",
};

export default function AccountLayout({ children }: { children: React.ReactNode }) {
  return children;
}
