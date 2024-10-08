'use client';
import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import Link from 'next/link';
import DeleteConfirmationModal from './DeleteConfirmationModal';
import { ScrollArea } from '@/components/ui/scroll-area';
import { EyeIcon } from 'lucide-react';
import { LiaEdit } from 'react-icons/lia';
import { RiDeleteBin6Line } from 'react-icons/ri';
import * as Tooltip from '@radix-ui/react-tooltip';

interface Category {
  id: string;
  name: string;
  _count: {
    products: number; // The product count for each category
  };
}

interface CategoryTableProps {
  categories: Category[];
  onDelete: (id: string) => void;
}

export default function CategoryTable({
  categories,
  onDelete,
}: CategoryTableProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null
  );

  const handleDeleteClick = (category: Category) => {
    setSelectedCategory(category);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedCategory(null);
  };

  const handleDeleteConfirm = () => {
    if (selectedCategory) {
      onDelete(selectedCategory.id);
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
                  <TableHead>Category Name</TableHead>
                  <TableHead>Number of products</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody className="text-gray-500">
                {categories.map((category) => (
                  <TableRow key={category.id}>
                    {/* Category name */}
                    <TableCell className="flex items-center space-x-2">
                      {category.name}
                    </TableCell>

                    {/* Number of products */}
                    <TableCell>{category._count.products}</TableCell>

                    {/* Action icons */}
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        {/* Tooltip for View */}
                        <Tooltip.Root>
                          <Tooltip.Trigger asChild>
                            <Link href={`/admin/categories/${category.id}`}>
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
                            <Link
                              href={`/admin/categories/edit/${category.id}`}
                            >
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
                            <span onClick={() => handleDeleteClick(category)}>
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
      {selectedCategory && (
        <DeleteConfirmationModal
          isOpen={isModalOpen}
          onClose={handleModalClose}
          onConfirm={handleDeleteConfirm}
          categoryName={selectedCategory.name}
        />
      )}
    </div>
  );
}
