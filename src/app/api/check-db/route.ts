import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    // Try to make a simple query to test the database connection
    await prisma.$queryRaw`SELECT 1`;

    // If the query succeeds, send a success response
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Database connection error:', error);
    // If there's an error, send an error response
    return NextResponse.json(
      { success: false, message: 'Database connection failed' },
      { status: 500 }
    );
  } finally {
    // Disconnect Prisma client to avoid resource leaks
    await prisma.$disconnect();
  }
}
