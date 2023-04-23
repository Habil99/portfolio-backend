"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const express_1 = __importDefault(require("express"));
require("dotenv").config();
const data_source_1 = __importDefault(require("./db/data-source"));
const helmet_1 = __importDefault(require("helmet"));
const cors_1 = __importDefault(require("cors"));
const routes_1 = __importDefault(require("./api/routes"));
const typeorm_1 = require("typeorm");
const http_response_1 = __importDefault(require("./response/http-response"));
const helpers_1 = require("./lib/helpers");
const express_fileupload_1 = __importDefault(require("express-fileupload"));
// import HttpResponse from './response/http-response';
// import exceptionHandlerMiddleware from './middleware/exception-handler.middleware';
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
app.use((0, helmet_1.default)());
app.use((0, cors_1.default)({
    origin: "*",
}));
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.json());
app.use((0, express_fileupload_1.default)({
    limits: { fileSize: 10 * 1024 * 1024 },
    abortOnLimit: true,
}));
app.use("/api/v1", routes_1.default);
app.use((err, _req, res, _next) => {
    if ((0, helpers_1.isHttpException)(err) || (0, helpers_1.isHttpExceptionJson)(err)) {
        return res.status(err.statusCode).send(http_response_1.default.error(err.statusCode, err.message, err.errors));
    }
    if (err instanceof typeorm_1.QueryFailedError) {
        return res.status(500).send(http_response_1.default.internalError("SQL Exception", [err]));
    }
    console.log(err);
    return res.status(500).send(http_response_1.default.internalError("Internal Server Error", [err]));
});
const start = async () => {
    try {
        await data_source_1.default.initialize();
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    }
    catch (error) {
        console.log(error);
        await data_source_1.default.destroy();
    }
};
start();
