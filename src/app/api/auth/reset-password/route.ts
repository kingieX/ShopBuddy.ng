import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/db/prisma';
import bcrypt from 'bcryptjs';
import { sendPasswordResetConfirmationEmail } from '@/utils/sendPasswordResetConfirmationEmail';

export async function POST(req: NextRequest) {
  const { token, password } = await req.json();

  // Find the user by reset token
  const user = await prisma.user.findFirst({
    where: {
      resetToken: token,
      resetTokenExpiry: {
        gte: new Date(), // Check if token is still valid
      },
    },
  });

  if (!user) {
    return NextResponse.json(
      { error: 'Invalid or expired token' },
      { status: 400 }
    );
  }

  // Hash the new password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Update user's password and remove the reset token fields
  await prisma.user.update({
    where: { id: user.id },
    data: {
      password: hashedPassword,
      resetToken: null,
      resetTokenExpiry: null,
    },
  });

  // Send confirmation email
  await sendPasswordResetConfirmationEmail(user.email);

  return NextResponse.json(
    { message: 'Password reset successfully' },
    { status: 200 }
  );
}
