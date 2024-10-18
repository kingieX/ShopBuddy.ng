// Import Prisma client from the centralized module
import prisma from '@/lib/db/prisma';
import AddProductForm from './_components/AddProductForm';
import AdminLayout from '../layout';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import Link from 'next/link';

export default async function AddProduct() {
  // Fetch categories from DB
  const categories = await prisma.category.findMany();

  // No need to map to only names, just pass the categories directly
  return (
    // <AdminLayout>
    <div>
      <header className="stick z-5 top-0 mt-5 flex h-14 items-center gap-4 border-b bg-white px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
        <Breadcrumb className="flex">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="#">Add product</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Product</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </header>
      {/* Pass categories with id and name as props to the form */}
      <div className="py-8">
        <AddProductForm initialCategories={categories} />
      </div>
    </div>
    // </AdminLayout>
  );
}
