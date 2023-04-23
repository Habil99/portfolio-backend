import { Social } from "../entity/social.entity";
import { SocialType } from "../../../types";

export class SocialDto {
  public id: number;

  facebook: SocialType;
  twitter: SocialType;
  instagram: SocialType;
  linkedin: SocialType;
  github: SocialType;
  medium: SocialType;
  createdAt: Date;
  updatedAt: Date;

  constructor(social: Social) {
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
