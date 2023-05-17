import { RequestHandler } from 'express';
import { UserEntity } from '../types';
import { serializeUserData } from '../common';

export const userProfile: RequestHandler<unknown, UserEntity> = async (
  req,
  res,
  next
) => {
  const loggedInUser = req.user;

  res.status(200).json(serializeUserData(loggedInUser));
};
