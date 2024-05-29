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
      console.log(error)
      return {
        success: false,
        error
      }
    }
  }

  static async sendVerificationEmail_OLD2(email: string, id: number, key: string) {
    try {
      const response = await axios.post('https://api.mailersend.com/v1/email', {
        from: {
          name: 'ServiceFix',
          email: 'merlifish@gmail.com'
        },
        to: [
          {
            email,
            name: 'Nuevo usuario',
          }
        ],
        subject: '¡Welcome to ServiceFix!',
        html: `<html><head></head><body>${EmailTemplates.verifyEmail(id, key)}</body></html>`
      }, {
        headers: {
          'X-Requested-With': 'XMLHttpRequest',
          'Authorization': `Bearer ${process.env.MAIL_API_KEY}`,
          'content-type': 'application/json'
        }
      })
      return {
        success: true,
        data: response.data
      }

    } catch (error) {
      console.log(error)
      return {
        success: false,
        error
      }
    }

  }

  static async sendVerificationEmail_OLD(email: string, id: number, key: string) {
    try {
      const response = await axios.post('https://api.sendinblue.com/v3/smtp/email', {
        sender: {
          name: 'ServiceFix',
          email: 'register@servifix.com'
        },
        to: [
          {
            email,
            name: 'Nuevo usuario'
          }
        ],
        subject: '¡Bienvenido a ServiceFix!',
        htmlContent: EmailTemplates.verifyEmail(id, key),
        headers: {
          'X-Mailin-custom': 'custom_header_1:custom_value_1|custom_header_2:custom_value_2|custom_header_3:custom_value_3',
          charset: 'iso-8859-1'
        },
        params: {
          'track_clicks': false,
          'track_opens': false
        }
      }, {
        headers: {
          'accept': 'application/json',
          'api-key': process.env.SENDINBLUE_API_KEY,
          'content-type': 'application/json'
        }
      })
      return {
        success: true,
        data: response.data
      }

    } catch (error) {
      return {
        success: false,
        error
      }
    }

  }



}

