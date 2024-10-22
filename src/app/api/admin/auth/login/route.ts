// pages/api/admin/login.ts
import prisma from '@/lib/db/prisma';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { email, password } = req.body;

  const admin = await prisma.admin.findUnique({ where: { email } });

  if (!admin) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  const secret = process.env.JWT_SECRET;
  if (!secret) {
    return res.status(500).json({ message: 'JWT secret not found' });
  }

  // Generate a JWT token
  const token = jwt.sign(
    { email: admin.email, approved: admin.approved },
    secret, // Store this in your environment variables
    { expiresIn: '1h' } // Set expiration time (e.g., 1 hour)
  );

  const isValidPassword = await bcrypt.compare(password, admin.password);
  if (!isValidPassword) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  return res.status(200).json({ token });
}
