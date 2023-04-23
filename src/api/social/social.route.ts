import express, { NextFunction, Request, Response } from "express";
import socialController from "./social.controller";
import { use } from "../../lib/helpers";
import authMiddleware from "../../middleware/auth.middleware";
import socialValidator from "./social.validator";
import { CreateSocialDto } from "./dto/create-social.dto";

const socialRouter = express.Router();

socialRouter.use(authMiddleware.verifyToken);

socialRouter.get("/", use(socialController.findAll));
socialRouter.post("/",
  (req: Request, _res: Response, next: NextFunction) => socialValidator.validate(req, next, CreateSocialDto, true),
  use(socialController.create),
);
socialRouter.put("/:id", use(socialController.update));
socialRouter.delete("/:id", use(socialController.delete));

export default socialRouter;
