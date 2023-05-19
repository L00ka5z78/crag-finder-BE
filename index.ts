import express, { json } from 'express';
import 'express-async-errors';
import config from './config/config';
import { handleError } from './utils/errors';
import { cragRouter } from './routers/crag.router';
import { corsInit, limiter, testExpressMetrics } from './config';
import { authRoute, userRoute } from './routers';
import { errorHandler } from './common';
import { startMetricServer } from './utils';

const app = express();
app.use(corsInit);
app.use(json());
app.use(limiter);

//metrics server
app.use(testExpressMetrics);

//routers

app.use('/auth', authRoute);
app.use('/user', userRoute); //for testing purposes
app.use('/crag', cragRouter);

app.use(handleError); // replace it with error midleware when it is created
app.use(errorHandler); //added 17.05 16:17

app.listen(3001, '0.0.0.0', () => {
  console.log(
    `Server is ON and running on http://${config.server.HOST}:${config.server.PORT}`
  );
  startMetricServer(); // run metrics server
});
