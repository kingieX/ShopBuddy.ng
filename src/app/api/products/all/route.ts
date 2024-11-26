// pages/api/products.ts
import { NextResponse } from 'next/server';
import prisma from '@/lib/db/prisma'; // Assuming you have Prisma setup in 'lib/db/prisma'

// This handles GET requests to fetch all products
export async function GET(request: Request) {
  try {
    // Get all products from the database without pagination
    const products = await prisma.product.findMany({
      orderBy: { updatedAt: 'desc' }, // Optional: Order by created date in descending order
      include: {
        category: true, // Include related category information if needed
      },
    });

    // Convert dates to ISO strings for safe JSON serialization
    const serializedProducts = products.map((product) => ({
      ...product,
      createdAt: product.createdAt.toISOString(),
      updatedAt: product.updatedAt.toISOString(),
    }));

    // Return all products in the response
    const response = NextResponse.json(
      { products: serializedProducts },
      {
        status: 200,
        headers: {
          'Cache-Control': 'no-store', // Disable caching for this API
        },
      }
    );

    // Set Cache-Control headers to avoid caching
    // response.headers.set(
    //   'Cache-Control',
    //   'no-store, no-cache, must-revalidate'
    // );
    return response;
  } catch (error) {
    console.error('Error fetching products:', error);
    return new NextResponse('Failed to fetch products', { status: 500 });
  }
}
