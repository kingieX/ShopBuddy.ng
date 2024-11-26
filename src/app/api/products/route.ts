import { NextResponse } from 'next/server';
import prisma from '@/lib/db/prisma';

// This handles GET requests with pagination
export async function GET(request: Request) {
  const url = new URL(request.url);
  const page = parseInt(url.searchParams.get('page') || '1', 10); // Default to page 1
  const limit = parseInt(url.searchParams.get('limit') || '10', 10); // Default to 10 items per page

  try {
    // Get paginated products from the database
    const products = await prisma.product.findMany({
      skip: (page - 1) * limit, // Skip products based on the current page
      take: limit, // Limit the number of products
      orderBy: { createdAt: 'desc' },
      include: {
        category: true, // Include category
      },
    });

    // Count total products for pagination info
    const totalProducts = await prisma.product.count();

    // Convert dates to ISO strings for safe JSON serialization
    const serializedProducts = products.map((product) => ({
      ...product,
      createdAt: product.createdAt.toISOString(),
      updatedAt: product.updatedAt.toISOString(),
    }));

    const response = NextResponse.json({
      products: serializedProducts,
      total: totalProducts, // Total product count
      page,
      limit,
    });

    // Set Cache-Control headers to avoid caching
    response.headers.set(
      'Cache-Control',
      'no-store, no-cache, must-revalidate'
    );
    return response;
  } catch (error) {
    console.error('Error fetching products:', error);
    return new NextResponse('Failed to fetch products', { status: 500 });
  }
}
