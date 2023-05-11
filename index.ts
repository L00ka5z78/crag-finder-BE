import express, { json } from 'express';
import cors from 'cors';
import 'express-async-errors';
import config from './config/config';
import { handleError } from './utils/errors';
import { cragRouter } from './routers/crag.router';
import { corsInit, limiter } from './config';

const app = express();
app.use(corsInit);
app.use(json());
app.use(limiter);

//routers

app.use('/crag', cragRouter);

app.use(handleError);

app.listen(3001, '0.0.0.0', () => {
  console.log(
    `Server is ON and running on http://${config.server.HOST}:${config.server.PORT}`
  );
});
