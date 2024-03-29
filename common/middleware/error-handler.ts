import { NextFunction, Request, Response } from 'express';
import { CustomError } from '../errors/custom-error';
import { ClientApiResponse } from '../../types';

export const errorHandler = (
  err: CustomError,
  req: Request<never, ClientApiResponse<null>, never>,
  res: Response<ClientApiResponse<null>>,
  next: NextFunction
): void => {
  const status = err.status || 500;
  const message = err.message || 'Something went wrong...';

  console.log({
    status,
    message,
    timestamp: new Date().toISOString(),
    path: req.url,
  });

  res.status(status).json({
    ok: false,
    error: message,
    status,
  });
};
