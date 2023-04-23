import { NextFunction, Request } from "express";
import { validate } from "class-validator";
import { normalizeValidatorErrors } from "../lib/helpers";
import { HttpException } from "../exceptions/http-exception";

export default class DtoValidator {
  async validate(req: Request, next: NextFunction, DtoClass: any, hasOptionFields = false) {
    const dto = new DtoClass();

    Object.keys(req.body).forEach((key) => {
      dto[key] = req.body[key];
    });

    const errors = await validate(dto, { skipMissingProperties: hasOptionFields });

    if (errors.length > 0) {
      next(new HttpException(400, "Bad Request", normalizeValidatorErrors(errors)));
    }

    return next();
  }
}

export const dtoValidator = new DtoValidator();
