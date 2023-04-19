import { ValidationError } from "class-validator";
import { NextFunction, Request, Response } from "express";
import { ServerResponse } from "http";
import HttpResponse from "../response/http-response";
import { HttpException } from "../exceptions/http-exception";
import { HttpExceptionJson } from "../types";

export const isHttpException = (err: any): err is HttpException => {
  return err instanceof HttpException;
};

export const isHttpExceptionJson = (err: any): err is HttpExceptionJson => {
  return err && err.hasOwnProperty("statusCode") && err.hasOwnProperty("message") && err.hasOwnProperty("errors");
};

export const normalizeValidatorErrors = (errors: ValidationError[]) => {
  return errors.map(error => {
    return {
      property: error.property,
      messages: Object.values(error.constraints as {}).join(", "),
    };
  });
};

export const use = (middleware: any) => (req: Request, res: Response, next: NextFunction) =>
  Promise.resolve(middleware(req, res, next)).then((response) => {
    if (response instanceof ServerResponse) {
      return response;
    }

    if (response instanceof HttpResponse) {
      return res.status(response.statusCode).send(response);
    }

    if (!response) {
      throw new HttpException(500, "Internal Server Error", []);
    }

    return res.status(200).send(new HttpResponse(200, "OK", response));
  }).catch((e) => {
    next(e);
  });
