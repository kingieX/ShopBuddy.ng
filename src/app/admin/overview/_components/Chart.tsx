'use client';

import { useEffect, useState } from 'react';
import { TrendingUp } from 'lucide-react';
import {
  Bar,
  BarChart,
  CartesianGrid,
  LabelList,
  XAxis,
  YAxis,
} from 'recharts';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';

const chartConfig = {
  desktop: {
    label: 'Sales',
    color: 'hsl(var(--chart-1))',
  },
} satisfies ChartConfig;

export default function Chart() {
  const [ordersData, setOrdersData] = useState<any[]>([]);
  const [percentageIncrease, setPercentageIncrease] = useState<number | null>(
    null
  );
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchOrdersData() {
      try {
        const response = await fetch('/api/admin/orders/total-last-6-months');
        if (!response.ok) {
          throw new Error('Failed to fetch order data');
        }
        const data = await response.json();
        const reversedData = data.ordersData.reverse(); // Reverse the data to start from previous month

        setOrdersData(reversedData);

        // Calculate the percentage increase from the last month (if applicable)
        if (reversedData.length > 1) {
          const lastMonthSales = reversedData[0].sales;
          const prevMonthSales = reversedData[1].sales;
          const increase =
            ((lastMonthSales - prevMonthSales) / prevMonthSales) * 100;
          setPercentageIncrease(increase);
        }
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError('An unknown error occurred');
        }
      }
    }

    fetchOrdersData();
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Historical Orders Statatics</CardTitle>
        <CardDescription>Last 12 months</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart
            accessibilityLayer
            data={ordersData} // Now this data is correctly ordered
            margin={{
              top: 20,
            }}
          >
            <CartesianGrid vertical={false} />
            <YAxis
              dataKey="sales"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
            />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)} // Show first 3 characters of the month
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar dataKey="sales" className="fill-button" radius={8}>
              <LabelList
                position="top"
                offset={12}
                className="fill-foreground"
                fontSize={12}
              />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          {percentageIncrease !== null
            ? `Trending up by ${percentageIncrease.toFixed(1)}% this month`
            : 'Loading...'}
          <TrendingUp className="h-4 w-4" />
        </div>
        <div className="text-muted-foreground leading-none">
          Showing total orders for the last 12 months
        </div>
      </CardFooter>
    </Card>
  );
}
