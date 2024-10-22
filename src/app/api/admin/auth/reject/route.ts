// pages/api/admin/auth/reject.ts
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

    // Reject the admin (deleting the record in this case)
    await prisma.admin.delete({
      where: { id: Number(adminId) },
    });

    return NextResponse.json({
      message: 'Admin rejected and removed successfully!',
    });
  } catch (error) {
    console.error('Error rejecting admin:', error);
    return NextResponse.json(
      { message: 'Something went wrong' },
      { status: 500 }
    );
  }
}
