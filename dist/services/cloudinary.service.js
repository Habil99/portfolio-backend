"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cloudinary_1 = require("cloudinary");
cloudinary_1.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});
class CloudinaryService {
    constructor() {
        this.cloudinary = cloudinary_1.v2;
    }
    async upload(image) {
        const base64 = image.data.toString("base64");
        const url = `data:${image.mimetype};base64,${base64}`;
        return await this.cloudinary.uploader.upload(url).then((result) => result.secure_url);
    }
}
exports.default = new CloudinaryService();
