"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_service_1 = __importDefault(require("../api/user/user.service"));
const http_exception_1 = require("../exceptions/http-exception");
class AuthMiddleware {
    async verifyToken(req, res, next) {
        // get access token from header
        const authorization = req.headers.authorization;
        if (!authorization) {
            return res.status(401).send(new http_exception_1.HttpException(401, "Unauthorized", "No authorization header"));
        }
        // verify access token
        const accessToken = authorization.split(" ")[1];
        try {
            const decodedToken = jsonwebtoken_1.default.verify(accessToken, process.env.JWT_SECRET, {
                algorithms: ["HS256"],
            });
            const user = await user_service_1.default.findByEmail(decodedToken.email);
            if (!user || user.accessToken !== accessToken) {
                return res.status(401).send(new http_exception_1.HttpException(401, "Unauthorized"));
            }
            // set user to request
            req.user = user;
            return next();
        }
        catch (error) {
            console.log(error);
            return res.status(401).send(new http_exception_1.HttpException(401, "Unauthorized", error));
        }
    }
}
exports.default = new AuthMiddleware();
