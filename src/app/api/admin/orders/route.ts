import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/db/prisma';

export async function GET(req: NextRequest) {
  try {
    const orders = await prisma.order.findMany({
      orderBy: {
        updatedAt: 'desc', // Ensure you're ordering by the most recent updates
      },
      include: {
        billingDetails: true,
        items: { include: { product: true } },
        user: { select: { firstName: true, lastName: true, email: true } },
      },
    });

    const response = NextResponse.json(
      { orders },
      {
        status: 200,
        headers: {
          'Cache-Control': 'no-store, no-cache, must-revalidate', // Disable caching for this API
        },
      }
    );
    return response;
  } catch (error) {
    console.error('Error fetching orders:', error);
    return NextResponse.json(
      { error: 'Error fetching orders' },
      { status: 500 }
    );
  }
}
