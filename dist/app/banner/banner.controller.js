"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const banner_service_1 = __importDefault(require("./banner.service"));
const http_response_1 = __importDefault(require("../../response/http-response"));
const banner_dto_1 = require("./dto/banner.dto");
class BannerController {
    getInfo(req) {
        return banner_service_1.default.getInfo(req.user);
    }
    create(req) {
        return banner_service_1.default.create(req.body, req.user).then(data => {
            return http_response_1.default.created("Success", new banner_dto_1.BannerDto(data));
        });
    }
    update(req) {
        return banner_service_1.default.update(req.params.id, req.body).then((data) => {
            return http_response_1.default.success("Success", new banner_dto_1.BannerDto(data));
        });
    }
    delete(req) {
        return banner_service_1.default.delete(req.params.id).then(data => {
            return http_response_1.default.success("Success", new banner_dto_1.BannerDto(data));
        });
    }
}
exports.default = new BannerController();
