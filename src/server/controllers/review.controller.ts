import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '@/server/lib/prisma'
import ReviewHelper from '../helpers/review.helper'

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
      const reviewsWithInfo = await Promise.all(reviews.map(async (review: any) => {
        const service = await prisma.service.findUnique({
          where: { id: review.service_id },
          select: { title: true, url_image: true }
        })
        return {
          ...review,
          service_title: service?.title,
          url_image: service?.url_image
        }
      }))
      return res.status(200).json(reviewsWithInfo)
    } catch (error) {
      return res.status(500).json({ msg: 'Internal server error.', error })
    }
  }

  static async create(req: NextApiRequest, res: NextApiResponse) {
    try {
      const { user_id, service_id, username, rating, title, comment } = req.body
      const checkReview = await ReviewHelper.checkReview(comment)
      if (!checkReview) return res.status(403).json({ msg: 'You review conntains inappropriate content, or could not be reviewed.' })
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
          title,
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
      const { id, rating, title, comment, user_id } = req.body
      const data = {
        title: title ? title : undefined,
        rating: rating ? Number(rating) : undefined,
        comment: comment ? comment : undefined
      }
      const checkReview = await ReviewHelper.checkReview(comment)
      if (!checkReview) return res.status(403).json({ msg: 'You review conntains inappropriate content, or could not be reviewed.' })
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

  static async getById(req: NextApiRequest, res: NextApiResponse) {
    try {
      const { id } = req.query
      const review = await prisma.review.findUnique({
        where: {
          id: Number(id)
        }
      })
      if (!review) return res.status(404).json({ msg: 'Review not found.' })
      return res.status(200).json(review)
    } catch (error) {
      return res.status(500).json({ msg: 'Internal server error.', error })
    }
  }



}