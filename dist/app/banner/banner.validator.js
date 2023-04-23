"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const create_banner_dto_1 = require("./dto/create-banner.dto");
const class_validator_1 = require("class-validator");
const http_exception_1 = require("../../exceptions/http-exception");
const helpers_1 = require("../../lib/helpers");
const update_banner_dto_1 = require("./dto/update-banner.dto");
class BannerValidator {
    async validateCreateBody(req, res, next) {
        // validate req body
        const bannerDto = new create_banner_dto_1.CreateBannerDto(req.body.username, req.body.title, req.body.description, req.body.isActive);
        await (0, class_validator_1.validate)(bannerDto).then(errors => {
            if (errors.length > 0) {
                return res.status(400).send(http_exception_1.HttpException.badRequest("Bad Request", (0, helpers_1.normalizeValidatorErrors)(errors)));
            }
            return next();
        });
    }
    async validateUpdateBody(req, res, next) {
        const updateBannerDto = new update_banner_dto_1.UpdateBannerDto(req.body.username, req.body.title, req.body.description, req.body.isActive);
        // at least one field is required
        if (!updateBannerDto.username && !updateBannerDto.title && !updateBannerDto.description && !updateBannerDto.isActive) {
            return res.status(400).send(http_exception_1.HttpException.badRequest("Bad Request", "At least one field is required"));
        }
        const errors = await (0, class_validator_1.validate)(updateBannerDto);
        if (errors.length > 0) {
            return res.status(400).send(http_exception_1.HttpException.badRequest("Bad Request", (0, helpers_1.normalizeValidatorErrors)(errors)));
        }
        return next();
    }
}
exports.default = new BannerValidator();
