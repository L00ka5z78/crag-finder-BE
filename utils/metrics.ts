import express from 'express';
import client from 'prom-client';

const app = express();

export const restResponseTimeHistogram = new client.Histogram({
  name: 'rest_response_time_duration_seconds',
  help: 'REST API responses time in seconds ',
  labelNames: ['method', 'route', 'status_code'],
});

export const databaseResponseTimeHistogram = new client.Histogram({
  name: 'db_response_time_duration_seconds',
  help: 'Database responses time in seconds ',
  labelNames: ['operation', 'success'],
});

export function startMetricServer() {
  const collectDefaultMetrics = client.collectDefaultMetrics;

  collectDefaultMetrics();

  app.get('/metrics', async (req, res) => {
    res.set('Content-Type', client.register.contentType);
    return res.send(await client.register.metrics());
  });

  app.listen(9100, () => {
    console.info('Metrics server started at http://localhost:9100');
  });
}
