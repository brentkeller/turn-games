import { NextFunction, Request, Response } from 'express';
import { ApiError } from '../interfaces/api-error';
import HttpException from '../exceptions/http-exception';

function errorMiddleware(
  error: HttpException,
  _request: Request,
  response: Response,
  _next: NextFunction,
) {
  const status = error.status || 500;
  const message = error.message || 'Something went wrong';
  const data = error.data;
  console.log('error', error);
  response.status(status).json({ message, data } as ApiError);
}

export default errorMiddleware;
