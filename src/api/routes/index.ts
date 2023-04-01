import express from 'express';
import bannerRoutes from '../banner/banner.route';
import authRoutes from '../auth/auth.route';
import userRoutes from '../user/user.route';
import authMiddleware from '../../middleware/auth.middleware';
import { use } from '../../lib/helpers';

const appRouter = express.Router();

appRouter.use('/banner', use(authMiddleware.verifyToken), bannerRoutes);
appRouter.use('/auth', authRoutes);
appRouter.use('/users', use(authMiddleware.verifyToken), userRoutes);

export default appRouter;
