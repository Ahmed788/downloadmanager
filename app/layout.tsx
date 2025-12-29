import './globals.css';
import React from 'react';

export const metadata = {
  title: 'My Farcaster MiniApp',
  description: 'Quick Auth demo showing Farcaster user info'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <title>My Farcaster MiniApp</title>
        <meta name="description" content="Quick Auth demo showing Farcaster user info" />
        <meta property="og:title" content="My Farcaster MiniApp" />
        <meta property="og:description" content="Quick Auth demo showing Farcaster user info" />
        <meta property="og:image" content="/banner.png" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body>
        <main className="min-h-screen flex items-center justify-center p-6">
          {children}
        </main>
      </body>
    </html>
  );
}
