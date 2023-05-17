import { Router } from 'express';
import { userProfile } from '../controllers';

export const userRoute = Router();

userRoute.get('/profile', authMiddleware, userProfile);
