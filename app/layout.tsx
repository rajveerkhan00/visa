// app/layout.tsx
import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Visa Vert | Federal Authority for Identity and Citizenship',
  description: 'Access ICP Smart Services, Emirates ID, Visa Status, and more. Professional visa consulting services for all your immigration needs.',
  keywords: 'visa, immigration, uae visa, emirates id, icp services, federal authority, citizenship',
  authors: [{ name: 'Visa Vert Federal Services' }],
  
  // Open Graph - Facebook, LinkedIn, WhatsApp, etc.
  openGraph: {
    title: 'Visa Vert | Federal Authority for Identity and Citizenship',
    description: 'Access ICP Smart Services, Emirates ID, Visa Status, and more. Professional visa consulting services.',
    url: 'https://visa-vert.vercel.app',
    siteName: 'Visa Vert Federal Services',
    images: [
      {
        url: 'https://visa-vert.vercel.app/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Visa Vert - Federal Authority for Identity and Citizenship',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },

  // Twitter Card
  twitter: {
    card: 'summary_large_image',
    title: 'Visa Vert | Federal Authority for Identity and Citizenship',
    description: 'Access ICP Smart Services, Emirates ID, Visa Status, and more.',
    images: ['https://visa-vert.vercel.app/twitter-image.jpg'],
    creator: '@visavert_gov',
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
        <link rel="shortcut icon" href="/logo.png" type="image/png" />
        
        {/* CRITICAL: Additional meta tags for WhatsApp - EXACTLY like screenshot */}
        <meta property="og:title" content="Visa Vert | Federal Authority for Identity and Citizenship" />
        <meta property="og:description" content="Access ICP Smart Services, Emirates ID, Visa Status, and more." />
        <meta property="og:image" content="https://visa-vert.vercel.app/og-image.jpg" />
        <meta property="og:url" content="https://visa-vert.vercel.app" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Visa Vert Federal Services" />
        
        {/* Additional important tags */}
        <meta name="description" content="Access ICP Smart Services, Emirates ID, Visa Status, and more. Professional visa consulting services for all your immigration needs." />
        
        {/* Additional platform-specific tags */}
        <meta name="author" content="Federal Authority for Identity and Citizenship" />
        <meta name="copyright" content="Visa Vert Federal Services" />
        <meta name="classification" content="Government Services, Visa, Immigration" />
        <meta name="rating" content="General" />
        <meta name="distribution" content="Global" />
        <meta name="language" content="EN" />
        <meta name="coverage" content="Worldwide" />
        <meta name="target" content="all" />
        <meta name="robots" content="index, follow" />
        <meta name="revisit-after" content="7 days" />
        
        {/* Dublin Core Metadata */}
        <meta name="DC.title" content="Visa Vert | Federal Authority for Identity and Citizenship" />
        <meta name="DC.creator" content="Federal Authority for Identity and Citizenship" />
        <meta name="DC.subject" content="Visa; Immigration; Emirates ID; ICP Services" />
        <meta name="DC.description" content="Access ICP Smart Services, Emirates ID, Visa Status, and more." />
        <meta name="DC.publisher" content="Visa Vert Federal Services" />
        <meta name="DC.format" content="text/html" />
        <meta name="DC.language" content="EN" />
        
        {/* Facebook Specific */}
        <meta property="fb:app_id" content="123456789012345" />
        <meta property="fb:pages" content="1234567890" />
        
        {/* Twitter Additional */}
        <meta name="twitter:site" content="@visavert_gov" />
        <meta name="twitter:creator" content="@visavert_gov" />
        <meta name="twitter:label1" content="Service Type" />
        <meta name="twitter:data1" content="Government Services" />
        <meta name="twitter:label2" content="Location" />
        <meta name="twitter:data2" content="United Arab Emirates" />
        
        {/* WhatsApp Specific */}
        <meta property="og:image:type" content="image/jpeg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="Visa Vert - Federal Authority for Identity and Citizenship" />
        <meta property="og:updated_time" content="2024-01-15T12:00:00+04:00" />
        
        {/* iOS Specific */}
        <meta name="apple-mobile-web-app-title" content="Visa Vert" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        
        {/* Microsoft Specific */}
        <meta name="msapplication-TileColor" content="#0054a6" />
        <meta name="msapplication-TileImage" content="/logo.png" />
        <meta name="msapplication-config" content="/browserconfig.xml" />
        
        {/* Android Specific */}
        <meta name="theme-color" content="#0054a6" />
        <meta name="mobile-web-app-capable" content="yes" />
        
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
        
        {/* Preload critical resources */}
        <link rel="preload" href="/og-image.jpg" as="image" />
        <link rel="preload" href="https://fonts.googleapis.com/css2?family=Open+Sans&display=swap" as="style" />
      </head>
      <body className="font-sans antialiased">
        {children}
      </body>
    </html>
  );
}