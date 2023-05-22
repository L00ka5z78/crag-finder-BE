import { Express, Request, Response } from 'express';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { version } from '../package.json';

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'REST API Docs',
      version,
    },
    components: {
      securitySchemas: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ['../routers/crag.router', './src/schema/*.ts'],
};

const swaggerSpec = swaggerJsdoc(options);

/**we build documentation and publish it using postman and its available to clients, developers ect */

function swaggerDocs(app: Express, port: number) {
  //swagger page
  app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

  //docs in JSON format
  app.get('/docs.json', (req: Request, res: Response) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpec);
  });
  console.info(`Docs available at http://localhost:${port}/docs`);
}

export default swaggerDocs;
