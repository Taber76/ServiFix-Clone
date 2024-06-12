import { prisma } from "../lib/prisma";

export default class ChatHelper {

  static async getChatByUserIds(user1_id: number, user2_id: number) {
    let chat = await prisma.chat.findFirst({
      where: {
        OR: [
          { user1_id: user1_id, user2_id: user2_id },
          { user1_id: user2_id, user2_id: user1_id }
        ]
      }
    })
    if (!chat) {
      const user1_info = await prisma.user.findUnique({ where: { id: user1_id }, select: { photo: true, username: true } })
      const user2_info = await prisma.user.findUnique({ where: { id: user2_id }, select: { photo: true, username: true } })
      chat = await prisma.chat.create({
        data: {
          user1_id: user1_id,
          user1_photo: user1_info ? user1_info.photo : null,
          user1_username: user1_info ? user1_info.username : null,
          user2_id: user2_id,
          user2_photo: user2_info ? user2_info.photo : null,
          user2_username: user2_info ? user2_info.username : null
        }
      })
    }

    return chat
  }


}