import Link from 'next/link';
import {
  Activity,
  ArrowUpRight,
  CreditCard,
  DollarSign,
  Users,
} from 'lucide-react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import AdminLayout from '../layout';
import CurrencyFormatter from '@/app/constants/CurrencyFormatter';
import Chart from './_components/Chart';
import PaystackBalance from './_components/PaystackBalance';
import RevenueCard from './_components/RevenueCard';
import CustomersCard from './_components/CustomersCard';
import OrdersCard from './_components/OrdersCard';

const Dashboard = () => {
  return (
    <div className="flex min-h-screen w-full flex-col">
      <main className="flex flex-1 flex-col gap-4 py-4 md:gap-8 md:px-2 md:py-8">
        <header className="stick z-5 bg-background top-0 flex h-14 items-center gap-4 border-b px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
          <Breadcrumb className="flex">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href="#">Overview</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Dashboard</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </header>

        {/* Summary cards */}
        <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
          {/* Total revenus */}
          <div>
            <RevenueCard />
          </div>

          {/* Customers */}
          <div>
            <CustomersCard />
          </div>

          {/* Orders */}
          <div>
            <OrdersCard />
          </div>

          {/* Balance */}
          <Card x-chunk="dashboard-01-chunk-2">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-semibold">
                Paystack Balance
              </CardTitle>
              <CreditCard className="h-10 w-10 rounded-full border bg-blue-100 p-1 text-button" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                <PaystackBalance />
              </div>
              <p className="text-muted-foreground">
                <a
                  href="https://dashboard.paystack.com/#/dashboard"
                  target="_blank"
                  className="text- text-button hover:underline"
                >
                  withdraw
                </a>
              </p>
            </CardContent>
          </Card>
        </div>

        {/* cards divide */}
        <div className="w-full gap-4 sm:grid-cols-2 md:gap-4 lg:grid-cols-2 xl:grid-cols-3">
          {/* "grid gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4" */}

          {/* charts */}
          <div className="">
            <Chart />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
