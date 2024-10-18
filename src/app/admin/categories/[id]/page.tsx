// pages/admin/categories/[id].tsx

import prisma from '@/lib/db/prisma';
import AdminLayout from '../../layout';
import CategoryDetail from './_components/CategoryDetail';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import Link from 'next/link';

const CategoryDetailPage = async ({ params }: { params: { id: string } }) => {
  const { id } = params;

  console.log('Fetching category with ID:', id);

  try {
    const category = await prisma.category.findUnique({
      where: { id },
      include: { products: true },
    });

    if (!category) {
      return <p>Category not found</p>;
    }

    return (
      <div>
        <header className="stick z-5 top-0 mt-5 flex h-14 items-center gap-4 border-b bg-white px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
          <Breadcrumb className="flex">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href="/admin/categories">Categories</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Category Details</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </header>
        <div className="my-4">
          <CategoryDetail category={category} />
        </div>
      </div>
    );
  } catch (error) {
    console.error('Error fetching category:', error);
    return <p>Internal Server Error. Please try again later.</p>;
  }
};

export default CategoryDetailPage;
