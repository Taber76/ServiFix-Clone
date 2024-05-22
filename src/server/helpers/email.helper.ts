import axios from "axios";
import EmailTemplates from "../templates/email.templates";

export default class EmailHelper {

  static async sendVerificationEmail(email: string, id: number, key: string) {
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

