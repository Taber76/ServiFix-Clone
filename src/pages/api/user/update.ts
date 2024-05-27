import type { NextApiRequest, NextApiResponse } from 'next'
import UserController from '@/server/controllers/user.controller';
import AuthMiddleware from '@/server/middlewares/auth.middleware';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'PUT') {
    return res.status(405).json({ msg: 'Method not allowed.' });
  }

  const middlewareResponse = AuthMiddleware.checkAuth(req, ['SUPPLIER', 'COSTUMER']);
  if (!middlewareResponse.success) return res.status(401).json({ msg: 'Unauthorized.' });;
  req.body['user_id'] = middlewareResponse.user_id

  return UserController.update(req, res);
}