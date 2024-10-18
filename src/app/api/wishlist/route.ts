import { NextResponse, NextRequest } from 'next/server';
import prisma from '@/lib/db/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/pages/api/auth/[...nextauth]';

// POST route to sync products with the user's wishlist
export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession({ req, ...authOptions });

    if (!session?.user?.id) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const { productId } = body; // Expect productId as a string

    if (!productId || typeof productId !== 'string') {
      return NextResponse.json(
        { message: 'Invalid productId format' },
        { status: 400 }
      );
    }

    const userId = parseInt(session.user.id, 10);

    let wishlist = await prisma.wishlist.findUnique({
      where: { userId },
    });

    if (!wishlist) {
      wishlist = await prisma.wishlist.create({
        data: { userId },
      });
    }

    // Upsert the product into the wishlist
    await prisma.wishlistProduct.upsert({
      where: {
        wishlistId_productId: {
          wishlistId: wishlist.id,
          productId,
        },
      },
      update: {},
      create: {
        wishlistId: wishlist.id,
        productId,
      },
    });

    return NextResponse.json({ message: 'Wishlist synced' }, { status: 200 });
  } catch (error) {
    console.error('Error syncing wishlist:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}

// GET route to fetch the user's wishlist
export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession({ req, ...authOptions });

    if (!session?.user?.id) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const userId = parseInt(session.user.id, 10);

    const wishlist = await prisma.wishlist.findUnique({
      where: { userId },
      include: { products: true },
    });

    if (!wishlist) {
      return NextResponse.json(
        { message: 'Wishlist not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(wishlist.products, { status: 200 });
  } catch (error) {
    console.error('Error fetching wishlist:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}

// DELETE route to remove a product from the user's wishlist
export async function DELETE(req: NextRequest) {
  try {
    const body = await req.json();
    const { productId } = body; // Expect productId as a string

    if (!productId || typeof productId !== 'string') {
      return NextResponse.json(
        { message: 'Invalid productId format' },
        { status: 400 }
      );
    }

    const session = await getServerSession({ req, ...authOptions });

    if (!session?.user?.id) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const userId = parseInt(session.user.id, 10);

    const wishlist = await prisma.wishlist.findUnique({
      where: { userId },
    });

    if (!wishlist) {
      return NextResponse.json(
        { message: 'Wishlist not found' },
        { status: 404 }
      );
    }

    await prisma.wishlistProduct.delete({
      where: {
        wishlistId_productId: {
          wishlistId: wishlist.id,
          productId,
        },
      },
    });

    return NextResponse.json(
      { message: 'Product removed from wishlist' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error removing product from wishlist:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
