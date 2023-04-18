import appDataSource from '../../db/data-source';
import { Banner } from './entity/banner.entity';

const citizenRepository = appDataSource.getRepository(Banner);

export default citizenRepository;
