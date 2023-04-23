import { IsNotEmpty, IsOptional } from "class-validator";
import { SocialType } from "../../../types";
import { IsSocialType } from "../../../lib/decorators";

export class CreateSocialDto {
  @IsSocialType()
  facebook: SocialType;

  @IsSocialType()
  @IsOptional()
  twitter: SocialType;

  @IsSocialType()
  @IsOptional()
  instagram: SocialType;

  @IsSocialType()
  @IsNotEmpty()
  linkedin: SocialType;

  @IsSocialType()
  @IsNotEmpty()
  github: SocialType;

  @IsSocialType()
  @IsOptional()
  medium: SocialType;
}
