import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

export class CreateBannerDto {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsBoolean()
  @IsNotEmpty()
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
