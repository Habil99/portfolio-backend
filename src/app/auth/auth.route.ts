import express from 'express';
import authController from './auth.controller';
import { use } from '../../lib/helpers';
import authValidator from './auth.validator';

const authRouter = express.Router();

// login
authRouter.post('/login', use(authController.login));
// me
authRouter.get('/me', use(authController.getCurrentUser));
// register
authRouter.post('/register', authValidator.validateRegister, use(authController.register));
// logout
authRouter.post('/logout', use(authController.logout));
// refresh token
authRouter.post('/refresh-token', use(authController.refreshToken));
// forgot password
authRouter.post('/forgot-password', use(authController.forgotPassword));
// after forgot password, user will receive an email with a link to reset password
authRouter.post('/reset-password', use(authController.resetPassword));

export default authRouter;
