// src/app/api/products/[id]/route.ts
import { NextResponse } from 'next/server';
import prisma from '@/lib/db/prisma';
import { v2 as cloudinary } from 'cloudinary'; // Import Cloudinary if you use it for image storage

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Handle GET request to fetch product data
export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const productId = params.id;
  console.log('Product ID:', productId);

  try {
    const product = await prisma.product.findUnique({
      where: { id: productId },
      include: { category: true }, // Include related category if needed
    });

    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    return NextResponse.json(product);
  } catch (error) {
    console.error('Error fetching product:', error);
    return NextResponse.json(
      { error: 'Failed to fetch product' },
      { status: 500 }
    );
  }
}

// Handle PUT request to update product data
export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  const productId = params.id;

  try {
    const formData = await req.formData();

    // Extract the form fields
    const title = formData.get('title') as string;
    const description = formData.get('description') as string;
    const regularPrice =
      parseFloat(formData.get('regularPrice') as string) || 0;
    const salePrice = parseFloat(formData.get('salePrice') as string) || 0;
    const status = formData.get('status') as string;
    const categoryId = formData.get('categoryId') as string;

    // Optional: Handle mainImage update
    let mainImageUrl = undefined;
    if (formData.get('mainImage')) {
      const mainImageFile = formData.get('mainImage') as File;
      const mainImageBuffer = Buffer.from(await mainImageFile.arrayBuffer());
      const mainImageUpload = await cloudinary.uploader.upload(
        mainImageBuffer.toString('base64'),
        {
          folder: 'products/main_images',
          resource_type: 'image',
        }
      );
      mainImageUrl = mainImageUpload.secure_url;
    }

    // Optional: Handle galleryImages update
    const galleryImages: string[] = [];
    for (const key of formData.keys()) {
      if (key.startsWith('galleryImage')) {
        const galleryImageFile = formData.get(key) as File;
        const galleryImageBuffer = Buffer.from(
          await galleryImageFile.arrayBuffer()
        );
        const uploadResult = await cloudinary.uploader.upload(
          galleryImageBuffer.toString('base64'),
          {
            folder: 'products/gallery_images',
            resource_type: 'image',
          }
        );
        galleryImages.push(uploadResult.secure_url);
      }
    }

    // Update the product
    const product = await prisma.product.update({
      where: { id: productId },
      data: {
        title,
        description,
        regularPrice,
        salePrice,
        status,
        categoryId,
        ...(mainImageUrl && { mainImage: mainImageUrl }),
        ...(galleryImages.length && { galleryImages }),
      },
    });

    return NextResponse.json({
      message: 'Product updated successfully',
      product,
    });
  } catch (error) {
    console.error('Error updating product:', error);
    return NextResponse.json(
      { error: 'Failed to update product' },
      { status: 500 }
    );
  }
}

// Handle DELETE request to delete a product
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  try {
    // Fetch the product from the database
    const product = await prisma.product.findUnique({
      where: { id },
    });

    if (!product) {
      return NextResponse.json(
        { message: 'Product not found' },
        { status: 404 }
      );
    }

    // Delete images from Cloudinary
    if (product.mainImage) {
      await cloudinary.uploader.destroy(product.mainImage);
    }
    if (product.galleryImages) {
      for (const image of product.galleryImages) {
        await cloudinary.uploader.destroy(image);
      }
    }

    // Delete the product from the database
    await prisma.product.delete({
      where: { id },
    });

    return NextResponse.json(
      { message: 'Product deleted successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error deleting product:', error);
    return NextResponse.json(
      { message: 'Failed to delete product' },
      { status: 500 }
    );
  }
}
