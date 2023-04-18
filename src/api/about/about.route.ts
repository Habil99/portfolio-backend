import express, { NextFunction, Request, Response } from "express";
import aboutController from "./about.controller";
import { use } from "../../lib/helpers";
import appRouter from "../routes";
import authMiddleware from "../../middleware/auth.middleware";
import aboutValidator from "./about.validator";
import { CreateBannerDto } from "../banner/dto/create-banner.dto";

const aboutRouter = express.Router();

appRouter.use(authMiddleware.verifyToken);

aboutRouter.get("/", use(aboutController.findAll));
aboutRouter.post("/",
  (req: Request, _res: Response, next: NextFunction) => aboutValidator.validate(req, next, CreateBannerDto),
  use(aboutController.create),
);
aboutRouter.put("/:id", use(aboutController.update));
aboutRouter.delete("/:id", use(aboutController.delete));

export default aboutRouter;
