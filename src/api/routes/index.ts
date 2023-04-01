import express from 'express';
import bannerRoutes from '../banner/index.route';

const appRouter = express.Router();

appRouter.use('/banner', bannerRoutes);

export default appRouter;
