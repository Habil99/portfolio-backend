import { CreateBannerDto } from "./dto/create-banner.dto";
import { validate } from "class-validator";
import { HttpException } from "../../exceptions/http-exception";
import { NextFunction, Request, Response } from "express";
import { normalizeValidatorErrors } from "../../lib/helpers";
import { UpdateBannerDto } from "./dto/update-banner.dto";

class BannerValidator {
  async validateCreateBody(req: Request, res: Response, next: NextFunction) {
    // validate req body
    const bannerDto = new CreateBannerDto(req.body.username, req.body.title, req.body.description, req.body.isActive);
    await validate(bannerDto).then(errors => {
      if (errors.length > 0) {
        return res.status(400).send(HttpException.badRequest("Bad Request", normalizeValidatorErrors(errors)));
      }
      return next();
    });
  }

  async validateUpdateBody(req: Request, res: Response, next: NextFunction) {
    const updateBannerDto = new UpdateBannerDto(req.body.username, req.body.title, req.body.description, req.body.isActive);

    // at least one field is required
    if (!updateBannerDto.username && !updateBannerDto.title && !updateBannerDto.description && !updateBannerDto.isActive) {
      return res.status(400).send(HttpException.badRequest("Bad Request", "At least one field is required"));
    }

    const errors = await validate(updateBannerDto);
    if (errors.length > 0) {
      return res.status(400).send(HttpException.badRequest("Bad Request", normalizeValidatorErrors(errors)));
    }
    return next();
  }
}


export default new BannerValidator();
