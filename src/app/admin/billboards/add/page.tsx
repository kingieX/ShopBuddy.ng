'use client';
import { useState } from 'react';
import axios from 'axios';
import AdminLayout from '../../page';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import Link from 'next/link';
import AddPromotionForm from './_components/AddPromotionForm';

export default function AddPromotion() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [isActive, setIsActive] = useState(true);

  const handleSubmit = async () => {
    try {
      const data = {
        title,
        description,
        startDate,
        endDate,
        imageUrl,
        isActive,
      };
      await axios.post('/api/admin/promotions', data);
      // Success message or redirect
      console.log(
        'Promotion creating promotion successful! Redirecting to list page...'
      );
    } catch (error) {
      console.error('Error creating promotion', error);
    }
  };

  return (
    <AdminLayout>
      <header className="stick z-5 top-0 flex h-14 items-center gap-4 border-b bg-white px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
        <Breadcrumb className="flex">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/admin/billboards">Billboards</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Add Promotion</BreadcrumbPage>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Promotion</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </header>

      <div className="px-4 py-8">
        <AddPromotionForm onSubmit={handleSubmit} />
      </div>
    </AdminLayout>
  );
}
