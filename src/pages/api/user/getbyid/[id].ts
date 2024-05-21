import type { NextApiRequest, NextApiResponse } from 'next'
import UserController from '@/server/controllers/user.controller'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

  // logica de autenticacion


  await UserController.getById(req, res)
}