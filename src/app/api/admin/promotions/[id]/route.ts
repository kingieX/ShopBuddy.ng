import { NextResponse, NextRequest } from 'next/server';
import prisma from '@/lib/db/prisma';
// import cloudinary from '@/lib/cloudinary/cloudinary';
import { v2 as cloudinary } from 'cloudinary'; // Import Cloudinary if you use it for image storage

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Handle GET request to fetch promotion details
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const promotionId = params.id;
  console.log('Promotion ID:', promotionId);

  try {
    const promotion = await prisma.promotion.findUnique({
      where: { id: promotionId },
    });

    if (!promotion) {
      return NextResponse.json(
        { message: 'Promotion not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(promotion, { status: 200 });
  } catch (error) {
    console.error('Error fetching promotion:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}

//Handle DELETE request
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
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const promotionId = params.id;

  try {
    const formData = await req.formData(); // Get form data

    // Extract the form fields
    const title = formData.get('title') as string;
    const description = formData.get('description') as string;
    const startDate = formData.get('startDate') as string;
    const endDate = formData.get('endDate') as string;
    const status = formData.get('status') as string;

    // Optional: Handle promotionImage update
    let promotionImageUrl = undefined;
    if (formData.get('promotionImage')) {
      const promotionImageFile = formData.get('promotionImage') as File;
      const promotionImageBuffer = Buffer.from(
        await promotionImageFile.arrayBuffer()
      );
      const promotionImageUpload = await cloudinary.uploader.upload(
        promotionImageBuffer.toString('base64'),
        {
          folder: 'promotions',
          resources_type: 'image',
          public_id: promotionId,
        }
      );
      promotionImageUrl = promotionImageUpload.secure_url;
    }

    // Update the Promotion in the database
    const promotion = await prisma.promotion.update({
      where: { id: promotionId },
      data: {
        title,
        description,
        startDate,
        endDate,
        status,
        ...(promotionImageUrl && { promotionImage: promotionImageUrl }),
      },
    });

    return NextResponse.json({
      message: 'Promotion updated successfully',
      promotion,
    });
  } catch (error) {
    console.error('Error updating promotion:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
