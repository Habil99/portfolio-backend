import userRepository from "./user.repository";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { UserDto } from "./dto/user.dto";

class UserService {
  async findAll() {
    return await userRepository.find().then((data) => {
      if (!data) {
        return [];
      }

      return data.map((user) => new UserDto(user));
    });
  }

  async findOne(id: string) {
    return await userRepository
      .findOneOrFail({ where: { id: parseInt(id) } })
      .then((data) => new UserDto(data));
  }

  async findByEmail(email: string) {
    return await userRepository.findOne({ where: { email } });
  }

  async findByAccessToken(accessToken: string) {
    return await userRepository.findOne({ where: { accessToken } });
  }

  async create(createUserDto: CreateUserDto) {
    return await userRepository.save(createUserDto);
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    return await userRepository.update(id, updateUserDto);
  }

  async delete(id: string) {
    return await userRepository.delete(id);
  }
}

export default new UserService();
