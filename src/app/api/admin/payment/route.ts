// app/api/admin/payments/route.ts
import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/db/prisma';

export async function GET(req: NextRequest) {
  try {
    const payments = await prisma.payment.findMany({
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        order: { include: { items: true, billingDetails: true } },
      },
    });
    return NextResponse.json({ payments }, { status: 200 });
  } catch (error) {
    console.error('Error fetching payments:', error);
    return NextResponse.json(
      { error: 'Error fetching payments' },
      { status: 500 }
    );
  }
}
