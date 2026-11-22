
import type { MetadataRoute } from "next";
import { products } from "@/lib/products";

export default function sitemap(): MetadataRoute.Sitemap {
  const base =
    process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

  const routes = [
    "",
    "/solutions",
    "/pricing",
    "/industries",
    "/about",
    "/contact",
    "/demo",
    "/resources",
    "/docs",
  ];

  return [
    ...routes.map((path) => ({
      url: new URL(path || "/", base).toString(),
      changeFrequency: "monthly" as const,
      priority: path === "" ? 1 : 0.7,
    })),
    ...products.map((product) => ({
      url: new URL(`/solutions/${product.slug}`, base).toString(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
