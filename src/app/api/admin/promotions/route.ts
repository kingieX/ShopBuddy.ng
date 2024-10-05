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
  // Log the incoming request body
  console.log('Request Body:', req.body);

  try {
    const formData = await req.formData();

    // Extract the form fields with null checks
    const title = formData.get('title');
    const description = formData.get('description');
    const startDateStr = formData.get('startDate');
    const endDateStr = formData.get('endDate');
    const isActiveStr = formData.get('status');
    const imageFile = formData.get('image') as File | null;

    // Validate required fields
    if (
      !title ||
      !description ||
      !isActiveStr ||
      !startDateStr ||
      !endDateStr ||
      !imageFile
    ) {
      console.error('Missing Fields:', {
        title,
        description,
        startDateStr,
        endDateStr,
        isActiveStr,
        imageFile,
      });

      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const startDate = new Date(startDateStr.toString());
    const endDate = new Date(endDateStr.toString());
    const isActive = isActiveStr.toString();

    // Upload the promotion image to Cloudinary using streams
    const imageBuffer = Buffer.from(await imageFile.arrayBuffer());
    const imageUpload = await uploadImage(imageBuffer, 'promotions').catch(
      () => {
        throw new Error('Failed to upload promotion image');
      }
    );

    const imageUrl = imageUpload.secure_url;

    // Save the promotion data using Prisma
    const promotion = await prisma.promotion.create({
      data: {
        title: title.toString(),
        description: description.toString(),
        startDate,
        endDate,
        isActive: Boolean(isActiveStr.toString()),
        imageUrl,
      },
    });

    console.log('Promotion Saved Successfully:', promotion);
    return NextResponse.json({
      message: 'Promotion created successfully',
      promotion,
    });
  } catch (error: any) {
    console.error('Error creating promotion:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to create promotion' },
      { status: 500 }
    );
  }
}

// This handles GET requests
export async function GET() {
  try {
    const promotions = await prisma.promotion.findMany({
      orderBy: { id: 'desc' },
    });

    // Convert dates to ISO strings for safe JSON serialization
    const serializedPromotions = promotions.map((promotion) => ({
      ...promotion,
      startDate: promotion.startDate.toISOString(),
      endDate: promotion.endDate.toISOString(),
      createdAt: promotion.createdAt.toISOString(),
      updatedAt: promotion.updatedAt.toISOString(),
    }));

    return NextResponse.json(serializedPromotions);
  } catch (error) {
    console.error('Error fetching promotions:', error);
    return new NextResponse('Failed to fetch promotions', { status: 500 });
  }
}
