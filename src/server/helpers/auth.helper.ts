import { UserType } from "../types/prisma.types";

class AuthHelper {

  static checkRegisterData(userData: Partial<UserType>) {
    if (!userData.username || !userData.password || !userData.name || !userData.surname || !userData.email) return false
    if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(userData.email)) return false
    if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(userData.password)) return false

    return true
  }

  static generateKey() {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let key = '';
    for (let i = 0; i < 15; i++) {
      key += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return key;
  }

}

export default AuthHelper