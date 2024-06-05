import type { NextApiRequest, NextApiResponse } from 'next';
import multer from 'multer';
import UserController from '@/server/controllers/user.controller';
import AuthMiddleware from '@/server/middlewares/auth.middleware';

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'PUT') {
    return res.status(405).json({ msg: 'Method not allowed.' });
  }

  const middlewareResponse = AuthMiddleware.checkAuth(req, ['SUPPLIER', 'CUSTOMER']);
  if (!middlewareResponse.success) {
    return res.status(401).json({ msg: 'Unauthorized.' });
  }
  const user_id = Number(middlewareResponse.user_id)


  const multerMiddleware = upload.single('image');

  multerMiddleware(req as any, res as any, (err: any) => {
    if (err) {
      return res.status(500).json({ msg: 'Internal server error.' });
    }

    return UserController.uploadImage(req, res, user_id);
  });
};


export const config = {
  api: {
    bodyParser: false,
  },
};

export default handler;
