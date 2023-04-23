"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const about_entity_1 = require("./entity/about.entity");
const data_source_1 = __importDefault(require("../../db/data-source"));
const aboutRepository = data_source_1.default.getRepository(about_entity_1.About);
exports.default = aboutRepository;
