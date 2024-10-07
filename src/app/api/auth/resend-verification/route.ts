// pages/api/auth/resend-verification.ts
import { NextResponse } from 'next/server';
import prisma from '@/lib/db/prisma';
import { sendVerificationEmail } from '@/utils/sendVerificationEmail';
import crypto from 'crypto'; // For generating verification tokens

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found.' }, { status: 404 });
    }

    if (user.emailVerified) {
      // User is already verified, no need to resend verification
      return NextResponse.json({ message: 'User is already verified.' });
    }

    // Generate a new verification token
    const verificationToken = crypto.randomBytes(32).toString('hex');

    await prisma.user.update({
      where: { email },
      data: { verificationToken: verificationToken },
    });

    // Resend the verification link
    await sendVerificationEmail(user.email, verificationToken);

    return NextResponse.json({ message: 'Verification link resent' });
  } catch (error) {
    console.error('Error resending verification link:', error);
    return NextResponse.json(
      { error: 'Failed to resend the verification link' },
      { status: 500 }
    );
  }
}
