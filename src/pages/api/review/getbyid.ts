import type { NextApiRequest, NextApiResponse } from 'next'
import ReviewController from '@/server/controllers/review.controller';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ msg: 'Method not allowed' });
  }
  return ReviewController.getById(req, res);
}