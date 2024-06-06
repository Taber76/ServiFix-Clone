import OpenAI from "openai"

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


}

