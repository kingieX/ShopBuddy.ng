import { NextResponse, NextRequest } from 'next/server';
import prisma from '@/lib/db/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/pages/api/auth/[...nextauth]';

// POST route to add product to cart
export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession({ req, ...authOptions });

    if (!session?.user?.id) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const { productId, quantity } = body;

    if (
      !productId ||
      typeof productId !== 'string' ||
      typeof quantity !== 'number' ||
      quantity <= 0
    ) {
      return NextResponse.json({ message: 'Invalid input' }, { status: 400 });
    }

    const userId = parseInt(session.user.id, 10);

    let cart = await prisma.cart.findUnique({ where: { userId } });
    if (!cart) {
      cart = await prisma.cart.create({
        data: { user: { connect: { id: userId } } },
      });
    }

    const cartItem = await prisma.cartItem.findUnique({
      where: { cartId_productId: { cartId: cart.id, productId: productId } },
    });

    if (cartItem) {
      await prisma.cartItem.update({
        where: { id: cartItem.id },
        data: { quantity: cartItem.quantity + quantity },
      });
    } else {
      await prisma.cartItem.create({
        data: { cartId: cart.id, productId: productId, quantity: quantity },
      });
    }

    return NextResponse.json(
      { message: 'Product added to cart' },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error adding product to cart:', error);
    return NextResponse.json(
      { message: 'Internal Server Error' },
      { status: 500 }
    );
  }
}

// GET route to fetch the user's cart
export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession({ req, ...authOptions });

    if (!session?.user?.id) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const userId = parseInt(session.user.id, 10);

    const cart = await prisma.cart.findUnique({
      where: { userId },
      include: {
        items: {
          include: { product: true },
        },
      },
    });

    if (!cart) {
      return NextResponse.json({ message: 'Cart not found' }, { status: 404 });
    }

    return NextResponse.json(cart.items, { status: 200 });
  } catch (error) {
    console.error('Error fetching cart:', error);
    return NextResponse.json(
      { message: 'Internal Server Error' },
      { status: 500 }
    );
  }
}

// DELETE route to remove a product from the cart
export async function DELETE(
  req: NextRequest,
  { params }: { params: { cartItemId: string } }
) {
  try {
    const session = await getServerSession({ req, ...authOptions });

    if (!session?.user?.id) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const { cartItemId } = params;
    if (!cartItemId || typeof cartItemId !== 'string') {
      return NextResponse.json(
        { message: 'Invalid cartItemId' },
        { status: 400 }
      );
    }

    await prisma.cartItem.delete({
      where: { id: cartItemId },
    });

    return NextResponse.json(
      { message: 'Product removed from cart' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error removing product from cart:', error);
    return NextResponse.json(
      { message: 'Internal Server Error' },
      { status: 500 }
    );
  }
}

// PATCH route to update the quantity of a cart item
export async function PATCH(
  req: NextRequest,
  { params }: { params: { cartItemId: string } }
) {
  try {
    const session = await getServerSession({ req, ...authOptions });

    if (!session?.user?.id) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const { quantity } = body;

    if (!quantity || typeof quantity !== 'number' || quantity <= 0) {
      return NextResponse.json(
        { message: 'Invalid quantity' },
        { status: 400 }
      );
    }

    const { cartItemId } = params;
    if (!cartItemId || typeof cartItemId !== 'string') {
      return NextResponse.json(
        { message: 'Invalid cartItemId' },
        { status: 400 }
      );
    }

    await prisma.cartItem.update({
      where: { id: cartItemId },
      data: { quantity },
    });

    return NextResponse.json({ message: 'Cart item updated' }, { status: 200 });
  } catch (error) {
    console.error('Error updating cart item:', error);
    return NextResponse.json(
      { message: 'Internal Server Error' },
      { status: 500 }
    );
  }
}