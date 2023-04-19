import { v2 as cloudinary } from "cloudinary";
import { UploadedFile } from "express-fileupload";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

class CloudinaryService {
  private cloudinary: typeof cloudinary;

  constructor() {
    this.cloudinary = cloudinary;
  }

  async upload(image: UploadedFile) {
    const base64 = image.data.toString("base64");
    const url = `data:${image.mimetype};base64,${base64}`;
    return await this.cloudinary.uploader.upload(url).then((result) => result.secure_url);
  }
}

export default new CloudinaryService();
