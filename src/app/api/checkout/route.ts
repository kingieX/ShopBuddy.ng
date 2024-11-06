import prisma from '@/lib/db/prisma';
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/pages/api/auth/[...nextauth]';

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession({ req, ...authOptions });

    if (!session?.user?.id) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const userId = parseInt(session.user.id, 10);
    const { billingDetails, deliveryFee } = await req.json();

    // Fetch the user's cart
    const cart = await prisma.cart.findUnique({
      where: { userId },
      include: { items: { include: { product: true } } },
    });

    if (!cart || cart.items.length === 0) {
      return NextResponse.json({ message: 'Cart is empty' }, { status: 400 });
    }

    // Calculate totals
    const totalPrice = cart.items.reduce(
      (total, item) =>
        total +
        (item.product.salePrice || item.product.regularPrice) * item.quantity,
      0
    );
    const serviceCharge = 1000;

    let vat;
    if (totalPrice >= 2500) {
      vat = 0.015 * (totalPrice + deliveryFee + serviceCharge) + 100;
    } else {
      vat = 0.015 * (totalPrice + deliveryFee + serviceCharge);
    }

    // const vat = rate * (totalPrice + deliveryFee + serviceCharge);
    const grandTotal = totalPrice + deliveryFee + serviceCharge + vat;

    // First, create the billing details
    // const billing = await prisma.billingDetails.create({
    //   data: {
    //     ...billingDetails,
    //     userId,
    //   },
    // });

    // Check if billing details exist for the user
    const existingBilling = await prisma.billingDetails.findFirst({
      where: { userId },
      orderBy: { createdAt: 'desc' }, // Optional: get the latest if there are duplicates
    });

    let billing;
    if (existingBilling) {
      // Update if details exist
      billing = await prisma.billingDetails.update({
        where: { id: existingBilling.id },
        data: {
          ...billingDetails, // update with new details
        },
      });
    } else {
      // Create new if no details exist
      billing = await prisma.billingDetails.create({
        data: {
          ...billingDetails,
          userId,
        },
      });
    }

    // Create the order, linking it to the billing details
    const order = await prisma.order.create({
      data: {
        userId,
        totalAmount: grandTotal,
        vat,
        deliveryFee,
        status: 'PENDING',
        billingDetailsId: billing.id, // Associate with billing details
        items: {
          create: cart.items.map((item) => ({
            productId: item.productId,
            quantity: item.quantity,
            price: item.product.salePrice || item.product.regularPrice,
          })),
        },
      },
    });

    // Create initial payment record
    await prisma.payment.create({
      data: {
        orderId: order.id,
        transactionRef: '',
        amount: grandTotal,
        status: 'PENDING',
      },
    });

    // Clear the cart after checkout
    await prisma.cart.update({
      where: { userId },
      data: {
        items: { deleteMany: {} },
      },
    });

    // Fetch the full order details
    const fullOrderDetails = await prisma.order.findUnique({
      where: { id: order.id },
      include: {
        items: true,
        billingDetails: true, // include other relations as needed
      },
    });

    return NextResponse.json(
      {
        message: 'Checkout successful',
        order: fullOrderDetails,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error during checkout:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
