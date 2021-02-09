import { connect, connection, Connection } from 'mongoose';
import { Game, GameModel } from './models/game';
import { Stock, StockModel } from './models/stocks/stock';
import { StocksGamePlayer, StocksGamePlayerModel } from './models/stocks/stocks-game-player';
import { User, UserModel } from './models/user';
import { UserCredential, UserCredentialModel } from './models/user-credential';

declare interface IModels {
  Game: GameModel;
  //LedgerEntry: LedgerEntryModel;
  Stock: StockModel;
  StocksGamePlayer: StocksGamePlayerModel;
  User: UserModel;
  UserCredential: UserCredentialModel;
}

class DB {
  private static instance: DB;

  private _db: Connection;
  private _models: IModels;

  private constructor() {
    connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    this._db = connection;
    this._db.on('open', this.connected);
    this._db.on('error', this.error);

    this._models = {
      Game: new Game().model,
      Stock: new Stock().model,
      // LedgerEntry: new LedgerEntry().model,
      StocksGamePlayer: new StocksGamePlayer().model,
      User: new User().model,
      UserCredential: new UserCredential().model,
      // this is where we initialise all models
    };
  }

  public static init() {
    if (!DB.instance) {
      DB.instance = new DB();
    }
  }

  public static get Models() {
    return DB.instance._models;
  }

  private connected() {
    console.log('Mongoose has connected');
  }

  private error(error) {
    console.log('Mongoose has errored', error);
  }
}

export default DB;
