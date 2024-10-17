'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSession } from 'next-auth/react'; // Assuming you use next-auth for authentication

interface Product {
  id: string;
  title: string;
  mainImage: string;
  regularPrice: number;
  salePrice?: number;
  status: string;
}

const WishListPage = () => {
  const { data: session, status } = useSession(); // For authentication status
  const [wishlist, setWishlist] = useState<Product[]>([]);

  // Fetch wishlist from server if logged in, otherwise from localStorage
  useEffect(() => {
    const fetchWishlist = async () => {
      if (status === 'authenticated') {
        // Fetch wishlist from server
        const res = await fetch('/api/wishlist');
        const data = await res.json();
        console.log('Wishlist:', data);

        setWishlist(data);
      } else {
        // Fallback to localStorage for unauthenticated users
        const wishlistItems = JSON.parse(
          localStorage.getItem('wishlist') || '[]'
        );
        setWishlist(wishlistItems);
      }
    };
    fetchWishlist();
  }, [status]);

  const removeFromWishlist = async (productId: string) => {
    if (status === 'authenticated') {
      // If authenticated, sync with the server
      await fetch('/api/wishlist', {
        method: 'DELETE',
        body: JSON.stringify({ productId }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
    } else {
      // If not authenticated, modify localStorage
      const updatedWishlist = wishlist.filter(
        (product) => product.id !== productId
      );
      localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
      setWishlist(updatedWishlist);
    }
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="mb-4 text-2xl font-bold">Your Wishlist</h1>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {wishlist.map((product) => (
          <div
            key={product.id}
            className="group relative rounded-lg border bg-white p-4 shadow-lg"
          >
            <img
              src={product.mainImage}
              alt={product.title}
              className="h-40 w-full object-contain"
            />
            <h3 className="mt-2 text-sm font-semibold">
              <Link href={`/products/${product.id}`}>{product.title}</Link>
            </h3>
            <button
              onClick={() => removeFromWishlist(product.id)}
              className="absolute right-2 top-2 text-gray-500 hover:text-red-500"
            >
              Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WishListPage;
