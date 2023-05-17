import { Request } from 'express';
import { CustomError } from '../common';
import {
  UserLoginRequest,
  UserLoginResponse,
  UserRegisterRequest,
  UserRegisterResponse,
} from '../types';

export const validateUserData = (
  req: Request<
    unknown,
    UserRegisterResponse | UserLoginResponse,
    UserRegisterRequest | UserLoginRequest
  >
) => {
  if (!req.body.email || !req.body.password) {
    throw new CustomError(400, 'Please include email and password.');
  }

  return { email: req.body.email, password: req.body.password };
};
