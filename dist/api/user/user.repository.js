"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const data_source_1 = __importDefault(require("../../db/data-source"));
const user_entity_1 = require("./entity/user.entity");
const userRepository = data_source_1.default.getRepository(user_entity_1.User);
exports.default = userRepository;
