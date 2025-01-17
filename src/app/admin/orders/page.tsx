'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  File,
  Home,
  LineChart,
  ListFilter,
  Package,
  Package2,
  PanelLeft,
  Search,
  ShoppingCart,
  Users2,
} from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import * as Tooltip from '@radix-ui/react-tooltip';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import AdminLayout from '../layout';
import CurrencyFormatter from '@/app/constants/CurrencyFormatter';
import { Order, OrderStatus } from '../../../types/types';
import { ScrollArea } from '@/components/ui/scroll-area';

const getStatusColor = (status: OrderStatus) => {
  switch (status) {
    case 'PENDING':
      return 'text-yellow-500';
    case 'PAID':
      return 'text-green-500';
    case 'INPROGRESS':
      return 'text-orange-500';
    case 'SHIPPED':
      return 'text-indigo-500';
    case 'DELIVERED':
      return 'text-purple-500';
    case 'CANCELED':
      return 'text-red-500';
    default:
      return 'text-gray-500';
  }
};

const Orders: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [activeTab, setActiveTab] = useState<string>('all');

  // Fetch orders on component mount and when data changes
  const fetchOrders = async () => {
    try {
      const response = await fetch('/api/admin/orders', {
        method: 'GET',
        headers: {
          'Cache-Control': 'no-store, no-cache, must-revalidate', // Prevent caching
          Pragma: 'no-cache',
          Expires: '0',
          cache: 'no-store',
        },
      });

      if (!response.ok) {
        console.error(
          'Error fetching orders:',
          response.status,
          response.statusText
        );
        return;
      }

      const data = await response.json();
      console.log('Fetched orders:', data); // Check the data being returned
      setOrders(data.orders);
      // console.log('Fetched orders:', data.orders);
    } catch (error) {
      console.error('Failed to fetch orders:', error);
    }
  };

  // Fetch orders on mount and when the status is updated
  useEffect(() => {
    fetchOrders();
  }, []); // Empty array ensures fetch is done only once on mount

  // Filter orders based on activeTab
  const filteredOrders =
    activeTab === 'all'
      ? orders
      : orders.filter((order) => order.status.toLowerCase() === activeTab);

  // Update order status and refetch orders
  // const updateOrderStatus = async (orderId: string, newStatus: OrderStatus) => {
  //   try {
  //     const response = await fetch(`/api/admin/orders/${orderId}`, {
  //       method: 'PATCH',
  //       headers: {
  //         'Content-Type': 'application/json',
  //         'Cache-Control': 'no-store, no-cache, must-revalidate', // Prevent caching
  //       },
  //       body: JSON.stringify({ status: newStatus }),
  //     });

  //     if (!response.ok) {
  //       console.error('Failed to update order status');
  //       return;
  //     }

  //     // Refetch orders after status update
  //     await fetchOrders();
  //   } catch (error) {
  //     console.error('Error updating order status:', error);
  //   }
  // };

  // Optimistic Update: Update the UI immediately and then update the server.
  const updateOrderStatus = async (orderId: string, newStatus: OrderStatus) => {
    // Optimistically update the UI
    setOrders((prevOrders) =>
      prevOrders.map((o) =>
        o.id === orderId ? { ...o, status: newStatus } : o
      )
    );

    try {
      const response = await fetch(`/api/admin/orders/${orderId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'no-store, no-cache, must-revalidate',
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!response.ok) {
        console.error('Failed to update order status');
        // If the server update failed, revert the change.
        fetchOrders(); // Refetch all orders to ensure they are in sync.
      } else {
        // Optionally: Refetch orders to ensure data consistency after the update.
        // fetchOrders();
      }
    } catch (error) {
      console.error('Error updating order status:', error);
      // If there was an error, revert the status update optimistically made
      fetchOrders(); // Refetch all orders to sync them correctly
    }
  };

  return (
    <div>
      <header className="sticky top-0 z-10 flex h-14 items-center gap-4 border-b bg-white px-4">
        <Breadcrumb className="flex">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="#">Orders</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Recent Orders</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </header>

      <main className="lg:grid-cols- xl:grid-cols- grid flex-1 items-start gap-4 p-4">
        <div className="grid auto-rows-max items-start gap-4 lg:col-span-2">
          <Tabs
            defaultValue="all"
            onValueChange={(value) => setActiveTab(value)}
          >
            <div className="flex items-center">
              <TabsList>
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="pending">Pending</TabsTrigger>
                <TabsTrigger value="paid">Paid</TabsTrigger>
                <TabsTrigger value="inprogress">In Progress</TabsTrigger>
                <TabsTrigger value="shipped">Shipped</TabsTrigger>
                <TabsTrigger value="delivered">Delivered</TabsTrigger>
                <TabsTrigger value="canceled">Canceled</TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value={activeTab} className="w-full">
              <Card className="w-full bg-white">
                <CardHeader className="px-7">
                  <CardTitle>Orders</CardTitle>
                  <CardDescription>
                    Recent orders from ShopBuddy.
                  </CardDescription>
                </CardHeader>
                <CardContent className="overflow-auto">
                  <ScrollArea>
                    <Table>
                      <Tooltip.TooltipProvider>
                        <TableHeader>
                          <TableRow>
                            <TableHead className="font-semibold">
                              Order ID
                            </TableHead>
                            <TableHead className="font-semibold">
                              Customer
                            </TableHead>
                            <TableHead className="hidden font-semibold md:table-cell">
                              Date
                            </TableHead>
                            <TableHead className="hidden font-semibold sm:table-cell">
                              Location
                            </TableHead>
                            <TableHead className="font-semibold">
                              Order Total
                            </TableHead>
                            <TableHead className="font-semibold">
                              Order Status
                            </TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {filteredOrders.length > 0 ? (
                            filteredOrders.map((order) => (
                              <TableRow key={order.id}>
                                <TableCell className="text-button">
                                  #{order.id}
                                </TableCell>
                                <TableCell>
                                  <div className="font-medium">
                                    {order.user?.firstName}{' '}
                                    {order.user?.lastName}
                                  </div>
                                  <div className="text-muted-foreground hidden text-sm md:inline">
                                    {order.user?.email}
                                  </div>
                                </TableCell>
                                <TableCell className="hidden md:table-cell">
                                  {new Date(order.createdAt).toLocaleString(
                                    'en-US',
                                    {
                                      weekday: 'short',
                                      year: 'numeric',
                                      month: 'short',
                                      day: 'numeric',
                                      hour: '2-digit',
                                      minute: '2-digit',
                                      second: '2-digit',
                                    }
                                  )}
                                </TableCell>
                                <TableCell className="hidden sm:table-cell">
                                  <Badge
                                    variant="secondary"
                                    className="text-xs"
                                  >
                                    {order.billingDetails?.address}
                                  </Badge>
                                </TableCell>
                                <TableCell>
                                  <CurrencyFormatter
                                    amount={order.totalAmount}
                                  />
                                </TableCell>
                                <TableCell>
                                  <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                      <Button
                                        variant="outline"
                                        size="sm"
                                        className={`mb-2 font-semibold lowercase lg:py-2 ${getStatusColor(order.status)}`}
                                      >
                                        {order.status}
                                      </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                      <DropdownMenuLabel>
                                        Set Status
                                      </DropdownMenuLabel>
                                      <DropdownMenuSeparator />
                                      <DropdownMenuRadioGroup
                                        value={order.status}
                                        onValueChange={(newStatus) => {
                                          // Update the order status in the frontend
                                          setOrders((prevOrders) =>
                                            prevOrders.map((o) =>
                                              o.id === order.id
                                                ? {
                                                    ...o,
                                                    status:
                                                      newStatus as OrderStatus,
                                                  }
                                                : o
                                            )
                                          );

                                          // Update status on the server
                                          updateOrderStatus(
                                            order.id,
                                            newStatus as OrderStatus
                                          );
                                        }}
                                      >
                                        <DropdownMenuRadioItem
                                          value="PENDING"
                                          className="text-yellow-500"
                                        >
                                          Pending
                                        </DropdownMenuRadioItem>
                                        <DropdownMenuRadioItem
                                          value="PAID"
                                          className="text-green-500"
                                        >
                                          Paid
                                        </DropdownMenuRadioItem>
                                        <DropdownMenuRadioItem
                                          value="INPROGRESS"
                                          className="text-orange-500"
                                        >
                                          In Progress
                                        </DropdownMenuRadioItem>
                                        <DropdownMenuRadioItem
                                          value="SHIPPED"
                                          className="text-indigo-500"
                                        >
                                          Shipped
                                        </DropdownMenuRadioItem>
                                        <DropdownMenuRadioItem
                                          value="DELIVERED"
                                          className="text-purple-500"
                                        >
                                          Delivered
                                        </DropdownMenuRadioItem>
                                        <DropdownMenuRadioItem
                                          value="CANCELED"
                                          className="text-red-500"
                                        >
                                          Canceled
                                        </DropdownMenuRadioItem>
                                      </DropdownMenuRadioGroup>
                                    </DropdownMenuContent>
                                  </DropdownMenu>
                                </TableCell>
                                <TableCell className="text-right">
                                  <Tooltip.Root>
                                    <Tooltip.Trigger asChild>
                                      <Link href={`/admin/orders/${order.id}`}>
                                        <Package2 className="h-4 w-4 cursor-pointer" />
                                      </Link>
                                    </Tooltip.Trigger>
                                    <Tooltip.Portal>
                                      <Tooltip.Content className="rounded bg-gray-700 px-2 py-1 text-sm text-white">
                                        view order
                                        <Tooltip.Arrow className="fill-gray-700" />
                                      </Tooltip.Content>
                                    </Tooltip.Portal>
                                  </Tooltip.Root>
                                </TableCell>
                              </TableRow>
                            ))
                          ) : (
                            <TableRow>
                              <TableCell
                                colSpan={6}
                                className="text-center italic"
                              >
                                No orders found
                              </TableCell>
                            </TableRow>
                          )}
                        </TableBody>
                      </Tooltip.TooltipProvider>
                    </Table>
                  </ScrollArea>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default Orders;
