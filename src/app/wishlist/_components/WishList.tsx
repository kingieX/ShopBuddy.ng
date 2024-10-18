'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { useSession } from 'next-auth/react';
import WishlistProductCard from './WishlistProductCard'; // Import the new component
import toast from 'react-hot-toast';

interface WishlistItem {
  id: string;
  productId: string;
  wishlistId: string;
}

const WishListPage = () => {
  const { data: session, status } = useSession();
  const [wishlist, setWishlist] = useState<WishlistItem[]>([]);

  // Fetch wishlist from server if logged in, otherwise from localStorage
  useEffect(() => {
    const fetchWishlist = async () => {
      if (status === 'authenticated') {
        try {
          const res = await fetch('/api/wishlist');
          const data = await res.json();
          if (Array.isArray(data)) {
            setWishlist(data);
          } else {
            setWishlist([]);
          }
        } catch (error) {
          console.error('Error fetching wishlist:', error);
          setWishlist([]);
        }
      } else {
        const wishlistItems = JSON.parse(
          localStorage.getItem('wishlist') || '[]'
        );
        setWishlist(wishlistItems);
      }
    };
    fetchWishlist();
  }, [status]);

  const removeFromWishlist = async (wishlistId: string, productId: string) => {
    // Optimistically update the state first
    const updatedWishlist = wishlist.filter(
      (product) => product.productId !== productId
    );
    setWishlist(updatedWishlist); // This immediately updates the UI

    if (status === 'authenticated') {
      try {
        await fetch('/api/wishlist', {
          method: 'DELETE',
          body: JSON.stringify({ productId, wishlistId }),
          headers: {
            'Content-Type': 'application/json',
          },
        });
        // Optionally, refetch the wishlist from the server here
        toast.error('product removed from wishlist');
      } catch (error) {
        console.error('Error removing product from wishlist:', error);
        // Optionally: handle error by re-adding the product to the state if deletion failed
        const productToAddBack = wishlist.find(
          (product) => product.productId === productId
        );
        if (productToAddBack) {
          setWishlist([...wishlist, productToAddBack]);
        }
      }
    } else {
      // If not authenticated, just update localStorage
      localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
    }
  };

  return (
    <div className="px-4 py-8 lg:px-20">
      <header className="stick z-5 top-0 mb-8 mt-5 flex h-14 items-center gap-4 border-b bg-white px-4 py-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
        <Breadcrumb className="flex">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link className="hover:underline" href="/">
                  Home
                </Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>My wishlist</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </header>
      <h1 className="mb-4 text-2xl font-bold">Your Wishlist</h1>
      <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
        {wishlist.length > 0 ? (
          wishlist.map((item) => (
            <WishlistProductCard
              key={item.id}
              productId={item.productId}
              wishlistId={item.wishlistId}
              removeFromWishlist={removeFromWishlist}
            />
          ))
        ) : (
          <div className="min-h-screen">
            <p>No products available in your wishlist.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default WishListPage;
