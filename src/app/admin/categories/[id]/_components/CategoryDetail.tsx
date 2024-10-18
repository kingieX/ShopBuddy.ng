'use client';

import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'; // Using Shadcn components
import { Badge } from '@/components/ui/badge';
import CurrencyFormatter from '@/app/constants/CurrencyFormatter';
import Image from 'next/image';
import StarRating from '@/app/constants/StarRating';

// interface CategoryDetailProps {
//   category: {
//     id: string;
//     name: string;
//     products: {
//       id: string;
//       title: string;
//       mainImage: string;
//       regularPrice: number;
//       salePrice?: number;
//       status: string;
//       createdAt: string;
//     }[];
//   };
// }

interface CategoryDetailProps {
  category: {
    id: string;
    name: string;
    products: {
      id: string;
      title: string;
      mainImage: string;
      regularPrice: number;
      salePrice?: number | null; // Update the type definition to allow for null values
      status: string;
      createdAt: string;
    }[];
  };
}

const CategoryDetail: React.FC<CategoryDetailProps> = ({ category }) => {
  const router = useRouter();

  const handleDelete = async (productId: string) => {
    try {
      const res = await fetch(`/api/admin/products/${productId}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        router.refresh(); // Refresh page after deletion
      } else {
        console.error('Failed to delete the product.');
      }
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold">Category: {category.name}</h1>

      <Link href="/admin/categories">
        <button className="mt-4 flex items-center justify-center gap-2 rounded-md bg-button px-4 py-2 text-white transition-colors hover:bg-blue-600">
          Back to Categories
        </button>
      </Link>

      <h2 className="mb-4 mt-8 text-xl font-semibold">
        Products in this Category
      </h2>

      {category.products.length > 0 ? (
        <Table className="w-full">
          <TableHeader>
            <TableRow>
              <TableHead>Product Name</TableHead>
              <TableHead>Regular Price</TableHead>
              <TableHead>Sale Price</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {category.products.map((product) => (
              <TableRow key={product.id}>
                {/* <TableCell>{product.title}</TableCell> */}
                <TableCell className="flex items-center space-x-2">
                  <Image
                    src={product.mainImage || ''}
                    alt={product.title}
                    width={64}
                    height={64}
                    className="h-16 w-16 rounded-md bg-gray-200"
                  />
                  <div>
                    <p className="font-semibold text-black">{product.title}</p>
                    <StarRating rating={4.5} />
                  </div>
                </TableCell>
                <TableCell>
                  <CurrencyFormatter amount={product.regularPrice} />
                </TableCell>
                <TableCell>
                  {product.salePrice ? (
                    <CurrencyFormatter amount={product.salePrice} />
                  ) : (
                    <CurrencyFormatter amount={product.regularPrice} />
                  )}
                </TableCell>
                <TableCell>
                  {product.status === 'on_sale' ? (
                    <Badge className="bg-green-100 text-success">On sale</Badge>
                  ) : (
                    <Badge className="bg-red-100 text-error">Sold out</Badge>
                  )}
                </TableCell>
                <TableCell className="space-x-2">
                  <Link href={`/admin/edit-product/${product.id}`}>
                    <button className="rounded bg-yellow-500 px-2 py-1 text-white hover:bg-yellow-400">
                      Edit
                    </button>
                  </Link>
                  <Link href={`/admin/products/${product.id}`}>
                    <button
                      className="rounded bg-green-500 px-2 py-1 text-white hover:bg-green-400"
                      // onClick={() => handleDelete(product.id)}
                    >
                      view
                    </button>
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <p>No products found in this category.</p>
      )}
    </div>
  );
};

export default CategoryDetail;
