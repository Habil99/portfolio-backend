import { Request, Response } from 'express';
import bannerService from './banner.service'
import HttpResponse from '../../response/http-response';
import { BannerDto } from './dto/banner.dto';

class BannerController {
  getInfo(_req: Request, res: Response) {
    bannerService.getInfo().then(data => {
      return res.status(200).send(new HttpResponse(200, 'Success', data.map(banner => new BannerDto(banner))));
    })
  }

  create(req: Request, res: Response) {
    bannerService.create(req.body).then(data => {
      return res.status(201).send(new HttpResponse(201, 'Success', new BannerDto(data)));
    });
  }

  update(req: Request, res: Response) {
    bannerService.update(req.params.id, req.body).then(data => {
      return res.status(200).send(new HttpResponse(200, 'Success', new BannerDto(data)));
    });
  }

  delete(req: Request, res: Response) {
    bannerService.delete(req.params.id).then(data => {
      return res.status(200).send(new HttpResponse(200, 'Success', new BannerDto(data)));
    });
  }
}

export default new BannerController();
