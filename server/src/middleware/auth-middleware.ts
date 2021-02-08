import { NextFunction, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import { AuthTokenData } from '../interfaces/token-data';
import RequestWithUser from '../interfaces/request-with-user';
import HttpException from '../exceptions/http-exception';

async function authMiddleware(request: RequestWithUser, response: Response, next: NextFunction) {
  const cookies = request.cookies;
  if (cookies && cookies.Authorization) {
    const secret = process.env.JWT_SECRET;
    try {
      const verificationResponse = jwt.verify(cookies.Authorization, secret) as AuthTokenData;
      request.userId = verificationResponse._id;
      // TODO: Add mongo User to request?
      next();
    } catch (error) {
      next(new HttpException(401, 'Invalid auth token'));
    }
  } else {
    next(new HttpException(401, 'Authentication token missing'));
  }
}

export default authMiddleware;
