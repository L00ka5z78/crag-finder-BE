import { Router } from 'express';
import { userProfile } from '../controllers';
import { authMiddleware } from '../common';

/** created for testing purposes. if user has token, if token is refreshed and so on */

export const userRoute = Router();

userRoute.get('/profile', authMiddleware, userProfile);
