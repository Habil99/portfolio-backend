"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BannerDto = void 0;
class BannerDto {
    constructor(data) {
        this.username = data.username;
        this.title = data.title;
        this.description = data.description;
        this.isActive = data.isActive;
    }
}
exports.BannerDto = BannerDto;
