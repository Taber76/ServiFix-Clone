import { NextApiRequest } from 'next'
import AuthHelper from '@/server/helpers/auth.helper'

export default class AuthMiddleware {

  static checkAuth(req: NextApiRequest, userTypes: string[]) {
    if (!req.headers.cookie) return { success: false, error: 'Not cookie on headers.' }

    const accessToken = req.headers.cookie.split('=')[1]
    if (!accessToken) return { success: false, error: 'Not access token.' }

    const authResponse = AuthHelper.authenticateUserToken(accessToken, userTypes)
    if (!authResponse.success) return { success: false, error: 'Invalid access token.' }

    return { success: true, user_id: authResponse.data?.user_id }
  }
}