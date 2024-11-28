import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import prisma from '@/lib/db/prisma'; // Assuming you're using Prisma or some ORM
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { token, email, oldPassword, newPassword } = await request.json();

    const secret = process.env.JWT_SECRET;
    if (!secret) {
      return NextResponse.json(
        { message: 'JWT secret not found' },
        { status: 500 }
      );
    }

    // Decode token to get admin ID
    const decoded: any = jwt.verify(token, secret);

    // Find admin in database
    const admin = await prisma.admin.findUnique({
      where: { email },
    });
    if (!admin) {
      return NextResponse.json({ error: 'Admin not found' }, { status: 404 });
    }

    // Check if the old password is correct
    const isMatch = await bcrypt.compare(oldPassword, admin.password);
    if (!isMatch) {
      return NextResponse.json(
        { error: 'Old password is incorrect' },
        { status: 400 }
      );
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update the admin's password in the database
    await prisma.admin.update({
      where: { email },
      data: { password: hashedPassword },
    });

    return NextResponse.json(
      { message: 'Password updated successfully' },
      {
        status: 200,
        headers: {
          'Cache-Control': 'no-store', // Disable caching for this API
        },
      }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: 'Failed to update password' },
      { status: 500 }
    );
  }
}
