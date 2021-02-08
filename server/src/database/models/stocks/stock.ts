import { model, Model, Document, Schema } from 'mongoose';

// User interface, should match schema definition
export interface IStock extends Document {
  name: string;
  symbol: string;
  volatility: number;
  // sector: string?
}

// Mongoose model
export interface StockModel extends Model<IStock> {}

// Public-facing API-exposed interface
export interface IStockData {
  _id?: string;
  name: string;
  symbol: string;
  volatility: number;
}

const buildSchema = () => {
  const stockSchema = new Schema<IStock>({
    name: String,
    symbol: String,
    volatility: Number,
  });

  return stockSchema;
};

export class Stock {
  private _model: StockModel;

  constructor() {
    const stockSchema = buildSchema();
    this._model = model<IStock, StockModel>('Stock', stockSchema);
  }

  public get model(): StockModel {
    return this._model;
  }
}
