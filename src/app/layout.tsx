// app/layout.tsx or wherever your layout is

import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import SessionProviderWrapper from './SessionProviderWrapper'; // Import the client-side SessionProvider wrapper

// Font configuration remains in the server component
const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
});
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
});

// Metadata is a server-side export
export const metadata: Metadata = {
  title: 'ShopBuddy',
  description: 'An E-commerce website in Ebonyi state',
  icons: {
    icon: '/favicon1.svg', // Path to your larger favicon
  },
};

// Server-side RootLayout
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <SessionProviderWrapper>{children}</SessionProviderWrapper>
      </body>
    </html>
  );
}
