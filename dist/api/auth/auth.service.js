"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_dto_1 = require("../user/dto/user.dto");
const user_service_1 = __importDefault(require("../user/user.service"));
const http_exception_1 = require("../../exceptions/http-exception");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_repository_1 = __importDefault(require("../user/user.repository"));
const email_service_1 = __importDefault(require("../../services/email.service"));
class AuthService {
    async login(loginDto) {
        const user = await user_service_1.default.findByEmail(loginDto.email);
        if (!user) {
            throw http_exception_1.HttpException.badRequest("User not found");
        }
        const isMatch = await bcrypt_1.default.compare(loginDto.password, user.password);
        if (!isMatch) {
            throw http_exception_1.HttpException.badRequest("Invalid credentials");
        }
        const { accessToken, refreshToken } = this.generateTokens(user);
        user.accessToken = accessToken;
        await user_repository_1.default.save(user);
        return Object.assign(Object.assign({}, new user_dto_1.UserDto(user)), { refreshToken,
            accessToken });
    }
    async register(userDto) {
        const isExists = await user_service_1.default.findByEmail(userDto.email);
        if (isExists) {
            throw http_exception_1.HttpException.badRequest("User already exists");
        }
        const password = await bcrypt_1.default.hash(userDto.password, 10);
        const { accessToken, refreshToken } = this.generateTokens(userDto);
        const user = user_repository_1.default.create(userDto);
        user.password = password;
        user.accessToken = accessToken;
        // set token to cookie
        return await user_repository_1.default.save(user).then((user) => {
            return Object.assign(Object.assign({}, new user_dto_1.UserDto(user)), { refreshToken,
                accessToken });
        });
    }
    async logout(logoutDto) {
        const user = await user_service_1.default.findByEmail(logoutDto.email);
        if (!user) {
            throw http_exception_1.HttpException.badRequest("User not found");
        }
        user.accessToken = "";
        return await user_repository_1.default.save(user);
    }
    async refreshToken(req) {
        const authorization = req.headers.authorization;
        if (!authorization) {
            throw http_exception_1.HttpException.unauthorized("Unauthorized");
        }
        const accessToken = authorization.split(" ")[1];
        const user = await user_service_1.default.findByAccessToken(accessToken);
        if (!user) {
            throw http_exception_1.HttpException.unauthorized("Unauthorized");
        }
        const { accessToken: newAccessToken, refreshToken } = this.generateTokens(user);
        user.accessToken = newAccessToken;
        await user_repository_1.default.save(user);
        return Object.assign(Object.assign({}, new user_dto_1.UserDto(user)), { refreshToken, accessToken: newAccessToken });
    }
    async forgotPassword(email) {
        const user = await user_service_1.default.findByEmail(email);
        if (!user) {
            throw http_exception_1.HttpException.badRequest("User not found");
        }
        // generate url with token, send email
        const resetToken = jsonwebtoken_1.default.sign({ email: user.email }, process.env.JWT_SECRET, { expiresIn: "30m" });
        // generate unique url, that expires in 30 minutes
        const resetUrl = `${process.env.CLIENT_URL}/reset-password/${resetToken}`;
        // send email
        await email_service_1.default.sendEmail(email, "Reset Password", "Click the link to reset your password", resetUrl);
        return {
            message: "Email sent",
        };
    }
    async resetPassword(password, token) {
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        const user = await user_service_1.default.findByEmail(decoded.email);
        if (!user) {
            throw http_exception_1.HttpException.badRequest("User not found");
        }
        user.password = await bcrypt_1.default.hash(password, 10);
        return await user_repository_1.default.save(user).then((user) => {
            return Object.assign({}, new user_dto_1.UserDto(user));
        });
    }
    generateTokens(user) {
        const accessToken = jsonwebtoken_1.default.sign({ email: user.email }, process.env.JWT_SECRET, {
            expiresIn: "30m",
            algorithm: "HS256",
        });
        const refreshToken = jsonwebtoken_1.default.sign({ email: user.email }, process.env.JWT_SECRET, {
            expiresIn: "30d",
            algorithm: "HS256",
        });
        return {
            accessToken,
            refreshToken,
        };
    }
    setTokenCookie(res, accessToken, refreshToken) {
        const cookieOptions = {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
        };
        const refreshTokenOptions = Object.assign(Object.assign({}, cookieOptions), { maxAge: 30 * 24 * 60 * 60 * 1000 });
        const accessTokenOptions = Object.assign(Object.assign({}, cookieOptions), { maxAge: 30 * 60 * 1000 });
        res.cookie("refreshToken", refreshToken, refreshTokenOptions);
        res.cookie("accessToken", accessToken, accessTokenOptions);
    }
}
exports.default = new AuthService();
