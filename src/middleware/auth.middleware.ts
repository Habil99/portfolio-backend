import { NextFunction, Request, Response } from 'express';
import HttpResponse from '../response/http-response';
import jwt from 'jsonwebtoken';
import userService from "../api/user/user.service";

class AuthMiddleware {
  async verifyToken(req: Request, res: Response, next: NextFunction) {
    // get access token from header
    const authorization = req.headers.authorization;
    if (!authorization) {
      return res.status(401).send(new HttpResponse(401, 'Unauthorized'));
    }
    // verify access token
    const accessToken = authorization.split(' ')[1];
    try {
      const decodedToken = jwt.verify(accessToken, process.env.JWT_SECRET as string, {
        algorithms: ['HS256'],
      }) as any;
      const user = await userService.findByEmail(decodedToken.email);
      if (!user || user.accessToken !== accessToken) {
        return res.status(401).send(new HttpResponse(401, 'Unauthorized'));
      }
      // set user to request
      req.user = user;
      return next();
    } catch (error) {
      return res.status(401).send(new HttpResponse(401, 'Unauthorized'));
    }
  }
}

export default new AuthMiddleware();
