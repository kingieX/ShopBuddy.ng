import { NextResponse, NextRequest } from 'next/server';
import prisma from '@/lib/db/prisma'; // Prisma client
import bcrypt from 'bcryptjs';

export async function POST(req: Request) {
  const body = await req.json();
  const { email, firstName, lastName, phoneNumber, password } = body;

  console.log('body: ', body);

  if (!firstName || !lastName || !password || !phoneNumber) {
    return NextResponse.json(
      { message: 'Missing required fields' },
      { status: 400 }
    );
  }

  try {
    // Find the user by email
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    // Create the user in the database
    const hashedPassword = await bcrypt.hash(password, 10);

    const updatedUser = await prisma.user.update({
      where: { email },
      data: {
        firstName,
        lastName,
        phoneNumber,
        password: hashedPassword,
        emailVerified: true,
      },
    });

    return NextResponse.json({
      message: 'User details updated successfully!',
      updatedUser,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: 'Something went wrong' },
      { status: 500 }
    );
  }
}
