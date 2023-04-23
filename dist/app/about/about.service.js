"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const about_repository_1 = __importDefault(require("./about.repository"));
const about_dto_1 = require("./dto/about.dto");
const http_exception_1 = require("../../exceptions/http-exception");
const http_response_1 = __importDefault(require("../../response/http-response"));
const cloudinary_service_1 = __importDefault(require("../../services/cloudinary.service"));
class AboutService {
    async findAll(user) {
        const data = await about_repository_1.default.find({
            where: {
                user: {
                    email: user.email,
                },
            },
        });
        if (data.length === 0) {
            return [];
        }
        return data.map((item) => new about_dto_1.AboutDto(item));
    }
    async create(user, about, photo) {
        try {
            const photoSecureURL = await cloudinary_service_1.default.upload(photo);
            const data = await about_repository_1.default.save(Object.assign(Object.assign({ user: user }, about), { photo: photoSecureURL }));
            return new about_dto_1.AboutDto(data);
        }
        catch (e) {
            throw http_exception_1.HttpException.internal("Error uploading image", e);
        }
    }
    async delete(id) {
        const response = await about_repository_1.default.delete(id);
        if (response.affected === 0) {
            throw http_exception_1.HttpException.notFound("About not found");
        }
        return new http_response_1.default(200, "About deleted successfully", {});
    }
    async update(id, about) {
        const response = await about_repository_1.default.update(id, about);
        if (response.affected === 0) {
            throw http_exception_1.HttpException.notFound("About not found");
        }
        return new http_response_1.default(200, "About updated successfully", {});
    }
}
exports.default = new AboutService();
