// /src/app/api/check-db/route.ts

import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

// Initialize Prisma client
const prisma = new PrismaClient();

// Utility function to retry a function multiple times
const retry = async <T>(
  fn: () => Promise<T>,
  retries = 3,
  delay = 2000
): Promise<T> => {
  try {
    return await fn();
  } catch (error) {
    if (retries === 0) {
      throw error; // No more retries left, rethrow the error
    }
    console.log(`Retrying... Attempts left: ${retries}`);
    await new Promise((resolve) => setTimeout(resolve, delay)); // Delay between retries
    return retry(fn, retries - 1, delay); // Retry the function
  }
};

// API route handler to check the database connection
export async function GET() {
  console.log('Checking database connection...');
  try {
    // Attempt to query the database with retries
    await retry(
      async () => {
        await prisma.$queryRaw`SELECT 1`; // Basic query to check DB connection
      },
      3,
      2000
    ); // Retry up to 3 times, with a 2-second delay between each attempt

    console.log('Database connected successfully.');
    return NextResponse.json({ connected: true });
  } catch (error) {
    console.error('Database connection error:', error);
    return NextResponse.json(
      { connected: false, error: (error as Error).message },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect(); // Ensure Prisma client disconnects properly
  }
}
