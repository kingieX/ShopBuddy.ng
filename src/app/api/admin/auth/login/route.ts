// pages/api/admin/auth/login.ts
import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import prisma from '@/lib/db/prisma';
import jwt from 'jsonwebtoken';

export async function POST(req: Request) {
  const body = await req.json();
  const { email, password } = body;

  try {
    // Check if the admin exists
    const admin = await prisma.admin.findUnique({ where: { email } });
    if (!admin) {
      return NextResponse.json(
        { message: 'Invalid credentials' },
        { status: 401 }
      );
    }

    // Verify the password
    const isValidPassword = await bcrypt.compare(password, admin.password);
    if (!isValidPassword) {
      return NextResponse.json(
        { message: 'Invalid credentials' },
        { status: 401 }
      );
    }

    // Check if the admin is approved
    if (!admin.approved) {
      return NextResponse.json(
        { message: 'Your account is pending approval by the owner.' },
        { status: 403 }
      );
    }

    // Generate a JWT token
    const secret = process.env.JWT_SECRET;
    if (!secret) {
      return NextResponse.json(
        { message: 'JWT secret not found' },
        { status: 500 }
      );
    }

    const token = jwt.sign(
      { email: admin.email, approved: admin.approved },
      secret,
      { expiresIn: '1h' }
    );

    return NextResponse.json({ token, email }, { status: 200 });
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { message: 'Something went wrong. Please try again later.' },
      { status: 500 }
    );
  }
}
