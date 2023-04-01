"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const index_controller_1 = __importDefault(require("./index.controller"));
const banner_validator_1 = __importDefault(require("./banner.validator"));
const bannerRouter = express_1.default.Router();
const use = (middleware) => (req, res, next) => Promise.resolve(middleware(req, res, next)).catch((e) => {
    res.status(400).send(Object.assign(Object.assign({}, e), { message: e.message, errors: e.errors }));
});
bannerRouter.get('/', use(index_controller_1.default.getInfo));
bannerRouter.post('/', use(banner_validator_1.default.validateCreateBody), use(index_controller_1.default.create));
bannerRouter.put('/:id', use(banner_validator_1.default.validateUpdateBody), use(index_controller_1.default.update));
bannerRouter.delete('/:id', use(index_controller_1.default.delete));
exports.default = bannerRouter;
