import { Schema, model, Document } from 'mongoose';
import { sign } from 'jsonwebtoken';
import { keys } from '../config/keys';
import bcrypt from 'bcrypt';

interface UserModelDoc extends Document {
  firstName: string;
  lastName: string;
  userName: string;
  hash: string;
  setPassword(password: string): void;
  isPasswordValid(password: string): Promise<boolean>;
  generateJWT(): { token: string; expiry: Date };
}

const userSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  userName: { type: String, required: true },
  hash: { type: String, required: true },
});

class UserModel {
  private hash: string = '';
  private id: string = '';

  public async setPassword(password: string) {
    console.log(password);
    const salt = await bcrypt.genSalt(5);
    this.hash = await bcrypt.hash(password, salt);
  }

  public async isPasswordValid(password: string): Promise<boolean> {
    const match = await bcrypt.compare(password, this.hash);
    return match ? true : false;
  }

  public generateJWT(): { token: string; expiry: string } {
    const daysToExpire = 1;
    let expiry = new Date();
    expiry.setDate(expiry.getDate() + daysToExpire);

    const token = sign(
      {
        _id: this.id,
        expiresIn: expiry,
      },
      keys.AuthToken
    );
    return { token, expiry: expiry.toString() };
  }
}

userSchema.loadClass(UserModel);
export default model<UserModelDoc>('User', userSchema);
