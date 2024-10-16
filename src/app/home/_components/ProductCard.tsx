'use client';

import CurrencyFormatter from '@/app/constants/CurrencyFormatter';
import StarRating from '@/app/constants/StarRating';
import React from 'react';

interface Product {
  id: string;
  title: string;
  mainImage: string;
  regularPrice: number;
  salePrice?: number;
}

const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
  return (
    <div className="rounded-lg border bg-white p-4 shadow-lg">
      <div className="relative bg-[#F5F5F5] p-2 lg:p-8">
        <img
          src={product.mainImage}
          alt={product.title}
          className="h-40 w-full rounded-lg object-contain"
        />
        <button className="absolute bottom-0 left-0 w-full rounded-b-md bg-black py-2 text-white hover:bg-black/70">
          Add to cart
        </button>
      </div>
      <div className="pt-2">
        <h3 className="mt-2 font-semibold">{product.title}</h3>
        <div className="flex place-items-baseline justify-start space-x-1">
          {product.salePrice === product.regularPrice ? (
            <span className="font-semibold text-gray-700">
              <CurrencyFormatter amount={product.regularPrice} />
            </span>
          ) : (
            <span className="font-semibold text-gray-700">
              <CurrencyFormatter amount={product.salePrice} />
            </span>
          )}

          {product.salePrice === product.regularPrice ? (
            ''
          ) : (
            <span className="text-gray-500 line-through">
              <CurrencyFormatter amount={product.regularPrice} />
            </span>
          )}
        </div>
        {/* <p className="text-gray-500">
        <CurrencyFormatter
          amount={product.salePrice ? product.salePrice : product.regularPrice}
        />
      </p> */}
        <StarRating rating={3.5} />
      </div>
    </div>
  );
};

export default ProductCard;
