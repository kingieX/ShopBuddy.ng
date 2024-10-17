import { NextResponse, NextRequest } from 'next/server';
import prisma from '@/lib/db/prisma';

// POST route to sync products with the user's wishlist
export async function POST(req: NextRequest) {
  try {
    // Parse the request body
    const body = await req.json();
    const { productIds } = body;

    // Assuming user is authenticated and userId is available
    const userId = req.headers.get('user_id'); // Example: fetching user ID from headers (adjust based on your auth setup)
    if (!userId) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    // Find the user's wishlist or create a new one if it doesn't exist
    let wishlist = await prisma.wishlist.findUnique({
      where: { userId: parseInt(userId, 10) }, // Parse userId to Int if necessary
    });

    if (!wishlist) {
      wishlist = await prisma.wishlist.create({
        data: { userId: parseInt(userId, 10) },
      });
    }

    // Add products to the wishlist
    for (const productId of productIds) {
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
    }

    // Return success response
    return NextResponse.json({ message: 'Wishlist synced' }, { status: 200 });
  } catch (error) {
    console.error('Error syncing wishlist:', error);
    return NextResponse.json(
      { error: 'Something went wrong' },
      { status: 500 }
    );
  }
}

// DELETE route to remove a product from the user's wishlist
export async function DELETE(req: NextRequest) {
  try {
    // Parse the request body to get productId
    const body = await req.json();
    const { productId } = body;

    // Assuming user is authenticated and userId is available
    const userId = req.headers.get('user_id'); // Adjust based on your auth setup
    if (!userId) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    // Find the user's wishlist
    const wishlist = await prisma.wishlist.findUnique({
      where: { userId: parseInt(userId, 10) }, // Parse userId to Int if necessary
    });

    if (!wishlist) {
      return NextResponse.json(
        { message: 'Wishlist not found' },
        { status: 404 }
      );
    }

    // Remove the product from the wishlist
    await prisma.wishlistProduct.delete({
      where: {
        wishlistId_productId: {
          wishlistId: wishlist.id,
          productId,
        },
      },
    });

    // Return success response
    return NextResponse.json(
      { message: 'Product removed from wishlist' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error removing product from wishlist:', error);
    return NextResponse.json(
      { error: 'Something went wrong' },
      { status: 500 }
    );
  }
}
