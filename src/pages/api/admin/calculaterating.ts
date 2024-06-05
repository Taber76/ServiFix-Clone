import type { NextApiRequest, NextApiResponse } from 'next'
import AdminController from '@/server/controllers/admin.controller';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ msg: 'Method not allowed' });
  }
  return AdminController.calculateRating(req, res);
}