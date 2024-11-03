// app/api/billing-details.ts
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import prisma from '@/lib/db/prisma';

// Request to fetch billing details
export async function GET(req: NextRequest) {
  const session = await getServerSession({ req, ...authOptions });

  if (!session?.user?.id) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const userId = parseInt(session.user.id, 10);

  const billingDetails = await prisma.billingDetails.findFirst({
    where: { userId },
    orderBy: { createdAt: 'desc' }, // Fetch the latest record if multiple exist
  });

  return NextResponse.json(billingDetails || {});
}

// Request to update billing details
export async function PUT(req: NextRequest) {
  const session = await getServerSession({ req, ...authOptions });

  if (!session?.user?.id) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const userId = parseInt(session.user.id, 10);

  // Parse the request body correctly
  const { fullname, email, phone, address, state, city } = await req.json();

  // Check if billing details exist for the user
  const existingBilling = await prisma.billingDetails.findFirst({
    where: { userId },
    orderBy: { createdAt: 'desc' }, // Optional: get the latest if there are duplicates
  });

  const billingDetails = await prisma.billingDetails.update({
    where: { id: existingBilling?.id }, // Add null check
    data: {
      userId,
      fullname,
      email,
      phone,
      address,
      state,
      city,
    },
  });

  return NextResponse.json(billingDetails);
}
