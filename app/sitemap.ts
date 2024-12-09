import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://pepy.tech",
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1
    },
    {
      url: "https://pepy.tech/api",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7
    },
    {
      url: "https://pepy.tech/pricing",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6
    }
  ];
}