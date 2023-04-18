import { Request } from "express";
import bannerService from "./banner.service";
import HttpResponse from "../../response/http-response";
import { BannerDto } from "./dto/banner.dto";

class BannerController {
  getInfo(req: Request) {
    return bannerService.getInfo(req.user);
  }

  create(req: Request) {
    return bannerService.create(req.body, req.user).then(data => {
      return HttpResponse.created("Success", new BannerDto(data));
    });
  }

  update(req: Request) {
    return bannerService.update(req.params.id, req.body).then((data) => {
      return HttpResponse.success("Success", new BannerDto(data));
    });
  }

  delete(req: Request) {
    return bannerService.delete(req.params.id).then(data => {
      return HttpResponse.success("Success", new BannerDto(data));
    });
  }
}

export default new BannerController();
