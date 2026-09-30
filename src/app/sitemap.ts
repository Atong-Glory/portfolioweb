import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";
import { getDb } from "@/lib/db";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Fetch featured project slugs for individual case-study pages
  let projectEntries: MetadataRoute.Sitemap = []
  try {
    const db = await getDb()
    const projects = await db.project.findMany({
      where: { featured: true },
      select: { slug: true, createdAt: true },
      orderBy: { sortOrder: 'asc' },
    })
    projectEntries = projects.map((p) => ({
      url: `${SITE_URL}/projects/${p.slug}`,
      lastModified: p.createdAt,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    }))
  } catch {
    // DB unavailable during static generation — skip project entries gracefully
  }

  return [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
      // The language toggle is client-side (same URL for both locales),
      // so EN/FR hreflang entries both point at the canonical URL.
      alternates: {
        languages: {
          en: SITE_URL,
          fr: SITE_URL,
        },
      },
    },
    ...projectEntries,
  ];
}
