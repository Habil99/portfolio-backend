import 'reflect-metadata';

require('dotenv').config();

import express from 'express';
import appDataSource from './db/data-source';
import helmet from 'helmet';
import appRoutes from './api/routes';
import exceptionHandlerMiddleware from './middleware/exception-handler.middleware';

const app = express();

const PORT = process.env.PORT || 3000;

app.use(helmet())
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/api/v1', appRoutes)

app.use(exceptionHandlerMiddleware.use);

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
