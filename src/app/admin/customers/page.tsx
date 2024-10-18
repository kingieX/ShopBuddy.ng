'use client';
import { useEffect, useState } from 'react';
import AdminLayout from '../layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, ListFilter, File } from 'lucide-react';
import CustomerTable from './_components/CustomerTable';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import Link from 'next/link';
import Skeleton from '@/app/components/Skeleton';

// Define the interface for a customer
interface Customer {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  location: string;
  emailVerified: boolean;
  createdAt: string;
}

const Customers = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [filteredCustomers, setFilteredCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  // Fetch customers from the backend
  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await fetch('/api/admin/users', { method: 'GET' });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log(data);
        setCustomers(data);
        setFilteredCustomers(data);
      } catch (error) {
        console.error('Error fetching customers:', error);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchCustomers();
  }, []);

  // Filter customer based on search term
  useEffect(() => {
    const filtered = customers.filter((customer) => {
      const firstNameMatches = customer.firstName
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase());
      const lastNameMatches = customer.lastName
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase());
      return firstNameMatches || lastNameMatches;
    });
    setFilteredCustomers(filtered);
  }, [searchTerm, customers]);

  if (error) return <p>Failed to load products.</p>;

  return (
    <AdminLayout>
      <div className="bg-muted/40 flex min-h-screen w-full flex-col py-4">
        <header className="stick z-5 bg-background top-0 flex h-14 items-center gap-4 border-b px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
          <Breadcrumb className="flex">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href="#">Customers</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>All Customers</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </header>

        <main className="lg:grid-cols- xl:grid-cols- grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
          <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
            <div className="flex items-center">
              <div className="ml-auto flex items-center gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  className="h-7 gap-1 text-sm"
                >
                  <ListFilter className="h-3.5 w-3.5" />
                  <span className="sr-only sm:not-sr-only">Filter</span>
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="h-7 gap-1 text-sm"
                >
                  <File className="h-3.5 w-3.5" />
                  <span className="sr-only sm:not-sr-only">Export</span>
                </Button>

                {/* search */}
                <div className="relative ml-auto flex-1 md:grow-0">
                  <Search className="text-muted-foreground absolute left-2.5 top-2.5 h-4 w-4" />
                  <Input
                    type="type"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search..."
                    className="bg-background w-full rounded-lg pl-8 md:w-[200px] lg:w-[336px]"
                  />
                </div>
              </div>
            </div>
            {/* Customer Table */}
            <div className="overflow-hidden px-4 py-4">
              {loading ? (
                <div className="space-y-4">
                  {/* Skeleton for multiple rows */}
                  <Skeleton height="20px" />
                  <Skeleton height="40px" />
                  <Skeleton height="40px" />
                  <Skeleton height="40px" />
                  <Skeleton height="40px" />
                </div>
              ) : filteredCustomers.length > 0 ? (
                <CustomerTable customers={filteredCustomers} />
              ) : (
                <p className="mt-4 text-center text-gray-500">
                  No customer found.
                </p>
              )}
            </div>
            {/* <CustomerTable customers={customers} />{' '}
            Pass the fetched customers */}
          </div>
        </main>
      </div>
    </AdminLayout>
  );
};

export default Customers;
