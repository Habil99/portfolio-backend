import appDataSource from '../../db/data-source';
import { UserEntity } from './entity/user.entity';

const userRepository = appDataSource.getRepository(UserEntity);

export default userRepository;
