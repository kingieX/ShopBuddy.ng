import prisma from '@/lib/db/prisma';
import AdminLayout from '../../page';
import ProductDetailComponent from './_components/ProductDetailComponent';

// Server Component (this can be a server action or a page component)
const ProductDetailPage = async ({ params }: { params: { id: string } }) => {
  const { id } = params;

  // Debugging: Log the ID to make sure it's correct
  console.log("Fetching product with ID:", id);

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
          <h1 className="text-xl lg:text-2xl text-black font-semibold ml-4 mb-4">
            Product Details
          </h1>
          <ProductDetailComponent product={product} />
        </div>
      </AdminLayout>
    );
  } catch (error) {
    console.error("Error fetching product:", error); // Log the error
    return <p>Internal Server Error. Please try again later.</p>;
  }
};

export default ProductDetailPage;
