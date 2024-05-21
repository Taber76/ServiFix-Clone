import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '@/server/lib/prisma'

class UserController {

  static async getAll(_: NextApiRequest, res: NextApiResponse) {
    try {
      const users = await prisma.user.findMany()
      if (!users) return res.status(204).json({ error: 'No users found' })
      return res.status(200).json(users)
    } catch (error) {
      return res.status(500).json({ error })
    }
  }

  static async getById(req: NextApiRequest, res: NextApiResponse) {
    try {
      const { id } = req.query
      const user = await prisma.user.findUnique({ where: { id: Number(id) } })
      if (!user) return res.status(204).json({ error: 'User not found' })
      return res.status(200).json(user)
    } catch (error) {
      return res.status(500).json({ error })
    }
  }

}

export default UserController

