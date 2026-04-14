import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "الأسئلة الشائعة",
  description: "إجابات على أكثر الأسئلة شيوعاً حول منصة خبور للتجارة الإلكترونية",
};

export default function FaqLayout({ children }: { children: React.ReactNode }) {
  return children;
}
