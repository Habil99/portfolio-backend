import express from 'express';
import usersController from './user.controller';
import { use } from '../../lib/helpers';

const usersRouter = express.Router();

usersRouter.get('/', use(usersController.findAll));
usersRouter.get('/:id', use(usersController.findOne));
usersRouter.post('/', use(usersController.create));
usersRouter.put('/:id', use(usersController.update));
usersRouter.delete('/:id', use(usersController.delete));

export default usersRouter;
