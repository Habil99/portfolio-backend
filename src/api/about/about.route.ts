import express, { NextFunction, Request, Response } from "express";
import aboutController from "./about.controller";
import { use } from "../../lib/helpers";
import authMiddleware from "../../middleware/auth.middleware";
import aboutValidator from "./about.validator";
import { CreateAboutDto } from "./dto/create-about.dto";

const aboutRouter = express.Router();

aboutRouter.use(authMiddleware.verifyToken);

aboutRouter.get("/", use(aboutController.findAll));
aboutRouter.post("/",
  (req: Request, _res: Response, next: NextFunction) => aboutValidator.validate(req, next, CreateAboutDto),
  use(aboutController.create),
);
aboutRouter.put("/:id", use(aboutController.update));
aboutRouter.delete("/:id", use(aboutController.delete));

export default aboutRouter;
