import axios from "axios";
import sgMail from '@sendgrid/mail'
import EmailTemplates from "../templates/email.templates";

sgMail.setApiKey(process.env.SENDGRID_API_KEY as string);

export default class EmailHelper {


  static async sendVerificationEmail(email: string, id: number, key: string) {
    try {
      const msg = {
        to: email,
        from: 'sync.ideas.group@gmail.com',
        subject: '¡Welcome to ServiceFix!',
        html: EmailTemplates.verifyEmail(id, key)
      }
      await sgMail.send(msg)
      return {
        success: true
      }
    } catch (error) {
      return {
        success: false,
        error
      }
    }
  }


  static async sendResetPasswordEmail(email: string, key: string) {
    try {
      const msg = {
        to: email,
        from: 'sync.ideas.group@gmail.com',
        subject: '¡Reset your password!',
        html: EmailTemplates.resetPassword(key)
      }
      await sgMail.send(msg)
      return {
        success: true
      }
    } catch (error) {
      return {
        success: false,
        error
      }
    }
  }



}

