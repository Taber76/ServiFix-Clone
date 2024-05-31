import type { NextApiRequest, NextApiResponse } from 'next'
import AuthController from '@/server/controllers/auth.controller'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ msg: 'Method not allowed' });
  }
  return AuthController.forgotPassword(req, res);
}