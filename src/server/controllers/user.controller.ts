import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '@/server/lib/prisma'

class UserController {

  static async getAll(_: NextApiRequest, res: NextApiResponse) {
    try {
      const users = await prisma.user.findMany(
        {
          select: {
            id: true,
            username: true,
            name: true,
            surname: true,
            email: true,
            role: true
          }
        }
      )
      if (!users) return res.status(404).json({ error: 'No users found' })
      return res.status(200).json(users)
    } catch (error) {
      return res.status(500).json({ error })
    }
  }

  static async getById(req: NextApiRequest, res: NextApiResponse) {
    try {
      const { id } = req.query
      const user = await prisma.user.findUnique({ where: { id: Number(id) } })
      if (!user) return res.status(404).json({ error: 'User not found' })
      return res.status(200).json({ ...user, password: undefined, key: undefined })
    } catch (error) {
      return res.status(500).json({ error })
    }
  }

  static async update(req: NextApiRequest, res: NextApiResponse) {
    try {
      const { user_id, username, name, surname, email, photo, phone, description, personal_id, role } = req.body
      const data = {
        username: username ? username : undefined,
        name: name ? name : undefined,
        surname: surname ? surname : undefined,
        email: email ? email : undefined,
        photo: photo ? photo : undefined,
        phone: phone ? phone : undefined,
        description: description ? description : undefined,
        personal_id: personal_id ? personal_id : undefined,
        role: role ? role : undefined
      }

      const user = await prisma.user.update({
        where: { id: Number(user_id) },
        data
      })
      if (!user) return res.status(404).json({ error: 'User not found.' })
      return res.status(200).json({ ...user, password: undefined, key: undefined })
    } catch (error) {
      return res.status(500).json({ msg: 'Internal server error.', error })
    }
  }

}

export default UserController

