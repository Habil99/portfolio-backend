import bannerRepository from "./banner.repository";
import { CreateBannerDto } from "./dto/create-banner.dto";
import { HttpException } from "../../exceptions/http-exception";
import { UpdateBannerDto } from "./dto/update-banner.dto";
import { Banner } from "./entity/banner.entity";
// import HttpResponse from "../../response/http-response";
import { BannerDto } from "../banner/dto/banner.dto";
import { UserDto } from "../user/dto/user.dto";

class BannerService {
  async getInfo(user: UserDto) {
    // return only user's banners
    const banners = await bannerRepository.find({
      where: {
        user: {
          email: user.email,
        },
      },
    });
    return banners.map(banner => new BannerDto(banner));
  }

  async create(bannerDto: CreateBannerDto, user: UserDto): Promise<Banner> {
    if (bannerDto.isActive) {
      await this.deactivateAllBanners();
    }

    const banner = bannerRepository.create({
      ...bannerDto,
      user: user,
    });
    return await bannerRepository.save(banner);
  }

  async update(id: string, bannerDto: UpdateBannerDto) {

    const updateResponse = await bannerRepository.update(id, bannerDto);
    if (updateResponse.affected === 0) {
      throw HttpException.notFound("Banner not found");
    }

    if (bannerDto.isActive) {
      await this.deactivateAllBanners();
    }

    // this will not ever return null, because we already checked if banner exists with affected
    return <Promise<Banner>><unknown>await bannerRepository.findOne({ where: { id: parseInt(id) } });
  }

  async delete(id: string) {
    const banner = await bannerRepository.findOne({ where: { id: parseInt(id) } });

    if (!banner) {
      throw new HttpException(400, "Bad Request");
    }

    if (banner.isActive) {
      throw HttpException.badRequest("You can not delete active banner");
    }

    await bannerRepository.delete(id);
    return banner;
  }

  async deactivateAllBanners() {
    const activeBanner = await bannerRepository.findOne({ where: { isActive: true } });
    if (activeBanner) {
      activeBanner.isActive = false;
      await bannerRepository.save(activeBanner);
    }
  }
}

export default new BannerService();


