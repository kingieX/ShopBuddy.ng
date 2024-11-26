// app/api/admin/orders/[orderId]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/db/prisma';
import { sendOrderStatusUpdateEmail } from '@/utils/sendOrderStatusUpdateEmail';
import { sendOrderStatusUpdateSMS } from '@/utils/sms/sendOrderStatusUpdateSMS';

// Route to update order status
export async function PATCH(
  req: NextRequest,
  { params }: { params: { orderId: string } }
) {
  const { status } = await req.json();

  try {
    const updatedOrder = await prisma.order.update({
      where: { id: params.orderId },
      data: { status },
      include: {
        billingDetails: true,
        user: true, // Assuming the order has a related user who has an email
      },
    });

    // If the order's user and email are available, send the email notification
    if (updatedOrder.user && updatedOrder.user.email) {
      await sendOrderStatusUpdateEmail(
        updatedOrder.user.email,
        params.orderId,
        status
      );
    }

    // If the order's user and phone number are available, send the SMS notification
    if (
      (updatedOrder.user && updatedOrder.user.phoneNumber) ||
      updatedOrder.billingDetails?.phone
    ) {
      await sendOrderStatusUpdateSMS(
        updatedOrder.user.phoneNumber || updatedOrder.billingDetails?.phone,
        params.orderId,
        status
      );
    }

    const response = NextResponse.json({ updatedOrder }, { status: 200 });

    // Set Cache-Control headers to avoid caching
    response.headers.set(
      'Cache-Control',
      'no-store, no-cache, must-revalidate'
    );
    return response;
  } catch (error) {
    console.error('Error updating order status:', error);
    return NextResponse.json(
      { error: 'Error updating order status' },
      { status: 500 }
    );
  }
}

// Route to fetch order details
export async function GET(
  req: NextRequest,
  { params }: { params: { orderId: string } }
) {
  const { orderId } = params;

  try {
    const order = await prisma.order.findUnique({
      where: { id: orderId },
      include: {
        items: { include: { product: true } },
        billingDetails: true,
        payment: true,
        user: true,
      },
    });

    if (!order) {
      return NextResponse.json({ error: 'Order not found' }, { status: 404 });
    }

    const response = NextResponse.json(order, { status: 200 });

    // Set Cache-Control headers to avoid caching
    response.headers.set(
      'Cache-Control',
      'no-store, no-cache, must-revalidate'
    );
    return response;
  } catch (error) {
    console.error('Error fetching order details:', error);
    return NextResponse.json(
      { error: 'Error fetching order details' },
      { status: 500 }
    );
  }
}
