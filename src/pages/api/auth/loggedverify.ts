import type { NextApiRequest, NextApiResponse } from 'next'
import AuthMiddleware from '@/server/middlewares/auth.middleware'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ msg: 'Method not allowed' });
  }

  const middlewareResponse = AuthMiddleware.checkAuth(req, ['SUPPLIER', 'COSTUMER', 'ADMIN']);
  return res.status(200).json({ success: middlewareResponse.success });

}