'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { FaTrashAlt } from 'react-icons/fa';
import StarRating from '@/app/constants/StarRating';
import CurrencyFormatter from '@/app/constants/CurrencyFormatter';

interface Product {
  id: string;
  title: string;
  mainImage: string;
  regularPrice: number;
  salePrice?: number;
}

interface WishlistProductProps {
  productId: string;
  wishlistId: string;
  removeFromWishlist: (wishlistId: string, productId: string) => void;
}

const WishlistProductCard = ({
  productId,
  wishlistId,
  removeFromWishlist,
}: WishlistProductProps) => {
  const [product, setProduct] = useState<Product | null>(null);

  // Fetch product details based on productId
  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const res = await fetch(`/api/products/${productId}`);
        const data = await res.json();
        setProduct(data);
      } catch (error) {
        console.error('Error fetching product details:', error);
      }
    };
    fetchProductDetails();
  }, [productId]);

  if (!product) {
    return <p>Loading...</p>; // You can add a proper loading spinner here
  }

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

        {/* Add to Cart Button, visible on hover over the entire card */}
        <button className="absolute bottom-0 left-0 w-full rounded-b-md bg-black py-2 text-white transition-opacity hover:bg-black/80 lg:opacity-0 lg:group-hover:opacity-100">
          Add to cart
        </button>

        {/* Discount percentage box */}
        {product.salePrice && (
          <div className="absolute left-2 top-2 rounded bg-button px-2 py-1 text-xs font-bold text-white">
            -{discountPercentage}%
          </div>
        )}

        {/* Wishlist delete icon */}
        <button
          onClick={() => removeFromWishlist(wishlistId, productId)}
          className="absolute right-2 top-2 text-red-500 hover:text-red-800"
        >
          <FaTrashAlt size={20} />
        </button>
      </div>

      {/* Product Details */}
      <div className="pt-2">
        <h3 className="mt-2 text-sm font-semibold hover:text-button hover:underline">
          <Link href={`/products/${product.id}`}>{product.title}</Link>
        </h3>

        {/* Price display with regular and sale price logic */}
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

        {/* Star rating and number of reviews */}
        <div className="mt-2 flex items-center">
          <StarRating rating={4} /> {/* Example rating */}
          <span className="ml-1 text-sm text-gray-500">(95)</span>{' '}
          {/* Example reviews */}
        </div>
      </div>
    </div>
  );
};

export default WishlistProductCard;
