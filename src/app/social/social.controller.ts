import socialService from "./social.service";
import { Request } from "express";

class SocialController {
  findAll(req: Request) {
    return socialService.findAll(req.user);
  }

  create(req: Request) {
    return socialService.create(req.user, req.body);
  }

  delete(req: Request) {
    return socialService.delete(req.params.id);
  }

  update(req: Request) {
    return socialService.update(req.params.id, req.body);
  }
}

export default new SocialController();
