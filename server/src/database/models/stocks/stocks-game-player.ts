import { model, Model, Document, Schema } from 'mongoose';

// User interface, should match schema definition
export interface ILedgerEntry extends Document {
  date: Date;
  gameId: string;
  stockId: string;
  userId: string;
  priceCents: number;
  quantity: number;
  round: number;
}

// Mongoose model
export interface LedgerEntryModel extends Model<ILedgerEntry> {}

// Public-facing API-exposed interface
export interface ILedgerEntryData {
  _id?: string;
  date: Date;
  gameId: string;
  stockId: string;
  userId: string;
  priceCents: number;
  quantity: number;
  round: number;
}

// User interface, should match schema definition
export interface IStocksGamePlayer extends Document {
  gameId: string;
  userId: string;
  ledgerEntries: ILedgerEntry[];
  /*
  rounds: {
    completeDate
    ledgerEntries: ILedgerEntry[];
  }
  */
}

// Mongoose model
export interface StocksGamePlayerModel extends Model<IStocksGamePlayer> {}

// Public-facing API-exposed interface
export interface IStocksGamePlayerData {
  _id?: string;
  gameId: string;
  userId: string;
  legerEntries: ILedgerEntry[];
}

const buildSchema = () => {
  const ledgerentrySchema = new Schema<ILedgerEntry>({
    date: Date,
    priceCents: Number,
    quantity: Number,
    round: Number,
    gameId: {
      type: Schema.Types.ObjectId,
      ref: 'Game',
      required: true,
    },
    stockId: {
      type: Schema.Types.ObjectId,
      ref: 'Stock',
      required: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  });

  const stocksgameplayerSchema = new Schema<IStocksGamePlayer>({
    ledgerEntries: [ledgerentrySchema],
    gameId: {
      type: Schema.Types.ObjectId,
      ref: 'Game',
      required: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  });

  return stocksgameplayerSchema;
};

export class StocksGamePlayer {
  private _model: StocksGamePlayerModel;

  constructor() {
    const stocksgameplayerSchema = buildSchema();
    this._model = model<IStocksGamePlayer, StocksGamePlayerModel>(
      'StocksGamePlayer',
      stocksgameplayerSchema,
    );
  }

  public get model(): StocksGamePlayerModel {
    return this._model;
  }
}
