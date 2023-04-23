"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const auth_service_1 = __importDefault(require("./auth.service"));
const user_service_1 = __importDefault(require("../user/user.service"));
const http_exception_1 = require("../../exceptions/http-exception");
class AuthController {
    async login(req, res) {
        return auth_service_1.default.login(req.body).then((user) => {
            auth_service_1.default.setTokenCookie(res, user.accessToken, user.refreshToken);
            return user;
        });
    }
    async register(req, res) {
        return auth_service_1.default.register(req.body).then((user) => {
            auth_service_1.default.setTokenCookie(res, user.accessToken, user.refreshToken);
            return user;
        });
    }
    async logout(req) {
        return auth_service_1.default.logout(req.body);
    }
    async refreshToken(req, res) {
        return auth_service_1.default.refreshToken(req).then((user) => {
            auth_service_1.default.setTokenCookie(res, user.accessToken, user.refreshToken);
            return user;
        });
    }
    async forgotPassword(req) {
        return auth_service_1.default.forgotPassword(req.body.email);
    }
    async resetPassword(req) {
        return auth_service_1.default.resetPassword(req.body.password, req.body.token);
    }
    async getCurrentUser(req) {
        const authorization = req.headers.authorization;
        if (!authorization) {
            throw http_exception_1.HttpException.unauthorized("Unauthorized");
        }
        const accessToken = authorization.split(" ")[1];
        return user_service_1.default.findByAccessToken(accessToken);
    }
}
exports.default = new AuthController();
