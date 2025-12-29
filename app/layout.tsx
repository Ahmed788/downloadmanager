import './globals.css';
import React from 'react';

export const metadata = {
  title: 'My Farcaster MiniApp',
  description: 'Quick Auth demo showing Farcaster user info'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <main className="min-h-screen flex items-center justify-center p-6">
          {children}
        </main>
      </body>
    </html>
  );
}
