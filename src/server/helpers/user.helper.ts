import FormData from 'form-data';
import axios from 'axios';


export default class UserHelper {

  static async uploadImage(imageBuffer: Buffer) {
    try {

      const data = new FormData();
      data.append('image', imageBuffer, { filename: 'image.jpg' });
      const config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'https://api.imgur.com/3/image',
        headers: {
          'Authorization': `Client-ID ${process.env.IMGUR_CLIENT_ID}`,
          ...data.getHeaders(),
        },
        data: data,
      }
      const imgurResponse = await axios(config);

      return imgurResponse.data.data.link;
    } catch (error) {
      console.log(error);
      return null;
    }
  }


}