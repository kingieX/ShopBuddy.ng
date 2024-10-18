import prisma from '@/lib/db/prisma';
import AdminLayout from '../../layout';
import ProductDetailComponent from './_components/ProductDetailComponent';
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
const ProductDetailPage = async ({ params }: { params: { id: string } }) => {
  const { id } = params;

  // Debugging: Log the ID to make sure it's correct
  console.log('Fetching product with ID:', id);

  try {
    // Fetch the product by ID
    const product = await prisma.product.findUnique({
      where: { id },
      include: { category: true }, // Include related data if necessary
    });

    // Check if the product exists
    if (!product) {
      return <p>Product not found</p>; // Or handle the error in another way
    }

    return (
      <AdminLayout>
        <div>
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
                  <BreadcrumbPage>Product Details</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </header>
          <div className="my-4">
            <ProductDetailComponent product={product} />
          </div>
        </div>
      </AdminLayout>
    );
  } catch (error) {
    console.error('Error fetching product:', error); // Log the error
    return <p>Internal Server Error. Please try again later.</p>;
  }
};

export default ProductDetailPage;
