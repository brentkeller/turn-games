// import { model, Model, Document, Schema } from 'mongoose';

// // User interface, should match schema definition
// export interface ILedgerEntry extends Document {
//   date: Date;
//   gameId: string;
//   stockId: string;
//   userId: string;
//   priceCents: number;
//   quantity: number;
//   round: number;
// }

// // Mongoose model
// export interface LedgerEntryModel extends Model<ILedgerEntry> {}

// // Public-facing API-exposed interface
// export interface ILedgerEntryData {
//   _id?: string;
//   date: Date;
//   gameId: string;
//   stockId: string;
//   userId: string;
//   priceCents: number;
//   quantity: number;
//   round: number;
// }

// const buildSchema = () => {
//   const ledgerentrySchema = new Schema<ILedgerEntry>({
//     date: Date,
//     priceCents: Number,
//     quantity: Number,
//     round: Number,
//     gameId: {
//       type: Schema.Types.ObjectId,
//       ref: 'Game',
//       required: true,
//     },
//     stockId: {
//       type: Schema.Types.ObjectId,
//       ref: 'Stock',
//       required: true,
//     },
//     userId: {
//       type: Schema.Types.ObjectId,
//       ref: 'User',
//       required: true,
//     },
//   });

//   return ledgerentrySchema;
// };

// export class LedgerEntry {
//   private _model: LedgerEntryModel;

//   constructor() {
//     const ledgerentrySchema = buildSchema();
//     this._model = model<ILedgerEntry, LedgerEntryModel>('LedgerEntry', ledgerentrySchema);
//   }

//   public get model(): LedgerEntryModel {
//     return this._model;
//   }
// }
