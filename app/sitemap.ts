import { MetadataRoute } from 'next';
import { collectionsData } from '@/lib/collectionsData';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://akshays.me';

  const collectionRoutes = collectionsData.map((cat) => ({
    url: `${baseUrl}/collections/${cat.id}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1.0,
    },
    ...collectionRoutes,
  ];
}
