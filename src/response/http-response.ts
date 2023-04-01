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
}

export default HttpResponse;
