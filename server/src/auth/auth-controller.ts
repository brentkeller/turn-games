import { Router, Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import DB from '../database';
import HttpException from '../exceptions/http-exception';
import Controller from '../interfaces/controller';
import { AuthToken, AuthTokenData } from '../interfaces/token-data';
import LoginModel from './login-model';
import { IUser } from '../database/models/user';

class AuthController implements Controller {
  public path = '/api/auth';
  public router = Router();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes = () => {
    this.router.post(`${this.path}/login`, this.postLogin);
    this.router.post(`${this.path}/logout`, this.postLogout);
  };

  private postLogin = async (request: Request, response: Response, next: NextFunction) => {
    try {
      const { email, password } = request.body as LoginModel;
      const user = await DB.Models.User.findOne({ email });
      if (!user) {
        next(new HttpException(401, `Invalid email or password`));
      }
      throw new Error('Implement auth!');

      // if (!user.password) {
      //   // allow user to set password when none has been assigned
      //   // Since this is a single-user app, this is a cheap way to reset a password via clearing the field in the DB
      //   user.password = password;
      //   await user.save();
      // } else {
      //   // Verify password matches existing hash
      //   const passwordMatches = await user.passwordIsValid(password);
      //   if (!passwordMatches) {
      //     next(new HttpException(401, `Invalid email or password`));
      //   }
      // }

      const tokenData = this.createToken(user);
      response.setHeader('Set-Cookie', [this.createCookie(tokenData)]);
      response.status(200).json({
        name: user.name,
      });
      return;
    } catch (err) {
      next(err);
    }
  };

  private postLogout = (request: Request, response: Response) => {
    response.setHeader('Set-Cookie', ['Authorization=;Max-age=0; Path=/']);
    response.send(200);
  };

  private createCookie(tokenData: AuthToken) {
    return `Authorization=${tokenData.token}; HttpOnly; Max-Age=${tokenData.expiresIn}; Path=/`;
  }

  private createToken(user: IUser): AuthToken {
    const expiresIn = 60 * 60 * 24 * 30; // 30 days
    const secret = process.env.JWT_SECRET;
    const dataStoredInToken: AuthTokenData = {
      _id: user._id.toString(),
      name: user.name,
    };
    return {
      expiresIn,
      token: jwt.sign(dataStoredInToken, secret, { expiresIn }),
    };
  }
}

export default AuthController;
