'use client';
import { useEffect, useState } from 'react';
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
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Separator } from '@/components/ui/separator';
import { Copy, Truck, MoreVertical } from 'lucide-react';
import {
  Order,
  OrderItem,
  BillingDetails,
  User,
  Product,
  OrderStatus,
} from '../../../../types/types';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import Image from 'next/image';
import CurrencyFormatter from '@/app/constants/CurrencyFormatter';

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

const OrdersDetails = () => {
  const { id: orderId } = useParams() as { id: string };
  const [order, setOrder] = useState<Order | null>(null);

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const res = await fetch(`/api/admin/orders/${orderId}`, {
          method: 'GET',
          headers: {
            'Cache-Control': 'no-store, no-cache, must-revalidate', // Prevent caching
            Pragma: 'no-cache',
            Expires: '0',
          },
        });
        if (!res.ok) throw new Error('Failed to fetch order');
        const data = await res.json();
        setOrder(data);
        console.log('Order:', data);
      } catch (error) {
        console.error('Error fetching order details:', error);
      }
    };
    fetchOrderDetails();
  }, [orderId]);

  if (!order) {
    console.log('Order is null or undefined:', order);
    return <div className="mt-10 text-center italic">No order details...</div>;
  }

  return (
    <div>
      <header className="sticky top-0 z-10 flex h-14 items-center gap-4 border-b bg-white px-4">
        <Breadcrumb className="flex">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/admin/orders" className="hover:underline">
                  Orders
                </Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Order Details</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </header>

      <Card className="overflow-hidden">
        <CardHeader className="bg-muted/50 flex flex-row items-start border-b">
          <div className="grid gap-0.5">
            <CardTitle className="group flex items-center gap-2 text-lg">
              Order ID: {order.id}
            </CardTitle>
            <CardDescription>
              <span className="font-semibold">Order Date: </span>
              {new Date(order.createdAt).toLocaleString('en-US', {
                weekday: 'short',
                year: 'numeric',
                month: 'short',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
                hour12: true,
              })}
            </CardDescription>
          </div>
          <div className="ml-auto flex items-center gap-1">
            <Button
              size="sm"
              variant="outline"
              className={`mb-2 font-semibold uppercase lg:py-2 ${getStatusColor(order.status)}`}
            >
              {order.status}
            </Button>
          </div>
        </CardHeader>
        {/* header for product */}
        <div className="border-b bg-white px-8 py-2">
          <ul className="flex items-center justify-between font-semibold">
            <li className="w-2/5">Products</li>
            <li className="flex w-1/5 justify-end pr-4">Quantity</li>
            <li className="flex w-1/5 justify-end pr-4">price</li>
            <li className="flex w-1/5 justify-end">Amounts</li>
          </ul>
        </div>
        <CardContent className="p-6">
          <div className="grid gap-3">
            {/* product details */}
            <ul className="grid gap-4">
              {order?.items?.map((item: OrderItem) => (
                <li
                  key={item.id}
                  className="flex items-center justify-between gap-8 border-b pb-4"
                >
                  <div className="flex w-2/5 items-center gap-2">
                    {item?.product?.mainImage ? (
                      <Image
                        src={item.product.mainImage}
                        alt={item.product.title}
                        width={1500}
                        height={1500}
                        className="h-12 w-12 rounded-lg border object-contain p-1"
                      />
                    ) : (
                      <div className="h-12 w-12 rounded-lg bg-gray-200" />
                    )}
                    <span className="text-sm lg:text-lg">
                      {item?.product?.title}
                    </span>
                  </div>
                  <span className="flex w-1/5 justify-end pr-4">
                    {item.quantity}
                  </span>
                  <span className="flex w-1/5 justify-end pr-4">
                    <CurrencyFormatter amount={item.price} />
                  </span>
                  <span className="flex w-1/5 justify-end pr-4">
                    <CurrencyFormatter amount={item.price * item.quantity} />
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </CardContent>

        {/* order summary */}
        <div className="border bg-white px-4 py-2">
          <p className="font-semibold">Order summary</p>
        </div>

        <CardContent className="p-6">
          <div>
            <ul className="grid gap-3">
              <li className="flex items-center justify-between">
                <span className="text-muted-foreground">Subtotal</span>
                <span>
                  <CurrencyFormatter
                    amount={
                      order.totalAmount - order.deliveryFee - order.vat - 1000
                    }
                  />
                </span>
              </li>
              <li className="flex items-center justify-between">
                <span className="text-muted-foreground">Delivery Fee</span>
                <span>
                  <CurrencyFormatter amount={order.deliveryFee} />
                </span>
              </li>
              <li className="flex items-center justify-between">
                <span className="text-muted-foreground">Service Fee</span>
                <span>
                  <CurrencyFormatter amount={1000} />
                </span>
              </li>
              <li className="flex items-center justify-between">
                <span className="text-muted-foreground">VAT</span>
                <span>
                  <CurrencyFormatter amount={order.vat} />
                </span>
              </li>
              <li className="flex items-center justify-between font-semibold">
                <span className="text-muted-foreground">Total</span>
                <span>
                  <CurrencyFormatter amount={order.totalAmount} />
                </span>
              </li>
            </ul>
          </div>
        </CardContent>

        {/* Billing information */}
        <div className="border bg-white px-4 py-2">
          <p className="font-semibold">Billing Information</p>
        </div>

        <CardContent className="p-6">
          <div>
            <ul className="grid gap-3">
              <li className="flex items-center justify-between">
                <span className="text-muted-foreground">Fullname</span>
                <span>{order?.billingDetails?.fullname}</span>
              </li>
              <li className="flex items-center justify-between">
                <span className="text-muted-foreground">Email</span>
                <span>{order?.billingDetails?.email}</span>
              </li>
              <li className="flex items-center justify-between">
                <span className="text-muted-foreground">Address</span>
                <span>
                  {order?.billingDetails?.address},{' '}
                  {order?.billingDetails?.city}, {order?.billingDetails?.state}
                </span>
              </li>
              <li className="flex items-center justify-between">
                <span className="text-muted-foreground">Phone</span>
                <span>{order?.billingDetails?.phone}</span>
              </li>
            </ul>
          </div>
        </CardContent>
        {/* Customer Information */}
        <div className="border bg-white px-4 py-2">
          <p className="font-semibold">Customer Information</p>
        </div>

        <CardContent className="p-6">
          <div className="grid gap-3">
            <dl className="grid gap-3">
              <div className="flex items-center justify-between">
                <dt className="text-muted-foreground">Customer</dt>
                <dd>{`${order?.user?.firstName} ${order?.user?.lastName}`}</dd>
              </div>
              <div className="flex items-center justify-between">
                <dt className="text-muted-foreground">Email</dt>
                <dd>
                  <a href={`mailto:${order?.user?.email}`}>
                    {order?.user?.email}
                  </a>
                </dd>
              </div>
              <div className="flex items-center justify-between">
                <dt className="text-muted-foreground">Phone</dt>
                <dd>
                  <a href={`tel:${order?.user?.phoneNumber}`}>
                    {order?.user?.phoneNumber}
                  </a>
                </dd>
              </div>
            </dl>
          </div>
        </CardContent>
        <CardFooter className="bg-muted/50 flex flex-row items-center border-t px-6 py-3">
          <div className="text-muted-foreground text-xs">
            <span className="font-semibold">Updated: </span>
            <time dateTime={order.updatedAt.toString()}>
              {new Date(order.updatedAt).toLocaleString('en-US', {
                weekday: 'short',
                year: 'numeric',
                month: 'short',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
                hour12: true,
              })}
            </time>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default OrdersDetails;
