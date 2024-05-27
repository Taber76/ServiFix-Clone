import type { NextApiRequest, NextApiResponse } from 'next'
import ServiceTypeController from '@/server/controllers/servicetype.controller';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ msg: 'Method not allowed' });
  }
  return ServiceTypeController.create(req, res);
}