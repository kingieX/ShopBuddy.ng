'use client';
import Navbar from '@/app/components/NavBar';
import Footer from '@/app/components/Footer';
import { useSession, getSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import Link from 'next/link';
import SideMenu from '@/app/components/SideMenu';
import { Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';
import CurrencyFormatter from '@/app/constants/CurrencyFormatter';
import Image from 'next/image';
import { Payment, OrderStatus, OrderItem } from '../../../types/orderTypes';

// Utility for styling based on order status
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

const OrderDetail = () => {
  const [order, setOrder] = useState<Payment | null>(null);
  const [loading, setLoading] = useState(true);
  const { data: session } = useSession();
  const router = useRouter();
  // Get the `orderId` from the path
  const params = useParams();
  // console.log('Params:', params);

  const paymentId = params?.id as string | undefined;

  useEffect(() => {
    const securePage = async () => {
      const session = await getSession();
      if (!session) {
        router.push('/auth/signin');
        return;
      }
    };
    securePage();
  }, [router]);

  useEffect(() => {
    const fetchOrderDetail = async () => {
      if (!session || !session.user?.id) {
        console.warn('Session or user ID is not available yet.');
        return;
      }

      const userId = session?.user?.id;

      try {
        const response = await fetch(`/api/payments/${userId}/${paymentId}`, {
          method: 'GET',
        });
        if (!response.ok) throw new Error('Failed to fetch order details');

        const data = await response.json();
        setOrder(data.payment);
        console.log('Order details:', data.payment);
      } catch (error) {
        console.error('Failed to fetch order details:', error);
        toast.error('Error fetching order details.');
      } finally {
        setLoading(false);
      }
    };

    if (paymentId) {
      fetchOrderDetail();
    }
  }, [paymentId, session]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
      </div>
    );
  }

  if (!order) {
    return <p className="mt-20 text-center">Order details not found.</p>;
  }

  return (
    <>
      <Navbar isAuthPage={false} />
      <div className="flex min-h-screen w-full flex-col px-8 py-20 lg:px-14">
        <div className="flex w-full items-center justify-between py-4 lg:py-8">
          <header className="stick z-5 bg-background top-0 hidden h-14 items-center gap-4 border-b px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6 lg:flex">
            <Breadcrumb className="flex">
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link href="/" className="hover:underline">
                      Home
                    </Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>
                    <Link href="/orders" className="hover:underline">
                      My Orders
                    </Link>
                  </BreadcrumbPage>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>Order Details</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </header>
          <div className="mt-2 lg:hidden">
            <SideMenu />
          </div>
        </div>

        <div className="mt-2 flex w-full lg:gap-8">
          <div className="hidden lg:block">
            <SideMenu />
          </div>

          <div className="w-full">
            <h2 className="mb-4 text-2xl font-semibold text-button">
              Order Details
            </h2>

            <div className="mt-3 w-full rounded border bg-white px-4 py-4 lg:px-6 lg:py-6 lg:shadow-md">
              <div>
                <h3 className="mb-2 font-semibold lg:mb-0 lg:text-xl">
                  Order No {order.orderId}
                </h3>
                <div className="flex items-center justify-between gap-4">
                  <div className="lg:text- flex flex-grow flex-col gap-2 text-sm">
                    <p>
                      <span className="font-semibold text-gray-500">
                        Tracking number:
                      </span>{' '}
                      {order.transactionRef}
                    </p>
                    <p>
                      <span className="font-semibold text-gray-500">
                        Shipping address:
                      </span>{' '}
                      {order.order.billingDetails?.address},{' '}
                      {order.order.billingDetails?.city},{' '}
                      {order.order.billingDetails?.state}
                    </p>
                    <p>
                      <span className="font-semibold text-gray-500">
                        Total amount:
                      </span>{' '}
                      <CurrencyFormatter amount={order.amount} />
                    </p>
                  </div>
                  <div className="mr-4 flex w-1/4 flex-col items-end justify-between gap-2 text-sm lg:text-lg">
                    <p>{new Date(order.createdAt).toLocaleDateString()}</p>
                    <p
                      className={`mb-2 font-semibold lowercase lg:py-2 ${getStatusColor(order.order.status)}`}
                    >
                      {order.order.status}
                    </p>
                  </div>
                </div>

                {/* Order items */}
                <div className="mt-4 space-y-2 p-4">
                  <div className="mb-4 flex w-full justify-between gap-4 font-semibold">
                    <p className="w-full">Product</p>
                    <p className="w-1/3">Price</p>
                    <p className="w-1/3">Quantity</p>
                    <p className="w-1/3 text-right">Subtotal</p>
                  </div>
                  {order.order.items.map((item: OrderItem) => (
                    <div
                      key={item.id}
                      className="flex items-center justify-between gap-4 space-x-2 border-b pb-2"
                    >
                      {/* product */}
                      <div className="flex items-center">
                        <Image
                          src={item.product.mainImage}
                          alt={item.product.title}
                          width={1500}
                          height={1500}
                          className="h-12 w-12 rounded-lg object-contain"
                        />
                        <h2 className="text-sm font-semibold">
                          {item.product.title}
                        </h2>
                      </div>

                      {/* price */}
                      <div>
                        <p className="text-gray-800">
                          <CurrencyFormatter
                            amount={
                              item.product.salePrice ||
                              item.product.regularPrice
                            }
                          />
                        </p>
                      </div>

                      {/* quantity */}
                      <div className="rounded border border-gray-300 px-3 py-1 text-right text-gray-800">
                        <span>{item.quantity}</span>
                      </div>

                      {/* Subtotal */}
                      <div className="flex items-center text-gray-800">
                        <span>
                          <CurrencyFormatter
                            amount={
                              item.quantity *
                              (item.product.salePrice ||
                                item.product.regularPrice)
                            }
                          />
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Feedback */}
            <div className="flex justify-end py-8">
              <button className="disabled: rounded border border-gray-400 px-4 py-2 hover:bg-slate-200">
                Leave Feedback
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default OrderDetail;
