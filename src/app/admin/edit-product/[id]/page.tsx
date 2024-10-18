import prisma from '@/lib/db/prisma';
import EditProductForm from './_components/EditProductForm';
import { Product, Category } from '@prisma/client';
import AdminLayout from '../../layout';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import Link from 'next/link';

// Server Component (this can be a server action or a page component)
const EditProductPage = async ({ params }: { params: { id: string } }) => {
  const { id } = params;

  // Fetch the product by ID
  const product = await prisma.product.findUnique({
    where: { id },
    include: { category: true }, // Include related data if necessary
  });

  // Fetch initial categories
  const initialCategories = await prisma.category.findMany();

  // Check if the product exists
  if (!product) {
    return <p>Product not found</p>; // Or handle the error in another way
  }

  return (
    <AdminLayout>
      <div>
        {/* Page Heading */}
        <header className="stick z-5 top-0 mt-5 flex h-14 items-center gap-4 border-b bg-white px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
          <Breadcrumb className="flex">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href="/admin/products">products</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Edit Product</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </header>
        <div className="my-4">
          <EditProductForm
            product={product}
            initialCategories={initialCategories}
          />
        </div>
      </div>
    </AdminLayout>
  );
};

export default EditProductPage;
