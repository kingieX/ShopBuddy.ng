import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/db/prisma';

export async function GET(req: NextRequest) {
  try {
    const orders = await prisma.order.findMany({
      orderBy: {
        updatedAt: 'desc', // Sort by the updatedAt field in descending order
      },
      include: {
        billingDetails: true,
        items: { include: { product: true } },
        user: { select: { firstName: true, lastName: true, email: true } },
      },
    });

    const response = NextResponse.json({ orders }, { status: 200 });

    // Set Cache-Control headers to avoid caching
    response.headers.set(
      'Cache-Control',
      'no-store, no-cache, must-revalidate'
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
