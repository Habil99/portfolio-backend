import express from 'express';
import authController from './auth.controller';
import { use } from '../../lib/helpers';
import authValidator from './entity/auth.validator';

const authRouter = express.Router();

authRouter.post('/login', use(authController.login));
authRouter.post('/register', authValidator.validateRegister, use(authController.register));
authRouter.post('/logout', use(authController.logout));
authRouter.post('/refresh-token', use(authController.refreshToken));
authRouter.post('/forgot-password', use(authController.forgotPassword));
authRouter.post('/reset-password', use(authController.resetPassword));

export default authRouter;
