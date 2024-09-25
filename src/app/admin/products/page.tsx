// pages/admin/products/index.tsx (Updated)
'use client';

import Link from "next/link";
import { useState, useEffect } from "react";
import ProductsTable from "./_components/ProductsTable";
import Skeleton from "@/app/components/Skeleton";
import AdminLayout from "../page";

interface Product {
  id: string;
  title: string;
  category: {
    name: string;
  } | null;
}

export default function Products() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [searchTerm, setSearchTerm] = useState(""); // State for search term

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await fetch("/api/products", { method: 'GET' });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setProducts(data);
        setFilteredProducts(data); // Set filtered products initially
      } catch (error) {
        console.error("Error fetching products:", error);
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, []);

  // Filter products based on search term
  useEffect(() => {
    const filtered = products.filter((product) => {
      const nameMatches = product.title?.toLowerCase().includes(searchTerm.toLowerCase());
      const categoryMatches = product.category?.name?.toLowerCase().includes(searchTerm.toLowerCase());
      return nameMatches || categoryMatches;
    });
    setFilteredProducts(filtered);
  }, [searchTerm, products]);

  const handleDeleteProduct = async (id: string) => {
    try {
      const response = await fetch(`/api/products/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete the product');
      }
      setProducts(products.filter((product) => product.id !== id));
      setFilteredProducts(filteredProducts.filter((product) => product.id !== id)); // Update filtered products
    } catch (error) {
      console.error("Error deleting product:", error);
      setError(true);
    }
  };

  if (error) return <p>Failed to load products.</p>;

  return (
    <AdminLayout>
    <div className="">
      {/* Page Heading */}
      <h1 className="text-xl lg:text-2xl text-black font-semibold ml-4 mb-4">Products</h1>

      {/* Container for Add Product and Search */}
      <div className="mx-4 bg-white rounded-md">
        <div className="flex flex-col lg:flex-row justify-between lg:items-center items-start border-b py-4 px-4 gap-4">
          {/* Add Product Button */}
          <Link
            href='/admin/add-product'
            className="bg-button text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors flex justify-center items-center gap-2"
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
              className="border text-sm rounded-sm px-2 py-1 outline-primary" 
              placeholder="Search products by name or category..."
            />
          </div>
        </div>

        {/* Products Table */}
        <div className="py-4 px-4 overflow-hidden">
          {loading ? (
            <div className="space-y-4">
              {/* Skeleton for multiple rows */}
              <Skeleton height="40px" />
              <Skeleton height="80px" />
              <Skeleton height="80px" />
              <Skeleton height="80px" />
              <Skeleton height="80px" />
            </div>
          ) : (
            filteredProducts.length > 0 ? (
              <ProductsTable products={filteredProducts} onDelete={handleDeleteProduct} />
            ) : (
              <p className="text-center text-gray-500 mt-4">No products found.</p> // No products message
            )
          )}
        </div>
      </div>
    </div>
    </AdminLayout>
  );
}
