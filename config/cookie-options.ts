import { CookieOptions } from 'express';

export const cookieOptions: CookieOptions = {
  maxAge: 0,
  secure: false,
  domain: 'localhost',
  httpOnly: true,
};
