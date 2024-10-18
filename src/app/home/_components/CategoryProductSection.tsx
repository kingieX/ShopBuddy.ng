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

interface Category {
  id: string;
  name: string;
  products?: Product[]; // products may be undefined
}

const CategoryProductSection: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);

  // Fetch categories with their products
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('/api/admin/categories'); // Ensure this endpoint returns categories with products
        const data = await response.json();
        setCategories(data.categories);
        // console.log('categories:', data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  return (
    <div className="category-sections">
      {categories.map((category) => (
        <div key={category.id} className="category-section mb-8 py-4">
          {/* Category Header */}
          <div className="mb-4 flex items-center space-x-2">
            <div className="h-8 w-4 rounded bg-button"></div>
            <h2 className="text-sm font-bold text-button">Category</h2>
          </div>
          <div className="category-header mb-8 flex items-center justify-between">
            <h2 className="text-xl font-semibold lg:text-4xl">
              {category.name}
            </h2>
            <Link
              href={`/category/${category.id}`}
              className="font-semibold text-button hover:underline lg:bg-button lg:px-4 lg:py-2 lg:text-white lg:hover:bg-blue-500"
            >
              View All
            </Link>
          </div>

          {/* Products Grid */}
          <div className="products-grid grid grid-cols-2 gap-4 lg:grid-cols-4">
            {/* Check if category.products exists and is an array, then render the first 4 products */}
            {category.products && category.products.length > 0 ? (
              category.products
                .slice(0, 4)
                .map((product) => (
                  <ProductCard key={product.id} product={product as any} />
                ))
            ) : (
              <p className="text-sm text-gray-500">
                No products available in this category.
              </p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default CategoryProductSection;
