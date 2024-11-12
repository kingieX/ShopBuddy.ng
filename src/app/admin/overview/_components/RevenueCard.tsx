'use client';
import { useEffect, useState } from 'react';
import { DollarSign } from 'lucide-react'; // Assuming you have this icon component
import CurrencyFormatter from '@/app/constants/CurrencyFormatter';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

function RevenueCard() {
  const [totalRevenue, setTotalRevenue] = useState<number | null>(null);
  const [percentageIncrease, setPercentageIncrease] = useState<number | null>(
    null
  );
  const [error, setError] = useState<string | null>(null);

  // Get the current month name dynamically
  const currentMonthName = new Date().toLocaleString('en-US', {
    month: 'long',
  });

  useEffect(() => {
    async function fetchRevenueData() {
      try {
        const response = await fetch('/api/admin/total-revenue');
        if (!response.ok) {
          throw new Error('Failed to fetch payment data');
        }
        const data = await response.json();
        setTotalRevenue(data.totalRevenue);
        setPercentageIncrease(data.percentageIncrease);
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError('An unknown error occurred');
        }
      }
    }

    fetchRevenueData();
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <Card x-chunk="dashboard-01-chunk-0">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-semibold">
          Total Revenue ({currentMonthName})
        </CardTitle>

        <DollarSign className="h-10 w-10 rounded-full border bg-blue-100 p-1 text-button" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">
          {totalRevenue !== null ? (
            <CurrencyFormatter amount={totalRevenue} />
          ) : (
            'Loading...'
          )}
        </div>
        <p className="text-muted-foreground text-xs">
          {percentageIncrease !== null
            ? `${percentageIncrease.toFixed(1)}% from last month`
            : 'Loading...'}
        </p>
      </CardContent>
    </Card>
  );
}

export default RevenueCard;
