import { NextResponse } from 'next/server';
import prisma from '@/lib/db/prisma';

// This handles GET requests
export async function GET() {
  try {
    const products = await prisma.product.findMany({
      orderBy: { id: 'desc' },
      include: {
        category: true, // Include the whole category object
      },
    });

    // Convert dates to ISO strings for safe JSON serialization
    const serializedProducts = products.map((product) => ({
      ...product,
      createdAt: product.createdAt.toISOString(),
      updatedAt: product.updatedAt.toISOString(),
    }));

    return NextResponse.json(serializedProducts);
  } catch (error) {
    console.error('Error fetching products:', error);
    return new NextResponse('Failed to fetch products', { status: 500 });
  }
}
