import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '@/server/lib/prisma'

export default class ReviewController {


  static async getByServiceId(req: NextApiRequest, res: NextApiResponse) {
    try {
      const { service_id } = req.query
      const reviews = await prisma.review.findMany({
        where: {
          service_id: Number(service_id),
          active: true
        }
      })
      if (!reviews) return res.status(404).json({ msg: 'No reviews found.' })
      return res.status(200).json(reviews)
    } catch (error) {
      return res.status(500).json({ msg: 'Internal server error.', error })
    }
  }

  static async getByUserId(req: NextApiRequest, res: NextApiResponse) {
    try {
      const { user_id } = req.query
      const reviews = await prisma.review.findMany({
        where: {
          user_id: Number(user_id),
          active: true
        }
      })
      if (!reviews) return res.status(404).json({ msg: 'No reviews found.' })
      return res.status(200).json(reviews)
    } catch (error) {
      return res.status(500).json({ msg: 'Internal server error.', error })
    }
  }

  static async create(req: NextApiRequest, res: NextApiResponse) {
    try {
      const { user_id, service_id, username, rating, comment } = req.body
      const previousReview = await prisma.review.findFirst({
        where: {
          user_id: Number(user_id),
          service_id: Number(service_id)
        }
      })
      if (previousReview) return res.status(400).json({ msg: 'Review already exists.' })
      const review = await prisma.review.create({
        data: {
          user_id: Number(user_id),
          service_id: Number(service_id),
          rating: Number(rating),
          comment,
          by: username ? username : "Anonymous"
        }
      })
      if (!review) return res.status(404).json({ msg: 'Review not created.' })
      return res.status(200).json(review)
    } catch (error) {
      return res.status(500).json({ msg: 'Internal server error.', error })
    }
  }

  static async update(req: NextApiRequest, res: NextApiResponse) {
    try {
      const { id, rating, comment, user_id } = req.body
      const data = {
        rating: rating ? Number(rating) : undefined,
        comment: comment ? comment : undefined
      }
      const review = await prisma.review.update({
        where: {
          id: Number(id),
          user_id: Number(user_id)
        },
        data
      })
      if (!review) return res.status(404).json({ msg: 'Review not updated.' })
      return res.status(200).json(review)
    } catch (error) {
      return res.status(500).json({ msg: 'Internal server error.', error })
    }
  }

  static async delete(req: NextApiRequest, res: NextApiResponse) {
    try {
      const { id } = req.query
      const review = await prisma.review.update({
        where: {
          id: Number(id)
        },
        data: { active: false }
      })
      if (!review) return res.status(404).json({ msg: 'Review not deleted.' })
      return res.status(200).json(review)
    } catch (error) {
      return res.status(500).json({ msg: 'Internal server error.', error })
    }
  }



}