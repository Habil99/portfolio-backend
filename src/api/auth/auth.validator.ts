import { NextFunction, Request, Response } from 'express';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { validate } from 'class-validator';
import { normalizeValidatorErrors } from '../../lib/helpers';
import { HttpException } from '../../exceptions/http-exception';

class AuthValidator {
  async validateRegister(req: Request, _res: Response, next: NextFunction) {
    const registerDto = new CreateUserDto();

    registerDto.email = req.body.email;
    registerDto.password = req.body.password;
    registerDto.username = req.body.username;

    const errors = await validate(registerDto)

    if (errors.length > 0) {
      next(new HttpException(400, 'Bad Request', normalizeValidatorErrors(errors)));
    }
    return next();
  }
}

export default new AuthValidator();
