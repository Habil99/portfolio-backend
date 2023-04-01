import express, { NextFunction, Request, Response } from 'express';

import bannerController from './index.controller';
import bannerValidator from './banner.validator';

const bannerRouter = express.Router();

const use = (middleware: any) => (req: Request, res: Response, next: NextFunction) =>
  Promise.resolve(middleware(req, res, next)).catch((e) => {
    res.status(400).send({
      ...e,
      message: e.message,
      errors: e.errors,
    })
  });

bannerRouter.get('/', use(bannerController.getInfo));
bannerRouter.post('/', use(bannerValidator.validateCreateBody), use(bannerController.create));
bannerRouter.put('/:id', use(bannerValidator.validateUpdateBody), use(bannerController.update));
bannerRouter.delete('/:id', use(bannerController.delete));

export default bannerRouter;
