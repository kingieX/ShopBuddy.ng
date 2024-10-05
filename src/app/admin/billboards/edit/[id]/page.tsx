// Import necessary modules and components
import AdminLayout from '../../../page';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import Link from 'next/link';
import EditPromotionForm from './_components/EditPromotionForm'; // Import the EditPromotionForm
import prisma from '@/lib/db/prisma';
import { notFound } from 'next/navigation'; // For handling non-existing promotions

interface EditPromotionProps {
  params: {
    id: string; // Capture the promotion ID from the URL
  };
}

// Define the async function to fetch the promotion details
export default async function EditPromotion({ params }: EditPromotionProps) {
  const promotionId = params.id;

  // Fetch the promotion details from the database
  const promotion = await prisma.promotion.findUnique({
    where: {
      id: promotionId,
    },
  });

  // If promotion doesn't exist, return a 404 page
  if (!promotion) {
    return notFound();
  }

  return (
    <AdminLayout>
      <div>
        <header className="stick z-5 top-0 flex h-14 items-center gap-4 border-b bg-white px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
          <Breadcrumb className="flex">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href="/admin/billboards">Promotions</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Edit Promotion</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </header>
        {/* Render the EditPromotionForm and pass the fetched promotion as a prop */}
        <div className="py-8">
          <EditPromotionForm promotion={promotion} />
        </div>
      </div>
    </AdminLayout>
  );
}
