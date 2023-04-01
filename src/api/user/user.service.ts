import userRepository from './user.repository';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

class UserService {
  async findAll() {
    return await userRepository.find()
  }

  async findOne(id: string) {
    return await userRepository.findOne({ where: { id: parseInt(id) } })
  }

  async findByEmail(email: string) {
    return await userRepository.findOne({ where: { email } })
  }

  async create(createUserDto: CreateUserDto) {
    return await userRepository.save(createUserDto)
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    return await userRepository.update(id, updateUserDto)
  }

  async delete(id: string) {
    return await userRepository.delete(id)
  }
}

export default new UserService()
