import { NextResponse, NextRequest } from 'next/server';
import prisma from '@/lib/db/prisma';

// Handle request to GET all registered users
export async function GET(req: NextRequest) {
  try {
    const users = await prisma.user.findMany({
      orderBy: { id: 'desc' },
    });

    const customers = users.map((user) => ({
      ...user,
      createdAt: user.createdAt.toISOString(),
      updatedAt: user.updatedAt.toISOString(),
    }));

    return NextResponse.json(customers);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch users' },
      { status: 500 }
    );
  }
}
