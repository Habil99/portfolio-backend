import appDataSource from '../../db/data-source';
import { User } from './entity/user.entity';

const userRepository = appDataSource.getRepository(User);

export default userRepository;
