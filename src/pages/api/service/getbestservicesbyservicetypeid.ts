import type { NextApiRequest, NextApiResponse } from 'next'
import ServiceController from '@/server/controllers/service.controller';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ msg: 'Method not allowed' });
  }
  return ServiceController.getBestServicesByServiceTypeId(req, res);
}