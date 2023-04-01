import { Request } from 'express';
import userService from './user.service';

class UserController {
  findAll() {
    return userService.findAll()
  }

  findOne(req: Request) {
    return userService.findOne(req.params.id)
  }

  create(req: Request) {
    return userService.create(req.body)
  }

  update(req: Request) {
    return userService.update(req.params.id, req.body)
  }

  delete(req: Request) {
    return userService.delete(req.params.id)
  }
}

export default new UserController();
