import { IsDate, IsEmail, IsString, IsStrongPassword, MinLength } from "class-validator";

export class UserDto {
  @IsString()
  @MinLength(3)
  username: string;

  @IsEmail()
  email: string;

  @IsStrongPassword()
  password: string;

  @IsDate()
  createdAt: Date;

  @IsDate()
  updatedAt: Date;

  constructor(
    data: UserDto
  ) {
    this.username = data.username;
    this.email = data.email;
    // this.password = data.password;
    this.createdAt = data.createdAt;
    this.updatedAt = data.updatedAt;
  }
}
