import { Router } from 'express';

export const authRoute = Router();

authRoute
  .post('/login', login)

  .post('/register', register)

  .post('/logout', authMiddleware, logout)

  .post('/refresh', refreshMiddleware, refresh);
