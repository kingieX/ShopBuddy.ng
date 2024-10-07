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
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { EyeIcon } from 'lucide-react';
import { LiaEdit } from 'react-icons/lia';
import { RiDeleteBin6Line } from 'react-icons/ri';
import Image from 'next/image';
import * as Tooltip from '@radix-ui/react-tooltip';
import Link from 'next/link';
import DeleteConfirmationModal from './DeleteConfirmationModal';

interface Promotion {
  id: string;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  status: string;
  imageUrl: string;
}

interface PromotionTableProps {
  promotions: Promotion[];
  onDelete: (id: string) => void;
}

export default function PromotionTable({
  promotions,
  onDelete,
}: PromotionTableProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPromotion, setSelectedPromotion] = useState<Promotion | null>(
    null
  );

  const handleDeleteClick = (promotion: Promotion) => {
    setSelectedPromotion(promotion);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedPromotion(null);
  };

  const handleDeleteConfirm = () => {
    if (selectedPromotion) {
      onDelete(selectedPromotion.id);
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
                  <TableHead>Promotion</TableHead>
                  <TableHead>Start Date</TableHead>
                  <TableHead>End Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody className="text-gray-500">
                {promotions.map((promotion) => (
                  <TableRow key={promotion.id}>
                    <TableCell className="flex items-center space-x-2">
                      <Image
                        src={promotion.imageUrl || ''}
                        alt={promotion.title}
                        width={64}
                        height={64}
                        className="h-16 w-16 rounded-md bg-gray-200"
                      />
                      <div>
                        <p className="font-semibold text-black">
                          {promotion.title}
                        </p>
                        <p className="text-sm">{promotion.description}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      {new Date(promotion.startDate).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      {new Date(promotion.endDate).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      {promotion.status === 'active' ? (
                        <Badge className="bg-green-100 text-success">
                          Active
                        </Badge>
                      ) : (
                        <Badge className="bg-red-100 text-error">
                          Inactive
                        </Badge>
                      )}
                    </TableCell>

                    {/* Action icons */}
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        {/* Tooltip for View */}
                        <Tooltip.Root>
                          <Tooltip.Trigger asChild>
                            <Link href={`/admin/billboards/${promotion.id}`}>
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
                              href={`/admin/billboards/edit/${promotion.id}`}
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
                            <span onClick={() => handleDeleteClick(promotion)}>
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
      {selectedPromotion && (
        <DeleteConfirmationModal
          isOpen={isModalOpen}
          onClose={handleModalClose}
          onConfirm={handleDeleteConfirm}
          promotionName={selectedPromotion.title}
        />
      )}
    </div>
  );
}
