import { NextResponse, NextRequest } from 'next/server';
import prisma from '@/lib/db/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/pages/api/auth/[...nextauth]';

// PATCH route to update the quantity of a cart item
export async function PATCH(
  req: NextRequest,
  { params }: { params: { cartItemId: string } }
) {
  try {
    console.log('cartItemId from params:', params.cartItemId); // Log to verify
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

    if (quantity === 0) {
      await prisma.cartItem.delete({
        where: { id: cartItemId },
      });
      return NextResponse.json(
        { message: 'Cart item deleted' },
        { status: 200 }
      );
    }

    return NextResponse.json({ message: 'Cart item updated' }, { status: 200 });
  } catch (error) {
    console.error('Error updating cart item:', error);
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
