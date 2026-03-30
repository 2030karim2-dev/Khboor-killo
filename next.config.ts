import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "img.icons8.com",
      },
    ],
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 60 * 60 * 24,
  },
  experimental: {
    optimizePackageImports: ["lucide-react"],
  },
  headers: async () => [
    {
      source: "/api/:path*",
      headers: [
        { key: "Cache-Control", value: "public, max-age=60, stale-while-revalidate=300" },
      ],
    },
  ],
};

export default nextConfig;
