import express, { json } from 'express';
import cors from 'cors';
import 'express-async-errors';
import config from './config/config';
import { ValidationError, handleError } from './utils/errors';
import { rateLimit } from 'express-rate-limit';

const app = express();

app.use(
  cors({
    origin: 'http://localhost:3000',
  })
);
app.use(json());
app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000, //15min
    max: 100, //limit each ip to 100 requests per window (in this case per 15 min)
  })
);

//routers

app.get('/', async (req, res) => {
  throw new ValidationError('oh no');
});

app.use(handleError);

app.listen(3001, '0.0.0.0', () => {
  console.log(
    `Server is ON and running on http://${config.server.HOST}:${config.server.PORT}`
  );
});
