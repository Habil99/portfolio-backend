import { About } from "./entity/about.entity";
import appDataSource from "../../db/data-source";

const aboutRepository = appDataSource.getRepository(About);

export default aboutRepository;
