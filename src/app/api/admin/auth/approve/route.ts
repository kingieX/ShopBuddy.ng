// pages/api/admin/auth/approve.ts
import { NextResponse } from 'next/server';
import prisma from '@/lib/db/prisma';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const adminId = searchParams.get('adminId');

  if (!adminId) {
    return NextResponse.json(
      { message: 'Admin ID is missing' },
      { status: 400 }
    );
  }

  try {
    // Check if admin exists
    const admin = await prisma.admin.findUnique({
      where: { id: Number(adminId) },
    });

    if (!admin) {
      return NextResponse.json({ message: 'Admin not found' }, { status: 404 });
    }

    // Approve the admin
    const approvedAdmin = await prisma.admin.update({
      where: { id: Number(adminId) },
      data: { approved: true },
    });

    return NextResponse.json({
      message: 'Admin approved successfully!',
      admin: approvedAdmin,
    });
  } catch (error) {
    console.error('Error approving admin:', error);
    return NextResponse.json(
      { message: 'Something went wrong' },
      { status: 500 }
    );
  }
}
