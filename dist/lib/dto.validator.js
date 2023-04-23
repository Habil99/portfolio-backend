"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dtoValidator = void 0;
const class_validator_1 = require("class-validator");
const helpers_1 = require("../lib/helpers");
const http_exception_1 = require("../exceptions/http-exception");
class DtoValidator {
    async validate(req, next, DtoClass, hasOptionFields = false) {
        const dto = new DtoClass();
        Object.keys(req.body).forEach((key) => {
            dto[key] = req.body[key];
        });
        const errors = await (0, class_validator_1.validate)(dto, { skipMissingProperties: hasOptionFields });
        if (errors.length > 0) {
            next(new http_exception_1.HttpException(400, "Bad Request", (0, helpers_1.normalizeValidatorErrors)(errors)));
        }
        return next();
    }
}
exports.default = DtoValidator;
exports.dtoValidator = new DtoValidator();
