import './globals.css';
import React from 'react';

export const metadata = {
  title: 'My Farcaster MiniApp',
  description: 'Quick Auth demo showing Farcaster user info'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" dir="rtl">
      <head>
        <title>Download Manager - Farcaster Mini App</title>
        <meta name="description" content="Quick Auth demo + Download manager for Farcaster media files" />
        {/* Open Graph للـ Preview */}
        <meta property="og:title" content="Download Manager" />
        <meta property="og:description" content="Download Farcaster media files instantly!" />
        <meta property="og:image" content="https://downloadmanager.vercel.app/banner.png" />
        <meta property="og:url" content="https://downloadmanager.vercel.app" />
        <meta property="og:type" content="website" />
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Download Manager" />
        <meta name="twitter:description" content="Farcaster media downloader" />
        <meta name="twitter:image" content="https://downloadmanager.vercel.app/banner.png" />
        <link rel="icon" href="/icon.png" type="image/png" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
