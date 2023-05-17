import { NextFunction, Request, RequestHandler, Response } from 'express';
import { UserRegisterRequest, UserRegisterResponse } from '../types';
import { hashData, validateUserData } from '../utils';
import { UserWithExistingEmailErr, serializeUserData } from '../common';
import { UserRecord } from '../records';

export const register: RequestHandler<
  unknown,
  UserRegisterResponse,
  UserRegisterRequest
> = async (req, res, next) => {
  const { email, password } = validateUserData(req);

  if (await UserRecord.getUserByEmail(email)) {
    throw new UserWithExistingEmailErr(email);
  }

  const hashedPassword = await hashData(password);
  const newUser = new UserRecord({ email, password: hashedPassword });
  await newUser.createUser();

  res.status(201).json(serializeUserData(newUser));
};

export const login = () => {};

export const logout = () => {};

export const refresh = () => {};
