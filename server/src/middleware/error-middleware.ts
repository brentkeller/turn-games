import { NextFunction, Request, Response } from 'express';
import HttpException from '../exceptions/http-exception';

function errorMiddleware(
  error: HttpException,
  request: Request,
  response: Response,
  next: NextFunction,
) {
  const status = error.status || 500;
  const message = error.message || 'Something went wrong';
  const data = error.data;
  console.log('error', error);
  response.status(status).json({ message, data });
}

export default errorMiddleware;
