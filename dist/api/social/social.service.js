"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const social_repository_1 = __importDefault(require("./social.repository"));
const social_dto_1 = require("./dto/social.dto");
const http_exception_1 = require("../../exceptions/http-exception");
const http_response_1 = __importDefault(require("../../response/http-response"));
class SocialService {
    async findAll(user) {
        const data = await social_repository_1.default.find({
            where: {
                user: {
                    email: user.email,
                },
            },
        });
        if (data.length === 0) {
            return [];
        }
        return data.map((item) => new social_dto_1.SocialDto(item));
    }
    async create(user, socialDto) {
        const social = social_repository_1.default.create({
            github: socialDto.github,
            facebook: socialDto.facebook,
            twitter: socialDto.twitter,
            instagram: socialDto.instagram,
            linkedin: socialDto.linkedin,
            medium: socialDto.medium,
            user: user,
        });
        return await social_repository_1.default.save(social).then((data) => new social_dto_1.SocialDto(data));
    }
    async delete(id) {
        const response = await social_repository_1.default.delete(id);
        if (response.affected === 0) {
            throw http_exception_1.HttpException.notFound("Social info not found");
        }
        return new http_response_1.default(200, "Social info deleted successfully", {});
    }
    async update(id, socialDto) {
        const response = await social_repository_1.default.update(id, socialDto);
        if (response.affected === 0) {
            throw http_exception_1.HttpException.notFound("Social info not found");
        }
        return new http_response_1.default(200, "Social info updated successfully", {});
    }
}
exports.default = new SocialService();
