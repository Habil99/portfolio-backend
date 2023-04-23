"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const social_controller_1 = __importDefault(require("./social.controller"));
const helpers_1 = require("../../lib/helpers");
const auth_middleware_1 = __importDefault(require("../../middleware/auth.middleware"));
const social_validator_1 = __importDefault(require("./social.validator"));
const create_social_dto_1 = require("./dto/create-social.dto");
const socialRouter = express_1.default.Router();
socialRouter.use(auth_middleware_1.default.verifyToken);
socialRouter.get("/", (0, helpers_1.use)(social_controller_1.default.findAll));
socialRouter.post("/", (req, _res, next) => social_validator_1.default.validate(req, next, create_social_dto_1.CreateSocialDto, true), (0, helpers_1.use)(social_controller_1.default.create));
socialRouter.put("/:id", (0, helpers_1.use)(social_controller_1.default.update));
socialRouter.delete("/:id", (0, helpers_1.use)(social_controller_1.default.delete));
exports.default = socialRouter;
