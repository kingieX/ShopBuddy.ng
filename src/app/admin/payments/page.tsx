'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import CurrencyFormatter from '@/app/constants/CurrencyFormatter';
import { Payment, PaymentStatus } from '../../../types/types';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';

const getPaymentStatusColor = (status: PaymentStatus) => {
  switch (status) {
    case 'PENDING':
      return 'text-yellow-500';
    case 'COMPLETED':
      return 'text-green-500';
    case 'FAILED':
      return 'text-red-500';
    default:
      return 'text-gray-500';
  }
};

const Payments: React.FC = () => {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [activeTab, setActiveTab] = useState<string>('all');

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const response = await fetch('/api/admin/payment', {
          method: 'GET',
          headers: {
            'Cache-Control': 'no-cache',
          },
        });
        const data = await response.json();
        setPayments(data.payments);
        console.log('Payment data: ', data);
      } catch (error) {
        console.error('Failed to fetch payments:', error);
      }
    };
    fetchPayments();
  }, []);

  // Filter orders based on activeTab
  const filteredPayment =
    activeTab === 'all'
      ? payments
      : payments.filter(
          (payment) => payment.status.toLowerCase() === activeTab
        );

  return (
    <div>
      <header className="sticky top-0 z-10 flex h-14 items-center gap-4 border-b bg-white px-4">
        <Breadcrumb className="flex">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="#">Payments</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>All Payments</BreadcrumbPage>
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
                <TabsTrigger value="all">All Payments</TabsTrigger>
                <TabsTrigger value="completed">Completed</TabsTrigger>
                <TabsTrigger value="pending">Pending</TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value={activeTab} className="w-full">
              <Card className="w-full bg-white">
                <CardHeader className="px-7">
                  <CardTitle>Payments</CardTitle>
                  <CardDescription>List of all payments</CardDescription>
                </CardHeader>
                <CardContent className="overflow-y-auto">
                  <ScrollArea>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Payment ID</TableHead>
                          <TableHead>Order ID</TableHead>
                          <TableHead className="hidden md:table-cell">
                            Date
                          </TableHead>
                          <TableHead>Amount</TableHead>
                          <TableHead>Status</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredPayment.length > 0 ? (
                          filteredPayment.map((payment) => (
                            <TableRow key={payment.id}>
                              <TableCell className="text-button">
                                #{payment.id}
                              </TableCell>
                              <TableCell>
                                <div className="text-muted-foreground hidden md:inline">
                                  {payment.order?.user?.email}
                                </div>
                                <div>{payment.orderId}</div>
                              </TableCell>
                              <TableCell className="hidden md:table-cell">
                                {new Date(payment.createdAt).toLocaleString(
                                  'en-US',
                                  {
                                    weekday: 'short', // 'long' for full name
                                    year: 'numeric',
                                    month: 'short', // 'long' for full month name
                                    day: 'numeric',
                                    hour: '2-digit',
                                    minute: '2-digit',
                                    second: '2-digit',
                                  }
                                )}
                              </TableCell>
                              <TableCell>
                                <CurrencyFormatter amount={payment.amount} />
                              </TableCell>
                              <TableCell>
                                <Badge
                                  variant="outline"
                                  className={`mb-2 text-sm font-semibold lowercase lg:py-2 ${getPaymentStatusColor(payment.status)}`}
                                >
                                  {payment.status}
                                </Badge>
                              </TableCell>
                            </TableRow>
                          ))
                        ) : (
                          <TableRow>
                            <TableCell
                              colSpan={6}
                              className="text-center italic"
                            >
                              No Payment has been made...
                            </TableCell>
                          </TableRow>
                        )}
                      </TableBody>
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

export default Payments;
