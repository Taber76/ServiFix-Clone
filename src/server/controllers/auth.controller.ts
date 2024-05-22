import type { NextApiRequest, NextApiResponse } from 'next'
import bcrypt from 'bcrypt'
import { prisma } from '@/server/lib/prisma'
import AuthHelper from '@/server/helpers/auth.helper'


class AuthController {

  static async register(req: NextApiRequest, res: NextApiResponse) {
    try {
      if (!AuthHelper.checkRegisterData(req.body)) {
        return res.status(400).json({ msg: 'Invalid data' })
      }

      const user = await prisma.user.findUnique({ where: { email: req.body.email } })
      if (user) return res.status(400).json({ msg: 'User already exists' })

      const hashPassword = await bcrypt.hash(req.body.password, process.env.SALT_ROUNDS ? Number(process.env.SALT_ROUNDS) : 10)
      const data = {
        username: req.body.username,
        password: hashPassword,
        name: req.body.name,
        surname: req.body.surname,
        email: req.body.email,
        photo: req.body.photo ? req.body.photo : null,
        phone: req.body.phone ? req.body.phone : null,
        description: req.body.description ? req.body.description : null,
        personal_id: req.body.personal_id ? req.body.personal_id : null,
        role: req.body.role ? req.body.role : "CUSTUMER"
      }

      const newUser = await prisma.user.create({
        data
      })
      return res.status(201).json({ msg: 'User created', user: { ...newUser, password: undefined } })

    } catch (error) {
      return res.status(500).json({ msg: 'Internal server error', error })
    }
  }



}

export default AuthController

