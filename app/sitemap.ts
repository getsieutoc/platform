import { BASE_URL } from '@/lib/constants';
import { prisma } from '@/lib/prisma';
import { MetadataRoute } from 'next';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const projects = await prisma.project.findMany();

  const projectsMap: MetadataRoute.Sitemap = projects
    ? projects.map((p) => ({
        url: `${BASE_URL}/${p.slug}`,
        lastModified: new Date(p.updatedAt),
        changeFrequency: 'daily',
        priority: 0.7,
      }))
    : [];

  return [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: `${BASE_URL}/privacy`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/terms`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    ...projectsMap,
  ];
}
