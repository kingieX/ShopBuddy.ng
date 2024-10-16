// File: /app/api/admin/categories/route.ts
import { NextResponse } from 'next/server';
import prisma from '@/lib/db/prisma';

// Handle GET Request for fetching all categories
export async function GET() {
  try {
    const categories = await prisma.category.findMany({
      orderBy: { id: 'desc' },
      include: {
        _count: {
          select: { products: true },
        },
        products: true,
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
