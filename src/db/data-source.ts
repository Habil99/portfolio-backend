import { DataSource } from 'typeorm';
import { BannerEntity } from '../api/banner/entity/banner.entity';

const appDataSource: DataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  database: 'portfolio',
  entities: [BannerEntity],
  synchronize: true,
  logging: false,
  logger: 'advanced-console',
  password: 'habil1410',
})

export default appDataSource;
