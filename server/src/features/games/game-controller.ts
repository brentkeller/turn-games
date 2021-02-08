import { Router, Request, Response, NextFunction } from 'express';
import DB from '../../database';
import Controller from '../../interfaces/controller';
import { generateGameCode } from './game-manager';

class GameController implements Controller {
  public path = '/api/games';
  public router = Router();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes = () => {
    this.router.get(`${this.path}`, this.getGames);
    this.router.post(`${this.path}`, this.createGame);
    this.router.post(`${this.path}/join/:code`, this.joinGame);
  };

  private getGames = async (request: Request, response: Response, next: NextFunction) => {
    try {
      const games = await DB.Models.Game.find({}).sort('-startDate');
      response.status(200).json(games);
      return;
    } catch (error) {
      next(error);
    }
  };

  private createGame = async (request: Request, response: Response, next: NextFunction) => {
    try {
      const game = new DB.Models.Game({ ...request.body });
      game.startDate = new Date();
      // TODO: Validate game data: gameType, etc.
      game.code = await generateGameCode();
      game.save();
      return response.json(game);
    } catch (error) {
      next(error);
    }
  };

  private joinGame = async (request: Request, response: Response, next: NextFunction) => {
    try {
      const game = await DB.Models.Game.findByCode(request.params.code);
      // add player to game
      // make socket connection?
      return response.status(200).json(game);
    } catch (error) {
      next(error);
    }
  };
}

export default GameController;
