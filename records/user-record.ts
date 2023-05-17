import { ValidationErr } from '../common';
import { UserEntity, UserRole } from '../types';

export class UserRecord implements UserEntity {
  public id?: string;
  public role?: UserRole;
  public email: string;
  public password: string;
  public currentToken?: string | null;
  public refreshToken?: string | null;

  constructor(obj: UserEntity) {
    if (!obj.email || obj.email.length < 5 || obj.email.length > 255) {
      throw new ValidationErr(
        'Email cant be empty and has to be between 5 and 255 characters.'
      );
    }
    if (!obj.password) {
      throw new ValidationErr('Password must not be blank.');
    }
    this.id = obj.id;
    this.role = obj.role;
    this.email = obj.email;
    this.password = obj.password;
    this.currentToken = obj.currentToken;
    this.refreshToken = obj.refreshToken;
  }
}
