import { HttpException } from "../exceptions/http-exception";

class HttpResponse {
  constructor(
    public statusCode: number,
    public message: string,
    public data: any = null,
  ) {
    this.statusCode = statusCode;
    this.message = message;
    this.data = data;
  }

  public static success(message: string, data: any = null) {
    return new HttpResponse(200, message, data);
  }

  public static created(message: string, data: any = null) {
    return new HttpResponse(201, message, data);
  }

  public static internalError(message: string, errors: any = []) {
    return new HttpException(500, message, errors);
  }

  public static error(statusCode: number, message: string, errors: any = []) {
    return new HttpException(statusCode, message, errors);
  }
}

export default HttpResponse;
