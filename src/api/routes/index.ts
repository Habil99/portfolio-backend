import express from 'express';
import bannerRoutes from '../banner/banner.route';
import authRoutes from '../auth/auth.route';
import userRoutes from '../user/user.route';
import aboutRoutes from "../about/about.route";

const appRouter = express.Router();

appRouter.use('/banner', bannerRoutes);
appRouter.use('/auth', authRoutes);
appRouter.use('/users', userRoutes);
appRouter.use('/about', aboutRoutes);

export default appRouter;
