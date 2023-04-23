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
exports.User = void 0;
const base_entity_1 = __importDefault(require("../../../db/entity/base-entity"));
const typeorm_1 = require("typeorm");
const banner_entity_1 = require("../../banner/entity/banner.entity");
const social_entity_1 = require("../../social/entity/social.entity");
/**
 * @field id
 * @field createdAt
 * @field updatedAt
 * @field deletedAt
 * @field username
 * @field email
 * @field password
 */
let User = class User extends base_entity_1.default {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], User.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], User.prototype, "username", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    (0, typeorm_1.Column)({
        nullable: true,
    }),
    __metadata("design:type", String)
], User.prototype, "accessToken", void 0);
__decorate([
    (0, typeorm_1.Column)({
        default: false,
    }),
    __metadata("design:type", Boolean)
], User.prototype, "isDeleted", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => banner_entity_1.Banner, banner => banner.user),
    __metadata("design:type", Array)
], User.prototype, "banners", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => banner_entity_1.Banner, banner => banner.user),
    __metadata("design:type", Array)
], User.prototype, "about", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => social_entity_1.Social, social => social.user),
    __metadata("design:type", Array)
], User.prototype, "social", void 0);
User = __decorate([
    (0, typeorm_1.Entity)({
        name: "users",
    }),
    (0, typeorm_1.Unique)(["username", "email"])
], User);
exports.User = User;
