import { NextResponse, NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';
import prisma from '@/lib/db/prisma';
import { compare, hash } from 'bcryptjs';

// Handle request to update user information
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

    // Extract the request body to get updated user data and password
    const body = await req.json();
    const {
      firstName,
      lastName,
      phoneNumber,
      location,
      currentPassword,
      newPassword,
    } = body;

    // Fetch the user by their email from the session
    const user = await prisma.user.findUnique({
      where: { email: session?.email ?? undefined },
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Handle password change if provided
    if (currentPassword && newPassword) {
      // Verify current password
      const isPasswordValid = await compare(currentPassword, user.password);
      if (!isPasswordValid) {
        return NextResponse.json(
          { error: 'Incorrect current password' },
          { status: 400 }
        );
      }

      // Hash the new password
      const hashedPassword = await hash(newPassword, 10);

      // Update both user profile and password
      const updatedUser = await prisma.user.update({
        where: { email: session?.email ?? undefined },
        data: {
          firstName,
          lastName,
          phoneNumber,
          location,
          password: hashedPassword, // Update the password
        },
      });

      return NextResponse.json({ user: updatedUser }, { status: 200 });
    } else {
      // Update user profile without changing the password
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
    }
  } catch (error) {
    console.error('Failed to update user', error);
    return NextResponse.json(
      { error: 'Failed to update user' },
      { status: 500 }
    );
  }
}

// Handle request to GET user information
export async function GET(req: NextRequest) {
  try {
    const session = await getToken({
      req,
      secret: process.env.NEXTAUTH_SECRET,
    });
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { email: session?.email ?? undefined },
    });

    return NextResponse.json({ user }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch user' },
      { status: 500 }
    );
  }
}
