// app/api/admin/orders/total-last-6-months.ts

import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/db/prisma';
import { subMonths, startOfMonth, endOfMonth, format } from 'date-fns';

export async function GET(req: NextRequest) {
  try {
    // Get the current date and calculate the start and end of the last 12 months (to get the last 6 months data)
    const currentDate = new Date();
    const lastSixMonths = Array.from({ length: 12 }).map((_, index) => {
      const monthDate = subMonths(currentDate, index);
      return {
        month: format(monthDate, 'MMMM'), // Full month name (January, February, etc.)
        startOfMonth: startOfMonth(monthDate),
        endOfMonth: endOfMonth(monthDate),
      };
    });

    // Query orders for each of the last 12 months
    const ordersData = await Promise.all(
      lastSixMonths.map(async ({ startOfMonth, endOfMonth }) => {
        const orderCount = await prisma.order.count({
          where: {
            createdAt: {
              gte: startOfMonth,
              lte: endOfMonth,
            },
          },
        });
        return {
          month: lastSixMonths.find(
            (month) => month.startOfMonth.getTime() === startOfMonth.getTime()
          )?.month,
          sales: orderCount,
        };
      })
    );

    // Reversing the data so the previous month comes first
    const reversedOrdersData = ordersData.slice(0, 12).reverse();

    return NextResponse.json(
      { ordersData: reversedOrdersData },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error fetching total orders for last 6 months:', error);
    return NextResponse.json(
      { error: 'Failed to fetch total orders for last 6 months' },
      { status: 500 }
    );
  }
}
