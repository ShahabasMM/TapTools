import type { MetadataRoute } from "next";
import { tools } from "@/data/tools";
import { absoluteUrl } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: absoluteUrl("/"), changeFrequency: "weekly", priority: 1 },
    { url: absoluteUrl("/tools"), changeFrequency: "weekly", priority: 0.9 },
    ...tools.map(({ slug }) => ({
      url: absoluteUrl(`/tools/${slug}`),
      changeFrequency: "monthly" as const,
      priority: 0.75,
    })),
  ];
}
