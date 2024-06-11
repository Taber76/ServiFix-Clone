import { prisma } from "../lib/prisma";

export default class ChatHelper {

  static async getChatIdByUserIds(user1_id: number, user2_id: number) {
    let chat = await prisma.chat.findFirst({
      where: {
        OR: [
          { user1_id: user1_id, user2_id: user2_id },
          { user1_id: user2_id, user2_id: user1_id }
        ]
      }
    })
    if (!chat) {
      const user1_photo = await prisma.user.findUnique({ where: { id: user1_id }, select: { photo: true } })
      const user2_photo = await prisma.user.findUnique({ where: { id: user2_id }, select: { photo: true } })
      chat = await prisma.chat.create({
        data: {
          user1_id: user1_id,
          user1_photo: user1_photo ? user1_photo.photo : null,
          user2_id: user2_id,
          user2_photo: user2_photo ? user2_photo.photo : null
        }
      })
    }
    return chat.id
  }


}