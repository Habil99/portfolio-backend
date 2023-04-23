"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpException = void 0;
const typeorm_1 = require("typeorm");
class HttpException extends Error {
    constructor(statusCode, message, errors = null) {
        super(message);
        this.statusCode = statusCode;
        this.message = message;
        this.errors = errors;
    }
    toJSON() {
        return {
            statusCode: this.statusCode,
            message: this.message,
            errors: this.errors,
        };
    }
    static badRequest(message, errors = null) {
        return new HttpException(400, message, errors).toJSON();
    }
    static unauthorized(message, errors = null) {
        return new HttpException(401, message, errors).toJSON();
    }
    static forbidden(message, errors = null) {
        return new HttpException(403, message, errors).toJSON();
    }
    static notFound(message, errors = null) {
        return new HttpException(404, message, errors).toJSON();
    }
    static conflict(message, errors = null) {
        return new HttpException(409, message, errors).toJSON();
    }
    static tooMany(message, errors = null) {
        return new HttpException(429, message, errors).toJSON();
    }
    static internal(_message, errors = null) {
        return new HttpException(500, "Internal Server Error", errors).toJSON();
    }
    static getError(error) {
        if (error instanceof HttpException) {
            return error.toJSON();
        }
        if (error instanceof typeorm_1.QueryFailedError) {
            return HttpException.internal("SQL Exception", [error]);
        }
        return HttpException.internal("Internal Server Error", [error]);
    }
    static handle(error, res) {
        const { statusCode, message, errors } = HttpException.getError(error);
        return res.status(statusCode).send({ statusCode, message, errors });
    }
}
exports.HttpException = HttpException;
