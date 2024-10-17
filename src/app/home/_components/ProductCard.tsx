'use client';

import CurrencyFormatter from '@/app/constants/CurrencyFormatter';
import StarRating from '@/app/constants/StarRating';
import Link from 'next/link';
import React from 'react';
import { IoIosHeartEmpty } from 'react-icons/io';
import { IoMdHeart } from 'react-icons/io';

interface Product {
  id: string;
  title: string;
  mainImage: string;
  regularPrice: number;
  salePrice?: number;
  status: string;
}

const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
  // Calculate discount percentage if sale price is given
  const discountPercentage = product.salePrice
    ? Math.round(
        ((product.regularPrice - product.salePrice) / product.regularPrice) *
          100
      )
    : 0;

  return (
    // <Link href={`/products/${product.id}`}>
    <div className="group relative rounded-lg border bg-white p-4 shadow-lg transition-shadow hover:shadow-xl">
      {/* Image and Cart button */}
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

        {/* Love icon */}
        <div className="absolute right-2 top-2 flex flex-col items-center">
          <div className="">
            {product.status == 'on_sale' ? (
              <button className="text-gray-500 hover:text-red-500">
                <IoIosHeartEmpty size={20} />
              </button>
            ) : (
              <span className="rounded bg-red-600 px-2 py-1 text-xs text-white">
                sold out
              </span>
            )}
          </div>
        </div>
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
              <span className="text-lg font-bold text-gray-900">
                <CurrencyFormatter amount={product.salePrice} />
              </span>
              <span className="text-sm text-gray-500 line-through">
                <CurrencyFormatter amount={product.regularPrice} />
              </span>
            </>
          ) : (
            <span className="text-lg font-bold text-gray-900">
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
    // </Link>
  );
};

export default ProductCard;
