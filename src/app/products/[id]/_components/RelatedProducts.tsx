import { useEffect, useState } from 'react';
import ProductCard from '@/app/home/_components/ProductCard';

interface RelatedProductsProps {
  product: {
    id: string;
    title: string;
    description: string;
    mainImage: string;
    galleryImages: string[];
    regularPrice: number;
    salePrice?: number | null;
    status: string;
    category: {
      id: string;
      name: string;
    } | null;
    createdAt: Date;
  };
}

const RelatedProducts: React.FC<RelatedProductsProps> = ({ product }) => {
  const [relatedProducts, setRelatedProducts] = useState([]);

  const categoryId = product.category?.id;
  const productId = product.id;

  useEffect(() => {
    const fetchRelatedProducts = async () => {
      try {
        const res = await fetch(
          `/api/products/related?categoryId=${categoryId}&productId=${productId}`
        );

        // Check if the response is OK
        if (!res.ok) {
          const errorText = await res.text(); // Read the error message as text
          throw new Error(errorText);
        }

        const data = await res.json(); // Parse the response if successful
        setRelatedProducts(data);
      } catch (error: any) {
        console.error('Failed to fetch related products', error.message);
      }
    };

    fetchRelatedProducts();
  }, [categoryId, productId]);

  return (
    <div className="mt-10 w-full">
      <h2 className="mb-6 text-xl font-semibold">Related Products</h2>
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {relatedProducts.length > 0 ? (
          relatedProducts.map((product: any) => (
            <ProductCard key={product.id} product={product} />
          ))
        ) : (
          <p>No related products found.</p>
        )}
      </div>
    </div>
  );
};

export default RelatedProducts;
