import { Request } from 'express';
import authService from './auth.service';

class AuthController {
  async login(req: Request) {
    return authService.login(req.body)
  }

  async register(req: Request) {
    return authService.register(req.body)
  }

  async logout() {
  }

  async refreshToken() {
  }

  async forgotPassword() {
  }

  async resetPassword() {
  }
}

export default new AuthController();
