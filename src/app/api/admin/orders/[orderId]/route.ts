// app/api/admin/orders/[orderId]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/db/prisma';

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
