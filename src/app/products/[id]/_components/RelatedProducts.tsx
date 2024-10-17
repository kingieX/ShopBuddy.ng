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
    salePrice?: number;
    status: string;
    category: {
      id: string;
      name: string;
    } | null;
    createdAt: string;
  };
}

const RelatedProducts: React.FC<RelatedProductsProps> = ({ product }) => {
  const [relatedProducts, setRelatedProducts] = useState([]);

  const categoryId = product.category?.id;
  const currentProductId = product.id;

  useEffect(() => {
    const fetchRelatedProducts = async () => {
      try {
        const res = await fetch(
          `/api/products/related?categoryId=${categoryId}`
        );
        const data = await res.json();
        console.log('Related products:', data);

        setRelatedProducts(data);
      } catch (error) {
        console.error('Failed to fetch related products', error);
      }
    };

    fetchRelatedProducts();
  }, [categoryId, currentProductId]);

  return (
    <div className="mt-10">
      <h2 className="mb-6 text-xl font-semibold">Related Products</h2>
      <div className="grid grid-cols-4 gap-4">
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
