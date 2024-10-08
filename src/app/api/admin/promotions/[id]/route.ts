import { NextResponse, NextRequest } from 'next/server';
import prisma from '@/lib/db/prisma';
import streamifier from 'streamifier';
import cloudinary from '@/lib/cloudinary/cloudinary';
// import { v2 as cloudinary } from 'cloudinary'; // Import Cloudinary if you use it for image storage

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
  // console.log('Promotion ID:', promotionId);

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

// Helper function to upload image to Cloudinary using streams (same as in POST)
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
    const startDateStr = formData.get('startDate') as string;
    const endDateStr = formData.get('endDate') as string;
    const status = formData.get('status') as string;
    const imageFile = formData.get('promotionImage') as File | null;

    // Validate required fields
    if (!title || !description || !startDateStr || !endDateStr || !status) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const startDate = new Date(startDateStr);
    const endDate = new Date(endDateStr);

    let promotionImageUrl;

    // Handle image upload only if a new image is provided
    if (imageFile) {
      const imageBuffer = Buffer.from(await imageFile.arrayBuffer());

      try {
        const imageUpload = await uploadImage(imageBuffer, 'promotions');
        promotionImageUrl = imageUpload.secure_url; // Get the uploaded image URL
      } catch (error) {
        console.error('Image upload failed:', error);
        return NextResponse.json(
          { error: 'Failed to upload promotion image' },
          { status: 500 }
        );
      }
    }

    // Update the promotion in the database
    const promotion = await prisma.promotion.update({
      where: { id: promotionId },
      data: {
        title,
        description,
        startDate,
        endDate,
        status,
        ...(promotionImageUrl && { imageUrl: promotionImageUrl }), // Update image only if a new one was uploaded
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
