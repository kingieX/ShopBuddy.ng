import { NextResponse, NextRequest } from 'next/server';
import prisma from '@/lib/db/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/pages/api/auth/[...nextauth]';

// DELETE route to remove an item from the cart
export async function DELETE(req: NextRequest) {
  try {
    const session = await getServerSession({ req, ...authOptions });

    if (!session?.user?.id) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const cartItemId = req.nextUrl.pathname.split('/').pop();

    if (!cartItemId) {
      return NextResponse.json(
        { message: 'Invalid cartItemId' },
        { status: 400 }
      );
    }

    // Check if the cart item exists and belongs to the current user
    const cartItem = await prisma.cartItem.findUnique({
      where: { id: cartItemId },
      include: { cart: true },
    });

    if (!cartItem || cartItem.cart.userId !== parseInt(session.user.id, 10)) {
      return NextResponse.json(
        { message: 'CartItem not found or unauthorized' },
        { status: 404 }
      );
    }

    // Delete the item from the cart
    await prisma.cartItem.delete({
      where: { id: cartItemId },
    });

    return NextResponse.json({ message: 'Cart item removed' }, { status: 200 });
  } catch (error) {
    console.error('Error removing item from cart:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}

// PATCH route to update cart item quantity
export async function PATCH(req: NextRequest) {
  try {
    const session = await getServerSession({ req, ...authOptions });

    if (!session?.user?.id) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const cartItemId = req.nextUrl.pathname.split('/').pop();
    const { quantity } = await req.json();

    if (!cartItemId || typeof quantity !== 'number' || quantity < 1) {
      return NextResponse.json({ message: 'Invalid input' }, { status: 400 });
    }

    // Check if the cart item exists and belongs to the current user
    const cartItem = await prisma.cartItem.findUnique({
      where: { id: cartItemId },
      include: { cart: true },
    });

    if (!cartItem || cartItem.cart.userId !== parseInt(session.user.id, 10)) {
      return NextResponse.json(
        { message: 'CartItem not found or unauthorized' },
        { status: 404 }
      );
    }

    // Update the cart item quantity
    await prisma.cartItem.update({
      where: { id: cartItemId },
      data: { quantity },
    });

    return NextResponse.json({ message: 'Cart item updated' }, { status: 200 });
  } catch (error) {
    console.error('Error updating cart item:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}

// POST route for checkout
export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession({ req, ...authOptions });

    if (!session?.user?.id) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const userId = parseInt(session.user.id, 10);

    // Fetch the user's cart
    const cart = await prisma.cart.findUnique({
      where: { userId },
      include: { items: { include: { product: true } } },
    });

    if (!cart || cart.items.length === 0) {
      return NextResponse.json({ message: 'Cart is empty' }, { status: 400 });
    }

    // Create an order based on the cart items
    const order = await prisma.order.create({
      data: {
        userId,
        status: 'PENDING',
        items: {
          create: cart.items.map((item) => ({
            productId: item.productId,
            quantity: item.quantity,
            price: item.product.salePrice || item.product.regularPrice,
          })),
        },
      },
    });

    // Clear the cart after checkout
    await prisma.cartItem.deleteMany({
      where: { cartId: cart.id },
    });

    return NextResponse.json(
      { message: 'Checkout successful', orderId: order.id },
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
