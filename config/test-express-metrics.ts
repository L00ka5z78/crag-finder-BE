import { Request, Response } from 'express';
import responseTime from 'response-time';
import { restResponseTimeHistogram } from '../utils';

export const testExpressMetrics = responseTime(
  (req: Request, res: Response, time: number) => {
    if (req?.route.path) {
      restResponseTimeHistogram.observe(
        {
          method: req.method,
          route: req.route.path,
          status_code: res.statusCode,
        },
        time * 1000
      );
    }
  }
);
