"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_repository_1 = __importDefault(require("./user.repository"));
const user_dto_1 = require("./dto/user.dto");
class UserService {
    async findAll() {
        return await user_repository_1.default.find().then((data) => {
            if (!data) {
                return [];
            }
            return data.map((user) => new user_dto_1.UserDto(user));
        });
    }
    async findOne(id) {
        return await user_repository_1.default
            .findOneOrFail({ where: { id: parseInt(id) } })
            .then((data) => new user_dto_1.UserDto(data));
    }
    async findByEmail(email) {
        return await user_repository_1.default.findOne({ where: { email } });
    }
    async findByAccessToken(accessToken) {
        return await user_repository_1.default.findOne({ where: { accessToken } });
    }
    async create(createUserDto) {
        return await user_repository_1.default.save(createUserDto);
    }
    async update(id, updateUserDto) {
        return await user_repository_1.default.update(id, updateUserDto);
    }
    async delete(id) {
        return await user_repository_1.default.delete(id);
    }
}
exports.default = new UserService();
