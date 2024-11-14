import { NextResponse } from 'next/server';
import prisma from '@/lib/db/prisma';

// Handle GET Request for fetching all categories with their most recent product
export async function GET() {
  try {
    const categories = await prisma.category.findMany({
      orderBy: { updatedAt: 'desc' },
      include: {
        _count: {
          select: { products: true },
        },
        products: {
          orderBy: { updatedAt: 'desc' }, // Order products within the category by createdAt
          // take: 1, // Take only the most recent product from each category
        },
      },
    });

    return NextResponse.json({ categories });
  } catch (error) {
    console.error('Error fetching categories:', error);
    return NextResponse.json(
      { error: 'Failed to fetch categories' },
      { status: 500 }
    );
  }
}

// Handle POST Request for creating a new category
export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    const name = formData.get('name');

    if (!name) {
      return NextResponse.json(
        { error: 'Category name is required' },
        { status: 400 }
      );
    }

    const newCategory = await prisma.category.create({
      data: { name: name.toString() },
    });

    return NextResponse.json({
      message: 'Category created successfully',
      category: newCategory,
    });
  } catch (error) {
    console.error('Error creating category:', error);
    return NextResponse.json(
      { error: 'Failed to create category' },
      { status: 500 }
    );
  }
}
