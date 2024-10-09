// components/ProductTable.tsx (Updated)
import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { EyeIcon } from 'lucide-react';
import { LiaEdit } from 'react-icons/lia';
import { RiDeleteBin6Line } from 'react-icons/ri';
import Image from 'next/image';
import CurrencyFormatter from '@/app/constants/CurrencyFormatter';
import StarRating from '@/app/constants/StarRating';
import { Product, Category } from '@prisma/client';
import * as Tooltip from '@radix-ui/react-tooltip';
import Link from 'next/link';
import DeleteConfirmationModal from './DeleteConfirmationModal';

interface ProductWithCategory extends Product {
  category: Category | null;
}

interface ProductsTableProps {
  products: ProductWithCategory[];
  onDelete: (id: string) => void; // Prop to handle deletion
}

export default function ProductsTable({
  products,
  onDelete,
}: ProductsTableProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] =
    useState<ProductWithCategory | null>(null);

  const handleDeleteClick = (product: ProductWithCategory) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  const handleDeleteConfirm = () => {
    if (selectedProduct) {
      onDelete(selectedProduct.id);
      handleModalClose();
    }
  };

  return (
    <div className="w-full overflow-auto">
      <ScrollArea>
        <div className="w-full max-w-xs overflow-x-auto lg:max-w-max">
          <Tooltip.TooltipProvider>
            <Table className="w-full min-w-[990px] px-2">
              <TableHeader>
                <TableRow className="bg-gray-50 text-gray-600">
                  <TableHead>Product</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Added Date</TableHead>
                  <TableHead>Regular Price</TableHead>
                  <TableHead>Sale Price</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody className="text-gray-500">
                {products.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell className="flex items-center space-x-2">
                      <Image
                        src={product.mainImage || ''}
                        alt={product.title}
                        width={64}
                        height={64}
                        className="h-16 w-16 rounded-md bg-gray-200"
                      />
                      <div>
                        <Link
                          className="font-semibold text-black hover:text-gray-600 hover:underline"
                          href={`/admin/products/${product.id}`}
                        >
                          <p className="">{product.title}</p>
                        </Link>
                        <StarRating rating={4.5} />
                      </div>
                    </TableCell>
                    <TableCell>
                      {product.category
                        ? product.category.name
                        : 'Uncategorized'}
                    </TableCell>
                    <TableCell>
                      {new Date(product.createdAt).toLocaleDateString()}
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
                        <Badge className="bg-green-100 text-success">
                          On sale
                        </Badge>
                      ) : (
                        <Badge className="bg-red-100 text-error">
                          Sold out
                        </Badge>
                      )}
                    </TableCell>

                    {/* redirection icons */}
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        {/* Tooltip for View */}
                        <Tooltip.Root>
                          <Tooltip.Trigger asChild>
                            <Link href={`/admin/products/${product.id}`}>
                              <EyeIcon className="h-5 w-5 cursor-pointer" />
                            </Link>
                          </Tooltip.Trigger>
                          <Tooltip.Portal>
                            <Tooltip.Content className="rounded bg-gray-700 px-2 py-1 text-sm text-white">
                              View
                              <Tooltip.Arrow className="fill-gray-700" />
                            </Tooltip.Content>
                          </Tooltip.Portal>
                        </Tooltip.Root>

                        {/* Tooltip for Edit */}
                        <Tooltip.Root>
                          <Tooltip.Trigger asChild>
                            <Link href={`/admin/edit-product/${product.id}`}>
                              <LiaEdit className="h-5 w-5 cursor-pointer" />
                            </Link>
                          </Tooltip.Trigger>
                          <Tooltip.Portal>
                            <Tooltip.Content className="rounded bg-gray-700 px-2 py-1 text-sm text-white">
                              Edit
                              <Tooltip.Arrow className="fill-gray-700" />
                            </Tooltip.Content>
                          </Tooltip.Portal>
                        </Tooltip.Root>

                        {/* Tooltip for Delete */}
                        <Tooltip.Root>
                          <Tooltip.Trigger asChild>
                            <span onClick={() => handleDeleteClick(product)}>
                              <RiDeleteBin6Line className="h-5 w-5 cursor-pointer text-red-400" />
                            </span>
                          </Tooltip.Trigger>
                          <Tooltip.Portal>
                            <Tooltip.Content className="rounded bg-gray-700 px-2 py-1 text-xs text-white">
                              Delete
                              <Tooltip.Arrow className="fill-gray-700" />
                            </Tooltip.Content>
                          </Tooltip.Portal>
                        </Tooltip.Root>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Tooltip.TooltipProvider>
        </div>
      </ScrollArea>

      {/* Delete Confirmation Modal */}
      {selectedProduct && (
        <DeleteConfirmationModal
          isOpen={isModalOpen}
          onClose={handleModalClose}
          onConfirm={handleDeleteConfirm}
          productName={selectedProduct.title}
        />
      )}
    </div>
  );
}
