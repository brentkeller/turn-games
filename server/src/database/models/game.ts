import { model, Model, Document, Schema } from 'mongoose';

// User interface, should match schema definition
export interface IGame extends Document {
  startDate: Date;
  endDate?: Date;
  gameType: string;
  code: string;
  ownerId?: string;
  // Settings object?
}

// Mongoose model
export interface GameModel extends Model<IGame> {
  findByCode(code: string): any;
  findByOwner(ownerId: string): any;
}

// Public-facing API-exposed interface
export interface IGameData {
  _id?: string;
  startDate: Date;
  endDate?: Date;
  gameType: string;
  code: string;
  ownerId?: string;
}

const buildSchema = () => {
  const gameSchema = new Schema<IGame>({
    startDate: Date,
    endDate: Date,
    gameType: String,
    code: String,
    ownerId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: false,
    },
  });

  gameSchema.statics.findByCode = function (code: string) {
    return this.find({ code });
  };

  gameSchema.statics.findByOwner = function (ownerId: string) {
    return this.find({ ownerId });
  };

  return gameSchema;
};

export class Game {
  private _model: GameModel;

  constructor() {
    const gameSchema = buildSchema();
    this._model = model<IGame, GameModel>('Game', gameSchema);
  }

  public get model(): GameModel {
    return this._model;
  }
}
