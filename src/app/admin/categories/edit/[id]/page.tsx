import AdminLayout from '../../../layout';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import Link from 'next/link';
import EditCategoryForm from './_components/EditCategoryForm';
import prisma from '@/lib/db/prisma';

const EditCategory = async ({ params }: { params: { id: string } }) => {
  const { id } = params;

  // Fetch the category details from the database
  const category = await prisma.category.findUnique({
    where: { id },
  });

  // If category doesn't exist, return a 404 page
  if (!category) {
    return <p>Category not found</p>;
  }

  return (
    <div>
      <header className="stick z-5 top-0 flex h-14 items-center gap-4 border-b bg-white px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
        <Breadcrumb className="flex">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/admin/categories">Categories</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Edit Category</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </header>
      {/* Render the EditCategoryForm and pass the fetched category as a prop */}
      <div className="py-8">
        <EditCategoryForm category={category} />
      </div>
    </div>
  );
};

export default EditCategory;
