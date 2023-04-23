import { DataSource } from "typeorm";
import { Banner } from "../api/banner/entity/banner.entity";
import { User } from "../api/user/entity/user.entity";
import { About } from "../api/about/entity/about.entity";
import { Social } from "../api/social/entity/social.entity";

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
