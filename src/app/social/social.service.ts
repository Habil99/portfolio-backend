import socialRepository from "./social.repository";
import { UserDto } from "../user/dto/user.dto";
import { SocialDto } from "./dto/social.dto";
import { HttpException } from "../../exceptions/http-exception";
import HttpResponse from "../../response/http-response";
import { CreateSocialDto } from "./dto/create-social.dto";

class SocialService {
  async findAll(user: UserDto) {
    const data = await socialRepository.find({
      where: {
        user: {
          email: user.email,
        },
      },
    });

    if (data.length === 0) {
      return [];
    }

    return data.map((item) => new SocialDto(item));
  }

  async create(user: UserDto, socialDto: CreateSocialDto) {
    const social = socialRepository.create({
      github: socialDto.github,
      facebook: socialDto.facebook,
      twitter: socialDto.twitter,
      instagram: socialDto.instagram,
      linkedin: socialDto.linkedin,
      medium: socialDto.medium,
      user: user,
    });

    return await socialRepository.save(social).then((data) => new SocialDto(data));
  }

  async delete(id: string) {
    const response = await socialRepository.delete(id);

    if (response.affected === 0) {
      throw HttpException.notFound("Social info not found");
    }

    return new HttpResponse(200, "Social info deleted successfully", {});
  }

  async update(id: string, socialDto: SocialDto) {
    const response = await socialRepository.update(id, socialDto);

    if (response.affected === 0) {
      throw HttpException.notFound("Social info not found");
    }

    return new HttpResponse(200, "Social info updated successfully", {});
  }
}

export default new SocialService();
