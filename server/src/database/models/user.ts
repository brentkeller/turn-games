import { model, Model, Document, Schema } from 'mongoose';

// User interface, should match schema definition
export interface IUser extends Document {
  email: string;
  name: string;
}

// Mongoose model
export interface UserModel extends Model<IUser> {}

// Public-facing API-exposed interface
export interface IPublicUser {
  _id?: string;
  email?: string;
  name?: string;
}

const buildSchema = () => {
  const userSchema = new Schema<IUser>({
    name: { type: String, required: true },
    email: { type: String, required: true },
  });

  return userSchema;
};

export class User {
  private _model: UserModel;

  constructor() {
    const userSchema = buildSchema();
    this._model = model<IUser>('User', userSchema);
  }

  public get model(): UserModel {
    return this._model;
  }
}

// Not used here but keeping for reference if switching to now or other serverless hosting
// Export the existing User model or init a new one.
// Helps in serverless environment
//export default models.User || model<IUser>('User', userSchema);
