// app/api/billing-details.ts
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import prisma from '@/lib/db/prisma';

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
