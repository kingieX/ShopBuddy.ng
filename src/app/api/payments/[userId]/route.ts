// app/api/payments/[userId]/index.ts
import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/db/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/pages/api/auth/[...nextauth]';

export async function GET(
  req: NextRequest,
  { params }: { params: { userId: string } }
) {
  const session = await getServerSession({ req, ...authOptions });

  if (!session?.user?.id || session.user.id !== params.userId) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  try {
    const payments = await prisma.payment.findMany({
      where: { order: { userId: parseInt(params.userId, 10) } },
      include: {
        order: {
          include: {
            items: { include: { product: true } },
            billingDetails: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json({ payments }, { status: 200 });
  } catch (error) {
    console.error('Error fetching payments:', error);
    return NextResponse.json(
      { error: 'Error fetching payments' },
      { status: 500 }
    );
  }
}
