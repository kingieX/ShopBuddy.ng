// pages/api/admin/auth/register.ts
import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import prisma from '@/lib/db/prisma';
import { sendAdminApprovalEmail } from '@/utils/sendAdminApprovalEmail';

export async function POST(req: Request) {
  const body = await req.json();
  const { email, password } = body;

  try {
    // Check if the user already exists
    const existingAdmin = await prisma.admin.findUnique({ where: { email } });
    if (existingAdmin) {
      return NextResponse.json(
        { message: 'Admin with this email already exists' },
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

    // Create the user in the database
    const hashedPassword = await bcrypt.hash(password, 10);
    const newAdmin = await prisma.admin.create({
      data: {
        email,
        password: hashedPassword,
        approved: false, // Approval pending
      },
    });

    // Send approval email to the owner
    try {
      await sendAdminApprovalEmail(newAdmin.email, newAdmin.id);
    } catch (error) {
      console.error('Failed to send approval email:', error);
      return NextResponse.json(
        {
          message: 'Failed to sign up. Please check your email and try again.',
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      message: 'Admin registration successful! Approval pending.',
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: 'Something went wrong' },
      { status: 500 }
    );
  }
}
