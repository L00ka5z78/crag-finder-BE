import { v4 as uuid } from 'uuid';
import { ValidationErr } from '../common';
import { UserEntity, UserRole } from '../types';
import { pool } from '../utils';
import { FieldPacket } from 'mysql2/promise';

type UserRecordResults = [UserRecord[], FieldPacket[]];

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

  async createUser(): Promise<void> {
    if (!this.id) {
      this.id = uuid();
    }

    if (!this.role) {
      this.role = UserRole.User;
    }

    if (!this.currentToken) {
      this.currentToken = null;
    }

    if (!this.refreshToken) {
      this.refreshToken = null;
    }

    await pool.execute(
      'INSERT INTO `user` VALUES(:id, :email, :password, :role, :currentToken, :refreshToken)',
      {
        id: this.id,
        email: this.email,
        password: this.password,
        role: this.role,
        currentToken: this.currentToken,
        refreshToken: this.refreshToken,
      }
    );
  }

  static async getUserById(id: string): Promise<UserRecord | null> {
    const [results] = (await pool.execute(
      'SELECT * FROM `user` WHERE `id` = :id',
      {
        id,
      }
    )) as UserRecordResults;
    return results.length === 0 ? null : new UserRecord(results[0]);
  }

  static async getUserByEmail(email: string): Promise<UserRecord | null> {
    const [results] = (await pool.execute(
      'SELECT * FROM `user` WHERE `email` = :email',
      {
        email,
      }
    )) as UserRecordResults;
    return results.length === 0 ? null : new UserRecord(results[0]);
  }

  static async getUserWithToken(
    currentToken: string
  ): Promise<UserRecord | null> {
    const [results] = (await pool.execute(
      'SELECT * FROM `user` WHERE `currentToken` = :currentToken',
      {
        currentToken,
      }
    )) as UserRecordResults;
    return results.length === 0 ? null : new UserRecord(results[0]);
  }

  async updateUser(): Promise<void> {
    await pool.execute(
      'UPDATE `user` SET `email` = :email, `password` = :password, `role` = :role, `currentToken` = :currentToken, `refreshToken` = :refreshToken WHERE `id` = :id',
      {
        id: this.id,
        email: this.email,
        password: this.password,
        role: this.role,
        currentToken: this.currentToken,
        refreshToken: this.refreshToken,
      }
    );
  }

  static deleteUser(id: string) {
    pool.execute('DELETE FROM `user` WHERE `id` = :id', {
      id,
    });
  }
}
