import { Router } from 'express';
import { login, logout, refresh, register } from '../controllers';

export const authRoute = Router();

authRoute
  .post('/login', login)

  .post('/register', register)

  .post('/logout', logout)

  .post('/refresh', refresh);
