"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.About = void 0;
const typeorm_1 = require("typeorm");
const base_entity_1 = __importDefault(require("../../../db/entity/base-entity"));
const user_entity_1 = require("../../user/entity/user.entity");
let About = class About extends base_entity_1.default {
};
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], About.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "simple-array", // simple-array is a typeorm type vs array -> difference between array and simple-array is that simple-array is a string array,
    }),
    __metadata("design:type", Array)
], About.prototype, "skills", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], About.prototype, "photo", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, user => user.about),
    __metadata("design:type", user_entity_1.User)
], About.prototype, "user", void 0);
About = __decorate([
    (0, typeorm_1.Entity)({
        name: "about",
    })
], About);
exports.About = About;
