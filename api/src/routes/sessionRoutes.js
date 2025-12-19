import { Router } from "express";
import { postSession } from "../controllers/sessionController.js";
import { postSessionValidator } from "../middlewares/validators/sessionValidators.js";
import requestValidationMiddleware from "../middlewares/requestValidationMiddleware.js";

export const sessionRouter = Router();

sessionRouter.post("/", postSessionValidator, requestValidationMiddleware, postSession);

export default sessionRouter;
