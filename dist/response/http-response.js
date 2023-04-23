"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http_exception_1 = require("../exceptions/http-exception");
class HttpResponse {
    constructor(statusCode, message, data = null) {
        this.statusCode = statusCode;
        this.message = message;
        this.data = data;
        this.statusCode = statusCode;
        this.message = message;
        this.data = data;
    }
    static success(message, data = null) {
        return new HttpResponse(200, message, data);
    }
    static created(message, data = null) {
        return new HttpResponse(201, message, data);
    }
    static internalError(message, errors = []) {
        return new http_exception_1.HttpException(500, message, errors);
    }
    static error(statusCode, message, errors = []) {
        return new http_exception_1.HttpException(statusCode, message, errors);
    }
}
exports.default = HttpResponse;
