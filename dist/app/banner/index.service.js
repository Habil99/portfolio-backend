"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_repository_1 = __importDefault(require("./index.repository"));
const http_exception_1 = require("../../exceptions/http-exception");
class BannerService {
    async getInfo() {
        return await index_repository_1.default.find();
    }
    async create(bannerDto) {
        if (bannerDto.isActive) {
            await this.deactivateAllBanners();
        }
        const banner = index_repository_1.default.create(bannerDto);
        return await index_repository_1.default.save(banner);
    }
    async update(id, bannerDto) {
        const banner = await index_repository_1.default.findOne({ where: { id: parseInt(id) } });
        if (!banner) {
            throw new http_exception_1.HttpException(400, 'Bad Request');
        }
        if (bannerDto.isActive) {
            await this.deactivateAllBanners();
        }
        banner.username = bannerDto.username || banner.username;
        banner.title = bannerDto.title || banner.title;
        banner.description = bannerDto.description || banner.description;
        banner.isActive = Object.prototype.hasOwnProperty.call(bannerDto, 'isActive') ? bannerDto.isActive : banner.isActive;
        return await index_repository_1.default.save(banner);
    }
    async delete(id) {
        const banner = await index_repository_1.default.findOne({ where: { id: parseInt(id) } });
        if (!banner) {
            throw new http_exception_1.HttpException(400, 'Bad Request');
        }
        if (banner.isActive) {
            throw new http_exception_1.HttpException(400, 'Bad Request', 'Cannot delete an active banner');
        }
        await index_repository_1.default.delete(id);
        return banner;
    }
    async deactivateAllBanners() {
        const activeBanner = await index_repository_1.default.findOne({ where: { isActive: true } });
        if (activeBanner) {
            activeBanner.isActive = false;
            await index_repository_1.default.save(activeBanner);
        }
    }
}
exports.default = new BannerService();
