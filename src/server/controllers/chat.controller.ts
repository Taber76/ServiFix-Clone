import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '@/server/lib/prisma'
import ChatHelper from '@/server/helpers/chat.helper'

export default class ChatController {

  static async getAllByUserId(req: NextApiRequest, res: NextApiResponse) {
    try {
      const { user_id } = req.query
      const chats = await prisma.chat.findMany({
        where: {
          OR: [
            { user1_id: Number(user_id) },
            { user2_id: Number(user_id) }
          ]
        }
      })
      if (!chats) return res.status(404).json({ error: 'No chats found' })
      return res.status(200).json(chats)
    } catch (error) {
      return res.status(500).json({ error })
    }
  }

  static async getMessagesByChatId(req: NextApiRequest, res: NextApiResponse) {
    try {
      const { chat_id, number_of_messages, user_id } = req.query
      const messages = await prisma.message.findMany({
        where: {
          chat_id: Number(chat_id)
        },
        orderBy: {
          timestamp: 'desc'
        },
        take: number_of_messages ? Number(number_of_messages) : 10
      })
      if (!messages) return res.status(404).json({ error: 'No messages found' })
      return res.status(200).json(messages)
    } catch (error) {
      return res.status(500).json({ error })
    }
  }

  static async saveSendMessage(req: NextApiRequest, res: NextApiResponse) {
    try {
      let { chat_id, user_id, recipient_id, message } = req.body
      if (!chat_id) {
        if (!recipient_id) return res.status(400).json({ error: 'Missing recipient_id or chat_id' })
        chat_id = await ChatHelper.getChatIdByUserIds(user_id, recipient_id)
      }
      const newMessage = await prisma.message.create({
        data: {
          chat_id: Number(chat_id),
          sender_id: Number(user_id),
          message
        }
      })
      if (!newMessage) return res.status(404).json({ error: 'No message saved on DB.' })
      return res.status(201).json(newMessage)
    } catch (error) {
      return res.status(500).json({ error })
    }
  }


}