// app/api/admin/orders/route.ts
import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/db/prisma';

export async function GET(req: NextRequest) {
  try {
    const orders = await prisma.order.findMany({
      orderBy: {
        updatedAt: 'desc', // Sort by the createdAt field in descending order (most recent first)
      },
      include: {
        billingDetails: true,
        items: { include: { product: true } },
        user: { select: { firstName: true, lastName: true, email: true } },
      },
    });
    return NextResponse.json({ orders }, { status: 200 });
  } catch (error) {
    console.error('Error fetching orders:', error);
    return NextResponse.json(
      { error: 'Error fetching orders' },
      { status: 500 }
    );
  }
}
