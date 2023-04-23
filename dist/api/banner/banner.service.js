"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const banner_repository_1 = __importDefault(require("./banner.repository"));
const http_exception_1 = require("../../exceptions/http-exception");
// import HttpResponse from "../../response/http-response";
const banner_dto_1 = require("../banner/dto/banner.dto");
class BannerService {
    async getInfo(user) {
        // return only user's banners
        const banners = await banner_repository_1.default.find({
            where: {
                user: {
                    email: user.email,
                },
            },
        });
        return banners.map(banner => new banner_dto_1.BannerDto(banner));
    }
    async create(bannerDto, user) {
        if (bannerDto.isActive) {
            await this.deactivateAllBanners();
        }
        const banner = banner_repository_1.default.create(Object.assign(Object.assign({}, bannerDto), { user: user }));
        return await banner_repository_1.default.save(banner);
    }
    async update(id, bannerDto) {
        const updateResponse = await banner_repository_1.default.update(id, bannerDto);
        if (updateResponse.affected === 0) {
            throw http_exception_1.HttpException.notFound("Banner not found");
        }
        if (bannerDto.isActive) {
            await this.deactivateAllBanners();
        }
        // this will not ever return null, because we already checked if banner exists with affected
        return await banner_repository_1.default.findOne({ where: { id: parseInt(id) } });
    }
    async delete(id) {
        const banner = await banner_repository_1.default.findOne({ where: { id: parseInt(id) } });
        if (!banner) {
            throw new http_exception_1.HttpException(400, "Bad Request");
        }
        if (banner.isActive) {
            throw http_exception_1.HttpException.badRequest("You can not delete active banner");
        }
        await banner_repository_1.default.delete(id);
        return banner;
    }
    async deactivateAllBanners() {
        const activeBanner = await banner_repository_1.default.findOne({ where: { isActive: true } });
        if (activeBanner) {
            activeBanner.isActive = false;
            await banner_repository_1.default.save(activeBanner);
        }
    }
}
exports.default = new BannerService();
