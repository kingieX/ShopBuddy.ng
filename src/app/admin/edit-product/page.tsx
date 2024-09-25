// /pages/admin/edit-products/[id].tsx
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import EditProductForm from "./[id]/_components/EditProductForm";
import Skeleton from "@/app/components/Skeleton";

export default function EditProduct() {
  const router = useRouter();
  const { id } = router.query; // Get the product ID from the URL
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (id) {
      async function fetchProduct() {
        try {
          const response = await fetch(`/api/products/${id}`);
          if (!response.ok) {
            throw new Error("Failed to fetch product.");
          }
          const data = await response.json();
          setProduct(data);
        } catch (error) {
          setError(true);
          console.error("Error fetching product:", error);
        } finally {
          setLoading(false);
        }
      }
      fetchProduct();
    }
  }, [id]);

  if (error) return <p>Failed to load product.</p>;

  return (
    <div>
      <h1 className="text-xl lg:text-2xl text-black font-semibold ml-4 mb-4">
        Edit Product
      </h1>
      {loading ? (
        <Skeleton height="80px" />
      ) : (
        product && <EditProductForm product={product} />
      )}
    </div>
  );
}
