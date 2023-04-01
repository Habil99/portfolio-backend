"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const index_route_1 = __importDefault(require("../banner/index.route"));
const appRouter = express_1.default.Router();
appRouter.use('/banner', index_route_1.default);
exports.default = appRouter;
