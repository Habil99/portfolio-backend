import { IsEmail, IsOptional, IsString, IsStrongPassword, MinLength } from 'class-validator';

export class UpdateUserDto {

  @IsString()
  @MinLength(3)
  @IsOptional()
  username: string;

  @IsEmail()
  @IsOptional()
  email: string;

  @IsString()
  @IsStrongPassword()
  @IsOptional()
  password: string;
}
