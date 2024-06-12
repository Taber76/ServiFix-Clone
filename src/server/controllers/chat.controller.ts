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
        },
      })
      if (chats.length === 0) return res.status(404).json({ error: 'No chats found.' })
      const formatedChats = chats.map(chat => {
        return {
          chat_id: chat.id,
          user_id: chat.user1_id === Number(user_id) ? chat.user2_id : chat.user1_id,
          username: chat.user1_id === Number(user_id) ? chat.user2_username : chat.user1_username,
          user_image: chat.user1_id === Number(user_id) ? chat.user2_photo : chat.user1_photo,
          service_id: chat.service_id,
          service_image: chat.service_image,
          service_title: chat.service_title,
          last_message: chat.last_message
        }
      })

      return res.status(200).json(formatedChats)
    } catch (error) {
      return res.status(500).json({ error })
    }
  }

  static async getByUsersId(req: NextApiRequest, res: NextApiResponse) {
    try {
      let messages: any[] = []
      const { user1_id, user2_id, service_id } = req.query
      let chat = await prisma.chat.findFirst({
        where: {
          OR: [
            { user1_id: Number(user1_id), user2_id: Number(user2_id) },
            { user1_id: Number(user2_id), user2_id: Number(user1_id) }
          ]
        }
      })
      if (!chat) {
        chat = await ChatHelper.getChatByUserIds(Number(user1_id), Number(user2_id), Number(service_id))
      } else {
        messages = await prisma.message.findMany({
          where: {
            chat_id: chat.id
          },
          orderBy: {
            timestamp: 'asc'
          }
        })
      }
      return res.status(200).json({ chat, messages })
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
        select: {
          message: true,
          timestamp: true,
          sender: {
            select: {
              name: true,
              id: true
            }
          }
        },
        orderBy: {
          timestamp: 'asc'
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
        const chat = await ChatHelper.getChatByUserIds(user_id, recipient_id)
        chat_id = chat.id
      }
      await prisma.chat.update({
        where: { id: Number(chat_id) },
        data: { last_message: message }
      })
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

  static async socketSaveMessage(user1_id: number, user2_id: number, message: string) {
    try {
      const chat = await ChatHelper.getChatByUserIds(user1_id, user2_id)
      const newMessage = await prisma.message.create({
        data: {
          chat_id: chat.id,
          sender_id: user1_id,
          message
        }
      })
      await prisma.chat.update({
        where: { id: Number(chat.id) },
        data: { last_message: message }
      })
      if (!newMessage) return false
      return true
    } catch (error) {
      return false
    }
  }


}