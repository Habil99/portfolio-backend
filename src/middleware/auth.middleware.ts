import { NextFunction, Request, Response } from 'express';
import HttpResponse from '../response/http-response';
import jwt from 'jsonwebtoken';

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
      req.body.user = jwt.verify(accessToken, process.env.JWT_SECRET as string);
      return next();
    } catch (error) {
      return res.status(401).send(new HttpResponse(401, 'Unauthorized'));
    }
  }
}

export default new AuthMiddleware();
