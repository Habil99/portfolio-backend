"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const express_1 = __importDefault(require("express"));
const data_source_1 = __importDefault(require("./db/data-source"));
const helmet_1 = __importDefault(require("helmet"));
const routes_1 = __importDefault(require("./api/routes"));
const exception_handler_middleware_1 = __importDefault(require("./middleware/exception-handler.middleware"));
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
app.use((0, helmet_1.default)());
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.json());
app.use('/api/v1', routes_1.default);
app.use(exception_handler_middleware_1.default.use);
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
