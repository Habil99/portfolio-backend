export class HttpException extends Error {
  public readonly statusCode: number;
  public readonly message: string;
  public readonly errors: any;

  constructor(statusCode: number, message: string, errors: any = null) {
    super(message);
    this.statusCode = statusCode;
    this.message = message;
    this.errors = errors;
  }

  private toJSON(): any {
    return {
      statusCode: this.statusCode,
      message: this.message,
      errors: this.errors,
    };
  }

  public static badRequest(message: string, errors: any = null): HttpException {
    return new HttpException(400, message, errors).toJSON();
  }

  public static unauthorized(message: string, errors: any = null): HttpException {
    return new HttpException(401, message, errors).toJSON();
  }

  public static forbidden(message: string, errors: any = null): HttpException {
    return new HttpException(403, message, errors).toJSON();
  }

  public static notFound(message: string, errors: any = null): HttpException {
    return new HttpException(404, message, errors).toJSON();
  }

  public static conflict(message: string, errors: any = null): { message: string; errors: any; statusCode: number } {
    return new HttpException(409, message, errors).toJSON();
  }

  public static tooMany(message: string, errors: any = null): HttpException {
    return new HttpException(429, message, errors).toJSON();
  }

  public static internal(_message: string, errors: any = null): HttpException {
    return new HttpException(500, "Internal Server Error", errors).toJSON();
  }
}
