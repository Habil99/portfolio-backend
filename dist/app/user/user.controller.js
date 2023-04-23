"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_service_1 = __importDefault(require("./user.service"));
class UserController {
    findAll() {
        return user_service_1.default.findAll();
    }
    findOne(req) {
        return user_service_1.default.findOne(req.params.id);
    }
    create(req) {
        return user_service_1.default.create(req.body);
    }
    update(req) {
        return user_service_1.default.update(req.params.id, req.body);
    }
    delete(req) {
        return user_service_1.default.delete(req.params.id);
    }
}
exports.default = new UserController();
