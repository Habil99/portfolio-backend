import express from 'express';

import bannerController from './banner.controller';
import bannerValidator from './banner.validator';
import { use } from '../../lib/helpers';

const bannerRouter = express.Router();

bannerRouter.get('/', use(bannerController.getInfo));
bannerRouter.post('/', use(bannerValidator.validateCreateBody), use(bannerController.create));
bannerRouter.put('/:id', use(bannerValidator.validateUpdateBody), use(bannerController.update));
bannerRouter.delete('/:id', use(bannerController.delete));

export default bannerRouter;
