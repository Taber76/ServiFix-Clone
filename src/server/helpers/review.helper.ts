import OpenAI from "openai"
import { prisma } from "@/server/lib/prisma"

const propmpt = "El siguiente mensaje es de una review de un servicio que a prestado un proveedor, si te parece adecuado que no insulta o demas responde 1 y si no responde 0:"
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })

export default class ReviewHelper {

  static async checkReview(review: string) {
    try {
      const msg = propmpt + review
      const response = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: msg }]
      })
      if (response.choices[0].message?.content?.includes("1")) return true
      return false

    } catch (error) {
      console.log(error)
      return false
    }
  }

  static async getReviewsAndUserInfo(service_id: number) {
    try {
      const reviews = await prisma.review.findMany({
        where: { service_id: service_id }
      })
      const reviewsWithUser = await Promise.all(reviews.map(async (review: any) => {
        const user = await prisma.user.findUnique({
          where: { id: review.user_id },
          select: { username: true }
        })
        return {
          ...review,
          by: user?.username,
          commentarie: review.comment,
          url_image: null
        }
      }))

      return reviewsWithUser
    } catch (error) {
      console.log(error)
      return null
    }
  }



}

