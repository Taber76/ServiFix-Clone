import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '@/server/lib/prisma'
import fs from 'fs'
import path from 'path';


export default class AdminController {

  static async calculateRating(req: NextApiRequest, res: NextApiResponse) {
    try {
      const services = await prisma.service.findMany({ where: { active: true } })
      if (services.length === 0) return res.status(404).json({ msg: 'No services found.' })
      services.forEach(async (service) => {
        const reviews = await prisma.review.findMany({ where: { service_id: service.id } })
        const rating = reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length
        await prisma.service.update({
          where: { id: service.id },
          data: { rating, num_reviews: reviews.length }
        })
      })
      return res.status(200).json({ msg: 'Rating calculated.' })
    } catch (error) {
      return res.status(500).json({ error })
    }
  }


  static async generateJsonBestSellers(req: NextApiRequest, res: NextApiResponse) {
    try {
      const services = await prisma.service.groupBy({
        where: { active: true, shown: true },
        by: ['service_type_id'], _max: { rating: true }
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

      const bestSellersPath = path.join(process.cwd(), 'public/data', 'bestsellers.json');
      const serviceTypesPath = path.join(process.cwd(), 'public/data', 'servicetypes.json');

      fs.writeFileSync(bestSellersPath, JSON.stringify(bestServicesByType));
      fs.writeFileSync(serviceTypesPath, JSON.stringify(serviceTypes));
      return res.status(200).json({ msg: 'Best sellers and service types generated successfully.' });
    } catch (error) {
      return res.status(500).json({ error })
    }
  }

}