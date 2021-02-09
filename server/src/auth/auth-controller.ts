import { Router, Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import DB from '../database';
import HttpException from '../exceptions/http-exception';
import Controller from '../interfaces/controller';
import { AuthToken, AuthTokenData } from '../interfaces/token-data';
import LoginModel from './login-model';
import { IUser } from '../database/models/user';
import RegisterModel from './register-model';

class AuthController implements Controller {
  public path = '/api/auth';
  public router = Router();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes = () => {
    this.router.post(`${this.path}/login`, this.postLogin);
    this.router.post(`${this.path}/logout`, this.postLogout);
    this.router.post(`${this.path}/register`, this.postRegister);
  };

  private postLogin = async (request: Request, response: Response, next: NextFunction) => {
    try {
      const { email, password } = request.body as LoginModel;
      const user = await DB.Models.User.findOne({ email });
      if (!user) {
        next(new HttpException(401, `Invalid email or password`));
      }
      const userCredential = await DB.Models.UserCredential.findOne({ userId: user._id });
      if (!userCredential || !userCredential.password) {
        next(new HttpException(401, `Invalid email or password`));
      } else {
        // Verify password matches existing hash
        const passwordMatches = await userCredential.passwordIsValid(password);
        if (!passwordMatches) {
          next(new HttpException(401, `Invalid email or password`));
        }
      }

      this.setLoggedIn(user, response);
      return;
    } catch (err) {
      next(err);
    }
  };

  private postLogout = (_request: Request, response: Response) => {
    response.setHeader('Set-Cookie', ['Authorization=;Max-age=0; Path=/']);
    response.send(200);
  };

  private postRegister = async (request: Request, response: Response, next: NextFunction) => {
    try {
      const { name, email, password } = request.body as RegisterModel;
      let user = await DB.Models.User.findOne({ email });
      if (user) {
        next(new HttpException(403, `An account already exists for that email`));
      }

      user = new DB.Models.User({ name, email });
      await user.save();
      const credential = new DB.Models.UserCredential({ userId: user._id, password });
      await credential.save();

      this.setLoggedIn(user, response);
      return;
    } catch (err) {
      next(err);
    }
  };

  private setLoggedIn(user: IUser, response: Response) {
    const tokenData = this.createToken(user);
    response.setHeader('Set-Cookie', [this.createCookie(tokenData)]);
    response.status(200).json({
      name: user.name,
    });
  }

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
