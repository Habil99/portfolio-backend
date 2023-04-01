"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const data_source_1 = __importDefault(require("../../db/data-source"));
const banner_entity_1 = require("./entity/banner.entity");
const citizenRepository = data_source_1.default.getRepository(banner_entity_1.BannerEntity);
exports.default = citizenRepository;
