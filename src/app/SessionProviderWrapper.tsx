// app/SessionProviderWrapper.tsx
'use client'; // This file is specifically marked as a client component

import { SessionProvider } from 'next-auth/react';
import { Toaster } from 'react-hot-toast';
import { WishlistProvider } from './contexts/WishlistContext';

export default function SessionProviderWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SessionProvider>
      <WishlistProvider>
        <Toaster position="top-right" reverseOrder={false} />
        {children}
      </WishlistProvider>
    </SessionProvider>
  );
}
