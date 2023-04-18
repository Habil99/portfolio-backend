import { UserDto } from "../user/dto/user.dto";
import userService from "../user/user.service";
import { HttpException } from "../../exceptions/http-exception";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import userRepository from "../user/user.repository";
import { LoginDto } from "./dto/login.dto";
import { LogoutDto } from "./dto/logout.dto";
import { Request, Response } from "express";
import emailService from "../../services/email.service";

class AuthService {
  async login(loginDto: LoginDto) {
    const user = await userService.findByEmail(loginDto.email);

    if (!user) {
      throw HttpException.badRequest("User not found");
    }

    const isMatch = await bcrypt.compare(loginDto.password, user.password);

    if (!isMatch) {
      throw HttpException.badRequest("Invalid credentials");
    }

    const { accessToken, refreshToken } = this.generateTokens(user);

    user.accessToken = accessToken;

    await userRepository.save(user);

    return {
      ...new UserDto(user),
      refreshToken,
      accessToken,
    };
  }

  async register(userDto: UserDto) {
    const isExists = await userService.findByEmail(userDto.email);

    if (isExists) {
      throw HttpException.badRequest("User already exists");
    }

    const password = await bcrypt.hash(userDto.password, 10);
    const { accessToken, refreshToken } = this.generateTokens(userDto);

    const user = userRepository.create(userDto);

    user.password = password;
    user.accessToken = accessToken;

    // set token to cookie
    return await userRepository.save(user).then((user) => {
      return {
        ...new UserDto(user),
        refreshToken,
        accessToken,
      };
    });
  }

  async logout(logoutDto: LogoutDto) {
    const user = await userService.findByEmail(logoutDto.email);

    if (!user) {
      throw HttpException.badRequest("User not found");
    }

    user.accessToken = "";

    return await userRepository.save(user);
  }

  async refreshToken(req: Request) {
    const authorization = req.headers.authorization;
    if (!authorization) {
      throw HttpException.unauthorized("Unauthorized");
    }

    const accessToken = authorization.split(" ")[1];
    const user = await userService.findByAccessToken(accessToken);

    if (!user) {
      throw HttpException.unauthorized("Unauthorized");
    }

    const { accessToken: newAccessToken, refreshToken } = this.generateTokens(user);

    user.accessToken = newAccessToken;

    await userRepository.save(user);

    return {
      ...new UserDto(user),
      refreshToken,
      accessToken: newAccessToken,
    };
  }

  async forgotPassword(email: string) {
    const user = await userService.findByEmail(email);

    if (!user) {
      throw HttpException.badRequest("User not found");
    }

    // generate url with token, send email
    const resetToken = jwt.sign({ email: user.email }, process.env.JWT_SECRET as string, { expiresIn: "30m" });

    // generate unique url, that expires in 30 minutes
    const resetUrl = `${process.env.CLIENT_URL}/reset-password/${resetToken}`;

    // send email
    await emailService.sendEmail(email, "Reset Password", "Click the link to reset your password", resetUrl);

    return {
      message: "Email sent",
    };
  }

  async resetPassword(password: string, token: string) {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as any;

    const user = await userService.findByEmail(decoded.email);

    if (!user) {
      throw HttpException.badRequest("User not found");
    }

    user.password = await bcrypt.hash(password, 10);

    return await userRepository.save(user).then((user) => {
      return {
        ...new UserDto(user),
      };
    });
  }

  generateTokens(user: UserDto) {
    const accessToken = jwt.sign({ email: user.email }, process.env.JWT_SECRET as string, {
      expiresIn: "30m",
      algorithm: "HS256",
    });
    const refreshToken = jwt.sign({ email: user.email }, process.env.JWT_SECRET as string, {
      expiresIn: "30d",
      algorithm: "HS256",
    });

    return {
      accessToken,
      refreshToken,
    };
  }

  setTokenCookie(res: Response, accessToken: string, refreshToken: string) {
    const cookieOptions = {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    };

    const refreshTokenOptions = {
      ...cookieOptions,
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
    };

    const accessTokenOptions = {
      ...cookieOptions,
      maxAge: 30 * 60 * 1000, // 30 minutes
    };

    res.cookie("refreshToken", refreshToken, refreshTokenOptions);
    res.cookie("accessToken", accessToken, accessTokenOptions);
  }
}

export default new AuthService();
