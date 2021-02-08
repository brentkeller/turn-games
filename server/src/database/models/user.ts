import { model, Model, Document, Schema } from 'mongoose';
import * as bcrypt from 'bcryptjs';

// User interface, should match schema definition
export interface IUser extends Document {
  email: string;
  // TODO: Store passwords in a separate UserCredentials object?
  //password: string;
  name: string;
  // passwordIsValid(password: string): Promise<boolean>;
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
    //password: { type: String },
  });

  // userSchema.pre('save', async function save(next) {
  //   const user = this as IUser;
  //   if (!user.isModified('password')) {
  //     return next();
  //   }

  //   try {
  //     const hashedPassword = await bcrypt.hash(user.password, 12);
  //     user.password = hashedPassword;
  //     return next();
  //   } catch (err) {
  //     // debug(err);
  //     console.log(err);
  //     return next(err);
  //   }
  // });

  // userSchema.methods.passwordIsValid = async function(password): Promise<boolean> {
  //   try {
  //     return await bcrypt.compare(password, this.password);
  //   } catch (err) {
  //     throw err;
  //   }
  // };

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
