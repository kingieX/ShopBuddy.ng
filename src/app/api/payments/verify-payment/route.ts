import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import axios from 'axios';
import prisma from '@/lib/db/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { sendOrderConfirmationEmail } from '@/utils/sendOrderConfirmationEmail';

export async function GET(request: NextRequest) {
  try {
    // Use the URL constructor to get query parameters
    const url = new URL(request.url);
    const reference = url.searchParams.get('reference');
    const orderId = url.searchParams.get('orderId');

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
          Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
        },
      }
    );

    const verificationData = response.data.data;

    if (verificationData.status === 'success') {
      // Payment successful
      await prisma.order.update({
        where: { id: orderId },
        data: {
          status: 'PAID',
        },
      });

      const orderDetails = await prisma.order.findUnique({
        where: { id: orderId },
        include: {
          items: { include: { product: true } },
          billingDetails: true,
        },
      });

      if (orderDetails?.billingDetails?.email) {
        await sendOrderConfirmationEmail(
          orderDetails.billingDetails.email,
          orderId,
          {
            items: orderDetails.items.map((item) => ({
              name: item.product.title,
              quantity: item.quantity,
              price: item.price,
            })),
            vat: orderDetails.vat,
            deliveryFee: orderDetails.deliveryFee,
            totalAmount: orderDetails.totalAmount,
            paymentStatus: orderDetails.status,
          }
        );
      } else {
        console.error(
          'Order confirmation email could not be sent. Missing email address.'
        );
      }

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
