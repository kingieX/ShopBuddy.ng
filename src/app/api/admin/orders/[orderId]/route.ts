// app/api/admin/orders/[orderId]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/db/prisma';

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
    });
    return NextResponse.json({ updatedOrder }, { status: 200 });
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

    return NextResponse.json(order, { status: 200 });
  } catch (error) {
    console.error('Error fetching order details:', error);
    return NextResponse.json(
      { error: 'Error fetching order details' },
      { status: 500 }
    );
  }
}
