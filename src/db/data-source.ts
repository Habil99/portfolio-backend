import { DataSource } from 'typeorm';
import { BannerEntity } from '../api/banner/entity/banner.entity';

const appDataSource: DataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: 5432,
  username: process.env.DB_USER,
  database: process.env.DB_NAME,
  entities: [BannerEntity],
  synchronize: true,
  logging: false,
  logger: 'advanced-console',
  password: process.env.DB_PASSWORD,
})

export default appDataSource;
