import type { NextApiRequest, NextApiResponse } from 'next'
import ChatController from '@/server/controllers/chat.controller';
import AuthMiddleware from '@/server/middlewares/auth.middleware';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ msg: 'Method not allowed.' });
  }

  const middlewareResponse = AuthMiddleware.checkAuth(req, ['SUPPLIER', 'COSTUMER', 'ADMIN']);
  if (!middlewareResponse.success) return res.status(401).json({ msg: 'Unauthorized.' });
  req.body['user_id'] = middlewareResponse.user_id

  return ChatController.saveSendMessage(req, res);
}