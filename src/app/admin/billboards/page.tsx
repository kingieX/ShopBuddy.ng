'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import PromotionTable from './_components/PromotionTable';
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

interface Promotion {
  id: string;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  status: string;
  imageUrl: string;
}

export default function Promotions() {
  const [promotions, setPromotions] = useState<Promotion[]>([]);
  const [filteredPromotions, setFilteredPromotions] = useState<Promotion[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [searchTerm, setSearchTerm] = useState(''); // State for search term

  useEffect(() => {
    async function fetchPromotions() {
      try {
        const response = await fetch('/api/admin/promotions', {
          method: 'GET',
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setPromotions(data);
        setFilteredPromotions(data); // Set filtered promotions initially
      } catch (error) {
        console.error('Error fetching promotions:', error);
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    fetchPromotions();
  }, []);

  // Filter promotions based on search term
  useEffect(() => {
    const filtered = promotions.filter((promotion) => {
      const titleMatches = promotion.title
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase());
      const descriptionMatches = promotion.description
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase());
      return titleMatches || descriptionMatches;
    });
    setFilteredPromotions(filtered);
  }, [searchTerm, promotions]);

  const handleDeletePromotion = async (id: string) => {
    try {
      const response = await fetch(`/api/admin/promotions/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete the promotion');
      }
      setPromotions(promotions.filter((promotion) => promotion.id !== id));
      setFilteredPromotions(
        filteredPromotions.filter((promotion) => promotion.id !== id)
      ); // Update filtered promotions
    } catch (error) {
      console.error('Error deleting promotion:', error);
      setError(true);
    }
  };

  if (error) return <p>Failed to load promotions.</p>;

  return (
    <AdminLayout>
      <div className="">
        {/* Page Heading */}
        <header className="stick z-5 top-0 mt-5 flex h-14 items-center gap-4 border-b bg-white px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
          <Breadcrumb className="flex">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href="#">promotions</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>All Promotions</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </header>

        {/* Container for Add Promotion and Search */}
        <div className="mx-4 my-4 rounded-md bg-white">
          <div className="flex flex-col items-start justify-between gap-4 border-b px-4 py-4 lg:flex-row lg:items-center">
            {/* Add Promotion Button */}
            <Link
              href="/admin/billboards/add"
              className="flex items-center justify-center gap-2 rounded-md bg-button px-4 py-2 text-white transition-colors hover:bg-blue-600"
            >
              + Add promotion
            </Link>

            {/* Search Input */}
            <div className="flex items-center space-x-2">
              <p className="text-gray-500">Search:</p>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)} // Update search term on input change
                className="rounded-sm border px-2 py-1 text-sm outline-primary"
                placeholder="Search promotions by title or description..."
              />
            </div>
          </div>

          {/* Promotions Table */}
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
            ) : filteredPromotions.length > 0 ? (
              <PromotionTable
                promotions={filteredPromotions}
                onDelete={handleDeletePromotion}
              />
            ) : (
              <p className="mt-4 text-center text-gray-500">
                No promotions found.
              </p> // No promotions message
            )}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
