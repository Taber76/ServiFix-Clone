import { UserType } from "../../types/prisma.types";
import jwt, { JwtPayload } from 'jsonwebtoken'

export default class AuthHelper {

  static checkRegisterData(userData: Partial<UserType>) {
    if (!userData.username || !userData.password || !userData.name || !userData.surname || !userData.email) return false
    if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(userData.email)) return false
    if (userData.password.length < 8) return false

    return true
  }

  static generateKey() {
    const characters = '0123456789';
    let key = '';
    for (let i = 0; i < 6; i++) {
      key += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return key;
  }

  static isValidEmail(email: string) {
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)
  }

  static generateToken(user: any) {
    return jwt.sign({
      ...user,
      user_id: user.id,
      password: undefined,
      key: undefined,
    }, process.env.JWT_SECRET as string)
  }

  private static isJWTPayload(token: string | JwtPayload): token is JwtPayload {
    return (token as JwtPayload).role !== undefined
  }

  static authenticateUserToken(token: string, userTypes: string[]) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET as string)
      if (this.isJWTPayload(decoded)) {
        if (userTypes.includes(decoded.role)) {
          return {
            success: true,
            data: decoded
          }
        }
      }
      return { success: false }
    } catch (error) {
      return { success: false }
    }
  }

  static decodeToken(token: string) {
    return jwt.verify(token, process.env.JWT_SECRET as string)
  }

}

