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

    // Get total number of users created in the current month
    const currentMonthUsers = await prisma.user.count({
      where: {
        createdAt: {
          gte: startOfCurrentMonth,
          lte: endOfCurrentMonth,
        },
      },
    });

    // Get total number of users created in the previous month
    const lastMonthUsers = await prisma.user.count({
      where: {
        createdAt: {
          gte: startOfLastMonth,
          lte: endOfLastMonth,
        },
      },
    });

    // Calculate the percentage increase if there's data for both months
    let percentageIncrease = 0;

    if (lastMonthUsers > 0) {
      percentageIncrease =
        ((currentMonthUsers - lastMonthUsers) / lastMonthUsers) * 100;
    }

    return NextResponse.json(
      {
        totalCustomers: currentMonthUsers,
        percentageIncrease: percentageIncrease,
      },
      {
        status: 200,
        headers: {
          'Cache-Control': 'no-store', // Disable caching for this API
        },
      }
    );
  } catch (error) {
    console.error('Error fetching users:', error);
    return NextResponse.json(
      { error: 'Error fetching users' },
      { status: 500 }
    );
  }
}
