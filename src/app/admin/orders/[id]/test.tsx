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
} from '../../../../types/types';
import { useParams } from 'next/navigation';

const OrdersDetails = () => {
  const { id: orderId } = useParams() as { id: string };
  const [order, setOrder] = useState<Order | null>(null);

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const res = await fetch(`/api/admin/orders/${orderId}`);
        if (!res.ok) throw new Error('Failed to fetch order');
        const data = await res.json();
        setOrder(data.order);
        console.log('Order:', data);
      } catch (error) {
        console.error('Error fetching order details:', error);
      }
    };
    fetchOrderDetails();
  }, [orderId]);

  if (!order) return <div>Loading...</div>;

  return (
    <div>
      <Card className="overflow-hidden">
        <CardHeader className="bg-muted/50 flex flex-row items-start">
          <div className="grid gap-0.5">
            <CardTitle className="group flex items-center gap-2 text-lg">
              Order {order.id}
              <Button
                size="icon"
                variant="outline"
                className="h-6 w-6 opacity-0 transition-opacity group-hover:opacity-100"
              >
                <Copy className="h-3 w-3" />
                <span className="sr-only">Copy Order ID</span>
              </Button>
            </CardTitle>
            <CardDescription>
              Date: {new Date(order.createdAt).toLocaleDateString()}
            </CardDescription>
          </div>
          <div className="ml-auto flex items-center gap-1">
            <Button size="sm" variant="outline" className="h-8 gap-1">
              <Truck className="h-3.5 w-3.5" />
              <span className="lg:sr-only xl:not-sr-only xl:whitespace-nowrap">
                Track Order
              </span>
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button size="icon" variant="outline" className="h-8 w-8">
                  <MoreVertical className="h-3.5 w-3.5" />
                  <span className="sr-only">More</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>Edit</DropdownMenuItem>
                <DropdownMenuItem>Export</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Trash</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </CardHeader>
        <CardContent className="p-6 text-sm">
          <div className="grid gap-3">
            <div className="font-semibold">Order Items</div>
            <ul className="grid gap-3">
              {order.items.map((item: OrderItem) => (
                <li key={item.id} className="flex items-center justify-between">
                  <span>
                    {item.product.title} x {item.quantity}
                  </span>
                  <span>${item.price * item.quantity}</span>
                </li>
              ))}
            </ul>
            <Separator className="my-2" />
            <ul className="grid gap-3">
              <li className="flex items-center justify-between">
                <span className="text-muted-foreground">Subtotal</span>
                <span>
                  ${order.totalAmount - order.deliveryFee - order.vat}
                </span>
              </li>
              <li className="flex items-center justify-between">
                <span className="text-muted-foreground">Delivery Fee</span>
                <span>${order.deliveryFee}</span>
              </li>
              <li className="flex items-center justify-between">
                <span className="text-muted-foreground">VAT</span>
                <span>${order.vat}</span>
              </li>
              <li className="flex items-center justify-between font-semibold">
                <span className="text-muted-foreground">Total</span>
                <span>${order.totalAmount}</span>
              </li>
            </ul>
          </div>
          <Separator className="my-4" />
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-3">
              <div className="font-semibold">Billing Information</div>
              <address className="text-muted-foreground grid gap-0.5 not-italic">
                <span>{order.billingDetails.fullName}</span>
                <span>{order.billingDetails.address}</span>
                <span>
                  {order.billingDetails.city}, {order.billingDetails.state}
                </span>
                <span>{order.billingDetails.phone}</span>
              </address>
            </div>
            <div className="grid auto-rows-max gap-3">
              <div className="font-semibold">Order Status</div>
              <div className="text-muted-foreground">{order.status}</div>
            </div>
          </div>
          <Separator className="my-4" />
          <div className="grid gap-3">
            <div className="font-semibold">Customer Information</div>
            <dl className="grid gap-3">
              <div className="flex items-center justify-between">
                <dt className="text-muted-foreground">Customer</dt>
                <dd>{`${order.user.firstName} ${order.user.lastName}`}</dd>
              </div>
              <div className="flex items-center justify-between">
                <dt className="text-muted-foreground">Email</dt>
                <dd>
                  <a href={`mailto:${order.user.email}`}>{order.user.email}</a>
                </dd>
              </div>
              <div className="flex items-center justify-between">
                <dt className="text-muted-foreground">Phone</dt>
                <dd>
                  <a href={`tel:${order.user.phoneNumber}`}>
                    {order.user.phoneNumber}
                  </a>
                </dd>
              </div>
            </dl>
          </div>
        </CardContent>
        <CardFooter className="bg-muted/50 flex flex-row items-center border-t px-6 py-3">
          <div className="text-muted-foreground text-xs">
            Updated{' '}
            <time dateTime={order.updatedAt.toString()}>
              {new Date(order.updatedAt).toLocaleDateString()}
            </time>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default OrdersDetails;
