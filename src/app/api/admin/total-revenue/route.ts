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

    // Get total revenue for the current month
    const currentMonthPayments = await prisma.payment.aggregate({
      _sum: {
        amount: true,
      },
      where: {
        createdAt: {
          gte: startOfCurrentMonth,
          lte: endOfCurrentMonth,
        },
      },
    });

    // Get total revenue for the previous month
    const lastMonthPayments = await prisma.payment.aggregate({
      _sum: {
        amount: true,
      },
      where: {
        createdAt: {
          gte: startOfLastMonth,
          lte: endOfLastMonth,
        },
      },
    });

    // Calculate the percentage increase if there's data for both months
    const currentMonthTotal = currentMonthPayments._sum.amount || 0;
    const lastMonthTotal = lastMonthPayments._sum.amount || 0;
    let percentageIncrease = 0;

    if (lastMonthTotal > 0) {
      percentageIncrease =
        ((currentMonthTotal - lastMonthTotal) / lastMonthTotal) * 100;
    }

    return NextResponse.json(
      {
        totalRevenue: currentMonthTotal,
        percentageIncrease: percentageIncrease,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error fetching payments:', error);
    return NextResponse.json(
      { error: 'Error fetching payments' },
      { status: 500 }
    );
  }
}
