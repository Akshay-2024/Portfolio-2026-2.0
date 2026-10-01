import './globals.css';
import PageTransitionLoader from '../components/ui/PageTransitionLoader';

export const metadata = {
  title: 'Akshay S — Webdeveloper & Photographer',
  description: 'Portfolio of Akshay S - Freelance Webdeveloper & Photographer based in India, France.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&family=Syne:wght@700;800&display=swap" rel="stylesheet" />
      </head>
      <body>
        <PageTransitionLoader />
        {children}
      </body>
    </html>
  );
}
