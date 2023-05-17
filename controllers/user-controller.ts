import { RequestHandler } from 'express';
import { UserEntity } from '../types';

export const userProfile: RequestHandler<unknown, UserEntity> = async (
  req,
  res,
  next
) => {
  // const loggedInUser = req.user;
};
