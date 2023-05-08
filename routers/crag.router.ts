import { Router } from 'express';

export const cragRouter = Router().get('/', async (req, res) => {
  res.json({
    ok: true,
  });
});
