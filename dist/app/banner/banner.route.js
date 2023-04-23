"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const banner_controller_1 = __importDefault(require("./banner.controller"));
const helpers_1 = require("../../lib/helpers");
const auth_middleware_1 = __importDefault(require("../../middleware/auth.middleware"));
const banner_validator_1 = __importDefault(require("./banner.validator"));
const bannerRouter = express_1.default.Router();
bannerRouter.use(auth_middleware_1.default.verifyToken);
bannerRouter.get('/', (0, helpers_1.use)(banner_controller_1.default.getInfo));
bannerRouter.post('/', banner_validator_1.default.validateCreateBody, (0, helpers_1.use)(banner_controller_1.default.create));
bannerRouter.put('/:id', banner_validator_1.default.validateUpdateBody, (0, helpers_1.use)(banner_controller_1.default.update));
bannerRouter.delete('/:id', (0, helpers_1.use)(banner_controller_1.default.delete));
exports.default = bannerRouter;
