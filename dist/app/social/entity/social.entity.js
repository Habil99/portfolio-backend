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
exports.Social = void 0;
const typeorm_1 = require("typeorm");
const base_entity_1 = __importDefault(require("../../../db/entity/base-entity"));
const user_entity_1 = require("../../user/entity/user.entity");
let Social = class Social extends base_entity_1.default {
};
__decorate([
    (0, typeorm_1.Column)({
        type: "jsonb",
    }),
    __metadata("design:type", Object)
], Social.prototype, "facebook", void 0);
__decorate([
    (0, typeorm_1.Column)({
        nullable: true,
        type: "jsonb",
    }),
    __metadata("design:type", Object)
], Social.prototype, "twitter", void 0);
__decorate([
    (0, typeorm_1.Column)({
        nullable: true,
        type: "jsonb",
    }),
    __metadata("design:type", Object)
], Social.prototype, "instagram", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "jsonb",
    }),
    __metadata("design:type", Object)
], Social.prototype, "linkedin", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "jsonb",
    }),
    __metadata("design:type", Object)
], Social.prototype, "github", void 0);
__decorate([
    (0, typeorm_1.Column)({
        nullable: true,
        type: "jsonb",
    }),
    __metadata("design:type", Object)
], Social.prototype, "medium", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, (user) => user.social),
    __metadata("design:type", user_entity_1.User)
], Social.prototype, "user", void 0);
Social = __decorate([
    (0, typeorm_1.Entity)({
        name: "social",
    })
], Social);
exports.Social = Social;
