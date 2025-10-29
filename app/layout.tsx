// app/layout.tsx
import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Visa Vert - Your Visa Solutions',
  description: 'Professional visa consulting services for all your immigration needs',
  keywords: 'visa, immigration, consulting, travel, documents',
  authors: [{ name: 'Visa Vert' }],
  
  // Open Graph - Facebook, LinkedIn, WhatsApp, etc.
  openGraph: {
    title: 'Visa Vert - Professional Visa Solutions',
    description: 'Expert visa consulting services for seamless immigration processes',
    url: 'https://visa-vert.vercel.app',
    siteName: 'Visa Vert',
    images: [
      {
        url: 'https://visa-vert.vercel.app/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Visa Vert - Professional Visa Consulting Services',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },

  // Twitter Card
  twitter: {
    card: 'summary_large_image',
    title: 'Visa Vert - Your Visa Solutions',
    description: 'Professional visa consulting services for all your immigration needs',
    images: ['https://visa-vert.vercel.app/twitter-image.jpg'],
    creator: '@visavert',
  },

  // Additional Meta
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
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en-US">
      <head>
        {/* Basic Meta Tags */}
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        
        {/* Favicon */}
        <link rel="icon" href="/logo.png" />
        <link rel="apple-touch-icon" href="/logo.png" />
        
        {/* Additional OG Tags */}
        <meta property="og:image:type" content="image/jpeg" />
        <meta property="og:image:alt" content="Visa Vert - Professional Visa Consulting" />
        
        {/* Platform Specific */}
        <meta name="image" property="og:image" content="https://visa-vert.vercel.app/og-image.jpg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        
        {/* Load Fonts */}
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300;0,400;0,600;0,700;0,800;1,300;1,400;1,600;1,700;1,800&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Ubuntu:ital,wght@0,300;0,400;0,500;0,700;1,300;1,400;1,500;1,700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-sans antialiased">
        {children}
      </body>
    </html>
  );
}