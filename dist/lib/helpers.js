"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.use = exports.normalizeValidatorErrors = exports.isHttpExceptionJson = exports.isHttpException = void 0;
const http_1 = require("http");
const http_response_1 = __importDefault(require("../response/http-response"));
const http_exception_1 = require("../exceptions/http-exception");
const isHttpException = (err) => {
    return err instanceof http_exception_1.HttpException;
};
exports.isHttpException = isHttpException;
const isHttpExceptionJson = (err) => {
    return err && err.hasOwnProperty("statusCode") && err.hasOwnProperty("message") && err.hasOwnProperty("errors");
};
exports.isHttpExceptionJson = isHttpExceptionJson;
const normalizeValidatorErrors = (errors) => {
    return errors.map(error => {
        return {
            property: error.property,
            messages: Object.values(error.constraints).join(", "),
        };
    });
};
exports.normalizeValidatorErrors = normalizeValidatorErrors;
const use = (middleware) => (req, res, next) => Promise.resolve(middleware(req, res, next)).then((response) => {
    if (response instanceof http_1.ServerResponse) {
        return response;
    }
    if (response instanceof http_response_1.default) {
        return res.status(response.statusCode).send(response);
    }
    if (!response) {
        throw new http_exception_1.HttpException(500, "Internal Server Error", []);
    }
    return res.status(200).send(new http_response_1.default(200, "OK", response));
}).catch((e) => {
    next(e);
});
exports.use = use;
