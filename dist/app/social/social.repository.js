"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const social_entity_1 = require("./entity/social.entity");
const data_source_1 = __importDefault(require("../../db/data-source"));
const socialRepository = data_source_1.default.getRepository(social_entity_1.Social);
exports.default = socialRepository;
