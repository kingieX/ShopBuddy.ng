'use client';

import CurrencyFormatter from '@/app/constants/CurrencyFormatter';
import StarRating from '@/app/constants/StarRating';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { IoIosHeartEmpty, IoMdHeart } from 'react-icons/io';
import { useWishlist } from '@/app/contexts/WishlistContext';

interface Product {
  id: string;
  title: string;
  mainImage: string;
  regularPrice: number;
  salePrice?: number;
  status: string;
  description?: string; // Add optional description field
  galleryImages?: string[]; // Add optional galleryImages field
  category?: {
    id: string;
    name: string;
  } | null; // Add optional category field
  createdAt?: string; // Add optional createdAt field
}

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { data: session, status } = useSession();
  const { wishlist, addToWishlist, removeFromWishlist } = useWishlist(); // Remove setWishlist
  const [inWishlist, setInWishlist] = useState(false);

  // Check if the product is in the wishlist on mount or when wishlist is updated
  useEffect(() => {
    const checkWishlist = () => {
      if (status === 'authenticated') {
        // Check from global context or backend
        setInWishlist(wishlist.some((p: Product) => p.id === product.id));
      } else {
        // Check from localStorage for unauthenticated users
        const localWishlist = JSON.parse(
          localStorage.getItem('wishlist') || '[]'
        );
        setInWishlist(localWishlist.some((p: Product) => p.id === product.id));
      }
    };
    checkWishlist();
  }, [status, product.id, wishlist]);

  const toggleWishlist = async () => {
    if (status === 'authenticated') {
      const method = inWishlist ? 'DELETE' : 'POST';

      try {
        const res = await fetch('/api/wishlist', {
          method,
          body: JSON.stringify({ productId: product.id }),
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (res.ok) {
          if (inWishlist) {
            removeFromWishlist(product.id);
            toast.error('Removed from wishlist');
          } else {
            // Add missing fields for wishlist item
            const fullProduct = {
              ...product,
              description: product.description || '',
              galleryImages: product.galleryImages || [],
              category: product.category || null,
              createdAt: product.createdAt || new Date().toISOString(),
            };
            addToWishlist(fullProduct); // Pass full product object to wishlist
            toast.success('Added to wishlist');
          }
        } else {
          toast.error('Failed to update wishlist');
        }
      } catch (error) {
        console.error('Error updating wishlist:', error);
        toast.error('Something went wrong');
      }
    } else {
      // Handle unauthenticated users with localStorage
      let localWishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');

      if (inWishlist) {
        localWishlist = localWishlist.filter(
          (p: Product) => p.id !== product.id
        );
        toast.error('Removed from wishlist');
      } else {
        const fullProduct = {
          ...product,
          description: product.description || '',
          galleryImages: product.galleryImages || [],
          category: product.category || null,
          createdAt: product.createdAt || new Date().toISOString(),
        };
        localWishlist.push(fullProduct);
        toast.success('Added to wishlist');
        addToWishlist(fullProduct); // Pass full product object to wishlist
      }

      localStorage.setItem('wishlist', JSON.stringify(localWishlist));
    }

    // Toggle local state to reflect the change visually
    setInWishlist(!inWishlist);
  };

  // Calculate discount percentage if sale price is given
  const discountPercentage = product.salePrice
    ? Math.round(
        ((product.regularPrice - product.salePrice) / product.regularPrice) *
          100
      )
    : 0;

  return (
    <div className="group relative rounded-lg border bg-white p-4 shadow-lg transition-shadow hover:shadow-xl">
      <div className="relative bg-[#F5F5F5] p-2 lg:p-8">
        <img
          src={product.mainImage}
          alt={product.title}
          className="h-40 w-full rounded-lg object-contain"
        />
        <button className="absolute bottom-0 left-0 w-full rounded-b-md bg-black py-2 text-white transition-opacity hover:bg-black/80 lg:opacity-0 lg:group-hover:opacity-100">
          Add to cart
        </button>
        {product.salePrice && (
          <div className="absolute left-2 top-2 rounded bg-button px-2 py-1 text-xs font-bold text-white">
            -{discountPercentage}%
          </div>
        )}
        <div className="absolute right-2 top-2 flex flex-col items-center">
          <div>
            {product.status === 'on_sale' ? (
              <button onClick={toggleWishlist}>
                {inWishlist ? (
                  <IoMdHeart size={20} className="text-red-500" />
                ) : (
                  <IoIosHeartEmpty
                    size={20}
                    className="text-gray-500 hover:text-red-500"
                  />
                )}
              </button>
            ) : (
              <span className="rounded bg-red-600 px-2 py-1 text-xs text-white">
                sold out
              </span>
            )}
          </div>
        </div>
      </div>
      <div className="pt-2">
        <h3 className="mt-2 text-sm font-semibold hover:text-button hover:underline">
          <Link href={`/products/${product.id}`}>{product.title}</Link>
        </h3>
        <div className="mt-1 flex items-baseline space-x-2">
          {product.salePrice ? (
            <>
              <span className="text-gray-900">
                <CurrencyFormatter amount={product.salePrice} />
              </span>
              <span className="text-sm text-gray-500 line-through">
                <CurrencyFormatter amount={product.regularPrice} />
              </span>
            </>
          ) : (
            <span className="text-gray-900">
              <CurrencyFormatter amount={product.regularPrice} />
            </span>
          )}
        </div>
        <div className="mt-2 flex items-center">
          <StarRating rating={4} /> {/* Example rating */}
          <span className="ml-1 text-sm text-gray-500">(95)</span>{' '}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
