import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '@/server/lib/prisma'


export default class ServiceTypeController {

  static async getAll(req: NextApiRequest, res: NextApiResponse) {
    try {
      const serviceTypes = await prisma.serviceType.findMany()
      if (!serviceTypes) return res.status(404).json({ msg: 'No service types found' })
      return res.status(200).json(serviceTypes)
    } catch (error) {
      return res.status(500).json({ msg: 'Internal server error.', error })
    }
  }

  static async getById(req: NextApiRequest, res: NextApiResponse) {
    try {
      const { id } = req.query
      const serviceType = await prisma.serviceType.findUnique({ where: { id: Number(id) } })
      if (!serviceType) return res.status(404).json({ msg: 'Service type not found' })
      return res.status(200).json(serviceType)
    } catch (error) {
      return res.status(500).json({ msg: 'Internal server error.', error })
    }
  }

  static async create(req: NextApiRequest, res: NextApiResponse) {
    try {
      const { name, description, url_image } = req.body
      const serviceType = await prisma.serviceType.create({
        data: {
          name,
          description,
          url_image
        }
      })
      if (!serviceType) return res.status(404).json({ msg: 'Service type not created' })
      return res.status(200).json(serviceType)
    } catch (error) {
      return res.status(500).json({ msg: 'Internal server error.', error })
    }
  }

}