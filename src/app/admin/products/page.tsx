'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import ProductsTable from './_components/ProductsTable';
import Skeleton from '@/app/components/Skeleton';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import AdminLayout from '../layout';

interface Product {
  id: string;
  title: string;
  category: {
    name: string;
  } | null;
}

export default function Products() {
  const [allProducts, setAllProducts] = useState<Product[]>([]); // All products for searching
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]); // Products after search filter
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [searchTerm, setSearchTerm] = useState(''); // State for search term
  const [page, setPage] = useState(1); // Track current page
  const [totalProducts, setTotalProducts] = useState(0); // Track total number of products
  const [limit, setLimit] = useState(10); // Number of products per page

  // Fetch all products for search on component mount
  useEffect(() => {
    async function fetchAllProducts() {
      try {
        const response = await fetch(`/api/products/all`, {
          method: 'GET',
          headers: {
            'Cache-Control': 'no-store, no-cache, must-revalidate', // Prevent caching
            Pragma: 'no-cache',
            Expires: '0',
          },
        });
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        const data = await response.json();
        setAllProducts(data.products); // Store all products for search
        setTotalProducts(data.total); // Store total products count for pagination
        setFilteredProducts(data.products); // Set initial filtered products (all products initially)
      } catch (error) {
        console.error('Error fetching products:', error);
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    fetchAllProducts();
  }, []);

  // Filter all products based on the search term
  useEffect(() => {
    if (!searchTerm) {
      // If no search term, reset to all products
      setFilteredProducts(allProducts);
    } else {
      // Filter all products based on the search term
      const filtered = allProducts.filter((product) => {
        const nameMatches = product.title
          ?.toLowerCase()
          .includes(searchTerm.toLowerCase());
        const categoryMatches = product.category?.name
          ?.toLowerCase()
          .includes(searchTerm.toLowerCase());
        return nameMatches || categoryMatches;
      });
      setFilteredProducts(filtered);
    }
  }, [searchTerm, allProducts]);

  const handleDeleteProduct = async (id: string) => {
    try {
      const response = await fetch(`/api/products/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete the product');
      }
      // After deleting a product, remove it from the filtered list
      setAllProducts(allProducts.filter((product) => product.id !== id));
      setFilteredProducts(
        filteredProducts.filter((product) => product.id !== id)
      );
    } catch (error) {
      console.error('Error deleting product:', error);
      setError(true);
    }
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage); // Update the page number
  };

  if (error) return <p>Failed to load products.</p>;

  // Pagination helpers
  const totalPages = Math.ceil(filteredProducts.length / limit);
  const paginatedProducts = filteredProducts.slice(
    (page - 1) * limit,
    page * limit
  );

  return (
    <div className="">
      {/* Page Heading */}
      <header className="stick z-5 top-0 mt-5 flex h-14 items-center gap-4 border-b bg-white px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
        <Breadcrumb className="flex">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="#">products</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>All Products</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </header>

      {/* Container for Add Product and Search */}
      <div className="mx-4 my-4 rounded-md bg-white">
        <div className="flex flex-col items-start justify-between gap-4 border-b px-4 py-4 lg:flex-row lg:items-center">
          {/* Add Product Button */}
          <Link
            href="/admin/add-product"
            className="flex items-center justify-center gap-2 rounded-md bg-button px-4 py-2 text-white transition-colors hover:bg-blue-600"
          >
            + Add product
          </Link>

          {/* Search Input */}
          <div className="flex items-center space-x-2">
            <p className="text-gray-500">Search:</p>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)} // Update search term on input change
              className="rounded-sm border px-2 py-1 text-sm outline-primary"
              placeholder="Search products by name or category..."
            />
          </div>
        </div>

        {/* Products Table */}
        <div className="overflow-hidden px-4 py-4">
          {loading ? (
            <div className="space-y-4">
              {/* Skeleton for multiple rows */}
              <Skeleton height="40px" />
              <Skeleton height="80px" />
              <Skeleton height="80px" />
              <Skeleton height="80px" />
              <Skeleton height="80px" />
            </div>
          ) : paginatedProducts.length > 0 ? (
            <ProductsTable
              products={paginatedProducts as any}
              onDelete={handleDeleteProduct}
            />
          ) : (
            <p className="mt-4 text-center text-gray-500">No products found.</p> // No products message
          )}

          {/* Pagination Controls */}
          <div className="mt-4 flex justify-center space-x-4">
            <button
              onClick={() => handlePageChange(page - 1)}
              disabled={page === 1}
              className="rounded-md bg-gray-300 px-4 py-2 hover:bg-gray-400 disabled:opacity-50"
            >
              Previous
            </button>
            <span className="px-4 py-2">{`Page ${page} of ${totalPages}`}</span>
            <button
              onClick={() => handlePageChange(page + 1)}
              disabled={page === totalPages}
              className="rounded-md bg-gray-300 px-4 py-2 hover:bg-gray-400 disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
