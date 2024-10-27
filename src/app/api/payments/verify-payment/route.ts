// app/api/payments/verify-payment.ts

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import axios from 'axios';
import prisma from '@/lib/db/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/pages/api/auth/[...nextauth]';

export async function GET(request: NextRequest) {
  try {
    // Extract query parameters from the URL
    const { searchParams } = new URL(request.url);
    const reference = searchParams.get('reference');
    const orderId = searchParams.get('orderId');

    const session = await getServerSession({ request, ...authOptions });

    if (!session?.user?.id) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const userId = parseInt(session.user.id, 10);

    if (!reference || !orderId) {
      return NextResponse.json(
        { error: 'Reference and Order ID are required' },
        { status: 400 }
      );
    }

    // Send request to Paystack to verify transaction
    const response = await axios.get(
      `https://api.paystack.co/transaction/verify/${reference}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`, // Paystack secret key
        },
      }
    );

    const verificationData = response.data.data;

    if (verificationData.status === 'success') {
      // Payment successful

      // Update order status in the database here, if needed
      await prisma.order.update({
        where: { id: orderId },
        data: {
          status: 'PAID',
        },
      });

      return NextResponse.json({
        message: 'Payment verification successful',
        status: verificationData.status,
        reference: verificationData.reference,
        orderId: orderId,
      });
    } else {
      // Payment failed
      return NextResponse.json(
        { error: 'Payment verification failed' },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error('Error verifying payment:', error);
    return NextResponse.json(
      { error: 'Error verifying payment' },
      { status: 500 }
    );
  }
}
