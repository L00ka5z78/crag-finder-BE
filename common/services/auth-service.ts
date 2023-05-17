import { sign } from 'jsonwebtoken';
import config from '../../config/config';
import { IJwtPayload, ITokenData } from '../../types';
import { CustomError } from '../errors';

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

export const createRefreshToken = () => {};

export const updateRefreshToken = () => {};

export const generateCurrentToken = () => {};
