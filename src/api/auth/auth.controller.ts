import { Request, Response } from "express";
import authService from "./auth.service";
import userService from "../user/user.service";
import { HttpException } from "../../exceptions/http-exception";

class AuthController {
  async login(req: Request, res: Response) {
    return authService.login(req.body).then((user) => {
      authService.setTokenCookie(res, user.accessToken, user.refreshToken);
      return user;
    });
  }

  async register(req: Request, res: Response) {
    return authService.register(req.body).then((user) => {
      authService.setTokenCookie(res, user.accessToken, user.refreshToken);
      return user;
    });
  }

  async logout(req: Request) {
    return authService.logout(req.body);
  }

  async refreshToken(req: Request, res: Response) {
    return authService.refreshToken(req).then((user) => {
      authService.setTokenCookie(res, user.accessToken, user.refreshToken);
      return user;
    });
  }

  async forgotPassword(req: Request) {
    return authService.forgotPassword(req.body.email);
  }

  async resetPassword(req: Request) {
    return authService.resetPassword(req.body.password, req.body.token);
  }

  async getCurrentUser(req: Request) {
    const authorization = req.headers.authorization;
    if (!authorization) {
      throw HttpException.unauthorized("Unauthorized");
    }

    const accessToken = authorization.split(" ")[1];
    return userService.findByAccessToken(accessToken);
  }
}

export default new AuthController();
