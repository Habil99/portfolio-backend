"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const banner_entity_1 = require("../api/banner/entity/banner.entity");
const appDataSource = new typeorm_1.DataSource({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    database: 'portfolio',
    entities: [banner_entity_1.BannerEntity],
    synchronize: true,
    logging: false,
    logger: 'advanced-console',
    password: 'habil1410',
});
exports.default = appDataSource;
