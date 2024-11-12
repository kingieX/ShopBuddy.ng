'use client';
import { useEffect, useState } from 'react';
import { Users } from 'lucide-react'; // Assuming you have this icon component
import CurrencyFormatter from '@/app/constants/CurrencyFormatter';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

function CustomersCard() {
  const [totalCustomers, setTotalCustomers] = useState<number | null>(null);
  const [percentageIncrease, setPercentageIncrease] = useState<number | null>(
    null
  );
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchCustomerData() {
      try {
        const response = await fetch('/api/admin/customer-count'); // Update the URL to the customer endpoint
        if (!response.ok) {
          throw new Error('Failed to fetch customer data');
        }
        const data = await response.json();
        setTotalCustomers(data.totalCustomers);
        setPercentageIncrease(data.percentageIncrease);
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError('An unknown error occurred');
        }
      }
    }

    fetchCustomerData();
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      <Card x-chunk="dashboard-01-chunk-1">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-semibold">Customers</CardTitle>
          <Users className="h-10 w-10 rounded-full border bg-blue-100 p-1 text-button" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            +
            {totalCustomers !== null
              ? totalCustomers.toLocaleString() // Use toLocaleString for number formatting (e.g., "2,350")
              : 'Loading...'}
          </div>
          <p className="text-muted-foreground text-xs">
            {percentageIncrease !== null
              ? `${percentageIncrease.toFixed(1)}% from last month`
              : 'Loading...'}
          </p>
        </CardContent>
      </Card>
    </>
  );
}

export default CustomersCard;
