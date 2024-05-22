

export default class EmailTemplates {

  static verifyEmail(id: number, key: string) {
    return `<p>Bienvenido a ServiceFix!</p>
    <p>Para verificar tu cuenta, haz click en el siguiente enlace: <a href="${process.env.DEPLOY_URL}api/auth/verify?id=${id}&key=${key}">Verificar cuenta</a></p>`
  }

}