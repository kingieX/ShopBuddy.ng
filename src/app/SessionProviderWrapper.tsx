// app/SessionProviderWrapper.tsx
'use client'; // This file is specifically marked as a client component

import { SessionProvider } from 'next-auth/react';
import { Toaster } from 'react-hot-toast';
import { WishlistProvider } from './contexts/WishlistContext';
import { CartContextProvider } from './contexts/CartContext';
import ScrollToTop from './ScrollToTop';
import ErrorCheckWrapper from './components/ErrorCheckWrapper';

export default function SessionProviderWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SessionProvider>
      <CartContextProvider>
        <WishlistProvider>
{/*           <ErrorCheckWrapper> */}
            <ScrollToTop>
              <Toaster position="top-right" reverseOrder={false} />
              {children}
            </ScrollToTop>
{/*           </ErrorCheckWrapper> */}
        </WishlistProvider>
      </CartContextProvider>
    </SessionProvider>
  );
}
