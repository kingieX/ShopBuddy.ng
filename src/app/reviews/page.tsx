'use client';
import Navbar from '../components/NavBar';
import Footer from '../components/Footer';
import { useSession, getSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import Link from 'next/link';
import SideMenu from '../components/SideMenu';
import { Loader2 } from 'lucide-react';
import { Payment, OrderStatus } from '../../types/orderTypes';
import toast from 'react-hot-toast';
import CurrencyFormatter from '../constants/CurrencyFormatter';

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

const Reviews = () => {
  const [orders, setOrders] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState<OrderStatus | 'ALL'>('ALL');
  const { data: session } = useSession();
  const router = useRouter();

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
    const fetchOrders = async () => {
      try {
        const response = await fetch(`/api/payments/${session?.user?.id}`);
        if (!response.ok) throw new Error('Failed to fetch orders');

        if (response.ok) {
          const data = await response.json();
          setOrders(data.payments);
        }
      } catch (error) {
        console.error('Failed to fetch payments:', error);
        toast.error('Error fetching orders.');
      } finally {
        setLoading(false);
      }
    };
    if (session?.user?.id) {
      fetchOrders();
    }
  }, [session]);

  // Filtered orders based on the selected status
  const filteredOrders =
    statusFilter === 'ALL'
      ? orders
      : orders.filter((order) => order.order.status === statusFilter);

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
                    <Link href="/">Home</Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>My order</BreadcrumbPage>
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
            <div className="flex items-center justify-between">
              <h2 className="mb-4 text-2xl font-semibold text-button">
                My Reviews
              </h2>

              {/* Status Filter */}
              {/* <div className="mb-4">
                <label htmlFor="statusFilter" className="mr-2 font-semibold">
                  Filter:
                </label>
                <select
                  id="statusFilter"
                  value={statusFilter}
                  onChange={(e) =>
                    setStatusFilter(e.target.value as OrderStatus)
                  }
                  className="rounded border border-gray-300 p-2"
                >
                  <option value="ALL">All</option>
                  <option value="PENDING">Pending</option>
                  <option value="PAID">Paid</option>
                  <option value="INPROGRESS">In Progress</option>
                  <option value="SHIPPED">Shipped</option>
                  <option value="DELIVERED">Delivered</option>
                  <option value="CANCELED">Canceled</option>
                </select>
              </div> */}
            </div>

            {/* Reviews */}
            <div>
              <p className="mt-12 text-center italic">Coming soon...</p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Reviews;
