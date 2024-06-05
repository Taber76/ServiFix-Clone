import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});


export default class UploadHelper {

  static async uploadImage(imageBuffer: Buffer) {
    try {

      const uploadResult: any = await new Promise((resolve) => {
        cloudinary.uploader.upload_stream((error, result) => {
          resolve(result);
        }).end(imageBuffer);
      });

      if (!uploadResult.url) return null;
      return uploadResult.url;

    } catch (error: any) {
      console.log(error.response.data);
      return null;
    }
  }


}