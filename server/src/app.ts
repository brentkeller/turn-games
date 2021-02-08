import * as path from 'path';
import * as bodyParser from 'body-parser';
import * as cookieParser from 'cookie-parser';
import * as express from 'express';
import * as compression from 'compression';
import * as helmet from 'helmet';
import Controller from './interfaces/controller';
import errorMiddleware from './middleware/error-middleware';
import DB from './database';

class App {
  public app: express.Application;

  constructor(controllers: Controller[]) {
    this.app = express();

    this.connectToTheDatabase();
    this.initializeMiddlewares();
    this.initializeControllers(controllers);
    this.initializeErrorHandling();
  }

  public listen() {
    const port = process.env.PORT || 5000;
    this.app.listen(port, () => {
      console.log(`App listening on the port ${port}`);
    });
  }

  public getServer() {
    return this.app;
  }

  private initializeMiddlewares() {
    this.app.use(helmet());
    this.app.use(compression());
    this.app.use(bodyParser.json());
    this.app.use(cookieParser());
  }

  private initializeControllers(controllers: Controller[]) {
    // Serve static files from the React app
    this.app.use(express.static(path.join(__dirname, 'client')));

    controllers.forEach(controller => {
      this.app.use('/', controller.router);
    });

    // The "catchall" handler: for any request that doesn't
    // match one above, send back React's index.html file.
    this.app.get('*', (req: express.Request, res: express.Response) => {
      res.sendFile(path.join(__dirname, 'client', 'index.html'));
    });
  }

  private initializeErrorHandling() {
    this.app.use(errorMiddleware);
  }

  private connectToTheDatabase() {
    DB.init();
  }
}

export default App;
