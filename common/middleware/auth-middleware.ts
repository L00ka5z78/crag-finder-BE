import { RequestHandler } from 'express';
import { UserRecord } from '../../records';
import { verify } from 'jsonwebtoken';
import { IJwtPayload } from '../../types';
import { checkHash } from '../../utils';
import { AuthTokenMissingErr, InvalidAuthTokenErr } from '../errors';
import config from '../../config/config';

declare global {
  namespace Express {
    interface Request {
      user?: UserRecord;
    }
  }
}

export const authMiddleware: RequestHandler<unknown> = async (
  req,
  res,
  next
) => {
  const cookies = req.cookies;

  if (cookies && cookies.Authorization) {
    try {
      const jwtSecretKey = config.jsonWebToken.JWT_KEY;
      const verificationRes = verify(
        cookies.Authorization,
        jwtSecretKey
      ) as IJwtPayload;
      const user = await UserRecord.getUserById(verificationRes.id);
      if (!user) {
        next(new InvalidAuthTokenErr());
      }
      const isMatched = await checkHash(
        verificationRes.token,
        user.currentToken
      );
      if (!isMatched) {
        next(new InvalidAuthTokenErr());
      }
      req.user = user;
      next();
    } catch (e) {
      next(new InvalidAuthTokenErr());
    }
  } else {
    next(new AuthTokenMissingErr());
  }
};
