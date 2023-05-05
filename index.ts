import express, { json } from 'express';
import cors from 'cors';
import 'express-async-errors';
import config from './config/config';

const app = express();

app.use(
  cors({
    origin: 'http://localhost:3000',
  })
);
app.use(json());

app.listen(3001, '0.0.0.0', () => {
  console.log(
    `Server is ON and running on http://${config.server.HOST}:${config.server.PORT}`
  );
});
