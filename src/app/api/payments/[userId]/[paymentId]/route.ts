// app/api/payments/[userId]/[paymentId]/route.ts

import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/db/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/pages/api/auth/[...nextauth]';

export async function GET(
  req: NextRequest,
  { params }: { params: { userId: string; paymentId: string } }
) {
  const session = await getServerSession({ req, ...authOptions });

  // Log to verify that params and session ID match
  // console.log('Params:', params);
  // console.log('Session User ID:', session?.user?.id);

  // Check if the user is authorized to access this payment
  if (!session?.user?.id || session.user.id !== params.userId) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  try {
    const payment = await prisma.payment.findUnique({
      where: { orderId: params.paymentId },
      include: {
        order: {
          include: {
            items: { include: { product: true } },
            billingDetails: true,
          },
        },
      },
    });

    if (!payment) {
      return NextResponse.json({ error: 'Payment not found' }, { status: 404 });
    }

    return NextResponse.json({ payment }, { status: 200 });
  } catch (error) {
    console.error('Error fetching payment:', error);
    return NextResponse.json(
      { error: 'Error fetching payment' },
      { status: 500 }
    );
  }
}
