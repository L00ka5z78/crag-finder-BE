import { NextFunction, Request, RequestHandler, Response } from 'express';
import {
  CookiesNames,
  UserLoginRequest,
  UserLoginResponse,
  UserRegisterRequest,
  UserRegisterResponse,
} from '../types';
import {
  checkHash,
  clearCookie,
  hashData,
  setCookie,
  validateUserData,
} from '../utils';
import {
  InvalidCredentialsErr,
  UserWithExistingEmailErr,
  createAccessToken,
  createRefreshToken,
  generateCurrentToken,
  serializeUserData,
} from '../common';
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

export const login: RequestHandler<
  unknown,
  UserLoginResponse,
  UserLoginRequest
> = async (req, res, next) => {
  const { email, password } = validateUserData(req);

  const user = await UserRecord.getUserByEmail(email);
  if (!user) {
    throw new InvalidCredentialsErr();
  }

  const isMatched = await checkHash(password, user.password);
  if (!isMatched) {
    throw new InvalidCredentialsErr();
  }
  const accessTokenData = createAccessToken(
    await generateCurrentToken(user),
    user.id
  );
  const refreshTokenData = createRefreshToken(user.id);

  setCookie(res, CookiesNames.AUTHORIZATION, accessTokenData);
  setCookie(res, CookiesNames.REFRESH, refreshTokenData);

  res.status(200).json(serializeUserData(user));
};

export const logout: RequestHandler<unknown, { ok: boolean }> = async (
  req,
  res,
  next
) => {
  const loggedInUser = req.user;
  loggedInUser.currentToken = null;
  loggedInUser.refreshToken = null;
  await loggedInUser.updateUser();

  clearCookie(res, CookiesNames.AUTHORIZATION);
  clearCookie(res, CookiesNames.REFRESH);
  res.status(200).json({ ok: true });
};

export const refresh = () => {};
