import { NextResponse, NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';
import prisma from '@/lib/db/prisma';
import { authOptions } from '@/pages/api/auth/[...nextauth]';

export async function PUT(req: NextRequest) {
  try {
    // Get session using getToken
    const session = await getToken({
      req,
      secret: process.env.NEXTAUTH_SECRET,
    });

    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Extract the request body to get updated user data
    const body = await req.json();
    const { firstName, lastName, phoneNumber, location } = body;

    // Update the user in the database using their email from the session
    const updatedUser = await prisma.user.update({
      where: { email: session?.email ?? undefined },
      data: {
        firstName,
        lastName,
        phoneNumber,
        location,
      },
    });

    return NextResponse.json({ user: updatedUser }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update user' },
      { status: 500 }
    );
  }
}

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
