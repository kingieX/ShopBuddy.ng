import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import axios from 'axios';
import prisma from '@/lib/db/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { sendOrderConfirmationEmail } from '@/utils/sendOrderConfirmationEmail';
import { sendOrderNotificationEmailToOwner } from '@/utils/sendOrderNotificationEmailToOwner';
import { sendSMS } from '@/utils/sms/sendSMS';
import {
  getUserOrderMessage,
  getOwnerOrderMessage,
} from '@/utils/sms/orderMessages';

export async function POST(request: NextRequest) {
  try {
    const { reference, orderId } = await request.json();

    const session = await getServerSession({ request, ...authOptions });

    if (!session?.user?.id) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    if (!reference || !orderId) {
      return NextResponse.json(
        { error: 'Reference and Order ID are required' },
        { status: 400 }
      );
    }

    // Verify payment with Paystack
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
      // Update Payment and Order records
      await prisma.payment.update({
        where: { orderId: orderId },
        data: {
          transactionRef: verificationData.reference,
          status: 'COMPLETED', // Update payment status
        },
      });

      // Payment successful
      await prisma.order.update({
        where: { id: orderId },
        data: { status: 'PAID' },
      });

      const orderDetails = await prisma.order.findUnique({
        where: { id: orderId },
        include: {
          items: { include: { product: true } },
          billingDetails: true,
        },
      });

      if (orderDetails?.billingDetails?.phone) {
        // Generate the message content for user and owner

        const userMessage = getUserOrderMessage(orderId, {
          items: orderDetails.items.map((item) => ({
            name: item.product.title,
            quantity: item.quantity,
            price: item.price,
          })),
          totalAmount: orderDetails.totalAmount,
          paymentStatus: orderDetails.status,
        });

        await sendSMS(orderDetails.billingDetails.phone, userMessage);

        const ownerMessage = getOwnerOrderMessage(orderId, {
          totalAmount: orderDetails.totalAmount,
          paymentStatus: orderDetails.status,
          customerEmail: orderDetails.billingDetails.email,
        });

        if (process.env.OWNER_PHONE) {
          await sendSMS(process.env.OWNER_PHONE, ownerMessage);
        } else {
          console.error('Owner phone number is not defined.');
        }
      } else {
        console.error(
          'Order confirmation SMS could not be sent. Missing phone number.'
        );
      }

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

        await sendOrderNotificationEmailToOwner(orderId, {
          items: orderDetails.items.map((item) => ({
            name: item.product.title,
            quantity: item.quantity,
            price: item.price,
          })),
          vat: orderDetails.vat,
          deliveryFee: orderDetails.deliveryFee,
          totalAmount: orderDetails.totalAmount,
          paymentStatus: orderDetails.status,
          customerEmail: orderDetails.billingDetails.email, // Include customer's email for reference
        });
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
      // Update Payment and Order records
      await prisma.payment.update({
        where: { orderId: orderId },
        data: {
          transactionRef: verificationData.reference,
          status: 'FAILED', // Update payment status
        },
      });

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
