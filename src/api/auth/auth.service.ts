import { UserDto } from '../user/dto/user.dto';
import userService from '../user/user.service';
import { HttpException } from '../../exceptions/http-exception';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'
import userRepository from '../user/user.repository';
import { LoginDto } from './dto/login.dto';

class AuthService {
  async login(loginDto: LoginDto) {
    const user = await userService.findByEmail(loginDto.email);

    if (!user) {
      throw HttpException.badRequest('User not found')
    }

    const isMatch = await bcrypt.compare(loginDto.password, user.password);

    if (!isMatch) {
      throw HttpException.badRequest('Invalid credentials')
    }

    const { accessToken, refreshToken } = this.generateTokens(user);

    user.accessToken = accessToken;

    await userRepository.save(user);

    return {
      ...new UserDto(user),
      refreshToken,
      accessToken
    }
  }

  async register(userDto: UserDto) {
    const isExists = await userService.findByEmail(userDto.email);

    if (isExists) {
      throw HttpException.badRequest('User already exists')
    }

    const password = await bcrypt.hash(userDto.password, 10);
    const { accessToken, refreshToken } = this.generateTokens(userDto);

    const user = userRepository.create(userDto);

    user.password = password;
    user.accessToken = accessToken;

    return await userRepository.save(user).then((user) => {
      return {
        ...new UserDto(user),
        refreshToken,
        accessToken
      }
    })
  }

  async logout() {
  }

  async refreshToken() {
  }

  async forgotPassword() {
  }

  async resetPassword() {
  }

  generateTokens(user: UserDto) {
    const accessToken = jwt.sign({ email: user.email }, process.env.JWT_SECRET as string, { expiresIn: '30m' })
    const refreshToken = jwt.sign({ email: user.email }, process.env.JWT_SECRET as string, { expiresIn: '30d' })

    return {
      accessToken,
      refreshToken
    }
  }
}

export default new AuthService();
