// pages/api/auth/verify.ts
import { NextResponse } from 'next/server';
import prisma from '@/lib/db/prisma';
import { sendWelcomeMessageEmail } from '@/utils/sendWelcomeMessageEmail';

export async function POST(req: Request) {
  try {
    const body = await req.json(); // Read request body
    const token = body.token;

    if (!token) {
      return NextResponse.json(
        { message: 'Verification token is required' },
        { status: 400 }
      );
    }

    // Use `findFirst` to search for a user by the verification token
    const user = await prisma.user.findFirst({
      where: { verificationToken: token },
    });

    if (!user) {
      return NextResponse.json(
        { message: 'Invalid or expired verification token' },
        { status: 400 }
      );
    }

    // Update user's emailVerified status and clear the verification token
    await prisma.user.update({
      where: { id: user.id },
      data: {
        emailVerified: true,
        verificationToken: null, // Clear the token
      },
    });

    // Send Welcome email
    await sendWelcomeMessageEmail(user.email);

    return NextResponse.json(
      { message: 'Email verified successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: 'Something went wrong' },
      { status: 500 }
    );
  }
}
