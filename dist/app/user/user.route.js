"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_controller_1 = __importDefault(require("./user.controller"));
const helpers_1 = require("../../lib/helpers");
const auth_middleware_1 = __importDefault(require("../../middleware/auth.middleware"));
const usersRouter = express_1.default.Router();
usersRouter.use(auth_middleware_1.default.verifyToken);
usersRouter.get('/', (0, helpers_1.use)(user_controller_1.default.findAll));
usersRouter.get('/:id', (0, helpers_1.use)(user_controller_1.default.findOne));
usersRouter.post('/', (0, helpers_1.use)(user_controller_1.default.create));
usersRouter.put('/:id', (0, helpers_1.use)(user_controller_1.default.update));
usersRouter.delete('/:id', (0, helpers_1.use)(user_controller_1.default.delete));
exports.default = usersRouter;
