import type { NextApiRequest, NextApiResponse } from 'next'
import ServiceController from '@/server/controllers/service.controller';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  return ServiceController.getByServiceId(req, res);
}