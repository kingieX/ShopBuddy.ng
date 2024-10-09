import { NextResponse, NextRequest } from 'next/server';
import prisma from '@/lib/db/prisma';
import { randomBytes } from 'crypto';
import { sendPasswordResetEmail } from '@/utils/sendPasswordResetEmail';
import { addMinutes } from 'date-fns';

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();

    // Find the user
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return NextResponse.json(
        { error: 'User not found, please enter a valid email' },
        { status: 404 }
      );
    }

    // Generate a reset token and expiration time
    const resetToken = randomBytes(32).toString('hex');
    const resetTokenExpiry = addMinutes(new Date(), 30); // Token expires in 30 minutes

    // Store the token and expiry in the database
    await prisma.user.update({
      where: { email },
      data: {
        resetToken,
        resetTokenExpiry,
      },
    });

    // Send the reset email
    await sendPasswordResetEmail(email, resetToken);

    return NextResponse.json(
      {
        message: 'Password reset link sent, check your email to reset password',
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error in forgot-password API:', error);
    return NextResponse.json(
      { error: 'An unexpected error occurred, please try again later' },
      { status: 500 }
    );
  }
}
