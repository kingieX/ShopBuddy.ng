import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/lib/db/prisma';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { title, description, startDate, endDate, imageUrl, isActive } =
    req.body;

  try {
    const promotion = await prisma.promotion.create({
      data: {
        title,
        description,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        imageUrl,
        isActive: Boolean(isActive),
      },
    });

    res.status(200).json(promotion);
  } catch (error) {
    res.status(500).json({ message: 'Failed to create promotion' });
  }
}
