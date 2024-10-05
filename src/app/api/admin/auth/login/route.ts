import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/lib/db/prisma';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your_secret_key'; // Store securely in .env

const loginHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: 'Email and password are required' });
    }

    try {
      // Find admin by email
      const admin = await prisma.admin.findUnique({ where: { email } });

      if (!admin) {
        return res.status(400).json({ message: 'Invalid credentials' });
      }

      // Compare password
      const passwordMatch = await bcrypt.compare(password, admin.password);

      if (!passwordMatch) {
        return res.status(400).json({ message: 'Invalid credentials' });
      }

      // Create JWT token
      const token = jwt.sign({ adminId: admin.id }, JWT_SECRET, {
        expiresIn: '1h',
      });

      // Send token in response
      return res.status(200).json({ token });
    } catch (error) {
      return res.status(500).json({ message: 'Something went wrong', error });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};

export default loginHandler;
