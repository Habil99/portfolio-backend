import { DataSource } from "typeorm";
import { Banner } from "../app/banner/entity/banner.entity";
import { User } from "../app/user/entity/user.entity";
import { About } from "../app/about/entity/about.entity";
import { Social } from "../app/social/entity/social.entity";

const appDataSource: DataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST,
  port: 5432,
  username: process.env.DB_USER,
  database: process.env.DB_NAME,
  entities: [Banner, User, About, Social],
  synchronize: true,
  logging: false,
  logger: "advanced-console",
  password: process.env.DB_PASSWORD,
});

export default appDataSource;
