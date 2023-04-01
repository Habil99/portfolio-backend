"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpException = void 0;
class HttpException extends Error {
    constructor(statusCode, message, errors = null) {
        super(message);
        this.statusCode = statusCode;
        this.message = message;
        this.errors = errors;
    }
    static badRequest(message, errors = null) {
        return new HttpException(400, message, errors);
    }
    static unauthorized(message, errors = null) {
        return new HttpException(401, message, errors);
    }
    static forbidden(message, errors = null) {
        return new HttpException(403, message, errors);
    }
    static notFound(message, errors = null) {
        return new HttpException(404, message, errors);
    }
    static conflict(message, errors = null) {
        return new HttpException(409, message, errors);
    }
    static tooMany(message, errors = null) {
        return new HttpException(429, message, errors);
    }
    static internal(_message, errors = null) {
        return new HttpException(500, "Internal Server Error", errors);
    }
}
exports.HttpException = HttpException;
