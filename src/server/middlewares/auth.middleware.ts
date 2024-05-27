import { NextApiRequest } from 'next'
import AuthHelper from '@/server/helpers/auth.helper'

export default class AuthMiddleware {


  static checkAuth(req: NextApiRequest, userTypes: string[]) {
    if (!req.headers.authorization) return { success: false, error: 'Not authorization header.' }

    const token = req.headers.authorization.split(' ')[1]
    if (!token) return { success: false, error: 'Not token.' }

    const authResponse = AuthHelper.authenticateUserToken(token, userTypes)
    if (!authResponse.success) return { success: false, error: 'Invalid token.' }

    return { success: true, user_id: authResponse.data?.user_id }
  }
}