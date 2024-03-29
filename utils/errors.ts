import { NextFunction, Request, Response } from 'express';

export class ValidationError extends Error {}

export const handleError = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log(err);

  res.status(err instanceof ValidationError ? 400 : 500).json({
    message:
      err instanceof ValidationError ? err.message : ' Sorry, try again later',
  });
};
/** probably unnecessary after creating error directory with exceptions
 *  and implementing errors into middlewares etc  */
