import express, { json } from 'express';
import cors from 'cors';
import 'express-async-errors';
import config from './config/config';
import { ValidationError, handleError } from './utils/errors';

const app = express();

app.use(
  cors({
    origin: 'http://localhost:3000',
  })
);
app.use(json());

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
