import { IsArray, IsDate, IsNotEmpty, IsString } from "class-validator";

export class AboutDto {
  id: number;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsArray()
  @IsNotEmpty()
  skills: string[];

  @IsString()
  @IsNotEmpty()
  photo: string;

  @IsDate()
  createdAt: Date;

  @IsDate()
  updatedAt: Date;

  constructor(data: any) {
    this.id = data.id;
    this.description = data.description;
    this.skills = data.skills;
    this.photo = data.photo;
    this.createdAt = data.createdAt;
    this.updatedAt = data.updatedAt;
  }
}
