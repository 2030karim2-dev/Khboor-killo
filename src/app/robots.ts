import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin/", "/account/", "/cart/", "/checkout/", "/sell/"],
      },
    ],
    sitemap: "https://khuboor.com/sitemap.xml",
  };
}
