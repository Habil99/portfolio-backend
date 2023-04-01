"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http_exception_1 = require("../exceptions/http-exception");
class ExceptionHandlerMiddleware {
    use(err, _req, res) {
        console.log(err, 'here is middleware');
        if (err instanceof http_exception_1.HttpException) {
            return res.status(err.statusCode).send(Object.assign(Object.assign({}, err), { message: err.message, errors: err.errors }));
        }
        return res.status(500).send({
            message: err.message,
        });
    }
}
exports.default = new ExceptionHandlerMiddleware();
