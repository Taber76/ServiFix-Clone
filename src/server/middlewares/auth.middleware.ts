import { NextApiRequest } from 'next'
import cookie from 'cookie'
import AuthHelper from '@/server/helpers/auth.helper'

export default class AuthMiddleware {

  static checkAuth(req: NextApiRequest, userTypes: string[]) {
    if (!req.headers.cookie) return { success: false, error: 'Not cookie on headers.' }

    const cookies = cookie.parse(req.headers.cookie)
    const accessToken = cookies.accessToken
    if (!accessToken) {
      return { success: false, error: 'No access token.' }
    }

    const authResponse = AuthHelper.authenticateUserToken(accessToken, userTypes)
    if (!authResponse.success) return { success: false, error: 'Invalid access token.' }

    return { success: true, user_id: authResponse.data?.user_id }
  }
}