import { Router, Response, NextFunction } from 'express';
import DB from '../../database';
import Controller from '../../interfaces/controller';
import RequestWithUser from '../../interfaces/request-with-user';
import authMiddleware from '../../middleware/auth-middleware';
import { exportUserData } from '../../util/data-exporter';
import { getDateHash } from '../../util/date-helper';

class UserController implements Controller {
  public path = '/api/users';
  public router = Router();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes = () => {
    this.router.get(`/api/my/data`, authMiddleware, this.getUserData);
  };

  private getUserData = async (
    request: RequestWithUser,
    response: Response,
    next: NextFunction,
  ) => {
    try {
      const data = await exportUserData(request.userId);
      const filename = `mybkc-${getDateHash(new Date())}.json`;
      response.setHeader('Content-Disposition', `attachment; filename="${filename}";`);
      return response.status(200).json(data);
    } catch (err) {
      next(err);
    }
  };
}

export default UserController;
