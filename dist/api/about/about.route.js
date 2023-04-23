"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const about_controller_1 = __importDefault(require("./about.controller"));
const helpers_1 = require("../../lib/helpers");
const auth_middleware_1 = __importDefault(require("../../middleware/auth.middleware"));
const about_validator_1 = __importDefault(require("./about.validator"));
const create_about_dto_1 = require("./dto/create-about.dto");
const aboutRouter = express_1.default.Router();
aboutRouter.use(auth_middleware_1.default.verifyToken);
aboutRouter.get("/", (0, helpers_1.use)(about_controller_1.default.findAll));
aboutRouter.post("/", (req, _res, next) => about_validator_1.default.validate(req, next, create_about_dto_1.CreateAboutDto), (0, helpers_1.use)(about_controller_1.default.create));
aboutRouter.put("/:id", (0, helpers_1.use)(about_controller_1.default.update));
aboutRouter.delete("/:id", (0, helpers_1.use)(about_controller_1.default.delete));
exports.default = aboutRouter;
