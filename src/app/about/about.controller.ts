import aboutService from "./about.service";
import { Request } from "express";
import { HttpException } from "../../exceptions/http-exception";
import { UploadedFile } from "express-fileupload";

class AboutController {
  findAll(req: Request) {
    return aboutService.findAll(req.user);
  }

  create(req: Request) {
    if (!req.files) {
      throw HttpException.badRequest("No files were uploaded.");
    }
    const photo = req.files.photo as UploadedFile;
    return aboutService.create(req.user, req.body, photo);
  }

  delete(req: Request) {
    return aboutService.delete(req.params.id);
  }

  update(req: Request) {
    return aboutService.update(req.params.id, req.body);
  }
}

export default new AboutController();
