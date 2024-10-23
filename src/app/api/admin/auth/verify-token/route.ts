import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

export async function POST(request: Request) {
  const { token } = await request.json();

  const secret = process.env.JWT_SECRET; // Make sure this is set in your server environment
  if (!secret) {
    return NextResponse.json(
      { message: 'JWT secret not found' },
      { status: 500 }
    );
  }

  try {
    // Verify the token with the secret
    const decoded = jwt.verify(token, secret);

    // Token is valid, respond with success
    return NextResponse.json({ message: 'Token is valid' }, { status: 200 });
  } catch (error) {
    // Token verification failed (expired or invalid token)
    return NextResponse.json({ message: 'Token is invalid' }, { status: 401 });
  }
}
