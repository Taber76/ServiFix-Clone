import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '@/server/lib/prisma'
import UploadHelper from '../helpers/upload.helper'
import ReviewHelper from '../helpers/review.helper'
import sharp from 'sharp'


export default class ServiceController {

  static async getAll(req: NextApiRequest, res: NextApiResponse) {
    try {
      const services = await prisma.service.findMany({
        where: {
          active: true
        }
      })
      if (!services) return res.status(404).json({ msg: 'No services found' })
      return res.status(200).json(services)
    } catch (error) {
      return res.status(500).json({ msg: 'Internal server error.', error })
    }
  }

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

  static async getBestServicesByServiceTypeId(req: NextApiRequest, res: NextApiResponse) {
    try {
      const { number_services, service_type_id } = req.query
      const services = await prisma.service.findMany({
        where: {
          service_type_id: Number(service_type_id),
          active: true,
          shown: true
        },
        take: Number(number_services),
        orderBy: [{ rating: 'desc' }]
      })
      if (!services) return res.status(404).json({ msg: 'No services found' })
      const serviceType = await prisma.serviceType.findUnique({ where: { id: Number(service_type_id) } })
      return res.status(200).json({ serviceType, services })
    } catch (error) {
      return res.status(500).json({ msg: 'Internal server error.', error })
    }
  }

  static async getBestServicesOfEachType(req: NextApiRequest, res: NextApiResponse) {
    try {
      const services = await prisma.service.groupBy({
        where: {
          active: true,
          shown: true
        },
        by: ['service_type_id'],
        _max: {
          rating: true
        }
      });
      if (!services || services.length === 0) return res.status(404).json({ msg: 'No services found' });
      const bestServicesByType = await Promise.all(services.map(async (service) => {
        const { _max: { rating }, service_type_id } = service;
        const bestService = await prisma.service.findFirst({
          where: {
            service_type_id,
            rating
          }
        });
        return bestService;
      }));
      const serviceTypes = await prisma.serviceType.findMany();
      return res.status(200).json({ serviceTypes, bestServicesByType });
    } catch (error) {
      return res.status(500).json({ msg: 'Internal server error.', error });
    }
  }

  static async getByServiceId(req: NextApiRequest, res: NextApiResponse) {
    try {
      const { id } = req.query
      const service = await prisma.service.findUnique({ where: { id: Number(id), active: true } })
      if (!service) return res.status(404).json({ msg: 'Service not found' })

      const reviewsWithUser = await ReviewHelper.getReviewsAndUserInfo(service.id)
      const category = await prisma.serviceType.findUnique({ where: { id: service.service_type_id }, select: { name: true } })
      const city = await prisma.city.findUnique({ where: { id: service.city_id }, select: { name: true } })
      const user = await prisma.user.findUnique({ where: { id: service.user_id } })
      if (!user || !city || !category) return res.status(500).json({ msg: 'Internal server error.' })

      const serviceWithInfo = {
        id: service.id,
        postedBy: {
          ...user,
          password: null,
          key: null,
          password_reset_key: null
        },
        category: category.name,
        title: service.title,
        description: service.description,
        url_image: service.url_image,
        price: service.hourly_price,
        currency: service.currency,
        location: city.name,
        stars: service.rating,
        city: city.name,
        reviews: reviewsWithUser,
        createdAt: service.createdAt,
        updatedAt: service.updatedAt
      }

      return res.status(200).json(serviceWithInfo)
    } catch (error) {
      return res.status(500).json({ msg: 'Internal server error.', error })
    }
  }

  static async create(req: NextApiRequest, res: NextApiResponse) {
    try {
      const { description, hourly_price, user_id, service_type_id, city_id, country_id } = req.body
      const serviceExist = await prisma.service.findFirst({ where: { user_id: Number(user_id), service_type_id: Number(service_type_id) } })
      if (serviceExist) return res.status(400).json({ msg: 'Service already exists.' })
      const data = {
        description,
        hourly_price: hourly_price ? Number(hourly_price) : null,
        user_id: Number(user_id),
        service_type_id: Number(service_type_id),
        city_id: city_id ? Number(city_id) : 1,
        country_id: country_id ? Number(country_id) : 1
      }
      const service = await prisma.service.create({
        data
      })
      if (!service) return res.status(404).json({ msg: 'Service not created.' })
      return res.status(200).json(service)
    } catch (error) {
      return res.status(500).json({ msg: 'Internal server error.', error })
    }
  }

  static async update(req: NextApiRequest, res: NextApiResponse) {
    try {
      const { id, description, hourly_price, user_id, service_type_id, shown, active, city_id, country_id } = req.body
      const service = await prisma.service.update({
        where: { id: Number(id), user_id: Number(user_id) },
        data: {
          description,
          hourly_price: Number(hourly_price),
          service_type_id: Number(service_type_id),
          shown,
          active,
          city_id,
          country_id
        }
      })
      if (!service) return res.status(404).json({ msg: 'Service not updated.' })
      return res.status(200).json(service)
    } catch (error) {
      return res.status(500).json({ msg: 'Internal server error.', error })
    }
  }

  static async delete(req: NextApiRequest, res: NextApiResponse) {
    try {
      const { id, user_id } = req.query
      const service = await prisma.service.update({
        where: { id: Number(id), user_id: Number(user_id) },
        data: { active: false }
      })
      if (!service) return res.status(404).json({ msg: 'Service not deleted.' })
      return res.status(200).json(service)
    } catch (error) {
      return res.status(500).json({ msg: 'Internal server error.', error })
    }
  }

  static async getByCityAndType(req: NextApiRequest, res: NextApiResponse) {
    try {
      const { city_id, service_type_id } = req.query
      const where: any = {
        active: true,
        shown: true
      }
      if (city_id) where.city_id = Number(city_id)
      if (service_type_id) where.service_type_id = Number(service_type_id)
      const services = await prisma.service.findMany({ where })
      if (!services) return res.status(404).json({ msg: 'No services found.' })
      return res.status(200).json(services)
    } catch (error) {
      return res.status(500).json({ msg: 'Internal server error.', error })
    }
  }

  static async uploadImage(req: any, res: any, user_id: number) {
    try {
      if (!req.file) return res.status(400).json({ msg: 'No image uploaded.' })
      const { service_id } = req.query

      const file = req.file

      const processedImageBuffer = await sharp(file.buffer)
        .resize(400)
        .toFormat('jpeg')
        .jpeg({ quality: 80 })
        .toBuffer();

      const imageUrl = await UploadHelper.uploadImage(processedImageBuffer)
      if (!imageUrl) return res.status(400).json({ msg: 'Image not uploaded.' })
      await prisma.service.update({
        where: {
          id: Number(service_id),
          user_id: user_id
        },
        data: {
          url_image: imageUrl
        }
      })


      return res.status(200).json({ msg: 'Image uploaded.' })
    } catch (error) {
      return res.status(500).json({ msg: 'Internal server error.', error })
    }

  }

}