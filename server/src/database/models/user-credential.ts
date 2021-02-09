import { model, Model, Document, Schema } from 'mongoose';
import * as bcrypt from 'bcryptjs';

// User interface, should match schema definition
export interface IUserCredential extends Document {
  userId: Schema.Types.ObjectId;
  password: string;
  passwordIsValid(password: string): Promise<boolean>;
}

// Mongoose model
export interface UserCredentialModel extends Model<IUserCredential> {}

const buildSchema = () => {
  const userSchema = new Schema<IUserCredential>({
    password: { type: String },
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  });

  userSchema.pre('save', async function save(next) {
    const credential = this as IUserCredential;
    if (!credential.isModified('password')) {
      return next();
    }

    try {
      const hashedPassword = await bcrypt.hash(credential.password, 12);
      credential.password = hashedPassword;
      return next();
    } catch (err) {
      // debug(err);
      console.log(err);
      return next(err);
    }
  });

  userSchema.methods.passwordIsValid = async function (password): Promise<boolean> {
    try {
      return await bcrypt.compare(password, this.password);
    } catch (err) {
      throw err;
    }
  };

  return userSchema;
};

export class UserCredential {
  private _model: UserCredentialModel;

  constructor() {
    const userCredentialSchema = buildSchema();
    this._model = model<IUserCredential>('UserCredential', userCredentialSchema);
  }

  public get model(): UserCredentialModel {
    return this._model;
  }
}
