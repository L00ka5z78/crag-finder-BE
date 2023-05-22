import { Router } from 'express';
import { login, logout, refresh, register } from '../controllers';
import { authMiddleware, refreshMiddleware } from '../common';

export const authRoute = Router();

authRoute
  .post('/login', login)

  .post('/register', register)

  .post('/logout', authMiddleware, logout)

  .post('/refresh', refreshMiddleware, refresh);
