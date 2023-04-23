import express from 'express';

import bannerController from './banner.controller';
import { use } from '../../lib/helpers';
import authMiddleware from "../../middleware/auth.middleware";
import bannerValidator from "./banner.validator";

const bannerRouter = express.Router();

bannerRouter.use(authMiddleware.verifyToken);

bannerRouter.get('/', use(bannerController.getInfo));
bannerRouter.post('/', bannerValidator.validateCreateBody, use(bannerController.create));
bannerRouter.put('/:id', bannerValidator.validateUpdateBody, use(bannerController.update));
bannerRouter.delete('/:id', use(bannerController.delete));

export default bannerRouter;
