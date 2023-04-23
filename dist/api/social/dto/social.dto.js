"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SocialDto = void 0;
class SocialDto {
    constructor(social) {
        this.id = social.id;
        this.facebook = social.facebook;
        this.twitter = social.twitter;
        this.instagram = social.instagram;
        this.linkedin = social.linkedin;
        this.github = social.github;
        this.medium = social.medium;
        this.createdAt = social.createdAt;
        this.updatedAt = social.updatedAt;
    }
}
exports.SocialDto = SocialDto;
