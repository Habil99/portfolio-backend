import { ValidationError } from 'class-validator';
import { NextFunction, Request, Response } from 'express';
import { ServerResponse } from 'http';
import HttpResponse from '../response/http-response';
import { HttpException } from '../exceptions/http-exception';

export const normalizeValidatorErrors = (errors: ValidationError[]) => {
  return errors.map(error => {
    return {
      property: error.property,
      messages: Object.values(error.constraints as {}).join(', ')
    };
  });
}

export const use = (middleware: any) => (req: Request, res: Response, next: NextFunction) =>
  Promise.resolve(middleware(req, res, next)).then((response) => {
    if (response instanceof ServerResponse) {
      next()
    }

    if (!response) {
      throw new HttpException(500, 'Internal Server Error', [])
    }

    return res.status(200).send(new HttpResponse(200, 'OK', response))
  }).catch((e) => {
    next(e)
  });
