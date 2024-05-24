import type { NextApiRequest, NextApiResponse } from 'next'
import ServiceTypeController from '@/server/controllers/servicetype.controller';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  return ServiceTypeController.getById(req, res);
}