import { Social } from "./entity/social.entity";
import appDataSource from "../../db/data-source";

const socialRepository = appDataSource.getRepository(Social);

export default socialRepository;
