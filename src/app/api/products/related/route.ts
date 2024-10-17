import { NextResponse } from 'next/server';
import prisma from '@/lib/db/prisma';

// Define the expected query params
interface RelatedProductParams {
  categoryId: string; // The ID of the category (UUID)
  productId: string; // The ID of the current product (UUID)
}

// This handles GET requests for related products
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  // Extract categoryId and current productId from query params
  const categoryId = searchParams.get('categoryId');
  const productId = searchParams.get('productId');

  // Ensure both parameters are provided
  if (!categoryId || !productId) {
    return new NextResponse('Missing categoryId or productId', { status: 400 });
  }

  try {
    const relatedProducts = await prisma.product.findMany({
      where: {
        categoryId, // UUID is a string, no need to parse
        id: { not: productId }, // Exclude the current product by ID
      },
      orderBy: { id: 'desc' },
      take: 4, // Limit to 4 products
      include: {
        category: true, // Include the category object if needed
      },
    });

    // Convert dates to ISO strings for safe JSON serialization
    const serializedProducts = relatedProducts.map((product) => ({
      ...product,
      createdAt: product.createdAt.toISOString(),
      updatedAt: product.updatedAt.toISOString(),
    }));

    return NextResponse.json(serializedProducts);
  } catch (error) {
    console.error('Error fetching related products:', error);
    return new NextResponse('Failed to fetch related products', {
      status: 500,
    });
  }
}
