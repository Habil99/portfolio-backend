"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const banner_entity_1 = require("../app/banner/entity/banner.entity");
const user_entity_1 = require("../app/user/entity/user.entity");
const about_entity_1 = require("../app/about/entity/about.entity");
const social_entity_1 = require("../app/social/entity/social.entity");
const appDataSource = new typeorm_1.DataSource({
    type: "postgres",
    host: process.env.DB_HOST,
    port: 5432,
    username: process.env.DB_USER,
    database: process.env.DB_NAME,
    entities: [banner_entity_1.Banner, user_entity_1.User, about_entity_1.About, social_entity_1.Social],
    synchronize: true,
    logging: false,
    logger: "advanced-console",
    password: process.env.DB_PASSWORD,
});
exports.default = appDataSource;
