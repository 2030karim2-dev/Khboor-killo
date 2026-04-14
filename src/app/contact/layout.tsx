import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "اتصل بنا",
  description: "تواصل معنا - فريق خبور للدعم والمساعدة",
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
