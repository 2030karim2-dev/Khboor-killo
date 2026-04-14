import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "المفضلة",
  description: "منتجاتك المفضلة في منصة خبور",
};

export default function WishlistLayout({ children }: { children: React.ReactNode }) {
  return children;
}
