import './globals.css';
import PageTransitionLoader from '../components/ui/PageTransitionLoader';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://akshays.me';

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Akshay S — Full-Stack Web Developer & Photographer',
    template: '%s | Akshay S',
  },
  description:
    'Official portfolio of Akshay S — Full-Stack Web Developer & Photographer specializing in Next.js, React, AI applications, luxury UI design, and editorial photography.',
  keywords: [
    'Akshay S',
    'Akshay S Portfolio',
    'Web Developer India',
    'Next.js Developer',
    'React Developer',
    'Full Stack Engineer',
    'Photographer Portfolio',
    'UI/UX Designer',
    'AmoraWeds',
    'Kerala Developer',
  ],
  authors: [{ name: 'Akshay S', url: siteUrl }],
  creator: 'Akshay S',
  publisher: 'Akshay S',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteUrl,
    title: 'Akshay S — Full-Stack Web Developer & Photographer',
    description:
      'Official portfolio of Akshay S — Full-Stack Web Developer & Photographer specializing in Next.js, React, AI applications, luxury UI design, and editorial photography.',
    siteName: 'Akshay S Portfolio',
    images: [
      {
        url: '/person.png',
        width: 1200,
        height: 630,
        alt: 'Akshay S — Full-Stack Web Developer & Photographer',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Akshay S — Full-Stack Web Developer & Photographer',
    description:
      'Official portfolio of Akshay S — Full-Stack Web Developer & Photographer specializing in Next.js, React, AI applications, luxury UI design, and editorial photography.',
    images: ['/person.png'],
  },
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon-96x96.png', sizes: '96x96', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    other: [
      { rel: 'mask-icon', url: '/favicon.svg', color: '#FF3B30' },
    ],
  },
  manifest: '/site.webmanifest',
  appleWebApp: {
    title: 'Akshay S',
    statusBarStyle: 'black-translucent',
  },
};

const jsonLdSchema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Person',
      '@id': `${siteUrl}/#person`,
      name: 'Akshay S',
      jobTitle: 'Full-Stack Web Developer & Photographer',
      url: siteUrl,
      sameAs: [
        'https://github.com/Akshay-2024',
        'https://linkedin.com',
        'https://instagram.com',
      ],
      knowsAbout: [
        'Web Development',
        'Next.js',
        'React',
        'Tailwind CSS',
        'TypeScript',
        'Python',
        'UI/UX Design',
        'Photography',
      ],
    },
    {
      '@type': 'WebSite',
      '@id': `${siteUrl}/#website`,
      url: siteUrl,
      name: 'Akshay S Portfolio',
      publisher: {
        '@id': `${siteUrl}/#person`,
      },
    },
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="icon" type="image/png" sizes="96x96" href="/favicon-96x96.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="msapplication-TileColor" content="#0A0A0D" />
        <meta name="msapplication-config" content="/browserconfig.xml" />
        <meta name="theme-color" content="#0A0A0D" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&family=Syne:wght@700;800&display=swap" rel="stylesheet" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdSchema) }}
        />
      </head>
      <body>
        <PageTransitionLoader />
        {children}
      </body>
    </html>
  );
}
