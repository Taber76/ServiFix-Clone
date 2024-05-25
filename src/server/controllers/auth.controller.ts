import type { NextApiRequest, NextApiResponse } from 'next'
import bcrypt from 'bcrypt'
import { prisma } from '@/server/lib/prisma'
import AuthHelper from '@/server/helpers/auth.helper'
import EmailHelper from '../helpers/email.helper'


export default class AuthController {

  static async register(req: NextApiRequest, res: NextApiResponse) {
    try {
      if (!AuthHelper.checkRegisterData(req.body)) {
        return res.status(400).json({ msg: 'Invalid data' })
      }

      const user = await prisma.user.findUnique({ where: { email: req.body.email } })
      if (user) return res.status(400).json({ msg: 'User already exists' })

      const hashPassword = await bcrypt.hash(req.body.password, process.env.SALT_ROUNDS ? Number(process.env.SALT_ROUNDS) : 10)
      const key = AuthHelper.generateKey()
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
        role: req.body.role ? req.body.role : "CUSTUMER",
        key
      }

      const newUser = await prisma.user.create({
        data
      })

      const sendEmail = await EmailHelper.sendVerificationEmail(newUser.email, newUser.id, key)
      if (!sendEmail.success) return res.status(500).json({ msg: 'Dont send verification email, contact support.', error: sendEmail.data })

      return res.status(201).json({ msg: 'User created', user: { ...newUser, password: undefined, key: undefined } })

    } catch (error) {
      return res.status(500).json({ msg: 'Internal server error, user not created.', error })
    }
  }


  static async verify(req: NextApiRequest, res: NextApiResponse) {
    try {
      const { id, key } = req.query
      const user = await prisma.user.findUnique({ where: { id: Number(id) } })
      if (!user) return res.status(404).json({ msg: 'User not found' })
      if (user.active) return res.status(400).json({ msg: 'User already verified' })
      if (user.key !== key) return res.status(403).json({ msg: 'Invalid key' })

      await prisma.user.update({
        where: { id: Number(id) },
        data: { active: true }
      })
      return res.status(200).json({ msg: 'User verified' })

    } catch (error) {
      return res.status(500).json({ msg: 'Internal server error, user not verified.', error })
    }
  }


}