import aboutRepository from "./about.repository";
import { UserDto } from "../user/dto/user.dto";
import { AboutDto } from "./dto/about.dto";
import { HttpException } from "../../exceptions/http-exception";
import HttpResponse from "../../response/http-response";
import { UploadedFile } from "express-fileupload";
import cloudinaryService from "../../services/cloudinary.service";
import { CreateAboutDto } from "./dto/create-about.dto";

class AboutService {
  async findAll(user: UserDto) {
    const data = await aboutRepository.find({
      where: {
        user: {
          email: user.email,
        },
      },
    });

    if (data.length === 0) {
      return [];
    }

    return data.map((item) => new AboutDto(item));
  }

  async create(user: UserDto, about: CreateAboutDto, photo: UploadedFile) {
    try {
      const photoSecureURL = await cloudinaryService.upload(photo);
      const data = await aboutRepository.save({
        user: user,
        ...about,
        photo: photoSecureURL,
      });

      return new AboutDto(data);
    } catch (e) {
      throw HttpException.internal("Error uploading image", e);
    }
  }

  async delete(id: string) {
    const response = await aboutRepository.delete(id);

    if (response.affected === 0) {
      throw HttpException.notFound("About not found");
    }

    return new HttpResponse(200, "About deleted successfully", {});
  }

  async update(id: string, about: AboutDto) {
    const response = await aboutRepository.update(id, about);

    if (response.affected === 0) {
      throw HttpException.notFound("About not found");
    }

    return new HttpResponse(200, "About updated successfully", {});
  }
}

export default new AboutService();
