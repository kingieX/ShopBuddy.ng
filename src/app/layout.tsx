// app/layout.tsx or wherever your layout is

import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import SessionProviderWrapper from './SessionProviderWrapper'; // Import the client-side SessionProvider wrapper
import Head from 'next/head';

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
      <Head>
        <title>Shopbuddy - No1 e-commerce website in Ebonyi State</title>
        <meta
          name="description"
          content="Explore our exclusive collections and elevate your everyday experience
          with products designed to inspire and delight. Shop now and transform
          the ordinary into the exceptional! Best in Ebonyi State."
        />
        <meta property="og:title" content="Shopbuddy | shopbuddy.ng" />
        <meta
          property="og:description"
          content="Explore our exclusive collections and elevate your everyday experience
          with products designed to inspire and delight. Shop now and transform
          the ordinary into the exceptional! Best in Ebonyi State."
        />
        <meta
          property="og:image"
          content="https://www.shopbuddy.com/favicon1.svg"
        />
        <meta property="og:url" content="https://www.shopbuddy.com" />
        <meta property="og:type" content="website" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="robots" content="index, follow" />

        <link rel="icon" href="/favicon1.svg" />
      </Head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <SessionProviderWrapper>{children}</SessionProviderWrapper>
      </body>
    </html>
  );
}
