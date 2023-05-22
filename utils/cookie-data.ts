import { CookieOptions, Response } from 'express';
import { CookiesNames, ITokenData } from '../types';
import { cookieOptions } from '../config';

export const setCookie = (
  res: Response,
  cookieName: CookiesNames,
  tokenData: ITokenData,
  additionalOptions?: CookieOptions
): void => {
  res.cookie(cookieName, tokenData.token, {
    ...cookieOptions,
    maxAge: tokenData.expiresIn * 1000,
    ...additionalOptions,
  });
};

export const clearCookie = (
  res: Response,
  cookieName: CookiesNames,
  additionalOptions?: CookieOptions
): void => {
  res.clearCookie(cookieName, { ...cookieOptions, ...additionalOptions });
};
