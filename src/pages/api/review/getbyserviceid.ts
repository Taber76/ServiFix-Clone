import type { NextApiRequest, NextApiResponse } from 'next'
import ReviewController from '@/server/controllers/review.controller'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

  // logica de autenticacion


  await ReviewController.getByServiceId(req, res)
}