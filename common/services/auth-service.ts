import { sign } from 'jsonwebtoken';
import { v4 as uuid } from 'uuid';
import * as bcrypt from 'bcrypt';
import config from '../../config/config';
import { IJwtPayload, ITokenData } from '../../types';
import { CustomError } from '../errors';
import { hashData } from '../../utils';
import { UserRecord } from '../../records';

export const createAccessToken = (
  currentToken: string,
  userId: string
): ITokenData => {
  const expiresIn = Number(config.jsonWebToken.ACCESS_TOKEN_TIME_TO_LIVE);
  const jwtSecretKey = config.jsonWebToken.JWT_KEY;
  const payload: IJwtPayload = {
    id: userId,
    token: currentToken,
  };
  try {
    const accessToken = sign(payload, jwtSecretKey, { expiresIn });
    return { expiresIn, token: accessToken };
  } catch (error) {
    throw new CustomError(error.statusCode, error.message);
  }
};

export const updateRefreshToken = async (
  userId: string,
  token: string
): Promise<void> => {
  const user = await UserRecord.getUserById(userId);
  user.refreshToken = await hashData(token);
  await user.updateUser();
};

export const createRefreshToken = (userId: string): ITokenData => {
  const expiresIn = Number(config.jsonWebToken.REFRESH_TOKEN_TIME_TO_LIVE);
  const jwtSecretKey = config.jsonWebToken.REFRESH_JWT_KEY;

  try {
    const refreshToken = sign({ userId }, jwtSecretKey, { expiresIn });
    updateRefreshToken(userId, refreshToken);

    return { expiresIn, token: refreshToken };
  } catch (error) {
    throw new CustomError(error.statusCode, error.message);
  }
};

export const generateCurrentToken = async (
  user: UserRecord
): Promise<string> => {
  let currentToken: string;
  let currentHashedToken: string;
  let userWithThisToken: UserRecord | null = null;
  let isMatched = false;

  do {
    currentToken = uuid();
    currentHashedToken = await hashData(currentToken);
    userWithThisToken = await UserRecord.getUserById(user.id);

    if (userWithThisToken.currentToken) {
      isMatched = await bcrypt.compare(
        currentToken,
        userWithThisToken.currentToken
      );
    }
  } while (!!userWithThisToken && !!isMatched);
  user.currentToken = currentHashedToken;
  await user.updateUser();
  return currentToken;
};
