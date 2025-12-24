import { Router } from "express";
import { getStatus, postSession } from "../controllers/sessionController.js";
import { postSessionValidator } from "../middlewares/validators/sessionValidators.js";
import passport from "passport";
import jwtStrategy from "../lib/auth/jwtStrategy.js";
import requestValidationMiddleware from "../middlewares/requestValidationMiddleware.js";

passport.use(jwtStrategy)

export const sessionRouter = Router();

sessionRouter.post("/", postSessionValidator, requestValidationMiddleware, postSession);
sessionRouter.get("/status", passport.authenticate("jwt", { session: false }), getStatus);

export default sessionRouter;
