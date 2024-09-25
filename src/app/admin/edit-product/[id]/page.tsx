// Assuming you have a folder structure like: app/edit-product/[id]/page.tsx

import prisma from '@/lib/db/prisma';
import EditProductForm from './_components/EditProductForm';
import { Product, Category } from '@prisma/client';

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
    <div>
      <EditProductForm product={product} initialCategories={initialCategories} />
    </div>
  );
};

export default EditProductPage;
