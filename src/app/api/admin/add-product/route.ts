import { NextResponse } from 'next/server';
import cloudinary from '@/lib/cloudinary/cloudinary';
import prisma from '@/lib/db/prisma';
import streamifier from 'streamifier';

// Helper function to upload image to Cloudinary using streams
const uploadImage = (buffer: Buffer, folder: string): Promise<any> => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      { folder },
      (error, result) => {
        if (result) resolve(result);
        else reject(error);
      }
    );
    streamifier.createReadStream(buffer).pipe(uploadStream);
  });
};

export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    // Extract the form fields with null checks
    const title = formData.get('title');
    const description = formData.get('description');
    const regularPriceStr = formData.get('regularPrice');
    const salePriceStr = formData.get('salePrice');
    const status = formData.get('status');
    const categoryId = formData.get('categoryId');
    const newCategory = formData.get('newCategory');

    // Validate required fields
    if (!title || !description || !regularPriceStr || !status) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const regularPrice = parseFloat(regularPriceStr.toString());
    const salePrice = salePriceStr ? parseFloat(salePriceStr.toString()) : 0;

    // Check if a new category was provided, if so, create it
    let finalCategoryId = categoryId ? categoryId.toString() : null;

    if (newCategory && newCategory.toString().trim() !== '') {
      const categoryName = newCategory.toString().trim();

      // Check if the category already exists
      let existingCategory = await prisma.category.findUnique({
        where: { name: categoryName },
      });

      if (!existingCategory) {
        // Create new category
        existingCategory = await prisma.category.create({
          data: { name: categoryName },
        });
      }

      finalCategoryId = existingCategory.id;
    }

    // Ensure finalCategoryId is not null or undefined
    if (!finalCategoryId) {
      return NextResponse.json(
        { error: 'Category must be selected or created.' },
        { status: 400 }
      );
    }

    // Upload the main image to Cloudinary using streams
    const mainImageFile = formData.get('mainImage') as File | null;
    if (!mainImageFile) {
      return NextResponse.json(
        { error: 'Main image is required' },
        { status: 400 }
      );
    }
    const mainImageBuffer = Buffer.from(await mainImageFile.arrayBuffer());

    const mainImageUpload = await uploadImage(
      mainImageBuffer,
      'products/main_images'
    ).catch((err) => {
      throw new Error('Failed to upload main image');
    });
    const mainImageUrl = mainImageUpload.secure_url;

    // Upload gallery images to Cloudinary using streams
    const galleryImages: string[] = [];
    const galleryImageKeys = Array.from(formData.keys()).filter((key) =>
      key.startsWith('galleryImage')
    );

    await Promise.all(
      galleryImageKeys.map(async (key) => {
        const galleryImageFile = formData.get(key) as File;
        const galleryImageBuffer = Buffer.from(
          await galleryImageFile.arrayBuffer()
        );
        const galleryImageUpload = await uploadImage(
          galleryImageBuffer,
          'products/gallery_images'
        ).catch((err) => {
          throw new Error('Failed to upload gallery image');
        });
        galleryImages.push(galleryImageUpload.secure_url);
      })
    );

    // Save the product data using Prisma
    const product = await prisma.product.create({
      data: {
        title: title.toString(),
        description: description.toString(),
        mainImage: mainImageUrl,
        galleryImages,
        regularPrice,
        salePrice,
        status: status.toString(),
        category: {
          connect: { id: finalCategoryId },
        },
      },
      include: {
        category: true,
      },
    });

    return NextResponse.json({
      message: 'Product created successfully',
      product,
    });
  } catch (error: any) {
    console.error('Error creating product:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to create product' },
      { status: 500 }
    );
  }
}
