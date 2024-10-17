import Footer from '@/app/components/Footer';
import Navbar from '@/app/components/NavBar';
import prisma from '@/lib/db/prisma';
import { notFound } from 'next/navigation';
import ProductDetailComponent from './_components/ProductDetailComponent';

const ProductDetailPage = async ({ params }: { params: { id: string } }) => {
  const { id } = params;

  // Debugging: Log the ID to make sure it's correct
  console.log('Fetching product with ID:', id);

  try {
    const product = await prisma.product.findUnique({
      where: { id },
      include: { category: true }, // Include related data if necessary
    });

    // console.log('Product:', product);

    if (!product) {
      return notFound();
    }

    return (
      <>
        <Navbar isAuthPage={false} />
        <div className="py-10">
          <ProductDetailComponent product={product} />
        </div>
        <Footer />
      </>
    );
  } catch (error) {
    console.error('Error fetching product:', error); // Log the error
    return <p>Internal Server Error. Please try again later.</p>;
  }
};

export default ProductDetailPage;
