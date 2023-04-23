"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const banner_route_1 = __importDefault(require("../banner/banner.route"));
const auth_route_1 = __importDefault(require("../auth/auth.route"));
const user_route_1 = __importDefault(require("../user/user.route"));
const about_route_1 = __importDefault(require("../about/about.route"));
const social_route_1 = __importDefault(require("../social/social.route"));
const appRouter = express_1.default.Router();
appRouter.use("/banner", banner_route_1.default);
appRouter.use("/auth", auth_route_1.default);
appRouter.use("/users", user_route_1.default);
appRouter.use("/about", about_route_1.default);
appRouter.use("/social", social_route_1.default);
exports.default = appRouter;
