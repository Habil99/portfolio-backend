import { IsArray, IsNotEmpty, IsString } from "class-validator";

export class CreateAboutDto {
  @IsString()
  @IsNotEmpty()
  description: string;

  @IsArray()
  @IsNotEmpty()
  skills: string[];

  @IsString()
  @IsNotEmpty()
  photo: string;
}
