import { NextResponse } from 'next/server';
import prisma from '@/lib/db/prisma';
import cloudinary from '@/lib/cloudinary/cloudinary';

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  try {
    // Fetch the promotion from the database
    const promotion = await prisma.promotion.findUnique({
      where: { id },
    });

    if (!promotion) {
      return NextResponse.json(
        { message: 'Promotion not found' },
        { status: 404 }
      );
    }

    // Delete the promotion image from Cloudinary
    if (promotion.imageUrl) {
      await cloudinary.uploader.destroy(promotion.imageUrl);
    }

    // Delete the promotion from the database
    await prisma.promotion.delete({
      where: { id },
    });

    return NextResponse.json(
      { message: 'Promotion deleted successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error deleting promotion:', error);
    return NextResponse.json(
      { message: 'Failed to delete promotion' },
      { status: 500 }
    );
  }
}

// Handle PUT request to update promotion data
export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  const promotionId = params.id;

  try {
    const formData = await req.formData();

    // Extract the form fields
    const title = formData.get('title') as string;
    const description = formData.get('description') as string;
    const startDate = formData.get('startDate') as string;
    const endDate = formData.get('endDate') as string;
    const status = formData.get('status') as string;

    // Optional: Handle promotion image update
    let promotionImageUrl = undefined;
    if (formData.get('promotionImage')) {
      const promotionImageFile = formData.get('promotionImage') as File;
      const promotionImageBuffer = Buffer.from(
        await promotionImageFile.arrayBuffer()
      );
      const imageUpload = await cloudinary.uploader.upload(
        promotionImageBuffer.toString('base64'),
        {
          folder: 'promotions/images',
          resource_type: 'image',
        }
      );
      promotionImageUrl = imageUpload.secure_url;
    }

    // Update the promotion in the database
    const promotion = await prisma.promotion.update({
      where: { id: promotionId },
      data: {
        title,
        description,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        status,
        ...(promotionImageUrl && { imageUrl: promotionImageUrl }), // Update imageUrl if a new image was uploaded
      },
    });

    return NextResponse.json({
      message: 'Promotion updated successfully',
      promotion,
    });
  } catch (error) {
    console.error('Error updating promotion:', error);
    return NextResponse.json(
      { error: 'Failed to update promotion' },
      { status: 500 }
    );
  }
}
