// pages/api/auth/signup.ts
import { NextResponse } from 'next/server';
import prisma from '@/lib/db/prisma'; // Prisma client
import bcrypt from 'bcryptjs';
import crypto from 'crypto'; // For generating verification tokens
import { sendVerificationEmail } from '@/utils/sendVerificationEmail';

export async function POST(req: Request) {
  const body = await req.json();
  const { firstName, lastName, email, phoneNumber, password } = body;

  try {
    // Check if the user already exists
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return NextResponse.json(
        { message: 'User with this email already exists' },
        { status: 400 }
      );
    }

    // Hash the password
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
    } catch (error) {
      console.error('Password hashing error:', error);
      return NextResponse.json(
        { message: 'Failed to sign up. Please try again later.' },
        { status: 500 }
      );
    }

    // Generate a verification token
    const verificationToken = crypto.randomBytes(32).toString('hex');

    // Create the user in the database
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: {
        firstName,
        lastName,
        email,
        phoneNumber,
        password: hashedPassword,
        verificationToken, // Store the verification token
      },
    });

    // Send the verification email
    try {
      await sendVerificationEmail(user.email, verificationToken);
    } catch (error) {
      console.error('Failed to send verification email:', error);
      return NextResponse.json(
        {
          message: 'Failed to sign up. Please check your email and try again.',
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      message: 'User created. Verification email sent!',
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: 'Something went wrong' },
      { status: 500 }
    );
  }
}
