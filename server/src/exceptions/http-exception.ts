class HttpException extends Error {
  public status: number;
  public message: string;
  public data?: any;
  constructor(status: number, message: string, data: any = undefined) {
    super(message);
    this.status = status;
    this.message = message;
    if (data) this.data = data;
  }
}

export default HttpException;
