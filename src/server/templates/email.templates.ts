const url = process.env.NODE_ENV === 'production' ? 'https://servi-fix-clone.vercel.app' : 'http://localhost:3000';

export default class EmailTemplates {

  static verifyEmail(id: number, key: string) {
    return `
    <p>Welcome to ServiceFix!</p>
    <p>To verify your account, click the link below:</p>
    <p>
      <a href="${url}/api/auth/verify?id=${id}&key=${key}" style="display: inline-block; padding: 10px 20px; font-size: 16px; color: white; background-color: #007bff; text-align: center; text-decoration: none; border-radius: 5px;">
        Verify account
      </a>
    </p>
    <p>If you did not create an account, please ignore this email.</p>
`
  }

  static resetPassword(key: string) {
    return `
    <p>To reset your password, use the code below:</p>
    <p style="display: inline-block; padding: 10px 20px; font-size: 16px; color: white; background-color: #007bff; text-align: center; text-decoration: none; border-radius: 5px;">
      ${key}
    </p>
    </p>
    <p>If you did not request a password reset, please ignore this email.</p>
    `
  }


}