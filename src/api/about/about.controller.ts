import aboutService from "./about.service";
import { Request } from "express";

class AboutController {
  findAll(req: Request) {
    return aboutService.findAll(req.user);
  }

  create(req: Request) {
    return aboutService.create(req.user, req.body);
  }

  delete(req: Request) {
    return aboutService.delete(req.params.id);
  }

  update(req: Request) {
    return aboutService.update(req.params.id, req.body);
  }
}

export default new AboutController();
