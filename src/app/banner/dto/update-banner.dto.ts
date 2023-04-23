import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class UpdateBannerDto {
  @IsString()
  @IsOptional()
  username: string;

  @IsString()
  @IsOptional()
  title: string;

  @IsString()
  @IsOptional()
  description: string;

  @IsBoolean()
  @IsOptional()
  isActive: boolean;

  constructor(
    username: string,
    title: string,
    description: string,
    isActive: boolean,
  ) {
    this.username = username;
    this.title = title;
    this.description = description;
    this.isActive = isActive;
  }
}
