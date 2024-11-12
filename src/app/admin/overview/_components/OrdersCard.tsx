'use client';
import { useEffect, useState } from 'react';
import { Activity } from 'lucide-react'; // Assuming you have this icon component
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

function OrdersCard() {
  const [totalOrders, setTotalOrders] = useState<number | null>(null);
  const [percentageIncrease, setPercentageIncrease] = useState<number | null>(
    null
  );
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchOrderData() {
      try {
        const response = await fetch('/api/admin/orders-count'); // This is your new endpoint for orders
        if (!response.ok) {
          throw new Error('Failed to fetch order data');
        }
        const data = await response.json();
        setTotalOrders(data.totalOrders);
        setPercentageIncrease(data.percentageIncrease);
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError('An unknown error occurred');
        }
      }
    }

    fetchOrderData();
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <Card x-chunk="dashboard-01-chunk-3">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-semibold">Orders</CardTitle>
        <Activity className="h-10 w-10 rounded-full border bg-blue-100 p-1 text-button" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">
          +
          {totalOrders !== null
            ? totalOrders.toLocaleString() // Format number with commas (e.g., "573")
            : 'Loading...'}
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

export default OrdersCard;
