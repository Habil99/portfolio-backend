import bannerRepository from './index.repository';
import { CreateBannerDto } from './dto/create-banner.dto';
import { HttpException } from '../../exceptions/http-exception';
import { UpdateBannerDto } from './dto/update-banner.dto';
import { BannerEntity } from './entity/banner.entity';

class BannerService {
  async getInfo() {
    return await bannerRepository.find();
  }

  async create(bannerDto: CreateBannerDto): Promise<BannerEntity> {
    if (bannerDto.isActive) {
      await this.deactivateAllBanners();
    }

    const banner = bannerRepository.create(bannerDto);
    return await bannerRepository.save(banner);
  }

  async update(id: string, bannerDto: UpdateBannerDto) {
    const banner = await bannerRepository.findOne({ where: { id: parseInt(id) } });

    if (!banner) {
      throw new HttpException(400, 'Bad Request')
    }

    if (bannerDto.isActive) {
      await this.deactivateAllBanners();
    }

    banner.username = bannerDto.username || banner.username;
    banner.title = bannerDto.title || banner.title;
    banner.description = bannerDto.description || banner.description;
    banner.isActive = Object.prototype.hasOwnProperty.call(bannerDto, 'isActive') ? bannerDto.isActive : banner.isActive;

    return await bannerRepository.save(banner);
  }

  async delete(id: string) {
    const banner = await bannerRepository.findOne({ where: { id: parseInt(id) } });

    if (!banner) {
      throw new HttpException(400, 'Bad Request')
    }

    if (banner.isActive) {
      throw new HttpException(400, 'Bad Request', 'Cannot delete an active banner')
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
