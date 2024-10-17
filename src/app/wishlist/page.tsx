'use client';
import Footer from '../components/Footer';
import Navbar from '../components/NavBar';
import WishListPage from './_components/WishList';

import { getSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Wishlist() {
  // use for protected pages
  const router = useRouter();

  useEffect(() => {
    const securePage = async () => {
      const session = await getSession();
      if (!session) {
        router.push('/auth/signin');
      }
    };

    securePage();
  }, [router]);

  return (
    <>
      <Navbar isAuthPage={false} />
      <div className="py-10">
        <WishListPage />
      </div>
      <Footer />
    </>
  );
}
