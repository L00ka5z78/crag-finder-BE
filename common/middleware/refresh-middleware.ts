import { RequestHandler } from 'express';
import { verify } from 'jsonwebtoken';
import config from '../../config/config';
import { UserRecord } from '../../records';
import { CookiesNames, IRefreshJwtPayload } from '../../types';
import { RefreshTokenMissingErr, WrongRefreshTokenErr } from '../errors';
import { checkHash } from '../../utils';

declare global {
  namespace Express {
    interface Request {
      user?: UserRecord;
    }
  }
}

export const refreshMiddleware: RequestHandler<unknown> = async (
  req,
  res,
  next
) => {
  const cookies = req.cookies;
  const refreshToken = cookies[CookiesNames.REFRESH];
  if (cookies && refreshToken) {
    try {
      const jwtSecretKey = config.jsonWebToken.JWT_KEY;
      const verifyResponse = verify(
        refreshToken,
        jwtSecretKey
      ) as IRefreshJwtPayload;

      const user = await UserRecord.getUserById(verifyResponse.userId);
      if (!user) {
        next(new RefreshTokenMissingErr());
      }
      const isMatched = await checkHash(refreshToken, user.refreshToken);
      if (!isMatched) {
        next(new WrongRefreshTokenErr());
      }
      req.user = user;
      next();
    } catch (error) {
      next(new WrongRefreshTokenErr());
    }
  } else {
    next(new RefreshTokenMissingErr());
  }
};
