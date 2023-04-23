import "reflect-metadata";
import express from "express";

require("dotenv").config();

import appDataSource from "./db/data-source";
import helmet from "helmet";
import cors from "cors";
import appRoutes from "./app/routes";
import { QueryFailedError } from "typeorm";
import HttpResponse from "./response/http-response";
import { isHttpException, isHttpExceptionJson } from "./lib/helpers";
import fileUpload from "express-fileupload";

// import HttpResponse from './response/http-response';

// import exceptionHandlerMiddleware from './middleware/exception-handler.middleware';

const app = express();

const PORT = process.env.PORT || 3000;

app.use(helmet());
app.use(cors({
  origin: "*",
}));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(fileUpload({
  limits: { fileSize: 10 * 1024 * 1024 }, // 10 MB
  abortOnLimit: true,
}))

app.use("/api/v1", appRoutes);

app.use((err: any, _req: any, res: any, _next: any) => {
  if (isHttpException(err) || isHttpExceptionJson(err)) {
    return res.status(err.statusCode).send(HttpResponse.error(err.statusCode, err.message, err.errors));
  }

  if (err instanceof QueryFailedError) {
    return res.status(500).send(HttpResponse.internalError("SQL Exception", [err]));
  }

  console.log(err);
  return res.status(500).send(HttpResponse.internalError("Internal Server Error", [err]));
});

const start = async () => {
  try {
    await appDataSource.initialize();
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.log(error);
    await appDataSource.destroy();
  }
};

start();
