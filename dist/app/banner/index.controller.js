"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_service_1 = __importDefault(require("./index.service"));
const http_response_1 = __importDefault(require("../../response/http-response"));
const banner_dto_1 = require("./dto/banner.dto");
class BannerController {
    getInfo(_req, res) {
        index_service_1.default.getInfo().then(data => {
            return res.status(200).send(new http_response_1.default(200, 'Success', data.map(banner => new banner_dto_1.BannerDto(banner))));
        });
    }
    create(req, res) {
        index_service_1.default.create(req.body).then(data => {
            return res.status(201).send(new http_response_1.default(201, 'Success', new banner_dto_1.BannerDto(data)));
        });
    }
    update(req, res) {
        index_service_1.default.update(req.params.id, req.body).then(data => {
            return res.status(200).send(new http_response_1.default(200, 'Success', new banner_dto_1.BannerDto(data)));
        });
    }
    delete(req, res) {
        index_service_1.default.delete(req.params.id).then(data => {
            return res.status(200).send(new http_response_1.default(200, 'Success', new banner_dto_1.BannerDto(data)));
        });
    }
}
exports.default = new BannerController();
