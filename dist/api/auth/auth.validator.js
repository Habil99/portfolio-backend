"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const create_user_dto_1 = require("../user/dto/create-user.dto");
const class_validator_1 = require("class-validator");
const helpers_1 = require("../../lib/helpers");
const http_exception_1 = require("../../exceptions/http-exception");
class AuthValidator {
    async validateRegister(req, _res, next) {
        const registerDto = new create_user_dto_1.CreateUserDto();
        registerDto.email = req.body.email;
        registerDto.password = req.body.password;
        registerDto.username = req.body.username;
        const errors = await (0, class_validator_1.validate)(registerDto);
        if (errors.length > 0) {
            next(new http_exception_1.HttpException(400, 'Bad Request', (0, helpers_1.normalizeValidatorErrors)(errors)));
        }
        return next();
    }
}
exports.default = new AuthValidator();
