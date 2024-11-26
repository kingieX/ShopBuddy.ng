'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import CategoryTable from './_components/CategoryTable';
import Skeleton from '@/app/components/Skeleton';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';

interface Category {
  id: string;
  name: string;
}

const CategoryPage = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [filteredCategories, setFilteredCategories] = useState<Category[]>([]);

  useEffect(() => {
    // Fetch all categories
    const fetchCategories = async () => {
      try {
        const response = await fetch('/api/admin/categories', {
          method: 'GET',
          headers: {
            'Cache-Control': 'no-cache',
          },
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setCategories(data.categories);
      } catch (error) {
        console.error('Error fetching categories:', error);
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  //   Filter categories based on search term
  useEffect(() => {
    const filtered = categories.filter((category) => {
      const nameMatches = category.name
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase());
      return nameMatches;
    });
    setFilteredCategories(filtered);
  }, [searchTerm, categories]);

  const handleDeleteCategory = async (id: string) => {
    try {
      const response = await fetch(`/api/admin/categories/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete category');
      }
      setCategories(categories.filter((category) => category.id !== id));
      setFilteredCategories(
        filteredCategories.filter((category) => category.id !== id)
      ); // Update filtered categories
    } catch (error) {
      console.error('Error deleting category:', error);
      setError(true);
    }
  };

  if (error) return <p>Failed to load promotions.</p>;

  return (
    <div>
      {/* Page Heading */}
      <header className="stick z-5 top-0 mt-5 flex h-14 items-center gap-4 border-b bg-white px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
        <Breadcrumb className="flex">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="#">Categories</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>All Categories</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </header>

      {/* Container for Add Category and Search */}
      <div className="mx-4 my-4 rounded-md bg-white">
        <div className="flex flex-col items-start justify-between gap-4 border-b px-4 py-4 lg:flex-row lg:items-center">
          {/* Add Promotion Button */}
          <Link
            href="/admin/categories/add"
            className="flex items-center justify-center gap-2 rounded-md bg-button px-4 py-2 text-white transition-colors hover:bg-blue-600"
          >
            + Add Category
          </Link>

          {/* Search Input */}
          <div className="flex items-center space-x-2">
            <p className="text-gray-500">Search:</p>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)} // Update search term on input change
              className="rounded-sm border px-2 py-1 text-sm outline-primary"
              placeholder="Search category..."
            />
          </div>
        </div>

        {/* Category Table */}
        <div className="overflow-hidden px-4 py-4">
          {loading ? (
            <div className="space-y-4">
              {/* Skeleton for multiple rows */}
              <Skeleton height="20px" />
              <Skeleton height="40px" />
              <Skeleton height="40px" />
              <Skeleton height="40px" />
              <Skeleton height="40px" />
            </div>
          ) : filteredCategories.length > 0 ? (
            <CategoryTable
              categories={filteredCategories as any}
              onDelete={handleDeleteCategory}
            />
          ) : (
            <p className="mt-4 text-center text-gray-500">No Category found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;
