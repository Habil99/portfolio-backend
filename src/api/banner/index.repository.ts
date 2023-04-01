import appDataSource from '../../db/data-source';
import { BannerEntity } from './entity/banner.entity';

const citizenRepository = appDataSource.getRepository(BannerEntity);

export default citizenRepository;
