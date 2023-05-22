import rateLimit from 'express-rate-limit';

export const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, //15min
  max: 100, //limit each ip to 100 requests per window (in this case per 15 min)
});
