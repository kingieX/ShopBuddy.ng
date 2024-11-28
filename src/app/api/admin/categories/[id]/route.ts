// File: /app/api/admin/categories/[id]/route.ts
import { NextResponse, NextRequest } from 'next/server';
import prisma from '@/lib/db/prisma';

// Handle GET Request for fetching a single category
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const categoryId = params.id;

  try {
    const category = await prisma.category.findUnique({
      where: { id: categoryId },
      include: {
        products: true, // Fetch products associated with this category
      },
    });

    if (!category) {
      return NextResponse.json(
        { error: 'Category not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(category, {
      status: 200,
      headers: {
        'Cache-Control': 'no-store', // Disable caching for this API
      },
    });
  } catch (error) {
    console.error('Error fetching category:', error);
    return NextResponse.json(
      { error: 'Failed to fetch category' },
      { status: 500 }
    );
  }
}

// Handle PUT Request for updating a category
export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  const categoryId = params.id;

  try {
    const formData = await req.formData();

    const name = formData.get('name') as string;

    if (!name) {
      return NextResponse.json(
        { error: 'Category name is required' },
        { status: 400 }
      );
    }

    const updatedCategory = await prisma.category.update({
      where: { id: categoryId },
      data: { name },
    });

    return NextResponse.json({
      message: 'Category updated successfully',
      category: updatedCategory,
    });
  } catch (error) {
    console.error('Error updating category:', error);
    return NextResponse.json(
      { error: 'Failed to update category' },
      { status: 500 }
    );
  }
}

// Handle DELETE Request for deleting a category
export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  const categoryId = params.id;

  try {
    // Optional: Check if the category contains products and handle accordingly
    const category = await prisma.category.findUnique({
      where: { id: categoryId },
      include: { products: true },
    });

    if (!category) {
      return NextResponse.json(
        { error: 'Category not found' },
        { status: 404 }
      );
    }

    // Handle if there are products under the category
    if (category.products.length > 0) {
      return NextResponse.json(
        { error: 'Cannot delete category with associated products' },
        { status: 400 }
      );
    }

    // Proceed with category deletion
    await prisma.category.delete({
      where: { id: categoryId },
    });

    return NextResponse.json(
      { message: 'Category deleted successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error deleting category:', error);
    return NextResponse.json(
      { message: 'Failed to delete category' },
      { status: 500 }
    );
  }
}
