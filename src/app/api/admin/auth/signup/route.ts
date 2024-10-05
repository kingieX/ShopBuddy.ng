import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/lib/db/prisma';
import bcrypt from 'bcryptjs';

const signupHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: 'Email and password are required' });
    }

    try {
      // Check if admin already exists
      const existingAdmin = await prisma.admin.findUnique({ where: { email } });
      if (existingAdmin) {
        return res.status(400).json({ message: 'Admin already exists' });
      }

      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create new admin
      const newAdmin = await prisma.admin.create({
        data: {
          email,
          password: hashedPassword,
        },
      });

      return res
        .status(201)
        .json({ message: 'Admin created', admin: newAdmin });
    } catch (error) {
      return res.status(500).json({ message: 'Something went wrong', error });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};

export default signupHandler;
