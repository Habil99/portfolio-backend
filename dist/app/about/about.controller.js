"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const about_service_1 = __importDefault(require("./about.service"));
const http_exception_1 = require("../../exceptions/http-exception");
class AboutController {
    findAll(req) {
        return about_service_1.default.findAll(req.user);
    }
    create(req) {
        if (!req.files) {
            throw http_exception_1.HttpException.badRequest("No files were uploaded.");
        }
        const photo = req.files.photo;
        return about_service_1.default.create(req.user, req.body, photo);
    }
    delete(req) {
        return about_service_1.default.delete(req.params.id);
    }
    update(req) {
        return about_service_1.default.update(req.params.id, req.body);
    }
}
exports.default = new AboutController();