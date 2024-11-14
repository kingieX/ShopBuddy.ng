'use client';
import React, { useEffect, useState } from 'react';
import ProductCard from './ProductCard';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';

interface Product {
  id: string;
  title: string;
  description: string;
  regularPrice: number;
  salePrice?: number;
}

const SearchProducts: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>(''); // State for the search query
  const [products, setProducts] = useState<Product[]>([]); // Initially, no products loaded
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]); // Initially show no filtered products

  // Fetch products from the API on mount
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('/api/products/all'); // Replace with your actual API endpoint
        const data = await response.json();
        setProducts(data.products || []); // Save fetched products to state
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  // Handle search input change
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value;
    setSearchQuery(query); // Update the search query

    // Filter products based on the search query
    if (query.trim() === '') {
      setFilteredProducts([]); // If there's no search query, don't show any products
    } else {
      const filtered = products.filter((product) => {
        // Simple search by title and description (case-insensitive)
        return (
          product.title.toLowerCase().includes(query.toLowerCase()) ||
          product.description.toLowerCase().includes(query.toLowerCase())
        );
      });

      setFilteredProducts(filtered); // Update filtered products
    }
  };

  // WhatsApp link for inquiries

  const whatsappLink = `https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER}?text=Hi,%20I%20am%20interested%20in%20ordering%20a%20product%20that%20is%20not%20available%20on%20your%20website.`; // Replace with your own phone number

  console.log('whatsappLink', whatsappLink);

  return (
    <div>
      <div className="w-full py-8 pt-14 sm:py-16">
        {/* Search Bar */}
        <div className="relative mb-6">
          <Input
            type="text"
            placeholder="Search for products..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="w-full rounded-md border border-gray-300 p-2 px-8"
          />
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-500" />
        </div>

        {/* Product List */}
        <div className="grid w-full grid-cols-2 gap-4 lg:grid-cols-4">
          {searchQuery.trim() === '' ? (
            // If there's no search query, show a message in the center
            <div className="col-span-full flex items-center justify-center">
              <p className="text- text-center text-gray-500">
                Please enter a search query to find products.
              </p>
            </div>
          ) : filteredProducts.length > 0 ? (
            // If there are filtered products, show them
            filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product as any} />
            ))
          ) : (
            // If no products match the search, show a "No products found" message
            <div className="col-span-full flex min-h-[200px] flex-col items-center justify-center">
              <p className="text- text-center text-gray-500">
                No products found
              </p>

              <p className="max-w-md pt-4 text-center text-green-500">
                No worries, we’ve got you covered! If you can’t find what you
                need, just let us know, and we’ll get it for you through
                WhatsApp!
              </p>

              {/* WhatsApp Button */}
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center justify-center rounded-md bg-green-500 px-4 py-2 text-sm font-medium text-white hover:bg-green-600"
              >
                <FaWhatsapp className="mr-2 h-5 w-5" />
                <span>Order via WhatsApp</span>
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchProducts;
