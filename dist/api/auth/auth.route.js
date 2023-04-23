"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_controller_1 = __importDefault(require("./auth.controller"));
const helpers_1 = require("../../lib/helpers");
const auth_validator_1 = __importDefault(require("./auth.validator"));
const authRouter = express_1.default.Router();
// login
authRouter.post('/login', (0, helpers_1.use)(auth_controller_1.default.login));
// me
authRouter.get('/me', (0, helpers_1.use)(auth_controller_1.default.getCurrentUser));
// register
authRouter.post('/register', auth_validator_1.default.validateRegister, (0, helpers_1.use)(auth_controller_1.default.register));
// logout
authRouter.post('/logout', (0, helpers_1.use)(auth_controller_1.default.logout));
// refresh token
authRouter.post('/refresh-token', (0, helpers_1.use)(auth_controller_1.default.refreshToken));
// forgot password
authRouter.post('/forgot-password', (0, helpers_1.use)(auth_controller_1.default.forgotPassword));
// after forgot password, user will receive an email with a link to reset password
authRouter.post('/reset-password', (0, helpers_1.use)(auth_controller_1.default.resetPassword));
exports.default = authRouter;
