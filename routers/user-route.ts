import { Router } from 'express';
import { userProfile } from '../controllers';
import { authMiddleware } from '../common';

export const userRoute = Router();

userRoute.get('/profile', authMiddleware, userProfile);
