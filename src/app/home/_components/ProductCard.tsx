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
    <div className="product-card rounded-lg border bg-white p-4 shadow-lg">
      <div className="bg-[#F5F5F5] p-2 lg:p-8">
        <img
          src={product.mainImage}
          alt={product.title}
          className="h-40 w-full rounded-lg object-contain"
        />
      </div>
      <h3 className="mt-2 font-semibold">{product.title}</h3>
      <p className="text-gray-500">
        <CurrencyFormatter
          amount={product.salePrice ? product.salePrice : product.regularPrice}
        />
      </p>
      <StarRating rating={3.5} />
    </div>
  );
};

export default ProductCard;
