import { HttpException } from '../exceptions/http-exception';
import { Request, Response } from 'express';

class ExceptionHandlerMiddleware {
  use(err: HttpException | Error, _req: Request, res: Response) {
    console.log(err.message, 'here is middleware')
    if (err instanceof HttpException) {
      return res.status(err.statusCode).send({
        ...err,
        message: err.message,
        errors: err.errors,
      });
    }

    return res.status(500).send({
      message: err.message,
    });
  }
}

export default new ExceptionHandlerMiddleware();
