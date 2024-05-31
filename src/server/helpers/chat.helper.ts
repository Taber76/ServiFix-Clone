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
      chat = await prisma.chat.create({
        data: {
          user1_id: user1_id,
          user2_id: user2_id
        }
      })
    }
    return chat.id
  }


}