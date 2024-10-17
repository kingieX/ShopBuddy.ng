'use client';

import CurrencyFormatter from '@/app/constants/CurrencyFormatter';
import StarRating from '@/app/constants/StarRating';
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import { IoIosHeartEmpty, IoMdHeart } from 'react-icons/io';

interface Product {
  id: string;
  title: string;
  mainImage: string;
  regularPrice: number;
  salePrice?: number;
  status: string;
}

// Assuming this is a function that adds/removes items from the wishlist
const updateWishlist = async (productId: string, action: 'add' | 'remove') => {
  // You'd need to implement this to interact with your database
  console.log(`${action} product ${productId} to wishlist`);
};

const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
  const [inWishlist, setInWishlist] = useState(false);

  // Check if product is already in the wishlist (You can make an API call here)
  useEffect(() => {
    const wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
    setInWishlist(wishlist.includes(product.id));
  }, [product.id]);

  // Handle wishlist toggle
  const toggleWishlist = () => {
    const wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');

    if (inWishlist) {
      const newWishlist = wishlist.filter((id: string) => id !== product.id);
      localStorage.setItem('wishlist', JSON.stringify(newWishlist));
      updateWishlist(product.id, 'remove');
    } else {
      wishlist.push(product.id);
      localStorage.setItem('wishlist', JSON.stringify(wishlist));
      updateWishlist(product.id, 'add');
    }

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
          <StarRating rating={4} />
          <span className="ml-1 text-sm text-gray-500">(95)</span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
