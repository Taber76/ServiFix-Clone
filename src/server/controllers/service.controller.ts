import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '@/server/lib/prisma'

export default class ServiceController {

  static async getAllByUserId(req: NextApiRequest, res: NextApiResponse) {
    try {
      const { user_id } = req.query
      const services = await prisma.service.findMany({
        where: {
          user_id: Number(user_id),
          active: true
        }
      })
      if (!services) return res.status(404).json({ msg: 'No services found' })
      return res.status(200).json(services)
    } catch (error) {
      return res.status(500).json({ msg: 'Internal server error.', error })
    }
  }

  static async getAllByServiceTypeId(req: NextApiRequest, res: NextApiResponse) {
    try {
      const { service_type_id } = req.query
      const services = await prisma.service.findMany({
        where: {
          service_type_id: Number(service_type_id),
          active: true
        }
      })
      if (!services) return res.status(404).json({ msg: 'No services found' })
      return res.status(200).json(services)
    } catch (error) {
      return res.status(500).json({ msg: 'Internal server error.', error })
    }
  }

  static async getBestServices(req: NextApiRequest, res: NextApiResponse) {
    try {
      const { number_services, service_type_id } = req.query
      const services = await prisma.service.findMany({
        where: {
          service_type_id: Number(service_type_id),
          active: true
        },
        take: Number(number_services),
        orderBy: [{ rating: 'desc' }]
      })
      if (!services) return res.status(404).json({ msg: 'No services found' })
      return res.status(200).json(services)
    } catch (error) {
      return res.status(500).json({ msg: 'Internal server error.', error })
    }
  }

  static async getByServiceId(req: NextApiRequest, res: NextApiResponse) {
    try {
      const { id } = req.query
      const service = await prisma.service.findUnique({ where: { id: Number(id) } })
      if (!service) return res.status(404).json({ msg: 'Service not found' })
      return res.status(200).json(service)
    } catch (error) {
      return res.status(500).json({ msg: 'Internal server error.', error })
    }
  }

  static async create(req: NextApiRequest, res: NextApiResponse) {
    try {
      const { description, hourly_price, user_id, service_type_id } = req.body
      const data = {
        description,
        hourly_price: hourly_price ? Number(hourly_price) : null,
        user_id: Number(user_id),
        service_type_id: Number(service_type_id)
      }
      const service = await prisma.service.create({
        data
      })
      if (!service) return res.status(404).json({ msg: 'Service not created' })
      return res.status(200).json(service)
    } catch (error) {
      return res.status(500).json({ msg: 'Internal server error.', error })
    }
  }

  static async update(req: NextApiRequest, res: NextApiResponse) {
    try {
      const { id, description, hourly_price, user_id, service_type_id, shown, active } = req.body
      const service = await prisma.service.update({
        where: { id: Number(id), user_id: Number(user_id) },
        data: {
          description,
          hourly_price: Number(hourly_price),
          service_type_id: Number(service_type_id),
          shown,
          active
        }
      })
      if (!service) return res.status(404).json({ msg: 'Service not updated' })
      return res.status(200).json(service)
    } catch (error) {
      return res.status(500).json({ msg: 'Internal server error.', error })
    }
  }

  static async delete(req: NextApiRequest, res: NextApiResponse) {
    try {
      const { id, user_id } = req.body
      const service = await prisma.service.update({
        where: { id: Number(id), user_id: Number(user_id) },
        data: { active: false }
      })
      if (!service) return res.status(404).json({ msg: 'Service not deleted' })
      return res.status(200).json(service)
    } catch (error) {
      return res.status(500).json({ msg: 'Internal server error.', error })
    }
  }

}