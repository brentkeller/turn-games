require('dotenv').config();
import App from './app';
import AuthController from './auth/auth-controller';
import GameController from './features/games/game-controller';
import UserController from './features/user/user-controller';

const app = new App([new AuthController(), new GameController(), new UserController()]);

app.listen();
