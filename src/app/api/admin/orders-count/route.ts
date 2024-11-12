import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/db/prisma';
import { startOfMonth, endOfMonth, subMonths } from 'date-fns';

export async function GET(req: NextRequest) {
  try {
    // Get the current date and the start of the current and previous months
    const now = new Date();
    const startOfCurrentMonth = startOfMonth(now);
    const endOfCurrentMonth = endOfMonth(now);
    const startOfLastMonth = startOfMonth(subMonths(now, 1));
    const endOfLastMonth = endOfMonth(subMonths(now, 1));

    // Get total number of orders placed in the current month
    const currentMonthOrders = await prisma.order.count({
      where: {
        createdAt: {
          gte: startOfCurrentMonth,
          lte: endOfCurrentMonth,
        },
      },
    });

    // Get total number of orders placed in the previous month
    const lastMonthOrders = await prisma.order.count({
      where: {
        createdAt: {
          gte: startOfLastMonth,
          lte: endOfLastMonth,
        },
      },
    });

    // Calculate the percentage increase if there's data for both months
    let percentageIncrease = 0;

    if (lastMonthOrders > 0) {
      percentageIncrease =
        ((currentMonthOrders - lastMonthOrders) / lastMonthOrders) * 100;
    }

    return NextResponse.json(
      {
        totalOrders: currentMonthOrders,
        percentageIncrease: percentageIncrease,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error fetching orders:', error);
    return NextResponse.json(
      { error: 'Error fetching orders' },
      { status: 500 }
    );
  }
}
