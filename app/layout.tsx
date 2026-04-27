import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: {
    default: 'How Is America — How America Is Really Doing | 2026 Census Data',
    template: '%s | How Is America',
  },
  description:
    'Explore how America is really doing through U.S. Census Bureau HTOPS data: 24% use AI, 7% food insecure, 8.87% behind on rent. Real data on AI, food, housing, employment, health, and more.',
  metadataBase: new URL('https://www.howisamerica.com'),
  openGraph: {
    title: 'How Is America — How America Is Really Doing',
    description: 'Explore Census HTOPS data on AI usage, food security, housing, employment, health, and spending across America.',
    url: 'https://www.howisamerica.com',
    siteName: 'How Is America',
    type: 'website',
    images: ['/og-image.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'How Is America — 2026 Census Data Explorer',
    description: '24% of Americans use AI. 7% are food insecure. Explore the real data.',
  },
};

const websiteJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'How Is America',
  url: 'https://www.howisamerica.com',
  description: 'Exploring how America is really doing through U.S. Census Bureau HTOPS pulse survey data.',
  publisher: {
    '@type': 'Organization',
    name: 'How Is America',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased scroll-smooth`}
    >
      <body className="min-h-full flex flex-col">
        {/* GA: Add tracking ID here */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
        <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-[100] focus:bg-white focus:text-[--primary] focus:px-4 focus:py-2 focus:rounded-md focus:shadow-lg focus:text-sm focus:font-medium">Skip to content</a>
        <Navigation />
        <main id="main-content" className="flex-1" tabIndex={-1}>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
