'use client';

import React, { useEffect, useState } from 'react';
import ProductCard from './ProductCard';
import Link from 'next/link';

// Define the interfaces for Product and Category
interface Product {
  id: string;
  title: string;
  mainImage: string;
  regularPrice: number;
  salePrice?: number;
}

const AllProductSection: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);

  // Fetch categories with their products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('/api/products'); // Ensure this endpoint returns categories with products
        const data = await response.json();
        setProducts(data);
        // console.log('products:', data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="category-sections">
      <div className="category-section mb-8 py-4">
        {/* Category Header */}
        <div className="mb-4 flex items-center space-x-2">
          <div className="h-8 w-4 rounded bg-button"></div>
          <h2 className="text-sm font-bold text-button">Our products</h2>
        </div>
        <div className="category-header mb-8 flex items-center justify-between">
          <h2 className="text-xl font-semibold lg:text-4xl">
            Explore our products
          </h2>
        </div>

        {/* Products Grid */}
        <div className="products-grid grid grid-cols-2 gap-4 lg:grid-cols-4">
          {/* Check if category.products exists and is an array, then render the first 4 products */}
          {products ? (
            products
              .slice(0, 8)
              .map((product) => (
                <ProductCard key={product.id} product={product} />
              ))
          ) : (
            <p className="text-sm text-gray-500">No products available.</p>
          )}
        </div>
      </div>

      {/* button */}
      <div className="flex items-center justify-center">
        <Link
          href="/products"
          className="bg-button px-4 py-2 font-semibold text-white lg:hover:bg-blue-500"
        >
          View All Products
        </Link>
      </div>
    </div>
  );
};

export default AllProductSection;
