import { Metadata } from 'next';
import { collectionsData } from '@/lib/collectionsData';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const category = collectionsData.find((cat) => cat.id === id);

  if (!category) {
    return {
      title: 'Collection Not Found | Akshay S',
    };
  }

  const title = `${category.title} — Curated Collection | Akshay S`;
  const description = category.description;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'website',
      siteName: 'Akshay S Portfolio',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  };
}

export default function CollectionLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
