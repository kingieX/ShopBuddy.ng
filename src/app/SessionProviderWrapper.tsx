// app/SessionProviderWrapper.tsx
'use client'; // This file is specifically marked as a client component

import { SessionProvider } from 'next-auth/react';
import { Toaster } from 'react-hot-toast';
import { WishlistProvider } from './contexts/WishlistContext';
import { CartContextProvider } from './contexts/CartContext';
import ScrollToTop from './ScrollToTop';

export default function SessionProviderWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SessionProvider>
      <CartContextProvider>
        <WishlistProvider>
          <ScrollToTop>
            <Toaster position="top-right" reverseOrder={false} />
            {children}
          </ScrollToTop>
        </WishlistProvider>
      </CartContextProvider>
    </SessionProvider>
  );
}
