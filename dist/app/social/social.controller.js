"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const social_service_1 = __importDefault(require("./social.service"));
class SocialController {
    findAll(req) {
        return social_service_1.default.findAll(req.user);
    }
    create(req) {
        return social_service_1.default.create(req.user, req.body);
    }
    delete(req) {
        return social_service_1.default.delete(req.params.id);
    }
    update(req) {
        return social_service_1.default.update(req.params.id, req.body);
    }
}
exports.default = new SocialController();
