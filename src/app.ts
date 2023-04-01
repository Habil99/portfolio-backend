import 'reflect-metadata';
require('dotenv').config();

import express from 'express';
import appDataSource from './db/data-source';
import helmet from 'helmet';
import appRoutes from './api/routes';
import { HttpException } from './exceptions/http-exception';
import HttpResponse from './response/http-response';

// import exceptionHandlerMiddleware from './middleware/exception-handler.middleware';

const app = express();

const PORT = process.env.PORT || 3000;

app.use(helmet())
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/api/v1', appRoutes)

app.use((err: any, _req: any, res: any, _next: any) => {
  if (err instanceof HttpException) {
    return res.status(err.statusCode).send(new HttpResponse(err.statusCode, err.message, err.errors));
  }

  return res.status(500).send(new HttpResponse(500, err.message, []));
});

const start = async () => {
  try {
    await appDataSource.initialize();
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.log(error);
    await appDataSource.destroy()
  }
}

start();
